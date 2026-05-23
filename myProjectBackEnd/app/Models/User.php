<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Notifications\Notifiable;
use Laravel\Sanctum\HasApiTokens;
use Illuminate\Database\Eloquent\Relations\HasOne;
use Illuminate\Database\Eloquent\Relations\HasMany;

class User extends Authenticatable
{
    use HasFactory, Notifiable, HasApiTokens;

    protected $fillable = [
        'name',
        'email',
        'password',
        'provider', 
        'google_id',
        'role'
    ];

    protected $hidden = [
        'password',
        'remember_token',
    ];

    protected function casts(): array
    {
        return [
            'email_verified_at' => 'datetime',
            'password' => 'hashed',
        ];
    }

    // العلاقات
    public function author(): HasOne
    {
        return $this->hasOne(Author::class);
    }

    public function message(): HasMany
    {
        return $this->hasMany(Message::class);
    }

    public function view(): HasOne
    {
        return $this->hasOne(View::class);
    }

    public function courses()
    {
        return $this->belongsToMany(Course::class,'course_user')->withPivot('next_lesson');
    }
}
