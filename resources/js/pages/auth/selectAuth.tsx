import React, { useState } from 'react';
import LoginModal from '../Login'; // Importa el componente LoginModal

export default function SelectLogin() {
  const [showModal, setShowModal] = useState(false);
  const [userType, setUserType] = useState<'user' | 'mype' | null>(null);

  const openModal = (type: 'user' | 'mype') => {
    setUserType(type);
    setShowModal(true);
  };

  return (
    <div className="flex items-center justify-center h-screen bg-gray-100">
      <div className="text-center">
        <h1 className="text-2xl font-bold mb-6">¿Eres un cliente o una MYPE?</h1>
        <div className="flex justify-center gap-6">
          <button
            onClick={() => openModal('user')}
            className="bg-blue-500 text-white px-6 py-3 rounded hover:bg-blue-600"
          >
            Soy Cliente
          </button>
          <button
            onClick={() => openModal('mype')}
            className="bg-green-500 text-white px-6 py-3 rounded hover:bg-green-600"
          >
            Soy MYPE
          </button>
        </div>
      </div>

      {showModal && userType && (
        <LoginModal onClose={() => setShowModal(false)} userType={userType} />
      )}
    </div>
  );
}