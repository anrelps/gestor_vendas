<?php

namespace App\Services;

use App\Models\Empresa;

class EmpresaService {

    private $model;
    private $empresaLogoService;

    public function __construct(Empresa $empresa, EmpresaLogoService $empresaLogoService) {
        $this->model = $empresa;
        $this->empresaLogoService = $empresaLogoService;
    }

    public function update(Empresa $empresa, array $data) {
        $logo_path = null;
        if(!empty($data['logo'])) {
            $logo_path = $this->empresaLogoService->upload($data['logo'], $empresa);
        }
        $empresa->update([
            'nome' => $data['nome'],
            'email' => $data['email'],
            'telefone' => $data['telefone'],
            'logo_path' => $logo_path ?? $empresa->logo_path,
        ]);
        return $empresa;
    }
}
