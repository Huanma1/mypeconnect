<?php

namespace App\Http\Controllers;

use App\Models\Product;
use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;
use Inertia\Response;

class WelcomeController extends Controller
{
    /**
     * Display a listing of the products.
     */
    public function index(): Response
    {
        $products = Product::with('mypes')->paginate(8);

        return Inertia::render('ProductList', [
            'products' => $products,
        ]);
    }

    /**
     * Show the welcome page with products and categories.
     */
    public function showWelcome(): Response
    {
        $products = Product::with('mypes')->paginate(8);

        // Obtener las categorías de la base de datos
        $categories = Product::select('category')->distinct()->pluck('category')->toArray();

        return Inertia::render('welcome', [
            'auth' => [
                'user' => Auth::guard('mype')->user(),
            ],
            'products' => $products,
            'categories' => $categories, // Pasa las categorías al componente
        ]);
    }
}
