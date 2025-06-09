<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class MypeReview extends Model
{
    protected $fillable = ['user_id', 'mype_id', 'rating', 'comment'];

    public function user()
    {
        return $this->belongsTo(User::class);
    }

    public function mype()
    {
        return $this->belongsTo(Mype::class);
    }
}
