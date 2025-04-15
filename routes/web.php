<?php

use Illuminate\Support\Facades\Route;
use Inertia\Inertia;
use App\Http\Controllers\ProductController;
use App\Http\Controllers\MypeController;
use App\Http\Controllers\WelcomeController;

Route::get('/', [WelcomeController::class, 'showWelcome'])->name('home');

Route::middleware(['auth:mype', 'verified'])->group(function () {
    Route::get('dashboard', function () {
        return Inertia::render('Dashboard');
    })->name('dashboard');
});

Route::get('/mypes/register', [MypeController::class, 'create'])->name('mypes.register');
Route::post('/mypes/register', [MypeController::class, 'store'])->name('mypes.store');

// Rutas de productos
Route::get('/products/create', [ProductController::class, 'create'])->name('products.create');
Route::post('/products', [ProductController::class, 'mype'])->name('products.mype');
Route::get('/products', [ProductController::class, 'index'])->name('products.index');
Route::get('/products/{id}', [ProductController::class, 'show'])->name('products.show');

require __DIR__.'/settings.php';
require __DIR__.'/auth.php';
