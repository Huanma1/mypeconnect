import { Link, usePage, router } from '@inertiajs/react';
import React, { useState } from 'react';
import type { Mype, User } from '@/types';
import LoginModal from '@/pages/Login';
import RegisterModal from '@/pages/Register';
import UserRegister from '@/pages/UserRegister';
import Loading from '@/components/Loading';
import CategoryDrawer from '@/components/ui/Categorias';
import Cart from '@/components/Cart';

interface Props {
  children: React.ReactNode;
  categories?: string[];
}

export default function MainLayout({ children, categories = [] }: Props) {
  const { auth, filters } = usePage<{
    auth: { 
      user: Mype | User | null 
      type: 'mype' | 'user' | null
    };
    filters?: {
      category?: string;
      min_price?: string;
      max_price?: string;
    };
  }>().props;

  const [showLogin, setShowLogin] = useState(false);
  const [showRegister, setShowRegister] = useState(false);
  const [loginType, setLoginType] = useState<'user' | 'mype' | null>(null);
  const [registerType, setRegisterType] = useState<'user' | 'mype' | null>(null);
  const [showCart, setShowCart] = useState(false);
  const [showCategoriesDrawer, setShowCategoriesDrawer] = useState(false);

  const handleSelectCategory = (cat: string) => {
    router.get(
      '/products',
      {
        category: cat,
        min_price: filters?.min_price ?? '',
        max_price: filters?.max_price ?? '',
      }, 
      {
        preserveState: false,
        preserveScroll: true,
      }
    );
  };

  const handleLoginClick = () => {
    setLoginType(null);
    setShowLogin(true);
  };

  const handleRegisterClick = () => {
    setRegisterType(null);
    setShowRegister(true);
  };

  return (
    <Loading>
      {showLogin && 
      (loginType === null ? (
          <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50">
            <div className="bg-white rounded-lg p-6 w-96 relative shadow-xl">
              <button
                onClick={() => setShowLogin(false)}
                className="absolute top-2 right-3 text-gray-600 hover:text-black text-2xl font-bold"
              >
                &times;
              </button>
              <h2 className="text-2xl font-semibold mb-4">Selecciona el tipo de inicio de sesión</h2>
              <div className="flex justify-center gap-6">
                <button
                  onClick={() => setLoginType('user')}
                  className="bg-blue-500 text-white px-6 py-3 rounded hover:bg-blue-600"
                >
                  Soy Cliente
                </button>
                <button
                  onClick={() => setLoginType('mype')}
                  className="bg-green-500 text-white px-6 py-3 rounded hover:bg-green-600"
                >
                  Soy MYPE
                </button>
              </div>
            </div>
          </div>
        ) : (
          <LoginModal onClose={() => setShowLogin(false)} userType={loginType!} />
        ))}

      {showRegister &&
        (registerType === null ? (
          <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50">
            <div className="bg-white rounded-lg p-6 w-96 relative shadow-xl">
              <button
                onClick={() => setShowRegister(false)}
                className="absolute top-2 right-3 text-gray-600 hover:text-black text-2xl font-bold"
              >
                &times;
              </button>
              <h2 className="text-2xl font-semibold mb-4">Selecciona el tipo de registro</h2>
              <div className="flex justify-center gap-6">
                <button
                  onClick={() => setRegisterType('user')}
                  className="bg-blue-500 text-white px-6 py-3 rounded hover:bg-blue-600"
                >
                  Registrarme como Cliente
                </button>
                <button
                  onClick={() => setRegisterType('mype')}
                  className="bg-green-500 text-white px-6 py-3 rounded hover:bg-green-600"
                >
                  Registrarme como MYPE
                </button>
              </div>
            </div>
          </div>
        ) : registerType === 'user' ? (
          <UserRegister onClose={() => setShowRegister(false)} />
        ) : (
          <RegisterModal onClose={() => setShowRegister(false)} />
        ))}

        {showCategoriesDrawer && (
        <CategoryDrawer
          isOpen={showCategoriesDrawer}
          onClose={() => setShowCategoriesDrawer(false)}
          categories={categories}
          onSelectCategory={(cat) => {
            handleSelectCategory(cat);
            setShowCategoriesDrawer(false);
          }}
        />
      )}

      {showCart && <Cart onClose={() => setShowCart(false)} />}

      <div style={styles.container}>
        <header style={styles.header}>
          <div style={styles.headerContent}>
            {/* Lado izquierdo: logo + categorías */}
            <div style={styles.leftSection}>
              <Link href={route('home')} style={{ display: 'inline-block' }}>
                <img src="/logo completo.png" alt="Mype Connect" style={styles.logo} />
              </Link>
            
              <button
                onClick={() => setShowCategoriesDrawer(true)}
                style={styles.outlinedButton}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={2}
                  width={20}
                  height={20}
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M4 6h16M4 12h16M4 18h16"
                  />
                </svg>
                <span style={{ marginLeft: 6 }}>Categorías</span>
              </button>

              <div>
                <Link href={route('mypes.index')}className="bg-blue-600 text-white px-4 py-2 rounded">
                  Ver todas las Mypes
                </Link>
              </div>
            </div>

            {/* Lado derecho: navegación + carrito */}
            <div style={styles.rightSection}>
              <nav style={styles.nav}>
                {auth.user ? (
                  <>
                    <span style={styles.navText}>
                      Bienvenido, {auth.user.name || 'Usuario desconocido'} ({auth.type})
                    </span>
                    <Link href={route('dashboard')} style={styles.link}>
                      Dashboard
                    </Link>
                  </>
                ) : (
                  <>
                    <button onClick={handleLoginClick} style={styles.linkButton}>
                      Log in
                    </button>
                    <button onClick={handleRegisterClick} style={styles.linkButton}>
                      Register
                    </button>
                  </>
                )}
              </nav>

              <button
                onClick={() => setShowCart(true)}
                style={styles.outlinedButton}
              >
                🛒 <span style={{ marginLeft: 6 }}>Ver Carrito</span>
              </button>
            </div>
          </div>
        </header>

        <main style={styles.main}>{children}</main>
      </div>
    </Loading>
  );
}

const styles: { [key: string]: React.CSSProperties } = {
  container: {
    minHeight: '100vh',
    backgroundColor: '#f3f4f6',
    color: '#111827',
  },
  header: {
    padding: '1rem',
    backgroundColor: '#111827',
    color: '#fff',
  },
  headerContent: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    flexWrap: 'wrap',
    gap: '1rem',
  },
  leftSection: {
    display: 'flex',
    alignItems: 'center',
    gap: '1rem',
  },
  rightSection: {
    display: 'flex',
    alignItems: 'center',
    gap: '1rem',
  },
  logo: {
    height: 40,
    transform: 'scale(1.5)',
  },
  nav: {
    display: 'flex',
    gap: '1rem',
    alignItems: 'center',
  },
  navText: {
    fontWeight: 500,
  },
  link: {
    color: '#fff',
    textDecoration: 'underline',
  },
  linkButton: {
    background: 'none',
    border: 'none',
    color: '#fff',
    cursor: 'pointer',
    textDecoration: 'underline',
    fontSize: '1rem',
  },
  outlinedButton: {
    display: 'flex',
    alignItems: 'center',
    border: '1px solid white',
    borderRadius: '0.375rem',
    padding: '0.35rem 0.75rem',
    background: 'transparent',
    color: 'white',
    fontSize: '0.95rem',
    cursor: 'pointer',
  },
  main: {
    padding: '1.5rem',
  },
};