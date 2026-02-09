<!DOCTYPE html>
<html lang="pt-BR">
<head>
    <meta charset="UTF-8">
    <title>Detalhes da Venda #{{ $venda->id }}</title>
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
            padding: 20px;
            margin-bottom: 25px;
        }

        .header h1 {
            font-size: 22px;
            margin: 0 0 5px 0;
        }

        .header .numero-venda {
            font-size: 14px;
            opacity: 0.9;
            margin-top: 5px;
        }

        .info-box {
            border: 1px solid #bfbfbf;
            margin-bottom: 20px;
            page-break-inside: avoid;
        }

        .info-box-header {
            background-color: #1e3a5f;
            color: white;
            padding: 10px;
            font-size: 13px;
            font-weight: bold;
        }

        .info-box-content {
            padding: 15px;
            background-color: white;
        }

        table {
            width: 100%;
            border-collapse: collapse;
        }

        .info-table td {
            padding: 8px 5px;
            vertical-align: top;
        }

        .info-label {
            color: #6b7280;
            font-size: 10px;
            margin-bottom: 3px;
        }

        .info-value {
            color: #1a1a1a;
            font-weight: bold;
            font-size: 12px;
        }

        .status-badge {
            display: inline-block;
            padding: 5px 12px;
            border-radius: 3px;
            font-size: 11px;
            font-weight: bold;
        }

        .status-pago {
            background-color: #22c55e;
            color: white;
        }

        .status-pendente {
            background-color: #f59e0b;
            color: white;
        }

        .produtos-table {
            width: 100%;
            margin: 0;
        }

        .produtos-table th {
            background-color: #6922a1;
            color: white;
            padding: 10px 8px;
            text-align: left;
            font-size: 11px;
            font-weight: bold;
        }

        .produtos-table td {
            padding: 10px 8px;
            border-bottom: 1px solid #e5e5e5;
            font-size: 11px;
        }

        .produtos-table tr:last-child td {
            border-bottom: none;
        }

        .text-right {
            text-align: right;
        }

        .text-center {
            text-align: center;
        }

        .resumo-financeiro {
            background-color: #f9fafb;
            padding: 15px;
            margin-top: 10px;
        }

        .resumo-line {
            padding: 8px 0;
            border-bottom: 1px dashed #d1d5db;
        }

        .resumo-line:last-child {
            border-bottom: none;
            padding-top: 12px;
            margin-top: 5px;
            border-top: 2px solid #4a0d66;
        }

        .resumo-label {
            color: #6b7280;
            font-size: 11px;
        }

        .resumo-valor {
            font-size: 12px;
            font-weight: bold;
            color: #1a1a1a;
        }

        .resumo-total-label {
            color: #4a0d66;
            font-size: 13px;
            font-weight: bold;
        }

        .resumo-total-valor {
            color: #4a0d66;
            font-size: 18px;
            font-weight: bold;
        }

        .alert-pendente {
            background-color: #fef3c7;
            border-left: 4px solid #f59e0b;
            padding: 12px;
            margin: 15px 0;
        }

        .alert-pendente strong {
            color: #92400e;
            font-size: 12px;
        }

        .alert-pendente p {
            color: #78350f;
            font-size: 11px;
            margin: 5px 0 0 0;
        }

        .footer-page {
            margin-top: 30px;
            padding-top: 10px;
            border-top: 1px solid #bfbfbf;
            text-align: center;
            color: #6b7280;
            font-size: 9px;
        }

        .descricao-box {
            background-color: #f9fafb;
            padding: 12px;
            border-left: 3px solid #6922a1;
            margin-top: 10px;
        }

        .descricao-label {
            color: #6b7280;
            font-size: 10px;
            font-weight: bold;
            margin-bottom: 5px;
        }

        .descricao-texto {
            color: #1a1a1a;
            font-size: 11px;
            line-height: 1.5;
        }
    </style>
