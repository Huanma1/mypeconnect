import React from 'react';
import { useForm } from '@inertiajs/react';

interface LoginModalProps {
  onClose: () => void;
}

export default function LoginModal({ onClose }: LoginModalProps) {
  const { data, setData, post, processing, errors } = useForm({
    email: '',
    password: '',
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    post('/mype/login', {
      onSuccess: () => onClose(),
    });
  };

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50">
      <div className="bg-white rounded-lg p-6 w-96 relative shadow-xl">
        <button
          onClick={onClose}
          className="absolute top-2 right-3 text-gray-600 hover:text-black text-2xl font-bold"
        >
          &times;
        </button>

        <h2 className="text-2xl font-semibold mb-4">Iniciar Sesión</h2>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label htmlFor="email" className="block font-medium text-sm">
              Correo Electrónico:
            </label>
            <input
              type="email"
              id="email"
              className="w-full border border-gray-300 rounded px-3 py-2 mt-1"
              value={data.email}
              onChange={(e) => setData('email', e.target.value)}
              required
            />
            {errors.email && <div className="text-red-600 text-sm mt-1">{errors.email}</div>}
          </div>

          <div>
            <label htmlFor="password" className="block font-medium text-sm">
              Contraseña:
            </label>
            <input
              type="password"
              id="password"
              className="w-full border border-gray-300 rounded px-3 py-2 mt-1"
              value={data.password}
              onChange={(e) => setData('password', e.target.value)}
              required
            />
            {errors.password && <div className="text-red-600 text-sm mt-1">{errors.password}</div>}
          </div>

          <button
            type="submit"
            disabled={processing}
            className="bg-blue-600 text-white w-full py-2 rounded hover:bg-blue-700 transition"
          >
            Iniciar Sesión
          </button>
        </form>
      </div>
    </div>
  );
}