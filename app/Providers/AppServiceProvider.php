<?php

namespace App\Providers;

use Illuminate\Support\ServiceProvider;
use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;

class AppServiceProvider extends ServiceProvider
{
    /**
     * Register any application services.
     */
    public function register(): void
    {
        //
    }

    /**
     * Bootstrap any application services.
     */
    public function boot(): void
    {
        Inertia::share([
        'auth' => function () {
            return [
                'user' => Auth::user(),
                'type' => Auth::guard('mype')->check() ? 'mype' : (Auth::check() ? 'user' : null),
            ];
        },
    ]);
    }
}
