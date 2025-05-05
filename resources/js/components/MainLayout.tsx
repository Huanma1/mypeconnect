import { Link, usePage } from '@inertiajs/react';
import React from 'react';
import type { Mype } from '@/types'; 


export default function MainLayout({ children }: { children: React.ReactNode }) {
    const { auth } = usePage<{ auth: { user: Mype | null } }>().props;

    return (
        <div className="min-h-screen bg-gray-100 text-gray-900">
            <header className="p-4 bg-gray-900 text-white">
                <div className="flex justify-between items-center max-w-7xl mx-auto">
                    <Link href={route('home')} className="text-white hover:underline">
                        <h1 className="text-xl font-bold">Mype Connect</h1>
                    </Link>

                    <nav className="space-x-4">
                        {auth?.user ? (
                            <>
                                <span className="text-white font-medium">Hola, {auth.user.name}</span>
                                <Link href={route('dashboard')} className="text-white hover:underline">
                                    Dashboard
                                </Link>
                            </>
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

            <main className="p-6">{children}</main>
        </div>
    );
}
