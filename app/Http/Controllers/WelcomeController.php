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

        $categories = Product::select('category')->distinct()->pluck('category')->toArray();

        $authUser = Auth::guard('mype')->check()
            ? ['user' => Auth::guard('mype')->user(), 'type' => 'mype']
            : (Auth::guard('web')->check()
                ? ['user' => Auth::guard('web')->user(), 'type' => 'user']
                : ['user' => null, 'type' => null]);

        return Inertia::render('welcome', [
            'auth' => $authUser,
            'products' => $products,
            'categories' => $categories,
        ]);
    }
}
