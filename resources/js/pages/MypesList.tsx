import React from 'react';
import { usePage } from '@inertiajs/react';
import { Link } from '@inertiajs/react';
import { Mype } from '@/types';

interface Props {
  mypes: Mype[];
}

export default function MypesList({ mypes }: Props) {
  return (
    <div>
      <h1>Lista de Mypes</h1>
      {mypes.length === 0 ? (
        <p>No hay mypes disponibles.</p>
      ) : (
        <ul>
          {mypes.map((mype) => (
            <li key={mype.id}>
              <Link href={route('mypes.show', mype.id)} className="text-blue-600 hover:underline">
                {mype.name}
                <p className="text-gray-700">{mype.mype_description}</p>
              </Link>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
