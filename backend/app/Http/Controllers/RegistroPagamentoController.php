<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use App\Http\Resources\RegistroPagamentoResource;
use App\Services\RegistroPagamentoService;
use App\Traits\Api\ApiResponse;
use Exception;
use Illuminate\Http\Request;

class RegistroPagamentoController extends Controller
{
    use ApiResponse;

    private $service;

    public function __construct(RegistroPagamentoService $registroPagamentoService) {
        $this->service = $registroPagamentoService;
    }

    public function index(Request $request) {
        try {
            $filters = $request->validate([
                'cliente_id' => 'nullable|numeric',
                'data_inicio' => 'nullable|date',
                'data_fim' => 'nullable|date',
            ]);
            $pagamentos = $this->service->index($filters);
            return $this->successResponse(RegistroPagamentoResource::collection($pagamentos), 200);
        } catch(Exception $e) {
            return $this->errorResponse($e->getMessage(), 500);
        }
    }
}
