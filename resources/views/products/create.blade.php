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

        <!-- Formulario para agregar un producto -->
        <form action="{{ route('products.mype') }}" method="POST">
            @csrf
            <label for="product_name">Nombre del Producto:</label>
            <input type="text" name="product_name" id="product_name" value="{{ old('product_name') }}" required><br>

            <label for="product_description">Descripción:</label>
            <textarea name="product_description" id="product_description" required>{{ old('product_description') }}</textarea><br>


            <label for="category">Categoría:</label>
            <input type="text" name="category" id="category" value="{{ old('category') }}" required><br>


            <label for="custom_price">Precio Personalizado:</label>
            <input type="number" name="custom_price" id="custom_price" value="{{ old('custom_price') }}"><br>


            <label for="stock">Stock:</label>
            <input type="number" name="stock" id="stock" min="0" value="{{ old('stock') }}"><br>

            <button type="submit" class="mt-4 bg-blue-500 text-white p-2 rounded">Crear Producto</button>
        </form>
    </div>
</body>
</html>
