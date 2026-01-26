<?php

namespace App\Services;

use App\Models\Empresa;
use App\Models\Produto;
use Illuminate\Support\Facades\Auth;

class ProdutoService {

    private $model;

    public function __construct(Produto $produto) {
        $this->model = $produto;
    }

    public function index(Empresa $empresa, array $filters) {
        $maxItems = $filters['maxItems'] ?? 20;

        return $empresa->produtos()
            ->when(data_get($filters, 'titulo'), function($q, $titulo) {
                $q->where('titulo', 'ILIKE', "%{$titulo}%");
            })
            ->when(data_get($filters, 'valor_min'), function($q, $min) {
                $q->where('valor', '>=', $min);
            })
            ->when(data_get($filters, 'valor_max'), function($q, $max) {
                $q->where('valor', '<=', $max);
            })
            ->orderBy('valor', 'DESC')
            ->paginate($maxItems);
    }

    public function show(Produto $produto) {
        $produto = $this->model->find($produto->id);
        return $produto;
    }

    public function store(Empresa $empresa, array $input) {
        return $empresa->produtos()->create($input);
    }

    public function update(Produto $produto, array $input) {
        $produto->update($input);
        return $produto;
    }

    public function destroy(Produto $produto) {
        return $produto->delete();
    }
}
