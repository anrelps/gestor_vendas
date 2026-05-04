<?php

namespace App\Services;

use App\Models\Venda;
use Carbon\Carbon;

class ChartService {

    public function lucroSemana() {
        // ISODOW: 1=Segunda, 2=Terça, 3=Quarta, 4=Quinta, 5=Sexta, 6=Sábado, 7=Domingo
        $keys = [1 => 'Seg', 2 => 'Ter', 3 => 'Qua', 4 => 'Qui', 5 => 'Sex', 6 => 'Sab', 7 => 'Dom'];
        $lucroSemana = array_fill_keys(array_values($keys), 0);

        $start = now()->startOfWeek()->format('Y-m-d H:i:s');
        $end   = now()->endOfWeek()->format('Y-m-d H:i:s');

        $rows = Venda::where('empresa_id', auth()->user()->empresa_id)
            ->whereRaw("created_at BETWEEN ? AND ?", [$start, $end])
            ->selectRaw('EXTRACT(ISODOW FROM created_at)::int AS dia_num, SUM(valor_pago) AS lucro_dia')
            ->groupByRaw('EXTRACT(ISODOW FROM created_at)')
            ->get();

        foreach ($rows as $row) {
            $key = $keys[(int) $row->dia_num] ?? null;
            if ($key) {
                $lucroSemana[$key] = (float) $row->lucro_dia;
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
