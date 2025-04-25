<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

/**
 * @property int $mype_id
 * @property int $product_id
 */
class InventoryHistory extends Model
{
    protected $fillable = [
        'mype_id',
        'product_id',
        'cantidad_cambiada',
        'tipo_cambio',
        'comentario',
    ];

    /**
     * Relación inversa de muchos a uno con Mype.
     *
     * @return BelongsTo<\App\Models\Mype, self>
     */
    public function mype(): BelongsTo
    {
        /** @var BelongsTo<\App\Models\Mype, self> */
        return $this->belongsTo(Mype::class);
    }

    /**
     * Relación inversa de muchos a uno con Producto.
     *
     * @return BelongsTo<\App\Models\Product, self>
     */
    public function product(): BelongsTo
    {
        /** @var BelongsTo<\App\Models\Product, self> */
        return $this->belongsTo(Product::class);
    }
}
