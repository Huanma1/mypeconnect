import { Head, usePage } from '@inertiajs/react';
import { Product, Paginated } from '@/types';
import ProductList from '@/pages/ProductList';
import MainLayout from '@/components/MainLayout';

export default function Welcome() {
    const { products, categories } = usePage<{ 
        products: Paginated<Product>; 
        categories: string[]; 
    }>().props;
    

    return (
        <>
            <Head title="Mype Connect" />
            <div>
                
            </div>
            <div>
                <ProductList products={products} filters={{}} categories={categories} />
            </div>
                
        </>
    );
}