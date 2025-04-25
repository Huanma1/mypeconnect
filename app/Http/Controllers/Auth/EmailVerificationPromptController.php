<?php

namespace App\Http\Controllers\Auth;

use App\Http\Controllers\Controller;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;

class EmailVerificationPromptController extends Controller
{
    /**
     * Show the email verification prompt page.
     */
    public function __invoke(Request $request): Response|RedirectResponse
    {
        // Verifica si el usuario es de tipo 'User'
        if ($request->user() instanceof \App\Models\User) {
            return $request->user()->hasVerifiedEmail()
                ? redirect()->intended(route('dashboard', absolute: false))
                : Inertia::render('auth/verify-email', ['status' => $request->session()->get('status')]);
        }

        // Si no es un usuario de tipo 'User', redirige o maneja otro comportamiento
        return redirect()->route('home');
    }
}
