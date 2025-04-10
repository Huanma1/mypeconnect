<?php

namespace App\Http\Controllers;

use App\Models\Product;
use Illuminate\Http\Request;

class ProductController extends Controller
{
    public function create(){
        return view('products.create');
    }

    //Procesa los datos enviados desde el formulario y guarda el producto.
    public function mype(Request $request){

        // Valida los datos del formulario
        $request->validate([
            'product_name' => 'required|string|max:255',
            'product_description' => 'required|string',
            'product_price' => 'nullable|integer',
            'category' => 'required|string|max:255',
            'product_rate' => 'nullable|numeric|min:0|max:5', 
        ]);

        // Crea un nuevo producto en la base de datos
        Product::create($request->all());

        return redirect()->route('products.create')->with('success', 'Producto creado exitosamente.');

    }
}