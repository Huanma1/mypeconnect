<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Order;
use App\Models\MypeProduct;

class OrderController extends Controller
{
    public function store(Request $request)
    {
        $data = $request->validate([
            'customer_name' => 'required',
            'email' => 'required|email',
            'phone' => 'required',
            'items' => 'required|array',
        ]);

        // Validación previa de stock
        foreach ($data['items'] as $item) {
            $mypeProduct = MypeProduct::where('product_id', $item['id'])
                ->where('mype_id', $item['mypeId'])
                ->first();

            if (!$mypeProduct || $mypeProduct->stock < $item['quantity']) {
                return back()->withErrors(['stock' => "Stock insuficiente para el producto '{$item['name']}'"]);
            }
        }

        $order = Order::create([
            'user_id' => auth()->id(),
            'customer_name' => $data['customer_name'],
            'email' => $data['email'],
            'phone' => $data['phone'],
            'total' => collect($data['items'])->sum(fn($item) => $item['price'] * $item['quantity']),
        ]);

        // Crear los ítems y descontar el stock
        foreach ($data['items'] as $item) {
            $order->items()->create([
                'product_id' => $item['id'],
                'mype_id' => $item['mypeId'],
                'quantity' => $item['quantity'],
                'price' => $item['price'],
            ]);

            $mypeProduct = MypeProduct::where('product_id', $item['id'])
                ->where('mype_id', $item['mypeId'])
                ->first();

            if ($mypeProduct) {
                $mypeProduct->decrement('stock', $item['quantity']);
            }
        }

       return redirect()->route('orders.thankyou');
    }
}
