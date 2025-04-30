<?php

use App\Http\Controllers\Auth\MypeAuthController;
use App\Http\Controllers\MypeController;
use App\Http\Controllers\MypeProductController;
use App\Http\Controllers\ProductController;
use App\Http\Controllers\StockController;
use App\Http\Controllers\WelcomeController;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

// Página de inicio
Route::get('/', [WelcomeController::class, 'showWelcome'])->name('home');

// Rutas protegidas por autenticación
Route::middleware(['auth:mype'])->group(function () {
    Route::get('dashboard', function () {
        $mype = Auth::guard('mype')->user();

        if (! $mype) {
            return redirect()->route('mype.login');
        }

        return Inertia::render('Dashboard', [
            'mypeId' => $mype->id, // Pasar el ID de la MYPE al frontend
        ]);
    })->name('dashboard');

    Route::get('/products/create', [ProductController::class, 'create'])->name('products.create');
    Route::post('/products', [ProductController::class, 'mype'])->name('products.mype');

    Route::get('/dashboard/products', [ProductController::class, 'listProductsWithStock'])->name('dashboard.products.list');
    Route::post('/dashboard/products/{productId}/update-stock-and-price', [StockController::class, 'updateStockAndPrice'])->name('dashboard.products.updateStockAndPrice');

    Route::get('/mype/{mypeId}/bajo-stock', [MypeProductController::class, 'bajoStockPorMype']);

    // Nueva ruta para el historial de cambios
    Route::get('/dashboard/inventory-history', [MypeController::class, 'showInventoryHistory'])
        ->name('dashboard.inventory.history');
});

Route::get('/products', [ProductController::class, 'index'])->name('products.index');
Route::get('/products/{id}', [ProductController::class, 'show'])->name('products.show');

Route::get('mype/login', [MypeAuthController::class, 'showLoginForm'])->name('mype.login');
Route::post('mype/login', [MypeAuthController::class, 'login'])->name('mype.login.submit');
// Rutas de registro
Route::get('/mypes/register', [MypeController::class, 'create'])->name('mypes.register');
Route::post('/mypes/register', [MypeController::class, 'store'])->name('mypes.store');

require __DIR__.'/settings.php';
require __DIR__.'/auth.php';
