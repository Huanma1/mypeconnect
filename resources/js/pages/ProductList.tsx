import { Link, router } from '@inertiajs/react';
import { useState } from 'react';
import { Product, Paginated } from '@/types';
import MainLayout from '@/components/MainLayout';
import CategoryDrawer from '@/components/ui/Categorias';
import Cart from '@/components/Cart';
import { useCart } from '@/context/CartContext';

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
    const [sortBy, setSortBy] = useState('');
    const [isDrawerOpen, setIsDrawerOpen] = useState(false);
    const [isCartVisible, setIsCartVisible] = useState(false);

    const { addToCart } = useCart();

    const handleFilter = () => {
        router.get('/products', {
            category,
            min_price: minPrice,
            max_price: maxPrice,
        }, {
            preserveState: false,
            preserveScroll: true,
        });
    };

    const sortedProducts = [...products.data].sort((a, b) => {
        if (sortBy === 'rating-asc') {
            const ratingA = a.mypes?.[0]?.pivot?.product_rate || 0;
            const ratingB = b.mypes?.[0]?.pivot?.product_rate || 0;
            return ratingA - ratingB;
        }
        if (sortBy === 'rating-desc') {
            const ratingA = a.mypes?.[0]?.pivot?.product_rate || 0;
            const ratingB = b.mypes?.[0]?.pivot?.product_rate || 0;
            return ratingB - ratingA;
        }
        if (sortBy === 'price-asc') {
            const priceA = a.mypes?.[0]?.pivot?.custom_price || 0;
            const priceB = b.mypes?.[0]?.pivot?.custom_price || 0;
            return priceA - priceB;
        }
        if (sortBy === 'price-desc') {
            const priceA = a.mypes?.[0]?.pivot?.custom_price || 0;
            const priceB = b.mypes?.[0]?.pivot?.custom_price || 0;
            return priceB - priceA;
        }
        if (sortBy === 'name-asc') {
            return a.product_name.localeCompare(b.product_name);
        }
        if (sortBy === 'name-desc') {
            return b.product_name.localeCompare(a.product_name);
        }
        return 0;
    });

    const handleSelectCategory = (cat: string) => {
        setCategory(cat);
        router.get('/products', {
            category: cat,
            min_price: minPrice,
            max_price: maxPrice,
        }, {
            preserveState: false,
            preserveScroll: true,
        });
    };

    const clearFilters = () => {
        setCategory('');
        setMinPrice('');
        setMaxPrice('');
        setSortBy('');

        router.get('/products', {}, {
            preserveState: false,
            preserveScroll: true,
        });
    };

    return (
        <MainLayout>
            <div className="py-8 max-w-[1200px] mx-auto">
                {isCartVisible && (
                    <Cart onClose={() => setIsCartVisible(false)} />
                )}

                <CategoryDrawer
                    isOpen={isDrawerOpen}
                    onClose={() => setIsDrawerOpen(false)}
                    categories={categories}
                    onSelectCategory={handleSelectCategory}
                />

                {/* Filtros envueltos en rectángulo blanco con sombra */}
                <div className="mb-8 bg-white shadow-md rounded-lg p-6 grid grid-cols-1 md:grid-cols-4 gap-4 items-center">
                    <input
                        type="number"
                        placeholder="Precio mínimo"
                        value={minPrice}
                        onChange={e => setMinPrice(e.target.value)}
                        className="p-2 border rounded w-full"
                    />
                    <input
                        type="number"
                        placeholder="Precio máximo"
                        value={maxPrice}
                        onChange={e => setMaxPrice(e.target.value)}
                        className="p-2 border rounded w-full"
                    />
                    <div className="flex items-center gap-2">
                        <label htmlFor="sort" className="font-semibold whitespace-nowrap">Ordenar por:</label>
                        <select
                            id="sort"
                            value={sortBy}
                            onChange={(e) => setSortBy(e.target.value)}
                            className="border border-gray-300 rounded px-2 py-1"
                        >
                            <option value="">Seleccionar</option>
                            <option value="rating-asc">Valoración (Peor a Mejor)</option>
                            <option value="rating-desc">Valoración (Mejor a Peor)</option>
                            <option value="price-asc">Precio (Menor a Mayor)</option>
                            <option value="price-desc">Precio (Mayor a Menor)</option>
                            <option value="name-asc">Nombre (A-Z)</option>
                            <option value="name-desc">Nombre (Z-A)</option>
                        </select>
                    </div>
                    <div className="flex gap-2">
                        <button
                            type="button"
                            onClick={handleFilter}
                            className="bg-green-600 text-white px-3 py-2 rounded hover:bg-green-700 transition flex-grow"
                        >
                            Aplicar
                        </button>
                        <button
                            onClick={clearFilters}
                            className="bg-gray-600 text-white px-3 py-2 rounded hover:bg-gray-700 transition flex-grow"
                        >
                            Quitar
                        </button>
                    </div>
                </div>

                {/* Listado de productos con tarjetas limpias */}
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                    {sortedProducts.length > 0 ? (
                        sortedProducts.map((product) => {
                            const mype = product.mypes?.[0];

                            return (
                                <Link
                                    key={product.id}
                                    href={`/products/${product.id}`}
                                    className="bg-white p-4 rounded shadow hover:shadow-lg transition-all flex flex-col gap-2"
                                >
                                    <div className="w-full h-48 flex items-center justify-center overflow-hidden bg-gray-100 rounded">
                                        <img
                                            src={typeof product.product_image_url === 'string'
                                                ? product.product_image_url
                                                : '/placeholder.png'}
                                            alt={product.product_name}
                                            className="object-contain h-full"
                                        />
                                    </div>
                                    <h2 className="text-lg font-semibold">{product.product_name}</h2>
                                    <p className="text-gray-600">{product.product_description}</p>
                                    <p className="text-green-500 font-bold">
                                        Desde: ${mype?.pivot?.custom_price ?? 'N/A'}
                                    </p>
                                    <p className="text-yellow-500">
                                        Calificación: {mype?.pivot?.product_rate ?? 'N/A'}
                                    </p>
                                </Link>
                            );
                        })
                    ) : (
                        <p>No hay productos disponibles.</p>
                    )}
                </div>
            </div>
        </MainLayout>
    );
}