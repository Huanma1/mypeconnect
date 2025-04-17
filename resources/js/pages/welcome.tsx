import { Head, usePage } from '@inertiajs/react';
import { Product, Paginated } from '@/types';
import ProductList from '@/pages/ProductList';

export default function Welcome() {
    const { products, categories } = usePage<{ 
        products: Paginated<Product>; 
        categories: string[]; 
    }>().props;

    return (
        <>
            <Head title="Inicio">

            </Head>
            <div>
                
            </div>
            <div>
                <ProductList products={products} filters={{}} categories={categories} />
            </div>
                
        </>
    );
}