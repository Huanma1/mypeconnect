<?php

namespace App\Models;

use Illuminate\Foundation\Auth\User as Authenticatable; // Cambiar de Model a Authenticatable
use Illuminate\Notifications\Notifiable;
use Illuminate\Database\Eloquent\Factories\HasFactory;

class Mype extends Authenticatable // Cambiar de Model a Authenticatable
{
    use HasFactory, Notifiable;

    protected $table = 'mypes'; 

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

    protected $hidden = [
        'password', // Oculta la contraseña al serializar el modelo
        'remember_token',
    ];

    /**
     * Relación muchos a muchos con productos.
     */
    public function products()
    {
        return $this->belongsToMany(Product::class, 'mype_products')
                    ->withPivot('custom_price', 'stock' , 'product_rate') // Incluye los campos adicionales de la tabla pivote
                    ->withTimestamps();
    }
}