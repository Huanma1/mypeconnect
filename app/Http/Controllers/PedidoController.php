<?php 

namespace App\Http\Controllers;

use Illuminate\Http\Request;

class PedidoController extends Controller
{
    public function checkout()
    {
        $carrito = session('carrito', []);
        $total = collect($carrito)->sum(function ($item) {
            return $item['precio'] * $item['cantidad'];
        });

        return view('pedido.checkout', compact('carrito', 'total'));
    }

    public function confirmar(Request $request)
    {
        $request->validate([
            'nombre' => 'required|string',
            'correo' => 'required|email',
            'telefono' => 'required|string'
        ]);

        // Aquí podrías guardar el pedido en la base de datos...

        session()->forget('carrito');
        return redirect('/')->with('success', 'Pedido confirmado con éxito');
    }
}