</head>
<body>
    <!-- Cabeçalho -->
    <div class="header">
        <h1>Detalhes da Venda</h1>
        <div class="numero-venda">Venda #{{ $venda->id }} - {{ $venda->titulo }}</div>
        <div class="numero-venda" style="font-size: 11px;">
            {{ $venda->empresa->nome ?? 'Empresa' }} | Gerado em {{ now()->format('d/m/Y H:i') }}
        </div>
    </div>

    <!-- Informações Principais -->
    <div class="info-box">
        <div class="info-box-header">Informações Gerais</div>
        <div class="info-box-content">
            <table class="info-table">
                <tr>
                    <td style="width: 33%;">
                        <div class="info-label">Data da Venda</div>
                        <div class="info-value">{{ $venda->created_at->format('d/m/Y H:i') }}</div>
                    </td>
                    <td style="width: 33%;">
                        <div class="info-label">Cliente</div>
                        <div class="info-value">{{ $venda->cliente->nome ?? 'Não informado' }}</div>
                    </td>
                    <td style="width: 34%;">
                        <div class="info-label">Status do Pagamento</div>
                        <div class="info-value">
                            @if($venda->valor_pago >= $venda->valor_total)
                                <span class="status-badge status-pago">PAGO</span>
                            @else
                                <span class="status-badge status-pendente">PENDENTE</span>
                            @endif
                        </div>
                    </td>
                </tr>
            </table>

            @if($venda->descricao)
            <div class="descricao-box">
                <div class="descricao-label">Descrição:</div>
                <div class="descricao-texto">{{ $venda->descricao }}</div>
            </div>
            @endif
        </div>
    </div>

    <!-- Produtos/Serviços -->
    <div class="info-box">
        <div class="info-box-header">Produtos e Serviços</div>
        <div class="info-box-content" style="padding: 0;">
            @if($venda->detalhesVendas->count() > 0)
            <table class="produtos-table">
                <thead>
                    <tr>
                        <th style="width: 10%; text-align: center;">#</th>
                        <th style="width: 45%;">Produto/Serviço</th>
                        <th style="width: 15%; text-align: center;">Qtd.</th>
                        <th style="width: 15%; text-align: right;">Valor Unit.</th>
                        <th style="width: 15%; text-align: right;">Subtotal</th>
                    </tr>
                </thead>
                <tbody>
                    @foreach($venda->detalhesVendas as $index => $detalhe)
                    <tr>
                        <td class="text-center">{{ $index + 1 }}</td>
                        <td>{{ $detalhe->produto->titulo ?? 'Produto' }}</td>
                        <td class="text-center">{{ $detalhe->quantidade }}</td>
                        <td class="text-right">R$ {{ number_format($detalhe->valor, 2, ',', '.') }}</td>
                        <td class="text-right">
                            R$ {{ number_format($detalhe->quantidade * $detalhe->valor, 2, ',', '.') }}
                        </td>
                    </tr>
                    @endforeach
                </tbody>
            </table>
            @else
            <div style="padding: 20px; text-align: center; color: #6b7280;">
                Nenhum produto ou serviço registrado nesta venda.
            </div>
            @endif
        </div>
    </div>

    <!-- Resumo Financeiro -->
    <div class="info-box">
        <div class="info-box-header">Resumo Financeiro</div>
        <div class="info-box-content">
            <div class="resumo-financeiro">
                <table style="width: 100%;">
                    <tr class="resumo-line">
                        <td class="resumo-label">Valor Total da Venda:</td>
                        <td class="resumo-valor text-right">R$ {{ number_format($venda->valor_total, 2, ',', '.') }}</td>
                    </tr>
                    <tr class="resumo-line">
                        <td class="resumo-label">Valor Pago:</td>
                        <td class="resumo-valor text-right">R$ {{ number_format($venda->valor_pago, 2, ',', '.') }}</td>
                    </tr>
                    <tr class="resumo-line">
                        <td class="resumo-total-label">Saldo Restante:</td>
                        <td class="resumo-total-valor text-right">
                            R$ {{ number_format($venda->valor_total - $venda->valor_pago, 2, ',', '.') }}
                        </td>
                    </tr>
                </table>
            </div>

            @if($venda->valor_pago < $venda->valor_total)
            <div class="alert-pendente">
                <strong>Pagamento Pendente</strong>
                <p>
                    Esta venda possui um saldo pendente de
                    <strong>R$ {{ number_format($venda->valor_total - $venda->valor_pago, 2, ',', '.') }}</strong>
                </p>
            </div>
            @endif
        </div>
    </div>

    <div class="footer-page">
        Documento gerado automaticamente pelo sistema Lumenz.com em {{ now()->format('d/m/Y H:i:s') }}
    </div>
</body>
</html>
