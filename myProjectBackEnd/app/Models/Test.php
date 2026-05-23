<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Test extends Model
{
    protected $fillable = [
        'name',
        'number',
        'course_id',
    ];
    public function course():BelongsTo
    {
        return $this->belongsTo(Course::class);
    }
   
    public function lessondatas(): HasMany
    {
        return $this->hasMany(Lessondata::class);
    }
}
