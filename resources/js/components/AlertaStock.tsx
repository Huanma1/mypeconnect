import React, { useState } from 'react';

interface Producto {
  id: number;
  product_name: string;
  product_description: string;
  category: string;
  rating: string;
  mypes: {
    id: number;
    name: string;
    pivot: {
      custom_price: number;
      stock: number;
      min_stock: number;
    };
  }[];
}

interface AlertaStockProps {
  productos: Producto[];
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
          {productos.map((producto) => {
            const prod = producto.product; // producto es un MypeProduct, no un Producto
            if (!prod) return null;

            return (
              <li key={producto.id}>
                {prod.product_name} (stock: {producto.stock}, mínimo: {producto.min_stock})
              </li>
            );
          })}

        </ul>
      )}
    </div>
  );
};

export default AlertaStock;