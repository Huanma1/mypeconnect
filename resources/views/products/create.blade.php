<!DOCTYPE html>
<html>
<head>
    <title>Agregar Producto</title>
</head>
<body>
    <h1>Agregar Producto</h1>

    <!-- Mostrar mensaje de éxito -->
    @if (session('success'))
        <p style="color: green;">{{ session('success') }}</p>
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

        <label for="product_rate">Calificación:</label>
        <input type="number" name="product_rate" id="product_rate" step="0.1" min="0" max="5"><br>

        <label for="custom_price">Precio Personalizado:</label>
        <input type="number" name="custom_price" id="custom_price"><br>

        <label for="stock">Stock:</label>
        <input type="number" name="stock" id="stock" min="0"><br>

        <button type="submit">Agregar Producto</button>
    </form>
</body>
</html>