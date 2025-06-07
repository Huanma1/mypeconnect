import { useCart } from '@/context/CartContext';
import { useEffect, useRef } from 'react';
import { Product } from '@/types';

const Cart = ({ onClose }: { onClose: () => void }) => {
  const { cart, incrementQuantity, decrementQuantity, removeFromCart, clearCart } = useCart();
  const { cart, removeFromCart, clearCart } = useCart();
  const cartRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (cartRef.current && !cartRef.current.contains(event.target as Node)) {
        onClose();
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [onClose]);

  const calculateTotal = () => {
    return cart.reduce((total, item) => total + item.price * item.quantity, 0);
  };

    return cart.reduce((total, item) => {
      const price = item.mypes?.[0]?.pivot?.custom_price || 0;
      return total + price * item.quantity;
    }, 0);
  };

  return (
    <div
      ref={cartRef}
      className="fixed top-0 right-0 w-1/3 h-full bg-white shadow-lg p-6 z-50"
    >
      <h2 className="text-2xl font-bold mb-4">🛒 Bolsa de compras</h2>

      <ul className="space-y-4">
        {cart.map((item) => (
          <li key={`${item.id}-${item.mypeId}`} className="flex items-center justify-between">
            <div>
              <p className="font-semibold">{item.name}</p>
              <p className="text-sm text-gray-500">Tienda: {item.mypeName}</p>
              <p className="text-sm text-gray-500">${item.price.toLocaleString()}</p>
              <p className="text-sm">Cantidad: {item.quantity}</p>
            </div>
            <div className="flex items-center gap-2">
              <button
                onClick={() => decrementQuantity(item.id, item.mypeId)}
                className="px-2 py-1 bg-gray-300 rounded hover:bg-gray-400"
              >
                -
              </button>
              <button
                onClick={() => incrementQuantity(item.id, item.mypeId)}
                className="px-2 py-1 bg-gray-300 rounded hover:bg-gray-400"
              >
                +
              </button>
              <button
                onClick={() => removeFromCart(item.id, item.mypeId)}
                className="text-red-500 hover:text-red-700"
              >
                🗑
              </button>
            </div>
          </li>
        ))}
      </ul>

      <div className="mt-6 border-t pt-4">
        <p className="text-lg font-semibold">Total Productos: {cart.length}</p>
        <p className="text-lg font-bold">Sub Total: ${calculateTotal().toLocaleString()}</p>
      </div>

      <div className="mt-6 flex justify-between">
        <button
          onClick={onClose}
          className="bg-gray-300 text-gray-700 px-4 py-2 rounded hover:bg-gray-400"
        >
          Volver
        </button>
        <button
          className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
        >
          Continuar
        </button>
      </div>
    </div>
  );
};

export default Cart;