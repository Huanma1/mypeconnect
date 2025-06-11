import { router, useForm } from '@inertiajs/react';
import React from 'react';

interface UserRegisterProps {
    onClose: () => void;
}

export default function UserRegister({ onClose }: UserRegisterProps) {
    const { data, setData, post, processing, errors } = useForm({
        name: '',
        email: '',
        password: '',
        password_confirmation: '',
    });

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        post(route('user.register.submit'), {
            onSuccess: () => {
                router.visit('/'); // Redirige a la página inicial
            },
        });
    };

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm">
            <div className="relative w-96 rounded-lg bg-white p-6 shadow-xl">
                <button onClick={onClose} className="absolute top-2 right-3 text-2xl font-bold text-gray-600 hover:text-black">
                    &times;
                </button>
                <h2 className="mb-4 text-2xl font-semibold">Registro - Cliente</h2>
                <form onSubmit={handleSubmit} className="space-y-4">
                    {/* Campo: Nombre */}
                    <div>
                        <label htmlFor="name" className="block text-sm font-medium">
                            Nombre
                        </label>
                        <input
                            id="name"
                            type="text"
                            value={data.name}
                            onChange={(e) => setData('name', e.target.value)}
                            className="mt-1 w-full rounded border border-gray-300 px-3 py-2"
                            required
                        />
                        {errors.name && <div className="mt-1 text-sm text-red-600">{errors.name}</div>}
                    </div>

                    {/* Campo: Correo Electrónico */}
                    <div>
                        <label htmlFor="email" className="block text-sm font-medium">
                            Correo Electrónico
                        </label>
                        <input
                            id="email"
                            type="email"
                            value={data.email}
                            onChange={(e) => setData('email', e.target.value)}
                            className="mt-1 w-full rounded border border-gray-300 px-3 py-2"
                            required
                        />
                        {errors.email && <div className="mt-1 text-sm text-red-600">{errors.email}</div>}
                    </div>

                    {/* Campo: Contraseña */}
                    <div>
                        <label htmlFor="password" className="block text-sm font-medium">
                            Contraseña
                        </label>
                        <input
                            id="password"
                            type="password"
                            value={data.password}
                            onChange={(e) => setData('password', e.target.value)}
                            className="mt-1 w-full rounded border border-gray-300 px-3 py-2"
                            required
                        />
                        {errors.password && <div className="mt-1 text-sm text-red-600">{errors.password}</div>}
                    </div>

                    {/* Campo: Confirmar Contraseña */}
                    <div>
                        <label htmlFor="password_confirmation" className="block text-sm font-medium">
                            Confirmar Contraseña
                        </label>
                        <input
                            id="password_confirmation"
                            type="password"
                            value={data.password_confirmation}
                            onChange={(e) => setData('password_confirmation', e.target.value)}
                            className="mt-1 w-full rounded border border-gray-300 px-3 py-2"
                            required
                        />
                        {errors.password_confirmation && <div className="mt-1 text-sm text-red-600">{errors.password_confirmation}</div>}
                    </div>

                    {/* Botón de Enviar */}
                    <button type="submit" disabled={processing} className="w-full rounded bg-blue-600 py-2 text-white transition hover:bg-blue-700">
                        Registrarme
                    </button>
                </form>
            </div>
        </div>
    );
}
