<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Http\Resources\UserResource;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;

class UserController extends Controller
{
 
    public function index()
    {
        return UserResource::collection(User::all());
    }

  
    public function store(Request $request)
    {
        $request->validate([
            'name' => 'required|string|max:255',
            'email' => 'required|email|unique:users,email',
            'password' => 'required|string|min:6'
        ]);

        $user = User::create([
            'name' => $request->name,
            'email' => $request->email,
            'password' => Hash::make($request->password),
            'provider' => 'local',
            'role' => 'user'
        ]);

        $token = $user->createToken('auth_token')->plainTextToken;

        return response()->json([
            'message' => 'success',
            'user' => $user,
            'token' => $token
        ]);
    }


    public function login(Request $request)
        {
            $credentials = $request->only('email', 'password');

            $request->validate([
                'email' => 'required|email',
                'password' => 'required'
            ]);

            $user = User::where('email', $credentials['email'])->first();
            if (!$user) {
                return response()->json([
                    'message' => 'check Email please'
                ], 200);
            }

            if (!Auth::attempt($credentials)) {
                return response()->json([
                    'message' => ' check password please'
                ], 200);
            }
          $token = $user->createToken('auth_token')->plainTextToken;

     
            return response()->json([
                'message' => 'success',
                'user' => Auth::user(),
                'token'=>$token
            ]);
        }

  
public function googleRegister(Request $request)
{
    $request->validate([
        'name' => 'required|string|max:255',
        'email' => 'required|email',
        'google_id' => 'required|string',
    ]);

    $existingUser = User::where('email', $request->email)->first();

    if ($existingUser) {

        Auth::login($existingUser);

        return response()->json([
            'message' => 'success',
            'user' => Auth::user()
        ]);
    }else {
        
          $user = User::create([
        'name' => $request->name,
        'email' => $request->email,
        'google_id' => $request->google_id,
        'provider' => 'google',
        'email_verified_at' => now(),
        'password' => null,
        'role' => 'user'
    ]);

    // تسجيل دخوله مباشرة
        Auth::login($user);
    
        return response()->json([
            'message' => 'success',
            'user' => Auth::user()
        ]);
        
    }

}
 public function checkLogin(Request $request)
    {
        if ($request->user()) {
            return response()->json([
                'logged_in' => true,
                'user' => $request->user()
            ]);
        }

        return response()->json(['logged_in' => false], 401);
    }

public function logout(Request $request){
    
 auth()->guard('web')->logout();
    $request->session()->invalidate();
    return response()->json(['message' => 'success']);
    // $request->user()->currentAccessToken()->delete();
    // return response()->json(['message' => 'success']);
}
public function deleteAccount()
{   
    $user = auth()->user(); 
    $user->delete();

    return response()->json(['message' => 'success']);
}


}

    