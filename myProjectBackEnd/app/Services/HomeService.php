<?php

namespace App\Services;
use App\Models\Course;
use App\Models\Slider;
use App\Models\View;
use App\Models\Message;
use Illuminate\Support\Facades\File;
use Exception;
class HomeService
{
    /**
     * Create a new class instance.]
     */
  public function HomeStart(){
      $sliders=Slider::pluck('image');
      $courses=Course::with('lessons')->where('status',true)->get();
      $views=View::with('user.courses')->where('state',true)->get();
      $slidersUrl=[];
      foreach($sliders as $slider){
         $link=asset('storage').'/'.$slider;
      $slidersUrl[]=$link;
      }
      return [
            "slider"=>$slidersUrl,
            "courses"=>$courses,
            "views"=>$views
      ];
     
  }
  public function HomeAddMessage(int $userId,string $message){

        return Message::create([
                    "user_id"=>$userId,
                    "message"=>$message,
                ]);
    
        
  }
  public function HomeAddSlider(array $sliders){
  
     Slider::query()->delete();
     
        $sliderUse = [];
        foreach ($sliders as $file) {
            if (!is_string($file)) {
                // ملف جديد
                $path = $file->store('sliders', 'public');
                Slider::create(['image' => $path]);
                $sliderUse[] = $path;
            } else {
                // رابط موجود مسبقًا
                $fileName = str_replace(asset('storage') . '/', '', $file);
                Slider::create(['image' => $fileName]);
                $sliderUse[] = $fileName;
            }
        }
       

        // تنظيف الملفات الفعلية في مجلد التخزين
        $allFiles = File::files(storage_path('app/public/sliders'));
  
        foreach ($allFiles as $file) {
            $relative = 'sliders/' . $file->getFilename();
            if (!in_array($relative, $sliderUse)) {
                File::delete($file->getPathname());
            }
        }
         

        return $sliderUse;

  }
  public function HomeRemoveSlider(string $imageURL){

    $image=str_replace(asset('storage/').'/','',$imageURL);
    $slider=Slider::where('image',$image)->first();
  
    if(!$slider){
        throw new Exception("slider not found");
      }
      $filePath = public_path('storage/'. $slider->image);
    
    if(File::exists($filePath)){
        File::delete($filePath);
    }
   
   $slider->delete();
  }
  public function HomeAddView(Object $user,String $viewInfo){

     $view=$user->view()->first();
      if($view){
        throw new Exception("the view is exist");
      }
         View::create([
            "user_id"=>$user->id,
            "body"=>$viewInfo
         ]);
      
      
  }

}
