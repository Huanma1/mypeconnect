<!DOCTYPE html>
<html>
<head>
    <title>Comparador de Precios</title>
</head>
<body>
    <h1>Comparador de Precios para {{ $product->product_name }}</h1>

    <table>
        <thead>
            <tr>
                <th>Mype</th>
                <th>Precio Personalizado</th>
                <th>Stock</th>
            </tr>
        </thead>
        <tbody>
            @foreach ($mypes as $mype)
                <tr>
                    <td>{{ $mype->name }}</td>
                    <td>{{ $mype->pivot->custom_price }}</td>
                    <td>{{ $mype->pivot->stock }}</td>
                </tr>
            @endforeach
        </tbody>
    </table>
</body>
</html>