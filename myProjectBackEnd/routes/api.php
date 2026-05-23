<?php

use App\Http\Controllers\Api\AdminContronller;
use App\Http\Controllers\Api\ChatController;
use App\Http\Controllers\Api\course;
use App\Http\Controllers\Api\Course_UserController;
use App\Http\Controllers\Api\CourseController;
use App\Http\Controllers\Api\Fill;
use App\Http\Controllers\Api\HomeController;
use App\Http\Controllers\Api\Lesson;
use App\Http\Controllers\Api\LessonController;
use App\Http\Controllers\Api\LessondataController;
use App\Http\Controllers\Api\MailController;
use App\Http\Controllers\Api\User;
use App\Http\Controllers\Api\UserController;

use App\Http\Resources\Course_UserResource;
use App\Models\Course as ModelsCourse;
use App\Models\Lesson as ModelsLesson;
use App\Models\Lessondata;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\Api\OTPController;
use App\Http\Controllers\Auth\GoogleAuthController;
    Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
        return response()->json($request->user());
    });
Route::post('/login', [UserController::class, 'login']);
Route::post('/google-register', [UserController::class, 'googleRegister']);
Route::post('logout',[UserController::class,'logout']);

Route::post('/request-otp', [OTPController::class, 'requestOtp']);
Route::post('/verify-otp', [OTPController::class, 'verifyOtp']);

Route::post('/changePassword',[OTPController::class,'changePassword']);
Route::post('/verifyChange',[OTPController::class,'verifyChange']);

// Route::post('checklogin',[UserController::class,'checklogin']);
Route::get('start',[HomeController::class,'start']);
Route::post('register', [UserController::class, 'store']);
Route::get('translate',[HomeController::class,'translate']);
// Route::apiResource('users', UserController::class)->middleware('api');
Route::middleware(['auth:sanctum', 'role:admin'])->group(function () {
    Route::delete("lessondatas/{lessondata}",[LessondataController::class,'deleteItem']); 
    Route::get('allCourses',[AdminContronller::class,'getAllCourses']);
    Route::post('/course/{course}/lesson',[LessonController::class,'store']);
  
    Route::post('course',[CourseController::class,'store']);
    Route::patch('/course/{course}',[CourseController::class,'update']);
    Route::patch('/endedCourse/{course}',[CourseController::class,'endedCourse']);
    Route::post('/course/{course}',[LessonController::class,'store']);
    Route::delete('/course/{course}/lesson/{lesson}',[LessonController::class,'destroy']);
     Route::patch('/course/{course}/lesson/{lesson}',[LessonController::class,'update']);
 
    Route::apiResource('lesson.lessondatas',LessondataController::class);
    Route::patch('addTestBefore/{lesson}',[LessonController::class,'addTestBefore']);
    Route::patch('removeTestBefore/{lesson}',[LessonController::class,'removeTestBefore']);
});
Route::middleware(['auth:sanctum', 'role:super'])->group(function () {
    Route::get("startSuper",[HomeController::class,'startSuper']);
    Route::get('messages',[HomeController::class,'getMessage']);
    Route::put('updateView',[HomeController::class,'updateView']);
    Route::post('addSlider',[HomeController::class,"addSlider"]);
    Route::post("removeSlider",[HomeController::class,"removeSlider"]);
    Route::put('readmessage/{message}',[HomeController::class,"updateMessage"]);
    Route::delete('removeMessage/{message}',[HomeController::class,'removeMessage']);
    Route::put('agreeCourse/{course}',[CourseController::class,'AgreeCourse']);
    
});
Route::middleware('auth:sanctum')->group(function () {
Route::post('addmessage',[HomeController::class,'addMessage']);
Route::get("getSliders",[HomeController::class,"getSliders"]);

Route::post('nextlesson',[LessonController::class,'updateInfo']);
Route::patch('updateTest/{user}/{course}',[CourseController::class,'updateInfoTest']);

Route::get('/mycourses',[CourseController::class,'getUserCourses']);

Route::post('/send-email',[MailController::class,'send']);
Route::post('/chat', [ChatController::class, 'talk']);
Route::post('/buyCourse',[CourseController::class,'buyCourse']);
Route::post('/addView',[HomeController::class,'addView']);
Route::get('/checkView',[HomeController::class,'checkView']);
Route::delete('/deleteAccount',[UserController::class,'deleteAccount']);

});
// google login in 

