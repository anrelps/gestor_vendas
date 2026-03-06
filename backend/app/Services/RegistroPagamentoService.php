<?php

namespace App\Services;

use App\Models\RegistroPagamento;
use App\Models\Venda;

class RegistroPagamentoService {

    private $model;

    public function __construct(RegistroPagamento $registroPagamento) {
        $this->model = $registroPagamento;
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
