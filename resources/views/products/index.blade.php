<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <title>Productos</title>
    <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/tailwindcss@2.2.19/dist/tailwind.min.css">
</head>
<body class="bg-gray-100">
    <div class="container mx-auto py-8">
        <h1 class="text-3xl font-bold mb-6">Productos Disponibles</h1>
        <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            @foreach($products as $product)
            <div class="product-card">
                <h3>{{ $product->product_name }}</h3>
                <p>{{ $product->product_description }}</p>
                <p>Categoría: {{ $product->category }}</p>
                <p>Calificación: {{ $product->product_rate }}</p>

                <!-- Formulario para agregar al inventario -->
                <form action="{{ route('products.mype') }}" method="POST">
                    @csrf
                    <input type="hidden" name="product_id" value="{{ $product->id }}">

                    <div>
                        <label for="custom_price">Precio Personalizado</label>
                        <input type="number" name="custom_price" id="custom_price" min="0" value="{{ old('custom_price') }}">
                        @error('custom_price') <div class="error">{{ $message }}</div> @enderror
                    </div>

                    <div>
                        <label for="stock">Stock</label>
                        <input type="number" name="stock" id="stock" min="0" value="{{ old('stock') }}">
                        @error('stock') <div class="error">{{ $message }}</div> @enderror
                    </div>

                    <div>
                        <label for="product_rate">Calificación</label>
                        <input type="number" name="product_rate" id="product_rate" min="0" max="5" value="{{ old('product_rate') }}">
                        @error('product_rate') <div class="error">{{ $message }}</div> @enderror
                    </div>

                    <button type="submit">Agregar al inventario</button>
                </form>
            </div>
        @endforeach
        </div>

        <div class="mt-6">
            {{ $products->links() }} <!-- Paginación -->
        </div>
    </div>
</body>
</html>