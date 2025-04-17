<?php

namespace App\Http\Controllers;

use App\Models\Product;
use App\Models\Mype;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;

class ProductController extends Controller
{
    public function create()
    {
        return view('products.create');
    }

    public function mype(Request $request)
    {
        // Validar los datos del formulario
        $request->validate([
            'product_name' => 'required|string|max:255',
            'product_description' => 'required|string',
            'category' => 'required|string|max:255',
            'custom_price' => 'nullable|numeric|min:0', // Precio personalizado
            'stock' => 'nullable|integer|min:0', // Stock del producto
            'product_rate' => 'nullable|numeric|min:0|max:5',
        ]);

        // Buscar si el producto ya existe en el sistema
        $product = Product::where('product_name', $request->product_name)->first();

        // Si el producto ya existe
        if ($product) {
            /** @var \App\Models\Mype $mype */
            $mype = Auth::guard('mype')->user();

            // Verificar si la MYPE ya tiene este producto
            $existingAssociation = $mype->products()->where('product_id', $product->id)->exists();

            // Si el producto ya está asociado a la MYPE, mostrar error
            if ($existingAssociation) {
                return redirect()->route('products.create') // Redirige correctamente a la vista de crear producto
                    ->withInput() // Mantiene los datos ingresados
                    ->withErrors(['product_name' => 'Este producto ya está asociado a tu tienda.']);
            }
            // Asociar el producto a la MYPE con los datos adicionales (precio, stock)
            $mype->products()->attach($product->id, [
                'custom_price' => $request->custom_price,
                'stock' => $request->stock,
                'product_rate' => $request->product_rate ?? 0, // Calificación
            ]);

            return redirect()->route('products.create')->with('success', 'Producto asociado a tu inventario exitosamente.');
        }

        // Si el producto no existe, crearlo
        $product = Product::create([
            'product_name' => $request->product_name,
            'product_description' => $request->product_description,
            'category' => $request->category,
            'product_rate' => 0,
        ]);

        // Obtener la MYPE autenticada
        /** @var \App\Models\Mype $mype */
        $mype = Auth::guard('mype')->user();

        // Asociar el producto a la MYPE con datos adicionales
        $mype->products()->attach($product->id, [
            'custom_price' => $request->custom_price,
            'stock' => $request->stock,
            'product_rate' => $request->product_rate ?? 0, // Calificación
        ]);

        // Redirigir con un mensaje de éxito
        return redirect()->route('products.create')->with('success', 'Producto creado y asociado a tu inventario exitosamente.');
    }

    public function index(Request $request)
    {
        $query = Product::with(['mypes' => function ($q) {
            $q->orderBy('custom_price');
        }]);

        // Filtro por categoría
        if ($request->filled('category')) {
            $query->where('category', $request->category);
        }

        // Filtro por rango de precios
        if ($request->filled('min_price') || $request->filled('max_price')) {
            $query->whereHas('mypes', function ($q) use ($request) {
                if ($request->filled('min_price')) {
                    $q->where('custom_price', '>=', $request->min_price);
                }
                if ($request->filled('max_price')) {
                    $q->where('custom_price', '<=', $request->max_price);
                }
            });
        }

        $products = $query->paginate(8)->withQueryString();
        $categories = Product::select('category')->distinct()->pluck('category')->toArray();

        return Inertia::render('ProductList', [
            'products' => $products,
            'categories' => $categories,
            'filters' => $request->only(['category', 'min_price', 'max_price']),
        ]);
    }

     // Mostrar detalles de un producto
     public function show($id)
     {
        $product = Product::with('mypes')->findOrFail($id);

        return Inertia::render('DetalleProducto', [
            'product' => $product,
        ]);
     }
}
