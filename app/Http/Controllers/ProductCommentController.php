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

        ProductComment::create([
            'product_id' => $request->product_id,
            'user_id' => auth()->id(),
            'comment' => $request->comment,
        ]);

        return redirect()->back();
    }
}
