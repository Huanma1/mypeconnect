<?php

namespace App\Http\Controllers;

use App\Models\Mype;
use Illuminate\Http\Request;

class MypeReviewController extends Controller
{
    public function store(Request $request, Mype $mype)
    {
        $validated = $request->validate([
            'rating' => 'required|integer|min:1|max:5',
            'comment' => 'required|string|max:1000',
        ]);

        $mype->reviews()->create([
            'user_id' => auth()->id(),
            'rating' => $validated['rating'],
            'comment' => $validated['comment'],
        ]);

        return redirect()->back()->with('success', 'Comentario enviado.');
    }
}
