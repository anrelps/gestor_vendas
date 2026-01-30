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
            'produto_id' => (Integer) $this->produto_id,
            'quantidade' => (Integer) $this->quantidade,
            'valor' => (Float) $this->valor,
            'porcentagem_desconto' => (Integer) $this->porcentagem_desconto,
        ];
    }
}
