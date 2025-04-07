<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class products extends Model
{
    public function products() {
        return $this->belongsToMany(Store::class, 'store_products')
                    ->withPivot('stock')
                    ->withTimestamps();
    
    }
}
