<?php

namespace App\Services;
use App\Models\Lessondata;
use App\Models\Bot;
use App\Models\Ansur;
use App\Models\Choice;
use App\Models\Image;
use App\MOdels\Lesson;
class LessonDataService

{
 
// public function storeLessonDataService($lesson,$request){

//    foreach($request->lesson_data as $index=>$data){
//             $lessondata=Lessondata::create([
//                 'lesson_id'=>$lesson->id,
//                 'type'=>$data['type'],
//                 'number'=>$data['number'],
//                 'text'=>$data['text'] ?? null,
//                 'ask'=>$data['ask'] ?? null
//             ]);
            

//             $lessondata_id=$lessondata->id;
//             if($data['type']=='bot'){
                
//                 foreach($data['bot'] as $i=>$e){
//                     $bot=Bot::create([
//                         'lessondata_id'=>$lessondata_id,
//                         "ask"=>$e['ask'],
//                         "feedBack"=>$e['feedBack'] ?? null,   
//                     ]);
//                     $bot_id=$bot->id;
                
//                     for($i=0 ; $i<count($e['ansur']) ; $i++){
//                         Ansur::create([
//                             'bot_id'=>$bot_id,
//                             "ansur"=>$e['ansur'][$i]
//                         ]);
//                     }
//                 }
//             }
//             if($data['type']=='choice'){
                
//                 foreach($data['choice'] as $i=>$e){
//                     $choice=Choice::create([
//                         'lessondata_id'=>$lessondata_id,
//                         "ask"=>$e['ask'],
//                         "correct"=>$e['correct'] ?? null,   
//                     ]);
//                     $choice_id=$choice->id;
                
//                     for($i=0 ; $i<count($e['ansur']) ; $i++){
//                         Ansur::create([
//                             'choice_id'=>$choice_id,
//                             "ansur"=>$e['ansur'][$i]
//                         ]);
//                     }
//                 }
//             }
//             if (isset($data['src']) && is_array($data['src'])) {
//                     foreach ($data['src'] as $i => $item) {

//                         // Case 1: The item is a string (link, iframe, etc.)
//                         if (is_string($item)) {
//                             Image::create([
//                                 'lessondata_id' => $lessondata_id,
//                                 'src' => $item, // save full HTML or URL
//                             ]);
//                         }

//                         // Case 2: The item is an uploaded file (image, video, audio)
//                         elseif ($request->hasFile("lesson_data.$index.src.$i")) {
//                             $file = $request->file("lesson_data.$index.src.$i");

//                             if ($file) {
//                                 switch ($data['type']) {
//                                     case 'video':
//                                         $pathName = $file->store('video', 'public');
//                                         break;
//                                     case 'audio':
//                                         $pathName = $file->store('audio', 'public');
//                                         break;
//                                     default:
//                                         $pathName = $file->store('image', 'public');
//                                         break;
//                                 }

//                                 Image::create([
//                                     'lessondata_id' => $lessondata_id,
//                                     'src' => $pathName,
//                                 ]);
//                             }
//                         }
//                     }
//             }
//             if(isset($data['ansur'])){
//                 for($i=0 ; $i<count($data['ansur']) ; $i++){
//                     Ansur::create([
//                         "lessondata_id"=>$lessondata->id,
//                         "ansur"=>$data['ansur'][$i]
//                     ]);  
//                 } 
//             }  
            
//         }
// }
 public function updateLessonDataService(Lesson $lesson,array $data)
 {

        if (isset($data['id'])) {
          
            $lessondata = Lessondata::findOrFail($data['id']);
        
            $lessondata->update([
                'type'   => $data['type'],
                'number' => $data['number'],
                'text'   => $data['text'] ?? null,
                'ask'    => $data['ask'] ?? null,
            ]);
        } else {
    
            $lessondata = Lessondata::create([
                'lesson_id' => $lesson->id,
                'type'      => $data['type'],
                'number'    => $data['number'],
                'text'      => $data['text'] ?? null,
                'ask'       => $data['ask'] ?? null,
            ]);
           
        }
        return $lessondata;
 }

  
}
