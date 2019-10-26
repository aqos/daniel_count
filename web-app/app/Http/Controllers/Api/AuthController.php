<?php

namespace App\Http\Controllers\Api;

use App\Mail\Registered as AppRegistered;
use App\Repositories\PersonRepository;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Carbon\Carbon;
use App\Repositories\UserRepository;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Mail;

class AuthController extends Controller
{
    protected $userRepository, $personRepository;

    public function __construct(UserRepository $userRepository, PersonRepository $personRepository)
    {
        $this->userRepository = $userRepository;
        $this->personRepository = $personRepository;
    }

    /**
     * Create user
     *
     * @param  [string] name
     * @param  [string] email
     * @param  [string] password
     * @param  [string] password_confirmation
     * @return [string] message
    */
    public function register(Request $request)
    {
        $request->validate([
            'email' => 'required|string|email|unique:users',
            'password' => 'required|string',
            'last_name' => 'required|string', 
            'first_name' => 'required|string', 
            'birth_place' => 'required|string',
            'birth_date' => 'required|string', 
            'piece_number' => 'required|string', 
            'phone' => 'required|string',
        ]);

        $user = $this->userRepository->store([
            'name' => $this->generateRandomString(7) . ($this->userRepository->getLastIndex() + 1),
            'email' => $request->email,
            'password' => Hash::make($this->generateRandomString(8)),
            'email_verified_at' => Carbon::now()
        ]);

        $this->personRepository->store([
            'last_name' => $request->last_name,
            'first_name' => $request->first_name,
            'birth_place' => $request->birth_place,
            'birth_date' => $request->birth_date,
            'piece_number' => $request->piece_number,
            'phone' => $request->phone,
            'user_id' => $user->id
        ]);

        Mail::to($request->email)->send(new AppRegistered($user));

        return response()->json([
            'message' => 'Successfully created user!'
        ], 201);
    }

    /**
     * Login user and create token
     *
     * @param  [string] email
     * @param  [string] password
     * @param  [boolean] remember_me
     * @return [string] access_token
     * @return [string] token_type
     * @return [string] expires_at
     */
    public function login(Request $request)
    {
        $request->validate([
            'name' => 'required|string',
            'password' => 'required|string',
            // 'remember_me' => 'boolean'
        ]);

        $credentials = request(['name', 'password']);

        if (!Auth::attempt($credentials))
            return response()->json([
                'message' => 'Unauthorized'
            ], 401);
        $user = $request->user();
        $tokenResult = $user->createToken('Personal Access Token');
        $token = $tokenResult->token;
        // if ($request->remember_me)
        //     $token->expires_at = Carbon::now()->addWeeks(1);
        // $token->save();

        return response()->json([
            'access_token' => $tokenResult->accessToken,
            'token_type' => 'Bearer',
            'expires_at' => Carbon::parse(
                $tokenResult->token->expires_at
            )->toDateTimeString()
        ]);
    }

    /**
     * Logout user (Revoke the token)
     *
     * @return [string] message
     */
    public function logout(Request $request)
    {
        $request->user()->token()->revoke();
        return response()->json([
            'message' => 'Successfully logged out'
        ]);
    }

    /**
     * Get the authenticated User
     *
     * @return [json] user object
     */
    public function user(Request $request)
    {
        return response()->json($this->userRepository->getUserWithPerson($request->user()->id));
    }
    
    private function generateRandomString($length = 10)
    {
        $characters = '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ';
        $charactersLength = strlen($characters);
        $randomString = '';
        for ($i = 0; $i < $length; $i++) {
            $randomString .= $characters[rand(0, $charactersLength - 1)];
        }
        return $randomString;
    }
}