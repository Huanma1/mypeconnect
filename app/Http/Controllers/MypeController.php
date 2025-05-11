<?php

namespace App\Http\Controllers;

use App\Models\Mype;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;
use Illuminate\View\View;
use Inertia\Inertia;
use Inertia\Response;

class MypeController extends Controller
{
    /**
     * Muestra el formulario de registro para un MYPE.
     */
   public function create(): Response
{
    return Inertia::render('Register'); // ajusta la ruta según dónde esté tu componente TSX
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
            // Asegurarse de que la contraseña sea un string antes de pasársela a Hash::make()
            $password = $request->password;

            // Si la contraseña no es un string, convertirla
            if (! is_string($password)) {
                $password = strval($password);
            }

            // Crear el nuevo MYPE
            $mype = Mype::create([
                'name' => $request->name,
                'email' => $request->email,
                'password' => Hash::make($password),  // Asegura que la contraseña sea un string
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
            // Manejar excepciones, como errores de base de datos u otros problemas inesperados
            return redirect()->route('mypes.register')->withErrors(['error' => 'Hubo un error al registrar la MYPE. Por favor, intenta de nuevo.']);
        }
    }

    /**
     * Muestra el historial de cambios en la MYPE.
     */
    public function showInventoryHistory(Request $request): View
    {
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
