<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use App\Models\User;
use App\Models\Product;
use Inertia\Inertia;

class ProductComment extends Model
{
    protected $fillable = ['user_id', 'product_id', 'comment', 'rating'];

    public function user(): BelongsTo
    {
        return $this->belongsTo(User::class);
    }

    public function product(): BelongsTo
    {
        return $this->belongsTo(Product::class);
    }
    public function show($id)
    {
        $product = Product::with(['comments.user', 'mypes'])
            ->withAvg('comments as average_rating', 'rating')
            ->findOrFail($id);

        return Inertia::render('DetalleProducto', [
            'product' => $product,
        ]);
    }
}
