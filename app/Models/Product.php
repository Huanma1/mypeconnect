<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Product extends Model
{
    use HasFactory;
    // Campos que se pueden asignar masivamente 
    protected $fillable = [
        'product_name',
        'product_description',
        'category',
        'rating',
    ];

    /**
     * Relación muchos a muchos con Mypes.
     */
    public function mypes()
    {
        return $this->belongsToMany(Mype::class, 'mype_products')
                    ->withPivot('custom_price', 'stock', 'product_rate') // Incluye los campos adicionales de la tabla pivote
                    ->withTimestamps();
    }
}