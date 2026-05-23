<?php

namespace App\Services;
use App\Models\Course;
use App\Models\Lesson;
use App\Models\User;
use App\Models\Image;
use App\Services\LessonDataService;
use Illuminate\Support\Facades\File;
use Illuminate\Http\Request;
use App\Models\Lessondata;
use Exception;
class LessonService
{

const FINISHED = 100;
 public function NextLessonService($user,$courseId,$lessonNumber){
          $course = Course::find($courseId);

            if (!$course) {
             return 'course not found';
            }

            $userCourse = $user->courses()->where('course_id', $courseId)->first();
            $lessonsCount=Lesson::where(['course_id'=> $courseId,'type'=>'lesson'])->count();
            
            if ($userCourse) {
                $nextLesson = $userCourse->pivot->next_lesson;
                if ($nextLesson == self::FINISHED) {
                      return 'finish';
                    }
           
                if ($nextLesson != $lessonNumber) {
                      return 'no_update';
                    }
                        
                $newNextLesson = ($nextLesson + 1 > $lessonsCount)
                ? ($course->ended ? self::FINISHED:$nextLesson)
                : $nextLesson + 1;

                $user->courses()->updateExistingPivot($courseId, [
                'next_lesson' => $newNextLesson
                 ]);

               return 'success';
                       
                    

            } else { 
                if ($course->price == 0) {
                    $user->courses()->attach($courseId, ['next_lesson' => 2,'next_test'=>1]); 
                    return 'added';
                } 
                    return 'buy';
                
            }
 }
public function AddLessonService($user,$course,$data){
    
   $author=$user->author;
   if(!$author){
    throw new Exception('not allowed');
   }

   $number=$this->resolveLessonNumber($course,$data);
  
   
    if ($course->lessons()->where(['name'=> $data->name,])->exists()) {
        throw new Exception('change the name');
    }

    $lesson=Lesson::create([
                "name"=>$data['name'],
                "type"=>$data['type'],
                "number"=>$number,
                "course_id"=>$course->id,
            ]); 
 return $lesson; 

}
public function updateLessonService(Course $course,Lesson $lesson,Request $request){
 
    $lesson->update([
            "type"=>$request->type,
            "name"=>$request->name,
            "number"=>$request->number ,
            "course_id"=>$course->id
          ]);
          return $lesson;
       
}
public function resolveLessonNumber($course,$data){
   
    if($data->filled('number')){
    
        return $data->number;
    }

    if ($data->type === 'test') {
    $latest = $course->lessons()
    ->where('type', 'test')
    ->max('number');

    } else {
             $latest = $course->lessons()
                ->where('type', 'lesson')
                ->max('number');
           }

    return $latest ? $latest+1:1;
}


public function deleteLessonService (User $user,Course $course,Lesson $lesson){
    $lessonDataType= Lessondata::where('lesson_id',$lesson->id)->pluck('type');
    $typeArr=['audio','vedio','fillWithImage','fillWithImageClick','Dialog','gramatik'];
     $author = $user->author;
 
        if ($course->author_id!=$author->id) {
            throw new Exception('you can not delete this lesson');
        }  
        $lesson->delete();
        $state=false;
        foreach($lessonDataType as $type){
            if(in_array($type,$typeArr)){
                 $state=true;
            }
        }
        if($state){
         $this->cleanupUnusedMedia();  
        }
           
}


protected function cleanupUnusedMedia()
{
    $folders = ['image', 'video', 'audio'];
    $usedFiles =Image::pluck('src')->toArray(); 

    foreach ($folders as $folder) {
        $folderPath = storage_path("app/public/{$folder}");

        if (!File::exists($folderPath)) {
            continue; 
        }

        $files = File::files($folderPath);

        foreach ($files as $file) {
            $relativePath = $folder . '/' . $file->getFilename(); 

            if (!in_array($relativePath, $usedFiles)) {
                File::delete($file->getPathname());
            }
        }
    }
}

}
