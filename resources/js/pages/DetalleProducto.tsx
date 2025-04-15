import { Product } from '@/types';

interface Props {
    product: Product;
}

export default function DetalleProducto({ product }: Props) {
    return (
        <div className="p-6 grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Detalles del producto */}
            <div className="md:col-span-2">
                <h1 className="text-3xl font-bold">{product.product_name}</h1>
                <p className="text-gray-700 mt-2">{product.product_description}</p>
                <p className="mt-4 text-sm text-gray-500">Categoría: {product.category}</p> {/* Aquí mostramos la categoría */}
            </div>

            {/* Lista de tiendas (MYPES) */}
            <div className="bg-black p-4 rounded shadow">
                <h2 className="text-xl font-semibold mb-4">Tiendas que venden este producto</h2>
                {product.mypes.length > 0 ? (
                    <ul className="space-y-2">
                        {product.mypes.map((mype) => (
                            <li key={mype.id} className="border p-2 rounded">
                                <p><strong>{mype.name}</strong></p>
                                <p>Precio: ${mype.pivot.custom_price}</p>
                                <p>Stock: {mype.pivot.stock}</p>
                            </li>
                        ))}
                    </ul>
                ) : (
                    <p>No hay tiendas disponibles</p>
                )}
            </div>
        </div>
    );
}
