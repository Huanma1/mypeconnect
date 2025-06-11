<?php

namespace App\Http\Controllers;

use App\Models\ProductComment;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class ProductCommentController extends Controller
{
    public function store(Request $request)
    {
        $request->validate([
            'product_id' => ['required', 'exists:products,id'],
            'comment' => ['nullable', 'string'],
            'rating' => ['required', 'integer', 'between:1,5'],
        ]);

        $user = Auth::user();

        // Solo permite un comentario por usuario por producto
        $existing = ProductComment::where('user_id', $user->id)
            ->where('product_id', $request->product_id)
            ->first();

        if ($existing) {
            return back()->withErrors(['message' => 'Ya has calificado este producto.']);
        }

        ProductComment::create([
            'user_id' => $user->id,
            'product_id' => $request->product_id,
            'comment' => $request->comment,
            'rating' => $request->rating,
        ]);

        return back()->with('success', 'Comentario y calificación enviados correctamente.');
    }
}
