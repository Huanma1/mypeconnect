import { Head, useForm } from '@inertiajs/react';
import { FormEventHandler } from 'react';
import AuthLayout from '@/layouts/auth-layout';

type LoginForm = {
    email: string;
    password: string;
    remember: boolean;
};

export default function UserLogin() {
    const { data, setData, post, processing, errors, reset } = useForm<LoginForm>({
        email: '',
        password: '',
        remember: false,
    });

    const submit: FormEventHandler = (e) => {
        e.preventDefault();
        post(route('user.login'), {
            onFinish: () => reset('password'),
        });
    };

    return (
        <AuthLayout title="Iniciar Sesión - Cliente" description="Ingresa tus credenciales para continuar">
            <Head title="Login Cliente" />

            <form onSubmit={submit} className="flex flex-col gap-6">
                <div>
                    <label htmlFor="email">Correo Electrónico</label>
                    <input
                        id="email"
                        type="email"
                        value={data.email}
                        onChange={(e) => setData('email', e.target.value)}
                        required
                        className="w-full border rounded px-3 py-2"
                    />
                    {errors.email && <p className="text-red-500 text-sm">{errors.email}</p>}
                </div>

                <div>
                    <label htmlFor="password">Contraseña</label>
                    <input
                        id="password"
                        type="password"
                        value={data.password}
                        onChange={(e) => setData('password', e.target.value)}
                        required
                        className="w-full border rounded px-3 py-2"
                    />
                    {errors.password && <p className="text-red-500 text-sm">{errors.password}</p>}
                </div>

                <div className="flex items-center">
                    <input
                        id="remember"
                        type="checkbox"
                        checked={data.remember}
                        onChange={(e) => setData('remember', e.target.checked)}
                        className="mr-2"
                    />
                    <label htmlFor="remember">Recordarme</label>
                </div>

                <button
                    type="submit"
                    disabled={processing}
                    className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
                >
                    {processing ? 'Cargando...' : 'Iniciar Sesión'}
                </button>
            </form>
        </AuthLayout>
    );
}