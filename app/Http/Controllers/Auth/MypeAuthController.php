<?php

namespace App\Http\Controllers\Auth;

use App\Http\Controllers\Controller;
use App\Models\Mype;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;
use Illuminate\View\View;

class MypeAuthController extends Controller
{
    /**
     * Muestra el formulario de registro.
     */
    public function showRegisterForm(): View
    {
        return view('mypes.register');
    }

    /**
     * Muestra el formulario de inicio de sesión.
     */
    public function showLoginForm(): View
    {
        return view('mypes.login');
    }

    /**
     * Registra un nuevo MYPE en el sistema.
     */
    public function register(Request $request): RedirectResponse
    {
        $request->validate([
            'name' => 'required|string|max:255',
            'email' => 'required|string|email|max:255|unique:mypes',
            'password' => 'required|string|confirmed|min:8',
            'phone_number' => 'nullable|string|max:15',
            'mype_address' => 'nullable|string|max:255',
            'mype_description' => 'nullable|string',
        ], [
            'email.unique' => 'Este correo electrónico ya está registrado.',
            'password.confirmed' => 'Las contraseñas no coinciden.',
        ]);

        $password = $request->password;

        // Verificamos si el valor es un string antes de usarlo
        if (! is_string($password)) {
            throw new \InvalidArgumentException('La contraseña debe ser un texto válido.');
        }

        $mype = Mype::create([
            'name' => $request->name,
            'email' => $request->email,
            'password' => Hash::make($password), // Ya está validado como string
            'phone_number' => $request->phone_number,
            'mype_rate' => 0, // Valor predeterminado
            'mype_address' => $request->mype_address,
            'mype_description' => $request->mype_description,
        ]);

        Auth::guard('mype')->login($mype);

        return redirect()->route('dashboard');
    }

    public function login(Request $request): RedirectResponse
    {
        $credentials = $request->validate([
            'email' => 'required|email',
            'password' => 'required',
        ]);

        if (Auth::guard('mype')->attempt((array) $credentials, $request->boolean('remember'))) { // Aseguramos que sea un array
            $request->session()->regenerate();

            return redirect()->intended(route('dashboard'));
        }

        return back()->withErrors([
            'email' => __('auth.failed'),
        ]);
    }

    /**
     * Realiza el logout de un MYPE.
     */
    public function logout(Request $request): RedirectResponse
    {
        Auth::guard('mype')->logout();

        $request->session()->invalidate();
        $request->session()->regenerateToken();

        return redirect('/');
    }
}
