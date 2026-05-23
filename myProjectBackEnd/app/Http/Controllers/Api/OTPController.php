<?php

namespace App\Http\Controllers\Api;
use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Mail;
use Illuminate\Support\Facades\Session;
use App\Models\User;
use Illuminate\Support\Facades\Log;
use App\Mail\ContactMail;
use Illuminate\Support\Facades\Cache;
class OTPController extends Controller
{ 


public function changePassword(Request $request)
{
    $request->validate([
        'email' => 'required|email',
        'password' => 'required',
    ]);

    if (!User::where('email', $request->email)->exists()) {
        return response()->json(['message' => 'Email not registered'], 404);
    }

    $otp = rand(10000, 99999);

    Cache::put(
        'password_reset_'.$request->email,
        [
            'email' => $request->email,
            'password' => bcrypt($request->password),
            'otp' => $otp,
            'expires' => now()->addMinutes(5),
        ],
        now()->addMinutes(5)
    );

    // Mail::to($request->email)->send(new ContactMail($request->email, $otp));

    return response()->json([
        'message' => 'success',
        'otp' => $otp // ❌ remove in production
    ]);
}
public function verifyChange(Request $request)
{
    $request->validate([
        'email' => 'required|email',
        'otp'=>'required'
    ]);

    $cacheKey = 'password_reset_'.$request->email;

    $pendingUser = Cache::get($cacheKey);
  
    if (!$pendingUser) {
        return response()->json(['message' => 'OTP expired or not found'], 400);
    }

    if ($pendingUser['otp'] != $request->otp) {
        return response()->json(['message' => 'Invalid OTP'], 400);
    }

 User::where('email', $pendingUser['email'])->update([
    'password' => $pendingUser['password']
 ]);

    Cache::forget($cacheKey);

    return response()->json(['message' => 'success']);
}






public function requestOtp(Request $request)
{

    $request->validate([
        'name' => 'required',
        'email' => 'required|email',
        'password' => 'required',
    ]);

    if (User::where('email', $request->email)->exists()) {
        return response()->json(['message' => 'Email already registered']);
    }

    $otp = rand(10000, 99999);
    // Store data temporarily

    Cache::put(
        'create_acount_' . $request->email,
        [
            'name'=>$request->name,
            'email' => $request->email,
            'password' => bcrypt($request->password),
            'otp' => $otp,
            'expires' => now()->addMinutes(5),
        ],
        now()->addMinutes(5)
    );


    try{
      
        // Mail::to($request->email)->send(new ContactMail($request->name, $otp));
 return response()->json(['message' => 'success','otp'=>$otp]);

    }catch (\Exception $e) {
        // Optional: log the error
        Log::error('Failed to send OTP email: ' . $e->getMessage());

        return response()->json([
            'message' => '❌ Failed to send email. Please try again.',
            'error' => $e->getMessage()
        ], 500);
    }
  
}
public function verifyOtp(Request $request)
{
    $request->validate([
        'email' => 'required|email',
        'otp' => 'required',
    ]);
  
   $cacheKey =  'create_acount_'. $request->email;

    $pendingUser = Cache::get($cacheKey);


    if (!$pendingUser) {
        return response()->json(['message' => 'No pending user found'], 400);
    }

    if ($pendingUser['email'] !== $request->email) {
        return response()->json(['message' => 'Email mismatch'], 400);
    }

    if ($pendingUser['otp'] != $request->otp) {
        return response()->json(['message' => 'Invalid OTP'], 400);
    }

    if (now()->greaterThan($pendingUser['expires'])) {
        return response()->json(['message' => 'OTP expired'], 400);
    }

    // Save user now that OTP is verified
    $user = User::create([
        'name' => $pendingUser['name'],
        'email' => $pendingUser['email'],
        'password' => $pendingUser['password'],
        'is_verified' => true,
    ]);

    // Clear session
        Cache::forget($cacheKey);

    return response()->json(['message' => 'success']);
}

}
