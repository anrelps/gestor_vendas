<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use App\Services\ChartService;
use App\Traits\Api\ApiResponse;
use Exception;
use Illuminate\Http\Request;

class ChartController extends Controller
{
    use ApiResponse;

    private $service;

    public function __construct(ChartService $chartService) {
        $this->service = $chartService;
    }

    public function lucroSemana() {
        try {
            $vendas = $this->service->lucroSemana();
            return $this->successResponse($vendas, 200);
        } catch (Exception $e) {
            return $this->errorResponse($e->getMessage(), 500);
        }
    }

    public function resumoFinanceiro() {
        try {
            $resumo = $this->service->resumoFinanceiro();
            return $this->successResponse($resumo, 200);
        } catch (Exception $e) {
            return $this->errorResponse($e->getMessage(), 500);
        }
    }

    public function resumoMes() {
        try {
            $resumo = $this->service->resumoMes();
            return $this->successResponse($resumo, 200);
        } catch(Exception $e) {
            return $this->errorResponse($e->getMessage(), 500);
        }
    }
}
