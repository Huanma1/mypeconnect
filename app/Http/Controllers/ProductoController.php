<?php

namespace App\Http\Controllers;

use App\Models\Product;

class ProductoController extends Controller
{
    public function index()
    {
        $productos = Product::all();

        return view('productos.index', compact('productos'));
    }
}
