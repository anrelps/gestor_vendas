<?php

use App\Http\Controllers\ChartController;
use App\Http\Controllers\ClienteController;
use App\Http\Controllers\EmpresaController;
use App\Http\Controllers\ProdutoController;
use App\Http\Controllers\RelatorioController;
use App\Http\Controllers\UserController;
use App\Http\Controllers\VendaController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;


Route::prefix('v1')->group(function() {
    Route::post('/login', [UserController::class, 'login']);
    Route::post('/register', [UserController::class, 'register']);

    Route::prefix('/public')->group(function() {
        Route::prefix('/relatorios')->controller(RelatorioController::class)->group(function() {
            Route::get('/{empresa}/pdf/vendas', [RelatorioController::class, 'vendas']);
            Route::get('/{empresa}/pdf/vendas/{venda}', [RelatorioController::class, 'detalhesVenda']);
        });
    });

    Route::middleware('auth:sanctum')->group(function() {
        Route::get('/me', [UserController::class, 'me']);
        Route::prefix('/user')->controller(UserController::class)->group(function() {
            Route::get('/logout', 'logout');
            Route::put('/update/{user}', 'update');
            Route::put('/change-password/{user}', 'updatePassword');
        });
        Route::apiResource('/empresas', EmpresaController::class);
        Route::prefix('/{empresa}')->group(function() {
            Route::apiResource('/clientes', ClienteController::class);
            Route::apiResource('/produtos', ProdutoController::class);
            Route::prefix('/vendas')->controller(VendaController::class)->group(function() {
                Route::put('/pay-multiple-sales', 'applyPaymentToMultipleSales');
            });
            Route::apiResource('/vendas', VendaController::class);
            Route::prefix('/relatorios')->controller(RelatorioController::class)->group(function() {
                Route::get('/pdf/vendas', [RelatorioController::class, 'vendas']);
                Route::get('/pdf/vendas/{venda}', [RelatorioController::class, 'detalhesVenda']);
            });
        });
        Route::prefix('/charts')->controller(ChartController::class)->group(function() {
            Route::get('/lucro-semanal', 'lucroSemana');
            Route::get('/resumo-financeiro', 'resumoFinanceiro');
            Route::get('/resumo-mes', 'resumoMes');
        });
    });
});
