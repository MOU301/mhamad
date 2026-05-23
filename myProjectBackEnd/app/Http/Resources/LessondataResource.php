<?php

namespace App\Http\Resources;

use App\Models\Bot;
use Illuminate\Console\View\Components\Choice;
use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class LessondataResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @return array<string, mixed>
     */
    public function toArray(Request $request): array
    {
        return [
            "id"=>$this->id,
            "number"=>$this->number,
            "type"=>$this->type,
            "src" => $this->whenLoaded("images", function () {
                return $this->images->map(function ($image) {
                    // check if value looks like an iframe
                    if (stripos($image->src, '<iframe') !== false) {
                        return $image->src; // return raw iframe HTML
                    }

                    // else treat as stored file path
                    return asset('storage/' . $image->src);
                 });
               }),
            "text"=>$this->text,
            "ask"=>$this->ask,
            "bot"=>BotResource::collection($this->whenLoaded('bots')),
            'choice'=>ChoiceResource::collection($this->whenLoaded('choices')),
            "ansur"=>$this->whenLoaded('ansurs',function(){
                return $this->ansurs->pluck('ansur');
            }),
        ];
        // return parent::toArray($request);
    }
}
