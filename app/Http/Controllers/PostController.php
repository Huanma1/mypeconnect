<?php

namespace App\Http\Controllers;

use Illuminate\View\View;

class PostController extends Controller
{
    public function register(): View
    {
        return view('posts.register');
    }
}
