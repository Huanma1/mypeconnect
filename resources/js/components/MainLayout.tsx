import { Link, usePage } from '@inertiajs/react';
import React, { useState } from 'react';
import type { Mype } from '@/types';
import LoginModal from '@/pages/Login';
import RegisterModal from '@/pages/Register';

export default function MainLayout({ children }: { children: React.ReactNode }) {
  const { auth } = usePage<{ auth: { user: Mype | null } }>().props;
  const [showLogin, setShowLogin] = useState(false);
  const [showRegister, setShowRegister] = useState(false);

  return (
    <>
      {showLogin && <LoginModal onClose={() => setShowLogin(false)} />}
      {showRegister && <RegisterModal onClose={() => setShowRegister(false)} />}

      <div style={styles.container}>
        <header style={styles.header}>
          <div style={styles.headerContent}>
            <Link href={route('home')} style={{ display: 'inline-block' }}>
              <img src="/logo completo.png" alt="Mype Connect" style={styles.logo} />
            </Link>

            <nav style={styles.nav}>
              {auth?.user ? (
                <>
                  <span style={styles.navText}>Bienvenido, {auth.user.name}</span>
                  <Link href={route('dashboard')} style={styles.link}>Dashboard</Link>
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
            </nav>
          </div>
        </header>

        <main style={styles.main}>{children}</main>
      </div>
    </>
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
};
