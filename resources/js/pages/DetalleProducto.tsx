import { Product } from '@/types';
import { Link } from '@inertiajs/react';
import Layout from '@/components/MainLayout'; 

interface Props {
    product: Product;
}

export default function DetalleProducto({ product }: Props) {
    if (!product) {
        return (
            <Layout>
                <div>No se encontraron detalles del producto.</div>
            </Layout>
        );
    }

    return (
        <Layout>
            <div className="p-6 grid grid-cols-1 md:grid-cols-3 gap-6">
                {/* Detalles del producto */}
                <div className="md:col-span-2">
                    <h1 className="text-3xl font-bold">{product.product_name}</h1>
                    <p className="text-gray-700 mt-2">{product.product_description}</p>
                    <p className="mt-4 text-sm text-gray-500">Categoría: {product.category || 'Sin categoría'}</p>
                </div>

                {/* Lista de tiendas (MYPES) */}
                <div className="bg-white p-4 rounded shadow">
                    <h2 className="text-xl font-semibold mb-4">Tiendas que venden este producto</h2>
                    {product.mypes?.length > 0 ? (
                        <ul className="space-y-2">
                            {product.mypes.map((mype) => (
                                <li key={mype.id} className="border p-2 rounded">
                                    <p><strong>{mype.name}</strong></p>
                                    <p>Precio: ${mype.pivot?.custom_price || 'N/A'}</p>
                                    <p>Stock: {mype.pivot?.stock || 'N/A'}</p>
                                </li>
                            ))}
                        </ul>
                    ) : (
                        <p>No hay tiendas disponibles</p>
                    )}
                </div>

                {/* Botón de volver a inicio */}
                <div className="mt-6">
                    <Link
                        href={route('home')}
                        className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
                    >
                        Volver a Inicio
                    </Link>
                </div>
            </div>
        </Layout>
    );
}