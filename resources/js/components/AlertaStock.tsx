import React, { useState } from 'react';

interface Producto {
  id: number;
  product_name: string;
  product_description: string;
  category: string;
  rating: string;
  stock: number; // Agregar stock directamente
  min_stock: number; // Agregar min_stock directamente
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
          {productos.map((producto) => (
            <li key={producto.id}>
              {producto.product_name} (stock: {producto.stock}, mínimo: {producto.min_stock})
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default AlertaStock;