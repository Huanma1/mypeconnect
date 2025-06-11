// ProductCard.tsx
import { useCart } from '@/context/CartContext';
import { Product } from '@/types';

const ProductCard = ({ product }: { product: Product }) => {
  const { addToCart } = useCart();

  return (
    <div className="bg-white p-4 rounded shadow hover:shadow-lg transition-all">
      <h2 className="text-lg font-semibold">{product.product_name}</h2>
      <p className="text-gray-600">{product.product_description}</p>
      <button
        className="mt-2 bg-blue-600 text-white px-3 py-1 rounded hover:bg-blue-700 transition"
        onClick={() => addToCart(product)}
      >
        Agregar al carrito
      </button>
    </div>
  );
};

export default ProductCard;