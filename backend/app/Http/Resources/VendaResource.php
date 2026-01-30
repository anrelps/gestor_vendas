<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class VendaResource extends JsonResource
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
            'cliente' => new ClienteResource($this->cliente),
            'empresa' => new EmpresaResource($this->empresa),
            'detalhesVenda' => DetalheVendaResource::collection($this->detalhesVendas),
            'titulo' => (String) $this->titulo,
            'descricao' => (String) $this->descricao,
            'valor_total' => (Float) $this->valor_total,
            'valor_pago' => (Float) $this->valor_pago,
        ];
    }
}
