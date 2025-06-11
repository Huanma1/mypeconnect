import { Product } from '@/types/index';
import React, { useState } from 'react';

interface AlertaStockProps {
    productos: Product[]; // Aquí aseguramos que productos es de tipo Product[]
}

const AlertaStock: React.FC<AlertaStockProps> = ({ productos }) => {
    const [isMinimized, setIsMinimized] = useState(false);

    const toggleVisibility = () => {
        setIsMinimized(!isMinimized);
    };

    return (
        <div className="mb-4 rounded border-l-4 border-yellow-500 bg-yellow-100 p-4 text-yellow-800">
            <div className="flex items-center justify-between">
                <p className="font-bold">⚠️ Alerta de bajo stock</p>
                <button onClick={toggleVisibility} className="text-black-500 text-sm hover:underline">
                    {isMinimized ? 'Mostrar' : 'Minimizar'}
                </button>
            </div>
            {!isMinimized && (
                <ul className="mt-2 list-disc pl-5">
                    {productos && productos.length > 0 ? (
                        productos.map((producto) => (
                            <li key={producto.id}>
                                {producto.product_name} (stock: {producto.stock}, mínimo: {producto.min_stock})
                            </li>
                        ))
                    ) : (
                        <li>No hay productos con bajo stock.</li>
                    )}
                </ul>
            )}
        </div>
    );
};

export default AlertaStock;
