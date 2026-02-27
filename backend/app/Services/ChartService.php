<?php

namespace App\Services;

use App\Models\Venda;
use Carbon\Carbon;

class ChartService {

    public function lucroSemana() {
        $startOfWeek = Carbon::now()->startOfWeek();
        $endOfWeek = Carbon::now()->endOfWeek();
        $lucroSemana = ['Seg' => 0, 'Ter' => 0, 'Qua' => 0, 'Qui' => 0, 'Sex' => 0, 'Sab' => 0, 'Dom' => 0];
        $vendas = Venda::where('empresa_id', auth()->user()->empresa_id)
            ->whereBetween('created_at', [$startOfWeek, $endOfWeek])
            ->selectRaw('DATE(created_at) as dia, SUM(valor_pago) as lucro_dia')
            ->groupBy('dia')
            ->orderBy('dia', 'asc')
            ->get();
        foreach($vendas as $venda) {
            $diaSemana = Carbon::parse($venda->dia)->format('D');
            switch ($diaSemana) {
                case 'Mon':
                    $lucroSemana['Seg'] = $venda->lucro_dia;
                    break;
                case 'Tue':
                    $lucroSemana['Ter'] = $venda->lucro_dia;
                    break;
                case 'Wed':
                    $lucroSemana['Qua'] = $venda->lucro_dia;
                    break;
                case 'Thu':
                    $lucroSemana['Qui'] = $venda->lucro_dia;
                    break;
                case 'Fri':
                    $lucroSemana['Sex'] = $venda->lucro_dia;
                    break;
                case 'Sat':
                    $lucroSemana['Sab'] = $venda->lucro_dia;
                    break;
                case 'Sun':
                    $lucroSemana['Dom'] = $venda->lucro_dia;
                    break;
            }
        }
        return $lucroSemana;
    }

    public function resumoFinanceiro() // Porcentagem entre vendas pagas e pendentes
    {
        $vendas = Venda::where('empresa_id', auth()->user()->empresa_id)
            ->selectRaw('SUM(valor_pago) as total_pago, SUM(valor_total) as total')
            ->first();
        $resumo = [
            'total' => $vendas->total ?? 0,
            'pago' => $vendas->total_pago ?? 0,
            'pendente' => ($vendas->total ?? 0) - ($vendas->total_pago ?? 0),
        ];
        return $resumo;
    }

    public function resumoMes() {
        $startActualMonth = Carbon::now()->startOfMonth();
        $endActualMonth = Carbon::now()->endOfMonth();
        $startPreviousMonth = Carbon::now()->subMonth()->startOfMonth();
        $endPreviousMonth = Carbon::now()->subMonth()->endOfMonth();

        $totalLucroMesAtual = Venda::where('empresa_id', auth()->user()->empresa_id)
            ->whereBetween('created_at', [$startActualMonth, $endActualMonth])
            ->sum('valor_pago');
        $totalLucroMesAnterior = Venda::where('empresa_id', auth()->user()->empresa_id)
            ->whereBetween('created_at', [$startPreviousMonth, $endPreviousMonth])
            ->sum('valor_pago');
        return [
            'atual' => $totalLucroMesAtual ?? 0,
            'anterior' => $totalLucroMesAnterior ?? 0,
        ];
    }
}
