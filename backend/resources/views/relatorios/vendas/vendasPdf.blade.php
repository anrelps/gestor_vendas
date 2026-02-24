<!DOCTYPE html>
<html lang="pt-BR">
<head>
    <meta charset="UTF-8">
    <title>Relatório de Vendas</title>
    <style>
        * {
            font-family: 'DejaVu Sans', sans-serif;
            box-sizing: border-box;
            margin: 0;
            padding: 0;
        }

        body {
            font-size: 11px;
            color: #1a1a2e;
            background: #ffffff;
        }

        /* ── TOPO DA EMPRESA ─────────────────────────────── */
        .empresa-bar {
            padding: 10px 40px;
            display: table;
            width: 100%;
        }

        .empresa-bar-left {
            display: table-cell;
            vertical-align: middle;
            width: 60%;
        }

        .empresa-bar-right {
            display: table-cell;
            vertical-align: middle;
            text-align: right;
            width: 40%;
        }

        .empresa-logo-area {
            display: table;
        }

        .empresa-logo-wrap {
            display: table-cell;
            vertical-align: middle;
            padding-right: 12px;
        }

        .empresa-logo {
            width: 44px;
            height: 44px;
            border-radius: 6px;
            object-fit: contain;
        }

        .empresa-logo-placeholder {
            width: 44px;
            height: 44px;
            border-radius: 6px;
            border: 2px solid #5b1a8a;
            text-align: center;
            line-height: 40px;
            font-size: 18px;
            font-weight: bold;
            color: #5b1a8a;
        }

        .empresa-info-wrap {
            display: table-cell;
            vertical-align: middle;
        }

        .empresa-nome {
            font-size: 15px;
            font-weight: bold;
            color: #1a1a2e;
        }

        .empresa-slogan {
            font-size: 10px;
            color: #9ca3af;
            margin-top: 1px;
        }

        .empresa-contato {
            font-size: 10px;
            color: #6b7280;
            line-height: 2;
        }

        .empresa-contato strong {
            color: #374151;
            font-weight: bold;
        }

        /* ── HEADER DO RELATÓRIO ─────────────────────────── */
        .header {
            padding: 10px 40px 18px;
            border-bottom: 2px solid #e5e7eb;
            display: table;
            width: 100%;
        }

        .header-left {
            display: table-cell;
            vertical-align: bottom;
        }

        .header-right {
            display: table-cell;
            vertical-align: bottom;
            text-align: right;
        }

        .header h1 {
            font-size: 22px;
            font-weight: bold;
            color: #3b0764;
        }

        .data-geracao {
            font-size: 10px;
            color: #9ca3af;
        }

        /* ── FILTROS ─────────────────────────────────────── */
        .filters {
            margin: 20px 40px;
            padding: 10px 14px;
            border-left: 3px solid #7c3aed;
            background: #f9f5ff;
        }

        .filters-title {
            font-size: 9px;
            font-weight: bold;
            text-transform: uppercase;
            color: #5b1a8a;
            margin-bottom: 5px;
        }

        .filter-item {
            font-size: 10px;
            color: #4b5563;
            line-height: 1.9;
        }

        /* ── CORPO ───────────────────────────────────────── */
        .content {
            padding: 20px 40px 0;
        }

        /* ── VENDA ───────────────────────────────────────── */
        .venda-section {
            margin-bottom: 20px;
            border: 1px solid #d1d5db;
            page-break-inside: avoid;
        }

        /* Cabeçalho da venda: sem fundo escuro, usa borda lateral roxa */
        .venda-header {
            padding: 10px 14px;
            border-left: 4px solid #5b1a8a;
            background: #f9f5ff;
            display: table;
            width: 100%;
        }

        .venda-header-left {
            display: table-cell;
            vertical-align: middle;
        }

        .venda-titulo-text {
            font-size: 12px;
            font-weight: bold;
            color: #3b0764;
        }

        .venda-data {
            font-size: 10px;
            color: #9ca3af;
            margin-top: 2px;
        }

        /* ── META DA VENDA ───────────────────────────────── */
        .venda-meta {
            padding: 12px 16px;
            background: #ffffff;
            border-bottom: 1px solid #f3f4f6;
            display: table;
            width: 100%;
        }

        .meta-cell {
            display: table-cell;
            width: 50%;
            vertical-align: top;
        }

        .meta-label {
            font-size: 9px;
            font-weight: bold;
            text-transform: uppercase;
            color: #9ca3af;
            margin-bottom: 2px;
        }

        .meta-value {
            font-size: 12px;
            font-weight: bold;
            color: #1a1a2e;
        }

        .venda-descricao {
            padding: 8px 16px;
            background: #fafafa;
            border-bottom: 1px solid #f3f4f6;
        }

        .venda-descricao .meta-value {
            font-size: 11px;
            font-weight: normal;
            color: #374151;
        }

        /* ── PRODUTOS ────────────────────────────────────── */
        .produtos-table {
            width: 100%;
            border-collapse: collapse;
        }

        .produtos-table thead tr {
            background: #f5f0ff;
        }

        .produtos-table th {
            padding: 7px 16px;
            text-align: left;
            font-size: 9px;
            font-weight: bold;
            text-transform: uppercase;
            color: #5b1a8a;
            border-bottom: 1px solid #e5e7eb;
        }

        .produtos-table td {
            padding: 8px 16px;
            font-size: 10px;
            color: #374151;
            border-bottom: 1px solid #f3f4f6;
        }

        .produtos-table tr:last-child td {
            border-bottom: none;
        }

        .td-qty {
            text-align: center;
            color: #6b7280;
            font-weight: bold;
        }

        /* ── RODAPÉ DA VENDA ─────────────────────────────── */
        .venda-footer {
            display: table;
            width: 100%;
            border-top: 1px solid #e5e7eb;
        }

        .venda-footer-left {
            display: table-cell;
            padding: 9px 16px;
            vertical-align: middle;
            text-align: left;
        }

        .venda-footer-center {
            display: table-cell;
            padding: 9px 16px;
            vertical-align: middle;
            text-align: left;
        }

        .venda-footer-right {
            display: table-cell;
            padding: 9px 16px;
            text-align: right;
            vertical-align: middle;
            border-left: 1px solid #e5e7eb;
        }

        .footer-label {
            font-size: 9px;
            font-weight: bold;
            text-transform: uppercase;
            color: #9ca3af;
        }

        .footer-pago-label { color: #7c3aed; }

        .footer-valor {
            font-size: 14px;
            font-weight: bold;
            color: #3b0764;
            margin-top: 1px;
        }

        .footer-pago-valor {
            font-size: 12px;
            color: #7c3aed;
        }

        /* ── TOTALIZADOR ─────────────────────────────────── */
        .totalizador {
            margin: 24px 0 0;
            border: 1px solid #d1d5db;
            border-top: 3px solid #5b1a8a;
        }

        .totalizador-header {
            padding: 10px 20px;
            border-bottom: 1px solid #e5e7eb;
        }

        .totalizador-header-label {
            font-size: 9px;
            font-weight: bold;
            text-transform: uppercase;
            color: #5b1a8a;
        }

        .totalizador-body {
            display: table;
            width: 100%;
        }

        .tot-cell {
            display: table-cell;
            width: 33.33%;
            padding: 16px 20px;
            vertical-align: middle;
            border-right: 1px solid #e5e7eb;
        }

        .tot-cell:last-child { border-right: none; }

        .tot-label {
            font-size: 9px;
            font-weight: bold;
            text-transform: uppercase;
            color: #9ca3af;
            margin-bottom: 4px;
        }

        .tot-valor {
            font-size: 19px;
            font-weight: bold;
        }

        .tot-valor.geral    { color: #3b0764; }
        .tot-valor.pago     { color: #5b1a8a; }
        .tot-valor.pendente { color: #7c3aed; }

        .tot-qtd {
            padding: 10px 20px;
            text-align: center;
            font-size: 10px;
            color: #9ca3af;
            border-top: 1px solid #e5e7eb;
        }

        /* ── FOOTER ──────────────────────────────────────── */
        .footer-page {
            margin: 28px 40px 28px;
            padding-top: 12px;
            border-top: 1px solid #e5e7eb;
            display: table;
            width: calc(100% - 80px);
        }

        .footer-left {
            display: table-cell;
            vertical-align: middle;
        }

        .footer-right {
            display: table-cell;
            vertical-align: middle;
            text-align: right;
        }

        .footer-brand {
            font-size: 9px;
            color: #9ca3af;
        }

        .footer-brand span {
            color: #7c3aed;
            font-weight: bold;
        }

        .footer-confidential {
            font-size: 9px;
            color: #d1d5db;
        }

        /* ── EMPTY STATE ─────────────────────────────────── */
        .sem-vendas {
            padding: 60px 40px;
            text-align: center;
            color: #9ca3af;
            font-size: 13px;
        }

        /* ── PRINT ───────────────────────────────────────── */
        @media print {
            .venda-section  { page-break-inside: avoid; }
            .totalizador    { page-break-inside: avoid; }
        }
    </style>
</head>
<body>

    {{--
    ╔══════════════════════════════════════════════════════════╗
    ║  DADOS DA EMPRESA                                        ║
    ║  Preencha via $empresa ou edite os fallbacks abaixo      ║
    ╚══════════════════════════════════════════════════════════╝
    --}}
    @php
        $nomeEmpresa  = $empresa->nome      ?? 'Nome da Empresa';
        $telefone     = $empresa->telefone  ?? '(00) 90000-0000';
        $emailEmpresa = $empresa->email     ?? 'contato@empresa.com.br';
        $logoUrl      = $empresa->logo_url  ?? null;
        $inicialLogo  = strtoupper(substr($nomeEmpresa, 0, 1));
    @endphp

    <!-- TOPO DA EMPRESA -->
    <div class="empresa-bar">
        <div class="empresa-bar-left">
            <div class="empresa-logo-area">
                <div class="empresa-logo-wrap">
                    @if($logoUrl)
                        <img src="{{ public_path('storage/'.$empresa->logo_path) }}" alt="Logo" class="empresa-logo">
                    @else
                        <div class="empresa-logo-placeholder">{{ $inicialLogo }}</div>
                    @endif
                </div>
                <div class="empresa-info-wrap">
                    <div class="empresa-nome">{{ $nomeEmpresa }}</div>
                    <div class="footer-brand">Gerado por <span>uselumenz.com</span></div>
                </div>
            </div>
        </div>
        <div class="empresa-bar-right">
            <div class="empresa-contato">
                <strong>Tel:</strong> {{ $telefone }}<br>
                <strong>Email:</strong> {{ $emailEmpresa }}
            </div>
        </div>
    </div>

    <!-- HEADER DO RELATÓRIO -->
    <div class="header">
        <div class="header-left">
            <h1>Relatório de Vendas</h1>
        </div>
        <div class="header-right">
            <div class="data-geracao">Gerado em {{ now()->format('d/m/Y H:i') }}</div>
        </div>
    </div>

    <!-- FILTROS -->
    @if(count($filters) > 0)
    <div class="filters">
        <div class="filters-title">Filtros Aplicados</div>
        @isset($filters['valor_min'])
            <div class="filter-item">Valor mínimo: <strong>R$ {{ number_format($filters['valor_min'], 2, ',', '.') }}</strong></div>
        @endisset
        @isset($filters['valor_max'])
            <div class="filter-item">Valor máximo: <strong>R$ {{ number_format($filters['valor_max'], 2, ',', '.') }}</strong></div>
        @endisset
        @isset($filters['data_min'])
            <div class="filter-item">Data inicial: <strong>{{ \Carbon\Carbon::parse($filters['data_min'])->format('d/m/Y') }}</strong></div>
        @endisset
        @isset($filters['data_max'])
            <div class="filter-item">Data final: <strong>{{ \Carbon\Carbon::parse($filters['data_max'])->format('d/m/Y') }}</strong></div>
        @endisset
        @if(isset($filters['pendencias']) && $filters['pendencias'] == 1)
            <div class="filter-item">Exibindo apenas vendas com pendências financeiras</div>
        @endif
        @if(isset($filters['vendas_ids']) && count($filters['vendas_ids']) > 0)
            <div class="filter-item">{{$vendas->implode('titulo', ', ')}}</div>
        @endif
    </div>
    @endif

    <!-- VENDAS -->
    <div class="content">
        @if($vendas->count() > 0)
            @foreach($vendas as $venda)
            <div class="venda-section">

                <div class="venda-header">
                    <div class="venda-header-left">
                        <div class="venda-titulo-text">{{ $venda->titulo }}</div>
                        <div class="venda-data">{{ $venda->created_at->format('d/m/Y H:i') }}</div>
                    </div>
                </div>

                <div class="venda-meta">
                    <div class="meta-cell">
                        <div class="meta-label">Cliente</div>
                        <div class="meta-value">{{ $venda->cliente->nome ?? 'Não informado' }}</div>
                    </div>
                </div>

                @if($venda->descricao)
                <div class="venda-descricao">
                    <div class="meta-label">Descrição</div>
                    <div class="meta-value">{{ $venda->descricao }}</div>
                </div>
                @endif

                @if($venda->detalhesVendas->count() > 0)
                <table class="produtos-table">
                    <thead>
                        <tr>
                            <th style="width: 75%;">Produto / Serviço</th>
                            <th style="width: 25%; text-align: center;">Qtd.</th>
                        </tr>
                    </thead>
                    <tbody>
                        @foreach($venda->detalhesVendas as $detalhe)
                        <tr>
                            <td>{{ $detalhe->produto->titulo ?? 'Produto' }}</td>
                            <td class="td-qty">{{ $detalhe->quantidade }}</td>
                        </tr>
                        @endforeach
                    </tbody>
                </table>
                @endif

                <div class="venda-footer">
                    <div class="venda-footer-left">
                        <div class="footer-label">Valor Total</div>
                        <div class="footer-valor">R$ {{ number_format($venda->valor_total, 2, ',', '.') }}</div>
                    </div>
                    <div class="venda-footer-center">
                        <div class="footer-label footer-pago-label">Valor Pago</div>
                        <div class="footer-valor footer-pago-valor">R$ {{ number_format($venda->valor_pago, 2, ',', '.') }}</div>
                    </div>
                    <div class="venda-footer-right">
                        <div class="footer-label">Total Restante</div>
                        <div class="footer-valor">R$ {{ number_format(($venda->valor_total - $venda->valor_pago), 2, ',', '.') }}</div>
                    </div>
                </div>

            </div>
            @endforeach
        @else
            <div class="sem-vendas">
                Nenhuma venda encontrada com os filtros aplicados.
            </div>
        @endif
    </div>
</body>
</html>
