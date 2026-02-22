<!DOCTYPE html>
<html lang="pt-BR">
<head>
    <meta charset="UTF-8">
    <title>Detalhes da Venda - {{ $venda->titulo }}</title>
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
            padding: 20px 40px;
            border-bottom: 1px solid #e5e7eb;
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

        /* ── HEADER DO DOCUMENTO ─────────────────────────── */
        .header {
            padding: 22px 40px 18px;
            /*border-bottom: 2px solid #5b1a8a;*/
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

        .header-sub {
            font-size: 12px;
            color: #5b1a8a;
            margin-top: 3px;
            font-weight: bold;
        }

        .data-geracao {
            font-size: 10px;
            color: #9ca3af;
        }

        /* ── BLOCOS DE INFORMAÇÃO ────────────────────────── */
        .info-box {
            margin: 20px 40px 0;
            border: 1px solid #d1d5db;
            page-break-inside: avoid;
        }

        .info-box-header {
            padding: 9px 16px;
            border-left: 4px solid #5b1a8a;
            background: #f9f5ff;
            font-size: 10px;
            font-weight: bold;
            text-transform: uppercase;
            color: #3b0764;
        }

        .info-box-content {
            padding: 16px;
            background: #ffffff;
        }

        /* ── GRID DE INFORMAÇÕES ─────────────────────────── */
        .info-grid {
            display: table;
            width: 100%;
        }

        .info-col {
            display: table-cell;
            vertical-align: top;
            width: 50%;
            padding-right: 20px;
        }

        .info-col:last-child {
            padding-right: 0;
        }

        .info-col-third {
            display: table-cell;
            vertical-align: top;
            width: 33.33%;
            padding-right: 16px;
        }

        .info-col-third:last-child {
            padding-right: 0;
        }

        .info-label {
            font-size: 9px;
            font-weight: bold;
            text-transform: uppercase;
            color: #9ca3af;
            margin-bottom: 3px;
        }

        .info-value {
            font-size: 12px;
            font-weight: bold;
            color: #1a1a2e;
        }

        /* ── DESCRIÇÃO ───────────────────────────────────── */
        .descricao-box {
            margin-top: 14px;
            padding: 10px 14px;
            border-left: 3px solid #7c3aed;
            background: #f9f5ff;
        }

        .descricao-label {
            font-size: 9px;
            font-weight: bold;
            text-transform: uppercase;
            color: #9ca3af;
            margin-bottom: 4px;
        }

        .descricao-texto {
            font-size: 11px;
            color: #374151;
            line-height: 1.6;
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
            padding: 8px 14px;
            text-align: left;
            font-size: 9px;
            font-weight: bold;
            text-transform: uppercase;
            color: #5b1a8a;
            border-bottom: 1px solid #e5e7eb;
        }

        .produtos-table td {
            padding: 9px 14px;
            font-size: 10px;
            color: #374151;
            border-bottom: 1px solid #f3f4f6;
        }

        .produtos-table tr:last-child td {
            border-bottom: none;
        }

        .text-right  { text-align: right; }
        .text-center { text-align: center; }

        .td-num {
            color: #9ca3af;
            font-size: 10px;
        }

        .td-qty {
            text-align: center;
            font-weight: 600;
            color: #374151;
        }

        /* ── RESUMO FINANCEIRO ───────────────────────────── */
        .resumo-table {
            width: 100%;
            border-collapse: collapse;
        }

        .resumo-table td {
            padding: 9px 0;
            border-bottom: 1px solid #f3f4f6;
            font-size: 11px;
        }

        .resumo-table tr:last-child td {
            border-bottom: none;
            padding-top: 12px;
            /*border-top: 2px solid #5b1a8a;*/
            border-top: 2px solid #e5e7eb;
        }

        .resumo-label {
            color: #6b7280;
        }

        .resumo-valor {
            font-weight: bold;
            color: #1a1a2e;
            text-align: right;
        }

        .resumo-total-label {
            font-size: 13px;
            font-weight: bold;
            color: #3b0764;
        }

        .resumo-total-valor {
            font-size: 18px;
            font-weight: bold;
            color: #3b0764;
            text-align: right;
        }

        /* ── FOOTER ──────────────────────────────────────── */
        .footer-page {
            margin: 28px 40px 28px;
            padding-top: 12px;
            /*border-top: 1px solid #e5e7eb;*/
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

        /* ── PRINT ───────────────────────────────────────── */
        @media print {
            .info-box { page-break-inside: avoid; }
        }
    </style>
</head>
<body>

    @php
        $nomeEmpresa  = $venda->empresa->nome      ?? 'Nome da Empresa';
        $telefone     = $venda->empresa->telefone  ?? '(00) 90000-0000';
        $emailEmpresa = $venda->empresa->email     ?? 'contato@empresa.com.br';
        $logoUrl      = $venda->empresa->logo_url  ?? null;
        $inicialLogo  = strtoupper(substr($nomeEmpresa, 0, 1));
    @endphp

    <!-- TOPO DA EMPRESA -->
    <div class="empresa-bar">
        <div class="empresa-bar-left">
            <div class="empresa-logo-area">
                <div class="empresa-logo-wrap">
                    @if($logoUrl)
                        <img src="{{ public_path('storage/'.$venda->empresa->logo_path) }}" alt="Logo" class="empresa-logo">
                    @else
                        <div class="empresa-logo-placeholder">{{ $inicialLogo }}</div>
                    @endif
                </div>
                <div class="empresa-info-wrap">
                    <div class="empresa-nome">{{ $nomeEmpresa }}</div>
                    <div class="empresa-slogan">Sistema de Gestão Lumenz</div>
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

    <!-- HEADER DO DOCUMENTO -->
    <div class="header">
        <div class="header-left">
            <h1>{{ $venda->titulo }}</h1>
            <!--<div class="header-sub">Venda Titulo</div>-->
        </div>
        <div class="header-right">
            <div class="data-geracao">Gerado em {{ now()->format('d/m/Y H:i') }}</div>
        </div>
    </div>

    <!-- INFORMAÇÕES GERAIS -->
    <div class="info-box">
        <!--<div class="info-box-header">Informações Gerais</div>-->
        <div class="info-box-content">
            <div class="info-grid">
                <div class="info-col-third">
                    <div class="info-label">Data da Venda</div>
                    <div class="info-value">{{ $venda->created_at->format('d/m/Y H:i') }}</div>
                </div>
                <div class="info-col-third">
                    <div class="info-label">Cliente</div>
                    <div class="info-value">{{ $venda->cliente->nome ?? 'Não informado' }}</div>
                </div>
                <div class="info-col-third">
                    <div class="info-label">Valor Total</div>
                    <div class="info-value">R$ {{ number_format($venda->valor_total, 2, ',', '.') }}</div>
                </div>
            </div>

            @if($venda->descricao)
            <div class="descricao-box">
                <div class="descricao-label">Descrição</div>
                <div class="descricao-texto">{{ $venda->descricao }}</div>
            </div>
            @endif
        </div>
    </div>

    <!-- PRODUTOS E SERVIÇOS -->
    <div class="info-box">
        <!--<div class="info-box-header">Produtos e Serviços</div>-->
        @if($venda->detalhesVendas->count() > 0)
        <table class="produtos-table">
            <thead>
                <tr>
                    <th style="width: 80%;">Produto / Serviço</th>
                    <th style="width: 20%; text-align: center;">Qtd.</th>
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
        @else
        <div style="padding: 24px; text-align: center; color: #9ca3af; font-size: 11px;">
            Nenhum produto ou serviço registrado nesta venda.
        </div>
        @endif
    </div>

    <!-- RESUMO FINANCEIRO -->
    <div class="info-box">
        <!--<div class="info-box-header">Resumo Financeiro</div>-->
        <div class="info-box-content">
            <table class="resumo-table">
                <tr>
                    <td class="resumo-label">Valor Total da Venda</td>
                    <td class="resumo-valor">R$ {{ number_format($venda->valor_total, 2, ',', '.') }}</td>
                </tr>
                <tr>
                    <td class="resumo-label">Valor Pago</td>
                    <td class="resumo-valor">R$ {{ number_format($venda->valor_pago, 2, ',', '.') }}</td>
                </tr>
                <tr>
                    <td class="resumo-total-label">Saldo Restante</td>
                    <td class="resumo-total-valor">R$ {{ number_format($venda->valor_total - $venda->valor_pago, 2, ',', '.') }}</td>
                </tr>
            </table>
        </div>
    </div>

    <!-- FOOTER -->
    <div class="footer-page">
        <div class="footer-left">
            <div class="footer-brand">Gerado por <span>uselumenz.com</span></div>
        </div>
        <div class="footer-right">
            <div class="footer-confidential">{{$nomeEmpresa}}</div>
        </div>
    </div>

</body>
</html>
