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
        $validated = $request->validate([
            'current_password' => ['required', 'current_password:mype'], // Importante indicar el guard aquí
            'password' => ['required', Password::defaults(), 'confirmed'],
        ]);

        $mype = Auth::guard('mype')->user();

        if (! $mype) {
            return redirect()->route('login')->withErrors(['error' => 'MYPE no autenticada.']);
        }

        $mype = Auth::guard('mype')->user();

        if (! $mype) {
            return redirect()->route('login')->withErrors(['error' => 'MYPE no autenticada.']);
        }

        // Asegúrate de que $mype es una instancia de Mype
        if (! $mype instanceof \App\Models\Mype) {
            return redirect()->route('login')->withErrors(['error' => 'Usuario no válido.']);
        }

        $mype->password = Hash::make($validated['password']);
        $mype->save();  // El método save() debe funcionar ahora

        return back()->with('status', 'Contraseña actualizada correctamente.');
    }
}
