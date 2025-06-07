import React, { useState } from 'react';
import UserRegister from '../UserRegister'; // Importa el componente de registro para clientes
import RegisterModal from '../Register'; // Importa el componente de registro para MYPEs

export default function SelectRegister() {
  const [showModal, setShowModal] = useState(false);
  const [registerType, setRegisterType] = useState<'user' | 'mype' | null>(null);

  const openModal = (type: 'user' | 'mype') => {
    setRegisterType(type);
    setShowModal(true);
  };

  return (
    <div className="flex items-center justify-center h-screen bg-gray-100">
      <div className="text-center">
        <h1 className="text-2xl font-bold mb-6">¿Quieres registrarte como Cliente o como MYPE?</h1>
        <div className="flex justify-center gap-6">
          <button
            onClick={() => openModal('user')}
            className="bg-blue-500 text-white px-6 py-3 rounded hover:bg-blue-600"
          >
            Registrarme como Cliente
          </button>
          <button
            onClick={() => openModal('mype')}
            className="bg-green-500 text-white px-6 py-3 rounded hover:bg-green-600"
          >
            Registrarme como MYPE
          </button>
        </div>
      </div>

      {showModal && registerType && (
        registerType === 'user' ? (
          <UserRegister onClose={() => setShowModal(false)} />
        ) : (
          <RegisterModal onClose={() => setShowModal(false)} />
        )
      )}
    </div>
  );
}