import ProductList from '@/pages/ProductList';
import { Paginated, Product } from '@/types';
import { Head, usePage } from '@inertiajs/react';

export default function Welcome() {
    const { products, categories } = usePage<{
        products: Paginated<Product>;
        categories: string[];
    }>().props;

    return (
        <>
            <Head title="Mype Connect" />
            <div></div>
            <div>
                <ProductList products={products} filters={{}} categories={categories} />
            </div>
        </>
    );
}
