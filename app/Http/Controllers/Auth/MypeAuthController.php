<?php
namespace App\Http\Controllers\Auth;

use App\Http\Controllers\Controller;
use App\Models\Mype;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;

class MypeAuthController extends Controller
{
    public function showRegisterForm()
    {
        return view('mypes.register');
    }
    public function showLoginForm()
    {
        return view('mypes.login');
    }

    public function register(Request $request)
    {
        $request->validate([
            'name' => 'required|string|max:255',
            'email' => 'required|string|email|max:255|unique:mypes',
            'password' => 'required|string|confirmed|min:8',
            'phone_number' => 'nullable|string|max:15',
            'mype_address' => 'nullable|string|max:255',
            'mype_description' => 'nullable|string',
        ]);
    
        $mype = Mype::create([
            'name' => $request->name,
            'email' => $request->email,
            'password' => Hash::make($request->password),
            'phone_number' => $request->phone_number,
            'mype_rate' => 0, // Valor predeterminado
            'mype_address' => $request->mype_address,
            'mype_description' => $request->mype_description,
        ]);
    
        Auth::guard('mype')->login($mype);
    
        return redirect()->route('dashboard');
    }

public function login(Request $request)
{
    $credentials = $request->validate([
        'email' => 'required|email',
        'password' => 'required',
    ]);

    if (Auth::guard('mype')->attempt($credentials, $request->boolean('remember'))) {
        $request->session()->regenerate();

        return redirect()->intended(route('dashboard'));
    }

    return back()->withErrors([
        'email' => __('auth.failed'),
    ]);
    }

    public function logout(Request $request)
    {
        Auth::guard('mype')->logout();

        $request->session()->invalidate();
        $request->session()->regenerateToken();

        return redirect('/');
    }
   
}