<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsToMany;
use Illuminate\Database\Eloquent\Relations\Pivot;

class Product extends Model
{
    use HasFactory;

    protected $fillable = [
        'product_name',
        'product_description',
        'category',
    ];

    /**
     * Relación muchos a muchos con Mypes.
     *
     * @return BelongsToMany<Mype, Product, Pivot, string>
     */
    public function mypes(): BelongsToMany
    {
        /** @var BelongsToMany<Mype, Product, Pivot, string> $relation */
        $relation = $this->belongsToMany(Mype::class, 'mype_products')
            ->withPivot('custom_price', 'stock', 'product_rate')
            ->withTimestamps();

        return $relation;
    }
    public function comments()
    {
        return $this->hasMany(ProductComment::class);
    }
    public function mype()
    {
        return $this->belongsTo(Mype::class);
    }
}
