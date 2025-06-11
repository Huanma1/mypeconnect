<?php

namespace App\Http\Controllers\Settings;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;

class AppearanceControllerUser extends Controller
{
    public function edit()
    {
        // Retornar la vista o Inertia con los datos para editar la apariencia
        return inertia('settingsUser/appearance', [
            // Puedes pasar datos necesarios aquí
        ]);
    }

    public function update(Request $request)
    {
        $request->validate(['theme' => 'required|in:light,dark,system']);
        $request->user()->update(['theme' => $request->theme]);

        return back()->with('status', 'appearance-updated');
    }
}
