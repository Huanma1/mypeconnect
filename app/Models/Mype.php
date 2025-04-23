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

    public function inventoryHistories()
    {
        return $this->hasMany(InventoryHistory::class);
    }

    public function registrarCambioStock($productId, $cantidad, $tipo, $comentario = null)
    {
        $productPivot = $this->products()->find($productId)?->pivot;

        if (!$productPivot) {
            throw new \Exception('El producto no está asociado a esta MYPE.');
        }

        $nuevoStock = $tipo === 'entrada'
            ? $productPivot->stock + $cantidad
            : $productPivot->stock - $cantidad;

        if ($nuevoStock < 0) {
            throw new \Exception('El stock no puede ser negativo.');
        }

        $this->products()->updateExistingPivot($productId, ['stock' => $nuevoStock]);

        \App\Models\InventoryHistory::create([
            'mype_id' => $this->id,
            'product_id' => $productId,
            'cantidad_cambiada' => $cantidad,
            'tipo_cambio' => $tipo,
            'comentario' => $comentario,
        ]);
    }
}