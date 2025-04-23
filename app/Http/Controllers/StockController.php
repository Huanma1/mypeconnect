<?php
namespace App\Http\Controllers;

use App\Models\Mype;
use Illuminate\Http\Request;
use App\Models\Product;

class StockController extends Controller
{
    public function updateStockAndPrice(Request $request, $productId)
{
    $request->validate([
        'cantidad' => 'nullable|integer|min:1', // Opcional
        'tipo' => 'nullable|string|in:entrada,salida', // Opcional
        'custom_price' => 'required|numeric|min:0', // Obligatorio
        'comentario' => 'nullable|string',
    ]);

    $mype = auth()->guard('mype')->user();

    if (!$mype) {
        return redirect()->back()->withErrors(['error' => 'No estás autenticado.']);
    }

    try {
        // Obtener el producto asociado
        $productPivot = $mype->products()->find($productId)?->pivot;

        if (!$productPivot) {
            throw new \Exception('El producto no está asociado a esta MYPE.');
        }

        // Si se proporciona una cantidad y un tipo, actualiza el stock
        if ($request->filled('cantidad') && $request->filled('tipo')) {
            $nuevoStock = $request->tipo === 'entrada'
                ? $productPivot->stock + $request->cantidad
                : $productPivot->stock - $request->cantidad;

            if ($nuevoStock < 0) {
                throw new \Exception('El stock no puede ser negativo.');
            }

            // Actualizar el stock en la tabla pivote
            $mype->products()->updateExistingPivot($productId, [
                'stock' => $nuevoStock,
            ]);

            // Registrar el cambio en el historial de inventario
            \App\Models\InventoryHistory::create([
                'mype_id' => $mype->id,
                'product_id' => $productId,
                'cantidad_cambiada' => $request->cantidad,
                'tipo_cambio' => $request->tipo,
                'comentario' => $request->comentario,
            ]);
        }

        // Actualizar siempre el precio personalizado
        $mype->products()->updateExistingPivot($productId, [
            'custom_price' => $request->custom_price,
        ]);

    } catch (\Exception $e) {
        return redirect()->back()->withErrors(['error' => $e->getMessage()]);
    }

    return redirect()->route('dashboard.products.list')->with('success', 'Precio y/o stock actualizado correctamente.');
}

}