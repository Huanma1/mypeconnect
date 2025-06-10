<?php

namespace App\Http\Controllers;

use App\Models\Mype;
use App\Models\Product;
use Illuminate\Contracts\View\View as ViewContract;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\View as ViewFacade;
use Inertia\Inertia;
use Inertia\Response as InertiaResponse;

class ProductController extends Controller
{
    public function create(): ViewContract
    {
        return ViewFacade::make('products.create');
    }

    public function mype(Request $request): RedirectResponse
    {
        $request->validate([
            'product_name' => 'required|string|max:255',
            'product_description' => 'required|string',
            'category' => 'required|string|max:255',
            'custom_price' => 'nullable|numeric|min:0',
            'stock' => 'nullable|integer|min:0',
            'product_rate' => 'nullable|numeric|min:0|max:5',
        ]);

        $product = Product::where('product_name', $request->input('product_name'))->first();

        /** @var Mype $mype */
        $mype = Auth::guard('mype')->user();

        if ($product) {
            $existingAssociation = $mype->products()->where('product_id', $product->id)->exists();

            if ($existingAssociation) {
                return redirect()->route('products.create')->withInput()->withErrors([
                    'product_name' => 'Este producto ya está asociado a tu tienda.',
                ]);
            }

            $mype->products()->attach($product->id, [
                'custom_price' => $request->input('custom_price'),
                'stock' => $request->input('stock'),
                'product_rate' => $request->input('product_rate', 0),
            ]);

            return redirect()->route('products.create')->with('success', 'Producto asociado a tu inventario exitosamente.');
        }

        $product = Product::create([
            'product_name' => $request->input('product_name'),
            'product_description' => $request->input('product_description'),
            'category' => $request->input('category'),
            'product_rate' => 0,
        ]);

        $mype->products()->attach($product->id, [
            'custom_price' => $request->input('custom_price'),
            'stock' => $request->input('stock'),
            'product_rate' => $request->input('product_rate', 0),
        ]);

        return redirect()->route('products.create')->with('success', 'Producto creado y asociado a tu inventario exitosamente.');
    }

    public function index(Request $request): InertiaResponse
    {
        $user = $request->user();

        $query = Product::with(['mypes' => function ($q) {
            $q->orderBy('pivot_custom_price');
        }]);

        if ($request->filled('category')) {
            $query->where('category', $request->input('category'));
        }

        if ($request->filled('min_price') || $request->filled('max_price')) {
            $query->whereHas('mypes', function ($q) use ($request) {
                if ($request->filled('min_price')) {
                    $q->where('custom_price', '>=', $request->input('min_price'));
                }
                if ($request->filled('max_price')) {
                    $q->where('custom_price', '<=', $request->input('max_price'));
                }
            });
        }

        $products = $query->paginate(8)->withQueryString();
        $categories = Product::select('category')->distinct()->pluck('category')->toArray();

        return Inertia::render('ProductList', [
            'products' => $products,
            'categories' => $categories,
            'filters' => $request->only(['category', 'min_price', 'max_price']),
            'auth' => $user,
        ]);
    }

    public function show(int $id): InertiaResponse|RedirectResponse
    {
        $product = Product::with(['comments.user', 'mypes'])->findOrFail($id);

        if (! $product) {
            return redirect()->route('products.index')->with('error', 'Producto no encontrado.');
        }
        $averageRating = $product->comments()->avg('rating');

        return Inertia::render('DetalleProducto', [
            'product' => $product->toArray() + ['average_rating' => round($averageRating, 1)],
        ]);
    }

    public function listProductsWithStock(Request $request): ViewContract|RedirectResponse
    {
        $mype = Auth::guard('mype')->user();

        if (! $mype) {
            return redirect()->route('login')->withErrors(['error' => 'No estás autenticado.']);
        }

        $search = (string) $request->input('search', '');

        $products = $mype->products()
            ->withPivot('stock', 'custom_price')
            ->when($search !== '', function ($query) use ($search) {
                $query->where('product_name', 'like', '%'.$search.'%');
            })
            ->get();

        return ViewFacade::make('products.manage', [
            'products' => $products,
        ]);
    }

    public function listProducts(int $mypeId): ViewContract
    {
        $mype = Mype::find($mypeId);

        if (! $mype) {
            abort(404, 'MYPE no encontrado');
        }

        $products = $mype->products()->get();

        return ViewFacade::make('product.index', compact('products'));
    }

    public function listProductsOrdered(string $order = 'asc'): ViewContract
    {
        $validOrders = ['asc', 'desc'];
        $order = in_array($order, $validOrders, true) ? $order : 'asc';

        $products = Product::orderBy('created_at', $order)->get();

        return ViewFacade::make('product.index', compact('products'));
    }
}
