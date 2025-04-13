<!-- filepath: resources/views/products/create.blade.php -->
<!DOCTYPE html>
<html>
<head>
    <title>Agregar Producto</title>
    <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/tailwindcss@2.2.19/dist/tailwind.min.css">
</head>
<body class="bg-gray-100">
    <div class="container mx-auto mt-10">
        <h1 class="text-2xl font-bold mb-6">Agregar Producto</h1>

        <!-- Mostrar mensaje de éxito -->
        @if (session('success'))
            <div class="bg-green-100 text-green-800 p-4 rounded mb-4">
                {{ session('success') }}
            </div>
        @endif

        <!-- Formulario para agregar un producto -->
        <form action="{{ route('products.mype') }}" method="POST" class="bg-white p-6 rounded shadow-md">
            @csrf

            <div class="mb-4">
                <label for="product_name" class="block text-sm font-medium text-gray-700">Nombre del Producto</label>
                <input type="text" name="product_name" id="product_name" class="mt-1 block w-full border-gray-300 rounded-md shadow-sm" required>
            </div>

            <div class="mb-4">
                <label for="product_description" class="block text-sm font-medium text-gray-700">Descripción</label>
                <textarea name="product_description" id="product_description" class="mt-1 block w-full border-gray-300 rounded-md shadow-sm" required></textarea>
            </div>

            <div class="mb-4">
                <label for="category" class="block text-sm font-medium text-gray-700">Categoría</label>
                <input type="text" name="category" id="category" class="mt-1 block w-full border-gray-300 rounded-md shadow-sm" required>
            </div>

            <div class="mb-4">
                <label for="product_rate" class="block text-sm font-medium text-gray-700">Calificación (opcional)</label>
                <input type="number" name="product_rate" id="product_rate" step="0.1" min="0" max="5" class="mt-1 block w-full border-gray-300 rounded-md shadow-sm">
            </div>

            <button type="submit" class="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600">
                Crear Producto
            </button>
        </form>
    </div>
</body>
</html>