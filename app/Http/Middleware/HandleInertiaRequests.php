<?php

namespace App\Http\Middleware;

use Illuminate\Foundation\Inspiring;
use Illuminate\Http\Request;
use Inertia\Middleware;
use Tighten\Ziggy\Ziggy;

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
        // Obtener el quote de manera segura y asegurar que sea una cadena de texto
        $quote = Inspiring::quotes()->random();

        // Verificar si $quote es una cadena, y si no, convertirlo en una cadena vacía
        $quote = is_string($quote) ? $quote : '';

        // Dividir el quote en mensaje y autor
        $quoteParts = explode('-', $quote);

        // Asignar valores a mensaje y autor, con una verificación explícita para el autor
        $message = trim($quoteParts[0]);
        $author = isset($quoteParts[1]) ? trim($quoteParts[1]) : 'Autor no disponible';

        // Retornar los datos compartidos con el tipo de retorno adecuado
        return [
            'name' => config('app.name'),
            'quote' => ['message' => $message, 'author' => $author],
            'auth' => [
                'user' => $request->user() ?: null,
            ],
            'ziggy' => fn (): array => [
                ...(new Ziggy)->toArray(),
                'location' => $request->url(),
            ],
        ];
    }
}
