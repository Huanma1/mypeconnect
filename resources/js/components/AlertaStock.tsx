import React, { useState } from 'react';
import { Product } from '@/types/index';

interface AlertaStockProps {
  productos: Product[]; // Aquí aseguramos que productos es de tipo Product[]
}

const AlertaStock: React.FC<AlertaStockProps> = ({ productos }) => {
  const [isMinimized, setIsMinimized] = useState(false);

  const toggleVisibility = () => {
    setIsMinimized(!isMinimized);
  };

  return (
    <div className="bg-yellow-100 border-l-4 border-yellow-500 text-yellow-800 p-4 rounded mb-4">
      <div className="flex justify-between items-center">
        <p className="font-bold">⚠️ Alerta de bajo stock</p>
        <button
          onClick={toggleVisibility}
          className="text-sm text-black-500 hover:underline"
        >
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
