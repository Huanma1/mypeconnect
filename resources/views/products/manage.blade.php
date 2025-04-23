<!DOCTYPE html>
<html>
<head>
    <title>Gestión de Productos</title>
    <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/tailwindcss@2.2.19/dist/tailwind.min.css">
</head>
<body class="bg-gray-100">
    <div class="container mx-auto mt-10">
        <h1 class="text-2xl font-bold mb-6">Gestión de Productos</h1>

        <!-- Formulario de búsqueda -->
        <form action="{{ route('dashboard.products.list') }}" method="GET" class="mb-6">
            <div class="flex items-center">
                <input
                    type="text"
                    name="search"
                    placeholder="Buscar producto..."
                    value="{{ request('search') }}"
                    class="w-full p-2 border border-gray-300 rounded-md shadow-sm"
                />
                <button type="submit" class="ml-2 bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600">
                    Buscar
                </button>
            </div>
        </form>

        <!-- Mostrar mensaje de éxito -->
        @if (session('success'))
            <div class="bg-green-100 text-green-800 p-4 rounded mb-4">
                {{ session('success') }}
            </div>
        @endif

        <!-- Mostrar mensajes de error -->
        @if ($errors->any())
            <div class="bg-red-100 text-red-800 p-4 rounded mb-4">
                <ul>
                    @foreach ($errors->all() as $error)
                        <li>{{ $error }}</li>
                    @endforeach
                </ul>
            </div>
        @endif

        <!-- Lista de productos -->
        @if ($products->isNotEmpty())
            <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                @foreach ($products as $product)
                    <div class="border p-4 rounded shadow bg-white">
                        <h3 class="text-lg font-semibold">{{ $product->product_name }}</h3>
                        <p>Stock actual: {{ $product->pivot->stock }}</p>
                        <p>Precio personalizado: {{ $product->pivot->custom_price }}</p>

                        <!-- Formulario para modificar el stock y el precio -->
                        <form action="{{ route('dashboard.products.updateStockAndPrice', $product->id) }}" method="POST" class="mt-4">
                            @csrf
                            <label for="cantidad_{{ $product->id }}" class="block text-sm font-medium text-gray-700">Cantidad:</label>
                            <input type="number" name="cantidad" id="cantidad_{{ $product->id }}" class="mt-1 block w-full border-gray-300 rounded-md shadow-sm">

                            <label for="tipo_{{ $product->id }}" class="block text-sm font-medium text-gray-700 mt-2">Tipo:</label>
                            <select name="tipo" id="tipo_{{ $product->id }}" class="mt-1 block w-full border-gray-300 rounded-md shadow-sm">
                                <option value="">Seleccionar</option>
                                <option value="entrada">Entrada</option>
                                <option value="salida">Salida</option>
                            </select>

                            <label for="custom_price_{{ $product->id }}" class="block text-sm font-medium text-gray-700 mt-2">Precio Personalizado:</label>
                            <input type="number" name="custom_price" id="custom_price_{{ $product->id }}" class="mt-1 block w-full border-gray-300 rounded-md shadow-sm" value="{{ $product->pivot->custom_price }}" required>

                            <label for="comentario_{{ $product->id }}" class="block text-sm font-medium text-gray-700 mt-2">Comentario:</label>
                            <textarea name="comentario" id="comentario_{{ $product->id }}" class="mt-1 block w-full border-gray-300 rounded-md shadow-sm"></textarea>

                            <button type="submit" class="mt-4 bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600">
                                Actualizar
                            </button>
                        </form>
                    </div>
                @endforeach
            </div>
        @else
            <p>No se encontraron productos.</p>
        @endif
    </div>
</body>
</html>