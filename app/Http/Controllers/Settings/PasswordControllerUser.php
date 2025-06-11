<?php

namespace App\Http\Controllers\Settings;

use App\Http\Controllers\Controller;
use Illuminate\Contracts\Auth\MustVerifyEmail;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;
use Illuminate\Validation\Rules\Password;
use Inertia\Inertia;
use Inertia\Response;

class PasswordControllerUser extends Controller
{
    /**
     * Muestra la vista de configuración de contraseña para un usuario normal.
     */
    public function edit(Request $request): Response
    {
        return Inertia::render('settingsUser/password', [
            'mustVerifyEmail' => Auth::user() instanceof MustVerifyEmail,
            'status' => $request->session()->get('status'),
        ]);
    }

    /**
     * Actualiza la contraseña del usuario autenticado.
     */
    public function update(Request $request): RedirectResponse
    {
        /** @var array{password: string} $validated */
        $validated = $request->validate([
            'current_password' => ['required', 'current_password'], // usa el guard por defecto
            'password' => ['required', Password::defaults(), 'confirmed'],
        ]);

        $user = Auth::user();

        if (! $user) {
            return redirect()->route('login')->withErrors(['error' => 'Usuario no autenticado.']);
        }

        $user->password = Hash::make($validated['password']);
        $user->save();

        return back()->with('status', 'Contraseña actualizada correctamente.');
    }
}
