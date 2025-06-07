import { Product } from '@/types';
import { Link } from '@inertiajs/react';
import Layout from '@/components/MainLayout';
import { useState } from 'react';
import { useCart } from '@/context/CartContext';

interface Props {
    product: Product | null; // Permitimos que product sea null
}


export default function DetalleProducto({ product }: Props) {
    const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('asc'); // Estado para el orden
    const { addToCart } = useCart();

    if (!product) {
        return (
            <Layout>
                <div>No se encontraron detalles del producto.</div>
            </Layout>
        );
    }

    // Ordenar las tiendas (MYPES) según el precio
    const sortedMypes = [...(product.mypes || [])].sort((a, b) => {
        const priceA = a.pivot?.custom_price || 0;
        const priceB = b.pivot?.custom_price || 0;

        return sortOrder === 'asc' ? priceA - priceB : priceB - priceA;
    });

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

                    {/* Botones para ordenar */}
                    <div className="flex justify-between mb-4">
                        <button
                            onClick={() => setSortOrder('asc')}
                            className={`px-4 py-2 rounded ${sortOrder === 'asc' ? 'bg-blue-500 text-white' : 'bg-gray-200 text-gray-700'}`}
                        >
                            Precio: Menor a Mayor
                        </button>
                        <button
                            onClick={() => setSortOrder('desc')}
                            className={`px-4 py-2 rounded ${sortOrder === 'desc' ? 'bg-blue-500 text-white' : 'bg-gray-200 text-gray-700'}`}
                        >
                            Precio: Mayor a Menor
                        </button>
                    </div>

                    {sortedMypes.length > 0 ? (
                        <ul className="space-y-2">
                            {sortedMypes.map((mype) => (
                                <li key={mype.id} className="border p-2 rounded">
                                    <p><strong>{mype.name}</strong></p>
                                    <p>Precio: ${mype.pivot?.custom_price ?? 'N/A'}</p>
                                    <p>Calificación: {mype.pivot?.product_rate ?? 'N/A'}</p>
                                     
                                    <div>
                                        <button
                                            className="mt-2 bg-blue-600 text-white px-3 py-1 rounded hover:bg-blue-700 transition"
                                            onClick={(e) => {
                                                e.preventDefault();
                                                addToCart({
                                                    id: product.id, 
                                                    mypeId: mype.id, 
                                                    name: product.product_name, 
                                                    description: product.product_description, 
                                                    price: mype.pivot?.custom_price || 0, 
                                                    quantity: 1, 
                                                    mypeName: mype.name,
                                                });
                                            }}
                                        >
                                            Agregar al carrito
                                        </button>
                                    </div>
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