<?php

namespace App\Services;

use App\Models\RegistroPagamento;
use App\Models\Venda;

class RegistroPagamentoService {

    private $model;

    public function __construct(RegistroPagamento $registroPagamento) {
        $this->model = $registroPagamento;
    }

    public function index(array $filters) {
        $pagamentos = $this->model
            ->join('vendas', 'registros_pagamentos.venda_id', '=', 'vendas.id')
            ->where('vendas.empresa_id', auth()->user()->empresa_id)
            ->when(!empty($filters['cliente_id']), function($q) use ($filters) {
                $q->where('vendas.cliente_id', $filters['cliente_id']);
            })
            ->when(!empty($filters['data_inicio']), function($q) use ($filters) {
                $q->whereDate('registros_pagamentos.created_at', '>=', $filters['data_inicio']);
            })
            ->when(!empty($filters['data_fim']), function($q) use ($filters) {
                $q->whereDate('registros_pagamentos.created_at', '<=', $filters['data_fim']);
            })
            ->select('registros_pagamentos.*')
            ->orderBy('registros_pagamentos.created_at', 'DESC')
            ->paginate(20);
        return $pagamentos;
    }

    public function createFromSale(Venda $venda, array $data) {
        return $this->model->create([
            'venda_id' => $venda->id,
            'type' => $data['type'],
            'amount' => $data['amount'],
            'description' => $data['description'],
        ]);
    }
}
