import { useForm } from '@inertiajs/react';
import React from 'react';

interface LoginModalProps {
    onClose: () => void;
    userType: 'user' | 'mype';
}

export default function LoginModal({ onClose, userType }: LoginModalProps) {
    const { data, setData, post, processing, errors } = useForm({
        email: '',
        password: '',
    });

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        const loginRoute = userType === 'user' ? '/user/login' : '/mype/login'; // Define la ruta según el tipo de usuario
        post(loginRoute, {
            onSuccess: () => {
                window.location.reload(); // 🔁 Forzamos recarga completa para rehidratar props
            },
        });
    };

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm">
            <div className="relative w-96 rounded-lg bg-white p-6 shadow-xl">
                <button onClick={onClose} className="absolute top-2 right-3 text-2xl font-bold text-gray-600 hover:text-black">
                    &times;
                </button>

                {/* Título dinámico */}
                <h2 className="mb-4 text-2xl font-semibold">{userType === 'user' ? 'Iniciar Sesión - Cliente' : 'Iniciar Sesión - MYPE'}</h2>

                <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                        <label htmlFor="email" className="block text-sm font-medium">
                            Correo Electrónico:
                        </label>
                        <input
                            type="email"
                            id="email"
                            className="mt-1 w-full rounded border border-gray-300 px-3 py-2"
                            value={data.email}
                            onChange={(e) => setData('email', e.target.value)}
                            required
                        />
                        {errors.email && <div className="mt-1 text-sm text-red-600">{errors.email}</div>}
                    </div>

                    <div>
                        <label htmlFor="password" className="block text-sm font-medium">
                            Contraseña:
                        </label>
                        <input
                            type="password"
                            id="password"
                            className="mt-1 w-full rounded border border-gray-300 px-3 py-2"
                            value={data.password}
                            onChange={(e) => setData('password', e.target.value)}
                            required
                        />
                        {errors.password && <div className="mt-1 text-sm text-red-600">{errors.password}</div>}
                    </div>

                    <button type="submit" disabled={processing} className="w-full rounded bg-blue-600 py-2 text-white transition hover:bg-blue-700">
                        Iniciar Sesión
                    </button>
                </form>
            </div>
        </div>
    );
}
