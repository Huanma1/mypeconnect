import { useForm } from '@inertiajs/react';
import React from 'react';

interface RegisterModalProps {
    onClose: () => void;
}

export default function RegisterModal({ onClose }: RegisterModalProps) {
    const { data, setData, post, processing, errors } = useForm({
        name: '',
        email: '',
        password: '',
        password_confirmation: '',
        phone_number: '',
        mype_address: '',
        mype_description: '',
    });

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        post('/mypes', {
            onSuccess: () => onClose(),
        });
    };

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm">
            <div className="relative max-h-[90vh] w-[30rem] overflow-y-auto rounded-lg bg-white p-6 shadow-xl">
                <button onClick={onClose} className="absolute top-1 right-2 text-2xl font-bold text-gray-600 hover:text-black">
                    &times;
                </button>

                <h2 className="mb-4 text-2xl font-semibold">Registrar Mype</h2>

                <form onSubmit={handleSubmit} className="space-y-4">
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

                    <div>
                        <label htmlFor="phone_number" className="block text-sm font-medium">
                            Teléfono
                        </label>
                        <input
                            id="phone_number"
                            type="text"
                            value={data.phone_number}
                            onChange={(e) => setData('phone_number', e.target.value)}
                            className="mt-1 w-full rounded border border-gray-300 px-3 py-2"
                        />
                        {errors.phone_number && <div className="mt-1 text-sm text-red-600">{errors.phone_number}</div>}
                    </div>

                    <div>
                        <label htmlFor="mype_address" className="block text-sm font-medium">
                            Dirección
                        </label>
                        <input
                            id="mype_address"
                            type="text"
                            value={data.mype_address}
                            onChange={(e) => setData('mype_address', e.target.value)}
                            className="mt-1 w-full rounded border border-gray-300 px-3 py-2"
                            required
                        />
                        {errors.mype_address && <div className="mt-1 text-sm text-red-600">{errors.mype_address}</div>}
                    </div>

                    <div>
                        <label htmlFor="mype_description" className="block text-sm font-medium">
                            Descripción
                        </label>
                        <textarea
                            id="mype_description"
                            value={data.mype_description}
                            onChange={(e) => setData('mype_description', e.target.value)}
                            className="mt-1 w-full rounded border border-gray-300 px-3 py-2"
                        />
                        {errors.mype_description && <div className="mt-1 text-sm text-red-600">{errors.mype_description}</div>}
                    </div>

                    <button type="submit" disabled={processing} className="w-full rounded bg-blue-600 py-2 text-white transition hover:bg-blue-700">
                        Registrar
                    </button>
                </form>
            </div>
        </div>
    );
}
