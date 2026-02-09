<!DOCTYPE html>
<html lang="pt-BR">
<head>
    <meta charset="UTF-8">
    <title>Relatório de Vendas</title>
    <style>
        body {
            font-family: Arial, sans-serif;
            font-size: 11px;
            color: #1a1a1a;
            margin: 0;
            padding: 20px;
        }

        .header {
            background-color: #4a0d66;
            color: white;
            padding: 15px;
            margin-bottom: 20px;
        }

        .header h1 {
            font-size: 20px;
            margin: 0 0 5px 0;
        }

        .header .info {
            font-size: 11px;
            opacity: 0.9;
        }

        .filters {
            background-color: #f2f2f2;
            padding: 10px;
            margin-bottom: 15px;
            border-left: 3px solid #6922a1;
        }

        .filters strong {
            color: #4a0d66;
            font-size: 12px;
        }

        .filter-item {
            font-size: 10px;
            color: #6b7280;
            margin-top: 5px;
        }

        table {
            width: 100%;
            border-collapse: collapse;
            margin-bottom: 10px;
        }

        .venda-section {
            margin-bottom: 20px;
            border: 1px solid #bfbfbf;
            page-break-inside: avoid;
        }

        .venda-titulo {
            background-color: #1e3a5f;
            color: white;
            padding: 10px;
        }

        .venda-titulo table {
            margin: 0;
        }

        .venda-titulo td {
            color: white;
            font-size: 12px;
            font-weight: bold;
        }

        .status-pago {
            background-color: #22c55e;
            color: white;
            padding: 3px 8px;
            border-radius: 3px;
            font-size: 9px;
            font-weight: bold;
        }

        .status-pendente {
            background-color: #f59e0b;
            color: white;
            padding: 3px 8px;
            border-radius: 3px;
            font-size: 9px;
            font-weight: bold;
        }

        .venda-info {
            padding: 10px;
            background-color: white;
        }

        .venda-info table td {
            padding: 5px;
            vertical-align: top;
        }

        .label {
            color: #6b7280;
            font-size: 10px;
        }

        .value {
            color: #1a1a1a;
            font-weight: bold;
            font-size: 11px;
        }

        .produtos-table {
            width: 100%;
            background-color: #fafafa;
            margin: 0;
        }

        .produtos-table th {
            background-color: #6922a1;
            color: white;
            padding: 8px;
            text-align: left;
            font-size: 11px;
        }

        .produtos-table td {
            padding: 6px 8px;
            border-bottom: 1px solid #e5e5e5;
            font-size: 10px;
        }

        .venda-total {
            background-color: #7c3aae;
            color: white;
            padding: 10px;
            text-align: right;
        }

        .venda-total .label-total {
            font-size: 10px;
            opacity: 0.9;
        }

        .venda-total .valor-total {
            font-size: 16px;
            font-weight: bold;
            margin-top: 3px;
        }

        .totalizador {
            background-color: #4a0d66;
            color: white;
            padding: 15px;
            text-align: right;
            margin-top: 20px;
        }

        .totalizador .label-geral {
            font-size: 12px;
        }

        .totalizador .valor-geral {
            font-size: 24px;
            font-weight: bold;
            margin: 5px 0;
        }

        .totalizador .qtd {
            font-size: 11px;
            opacity: 0.9;
        }

        .footer-page {
            margin-top: 30px;
            padding-top: 10px;
            border-top: 1px solid #bfbfbf;
            text-align: center;
            color: #6b7280;
            font-size: 9px;
        }

        .sem-vendas {
            text-align: center;
            padding: 40px;
            color: #6b7280;
            font-size: 14px;
        }
    </style>
