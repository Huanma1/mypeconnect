import React from 'react';
import { Link, usePage } from '@inertiajs/react';
import Layout from '@/components/MainLayout';
import { Mype } from '@/types';

interface Props {
  mypes: Mype[];
}

// Agregamos index signature para cumplir con la restricción de InertiaJS
type PageProps = { categories: string[] } & Record<string, any>;

export default function MypesList({ mypes }: Props) {
  // Extraemos categorías desde los props de la página
  const { categories } = usePage<PageProps>().props;

  return (
    <Layout categories={categories}>
      <div className="max-w-3xl mx-auto py-8 space-y-6">
        {/* Título */}
        <h1 className="text-3xl font-bold">Lista de Mypes</h1>

        {/* Contenido */}
        {mypes.length === 0 ? (
          <p className="text-gray-600 italic">No hay mypes disponibles.</p>
        ) : (
          <ul className="space-y-4">
            {mypes.map((mype) => (
              <li key={mype.id}>
                <Link
                  href={route('mypes.show', mype.id)}
                  className="block bg-white p-6 rounded-lg shadow hover:shadow-md transition"
                >
                  <h2 className="text-xl font-semibold text-gray-800">
                    {mype.name}
                  </h2>
                  {mype.mype_description && (
                    <p className="mt-2 text-gray-700">
                      {mype.mype_description}
                    </p>
                  )}
                </Link>
              </li>
            ))}
          </ul>
        )}
      </div>
    </Layout>
  );
}
