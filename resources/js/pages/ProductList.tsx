import { Link } from '@inertiajs/react'; // Asegúrate de importar el Link
import { Product, Paginated } from '@/types';

interface Props {
    products: Paginated<Product> | undefined; // Asegúrate de que products sea del tipo Paginated<Product> o undefined
}

export default function ProductList({ products }: Props) {
    // Verifica si los productos están cargados
    if (!products) {
        return <div>Cargando productos...</div>; // Mostrar un mensaje mientras los datos se cargan
    }

    return (
        <div className="py-8">
            <h1 className="text-3xl font-bold mb-6">Productos Disponibles</h1>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                {products.data.length > 0 ? (
                    products.data.map((product) => (
                        <Link
                            key={product.id}
                            href={`/products/${product.id}`}
                            className="bg-white p-4 rounded shadow hover:shadow-lg transition-all"
                        >
                            <h2 className="text-lg font-semibold">{product.product_name}</h2>
                            <p className="text-gray-600">{product.product_description}</p>
                            <p className="text-green-500 font-bold">
                                Desde: ${product.mypes[0]?.pivot?.custom_price || 'N/A'}
                            </p>
                        </Link>
                    ))
                ) : (
                    <p>No hay productos disponibles.</p>
                )}
            </div>
            <div className="mt-6 flex justify-center">
                {products.links.map((link, index) => (
                    <a
                        key={index}
                        href={link.url || '#'}
                        className={`px-4 py-2 border ${
                            link.active ? 'bg-blue-500 text-white' : 'text-gray-700'
                        }`}
                    >
                        {link.label}
                    </a>
                ))}
            </div>
        </div>
    );
}
