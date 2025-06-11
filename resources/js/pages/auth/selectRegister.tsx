import { useState } from 'react';
import RegisterModal from '../Register'; // Importa el componente de registro para MYPEs
import UserRegister from '../UserRegister'; // Importa el componente de registro para clientes

export default function SelectRegister() {
    const [showModal, setShowModal] = useState(false);
    const [registerType, setRegisterType] = useState<'user' | 'mype' | null>(null);

    const openModal = (type: 'user' | 'mype') => {
        setRegisterType(type);
        setShowModal(true);
    };

    return (
        <div className="flex h-screen items-center justify-center bg-gray-100">
            <div className="text-center">
                <h1 className="mb-6 text-2xl font-bold">¿Quieres registrarte como Cliente o como MYPE?</h1>
                <div className="flex justify-center gap-6">
                    <button onClick={() => openModal('user')} className="rounded bg-blue-500 px-6 py-3 text-white hover:bg-blue-600">
                        Registrarme como Cliente
                    </button>
                    <button onClick={() => openModal('mype')} className="rounded bg-green-500 px-6 py-3 text-white hover:bg-green-600">
                        Registrarme como MYPE
                    </button>
                </div>
            </div>

            {showModal &&
                registerType &&
                (registerType === 'user' ? (
                    <UserRegister onClose={() => setShowModal(false)} />
                ) : (
                    <RegisterModal onClose={() => setShowModal(false)} />
                ))}
        </div>
    );
}
