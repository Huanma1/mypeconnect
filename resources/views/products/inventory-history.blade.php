<!DOCTYPE html>
<html>
<head>
    <title>Historial de Cambios</title>
    <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/tailwindcss@2.2.19/dist/tailwind.min.css">
</head>
<body class="bg-gray-100">
    <div class="container mx-auto mt-10">
        <h1 class="text-2xl font-bold mb-6">Historial de Cambios</h1>

        @if($inventoryHistories->isEmpty())
            <p>No hay cambios registrados en el inventario.</p>
        @else
            <table class="table-auto w-full bg-white shadow-md rounded">
                <thead>
                    <tr class="bg-gray-200">
                        <th class="px-4 py-2">Producto</th>
                        <th class="px-4 py-2">Cantidad Cambiada</th>
                        <th class="px-4 py-2">Tipo de Cambio</th>
                        <th class="px-4 py-2">Comentario</th>
                        <th class="px-4 py-2">Descuento</th>
                        <th class="px-4 py-2">Fecha</th>
                    </tr>
                </thead>
                <tbody>
                    @foreach($inventoryHistories as $history)
                        <tr>
                            <td class="border px-4 py-2">{{ $history->product->product_name }}</td>
                            <td class="border px-4 py-2">{{ $history->cantidad_cambiada }}</td>
                            <td class="border px-4 py-2">{{ ucfirst($history->tipo_cambio) }}</td>
                            <td class="border px-4 py-2">{{ $history->comentario ?? 'N/A' }}</td>
                            <td class="border px-4 py-2">{{ $history->discount ?? 'N/A' }}</td>
                            <td class="border px-4 py-2">{{ $history->created_at->format('d/m/Y H:i') }}</td>
                        </tr>
                    @endforeach
                </tbody>
            </table>

            <div class="mt-4">
                {{ $inventoryHistories->links() }}
            </div>
        @endif
    </div>
</body>
</html>