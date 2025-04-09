<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Product extends Model
{
    public function products() {
        return $this->belongsToMany(Store::class, 'store_products')
                    ->withPivot('stock')
                    ->withTimestamps();
    
    }
}
