<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class TestResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @return array<string, mixed>
     */
    public function toArray(Request $request): array
    {
        return [
            'id' => $this->id,
            'name' => $this->name,
            'number' => $this->number,
            'lesson_data' => LessondataResource::collection($this->lessondatas()->with(['images', 'ansurs', 'bots.ansurs','choices.ansurs'])->orderBy('number')->get()),
        ];
    }
}
