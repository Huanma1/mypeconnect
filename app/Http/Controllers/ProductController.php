<?php

namespace App\Http\Controllers;

use App\Models\Product;
use App\Models\Mype;
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
    // Validar los datos del formulario
    $request->validate([
        'product_name' => 'required|string|max:255',
        'product_description' => 'required|string',
        'category' => 'required|string|max:255',
        'product_rate' => 'nullable|numeric|min:0|max:5',
        'custom_price' => 'nullable|integer', // Precio personalizado
        'stock' => 'nullable|integer|min:0', // Stock del producto
    ]);


    // Crear el producto
    $product = Product::create([
        'product_name' => $request->product_name,
        'product_description' => $request->product_description,
        'category' => $request->category,
        'product_rate' => 0,
    ]);

    // Obtener la Mype autenticada
    /** @var \App\Models\Mype $mype */
    $mype = Auth::guard('mype')->user();

    // Asociar el producto a la Mype con datos adicionales
    $mype->products()->attach($product->id, [
        'custom_price' => $request->custom_price,
        'stock' => $request->stock,
    ]);

    // Redirigir con un mensaje de éxito
    return redirect()->route('products.create')->with('success', 'Producto creado exitosamente.');
}
}