<?php

namespace App\Http\Middleware;

use Illuminate\Foundation\Inspiring;
use Illuminate\Http\Request;
use Inertia\Middleware;
use Tighten\Ziggy\Ziggy;
use Illuminate\Support\Facades\Auth;

class HandleInertiaRequests extends Middleware
{
    /**
     * El template raíz que se carga en la primera visita de la página.
     *
     * @see https://inertiajs.com/server-side-setup#root-template
     *
     * @var string
     */
    protected $rootView = 'app';

    /**
     * Determina la versión del activo actual.
     *
     * @see https://inertiajs.com/asset-versioning
     */
    public function version(Request $request): ?string
    {
        return parent::version($request);
    }

    /**
     * Define las propiedades que se comparten por defecto.
     *
     * @see https://inertiajs.com/shared-data
     *
     * @return array<string, mixed>
     */
    public function share(Request $request): array
    {
        return array_merge(parent::share($request), [
            'auth' => function () {
                if (Auth::guard('mype')->check()) {
                    return [
                        'user' => Auth::guard('mype')->user(),
                        'type' => 'mype',
                    ];
                }

                if (Auth::guard('web')->check()) {
                    return [
                        'user' => Auth::guard('web')->user(),
                        'type' => 'user',
                    ];
                }

                return [
                    'user' => null,
                    'type' => null,
                ];
            },
        ]);
    }
}
