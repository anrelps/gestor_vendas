<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use App\Http\Resources\ClienteResource;
use App\Models\Cliente;
use App\Models\Empresa;
use App\Services\ClienteService;
use App\Traits\Api\ApiResponse;
use Exception;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class ClienteController extends Controller
{
    use ApiResponse;

    private $service;

    public function __construct(ClienteService $clienteService) {
        $this->service = $clienteService;
    }

    public function index(Empresa $empresa, Request $request) {
        try {
            $filters = $request->validate([
                'pesquisa' => 'nullable|string',
                'maxItems' => 'nullable|numeric',
            ]);
            $clientes = $this->service->index($empresa, $filters);
            return ClienteResource::collection($clientes);
        } catch(Exception $e) {
            return $this->errorResponse('Ocorreu um erro ao listar os clientes.', 500);
        }
    }

    public function show(Empresa $empresa, int $id) {
        try {
            $cliente = $this->service->show($id);
            if(!$cliente || $cliente->empresa_id !== Auth::user()->empresa_id) {
                return $this->errorResponse('Cliente não encontrado', 404);
            }
            return new ClienteResource($cliente);
        } catch(Exception $e) {
            return $this->errorResponse('Ocorreu um erro ao exibir os dados do cliente.', 500);
        }
    }

    public function store(Empresa $empresa, Request $request) {
        try {
            $input = $request->validate([
                'nome' => 'required|string',
                'email' => 'nullable|email',
                'telefone' => 'nullable|string'
            ]);
            $cliente = $this->service->store($empresa, $input);
            return new ClienteResource($cliente);
        } catch(Exception $e) {
            return $this->errorResponse('Ocorreu um erro ao tentar cadastrar um novo cliente.', 500);
        }
    }

    public function update(Empresa $empresa, Cliente $cliente, Request $request) {
        try {
            $input = $request->validate([
                'nome' => 'required|string',
                'email' => 'nullable|email',
                'telefone' => 'nullable|string'
            ]);
            $cliente = $this->service->update($cliente, $input);
            return new ClienteResource($cliente);
        } catch(Exception $e) {
            dd($e->getMessage());
            return $this->errorResponse('Ocorreu um erro ao tentar atualizar este cliente.', 500);
        }
    }

    public function destroy(Empresa $empresa, Cliente $cliente) {
        try {
            $this->service->destroy($cliente);
            return $this->successResponse('Cliente excluído com sucesso!', 200);
        } catch(Exception $e) {
            return $this->errorResponse('Ocorreu um erro ao tentar excluir este cliente.', 500);
        }
    }
}
