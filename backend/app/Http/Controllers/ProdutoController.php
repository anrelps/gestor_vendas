<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use App\Http\Resources\ProdutoResource;
use App\Models\Empresa;
use App\Models\Produto;
use App\Services\ProdutoService;
use App\Traits\Api\ApiResponse;
use Exception;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class ProdutoController extends Controller
{

    use ApiResponse;

    private $service;

    public function __construct(ProdutoService $produtoService) {
        $this->service = $produtoService;
    }

    public function index(Empresa $empresa, Request $request) {
        try {
            $filters = $request->validate([
                'nome' => 'nullable|string',
                'valor_min' => 'nullable|numeric',
                'valor_max' => 'nullable|numeric',
            ]);
            $produtos = $this->service->index($empresa, $filters);
            return ProdutoResource::collection($produtos);
        } catch (Exception $e) {
            return $this->errorResponse('Ocorreu um erro ao tentar listar os produtos.', 500);
        }
    }

    public function show(Empresa $empresa, Produto $produto) {
        try {
            $produto = $this->service->show($produto->id);
            if(!$produto || $produto->empresa_id !== Auth::user()->empresa_id) {
                return $this->errorResponse('Cliente não encontrado', 404);
            }
            return new ProdutoResource($produto);
        } catch (Exception $e) {
            return $this->errorResponse('Ocorreu um erro ao tentar exibir este produto.', 500);
        }
    }

    public function store(Empresa $empresa, Request $request) {
        try {
            $input = $request->validate([
                'titulo' => 'required|string',
                'descricao' => 'nullable|string',
                'valor' => 'required|numeric',
            ]);
            $produto = $this->service->store($empresa, $input);
            return new ProdutoResource($produto);
        } catch (Exception $e) {
            return $this->errorResponse('Ocorreu um erro ao tentar cadastrar um novo produto.', 500);
        }
    }

    public function update(Empresa $empresa, Produto $produto, Request $request) {
        try {
            $input = $request->validate([
                'titulo' => 'required|string',
                'descricao' => 'nullable|string',
                'valor' => 'required|numeric',
            ]);
            $produto = $this->service->update($produto, $input);
            return new ProdutoResource($produto);
        } catch (Exception $e) {
            return $this->errorResponse('Ocorreu um erro ao tentar atualizar este produto.', 500);
        }
    }

    public function destroy(Empresa $empresa, Produto $produto) {
        try {
            $this->service->destroy($produto);
            return $this->successResponse('Produto excluído com sucesso.', 200);
        } catch (Exception $e) {
            return $this->errorResponse('Ocorreu um erro ao tentar excluir este produto.', 500);
        }
    }

}
