import Layout from '@/components/MainLayout';
import { Link, useForm, usePage } from '@inertiajs/react';
import { FormEvent } from 'react';

interface User {
    name: string;
}
interface Review {
    id: number;
    user?: User;
    rating: number;
    comment: string;
}
interface Product {
    id: number;
    product_name: string;
    pivot: { custom_price: number; stock: number; product_rate?: number };
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
    const { auth } = usePage().props as { auth?: { user?: User } };
    const { data, setData, post, processing, errors } = useForm({ rating: 5, comment: '' });
    const hasCommented = auth?.user ? mype.reviews.some((r) => r.user?.name === auth.user!.name) : false;

    function handleSubmit(e: FormEvent) {
        e.preventDefault();
        post(route('mypes.review', mype.id));
    }

    return (
        <Layout>
            <div className="mx-auto max-w-3xl space-y-8 py-8">
                {/* Encabezado */}
                <h1 className="text-center text-4xl font-bold">{mype.name}</h1>

                {/* Productos */}
                <section className="rounded-lg bg-white p-6 shadow">
                    <h2 className="mb-4 text-2xl font-semibold">Productos</h2>
                    <ul className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                        {mype.products.map((product) => (
                            <li key={product.id} className="rounded-lg bg-gray-50 p-4 transition hover:shadow-md">
                                <Link href={route('products.show', product.id)} className="block">
                                    <p className="text-lg font-medium">{product.product_name}</p>
                                    <p className="text-gray-600">
                                        Precio: <span className="font-semibold">${product.pivot.custom_price}</span>
                                    </p>
                                </Link>
                            </li>
                        ))}
                    </ul>
                </section>

                {/* Comentarios existentes */}
                <section className="rounded-lg bg-white p-6 shadow">
                    <h2 className="mb-4 text-2xl font-semibold">Comentarios</h2>
                    <div className="space-y-4">
                        {mype.reviews.map((review) => (
                            <div key={review.id} className="border-b pb-3">
                                <div className="mb-1 flex items-center justify-between">
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
                <section className="rounded-lg bg-white p-6 shadow">
                    {auth?.user ? (
                        hasCommented ? (
                            <p className="text-gray-600 italic">Ya dejaste tu reseña.</p>
                        ) : (
                            <form onSubmit={handleSubmit} className="space-y-4">
                                <h3 className="text-xl font-medium">Deja tu calificación</h3>

                                <div>
                                    <label className="mb-1 block">Calificación</label>
                                    <select
                                        value={data.rating}
                                        onChange={(e) => setData('rating', Number(e.target.value))}
                                        className="w-full rounded border px-3 py-2"
                                    >
                                        {[5, 4, 3, 2, 1].map((n) => (
                                            <option key={n} value={n}>
                                                {n}
                                            </option>
                                        ))}
                                    </select>
                                    {errors.rating && <p className="mt-1 text-sm text-red-500">{errors.rating}</p>}
                                </div>

                                <div>
                                    <label className="mb-1 block">Comentario</label>
                                    <textarea
                                        value={data.comment}
                                        onChange={(e) => setData('comment', e.target.value)}
                                        className="w-full rounded border px-3 py-2"
                                        rows={4}
                                    />
                                    {errors.comment && <p className="mt-1 text-sm text-red-500">{errors.comment}</p>}
                                </div>

                                <button
                                    type="submit"
                                    disabled={processing}
                                    className="rounded bg-blue-600 px-6 py-2 text-white transition hover:bg-blue-700"
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
