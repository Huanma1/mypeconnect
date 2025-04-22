import { Link, router } from '@inertiajs/react';
import { useState } from 'react';
import { Product, Paginated } from '@/types';
import MainLayout from '@/components/MainLayout'; // Cambiado a MainLayout

interface Props {
    products: Paginated<Product>;
    filters: {
        category?: string;
        min_price?: string;
        max_price?: string;
    };
    categories: string[];
}

export default function ProductList({ products, filters, categories }: Props) {
    const [category, setCategory] = useState(filters?.category || '');
    const [minPrice, setMinPrice] = useState(filters?.min_price || '');
    const [maxPrice, setMaxPrice] = useState(filters?.max_price || '');

    const handleFilter = (e: React.MouseEvent<HTMLButtonElement>) => {
        e.preventDefault();
    
        router.get('/products', {
            category,
            min_price: minPrice,
            max_price: maxPrice,
        }, {
            preserveState: false, // Forzar la recarga de los props compartidos
            preserveScroll: true, // Mantener la posición de desplazamiento
        });
    };

    const clearFilters = () => {
        // Restablece los valores de los filtros
        setCategory('');
        setMinPrice('');
        setMaxPrice('');

        // Navega a la ruta sin filtros
        router.get('/products', {}, {
            preserveState: false,
            preserveScroll: true,
        });
    };

    return (
        <MainLayout> {/* Cambiado a MainLayout */}
            <div className="py-8">
                <h1 className="text-3xl font-bold mb-6">Productos Disponibles</h1>

                {/* Filtros */}
                <div className="mb-8 grid grid-cols-1 md:grid-cols-5 gap-4 items-end">
                    {/* Categoría */}
                    <select
                        value={category}
                        onChange={e => setCategory(e.target.value)}
                        className="p-2 border rounded w-full"
                    >
                        <option value="">Todas las categorías</option>
                        {categories?.map((cat) => (
                            <option key={cat} value={cat}>{cat}</option>
                        ))}
                    </select>

                    {/* Precio mínimo */}
                    <input
                        type="number"
                        placeholder="Precio mínimo"
                        value={minPrice}
                        onChange={e => setMinPrice(e.target.value)}
                        className="p-2 border rounded w-full"
                    />

                    {/* Precio máximo */}
                    <input
                        type="number"
                        placeholder="Precio máximo"
                        value={maxPrice}
                        onChange={e => setMaxPrice(e.target.value)}
                        className="p-2 border rounded w-full"
                    />

                    {/* Botón Aplicar */}
                    <button
                        type="button"
                        onClick={handleFilter}
                        className="bg-blue-500 text-white px-3 py-2 rounded hover:bg-blue-600 transition w-full"
                    >
                        Aplicar
                    </button>

                    {/* Botón Quitar */}
                    <button
                        onClick={clearFilters}
                        className="bg-red-500 text-white px-3 py-2 rounded hover:bg-red-600 transition w-full"
                    >
                        Quitar
                    </button>
                </div>

                {/* Lista de productos */}
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                    {products?.data?.length > 0 ? (
                        products.data.map((product) => (
                            <Link
                                key={product.id}
                                href={`/products/${product.id}`} // Ruta al detalle del producto
                                className="bg-white p-4 rounded shadow hover:shadow-lg transition-all"
                            >
                                <h2 className="text-lg font-semibold">{product.product_name}</h2>
                                <p className="text-gray-600">{product.product_description}</p>
                                <p className="text-green-500 font-bold">
                                    Desde: ${product.mypes.length > 0 ? product.mypes[0]?.pivot?.custom_price : 'N/A'}
                                </p>
                                <p className="text-yellow-500">
                                    Calificación: {product.mypes.length > 0 ? product.mypes[0]?.pivot?.product_rate : 'N/A'}
                                </p>
                            </Link>
                        ))
                    ) : (
                        <p>No hay productos disponibles.</p>
                    )}
                </div>
            </div>
        </MainLayout>
    );
}