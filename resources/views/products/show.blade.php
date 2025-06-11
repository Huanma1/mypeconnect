<!-- resources/views/products/show.blade.php -->
<!DOCTYPE html>
<html lang="es">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <title>Detalles del Producto</title>
    <link href="https://cdn.jsdelivr.net/npm/tailwindcss@2.2.19/dist/tailwind.min.css" rel="stylesheet">
</head>
<body class="bg-gray-100">

    <div class="py-8">
        <div class="container mx-auto grid grid-cols-1 md:grid-cols-2 gap-8">
            <!-- Detalles del Producto -->
            <div class="bg-white p-6 rounded shadow">
                <h2 class="text-3xl font-bold mb-4">{{ $product->product_name }}</h2>
                <p class="text-gray-600 mb-4">{{ $product->product_description }}</p>
                <p class="text-gray-500 mb-4">Categoría: {{ $product->category }}</p>
                <p class="text-green-500 font-bold mb-4">Calificación: {{ $product->product_rate }}</p>

                <div>
                    <h3 class="text-xl font-semibold">Descripción completa:</h3>
                    <p class="text-gray-700">{{ $product->product_description }}</p>
                </div>
            </div>

            <!-- Mypes que venden este producto -->
            <div class="bg-white p-6 rounded shadow">
                <h3 class="text-2xl font-bold mb-4">Mypes que venden este producto</h3>

                @if($product->mypes->isNotEmpty())
                    @php
                        // Ordenar las mypes por precio de mayor a menor
                        $sortedMypes = $product->mypes->sortByDesc(function ($mype) {
                            return  ?? 0;
                        });
                    @endphp

                    @foreach($sortedMypes as $mype)
                        <div class="border-b pb-4 mb-4">
                            <p class="text-lg font-semibold">Tienda: {{ $mype->name }}</p>
                            <p class="text-gray-600">Precio: ${{ $mype->pivot->custom_price ?? 'N/A' }}</p>
                        </div>
                    @endforeach
                @else
                    <p>No hay mypes que vendan este producto.</p>
                @endif
            </div>
        </div>

        <div class="mt-6">
            <a href="{{ route('home') }}" class="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600">
                Volver a la página de inicio
            </a>
        </div>
    </div>

</body>
</html>