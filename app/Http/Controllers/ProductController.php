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
    ]);

    // Crear el producto
    Product::create([
        'product_name' => $request->product_name,
        'product_description' => $request->product_description,
        'category' => $request->category,
        'product_rate' => $request->product_rate,
    ]);

    // Redirigir con un mensaje de éxito
    return redirect()->route('products.create')->with('success', 'Producto creado exitosamente.');
}
}