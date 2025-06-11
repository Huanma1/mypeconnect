import { createContext, ReactNode, useContext, useState } from 'react';

export interface CartItem {
    id: number;
    mypeId: number;
    name: string;
    description: string;
    price: number;
    quantity: number;
    mypeName: string;
}

interface CartContextType {
    cart: CartItem[];
    addToCart: (item: CartItem) => void;
    removeFromCart: (productId: number, mypeId: number) => void;
    clearCart: () => void;
    incrementQuantity: (productId: number, mypeId: number) => void;
    decrementQuantity: (productId: number, mypeId: number) => void;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export const CartProvider = ({ children }: { children: ReactNode }) => {
    const [cart, setCart] = useState<CartItem[]>([]);

    const addToCart = (item: CartItem) => {
        setCart((prev) => {
            const found = prev.find((cartItem) => cartItem.id === item.id && cartItem.mypeId === item.mypeId);
            if (found) {
                return prev.map((cartItem) =>
                    cartItem.id === item.id && cartItem.mypeId === item.mypeId
                        ? { ...cartItem, quantity: cartItem.quantity + item.quantity }
                        : cartItem,
                );
            }
            return [...prev, item];
        });
    };

    const incrementQuantity = (productId: number, mypeId: number) => {
        setCart((prev) => prev.map((item) => (item.id === productId && item.mypeId === mypeId ? { ...item, quantity: item.quantity + 1 } : item)));
    };

    const decrementQuantity = (productId: number, mypeId: number) => {
        setCart((prev) =>
            prev.map((item) =>
                item.id === productId && item.mypeId === mypeId && item.quantity > 1 ? { ...item, quantity: item.quantity - 1 } : item,
            ),
        );
    };

    const removeFromCart = (productId: number, mypeId: number) => {
        setCart((prev) => prev.filter((item) => !(item.id === productId && item.mypeId === mypeId)));
    };

    const clearCart = () => setCart([]);

    return (
        <CartContext.Provider value={{ cart, addToCart, removeFromCart, clearCart, incrementQuantity, decrementQuantity }}>
            {children}
        </CartContext.Provider>
    );
};

export const useCart = () => {
    const context = useContext(CartContext);
    if (!context) throw new Error('useCart debe usarse dentro de un CartProvider');
    return context;
};
