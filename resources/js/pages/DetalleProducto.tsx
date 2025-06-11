import { Product, User } from '@/types';
import { Link, useForm, usePage } from '@inertiajs/react';
import type { PageProps as InertiaPageProps } from '@inertiajs/core';
import Layout from '@/components/MainLayout';
import { useState } from 'react';
import { useCart } from '@/context/CartContext';

interface Props {
  product: Product & {
    average_rating?: number;
    comments: {
      id: number;
      comment: string;
      rating: number;
      user: { id: number; name: string };
    }[];
    mypes?: {
      id: number;
      name: string;
      pivot?: { custom_price?: number; product_rate?: number };
    }[];
  };
}

interface PageProps extends InertiaPageProps {
  auth: { user: User };
}

export default function DetalleProducto({ product }: Props) {
  const auth = usePage<PageProps>().props.auth || { user: null };
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('asc');
  const { addToCart } = useCart();
  const { data, setData, post, reset, processing } = useForm({
    comment: '',
    rating: 5,
    product_id: product.id,
  });

  const handleAddComment = (e: React.FormEvent) => {
    e.preventDefault();
    post(route('comments.store'), { onSuccess: () => reset('comment') });
  };

  if (!product) {
    return (
      <Layout>
        <div className="text-center py-8">No se encontraron detalles del producto.</div>
      </Layout>
    );
  }

  const sortedMypes = [...(product.mypes || [])].sort((a, b) => {
    const priceA = a.pivot?.custom_price || 0;
    const priceB = b.pivot?.custom_price || 0;
    return sortOrder === 'asc' ? priceA - priceB : priceB - priceA;
  });

  const hasCommented = auth.user
    ? product.comments.some(cmt => cmt.user.id === auth.user?.id)
    : false;

  return (
    <Layout>
      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Detalles y comentarios */}
          <div className="md:col-span-2 space-y-6">
            {/* Información del producto */}
            <div className="bg-white p-6 rounded-lg shadow">
              <h1 className="text-3xl font-bold mb-2">{product.product_name}</h1>
              <p className="text-gray-700 mb-4">{product.product_description}</p>
              <p className="text-sm text-gray-500">Categoría: {product.category || 'Sin categoría'}</p>
              {product.average_rating !== undefined && (
                <div className="mt-4 text-lg font-semibold text-yellow-600">
                  Calificación: {product.average_rating} ⭐
                </div>
              )}
            </div>

            {/* Comentarios */}
            <div className="bg-white p-6 rounded-lg shadow">
              <h2 className="text-2xl font-semibold mb-4">Comentarios sobre el producto</h2>
              {product.comments.length > 0 ? (
                <ul className="space-y-4">
                  {product.comments.map(cmt => (
                    <li key={cmt.id} className="border-b pb-2">
                      <p>
                        <strong>{cmt.user.name}</strong>: {cmt.comment}
                      </p>
                      <p className="text-yellow-600">Calificación: {cmt.rating} ⭐</p>
                    </li>
                  ))}
                </ul>
              ) : (
                <p className="text-gray-600">No hay comentarios aún.</p>
              )}

              {!auth.user ? (
                <div className="mt-6 bg-yellow-50 border-l-4 border-yellow-400 p-4 rounded">
                  <div className="flex items-center">
                    <svg
                      className="h-5 w-5 text-yellow-400 mr-2"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                    >
                      <path
                        fillRule="evenodd"
                        d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z"
                        clipRule="evenodd"
                      />
                    </svg>
                    <p className="text-sm text-yellow-700">
                      <span className="font-medium">Debes iniciar sesión</span> para comentar y calificar productos.
                    </p>
                  </div>
                </div>
              ) : hasCommented ? (
                <div className="mt-6 bg-yellow-100 text-yellow-800 p-4 rounded">
                  Ya has comentado este producto.
                </div>
              ) : (
                <form onSubmit={handleAddComment} className="mt-6 space-y-4">
                  <textarea
                    className="w-full border rounded p-2"
                    placeholder="Escribe tu comentario aquí..."
                    value={data.comment}
                    onChange={e => setData('comment', e.target.value)}
                    required
                  />
                  <div className="flex items-center space-x-2">
                    <label>Calificación:</label>
                    <select
                      value={data.rating}
                      onChange={e => setData('rating', parseInt(e.target.value))}
                      className="border p-1 rounded"
                    >
                      {[1, 2, 3, 4, 5].map(star => (
                        <option key={star} value={star}>
                          {star} estrella{star > 1 ? 's' : ''}
                        </option>
                      ))}
                    </select>
                  </div>
                  <button
                    type="submit"
                    disabled={processing}
                    className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition disabled:opacity-50"
                  >
                    Enviar comentario
                  </button>
                </form>
              )}
            </div>

            {/* Volver */}
            <div>
              <Link
                href={route('home')}
                className="inline-block text-blue-600 hover:underline"
              >
                &larr; Volver a Inicio
              </Link>
            </div>
          </div>

          {/* Tiendas */}
          <div className="space-y-6">
            <div className="bg-white p-6 rounded-lg shadow">
              <h2 className="text-2xl font-semibold mb-4">Tiendas que venden este producto</h2>
              <div className="flex space-x-2 mb-4">
                <button
                  onClick={() => setSortOrder('asc')}
                  className={`px-4 py-2 rounded ${
                    sortOrder === 'asc'
                      ? 'bg-blue-600 text-white'
                      : 'bg-gray-200 text-gray-700'
                  }`}
                >
                  Precio: Menor a Mayor
                </button>
                <button
                  onClick={() => setSortOrder('desc')}
                  className={`px-4 py-2 rounded ${
                    sortOrder === 'desc'
                      ? 'bg-blue-600 text-white'
                      : 'bg-gray-200 text-gray-700'
                  }`}
                >
                  Precio: Mayor a Menor
                </button>
              </div>
              {sortedMypes.length > 0 ? (
                <ul className="space-y-4">
                  {sortedMypes.map(mype => (
                    <li key={mype.id} className="bg-white border rounded-lg p-4 shadow-sm">
                      <div className="flex justify-between items-center">
                        <span className="font-medium">{mype.name}</span>
                        <span className="text-yellow-600">
                          {mype.pivot?.product_rate ?? '-'} ⭐
                        </span>
                      </div>
                      <div className="mt-2 text-gray-700">
                        <p>Precio: ${mype.pivot?.custom_price ?? 'N/A'}</p>
                      </div>
                      <button
                        onClick={e => {
                          e.preventDefault();
                          addToCart({
                            id: product.id,
                            mypeId: mype.id,
                            name: product.product_name,
                            description: product.product_description,
                            price: mype.pivot?.custom_price || 0,
                            quantity: 1,
                            mypeName: mype.name,
                          });
                        }}
                        className="mt-4 bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition"
                      >
                        Agregar al carrito
                      </button>
                    </li>
                  ))}
                </ul>
              ) : (
                <p className="text-gray-600">No hay tiendas disponibles</p>
              )}
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
}
