<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Mype;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Auth;

class MypeController extends Controller
{
    public function create()
    {
        return view('mypes.register');
    }

    public function store(Request $request)
    {
        
        $request->validate([
            'name' => 'required|string|max:255',
            'email' => 'required|email|unique:mypes,email',
            'password' => 'required|string|min:8|confirmed',
            'phone_number' => 'nullable|string|max:15',
            'mype_rate' => 'nullable|numeric|min:0|max:5',
            'mype_address' => 'required|string|max:255',
            'mype_description' => 'nullable|string',
        ]);

        $mype = Mype::create([
            'name' => $request->name,
            'email' => $request->email,
            'password' => Hash::make($request->password),
            'phone_number' => $request->phone_number,
            'mype_rate' => $request->mype_rate ?? 0,
            'mype_address' => $request->mype_address,
            'mype_description' => $request->mype_description,
        ]);

        Auth::guard('mype')->login($mype);
        return redirect()->route('dashboard')->with('success', 'Mype registrada correctamente.');
    }
}

