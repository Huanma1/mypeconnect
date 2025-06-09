<!DOCTYPE html>
<html>
<head>
    <title>Agregar Producto</title>
    <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/tailwindcss@2.2.19/dist/tailwind.min.css">
</head>
<body class="bg-gray-100">
    <div class="max-w-2xl mx-auto mt-10">
        <h1 class="text-3xl font-bold mb-6 text-center">Agregar Producto</h1>

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

        <!-- Formulario -->
        <div class="bg-white shadow-md rounded-lg p-6">
            <form action="{{ route('products.mype') }}" method="POST" class="space-y-4">
                @csrf

                <div>
                    <label for="product_name" class="block font-semibold mb-1">Nombre del Producto:</label>
                    <input type="text" name="product_name" id="product_name"
                        value="{{ old('product_name') }}"
                        required
                        class="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-green-500">
                </div>

                <div>
                    <label for="product_description" class="block font-semibold mb-1">Descripción:</label>
                    <textarea name="product_description" id="product_description" required
                        class="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-green-500"
                        rows="3">{{ old('product_description') }}</textarea>
                </div>

                <div>
                    <label for="category" class="block font-semibold mb-1">Categoría:</label>
                    <input type="text" name="category" id="category"
                        value="{{ old('category') }}"
                        required
                        class="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-green-500">
                </div>

                <div>
                    <label for="custom_price" class="block font-semibold mb-1">Precio Personalizado:</label>
                    <input type="number" name="custom_price" id="custom_price"
                        value="{{ old('custom_price') }}"
                        class="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-green-500">
                </div>

                <div>
                    <label for="stock" class="block font-semibold mb-1">Stock:</label>
                    <input type="number" name="stock" id="stock" min="0"
                        value="{{ old('stock') }}"
                        class="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-green-500">
                </div>

                <div class="text-center">
                    <button type="submit"
                        class="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700 transition">
                        Crear Producto
                    </button>
                </div>
            </form>
        </div>
    </div>
</body>
</html>