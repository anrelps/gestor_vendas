<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Empresa extends Model
{
    protected $table = "empresas";

    protected $fillable = [
        'nome',
        'assinatura_ativa',
        'data_inicio_assinatura',
        'data_fim_assinatura',
    ];

    public function users() {
        return $this->hasMany(User::class);
    }

    public function clientes() {
        return $this->hasMany(Cliente::class);
    }

    public function produtos() {
        return $this->hasMany(Produto::class);
    }

    public function vendas() {
        return $this->hasMany(Venda::class);
    }
}
