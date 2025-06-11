import React from 'react';
import { useForm, router } from '@inertiajs/react';

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
        router.visit('/');   // Redirige a la página inicial
      },
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
        <h2 className="text-2xl font-semibold mb-4">Registro - Cliente</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Campo: Nombre */}
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

          {/* Campo: Correo Electrónico */}
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

          {/* Campo: Contraseña */}
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

          {/* Campo: Confirmar Contraseña */}
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

          {/* Botón de Enviar */}
          <button
            type="submit"
            disabled={processing}
            className="bg-blue-600 text-white w-full py-2 rounded hover:bg-blue-700 transition"
          >
            Registrarme
          </button>
        </form>
      </div>
    </div>
  );
}