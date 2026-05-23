<?php
namespace App\Services;
 use App\Models\Lessondata;
 use App\Models\Image;
use Illuminate\Support\Facades\File;
use Illuminate\Http\Request;

use Exception;
  class MadiService
{
 
    public function syncLessonMedia(
        Lessondata $lessondata,
        array $data,
        Request $request,
        int $index
    ){
        

        if (!isset($data['src'])) {
            return  'not src';
        }
            
        $images = [];
        $links  = [];

        foreach ($data['src'] as $i => $item) {
           
            $file = $request->file("lesson_data.$index.src.$i");
           
            if ($file) {
              
                if($data['type']=='video'){

                   $path = $file->store('video', 'public');
                }else if ($data['type']=='audio'){
            
                   $path = $file->store('audio', 'public');
                }
                else{ 
                   
                   $path = $file->store('image', 'public');
                
                }
              
                $images[] = $path;
                continue;
            }

            if (str_contains($item, '<iframe')) {
                $links[] = $item;
            } else {
                $relativePath = str_replace(asset('storage').'/', '', $item);
                if (!File::exists(storage_path('app/public/'.$relativePath))) {
                    throw new \Exception('File not found');
                }
                $images[] = $relativePath;
            }
        }

        Image::where('lessondata_id', $lessondata->id)->delete();

        foreach (array_merge($images, $links) as $src) {
            Image::create([
                'lessondata_id' => $lessondata->id,
                'src' => $src
            ]);
        }
      
    }
}

