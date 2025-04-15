<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Product;
use Inertia\Inertia;
use Illuminate\Support\Facades\Auth;


class WelcomeController extends Controller
{
    public function index()
    {
        $products = Product::with('mypes')->paginate(8);

        return Inertia::render('ProductList', [
            'products' => $products,
        ]);
    }

    public function showWelcome()
    {
        $products = Product::with('mypes')->paginate(8);

        return Inertia::render('welcome', [
            'auth' => [
                'user' => Auth::guard('mype')->user(),
            ],
            'products' => $products,
        ]);
    }
}
