import React from 'react';
import { usePage } from '@inertiajs/react';
import { Link } from '@inertiajs/react';

interface Mype {
  id: number;
  name: string;
}

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
              </Link>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
