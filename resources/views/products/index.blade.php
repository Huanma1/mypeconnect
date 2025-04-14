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
            @foreach ($products as $product)
                <div class="bg-white p-4 rounded shadow">
                    <h2 class="text-lg font-semibold">{{ $product->product_name }}</h2>
                    <p class="text-gray-600">{{ $product->product_description }}</p>
                    <p class="text-green-500 font-bold">Desde: ${{ $product->mypes->min('pivot.custom_price') }}</p>
                    <a href="{{ route('products.show', $product->id) }}" class="text-blue-500 hover:underline">
                        Ver Detalles
                    </a>
                </div>
            @endforeach
        </div>

        <div class="mt-6">
            {{ $products->links() }} <!-- Paginación -->
        </div>
    </div>
</body>
</html>