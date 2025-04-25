<?php

namespace App\Http\Controllers;

use App\Models\MypeProduct;
use Illuminate\Http\JsonResponse;

class MypeProductController extends Controller
{
    /**
     * Método para obtener los productos con bajo stock de una MYPE específica.
     */
    public function bajoStockPorMype(int $mypeId): JsonResponse
    {
        $productos = MypeProduct::where('mype_id', $mypeId)
            ->whereColumn('stock', '<', 'min_stock')
            ->with('product') // Asegúrate de que la relación esté configurada
            ->get();

        return response()->json($productos);
    }
}
