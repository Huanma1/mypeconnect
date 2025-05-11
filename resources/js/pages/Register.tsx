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
    <div style={{
      position: 'fixed',
      inset: '0',
      backgroundColor: 'rgba(0, 0, 0, 0.5)',
      backdropFilter: 'blur(4px)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      zIndex: 1000,
    }}>
      <div style={{
        backgroundColor: '#fff',
        borderRadius: '8px',
        padding: '2rem',
        width: '100%',
        maxWidth: '500px',
        position: 'relative',
        boxShadow: '0 10px 25px rgba(0, 0, 0, 0.1)',
      }}>
        <button
          onClick={onClose}
          style={{
            position: 'absolute',
            top: '10px',
            right: '15px',
            fontSize: '24px',
            border: 'none',
            background: 'none',
            cursor: 'pointer',
          }}
        >
          &times;
        </button>

        <h2 style={{ fontSize: '1.5rem', marginBottom: '1rem' }}>Registrar Mype</h2>

        <form onSubmit={handleSubmit}>
          <input
            type="text"
            placeholder="Nombre"
            required
            value={data.name}
            onChange={(e) => setData('name', e.target.value)}
            style={inputStyle}
          />

          <input
            type="email"
            placeholder="Correo Electrónico"
            required
            value={data.email}
            onChange={(e) => setData('email', e.target.value)}
            style={inputStyle}
          />

          <input
            type="password"
            placeholder="Contraseña"
            required
            value={data.password}
            onChange={(e) => setData('password', e.target.value)}
            style={inputStyle}
          />

          <input
            type="password"
            placeholder="Confirmar Contraseña"
            required
            value={data.password_confirmation}
            onChange={(e) => setData('password_confirmation', e.target.value)}
            style={inputStyle}
          />

          <input
            type="text"
            placeholder="Teléfono"
            value={data.phone_number}
            onChange={(e) => setData('phone_number', e.target.value)}
            style={inputStyle}
          />

          <input
            type="text"
            placeholder="Dirección"
            required
            value={data.mype_address}
            onChange={(e) => setData('mype_address', e.target.value)}
            style={inputStyle}
          />

          <textarea
            placeholder="Descripción"
            value={data.mype_description}
            onChange={(e) => setData('mype_description', e.target.value)}
            style={{ ...inputStyle, height: '80px', resize: 'none' }}
          />

          <button
            type="submit"
            disabled={processing}
            style={{
              width: '100%',
              padding: '10px',
              backgroundColor: '#007bff',
              color: 'white',
              border: 'none',
              borderRadius: '4px',
              cursor: 'pointer',
              marginTop: '1rem',
            }}
          >
            Registrar
          </button>
        </form>

        {Object.values(errors).length > 0 && (
          <div style={{ marginTop: '1rem', color: 'red' }}>
            <ul>
              {Object.values(errors).map((error, i) => (
                <li key={i}>{error}</li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </div>
  );
}

const inputStyle: React.CSSProperties = {
  display: 'block',
  width: '100%',
  padding: '10px',
  marginBottom: '1rem',
  borderRadius: '4px',
  border: '1px solid #ccc',
};