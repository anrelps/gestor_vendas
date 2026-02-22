<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use App\Http\Resources\EmpresaResource;
use App\Models\Empresa;
use App\Services\EmpresaService;
use App\Traits\Api\ApiResponse;
use Exception;
use Illuminate\Http\Request;

class EmpresaController extends Controller
{
    use ApiResponse;

    private $service;

    public function __construct(EmpresaService $empresaService) {
        $this->service = $empresaService;
    }

    public function update(Empresa $empresa, Request $request) {
        try {
            $input = $request->validate([
                'nome' => 'required|string',
                'logo' => 'nullable|image|mimes:jpeg,png,jpg,webp|max:5120',
            ]);
            $empresaAtt = $this->service->update($empresa, $input);
            return new EmpresaResource($empresaAtt);
        } catch(Exception $e) {
            dd($e->getMessage());
            return $this->errorResponse('Ocorreu um erro ao tentar atualizar a empresa.', 500);
        }
    }
}
