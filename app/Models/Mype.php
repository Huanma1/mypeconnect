<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Mype extends Model
{

    // Campos que se pueden asignar masivamente 
    protected $fillable = [ 
        'name',
        'email',
        'password',
        'phone_number',
        'mype_rate',
        'mype_address',
        'mype_description',
    ];

    /**
     * Relación muchos a muchos con productos.
     */
    public function products()
    {
        return $this->belongsToMany(Product::class, 'mype_products')
                    ->withPivot('custom_price', 'stock') // Incluye los campos adicionales de la tabla pivote
                    ->withTimestamps();
    }
    
}