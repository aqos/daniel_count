<?php

namespace App\Proxies;

use Illuminate\Foundation\Application;
use App\Exceptions\InvalidCredentialsException;
use App\Repositories\UserRepository;
use Carbon\Carbon;
use GuzzleHttp\Client;
use Illuminate\Contracts\Encryption\DecryptException;

class AuthProxy
{
    const REFRESH_TOKEN = 'refreshToken';

    private $apiConsumer;

    private $auth;

    private $cookie;

    private $db;

    private $request;

    private $userRepository;

    public function __construct(Application $app, UserRepository $userRepository)
    {
        $this->userRepository = $userRepository;
        $this->apiConsumer = new Client();
        $this->auth = $app->make('auth');
        $this->cookie = $app->make('cookie');
        $this->db = $app->make('db');
        $this->request = $app->make('request');
    }

    /**
     * Attempt to create an access token using user credentials
     *
     * @param string $email
     * @param string $password
     */
    public function attemptLogin($username, $password)
    {
        $user = $this->userRepository->getWhere('name', $username);
        if (!is_null($user)) {
            return $this->proxy('password', [
                'username' => $user->email,
                'password' => $password
            ]);
        }

        throw new InvalidCredentialsException();
    }

    /**
     * Attempt to refresh the access token used a refresh token that
     * has been saved in a cookie
     */
    public function attemptRefresh()
    {
        try {
            $refreshToken = $this->request->cookie(self::REFRESH_TOKEN);
        } catch (DecryptException $exception) {
            return response()->json([
                'status' => 'FAILURE',
                'message' => 'Unauthorized', 
                'errors' => $exception->getMessage()
            ], 401);
        }

        return $this->proxy('refresh_token', [
            'refresh_token' => $refreshToken
        ]);
    }

    /**
     * Proxy a request to the OAuth server.
     *
     * @param string $grantType what type of grant type should be proxied
     * @param array $data the data to send to the server
     */
    public function proxy($grantType, array $data = [])
    {
        try {
            $data = array_merge([
                'client_id'     => env('PASSWORD_CLIENT_ID'),
                'client_secret' => env('PASSWORD_CLIENT_SECRET'),
                'grant_type'    => $grantType,
                'scope' => ''
            ], $data);
            $url = $grantType === 'password' ? '/oauth/token' : '/oauth/token/refresh';
            dd($url);
            $guzzleResponse = $this->apiConsumer->post($url, [
                'form_params' => $data
            ]);
        } catch (\GuzzleHttp\Exception\BadResponseException $e) {
            $guzzleResponse = $e->getResponse();
        }
        
        dd($guzzleResponse);
        $response = json_decode($guzzleResponse->getBody());

        if (property_exists($response, "access_token")) {

            $encryptedToken = encrypt($response->refresh_token);

            // Set the refresh token as an encrypted HttpOnly cookie
            $this->cookie->queue(
                self::REFRESH_TOKEN,
                $encryptedToken,
                432000, // 05 days
                null,
                null,
                false,
                true // HttpOnly
            );

            $response = [
                'status' => 'SUCCESS',
                'token' => [
                    'access_token'  => $response->access_token,
                    'expires_at'    => Carbon::now()->timestamp + 600,
                    'token_type'    => 'Bearer',
                ]
            ];
        }

        $response = response()->json($response);
        $response->setStatusCode($guzzleResponse->getStatusCode());

        $headers = $guzzleResponse->getHeaders();
        foreach ($headers as $headerType => $headerValue) {
            $response->header($headerType, $headerValue);
        }

        return $response;
    }

    /**
     * Logs out the user. We revoke access token and refresh token.
     * Also instruct the client to forget the refresh cookie.
     */
    public function logout()
    {
        $accessToken = $this->auth->user()->token();

        $refreshToken = $this->db
            ->table('oauth_refresh_tokens')
            ->where('access_token_id', $accessToken->id)
            ->update([
                'revoked' => true
            ]);

        $accessToken->revoke();

        $this->cookie->queue($this->cookie->forget(self::REFRESH_TOKEN));
    }
}
