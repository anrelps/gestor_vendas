<?php

namespace App\Services;

use App\Models\Empresa;
use App\Models\Venda;

class RelatorioService {

    public function vendas(Empresa $empresa, array $filters) {
        $vendas = $empresa->vendas()
            ->with(['cliente', 'detalhesVendas.produto'])
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
            ->when(isset($filters['pendencias']) && $filters['pendencias'] == 1, function($q) {
                $q->whereColumn('valor_pago', '<', 'valor_total');
            })
            ->orderBy('created_at', 'DESC')
            ->get();
        return $vendas;
    }

    public function detalhesVenda(Empresa $empresa, Venda $venda) {
        $venda->load(['cliente', 'empresa', 'detalhesVendas.produto']);
        return $venda;
    }
}
