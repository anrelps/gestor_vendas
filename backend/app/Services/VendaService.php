<?php

namespace App\Services;

use App\Models\Empresa;
use App\Models\Venda;
use Exception;
use Illuminate\Support\Facades\DB;

class VendaService {

    private $model;

    public function __construct(Venda $venda) {
        $this->model = $venda;
    }

    public function index(Empresa $empresa, array $filters) {
        $maxItems = $filters['maxItems'] ?? 20;
        $vendas = $empresa->vendas()
            ->when(isset($filters['valor_min']), function($q) use ($filters) {
                $q->where('valor_total', '>=', $filters['valor_min']);
            })
            ->when(isset($filters['valor_max']), function($q) use ($filters) {
                $q->where('valor_total', '<=', $filters['valor_max']);
            })
            ->when(isset($filters['cliente']), function($q) use ($filters) {
                $q->where('cliente_id', $filters['cliente']);
            })
            ->when(isset($filters['data_min']), function($q) use ($filters) {
                $q->whereDate('created_at', '>=', $filters['data_min']);
            })
            ->when(isset($filters['data_max']), function($q) use ($filters) {
                $q->whereDate('created_at', '<=', $filters['data_max']);
            })
            ->when(isset($filters['pendencias']), function($q) {
                $q->whereColumn('valor_pago', '<', 'valor_total');
            })
            ->orderBy('created_at', 'DESC')
            ->paginate($maxItems);
        return $vendas;
    }

    public function show(Empresa $empresa, Venda $venda) {
        $venda = $empresa->vendas()->find($venda->id);
        return $venda;
    }

    public function store(Empresa $empresa, array $input) {
        try {
            DB::beginTransaction();
            $venda = $empresa->vendas()->create([
                'cliente_id' => $input['cliente'],
                'titulo' => $input['titulo'],
                'descricao' => $input['descricao'],
                'valor_total' => $input['valor_total'],
                'valor_pago' => $input['valor_pago'],
            ]);

            foreach($input['produtos'] as $produto) {
                $venda->detalhesVendas()->create([
                    'produto_id' => $produto['produto_id'],
                    'quantidade' => $produto['quantidade'],
                    'valor' => $produto['valor'],
                    'porcentagem_desconto' => $produto['porcentagem_desconto'] ?? 0,
                ]);
            }
            DB::commit();
            return $venda;
        } catch(Exception $e) {
            DB::rollBack();
            throw $e;
        }
    }

    public function update(Venda $venda, array $input) {
        try {
            DB::beginTransaction();

            $venda->update([
                'cliente_id' => $input['cliente'],
                'titulo' => $input['titulo'],
                'descricao' => $input['descricao'],
                'valor_total' => $input['valor_total'],
                'valor_pago' => $input['valor_pago'],
            ]);

            $venda->detalhesVendas()->delete();

            foreach($input['produtos'] as $produto) {
                $venda->detalhesVendas()->create([
                    'produto_id' => $produto['produto_id'],
                    'quantidade' => $produto['quantidade'],
                    'valor' => $produto['valor'],
                    'porcentagem_desconto' => $produto['porcentagem_desconto'] ?? 0,
                ]);
            }

            DB::commit();
            return $venda;
        } catch(Exception $e) {
            DB::rollBack();
            throw $e;
        }
    }

    public function destroy(Venda $venda) {
        $venda->detalhesVendas()->delete();
        return $venda->delete();
    }
}
