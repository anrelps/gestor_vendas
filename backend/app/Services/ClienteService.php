<?php

namespace App\Services;

use App\Models\Cliente;
use App\Models\Empresa;
use Illuminate\Support\Facades\Auth;

class ClienteService {

    private $model;

    public function __construct(Cliente $cliente) {
        $this->model = $cliente;
    }

    public function index(Empresa $empresa, array $filters) {
        $maxItems = $filters['maxItems'] ?? 20;

        $clientes = $empresa->clientes()
            ->when(isset($filters['pesquisa']), function($q) use ($filters) {
                $q->where('nome', 'ILIKE', "%{$filters['pesquisa']}%")
                    ->orWhere('email', 'ILIKE', "%{$filters['pesquisa']}%" )
                    ->orWhere('telefone', 'ILIKE', "%{$filters['pesquisa']}%" );
            })
            ->orderBy('created_at', 'DESC')->paginate($filters['maxItems']);
        return $clientes;
    }

    public function show(int $id) {
        $cliente = $this->model->find($id);
        return $cliente;
    }

    public function store(Empresa $empresa, array $input) {
        return $empresa->clientes()->create($input);
    }

    public function update(Cliente $cliente, array $input) {
        $cliente->update($input);
        return $cliente;
    }

    public function destroy(Cliente $cliente) {
        return $cliente->delete();
    }
}
