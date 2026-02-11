<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use App\Models\Empresa;
use App\Models\Venda;
use App\Services\RelatorioService;
use Barryvdh\DomPDF\Facade\Pdf;
use Carbon\Carbon;
use Illuminate\Http\Request;


class RelatorioController extends Controller
{
    private $service;

    public function __construct(RelatorioService $relatorioService) {
        $this->service = $relatorioService;
    }

    public function vendas(Empresa $empresa, Request $request) {
        $filters = $request->validate([
            'valor_min' => 'nullable|numeric',
            'valor_max' => 'nullable|numeric',
            'cliente' => 'nullable|numeric',
            'data_min' => 'nullable|date',
            'data_max' => 'nullable|date',
            'pendencias' => 'nullable|numeric',
        ]);
        $vendas = $this->service->vendas($empresa, $filters);
        $pdf = PDF::loadView('relatorios.vendas.vendasPdf', ['vendas' => $vendas, 'empresa' => $empresa, 'filters' => $filters]);
        return $pdf->stream('relatorio_vendas_'.Carbon::now()->format('d_m_Y').'.pdf');
    }

    public function detalhesVenda(Empresa $empresa, Venda $venda) {
        $detalhesVenda = $this->service->detalhesVenda($empresa, $venda);
        $pdf = PDF::loadView('relatorios.vendas.detalhesVendaPdf', ['venda' => $detalhesVenda]);
        return $pdf->stream("detalhes_".$venda->titulo.".pdf");
    }
}
