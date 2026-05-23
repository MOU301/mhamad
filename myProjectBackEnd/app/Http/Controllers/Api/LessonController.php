<?php
namespace App\Http\Controllers\Api;
use App\Http\Controllers\Controller;
use App\Models\Course;
use App\Models\Lesson;
use App\Models\User;

use Illuminate\Http\Request;

use App\Services\LessonService;
use App\Services\LessonDataService;
use App\Services\MadiService;
use App\Services\ItemService;
use Illuminate\Support\Facades\DB;
class LessonController extends Controller
{
    public function updateInfo(Request $request,LessonService $lessonService)
        {
           $request->validate([
            'course_id'=>'required|integer',
            "lesson_number"=>'required|integer'
           ]);
         try{
           $message=$lessonService->NextLessonService(auth()->user(),$request->course_id,$request->lesson_number);
           return response()->json(['message'=>$message],200); 
        }catch(\Exception $e){
            return response()->json(['message'=>$e->getMessage()],500);
          }  
        }
    public function store(
                 Request $request,Course $course,
                 LessonService $lessonService,
                 LessonDataService $lessonDataService,
                 ItemService $itemService,
                 MadiService $mediService)
     {
    
         DB::beginTransaction();
       $user=auth()->user();
   
        $request->validate([
            "name"=>"required|string",
            'type'=>'required|string',
           "lesson_data"=>'required|array',
          
        ]);
    
        try{
          $lesson=$lessonService->AddLessonService($user,$course,$request);
          
             foreach($request->lesson_data as $index=>$data){
              
               $lessonData=$lessonDataService->updateLessonDataService($lesson,$data);
               
          
                $itemService->AddItem($data,$lessonData->id);
         
               $mediService->syncLessonMedia($lessonData, $data, $request, $index); 
              
              }
             DB::commit();
           return response()->json(['message'=>'success'],200);
        }catch(\Exception $e){
          DB::rollBack();
        return response()->json(['message'=>$e->getMessage()],500);
        }
       

  }
    public function update(Request $request,
                            Course $course,
                            Lesson $lesson,
                            LessonService $lessonService,
                            LessonDataService $lessonDataService,
                            MadiService $mediService,
                            ItemService $itemService)
    {

        DB::beginTransaction();
   
        $request->validate([
            'name' => 'required|string',
            'type' => 'required|string',
            'number' => 'required|integer',
            'lesson_data' => 'required|array',
           ]);
          
        try{
     
        $lessonUpdate=$lessonService->updateLessonService($course,$lesson,$request);
    
         foreach($request->lesson_data as $index=>$data){
          
           $lessonData=$lessonDataService->updateLessonDataService($lessonUpdate,$data);
        
            $itemService->AddItem($data,$lessonData->id);
               
          $mediService->syncLessonMedia($lessonData, $data, $request, $index); 
           
         }
         
       DB::commit();
        return response()->json(['message'=>'success'],200);
     
      }catch(\Exception $e){
        DB::rollBack();
            return response()->json([
                'message' => $e->getMessage()
            ], 500);
      }
      
    }
public function destroy(Course $course,Lesson $lesson,LessonService $lessonService)
{  
      try{
      $lessonService->deleteLessonService(auth()->user(),$course,$lesson);
      return response()->json(['message'=>'success'],200);
      }catch(\Exception $e){
        return response()->json(['message'=>$e->getMessage()],500);
      }
     
     
 }

public function addTestBefore(Lesson $lesson)
{
    try{
         $lesson->update(['test' => true]);
        return response()->json([
                'message' => "success"
            ], 200);
    }catch(\EXception $e){
       return response()->json(['message'=>$e->getMessage()],500); 
    }
    
}





}