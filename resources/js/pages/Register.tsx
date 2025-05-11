import React from 'react';
import { useForm } from '@inertiajs/react';

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
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50">
      <div className="bg-white rounded-lg p-6 w-[30rem] relative shadow-xl overflow-y-auto max-h-[90vh]">
        <button
          onClick={onClose}
          className="absolute top-1 right-2 text-gray-600 hover:text-black text-2xl font-bold"
        >
          &times;
        </button>

        <h2 className="text-2xl font-semibold mb-4">Registrar Mype</h2>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label htmlFor="name" className="block font-medium text-sm">Nombre</label>
            <input
              id="name"
              type="text"
              value={data.name}
              onChange={(e) => setData('name', e.target.value)}
              className="w-full border border-gray-300 rounded px-3 py-2 mt-1"
              required
            />
            {errors.name && <div className="text-red-600 text-sm mt-1">{errors.name}</div>}
          </div>

          <div>
            <label htmlFor="email" className="block font-medium text-sm">Correo Electrónico</label>
            <input
              id="email"
              type="email"
              value={data.email}
              onChange={(e) => setData('email', e.target.value)}
              className="w-full border border-gray-300 rounded px-3 py-2 mt-1"
              required
            />
            {errors.email && <div className="text-red-600 text-sm mt-1">{errors.email}</div>}
          </div>

          <div>
            <label htmlFor="password" className="block font-medium text-sm">Contraseña</label>
            <input
              id="password"
              type="password"
              value={data.password}
              onChange={(e) => setData('password', e.target.value)}
              className="w-full border border-gray-300 rounded px-3 py-2 mt-1"
              required
            />
            {errors.password && <div className="text-red-600 text-sm mt-1">{errors.password}</div>}
          </div>

          <div>
            <label htmlFor="password_confirmation" className="block font-medium text-sm">Confirmar Contraseña</label>
            <input
              id="password_confirmation"
              type="password"
              value={data.password_confirmation}
              onChange={(e) => setData('password_confirmation', e.target.value)}
              className="w-full border border-gray-300 rounded px-3 py-2 mt-1"
              required
            />
            {errors.password_confirmation && (
              <div className="text-red-600 text-sm mt-1">{errors.password_confirmation}</div>
            )}
          </div>

          <div>
            <label htmlFor="phone_number" className="block font-medium text-sm">Teléfono</label>
            <input
              id="phone_number"
              type="text"
              value={data.phone_number}
              onChange={(e) => setData('phone_number', e.target.value)}
              className="w-full border border-gray-300 rounded px-3 py-2 mt-1"
            />
            {errors.phone_number && <div className="text-red-600 text-sm mt-1">{errors.phone_number}</div>}
          </div>

          <div>
            <label htmlFor="mype_address" className="block font-medium text-sm">Dirección</label>
            <input
              id="mype_address"
              type="text"
              value={data.mype_address}
              onChange={(e) => setData('mype_address', e.target.value)}
              className="w-full border border-gray-300 rounded px-3 py-2 mt-1"
              required
            />
            {errors.mype_address && <div className="text-red-600 text-sm mt-1">{errors.mype_address}</div>}
          </div>

          <div>
            <label htmlFor="mype_description" className="block font-medium text-sm">Descripción</label>
            <textarea
              id="mype_description"
              value={data.mype_description}
              onChange={(e) => setData('mype_description', e.target.value)}
              className="w-full border border-gray-300 rounded px-3 py-2 mt-1"
            />
            {errors.mype_description && <div className="text-red-600 text-sm mt-1">{errors.mype_description}</div>}
          </div>

          <button
            type="submit"
            disabled={processing}
            className="bg-blue-600 text-white w-full py-2 rounded hover:bg-blue-700 transition"
          >
            Registrar
          </button>
        </form>
      </div>
    </div>
  );
}