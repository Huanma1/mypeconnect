<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Order;

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

        $order = Order::create([
            'user_id' => auth()->id(),
            'customer_name' => $data['customer_name'],
            'email' => $data['email'],
            'phone' => $data['phone'],
            'total' => collect($data['items'])->sum(fn($item) => $item['price'] * $item['quantity']),
        ]);

        foreach ($data['items'] as $item) {
            $order->items()->create([
                'product_id' => $item['id'],
                'quantity' => $item['quantity'],
                'price' => $item['price'],
            ]);
        }

       return redirect()->route('orders.thankyou');
    }
}
