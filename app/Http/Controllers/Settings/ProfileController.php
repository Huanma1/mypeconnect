<?php

namespace App\Http\Controllers\Settings;

use App\Http\Controllers\Controller;
use App\Http\Requests\Settings\ProfileUpdateRequest;
use Illuminate\Contracts\Auth\MustVerifyEmail;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;
use Inertia\Response;

class ProfileController extends Controller
{
    /**
     * Show the user's profile settings page.
     */
    public function edit(Request $request): Response
    {
        // Verificar que el usuario esté autenticado
        $user = $request->user();

        // Si el usuario no está autenticado, devolvemos la vista con el error
        if (! $user) {
            return Inertia::render('auth/login', [
                'error' => 'Debes estar autenticado para acceder a esta página.',
            ]);
        }

        // Si está autenticado, proceder con la vista de perfil
        return Inertia::render('settings/profile', [
            'mustVerifyEmail' => $user instanceof MustVerifyEmail,
            'status' => $request->session()->get('status'),
            'auth' => [
                'user' => $user,
            ],
        ]);
    }

    /**
     * Update the user's profile settings.
     */
    public function update(ProfileUpdateRequest $request): RedirectResponse
    {
        $user = $request->user();

        // Verificar que el usuario no sea null antes de continuar
        if (! $user) {
            return redirect()->route('login')->withErrors(['error' => 'Usuario no autenticado.']);
        }

        // Llenar los datos validados en el modelo usuario
        $user->fill($request->validated());

        // Verificar si el campo email ha cambiado
        if ($user->isDirty('email')) {
            // Si el email cambia, restablecemos la verificación de email
            $user->email_verified_at = null;
        }

        // Guardar los cambios en el modelo usuario
        $user->save();

        return to_route('mype.profile.edit');
    }

    /**
     * Delete the user's account.
     */
    public function destroy(Request $request): RedirectResponse
    {
        $request->validate([
            'password' => ['required', 'current_password'],
        ]);

        $user = $request->user();

        if (! $user) {
            return redirect()->route('login')->withErrors(['error' => 'Usuario no autenticado.']);
        }

        Auth::logout();

        // Eliminar la cuenta del usuario
        $user->delete();

        $request->session()->invalidate();
        $request->session()->regenerateToken();

        return redirect('/');
    }
}
