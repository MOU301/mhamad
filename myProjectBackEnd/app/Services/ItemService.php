<?php

namespace App\Services;
use App\Models\Ansur;
use App\Models\Choice;
use App\Models\Bot;
class ItemService
{
    /**
     * Create a new class instance.
     */
    public function AddItem($data,$lessondata_id){
      
        Ansur::where('lessondata_id', $lessondata_id)->delete();
        Bot::where('lessondata_id',$lessondata_id)->delete(); 
        Choice::where('lessondata_id',$lessondata_id)->delete();
    
            if(!empty($data['ansur']) && is_array($data['ansur'])){  
               
                foreach ($data['ansur'] as $ansurText) {
                    Ansur::create([
                        "lessondata_id" =>$lessondata_id,
                        "ansur" => $ansurText
                    ]);
                }  

            }
            if(!empty($data['bot']) && is_array($data['bot'])){
    
                foreach($data['bot'] as $ii=>$dd){
                  
                    $bot=Bot::create([
                        "lessondata_id"=>$lessondata_id,
                        "ask"=>$dd['ask'],
                        "feedBack"=>$dd['feedBack'] ?? null,
                    ]);
                

                    for($j=0 ; $j<count($dd['ansur']) ; $j++){
                        Ansur::create([
                        "bot_id"=>$bot->id,
                        "ansur"=>$dd['ansur'][$j],
                        ]);
                    }
                    
                }
            }  
            if(!empty($data['choice']) && is_array($data['choice'])){
        
                foreach($data['choice'] as $ii=>$dd){
               
                    $choice=Choice::create([
                        "lessondata_id"=>$lessondata_id,
                        "ask"=>$dd['ask'],
                        "correct"=>$dd['correct'],
                    ]);
                
                    for($j=0 ; $j<count($dd['ansur']) ; $j++){
                        
                        Ansur::create([
                        "choice_id"=>$choice->id,
                        "ansur"=>$dd['ansur'][$j],
                        ]);
                    }   
                }
            }
    }
}
