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
        <form action="{{ route('products.mype') }}" method="POST">
            @csrf
            <label for="product_name">Nombre del Producto:</label>
            <input type="text" name="product_name" id="product_name" required><br>
        
            <label for="product_description">Descripción:</label>
            <textarea name="product_description" id="product_description" required></textarea><br>
        
            <label for="category">Categoría:</label>
            <input type="text" name="category" id="category" required><br>
        
            <label for="custom_price">Precio Personalizado:</label>
            <input type="number" name="custom_price" id="custom_price"><br>
        
            <label for="stock">Stock:</label>
            <input type="number" name="stock" id="stock" min="0"><br>
        
            <button type="submit">Crear Producto</button>
        </form>
    </div>
</body>
</html>