<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class ClienteResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @return array<string, mixed>
     */
    public function toArray(Request $request): array
    {
        return [
            'id' => (Integer) $this->id,
            'empresa' => new EmpresaResource($this->empresa),
            'nome' => (String) $this->nome,
            'telefone' => (String) $this->telefone,
            'email' => (String) $this->email,
        ];
    }
}
