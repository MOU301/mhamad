<?php

namespace App\Services;
use App\Models\User;
use App\Models\Course;
use App\Models\Author;
use Illuminate\Http\Request;
use App\Http\Resources\LessonResource;
use Illuminate\Support\Facades\File;
class CourseService
{
 public function addCourseService(User $user,Request $request){

       $author = Author::firstOrCreate([
        'user_id' => $user->id,
    ]);

    // Check if course already exists
    if (Course::where('author_id', $author->id)
              ->where('name', $request->name)
              ->exists()) {
        throw new \Exception('Course already exists');
    }

    // Handle file upload (optional)
    $boosterPath = null;
    if ($request->hasFile('bostter')) {
        $boosterPath = $request->file('bostter')->store('course_bostter', 'public');
    }
  
    // Create course
    return Course::create([
        'author_id' => $author->id,
        'name'      => $request->name,
        'bostter'   => $boosterPath,
        'price'     => $request->price,  
    ]);
 }
 public function updateCourseService(User $user,Course $course,Request $request){
 
    // Check if course already exists
    // Authorization check
    if ($course->author->user_id !== $user->id) {
        throw new \Exception('You are not allowed to update this course');
    }

    // Keep old booster by default
    $boosterPath = str_replace(asset('storage').'/','',$course->bostter);
  
  
    // Upload new booster if provided
    if ($request->hasFile('bostter')) {

        
         $filePath = storage_path('app/public/' . $course->bostter);
            if(File::exists($filePath)){
                File::delete($filePath);
               }

        $boosterPath = $request->file('bostter')
                               ->store('course_bostter', 'public');
    }

    // Update course
    $course->update([
        'name'    => $request->name,
        'bostter' => $boosterPath,
        'price'   => $request->price,
    ]);

    return $course;
}
public function getMyCourseService(User $user)
{
    $courses = $user->courses()
        ->with('lessons.lessondatas', 'author.user')
        ->where('status', true)
        ->get();

    $data = [];

    foreach ($courses as $course) {

        $lessonsArr = [];
        $tests = collect(); // ✅ ALWAYS a collection

        $next_lesson = $course->users()->where('user_id', $user->id)->value('next_lesson');
        $next_test   = $course->users()->where('user_id', $user->id)->value('next_test');
        $state_test  = $course->users()->where('user_id', $user->id)->value('state');

        $numberLesson = null;

        if ($next_lesson == 100) {

            $lessons = $course->lessons()->where('type','lesson')->with('lessondatas')->get();

            if (!$state_test) {
                $tests = $course->lessons()
                    ->where('type', 'test')
                    ->where('number', $next_test)
                    ->with('lessondatas')
                    ->get();
            }

        } else {
               
            $lessons = $course->lessons()
                ->where('type', 'lesson')
                ->where('number', '<=', $next_lesson)
                ->with('lessondatas')
                ->get();
            if($lessons->count()==$next_lesson){
                if (!$state_test) {
                    $tests = $course->lessons()
                        ->where('type', 'test')
                        ->where('number', $next_test)
                        ->with('lessondatas')
                        ->get();
                 }
                 
            foreach ($lessons as $lesson) {
               $lesson->test = 0;
               $lessonsArr[] = $lesson;
             }
            }else{
                $lessonsTests = $course->lessons()
                    ->where('type', 'lesson')
                    ->where('test', 1)
                    ->where('number', '<=', $next_lesson)
                    ->get();

                $lastLesson = $lessons->last();

                if ($lastLesson && $lastLesson->test) {

                    $index = $lessonsTests
                        ->pluck('number')
                        ->search($lastLesson->number);

                    if ($index !== false && $index === $lessonsTests->count() - 1)  {
                        $numberLesson = $lastLesson->number;

                        $tests = $course->lessons()
                            ->where('type', 'test')
                            ->where('number', $next_test)
                            ->with('lessondatas')
                            ->get();
                    }
                }
            foreach ($lessons as $lesson) {
            $lesson->test = ($lesson->number === $numberLesson) ? 1 : 0;
            $lessonsArr[] = $lesson;
             }
            }
         }

       

        $data[] = [
            'id'      => $course->id,
            'bostter' => asset('storage/' . $course->bostter),
            "price"=>$course->price,
            'title'   => $course->name,
            'author'  => $course->author->user->name ?? null,
            'ended'   =>$course->ended,
            'lessons' =>count($lessonsArr)>0 ?  LessonResource::collection($lessonsArr):[],
            'tests'   => LessonResource::collection($tests),
        ];
    }

    return $data;
}



}