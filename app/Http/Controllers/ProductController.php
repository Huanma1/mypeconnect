<?php

namespace App\Http\Controllers;

use App\Models\Product;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class ProductController extends Controller
{
    public function create()
    {
        return view('products.create');
    }

    public function mype(Request $request)
    {
        $request->validate([
            'product_name' => 'required|string|max:255',
            'product_description' => 'required|string',
            'product_price' => 'nullable|integer',
            'category' => 'required|string|max:255',
            'product_rate' => 'nullable|numeric|min:0|max:5',
        ]);

        $product = Product::create($request->all());

        $mype = Auth::guard('mype')->user();
        $mype->products()->attach($product->id, [
            'custom_price' => $request->input('custom_price', null),
            'stock' => $request->input('stock', 0),
        ]);

        return redirect()->route('products.create')->with('success', 'Producto creado exitosamente.');
    }
}