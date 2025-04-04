<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class products extends Model
{
    
    
    protected $fillable = ['name', 'owner_id'];

    public function products() {
        return $this->belongsToMany(products::class, 'store_products')
                    ->withPivot('stock')
                    ->withTimestamps();
    
    }
}
