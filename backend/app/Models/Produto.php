<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Produto extends Model
{
    protected $table = "produtos";

    protected $fillable = [
        'empresa_id',
        'titulo',
        'descricao',
        'valor',
    ];

    public function empresa() {
        return $this->belongsTo(Empresa::class);
    }

    public function detalhesVendas() {
        return $this->hasMany(DetalheVenda::class);
    }
}
