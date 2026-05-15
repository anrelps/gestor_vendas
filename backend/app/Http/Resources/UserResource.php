<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class UserResource extends JsonResource
{
    public function toArray(Request $request): array
    {
        return [
            'id' => (Integer) $this->id,
            'empresa' => new EmpresaResource($this->empresa),
            'nome' => (String) $this->nome,
            'email' => (String) $this->email,
            'telefone' => (String) $this->telefone,
        ];
    }
}
