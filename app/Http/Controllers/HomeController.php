<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Users;
use Inertia\Inertia;

class HomeController extends Controller
{
    public function home(Request $request)
    {
        return Inertia::render('Home', [
            'page' => [
                'title' => 'Home',
                'csrf_token' => csrf_token()
            ]
        ]);
    }
}
