<!DOCTYPE html>
<html lang="es">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <title>Detalles del Producto</title>
</head>
<body class="bg-gray-100">
    <div class="container mx-auto py-8">
        <h1 class="text-3xl font-bold mb-4">{{ $product->product_name }}</h1>
        <p class="text-gray-600 mb-4">{{ $product->product_description }}</p>
        <p class="text-green-500 font-bold text-xl mb-4">Categoría: {{ $product->category }}</p>

        <h2 class="text-2xl font-semibold mb-4">Precios por Mype</h2>
        <table class="table-auto w-full bg-white shadow rounded">
            <thead>
                <tr>
                    <th class="px-4 py-2">Mype</th>
                    <th class="px-4 py-2">Precio</th>
                    <th class="px-4 py-2">Stock</th>
                </tr>
            </thead>
            <tbody>
                @foreach ($mypes as $mype)
                    <tr>
                        <td class="border px-4 py-2">{{ $mype->name }}</td>
                        <td class="border px-4 py-2">${{ $mype->pivot->custom_price }}</td>
                        <td class="border px-4 py-2">{{ $mype->pivot->stock }}</td>
                    </tr>
                @endforeach
            </tbody>
        </table>
    </div>
</body>
</html>