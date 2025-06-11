import Cart from '@/components/Cart';
import MainLayout from '@/components/MainLayout';
import CategoryDrawer from '@/components/ui/Categorias';
import { useCart } from '@/context/CartContext';
import { Paginated, Product } from '@/types';
import { Link, router } from '@inertiajs/react';
import { useState } from 'react';

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
        router.get(
            '/products',
            {
                category,
                min_price: minPrice,
                max_price: maxPrice,
            },
            {
                preserveState: false,
                preserveScroll: true,
            },
        );
    };

    const sortedProducts = [...products.data].sort((a, b) => {
        if (sortBy === 'rating-asc') {
            const ratingA = a.mypes?.[0]?.pivot?.product_rate || 0;
            const ratingB = b.mypes?.[0]?.pivot?.product_rate || 0;
            return ratingA - ratingB; // Orden ascendente por valoración
        }
        if (sortBy === 'rating-desc') {
            const ratingA = a.mypes?.[0]?.pivot?.product_rate || 0;
            const ratingB = b.mypes?.[0]?.pivot?.product_rate || 0;
            return ratingB - ratingA; // Orden descendente por valoración
        }
        if (sortBy === 'price-asc') {
            const priceA = a.mypes?.[0]?.pivot?.custom_price || 0;
            const priceB = b.mypes?.[0]?.pivot?.custom_price || 0;
            return priceA - priceB; // Orden ascendente por precio
        }
        if (sortBy === 'price-desc') {
            const priceA = a.mypes?.[0]?.pivot?.custom_price || 0;
            const priceB = b.mypes?.[0]?.pivot?.custom_price || 0;
            return priceB - priceA; // Orden descendente por precio
        }
        if (sortBy === 'name-asc') {
            return a.product_name.localeCompare(b.product_name); // Orden A-Z
        }
        if (sortBy === 'name-desc') {
            return b.product_name.localeCompare(a.product_name); // Orden Z-A
        }
        return 0; // Sin orden
    });

    const handleSelectCategory = (cat: string) => {
        setCategory(cat);
        router.get(
            '/products',
            {
                category: cat,
                min_price: minPrice,
                max_price: maxPrice,
            },
            {
                preserveState: false,
                preserveScroll: true,
            },
        );
    };

    const clearFilters = () => {
        setCategory('');
        setMinPrice('');
        setMaxPrice('');
        setSortBy('');

        router.get(
            '/products',
            {},
            {
                preserveState: false,
                preserveScroll: true,
            },
        );
    };

    return (
        <MainLayout>
            <div className="mx-auto max-w-[1200px] py-8">
                {isCartVisible && <Cart onClose={() => setIsCartVisible(false)} />}

                <CategoryDrawer
                    isOpen={isDrawerOpen}
                    onClose={() => setIsDrawerOpen(false)}
                    categories={categories}
                    onSelectCategory={handleSelectCategory}
                />

                {/* Filtros alineados horizontalmente y ordenados */}
                <div className="mb-8 grid grid-cols-1 items-center gap-4 rounded-lg bg-white p-6 shadow-md md:grid-cols-4">
                    <input
                        type="number"
                        placeholder="Precio mínimo"
                        value={minPrice}
                        onChange={(e) => setMinPrice(e.target.value)}
                        className="w-full rounded border p-2"
                    />
                    <input
                        type="number"
                        placeholder="Precio máximo"
                        value={maxPrice}
                        onChange={(e) => setMaxPrice(e.target.value)}
                        className="w-full rounded border p-2"
                    />
                    <div className="flex w-full items-center gap-3">
                        <label htmlFor="sort" className="font-semibold whitespace-nowrap">
                            Ordenar por:
                        </label>
                        <select
                            id="sort"
                            value={sortBy}
                            onChange={(e) => setSortBy(e.target.value)}
                            className="w-full rounded border border-gray-300 px-2 py-2"
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
                    <div className="flex w-full items-center gap-3">
                        <button
                            type="button"
                            onClick={handleFilter}
                            className="w-full rounded bg-green-600 px-3 py-2 text-white transition hover:bg-green-700"
                        >
                            Aplicar
                        </button>
                        <button onClick={clearFilters} className="w-full rounded bg-gray-600 px-3 py-2 text-white transition hover:bg-gray-700">
                            Quitar
                        </button>
                    </div>
                </div>

                {/* Productos */}
                <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
                    {sortedProducts.length > 0 ? (
                        sortedProducts.map((product) => {
                            const mype = product.mypes?.[0];

                            return (
                                <Link
                                    key={product.id}
                                    href={`/products/${product.id}`}
                                    className="flex flex-col gap-2 rounded bg-white p-4 shadow transition-all hover:shadow-lg"
                                >
                                    <div className="flex h-48 w-full items-center justify-center overflow-hidden rounded bg-gray-100">
                                        <img
                                            src={typeof product.product_image_url === 'string' ? product.product_image_url : '/placeholder.png'}
                                            alt={product.product_name}
                                            className="h-full object-contain"
                                        />
                                    </div>
                                    <h2 className="text-lg font-semibold">{product.product_name}</h2>
                                    <p className="text-gray-600">{product.product_description}</p>
                                    <p className="font-bold text-green-500">Desde: ${mype?.pivot?.custom_price ?? 'N/A'}</p>
                                    <p className="text-yellow-500">Calificación: {mype?.pivot?.product_rate ?? 'N/A'}</p>
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
