import React, { FormEvent } from 'react';
import { usePage, useForm, Link } from '@inertiajs/react';
import Layout from '@/components/MainLayout';

interface User { name: string }
interface Review { id: number; user?: User; rating: number; comment: string }
interface Product { id: number; product_name: string; pivot: { custom_price: number; stock: number; product_rate?: number } }
interface Mype { id: number; name: string; products: Product[]; reviews: Review[] }

interface Props { mype: Mype }

export default function MypeProfile({ mype }: Props) {
  const { auth } = usePage().props as { auth?: { user?: User } };
  const { data, setData, post, processing, errors } = useForm({ rating: 5, comment: '' });
  const hasCommented = auth?.user
    ? mype.reviews.some(r => r.user?.name === auth.user!.name)
    : false;

  function handleSubmit(e: FormEvent) {
    e.preventDefault();
    post(route('mypes.review', mype.id));
  }

  return (
    <Layout>
      <div className="max-w-3xl mx-auto py-8 space-y-8">
        {/* Encabezado */}
        <h1 className="text-4xl font-bold text-center">{mype.name}</h1>

        {/* Productos */}
        <section className="bg-white p-6 rounded-lg shadow">
          <h2 className="text-2xl font-semibold mb-4">Productos</h2>
          <ul className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {mype.products.map(product => (
              <li key={product.id} className="bg-gray-50 p-4 rounded-lg hover:shadow-md transition">
              <Link href={route('products.show', product.id)} className="block">
                <p className="font-medium text-lg">{product.product_name}</p>
                <p className="text-gray-600">
                  Precio: <span className="font-semibold">${product.pivot.custom_price}</span>
                </p>
              </Link>
            </li>
            ))}
          </ul>
        </section>

        {/* Comentarios existentes */}
        <section className="bg-white p-6 rounded-lg shadow">
          <h2 className="text-2xl font-semibold mb-4">Comentarios</h2>
          <div className="space-y-4">
            {mype.reviews.map(review => (
              <div key={review.id} className="border-b pb-3">
                <div className="flex justify-between items-center mb-1">
                  <strong className="text-gray-800">{review.user?.name ?? 'Anónimo'}</strong>
                  <span className="text-yellow-500">★ {review.rating}/5</span>
                </div>
                <p className="text-gray-700">{review.comment}</p>
              </div>
            ))}
            {mype.reviews.length === 0 && <p className="text-gray-600">No hay comentarios aún.</p>}
          </div>
        </section>

        {/* Formulario de nueva reseña */}
        <section className="bg-white p-6 rounded-lg shadow">
          {auth?.user ? (
            hasCommented ? (
              <p className="text-gray-600 italic">Ya dejaste tu reseña.</p>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                <h3 className="text-xl font-medium">Deja tu calificación</h3>

                <div>
                  <label className="block mb-1">Calificación</label>
                  <select
                    value={data.rating}
                    onChange={e => setData('rating', Number(e.target.value))}
                    className="border rounded px-3 py-2 w-full"
                  >
                    {[5,4,3,2,1].map(n => (
                      <option key={n} value={n}>{n}</option>
                    ))}
                  </select>
                  {errors.rating && <p className="text-red-500 text-sm mt-1">{errors.rating}</p>}
                </div>

                <div>
                  <label className="block mb-1">Comentario</label>
                  <textarea
                    value={data.comment}
                    onChange={e => setData('comment', e.target.value)}
                    className="border rounded px-3 py-2 w-full"
                    rows={4}
                  />
                  {errors.comment && <p className="text-red-500 text-sm mt-1">{errors.comment}</p>}
                </div>

                <button
                  type="submit"
                  disabled={processing}
                  className="bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700 transition"
                >
                  Enviar
                </button>
              </form>
            )
          ) : (
            <p className="text-gray-600 italic">Inicia sesión para dejar un comentario.</p>
          )}
        </section>
      </div>
    </Layout>
  );
}
