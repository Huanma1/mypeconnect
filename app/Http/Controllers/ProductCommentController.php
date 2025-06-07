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
            'comment' => 'required|string|max:1000',
            'product_id' => 'required|exists:products,id',
        ]);

        $userId = Auth::id();
        $productId = $request->product_id;

        // Verificar si el usuario ya comentó este producto
        $existingComment = ProductComment::where('user_id', $userId)
            ->where('product_id', $productId)
            ->first();

        if ($existingComment) {
            return redirect()->back()->with('error', 'Ya has comentado este producto.');
        }

        ProductComment::create([
            'product_id' => $productId,
            'user_id' => $userId,
            'comment' => $request->comment,
        ]);

        return redirect()->back()->with('success', 'Comentario agregado correctamente.');
    }
}
