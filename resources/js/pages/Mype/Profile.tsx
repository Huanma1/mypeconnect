import React, { FormEvent } from 'react';
import { usePage, useForm } from '@inertiajs/react';

interface User {
  name: string;
}

interface Review {
  id: number;
  user?: User;
  product?: Product;
  rating: number;
  comment: string;
}

interface Product {
  id: number;
  product_name: string;
  pivot: {
    custom_price: number;
    stock: number;
    product_rate?: number;
  };
}

interface Mype {
  id: number;
  name: string;
  products: Product[];
  reviews: Review[];
}

interface Props {
  mype: Mype;
}

export default function MypeProfile({ mype }: Props) {
  const { auth } = (usePage().props as { auth?: { user?: User } }) || {};

  const { data, setData, post, processing, errors } = useForm({
    rating: 5,
    comment: '',
  });

  function handleSubmit(e: FormEvent) {
    e.preventDefault();
    post(route('mypes.review', mype.id));
  }

  return (
    <div className="max-w-3xl mx-auto py-8">
      <h1 className="text-3xl font-bold mb-2">{mype.name}</h1>

      <h2 className="text-xl font-semibold mt-6 mb-2">Productos</h2>
      <ul className="grid grid-cols-2 gap-4">
        {mype.products.map((product) => (
          <li key={product.id} className="border p-3 rounded">
            <p className="font-medium">{product.product_name}</p>
            <p>Precio: ${product.pivot.custom_price}</p>
          </li>
        ))}
      </ul>

      <h2 className="text-xl font-semibold mt-8 mb-2">Comentarios</h2>
      <div className="space-y-4">
        {mype.reviews.map((review) => (
          <div key={review.id} className="border p-3 rounded">
            <div className="flex justify-between items-center">
              <strong>{review.user?.name ?? 'Anónimo'}</strong>
              <span className="text-yellow-500">★ {review.rating}/5</span>
            </div>
            <p className="text-gray-700">{review.comment}</p>
          </div>
        ))}
      </div>

      {auth?.user ? (
        <form onSubmit={handleSubmit} className="mt-6 border-t pt-4">
          <h3 className="text-lg font-medium mb-2">Deja tu calificación</h3>

          <div className="mb-2">
            <label className="block">Calificación</label>
            <select
              value={data.rating}
              onChange={(e) => setData('rating', Number(e.target.value))}
              className="border rounded px-2 py-1"
            >
              {[5, 4, 3, 2, 1].map((n) => (
                <option key={n} value={n}>
                  {n}
                </option>
              ))}
            </select>
            {errors.rating && <p className="text-red-500 text-sm">{errors.rating}</p>}
          </div>

          <div className="mb-2">
            <label className="block">Comentario</label>
            <textarea
              value={data.comment}
              onChange={(e) => setData('comment', e.target.value)}
              className="border rounded px-2 py-1 w-full"
            />
            {errors.comment && <p className="text-red-500 text-sm">{errors.comment}</p>}
          </div>

          <button
            type="submit"
            disabled={processing}
            className="bg-blue-600 text-white px-4 py-2 rounded"
          >
            Enviar
          </button>
        </form>
      ) : (
        <p className="mt-6 text-gray-600 italic">Inicia sesión para dejar un comentario.</p>
      )}
    </div>
  );
}
