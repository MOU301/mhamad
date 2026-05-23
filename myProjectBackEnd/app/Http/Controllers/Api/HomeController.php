<?php
namespace App\Http\Controllers\Api;
use App\Http\Controllers\Controller;
use App\Http\Resources\Course_UserResource;
use App\Http\Resources\CourseResource;
use App\Http\Resources\CourseSuperResource;
use App\Http\Resources\MessageResource;
use App\Http\Resources\SliderResource;
use App\Http\Resources\UserResource;
use App\Http\Resources\ViewResource;
use App\Models\Course;
use App\Models\Message;
use App\Models\Slider;
use App\Models\User;
use App\Models\View;
use Illuminate\Http\Client\ResponseSequence;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\File;
use App\Services\HomeService;

use function PHPSTORM_META\map;

class HomeController extends Controller
{
   public function start(HomeService $homeService){

      $data=$homeService->HomeStart();
        
               return response()->json([
                  'data' => [
                        'slider'  => $data['slider'],
                        'courses' => CourseResource::collection($data['courses']),
                        'views'   => ViewResource::collection($data['views']),
                     ]
                  ]);
   }
   public function addMessage(Request $request ,HomeService $homeService){
        $request->validate([
        'message' => 'required|string|max:1000',
       ]);
    try {

        $message = $homeService->HomeAddMessage(auth()->id(), $request->message);

        return response()->json([
            'message' => 'success',
            'data'=>$message
            
        ], 201);
   
    } catch (\Exception $e) {
        return response()->json([
            'message' => $e->getMessage()
        ], 500);
    }
}
   public function getMessage(){
      $message=Message::with('user')->get();
      return MessageResource::collection($message);
   }
   public function removeMessage(Message $message){

      try {
       $message->delete();
       return response()->json(['message'=>'success']);
      }catch(\Exception $e){
         return response()->json(['message'=>$e->getMessage()],404);
      }
      
     
      
   }
   public function updateMessage(Message $message){
    
      try{
        $message->update(["status"=>true]);
        return response()->json(['message'=>'success','data'=>$message]);
      }
        catch(\Excepton $e){
        return response()->json(['message'=>$e->getMessage()]);
      }
   }
   public function startSuper(){

      $slider=Slider::pluck('image')->toArray();
    
      $courses = Course::with(['author.user','users','lessons'])->get();
      $views=View::with('user.courses')->get();
      $users=User::with('courses')->get();
      $message=Message::with('user')->get();
      $sliderUrl=array_map(function($image){
         return asset('storage/'.$image);
      },$slider);
      return response()->json(
        ["data"=>[
            "slider"=>$sliderUrl,
            "courses"=>CourseSuperResource::collection($courses),
            "views"=>ViewResource::collection($views),
            "users"=>UserResource::collection($users),
            "messages"=>MessageResource::collection($message)
            ]
        ]);
   }
   public function updateView(Request $request){
     foreach($request->views as $item){
     View::where('id',$item['id'])->update(['state'=>$item['state']]);
    }
    return response()->json(["message"=>"success "]);
   }
   public function addSlider(Request $request ,HomeService $homeService){

         $request->validate([
         'slider' => 'required|array',
          ]);

      try{
     
     $sliders=$homeService->HomeAddSlider($request->slider);
   
      return response()->json(['message'=>'success',"data"=>$sliders]);
      }catch(\Exception $e){
         return response()->josn([
            "message"=>'slider update Faild',
            "error"=>$e->getMessage(),
         ]);
      }
      
   
   }
   public function removeSlider(Request $request,HomeService $homeService){
           $request->validate([
            'image'=>'required|string'
           ]);
           try{
            $homeService->HomeRemoveSlider($request->image);
             return response()->json(['message'=>'success'],200);
           }
           catch(\Exception $e){
             return response()->json(['message'=>$e->getMessage()],404);
           }
    
      
        
   }
   public function getSliders(){
      $sliders=Slider::all();
      return $sliders;
   }
   public function addView(Request $request,HomeService $homeService){
      $request->validate([
         'viewInfo'=>"required|string|max:300"
      ]);
     try{
      $homeService->HomeAddView(auth()->user(),$request->viewInfo);
      return response()->json(['message'=>'success'],200);
     }
     catch(\Exception $e){
      return response()->json(['message'=>$e->getMessage()],404);
     }
  
     
   }
   public function checkView(){
      $user=auth()->user();
     $hasView = $user->view()->exists();
    return response()->json(['message' => $hasView]);
   }
   public function checkEmail(Request $request){
      return 'check code '; 
   }
}