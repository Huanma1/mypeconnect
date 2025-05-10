import { Link, usePage } from '@inertiajs/react';
import React, { useState } from 'react';
import type { Mype } from '@/types';
import Login from '@/pages/Login'; // Asegúrate de importar correctamente

export default function MainLayout({ children }: { children: React.ReactNode }) {
  const { auth } = usePage<{ auth: { user: Mype | null } }>().props;
  const [showLogin, setShowLogin] = useState(false);

  return (
    <div className="min-h-screen bg-gray-100 text-gray-900">
      <header className="p-4 bg-gray-900 text-white">
        <div className="flex justify-between items-center">
          <Link href={route('home')} className="text-white hover:underline">
            <img src="/logo completo.png" alt="Mype Connect" className="h-10 w-auto scale-150" />
          </Link>

          <nav className="space-x-4">
            {auth?.user ? (
              <>
                <span className="text-white font-medium">Hola, {auth.user.name}</span>
                <Link href={route('dashboard')} className="text-white hover:underline">
                  Dashboard
                </Link>
              </>
            ) : (
              <>
                <button onClick={() => setShowLogin(true)} className="text-white hover:underline">
                  Log in
                </button>
                <Link href={route('mypes.register')} className="text-white hover:underline">
                  Register
                </Link>
              </>
            )}
          </nav>
        </div>
      </header>

      <main className="p-6">{children}</main>

      {showLogin && <Login onClose={() => setShowLogin(false)} />}
    </div>
  );
}
