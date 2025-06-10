<?php

namespace App\Http\Controllers;

use App\Models\MypeProduct;

class MypeProductController extends Controller
{
    /**
     * Método para obtener los productos con bajo stock de una MYPE específica.
     */
    public function bajoStockPorMype($mypeId)
    {
        $productosBajoStock = MypeProduct::where('mype_id', $mypeId)
            ->whereColumn('stock', '<', 'min_stock')
            ->with('product')
            ->get()
            ->map(function ($mypeProduct) {
                return [
                    'id' => $mypeProduct->product->id,
                    'product_name' => $mypeProduct->product->product_name,
                    'product_description' => $mypeProduct->product->product_description,
                    'category' => $mypeProduct->product->category,
                    'rating' => $mypeProduct->product->rating,
                    'stock' => $mypeProduct->stock,
                    'min_stock' => $mypeProduct->min_stock,
                ];
            });

        return response()->json($productosBajoStock);
    }
}
