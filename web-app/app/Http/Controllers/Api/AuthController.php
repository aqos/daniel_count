<?php

namespace App\Http\Controllers\Api;

use App\Mail\Registered as AppRegistered;
use App\Providers\UtilsProvider;
use App\Repositories\PersonRepository;
use Illuminate\Http\Request;
use Carbon\Carbon;
use App\Repositories\UserRepository;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Mail;
use App\Http\Controllers\Controller;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Validator;

class AuthController extends Controller
{
    protected $userRepository, $personRepository, $utilsProvider;

    public function __construct(
        UserRepository $userRepository, 
        PersonRepository $personRepository, 
        UtilsProvider $utilsProvider
    ) {
        $this->userRepository = $userRepository;
        $this->personRepository = $personRepository;
        $this->utilsProvider = $utilsProvider;
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
        $validator = Validator::make($request->all(), [
            'email' => 'required|string|email|unique:users',
            'last_name' => 'required|string', 
            'first_name' => 'required|string', 
            'birth_place' => 'required|string',
            'birth_date' => 'required|string', 
            'piece_number' => 'required|string', 
            'phone' => 'required|string',
        ]);

        if ($validator->fails()) {
            return response()->json([
                'status' => 'FAILURE',
                'errors'  => $validator->errors()
            ], 422);
        }
        $username = $this->utilsProvider->generateRandomString(7) . ($this->userRepository->getLastIndex() + 1); 
        $password = $this->utilsProvider->generateRandomString(8);
        $user = $this->userRepository->store([
            'name' => $username,
            'email' => $request->email,
            'password' => Hash::make($password),
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

        Mail::to($request->email)->send(new AppRegistered($username, $password));

        return response()->json([
            'status' => 'SUCCESS',
            'message' => 'Successfully created user!'
        ], 201);
    }

    /**
     * Login user and create token
     *
     * @param  [string] name
     * @param  [string] password
     * @param  [boolean] remember_me
     * @return [string] access_token
     * @return [string] token_type
     * @return [string] expires_at
     */
    public function login(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'name' => 'required|string',
            'password' => 'required|string',
        ]);

        if ($validator->fails()) {
            return response()->json([
                'status' => 'FAILURE',
                'errors'  => $validator->errors()
            ], 422);
        }

        $user = $this->userRepository->getWhere('name', $request->name);
        if (is_null($user)) {
            return response()->json([
                'status' => 'FAILURE',
                'message' => 'Utilisateur ou mot de passe invalide !'
            ], 404);
        }
        $request->merge(['email' => $user->email]);
        $credentials = request(['email', 'password']);
        if(!Auth::attempt($credentials))
            return response()->json([
                'status' => 'FAILURE',
                'message' => 'Unauthorized'
            ], 401);

        $user = $request->user();
        $tokenResult = $user->createToken('Personal Access Token');
        return response()->json([
            'status' => 'SUCCESS',
            'token' => [
                'access_token' => $tokenResult->accessToken,
                'token_type' => 'Bearer',
                'expires_at' => Carbon::now()->timestamp + 864000
            ],
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
            'status' => 'SUCCESS',
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
        return response()->json([
            'status' => 'SUCCESS',
            'user' => $this->userRepository->getUserWithPerson($request->user()->id)
        ]);
    }
}
