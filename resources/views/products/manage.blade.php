<!DOCTYPE html>
<html>
<head>
    <title>Gestión de Productos</title>
    <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/tailwindcss@2.2.19/dist/tailwind.min.css">
</head>
<body class="bg-gray-100">
    <div class="max-w-6xl mx-auto mt-10 px-4">
        <h1 class="text-3xl font-bold mb-6 text-center">
        Gestión de Productos
        </h1>

        <!-- Formulario de búsqueda -->
        <form action="{{ route('dashboard.products.list') }}" method="GET" class="mb-6">
            <div class="flex flex-col sm:flex-row items-stretch sm:items-center gap-2">
                <input
                    type="text"
                    name="search"
                    placeholder="Buscar producto..."
                    value="{{ request('search') }}"
                    class="w-full p-2 border border-gray-300 rounded shadow-sm focus:outline-none focus:ring-2 focus:ring-green-500"
                />
                <button type="submit" class="bg-green-600 text-white py-2 px-4 rounded hover:bg-green-700 transition">
                    Buscar
                </button>
            </div>
        </form>

        <!-- Mensaje de éxito -->
        @if (session('success'))
            <div class="bg-green-100 text-green-800 p-4 rounded mb-4 shadow">
                {{ session('success') }}
            </div>
        @endif

        <!-- Mensajes de error -->
        @if ($errors->any())
            <div class="bg-red-100 text-red-800 p-4 rounded mb-4 shadow">
                <ul class="list-disc pl-5">
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
                    <div class="bg-white p-6 rounded-lg shadow-md">
                        <h3 class="text-lg font-semibold mb-2">{{ $product->product_name }}</h3>
                        <p class="text-gray-700">Stock actual: <strong>{{ $product->pivot->stock }}</strong></p>
                        <p class="text-gray-700">Precio personalizado: <strong>${{ $product->pivot->custom_price }}</strong></p>

                        <!-- Formulario para modificar stock y precio -->
                        <form action="{{ route('dashboard.products.updateStockAndPrice', $product->id) }}" method="POST" class="mt-4 space-y-4">
                            @csrf

                            <div>
                                <label for="cantidad_{{ $product->id }}" class="block text-sm font-medium text-gray-700">Cantidad:</label>
                                <input type="number" name="cantidad" id="cantidad_{{ $product->id }}"
                                    class="w-full p-2 border border-gray-300 rounded shadow-sm focus:outline-none focus:ring-2 focus:ring-green-500">
                            </div>

                            <div>
                                <label for="tipo_{{ $product->id }}" class="block text-sm font-medium text-gray-700">Tipo:</label>
                                <select name="tipo" id="tipo_{{ $product->id }}"
                                    class="w-full p-2 border border-gray-300 rounded shadow-sm focus:outline-none focus:ring-2 focus:ring-green-500">
                                    <option value="">Seleccionar</option>
                                    <option value="entrada">Entrada</option>
                                    <option value="salida">Salida</option>
                                </select>
                            </div>

                            <div>
                                <label for="custom_price_{{ $product->id }}" class="block text-sm font-medium text-gray-700">Precio Personalizado:</label>
                                <input type="number" name="custom_price" id="custom_price_{{ $product->id }}"
                                    value="{{ $product->pivot->custom_price }}"
                                    required
                                    class="w-full p-2 border border-gray-300 rounded shadow-sm focus:outline-none focus:ring-2 focus:ring-green-500">
                            </div>

                            <div>
                                <label for="comentario_{{ $product->id }}" class="block text-sm font-medium text-gray-700">Comentario:</label>
                                <textarea name="comentario" id="comentario_{{ $product->id }}"
                                    class="w-full p-2 border border-gray-300 rounded shadow-sm focus:outline-none focus:ring-2 focus:ring-green-500"
                                    rows="2"></textarea>
                            </div>

                            <div class="text-right">
                                <button type="submit"
                                    class="bg-green-600 text-white py-2 px-4 rounded hover:bg-green-700 transition">
                                    Actualizar
                                </button>
                            </div>
                        </form>
                    </div>
                @endforeach
            </div>
        @else
            <p class="text-center text-gray-600 mt-6">No se encontraron productos.</p>
        @endif
    </div>
</body>
</html>