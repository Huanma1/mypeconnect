<?php

namespace App\Http\Controllers\Auth;

use App\Http\Controllers\Controller;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Validation\ValidationException;
use Inertia\Inertia;
use Inertia\Response;

class ConfirmablePasswordController extends Controller
{
    /**
     * Show the confirm password page.
     */
    public function show(): Response
    {
        return Inertia::render('auth/confirm-password');
    }

    /**
     * Confirm the user's password.
     */
    public function store(Request $request): RedirectResponse
    {
        // Detectar si hay un usuario autenticado (web o mype)
        $user = Auth::guard('web')->user() ?? Auth::guard('mype')->user();
        $guard = Auth::guard('web')->user() ? 'web' : 'mype';

        if (! $user || ! isset($user->email)) {
            throw ValidationException::withMessages([
                'email' => 'No se pudo obtener el correo electrónico del usuario autenticado.',
            ]);
        }

        if (! Auth::guard($guard)->validate([
            'email' => $user->email,
            'password' => $request->password,
        ])) {
            throw ValidationException::withMessages([
                'password' => __('auth.password'),
            ]);
        }

        $request->session()->put('auth.password_confirmed_at', time());

        return redirect()->intended(route('dashboard', absolute: false));
    }
}
