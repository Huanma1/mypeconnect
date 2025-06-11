// ProductCard.tsx
import { useCart } from '@/context/CartContext';
import { Product } from '@/types';

const ProductCard = ({ product }: { product: Product }) => {
    const { addToCart } = useCart();

    return (
        <div className="rounded bg-white p-4 shadow transition-all hover:shadow-lg">
            <h2 className="text-lg font-semibold">{product.product_name}</h2>
            <p className="text-gray-600">{product.product_description}</p>
            <button className="mt-2 rounded bg-blue-600 px-3 py-1 text-white transition hover:bg-blue-700" onClick={() => addToCart(product)}>
                Agregar al carrito
            </button>
        </div>
    );
};

export default ProductCard;
