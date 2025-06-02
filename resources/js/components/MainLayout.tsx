import { Link, usePage, router } from '@inertiajs/react';
import React, { useState } from 'react';
import type { Mype } from '@/types';
import LoginModal from '@/pages/Login';
import RegisterModal from '@/pages/Register';
import Loading from '@/components/Loading';

interface Props {
  children: React.ReactNode;
  categories?: string[]; // <- nueva prop
}

export default function MainLayout({ children, categories = [] }: Props) {
  const { auth, filters } = usePage<{
    auth: { user: Mype | null };
    filters?: {
      category?: string;
      min_price?: string;
      max_price?: string;
    };
  }>().props;

  const [showLogin, setShowLogin] = useState(false);
  const [showRegister, setShowRegister] = useState(false);
  const [loginType, setLoginType] = useState<'user' | 'mype' | null>(null); 

  const handleSelectCategory = (cat: string) => {
    router.get('/products', {
      category: cat,
      min_price: filters?.min_price ?? '',
      max_price: filters?.max_price ?? '',
    }, {
      preserveState: false,
      preserveScroll: true,
    });
  };

  const handleLoginClick = () => {
    setLoginType(null); 
    setShowLogin(true); 
  };

  return (
    <Loading>
      {showLogin && (
        loginType === null ? (
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
          <LoginModal
            onClose={() => setShowLogin(false)}
            userType={loginType!} 
          />
        )
      )}

      {showRegister && <RegisterModal onClose={() => setShowRegister(false)} />}

      <div style={styles.container}>
        <header style={styles.header}>
          <div style={styles.headerContent}>
            <Link href={route('home')} style={{ display: 'inline-block' }}>
              <img src="/logo completo.png" alt="Mype Connect" style={styles.logo} />
            </Link>

            <div style={styles.categories}>
              {categories.map((cat) => (
                <button
                  key={cat}
                  onClick={() => handleSelectCategory(cat)}
                  style={styles.categoryButton}
                >
                  {cat}
                </button>
              ))}
            </div>

            <nav style={styles.nav}>
              {auth?.user ? (
                <>
                  <span style={styles.navText}>Bienvenido, {auth.user.name}</span>
                  <Link href={route('dashboard')} style={styles.link}>Dashboard</Link>
                </>
              ) : (
                <>
                  <button onClick={handleLoginClick} style={styles.linkButton}>
                    Log in
                  </button>
                  <button onClick={() => setShowRegister(true)} style={styles.linkButton}>
                    Register
                  </button>
                </>
              )}
            </nav>
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
  },
  logo: {
    height: '40px',
    transform: 'scale(1.5)',
  },
  nav: {
    display: 'flex',
    gap: '1rem',
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
  main: {
    padding: '1.5rem',
  },
  categories: {
    display: 'flex',
    gap: '0.5rem',
    flexWrap: 'wrap',
    marginLeft: '2rem',
    marginRight: 'auto',
  },
  categoryButton: {
    background: 'transparent',
    border: '1px solid white',
    color: 'white',
    padding: '0.25rem 0.5rem',
    borderRadius: '5px',
    cursor: 'pointer',
    fontSize: '0.875rem',
  },
};