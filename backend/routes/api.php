<?php

use App\Http\Controllers\ClienteController;
use App\Http\Controllers\ProdutoController;
use App\Http\Controllers\UserController;
use App\Http\Controllers\VendaController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;


Route::prefix('v1')->group(function() {
    Route::post('/login', [UserController::class, 'login']);
    Route::post('/register', [UserController::class, 'register']);

    Route::middleware('auth:sanctum')->group(function() {
        Route::get('/me', [UserController::class, 'me']);
        Route::prefix('/{empresa}')->group(function() {
            Route::apiResource('/clientes', ClienteController::class);
            Route::apiResource('/produtos', ProdutoController::class);
            Route::apiResource('/vendas', VendaController::class);
        });
    });
});
