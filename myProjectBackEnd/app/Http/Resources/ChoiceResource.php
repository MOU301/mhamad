<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class ChoiceResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @return array<string, mixed>
     */
    public function toArray(Request $request): array
    {
         return [
            'ask'=>$this->ask,
            'correct'=>$this->correct,
            'ansur'=>$this->whenLoaded('ansurs',function(){
                return $this->ansurs->pluck('ansur');
            })
        ];
    }
}
