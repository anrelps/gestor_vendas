<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use App\Http\Resources\VendaResource;
use App\Models\Empresa;
use App\Models\Venda;
use App\Services\VendaService;
use App\Traits\Api\ApiResponse;
use Exception;
use Illuminate\Http\Request;

class VendaController extends Controller
{
    use ApiResponse;

    private $service;

    public function __construct(VendaService $vendaService) {
        $this->service = $vendaService;
    }

    public function index(Empresa $empresa, Request $request) {
        try {
            $filters = $request->validate([
                'maxItems' => 'nullable|numeric',
                'valor_min' => 'nullable|numeric',
                'valor_max' => 'nullable|numeric',
                'cliente' => 'nullable|numeric',
                'data_min' => 'nullable|date',
                'data_max' => 'nullable|date',
                'pendencias' => 'nullable|numeric',
            ]);

            $vendas = $this->service->index($empresa, $filters);
            return VendaResource::collection($vendas);
        } catch(Exception $e) {
            return $this->errorResponse('Ocorreu um erro ao tentar listar as vendas.', 500);
        }
    }

    public function show(Empresa $empresa, Venda $venda) {
        try {
            $venda = $this->service->show($empresa, $venda);
            return new VendaResource($venda);
        } catch(Exception $e) {
            return $this->errorResponse('Ocorreu um erro ao tentar exibir esta venda.', 500);
        }
    }

    public function store(Empresa $empresa, Request $request) {
        try {
            $input = $request->validate([
                'cliente' => 'required|numeric',
                'titulo' => 'required|string',
                'descricao' => 'nullable|string',
                'valor_total' => 'required|numeric',
                'valor_pago' => 'required|numeric',
                'produtos' => 'required|array|min:1',
                'produtos.*.produto_id' => 'required|exists:produtos,id', // verifica se o produto com o id passado existe na tabela produtos
                'produtos.*.quantidade' => 'required|integer|min:1',
                'produtos.*.valor' => 'required|numeric|min:0',
                'produtos.*.porcentagem_desconto' => 'nullable|numeric|min:0|max:100',
            ]);

            $venda = $this->service->store($empresa, $input);
            return new VendaResource($venda);
        } catch(Exception $e) {
            dd($e->getMessage());
            return $this->errorResponse('Ocorreu um erro ao tentar cadastrar uma nova venda.', 500);
        }
    }

    public function update(Empresa $empresa, Venda $venda, Request $request) {
        try {
            $input = $request->validate([
                'cliente' => 'required|numeric',
                'titulo' => 'required|string',
                'descricao' => 'nullable|string',
                'valor_total' => 'required|numeric',
                'valor_pago' => 'required|numeric',
                'produtos' => 'required|array|min:1',
                'produtos.*.produto_id' => 'required|exists:produtos,id', // verifica se o produto com o id passado existe na tabela produtos
                'produtos.*.quantidade' => 'required|integer|min:1',
                'produtos.*.valor' => 'required|numeric|min:0',
                'produtos.*.porcentagem_desconto' => 'nullable|numeric|min:0|max:100',
            ]);

            $venda = $this->service->update($venda, $input);
            return new VendaResource($venda);
        } catch(Exception $e) {
            return $this->errorResponse('Ocorreu um erro ao tentar atualizar esta venda.', 500);
        }
    }

    public function destroy(Empresa $empresa, Venda $venda) {
        try {
            $this->service->destroy($venda);
            return $this->successResponse('Venda excluída com sucesso.', 200);
        } catch(Exception $e) {
            return $this->errorResponse('Ocorreu um erro ao tentar excluir esta venda.', 500);
        }
    }

    public function applyPaymentToMultipleSales(Request $request) {
        try {
            $input = $request->validate([
                'value' => 'numeric|required',
                'paymentType' => 'string|required',
            ]);
            $this->service->applyPaymentToMultipleSales($input['value'], $input['paymentType']);
            return $this->successResponse('Venda atualizadas com sucesso.', 200);
        } catch(Exception $e) {
            dd($e->getMessage());
            return $this->errorResponse('Ocorreu um erro ao tentar realizar o pagamento multiplo.', 500);
        }
    }
}
