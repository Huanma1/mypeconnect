<?php

namespace App\Http\Controllers\Auth;

use App\Http\Controllers\Controller;
use App\Models\Mype;
use App\Models\User;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;

class EmailVerificationNotificationController extends Controller
{
    /**
     * Send a new email verification notification.
     */
    public function store(Request $request): RedirectResponse
    {
        $user = $request->user();

        // Aseguramos que user no sea null y sea del tipo adecuado
        if ($user instanceof Mype || $user instanceof User) {
            if ($user->hasVerifiedEmail()) {
                return redirect()->intended(route('dashboard', absolute: false));
            }

            $user->sendEmailVerificationNotification();

            return back()->with('status', 'verification-link-sent');
        }

        // Si el usuario no es válido o no existe, redirigimos o lanzamos un error
        return redirect()->route('login')->withErrors('Usuario no autenticado.');
    }
}
