<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Relations\BelongsToMany;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Notifications\Notifiable;
use Illuminate\Database\Eloquent\Model;

/**
 * @property int $id
 * @property string $name
 */
class Mype extends Authenticatable
{
    /**
     * @use HasFactory<\Illuminate\Database\Eloquent\Factories\Factory<Mype>>
     */
    use HasFactory, Notifiable;

    protected $table = 'mypes';

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
        'password',
        'remember_token',
    ];

    /**
     * Relación muchos a muchos con productos.
     *
     * @return BelongsToMany<Product, Mype, MypeProduct>
     */
    public function products(): BelongsToMany
    {
        /** @var BelongsToMany<Product, Mype, MypeProduct> */
        return $this->belongsToMany(Product::class, 'mype_products')
            ->using(MypeProduct::class)
            ->withPivot('custom_price', 'stock', 'product_rate');
    }

    /**
     * Relación uno a muchos con los historiales de inventario.
     *
     * @return HasMany<InventoryHistory, Mype>
     */
    public function inventoryHistories(): HasMany
    {
        /** @var HasMany<InventoryHistory, Mype> */
        return $this->hasMany(InventoryHistory::class, 'mype_id');
    }

    /**
     * Registrar el cambio de stock de un producto.
     *
     *
     * @throws \Exception
     */
    public function registrarCambioStock(int $productId, int|float $cantidad, string $tipo, ?string $comentario = null): void
    {
        $product = $this->products()->where('product_id', $productId)->first();
        if (! $product || ! isset($product->pivot->stock)) {
            throw new \Exception('El producto no está asociado a esta MYPE o no tiene stock definido.');
        }

        if (! in_array($tipo, ['entrada', 'salida'])) {
            throw new \Exception('Tipo de cambio no válido.');
        }

        $stockActual = intval($product->pivot->stock ?? 0);
        $cantidadInt = intval($cantidad);
        $nuevoStock = $tipo === 'entrada' ? $stockActual + $cantidadInt : $stockActual - $cantidadInt;

        if ($nuevoStock < 0) {
            throw new \Exception('El stock no puede ser negativo.');
        }

        $this->products()->updateExistingPivot($productId, ['stock' => $nuevoStock]);

        InventoryHistory::create([
            'mype_id' => $this->id,
            'product_id' => $productId,
            'cantidad_cambiada' => $cantidadInt,
            'tipo_cambio' => $tipo,
            'comentario' => $comentario,
        ]);
    }
}
