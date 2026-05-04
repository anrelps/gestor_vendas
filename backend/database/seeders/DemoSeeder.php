<?php

namespace Database\Seeders;

use App\Services\DemoService;
use Illuminate\Database\Seeder;

class DemoSeeder extends Seeder
{
    public function run(): void
    {
        (new DemoService())->createSession();
    }

    // Código original mantido abaixo apenas como referência histórica
    private function runLegacy(): void
    {
        // ── Empresa ──────────────────────────────────────────────
        $empresa = Empresa::create([
            'nome'                   => 'Pixel & Code Studio',
            'email'                  => 'contato@pixelcode.com.br',
            'telefone'               => '(11) 99284-7731',
            'assinatura_ativa'       => true,
            'data_inicio_assinatura' => now()->subMonths(6),
            'data_fim_assinatura'    => now()->addYear(),
        ]);

        // ── Usuário demo ─────────────────────────────────────────
        User::create([
            'empresa_id' => $empresa->id,
            'nome'       => 'Visitante',
            'email'      => 'visitante@demo.com',
            'password'   => Hash::make('visitante123'),
            'telefone'   => '(11) 99000-0000',
        ]);

        // ── Produtos ─────────────────────────────────────────────
        $produtos = collect([
            ['titulo' => 'Landing Page',              'descricao' => 'Página de vendas otimizada para conversão.',             'valor' => 2500.00],
            ['titulo' => 'Site Institucional',        'descricao' => 'Site completo com até 6 páginas e painel admin.',        'valor' => 5800.00],
            ['titulo' => 'Loja Virtual (E-commerce)', 'descricao' => 'Plataforma de vendas online com pagamento integrado.',   'valor' => 12000.00],
            ['titulo' => 'App Mobile',                'descricao' => 'Aplicativo para iOS e Android com painel de gestão.',    'valor' => 22000.00],
            ['titulo' => 'Sistema Web Sob Medida',    'descricao' => 'Sistema interno personalizado para a necessidade do cliente.', 'valor' => 18500.00],
            ['titulo' => 'Identidade Visual',         'descricao' => 'Logo, paleta de cores, tipografia e manual de marca.',   'valor' => 3200.00],
            ['titulo' => 'Manutenção Mensal',         'descricao' => 'Suporte técnico, atualizações e backups mensais.',       'valor' => 890.00],
            ['titulo' => 'SEO & Marketing Digital',   'descricao' => 'Otimização para buscadores e gestão de campanhas.',      'valor' => 1400.00],
            ['titulo' => 'Consultoria em TI',         'descricao' => 'Hora de consultoria técnica e estratégica.',             'valor' => 350.00],
            ['titulo' => 'Integração de APIs',        'descricao' => 'Integração com sistemas externos (ERP, CRM, gateways).', 'valor' => 4500.00],
        ])->map(fn($p) => Produto::create([...$p, 'empresa_id' => $empresa->id]));

        // ── Clientes ─────────────────────────────────────────────
        $clientes = collect([
            ['nome' => 'Rafael Mendonça',      'telefone' => '(11) 98821-4433', 'email' => 'rafael@mendoncaadv.com.br'],
            ['nome' => 'Boutique Ella Moda',   'telefone' => '(11) 97754-2210', 'email' => 'compras@ellamoda.com.br'],
            ['nome' => 'Thiago Drummond',      'telefone' => '(21) 99103-8874', 'email' => 'thiago.drummond@gmail.com'],
            ['nome' => 'Clínica VidaPlena',    'telefone' => '(31) 3344-9900',  'email' => 'adm@vidaplena.med.br'],
            ['nome' => 'Fernanda Castelo',     'telefone' => '(41) 99652-1187', 'email' => 'fcastelo@outlook.com'],
            ['nome' => 'GreenTech Soluções',   'telefone' => '(11) 4002-8922',  'email' => 'comercial@greentech.io'],
            ['nome' => 'Bruno Salles',         'telefone' => '(85) 98830-5566', 'email' => 'bruno.salles@hotmail.com'],
            ['nome' => 'Academia FitForce',    'telefone' => '(11) 3210-7755',  'email' => 'contato@fitforce.com.br'],
            ['nome' => 'Isabela Torreão',      'telefone' => '(71) 99241-3308', 'email' => 'isa.torreao@gmail.com'],
            ['nome' => 'Construtora Nordesth', 'telefone' => '(81) 3322-4411',  'email' => 'obras@nordesth.com.br'],
            ['nome' => 'Paulo Henrique Lima',  'telefone' => '(62) 98890-2277', 'email' => 'phlima@empresarial.com'],
            ['nome' => 'Café Origem',          'telefone' => '(11) 99365-8812', 'email' => 'pedidos@cafeorigem.com.br'],
        ])->map(fn($c) => Cliente::create([...$c, 'empresa_id' => $empresa->id]));

        // ── Helper ───────────────────────────────────────────────
        $criarVenda = function (
            Cliente $cliente,
            string $titulo,
            ?string $descricao,
            float $valorTotal,
            float $valorPago,
            string $createdAt,
            array $itens = []
        ) use ($empresa) {
            $venda = Venda::create([
                'empresa_id'  => $empresa->id,
                'cliente_id'  => $cliente->id,
                'titulo'      => $titulo,
                'descricao'   => $descricao,
                'valor_total' => $valorTotal,
                'valor_pago'  => $valorPago,
                'created_at'  => $createdAt,
                'updated_at'  => $createdAt,
            ]);

            foreach ($itens as $item) {
                DetalheVenda::create([
                    'venda_id'              => $venda->id,
                    'produto_id'            => $item['produto_id'],
                    'quantidade'            => $item['quantidade'],
                    'valor'                 => $item['valor'],
                    'porcentagem_desconto'  => $item['desconto'] ?? 0,
                ]);
            }

            if ($valorPago > 0) {
                $isGeneral = $valorPago >= $valorTotal;
                RegistroPagamento::create([
                    'venda_id'    => $venda->id,
                    'type'        => $isGeneral ? 'general' : 'individual',
                    'amount'      => $valorPago,
                    'description' => $isGeneral
                        ? 'Pagamento total da venda.'
                        : 'Pagamento parcial — entrada.',
                    'created_at'  => $createdAt,
                    'updated_at'  => $createdAt,
                ]);
            }

            return $venda;
        };

        [$rafael, $boutique, $thiago, $clinica, $fernanda,
         $greentech, $bruno, $academia, $isabela, $construtora,
         $paulo, $cafe] = $clientes->values()->all();

        [$landing, $site, $ecommerce, $app, $sistema,
         $marca, $manutencao, $seo, $consultoria, $api] = $produtos->values()->all();

        // ── Vendas ───────────────────────────────────────────────

        // Janeiro
        $criarVenda($rafael,      'Site para Escritório de Advocacia',   'Desenvolvimento de site institucional com blog jurídico.', 5800, 5800, '2025-01-08 10:00:00', [['produto_id' => $site->id,      'quantidade' => 1, 'valor' => 5800]]);
        $criarVenda($boutique,    'Loja Virtual Boutique Ella',          'E-commerce com integração ao Mercado Pago.',              12000, 6000, '2025-01-14 14:30:00', [['produto_id' => $ecommerce->id, 'quantidade' => 1, 'valor' => 12000]]);
        $criarVenda($clinica,     'Sistema de Agendamento Médico',       'Sistema web para agendamento online de consultas.',       18500, 18500,'2025-01-20 09:00:00', [['produto_id' => $sistema->id,  'quantidade' => 1, 'valor' => 18500]]);

        // Fevereiro
        $criarVenda($thiago,      'Landing Page — Infoproduto',          null,                                                      2500,  2500, '2025-02-03 11:00:00', [['produto_id' => $landing->id,  'quantidade' => 1, 'valor' => 2500]]);
        $criarVenda($greentech,   'Identidade Visual GreenTech',         'Logo e manual de marca para startup de tecnologia.',      3200,  3200, '2025-02-10 16:00:00', [['produto_id' => $marca->id,    'quantidade' => 1, 'valor' => 3200]]);
        $criarVenda($fernanda,    'App de Gestão para Arquitetura',      'App mobile para controle de obras e orçamentos.',         22000, 11000,'2025-02-17 10:30:00', [['produto_id' => $app->id,      'quantidade' => 1, 'valor' => 22000]]);
        $criarVenda($academia,    'Site + Integração Iugu',              'Site institucional com gateway de pagamento.',            10300, 10300,'2025-02-24 14:00:00', [['produto_id' => $site->id,     'quantidade' => 1, 'valor' => 5800], ['produto_id' => $api->id, 'quantidade' => 1, 'valor' => 4500]]);

        // Março
        $criarVenda($bruno,       'Landing Page — Curso Online',         null,                                                      2500,  2500, '2025-03-05 09:30:00', [['produto_id' => $landing->id,  'quantidade' => 1, 'valor' => 2500]]);
        $criarVenda($construtora, 'Site Institucional Nordesth',         'Site com portfólio de obras e formulário de orçamento.',  5800,  0,    '2025-03-11 11:00:00', [['produto_id' => $site->id,     'quantidade' => 1, 'valor' => 5800]]);
        $criarVenda($cafe,        'E-commerce Café Origem',              'Loja online com catálogo de blends e assinatura mensal.', 12000, 12000,'2025-03-18 10:00:00', [['produto_id' => $ecommerce->id,'quantidade' => 1, 'valor' => 12000]]);
        $criarVenda($rafael,      'Manutenção Mensal — Março',           null,                                                      890,   890,  '2025-03-31 08:00:00', [['produto_id' => $manutencao->id,'quantidade' => 1,'valor' => 890]]);
        $criarVenda($paulo,       'Consultoria em Infraestrutura',       '5 horas de consultoria técnica para migração cloud.',     1750,  1750, '2025-03-22 15:00:00', [['produto_id' => $consultoria->id,'quantidade'=>5, 'valor' => 350]]);

        // Abril
        $criarVenda($isabela,     'Site + Identidade Visual',            'Site institucional e branding completo.',                 9000,  9000, '2025-04-02 10:00:00', [['produto_id' => $site->id,     'quantidade' => 1, 'valor' => 5800], ['produto_id' => $marca->id,    'quantidade' => 1, 'valor' => 3200]]);
        $criarVenda($boutique,    'SEO & Marketing Digital — Trimestre', 'Gestão de SEO e campanhas por 3 meses.',                  4200,  2100, '2025-04-07 09:00:00', [['produto_id' => $seo->id,      'quantidade' => 3, 'valor' => 1400]]);
        $criarVenda($greentech,   'Integração ERP + CRM',                'Integração entre sistemas internos via API REST.',        4500,  4500, '2025-04-14 14:30:00', [['produto_id' => $api->id,      'quantidade' => 1, 'valor' => 4500]]);
        $criarVenda($academia,    'Manutenção Mensal — Abril',           null,                                                      890,   890,  '2025-04-30 08:00:00', [['produto_id' => $manutencao->id,'quantidade' => 1,'valor' => 890]]);
        $criarVenda($clinica,     'Módulo de Prontuário Eletrônico',     'Adição de módulo de prontuário ao sistema existente.',    8500,  8500, '2025-04-21 11:00:00', [['produto_id' => $consultoria->id,'quantidade'=>4, 'valor' => 350], ['produto_id' => $api->id,'quantidade'=>1,'valor'=>4500]]);

        // Maio
        $criarVenda($thiago,      'Site Pessoal — Portfólio',            'Site com portfólio de trabalhos e blog.',                 5800,  5800, '2025-05-06 10:00:00', [['produto_id' => $site->id,     'quantidade' => 1, 'valor' => 5800]]);
        $criarVenda($paulo,       'App de Logística',                    'Aplicativo mobile para rastreamento de entregas.',        22000, 0,    '2025-05-09 09:30:00', [['produto_id' => $app->id,      'quantidade' => 1, 'valor' => 22000]]);
        $criarVenda($fernanda,    'Landing Page — Lançamento',           null,                                                      2500,  2500, '2025-05-13 11:00:00', [['produto_id' => $landing->id,  'quantidade' => 1, 'valor' => 2500]]);
        $criarVenda($cafe,        'Manutenção Mensal — Maio',            null,                                                      890,   890,  '2025-05-31 08:00:00', [['produto_id' => $manutencao->id,'quantidade' => 1,'valor' => 890]]);
        $criarVenda($construtora, 'Sistema de Gestão de Obras',          'Sistema web para controle de orçamentos e contratos.',    18500, 9250, '2025-05-19 14:00:00', [['produto_id' => $sistema->id,  'quantidade' => 1, 'valor' => 18500]]);

        // Junho (mês atual — em andamento)
        $criarVenda($rafael,      'Manutenção Mensal — Junho',           null,                                                      890,   890,  now()->subDays(25)->toDateTimeString(), [['produto_id' => $manutencao->id,'quantidade' => 1,'valor' => 890]]);
        $criarVenda($bruno,       'E-commerce + SEO',                   'Loja online para venda de cursos físicos e digitais.',    13400, 6700, now()->subDays(18)->toDateTimeString(), [['produto_id' => $ecommerce->id,'quantidade' => 1,'valor' => 12000], ['produto_id' => $seo->id,'quantidade'=>1,'valor'=>1400]]);
        $criarVenda($isabela,     'Consultoria — Estratégia Digital',    '3 horas de consultoria para planejamento de marketing.',  1050,  1050, now()->subDays(10)->toDateTimeString(), [['produto_id' => $consultoria->id,'quantidade'=>3,'valor'=>350]]);
        $criarVenda($academia,    'Manutenção Mensal — Junho',           null,                                                      890,   0,    now()->subDays(3)->toDateTimeString(),  [['produto_id' => $manutencao->id,'quantidade' => 1,'valor' => 890]]);
        $criarVenda($greentech,   'App Mobile — MVP',                   'Versão inicial do app para validação com usuários.',      22000, 0,    now()->subDays(1)->toDateTimeString(),  [['produto_id' => $app->id,      'quantidade' => 1, 'valor' => 22000]]);
    } // fim runLegacy
}
