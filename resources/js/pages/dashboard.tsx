import { PlaceholderPattern } from '@/components/ui/placeholder-pattern';
import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem } from '@/types';
import { Head, usePage } from '@inertiajs/react';
import AlertaStock from '@/components/AlertaStock';
import { useEffect, useState } from 'react';
import axios from 'axios';
import { Product } from '@/types/index';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Dashboard',
        href: '/dashboard',
    },
];

export default function Dashboard() {
    const { props } = usePage<{ auth: { user: { id: number } } }>();
    const mypeId = props.auth.user?.id;

    const [productosBajoStock, setProductosBajoStock] = useState<Product[]>([]);
    const [loading, setLoading] = useState<boolean>(false);
    const [error, setError] = useState<string | null>(null);

    // Función para obtener productos con bajo stock
    const fetchProductosBajoStock = () => {
        if (mypeId) {
            setLoading(true);
            axios
                .get(`/mype/${mypeId}/bajo-stock`)
                .then((res) => {
                    setProductosBajoStock(res.data);
                    setLoading(false);
                })
                .catch((err) => {
                    console.error(err);
                    setError('Error al obtener productos con bajo stock');
                    setLoading(false);
                });
        }
    };

    useEffect(() => {
        fetchProductosBajoStock();
    }, [mypeId]);

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Dashboard" />
            <div className="flex h-full flex-1 flex-col gap-4 rounded-xl p-4">
                {/* Indicadores de carga y error */}
                {loading && <div>Loading...</div>}
                {error && <div className="text-red-500">{error}</div>}

                {/* Mostrar la alerta de productos con bajo stock */}
                {productosBajoStock.length > 0 && (
                    <AlertaStock productos={productosBajoStock} />
                )}

                {/* Grilla de componentes */}
                <div className="grid auto-rows-min gap-4 md:grid-cols-3">
                    <div className="border-sidebar-border/70 dark:border-sidebar-border relative aspect-video overflow-hidden rounded-xl border">
                        <PlaceholderPattern className="absolute inset-0 size-full stroke-neutral-900/20 dark:stroke-neutral-100/20" />
                    </div>
                    <div className="border-sidebar-border/70 dark:border-sidebar-border relative aspect-video overflow-hidden rounded-xl border">
                        <PlaceholderPattern className="absolute inset-0 size-full stroke-neutral-900/20 dark:stroke-neutral-100/20" />
                    </div>
                    <div className="border-sidebar-border/70 dark:border-sidebar-border relative aspect-video overflow-hidden rounded-xl border">
                        <PlaceholderPattern className="absolute inset-0 size-full stroke-neutral-900/20 dark:stroke-neutral-100/20" />
                    </div>
                </div>

                {/* Sección inferior de la página */}
                <div className="border-sidebar-border/70 dark:border-sidebar-border relative min-h-[100vh] flex-1 overflow-hidden rounded-xl border md:min-h-min">
                    <PlaceholderPattern className="absolute inset-0 size-full stroke-neutral-900/20 dark:stroke-neutral-100/20" />
                </div>
            </div>
        </AppLayout>
    );
}