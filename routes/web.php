<?php

use App\Http\Controllers\Auth\AuthenticatedSessionController;
use App\Http\Controllers\Auth\MypeAuthController;
use App\Http\Controllers\Auth\RegisteredUserController;
use App\Http\Controllers\MypeController;
use App\Http\Controllers\MypeProductController;
use App\Http\Controllers\OrderController;
use App\Http\Controllers\ProductCommentController;
use App\Http\Controllers\ProductController;
use App\Http\Controllers\StockController;
use App\Http\Controllers\WelcomeController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

// Página de inicio (pública)
Route::get('/', [WelcomeController::class, 'showWelcome'])->name('home');

// Rutas públicas de productos (accesibles para todos)
Route::get('/products/create', [ProductController::class, 'create'])->name('products.create'); // Coloca esta ruta primero
Route::get('/products/{id}', [ProductController::class, 'show'])->name('products.show'); // Coloca esta ruta después
Route::get('/products', [ProductController::class, 'index'])->name('products.index');

// Rutas protegidas para Mypes (negocios)
Route::middleware(['auth:mype'])->group(function () {
    Route::get('dashboard', function () {
        $mype = Auth::guard('mype')->user();

        if (! $mype) {
            return redirect()->route('mype.login');
        }

        return Inertia::render('Dashboard', [
            'mypeId' => $mype->id,
        ]);
    })->name('dashboard');

    Route::get('/products/create', [ProductController::class, 'create'])->name('products.create');
    Route::post('/products', [ProductController::class, 'mype'])->name('products.mype');

    Route::get('/dashboard/products', [ProductController::class, 'listProductsWithStock'])->name('dashboard.products.list');
    Route::post('/dashboard/products/{productId}/update-stock-and-price', [StockController::class, 'updateStockAndPrice'])->name('dashboard.products.updateStockAndPrice');

    Route::get('/mype/{mypeId}/bajo-stock', [MypeProductController::class, 'bajoStockPorMype']);
    Route::get('/dashboard/inventory-history', [MypeController::class, 'showInventoryHistory'])->name('dashboard.inventory.history');
});

Route::post('/comments', [ProductCommentController::class, 'store'])->name('comments.store');

// Rutas para usuarios (clientes)
Route::get('/user/login', [AuthenticatedSessionController::class, 'create'])->name('user.login');
Route::post('/user/login', [AuthenticatedSessionController::class, 'store'])->name('user.login.submit');
Route::get('/user/register', [RegisteredUserController::class, 'create'])->name('user.register');
Route::post('/user/register', [RegisteredUserController::class, 'store'])->name('user.register.submit');

// Rutas de login y registro para Mypes (negocios)
Route::get('mype/login', [MypeAuthController::class, 'showLoginForm'])->name('mype.login');
Route::post('mype/login', [MypeAuthController::class, 'login'])->name('mype.login.submit');
Route::get('/mypes/register', [MypeController::class, 'create'])->name('mypes.register');
Route::post('/mypes', [MypeController::class, 'store'])->name('mypes.store');

Route::get('/mypes', [MypeController::class, 'index'])->name('mypes.index');
Route::get('/mypes/{mype}', function (App\Models\Mype $mype) {
    return Inertia::render('Mype/Profile', [
        'mype' => $mype->load('products', 'reviews.user'),
    ]);
})->name('mypes.profile');
Route::post('/mypes/{mype}/review', [MypeController::class, 'storeReview'])->name('mypes.review');
Route::get('/mypes/{id}', [MypeController::class, 'show'])->name('mypes.show');

Route::post('/checkout/store-cart', function (Request $request) {
    session(['cart_items' => $request->items]);

    return redirect('/checkout');
});

Route::get('/checkout', function () {
    $cartItems = session('cart_items', []);

    return Inertia::render('CheckoutPage', [
        'cartItems' => $cartItems,
    ]);
});

Route::post('/orders', [OrderController::class, 'store']);

Route::get('/gracias-por-tu-compra', function () {
    return Inertia::render('ThankYouPage');
})->name('orders.thankyou');

// Rutas de usuarios (clientes) y autenticación general están en:
require __DIR__.'/auth.php';

// Rutas de configuración (si tienes settings)
require __DIR__.'/settings.php';
