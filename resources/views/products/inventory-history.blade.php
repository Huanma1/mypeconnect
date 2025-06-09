<!DOCTYPE html>
<html>
<head>
    <title>Historial de Cambios</title>
    <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/tailwindcss@2.2.19/dist/tailwind.min.css">
</head>
<body class="bg-gray-100">
    <div class="max-w-6xl mx-auto mt-10 px-4">
        <h1 class="text-3xl font-bold mb-6 text-center text-gray-900">
            Historial de Cambios
        </h1>

        @if($inventoryHistories->isEmpty())
            <div class="bg-white p-6 rounded-lg shadow text-center text-gray-500">
                No hay cambios registrados en el inventario.
            </div>
        @else
            <div class="bg-white shadow-md rounded-lg overflow-hidden">
                <table class="min-w-full text-sm text-gray-800">
                    <thead class="bg-gray-50 border-b text-left">
                        <tr>
                            <th class="px-6 py-3 font-semibold">Producto</th>
                            <th class="px-6 py-3 font-semibold">Cantidad</th>
                            <th class="px-6 py-3 font-semibold">Tipo</th>
                            <th class="px-6 py-3 font-semibold">Comentario</th>
                            <th class="px-6 py-3 font-semibold">Fecha</th>
                        </tr>
                    </thead>
                    <tbody class="divide-y divide-gray-200">
                        @foreach($inventoryHistories as $history)
                            <tr class="hover:bg-gray-50 transition">
                                <td class="px-6 py-4">{{ $history->product->product_name }}</td>
                                <td class="px-6 py-4">{{ $history->cantidad_cambiada }}</td>
                                <td class="px-6 py-4">
                                    <span class="{{ strtolower($history->tipo_cambio) === 'entrada' ? 'text-green-600 font-medium' : 'text-red-500 font-medium' }}">
                                        {{ ucfirst($history->tipo_cambio) }}
                                    </span>
                                </td>
                                <td class="px-6 py-4">{{ $history->comentario ?? 'N/A' }}</td>
                                <td class="px-6 py-4">{{ $history->created_at->format('d/m/Y H:i') }}</td>
                            </tr>
                        @endforeach
                    </tbody>
                </table>
            </div>

            <div class="mt-6">
                {{ $inventoryHistories->links() }}
            </div>
        @endif
    </div>
</body>
</html>