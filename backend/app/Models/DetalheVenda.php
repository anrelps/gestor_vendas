<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class DetalheVenda extends Model
{
    protected $table = "detalhes_vendas";

    protected $fillable = [
        'produto_id',
        'venda_id',
        'quantidade',
        'valor',
        'porcentagem_desconto',
    ];

    public function venda() {
        return $this->belongsTo(Venda::class);
    }

    public function produto() {
        return $this->belongsTo(Produto::class);
    }
}
