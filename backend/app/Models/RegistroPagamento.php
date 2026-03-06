<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class RegistroPagamento extends Model
{
    protected $table = 'registros_pagamentos';

    protected $fillable = [
        'venda_id',
        'type',
        'amount',
        'description',
    ];

    public function venda() {
        return $this->belongsTo(Venda::class);
    }
}
