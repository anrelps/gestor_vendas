<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Venda extends Model
{
    protected $table = "vendas";

    protected $fillable = [
        'cliente_id',
        'empresa_id',
        'titulo',
        'descricao',
        'valor_total',
        'valor_pago',
    ];

    public function cliente() {
        return $this->belongsTo(Cliente::class);
    }

    public function empresa() {
        return $this->belongsTo(Empresa::class);
    }

    public function detalhesVendas() {
        return $this->hasMany(DetalheVenda::class);
    }

    public function registrosPagamentos() {
        return $this->hasMany(RegistroPagamento::class);
    }
}
