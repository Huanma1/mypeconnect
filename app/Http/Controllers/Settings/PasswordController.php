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

class PasswordController extends Controller
{
    /**
     * Muestra la vista de configuración de contraseña para una MYPE.
     */
    public function edit(Request $request): Response
    {
        return Inertia::render('settings/password', [
            'mustVerifyEmail' => Auth::guard('mype')->user() instanceof MustVerifyEmail,
            'status' => $request->session()->get('status'),
        ]);
    }

    /**
     * Actualiza la contraseña de la MYPE autenticada.
     */
    public function update(Request $request): RedirectResponse
    {
        /** @var array{password: string} $validated */
        $validated = $request->validate([
            'current_password' => ['required', 'current_password:mype'],
            'password' => ['required', Password::defaults(), 'confirmed'],
        ]);

        $mype = Auth::guard('mype')->user();

        if (! $mype) {
            return redirect()->route('login')->withErrors(['error' => 'MYPE no autenticada.']);
        }

        // Eliminada la comprobación `instanceof`, ya que $mype se supone que es una instancia de Mype
        $mype->password = Hash::make($validated['password']);
        $mype->save();  // Guarda la nueva contraseña

        return back()->with('status', 'Contraseña actualizada correctamente.');
    }
}