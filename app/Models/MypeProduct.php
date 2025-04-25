<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\Pivot;

class MypeProduct extends Pivot
{
    protected $table = 'mype_products';

    protected $fillable = ['mype_id', 'product_id', 'custom_price', 'stock', 'product_rate', 'min_stock'];

    /**
     * Relación con Mype.
     */
    public function mype(): BelongsTo
    {
        return $this->belongsTo(Mype::class);
    }

    /**
     * Relación con Product.
     */
    public function product(): BelongsTo
    {
        return $this->belongsTo(Product::class);
    }
}
