import React, { useEffect, useState } from 'react';

export default function Loading({ children }: { children: React.ReactNode }) {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 1500);
    return () => clearTimeout(timer);
  }, []);

  if (loading) {
    return (
      <div style={styles.loaderContainer}>
        <img src="/favicon.png" alt="Cargando..." style={styles.logo} />
        <style>{`
          @keyframes pulse {
            0%, 100% {
              transform: scale(1);
              opacity: 0.8;
            }
            50% {
              transform: scale(1.15);
              opacity: 1;
            }
          }
        `}</style>
      </div>
    );
  }

  return <>{children}</>;
}

const styles = {
  loaderContainer: {
    position: 'fixed' as const,
    inset: 0,
    backgroundColor: '#fff',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    zIndex: 9999,
  },
  logo: {
    width: 120,
    animation: 'pulse 1.5s ease-in-out infinite',
  },
};