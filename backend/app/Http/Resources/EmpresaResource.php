<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class EmpresaResource extends JsonResource
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
            'nome' => (String) $this->nome,
            'email' => (String) $this->email,
            'telefone' => (String) $this->telefone,
            'logo_url' => (String) $this->logo_url,
            'assinatura_ativa' => (Integer) $this->assinatura_ativa,
            'data_inicio_assinatura' => (String) $this->data_inicio_assinatura,
            'data_fim_assinatura' => (String) $this->data_fim_assinatura,
        ];
    }
}
