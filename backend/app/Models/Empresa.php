<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Empresa extends Model
{
    protected $table = "empresas";

    protected $fillable = [
        'nome',
        'email',
        'telefone',
        'logo_path',
        'assinatura_ativa',
        'is_demo',
        'demo_expires_at',
        'data_inicio_assinatura',
        'data_fim_assinatura',
    ];

    protected $appends = ['logo_url'];

    public function getLogoUrlAttribute() {
        if(!$this->logo_path) {
            return null;
        }
        return asset('storage/'.$this->logo_path);
    }

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
