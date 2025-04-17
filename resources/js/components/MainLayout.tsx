import { Link, usePage } from '@inertiajs/react';
import React from 'react';


interface Props {
    children: React.ReactNode;
}

export default function MainLayout({ children }: Props) {
    const { auth } = usePage<{ auth: any }>().props;

    return (
        <div className="min-h-screen bg-gray-100 text-gray-900">
            {/* Encabezado */}
            <header className="p-4 bg-gray-900 text-white">
                <div className="flex justify-between items-center max-w-7xl mx-auto">
                    <Link href={route('home')} className="text-white hover:underline">
                        <h1 className="text-xl font-bold">Mype Connect</h1>
                    </Link>
                    
                    <nav className="space-x-4">
                        {auth?.user ? (
                            <Link href={route('dashboard')} className="text-white hover:underline">
                                Dashboard
                            </Link>
                        ) : (
                            <>
                                <Link href={route('mype.login')} className="text-white hover:underline">
                                    Log in
                                </Link>
                                <Link href={route('mypes.register')} className="text-white hover:underline">
                                    Register
                                </Link>
                            </>
                        )}
                    </nav>
                </div>
            </header>

            {/* Contenido principal */}
            <main className="p-6">{children}</main>
        </div>
    );
}