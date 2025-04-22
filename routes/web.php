<?php

use Illuminate\Support\Facades\Route;
use Inertia\Inertia;
use App\Http\Controllers\ProductController;
use App\Http\Controllers\MypeController;
use App\Http\Controllers\WelcomeController;

// Página de inicio
Route::middleware(['web'])->group(function () {
    // Página de inicio
    Route::get('/', [WelcomeController::class, 'showWelcome'])->name('home');

    // Rutas públicas
    Route::get('/products', [ProductController::class, 'index'])->name('products.index');
    Route::get('/products/{id}', [ProductController::class, 'show'])->name('products.show');

    // Rutas de registro
    Route::get('/mypes/register', [MypeController::class, 'create'])->name('mypes.register');
    Route::post('/mypes/register', [MypeController::class, 'store'])->name('mypes.store');
});

// Rutas protegidas por autenticación
Route::middleware(['auth:mype'])->group(function () {
    Route::get('dashboard', function () {
        return Inertia::render('Dashboard');
    })->name('dashboard');

    Route::get('/products/create', [ProductController::class, 'create'])->name('products.create');
    Route::post('/products', [ProductController::class, 'mype'])->name('products.mype');
});

require __DIR__.'/settings.php';
require __DIR__.'/auth.php';