</head>
<body>
    <div class="header">
        <h1>Relatório de Vendas</h1>
        <div class="info">{{ $empresa->nome ?? 'Empresa' }}</div>
        <div class="info">Gerado em {{ now()->format('d/m/Y H:i') }}</div>
    </div>

    @if(count($filters) > 0)
    <div class="filters">
        <strong>Filtros Aplicados:</strong>
        @isset($filters['valor_min'])
            <div class="filter-item">• Valor mínimo: R$ {{ number_format($filters['valor_min'], 2, ',', '.') }}</div>
        @endisset
        @isset($filters['valor_max'])
            <div class="filter-item">• Valor máximo: R$ {{ number_format($filters['valor_max'], 2, ',', '.') }}</div>
        @endisset
        @isset($filters['data_min'])
            <div class="filter-item">• Data inicial: {{ \Carbon\Carbon::parse($filters['data_min'])->format('d/m/Y') }}</div>
        @endisset
        @isset($filters['data_max'])
            <div class="filter-item">• Data final: {{ \Carbon\Carbon::parse($filters['data_max'])->format('d/m/Y') }}</div>
        @endisset
        @if(isset($filters['pendencias']) && $filters['pendencias'] == 1)
            <div class="filter-item">• Apenas vendas com pendências</div>
        @endif
    </div>
    @endif

    @if($vendas->count() > 0)
        @foreach($vendas as $venda)
        <div class="venda-section">
            <!-- Cabeçalho da Venda -->
            <div class="venda-titulo">
                <table>
                    <tr>
                        <td style="width: 70%;">
                            {{ $venda->titulo }}<br>
                            <span style="font-size: 10px; font-weight: normal; opacity: 0.9;">
                                {{ $venda->created_at->format('d/m/Y H:i') }}
                            </span>
                        </td>
                        <td style="width: 30%; text-align: right;">
                            @if($venda->valor_pago >= $venda->valor_total)
                                <span class="status-pago">PAGO</span>
                            @else
                                <span class="status-pendente">PENDENTE</span>
                            @endif
                        </td>
                    </tr>
                </table>
            </div>

            <!-- Informações da Venda -->
            <div class="venda-info">
                <table>
                    <tr>
                        <td style="width: 50%;">
                            <div class="label">Cliente:</div>
                            <div class="value">{{ $venda->cliente->nome ?? 'Não informado' }}</div>
                        </td>
                        <td style="width: 50%;">
                            <div class="label">Valor Pago:</div>
                            <div class="value">R$ {{ number_format($venda->valor_pago, 2, ',', '.') }}</div>
                        </td>
                    </tr>
                    @if($venda->descricao)
                    <tr>
                        <td colspan="2" style="padding-top: 8px;">
                            <div class="label">Descrição:</div>
                            <div class="value">{{ $venda->descricao }}</div>
                        </td>
                    </tr>
                    @endif
                </table>
            </div>

            <!-- Lista de Produtos -->
            @if($venda->detalhesVendas->count() > 0)
            <table class="produtos-table">
                <thead>
                    <tr>
                        <th style="width: 70%;">Produto/Serviço</th>
                        <th style="width: 30%; text-align: center;">Quantidade</th>
                    </tr>
                </thead>
                <tbody>
                    @foreach($venda->detalhesVendas as $detalhe)
                    <tr>
                        <td>{{ $detalhe->produto->titulo ?? 'Produto' }}</td>
                        <td style="text-align: center;">{{ $detalhe->quantidade }}</td>
                    </tr>
                    @endforeach
                </tbody>
            </table>
            @endif

            <!-- Total da Venda -->
            <div class="venda-total">
                <div class="label-total">Valor Total da Venda</div>
                <div class="valor-total">R$ {{ number_format($venda->valor_total, 2, ',', '.') }}</div>
            </div>
        </div>
        @endforeach

        <!-- Totalizador Geral -->
        <div class="totalizador">
            <div class="label-geral">TOTAL GERAL</div>
            <div class="valor-geral">R$ {{ number_format($vendas->sum('valor_total'), 2, ',', '.') }}</div>
            <div class="qtd">{{ $vendas->count() }} {{ $vendas->count() == 1 ? 'venda' : 'vendas' }}</div>
        </div>
    @else
        <div class="sem-vendas">
            Nenhuma venda encontrada com os filtros aplicados.
        </div>
    @endif

    <div class="footer-page">
        Documento gerado pelo sistema Lumenz.com
    </div>
</body>
</html>
