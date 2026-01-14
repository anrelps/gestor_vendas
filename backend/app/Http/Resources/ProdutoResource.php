<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class ProdutoResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @return array<string, mixed>
     */
    public function toArray(Request $request): array
    {
        return [
            'id' => $this->id,
            'empresa' => new EmpresaResource($this->empresa),
            'titulo' => (String) $this->titulo,
            'descricao' => (String) $this->descricao,
            'valor' => (Float) $this->valor,
        ];
    }
}
