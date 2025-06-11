import { useCart } from '@/context/CartContext';
import { router } from '@inertiajs/react';
import { useEffect, useRef } from 'react';

const Cart = ({ onClose }: { onClose: () => void }) => {
    const { cart, incrementQuantity, decrementQuantity, removeFromCart, clearCart } = useCart();

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

    const goToCheckout = () => {
        router.post('/checkout/store-cart', { items: cart });
    };

    return (
        <div ref={cartRef} className="fixed top-0 right-0 z-50 h-full w-1/3 bg-white p-6 shadow-lg">
            <h2 className="mb-4 text-2xl font-bold">🛒 Bolsa de compras</h2>

            {/* Lista de productos */}
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
                                className="rounded bg-gray-300 px-2 py-1 hover:bg-gray-400"
                            >
                                -
                            </button>
                            <button
                                onClick={() => incrementQuantity(item.id, item.mypeId)}
                                className="rounded bg-gray-300 px-2 py-1 hover:bg-gray-400"
                            >
                                +
                            </button>
                            <button onClick={() => removeFromCart(item.id, item.mypeId)} className="text-red-500 hover:text-red-700">
                                🗑
                            </button>
                        </div>
                    </li>
                ))}
            </ul>

            {/* Subtotal */}
            <div className="mt-6 border-t pt-4">
                <p className="text-lg font-semibold">Total Productos: {cart.length}</p>
                <p className="text-lg font-bold">Sub Total: ${calculateTotal().toLocaleString()}</p>
            </div>

            {/* Botones */}
            <div className="mt-6 flex justify-between">
                <button onClick={onClose} className="rounded bg-gray-300 px-4 py-2 text-gray-700 hover:bg-gray-400">
                    Volver
                </button>
                <button onClick={goToCheckout} className="rounded bg-green-600 px-4 py-2 text-white hover:bg-green-700">
                    Continuar
                </button>
            </div>
        </div>
    );
};

export default Cart;
