<?php

namespace App\Http\Controllers;

use App\Models\Mype;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;
use Illuminate\View\View;
use Illuminate\Database\Eloquent\ModelNotFoundException;
use App\Models\InventoryHistory;

class MypeController extends Controller
{
    /**
     * Muestra el formulario de registro para un MYPE.
     */
    public function create(): View
    {
        return view('mypes.register');
    }

    /**
     * Almacena un nuevo MYPE en la base de datos.
     */
    public function store(Request $request): RedirectResponse
    {
        // Validación de los campos
        $request->validate([
            'name' => 'required|string|max:255',
            'email' => 'required|email|unique:mypes,email',
            'password' => 'required|string|min:8|confirmed',
            'phone_number' => 'nullable|string|max:15',
            'mype_rate' => 'nullable|numeric|min:0|max:5',
            'mype_address' => 'required|string|max:255',
            'mype_description' => 'nullable|string',
        ]);

        try {
            // Crear el nuevo MYPE
            $mype = Mype::create([
                'name' => $request->name,
                'email' => $request->email,
                'password' => Hash::make($request->password),  // Asegura que la contraseña sea un string
                'phone_number' => $request->phone_number,
                'mype_rate' => $request->mype_rate ?? 0, // Valor predeterminado si no se especifica
                'mype_address' => $request->mype_address,
                'mype_description' => $request->mype_description,
            ]);

            // Iniciar sesión para el MYPE recién creado
            Auth::guard('mype')->login($mype);

            // Redirigir a la página de dashboard con un mensaje de éxito
            return redirect()->route('dashboard')->with('success', 'Mype registrada correctamente.');
        } catch (\Exception $e) {
            // Captura de errores con manejo específico
            return redirect()->route('mypes.register')->withErrors(['error' => 'Hubo un error al registrar la MYPE. Por favor, intenta de nuevo.']);
        }
    }

    /**
     * Muestra el historial de cambios en la MYPE.
     */
    public function showInventoryHistory(Request $request)
    {
        /** @var \App\Models\Mype $mype */
        // Obtener el MYPE autenticado
        $mype = Auth::guard('mype')->user();

        // Obtener el historial de inventario de la Mype
        $inventoryHistories = $mype->inventoryHistories()
            ->with('product') // Relación con el producto
            ->orderBy('created_at', 'desc')
            ->paginate(10); // Paginación

        return view('products.inventory-history', compact('inventoryHistories'));
    }
}
