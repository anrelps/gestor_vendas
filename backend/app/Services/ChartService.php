<?php

namespace App\Services;

use App\Models\Venda;
use Carbon\Carbon;

class ChartService {

    public function lucroSemana() {
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

    public function resumoFinanceiro()
    {
        $start = Carbon::now()->startOfMonth();
        $end   = Carbon::now()->endOfMonth();

        $mes = Venda::where('empresa_id', auth()->user()->empresa_id)
            ->whereBetween('created_at', [$start, $end])
            ->selectRaw('SUM(valor_pago) as total_pago, SUM(valor_total) as total')
            ->first();

        $geral = Venda::where('empresa_id', auth()->user()->empresa_id)
            ->selectRaw('SUM(valor_total) as total, SUM(valor_pago) as pago')
            ->first();

        return [
            'total'          => $mes->total ?? 0,
            'pago'           => $mes->total_pago ?? 0,
            'pendente'       => ($mes->total ?? 0) - ($mes->total_pago ?? 0),
            'pendente_total' => ($geral->total ?? 0) - ($geral->pago ?? 0),
        ];
    }

    public function resumoMes() {
        $startAtual    = Carbon::now()->startOfMonth();
        $endAtual      = Carbon::now()->endOfMonth();
        $startAnterior = Carbon::now()->subMonth()->startOfMonth();
        $endAnterior   = Carbon::now()->subMonth()->endOfMonth();
        $startRetrasado = Carbon::now()->subMonths(2)->startOfMonth();
        $endRetrasado   = Carbon::now()->subMonths(2)->endOfMonth();

        $atual = Venda::where('empresa_id', auth()->user()->empresa_id)
            ->whereBetween('created_at', [$startAtual, $endAtual])
            ->sum('valor_pago');

        $anterior = Venda::where('empresa_id', auth()->user()->empresa_id)
            ->whereBetween('created_at', [$startAnterior, $endAnterior])
            ->sum('valor_pago');

        $retrasado = Venda::where('empresa_id', auth()->user()->empresa_id)
            ->whereBetween('created_at', [$startRetrasado, $endRetrasado])
            ->sum('valor_pago');

        return [
            'atual'     => $atual ?? 0,
            'anterior'  => $anterior ?? 0,
            'retrasado' => $retrasado ?? 0,
        ];
    }
}
