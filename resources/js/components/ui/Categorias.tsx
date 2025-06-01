import React, { useEffect, useRef } from 'react';

interface CategoryDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  categories: string[];
  onSelectCategory: (category: string) => void;
}

export default function CategoryDrawer({
  isOpen,
  onClose,
  categories,
  onSelectCategory,
}: CategoryDrawerProps) {
  const drawerRef = useRef<HTMLDivElement>(null);

  // Cerrar al hacer clic fuera del drawer
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (drawerRef.current && !drawerRef.current.contains(event.target as Node)) {
        onClose();
      }
    }

    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <>
      {/* Fondo transparente + blur */}
      <div className="fixed inset-0 z-40 backdrop-blur-sm transition-opacity duration-300"></div>

      {/* Drawer izquierdo */}
      <div
        ref={drawerRef}
        className={`fixed top-0 left-0 h-full w-64 bg-white shadow-lg z-50 transform transition-transform duration-300 ${
          isOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        <div className="p-4 border-b font-bold text-lg">
          Categorías
        </div>
        <ul className="p-4 space-y-2">
          {categories.map((cat) => (
            <li
              key={cat}
              onClick={() => {
                onSelectCategory(cat);
                onClose();
              }}
              className="cursor-pointer hover:text-blue-600"
            >
              {cat}
            </li>
          ))}
        </ul>
      </div>
    </>
  );
}