import { Link, usePage, router } from '@inertiajs/react';
import React, { useState } from 'react';
import type { Mype } from '@/types';
import LoginModal from '@/pages/Login';
import RegisterModal from '@/pages/Register';
import Loading from '@/components/Loading';
import CategoryDrawer from '@/components/ui/Categorias';
import Cart from '@/components/Cart';

interface Props {
  children: React.ReactNode;
  categories?: string[];
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

  return (
    <Loading>
      {showLogin && <LoginModal onClose={() => setShowLogin(false)} />}
      {showRegister && <RegisterModal onClose={() => setShowRegister(false)} />}
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
            {/* Logo */}
            <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
              <Link href={route('home')} style={{ display: 'inline-block' }}>
                <img src="/logo completo.png" alt="Mype Connect" style={styles.logo} />
              </Link>

              {/* Botón Categorías con borde */}
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
            </div>

            {/* Navegación y botón carrito */}
            <nav style={styles.nav}>
              {auth?.user ? (
                <>
                  <span style={styles.navText}>Bienvenido, {auth.user.name}</span>
                  <Link href={route('dashboard')} style={styles.link}>
                    Dashboard
                  </Link>
                </>
              ) : (
                <>
                  <button onClick={() => setShowLogin(true)} style={styles.linkButton}>
                    Log in
                  </button>
                  <button onClick={() => setShowRegister(true)} style={styles.linkButton}>
                    Register
                  </button>
                </>
              )}

              {/* Botón Ver Carrito con borde */}
              <button
                onClick={() => setShowCart(true)}
                style={styles.outlinedButton}
              >
                🛒 <span style={{ marginLeft: 6 }}>Ver Carrito</span>
              </button>
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