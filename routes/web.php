<?php

use Illuminate\Support\Facades\Route;
use Inertia\Inertia;
use App\Http\Controllers\ProductController;
use App\Http\Controllers\MypeController;

Route::get('/', function () {
    return Inertia::render('welcome');
})->name('home');

Route::middleware(['auth:mype', 'verified'])->group(function () {
    Route::get('dashboard', function () {
        return Inertia::render('Dashboard');
    })->name('dashboard');
});

Route::get('/mypes/register', [MypeController::class, 'create'])->name('mypes.register');
Route::post('/mypes/register', [MypeController::class, 'store'])->name('mypes.store');


// Ruta para mostrar el formulario
Route::get('/products/create', [ProductController::class, 'create'])->name('products.create');
// Ruta para procesar el formulario
Route::post('/products', [ProductController::class, 'mype'])->name('products.mype');

require __DIR__.'/settings.php';
require __DIR__.'/auth.php';

