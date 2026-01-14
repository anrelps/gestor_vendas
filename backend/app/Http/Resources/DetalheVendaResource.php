<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class DetalheVendaResource extends JsonResource
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
            'produto' => new ProdutoResource($this->produto),
            'venda' => new VendaResource($this->venda),
            'quantidade' => (Integer) $this->quantidade,
            'valor' => (Float) $this->valor,
            'porcentagem_desconto' => (Integer) $this->porcentagem_desconto,
        ];
    }
}
