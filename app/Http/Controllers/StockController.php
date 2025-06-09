<?php

namespace App\Http\Controllers;

use App\Models\InventoryHistory;
use Illuminate\Http\RedirectResponse; // Importa RedirectResponse
use Illuminate\Http\Request;

class StockController extends Controller
{
    public function updateStockAndPrice(Request $request, int $productId): RedirectResponse
    {
        $request->validate([
            'cantidad' => 'nullable|integer|min:1', // Opcional
            'tipo' => 'nullable|string|in:entrada,salida', // Opcional
            'custom_price' => 'nullable|numeric|min:0', // Obligatorio
            'discount' => 'nullable|numeric|min:0|max:100',
            'comentario' => 'nullable|string',
        ]);

        $mype = auth()->guard('mype')->user();

        if (! $mype) {
            return redirect()->back()->withErrors(['error' => 'No estás autenticado.']);
        }

        try {
            // Obtener el producto asociado y acceder al pivote correctamente
            $productPivot = $mype->products()->where('product_id', $productId)->first()?->pivot;

            if (! $productPivot) {
                throw new \Exception('El producto no está asociado a esta MYPE.');
            }

            // Si se proporciona una cantidad y un tipo, actualiza el stock
            if ($request->filled('cantidad') && $request->filled('tipo')) {
                $cantidad = is_numeric($request->cantidad) ? (int) $request->cantidad : 0; // Verificación de cantidad
                $nuevoStock = $request->tipo === 'entrada'
                    ? (int) $productPivot->stock + $cantidad
                    : (int) $productPivot->stock - $cantidad;

                if ($nuevoStock < 0) {
                    throw new \Exception('El stock no puede ser negativo.');
                }

                // Actualizar el stock en la tabla pivote
                $mype->products()->updateExistingPivot($productId, [
                    'stock' => $nuevoStock,
                ]);

                // Registrar el cambio en el historial de inventario
                InventoryHistory::create([
                    'mype_id' => $mype->id,
                    'product_id' => $productId,
                    'cantidad_cambiada' => $cantidad,
                    'tipo_cambio' => $request->tipo,
                    'comentario' => $request->comentario,
                    'discount' => $request->discount, // 👈 Agregado
                ]);
            }

            // Actualizar siempre el precio personalizado
            $mype->products()->updateExistingPivot($productId, [
                'custom_price' => $request->custom_price,
                'discount' => $request->discount, // 👈 Agregado
            ]);

        } catch (\Exception $e) {
            return redirect()->back()->withErrors(['error' => $e->getMessage()]);
        }

        return redirect()->route('dashboard.products.list')->with('success', 'Precio y/o stock actualizado correctamente.');
    }
}
