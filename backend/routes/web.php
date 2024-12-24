<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\AuthController;

Route::get('/', function () {
    return view('welcome');
});


Route::get('/test', function () {
    return response()->json(['message' => 'Laravel is installed correctly!']);
});

Route::post('/login', [AuthController::class, 'login']);