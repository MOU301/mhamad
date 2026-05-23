<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Http\Resources\CourseAdminResource;
use App\Http\Resources\CourseResource;
use App\Models\Author;
use App\Models\User;

class AdminContronller extends Controller
{
  public function getAllCourses(){

  $user = auth()->user();
  

    $courses = $user->author
        ->courses()
        ->with('lessons')
        ->get();
 
    return CourseAdminResource::collection($courses);
  }
}
