<?php

namespace App\Http\Controllers;

use App\Models\Product;
use Illuminate\Http\Request;

class CarritoController extends Controller
{
    public function agregar(Request $request)
    {
        $producto = Product::findOrFail($request->producto_id);

        $carrito = session()->get('carrito', []);

        if (isset($carrito[$producto->id])) {
            $carrito[$producto->id]['cantidad']++;
        } else {
            $carrito[$producto->id] = [
                'nombre' => $producto->nombre,
                'precio' => $producto->precio,
                'cantidad' => 1,
            ];
        }

        session(['carrito' => $carrito]);

        return back()->with('success', 'Producto agregado al carrito');
    }

    public function eliminar(Request $request)
    {
        $carrito = session()->get('carrito', []);
        unset($carrito[$request->producto_id]);
        session(['carrito' => $carrito]);

        return back()->with('success', 'Producto eliminado del carrito');
    }
}
