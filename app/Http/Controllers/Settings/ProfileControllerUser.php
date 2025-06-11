<?php

namespace App\Http\Controllers\Settings;

use App\Http\Controllers\Controller;
use App\Http\Requests\Settings\ProfileUpdateRequestUser;
use Illuminate\Contracts\Auth\MustVerifyEmail;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;
use Inertia\Response;

class ProfileControllerUser extends Controller
{
    public function edit(Request $request): Response
    {
        $user = $request->user();

        if (! $user) {
            return Inertia::render('auth/login', [
                'error' => 'Debes estar autenticado para acceder a esta página.',
            ]);
        }

        return Inertia::render('settingsUser/profile', [
            'mustVerifyEmail' => $user instanceof MustVerifyEmail,
            'status' => $request->session()->get('status'),
            'auth' => [
                'user' => $user,
            ],
        ]);
    }

    public function update(ProfileUpdateRequestUser $request): RedirectResponse
    {
        $user = $request->user();

        if (! $user) {
            return redirect()->route('login')->withErrors(['error' => 'Usuario no autenticado.']);
        }

        $user->fill($request->validated());

        if ($user->isDirty('email')) {
            $user->email_verified_at = null;
        }

        $user->save();

        return redirect()->route('user.profile.edit')->with('status', 'Perfil actualizado correctamente.');
    }

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
        $user->delete();

        $request->session()->invalidate();
        $request->session()->regenerateToken();

        return redirect('/');
    }
}
