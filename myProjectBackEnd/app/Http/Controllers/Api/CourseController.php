<?php

namespace App\Http\Controllers\Api;
use App\Models\Course;
use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Http\Requests\StoreCourseRequest;
use App\Http\Resources\Course_UserResource;
use App\Http\Resources\CourseResource;
use App\Http\Resources\LessonResource;
use App\Models\Author;
use App\Models\Info;
use App\Models\Lesson;
use App\Models\User;
use Illuminate\Support\Facades\File;
use Illuminate\Container\Attributes\Auth;
use Illuminate\Container\Attributes\Storage;

use App\Services\CourseService;

use function PHPSTORM_META\elementType;
use function PHPSTORM_META\map;
use function PHPUnit\Framework\returnSelf;

class CourseController extends Controller
{
    public function getUserCourses(CourseService $courseService)
    { 
   
        $user=auth()->user();
        $data=$courseService->getMyCourseService($user);
        return Course_UserResource::collection($data);
    }

   public function BuyCourse(Request $request){
    $user=autho()->user();
    if($user->courses()->where('id',$request->course_id)->first()){
       return response()->json(['message'=>'old']);
    }else{
        //send request to baygetway to pay 
        $user->courses()->attach($request->course_id,['next_lesson'=>1,"next_test"=>1]);
        return resopnse()->json(["message"=>'success']);
    }
 
   }
  
public function updateInfoTest(User $user, Course $course)
{

    $tests = Lesson::where('course_id', $course->id)
                    ->where('type', 'test')
                    ->get();


    $next_test = $user->courses()
                      ->where('course_id', $course->id)
                      ->value('next_test');

    if ($next_test < count($tests)) {

        $next_test = $next_test + 1;

       
        $user->courses()->updateExistingPivot(
            $course->id,
            ['next_test' => $next_test,
            'state'=>0
            ]
        );

        return response()->json(['message' => 'success']);
    }else{
        // إذا لم يكن هناك اختبار تالي، يمكن إعادة تعيين أو اتخاذ إجراء آخر حسب الحاجة
        $user->courses()->updateExistingPivot(
            $course->id,
            ['state' => 1] // إعادة تعيين إلى 0 أو أي قيمة أخرى
        );
    }

    return response()->json(['message' => 'finished']);
}
 
    public function AdminCourses(){
        return CourseResource::collection(Course::get());
    }
    public function AgreeCourse(Course $course){
            try{
               if($course->update(["status"=>!$course->status])){
                return response()->json(['message'=>'success'],200);
               }
            }catch(\Exception $e){
                return response()->json(['message'=>$e->getMessage()],500);
            }
              
    }
    public function index()
    {
      return CourseResource::collection(Course::with('users')->where('status',true)->get());
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request,CourseService $courseService)
    {
        $request->validate([
            'name' => 'required|string|max:255',
            'bostter'=>'required|file|mimes:jpg,jpeg,png|max:2048',
            'price'=>"required"
        ]);
       try{
        $courseService->addCourseService(auth()->user(),$request);
        return response()->json(['message'=>'success'],201);
       }catch(\Exception $e){
        return response()->json(['message'=>$e->getMessage()]); 
        }

}
    public function show(Course $course)
    {
        return $course;
    }
    public function update(Request $request, Course $course,CourseService $courseService )
    {
   
        $request->validate([
            'name' => 'required|string|max:255',
            'bostter'=>'required',
            'price'=>"required"
        ]);

        try{
          $courseService->updateCourseService(auth()->user(),$course,$request);
        return response()->json(['message'=>'success'],201);
       }catch(\Exception $e){
        return response()->json(['message'=>$e->getMessage(),500]); 
        }

    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Course $course)
     {
        return response()->json(['message'=>$course->name()]);
        if(!$course->status){
        
            $filePath = storage_path('app/public/' . $course->bostter);

                if(File::exists($filePath)){
                    File::delete($filePath);
                   
                   }
                
                $course->delete();
            return response()->json(['message'=>'success']);
            
        }else{
           if(count($course->users)){
                if($course->update(['status'=>0])){
                    return response()->json(['message'=>'there is persone'.count($course->users).' kauf the course are you sure the course is in database  ?']);
                }
           }else{
              if($course->delete()){
                return response()->json(['message'=>'success']);
              }
           }
            
        }
        
       
        
    }
    
    public function endedCourse(Course $course){
        try{
             $course->update(['ended'=>!$course->ended]);
             return response()->json(['message'=>'success','ended'=>$course->ended]);
        }catch(\Exception $e){
            return response()->json(['message'=>$e->getMessage()]);
        }
        
    }
}
