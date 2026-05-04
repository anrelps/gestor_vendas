<?php

namespace App\Services;

use App\Models\Cliente;
use App\Models\DetalheVenda;
use App\Models\Empresa;
use App\Models\Produto;
use App\Models\RegistroPagamento;
use App\Models\User;
use App\Models\Venda;
use Illuminate\Support\Facades\Hash;

class DemoService
{
    public function createSession(): array
    {
        $empresa = Empresa::create([
            'nome'                   => 'Pixel & Code Studio',
            'email'                  => null,
            'telefone'               => null,
            'assinatura_ativa'       => true,
            'is_demo'                => true,
            'demo_expires_at'        => now()->addHours(2),
            'data_inicio_assinatura' => now()->subMonths(6),
            'data_fim_assinatura'    => now()->addYear(),
        ]);

        $user = User::create([
            'empresa_id' => $empresa->id,
            'nome'       => 'Visitante',
            'email'      => 'visitante_' . $empresa->id . '@demo.com',
            'password'   => Hash::make('demo'),
            'telefone'   => null,
        ]);

        $this->seedData($empresa);

        $token = explode('|', $user->createToken('demo-token')->plainTextToken)[1];

        return [
            'user'  => $user->load('empresa'),
            'token' => $token,
        ];
    }

    public function deleteSession(Empresa $empresa): void
    {
        // Deletar na ordem correta para respeitar as FK constraints
        $vendaIds = Venda::where('empresa_id', $empresa->id)->pluck('id');

        RegistroPagamento::whereIn('venda_id', $vendaIds)->delete();
        DetalheVenda::whereIn('venda_id', $vendaIds)->delete();
        Venda::where('empresa_id', $empresa->id)->delete();
        Cliente::where('empresa_id', $empresa->id)->delete();
        Produto::where('empresa_id', $empresa->id)->delete();
        User::where('empresa_id', $empresa->id)->delete();

        $empresa->delete();
    }

    public function cleanExpired(): int
    {
        $empresas = Empresa::where('is_demo', true)
            ->where('demo_expires_at', '<', now())
            ->get();

        foreach ($empresas as $empresa) {
            $this->deleteSession($empresa);
        }

        return $empresas->count();
    }

    private function seedData(Empresa $empresa): void
    {
        $produtos = collect([
            ['titulo' => 'Landing Page',              'descricao' => 'Página de vendas otimizada para conversão.',                   'valor' => 800.00],
            ['titulo' => 'Site Institucional',        'descricao' => 'Site completo com até 6 páginas e painel admin.',              'valor' => 2200.00],
            ['titulo' => 'Loja Virtual (E-commerce)', 'descricao' => 'Plataforma de vendas online com pagamento integrado.',         'valor' => 4500.00],
            ['titulo' => 'App Mobile',                'descricao' => 'Aplicativo para iOS e Android com painel de gestão.',          'valor' => 8500.00],
            ['titulo' => 'Sistema Web Sob Medida',    'descricao' => 'Sistema interno personalizado para a necessidade do cliente.', 'valor' => 6800.00],
            ['titulo' => 'Identidade Visual',         'descricao' => 'Logo, paleta de cores, tipografia e manual de marca.',         'valor' => 1200.00],
            ['titulo' => 'Manutenção Mensal',         'descricao' => 'Suporte técnico, atualizações e backups mensais.',             'valor' => 350.00],
            ['titulo' => 'SEO & Marketing Digital',   'descricao' => 'Otimização para buscadores e gestão de campanhas.',           'valor' => 650.00],
            ['titulo' => 'Consultoria em TI',         'descricao' => 'Hora de consultoria técnica e estratégica.',                   'valor' => 150.00],
            ['titulo' => 'Integração de APIs',        'descricao' => 'Integração com sistemas externos (ERP, CRM, gateways).',      'valor' => 1800.00],
        ])->map(fn($p) => Produto::create([...$p, 'empresa_id' => $empresa->id]));

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

        [$landing, $site, $ecommerce, $app, $sistema,
         $marca, $manutencao, $seo, $consultoria, $api] = $produtos->values()->all();

        [$rafael, $boutique, $thiago, $clinica, $fernanda,
         $greentech, $bruno, $academia, $isabela, $construtora,
         $paulo, $cafe] = $clientes->values()->all();

        $venda = function (
            Cliente $cliente,
            string $titulo,
            ?string $descricao,
            float $valorTotal,
            float $valorPago,
            string $createdAt,
            array $itens
        ) use ($empresa) {
            // timestamps = false evita que o Eloquent sobrescreva created_at/updated_at
            $v = new Venda();
            $v->timestamps = false;
            $v->empresa_id  = $empresa->id;
            $v->cliente_id  = $cliente->id;
            $v->titulo      = $titulo;
            $v->descricao   = $descricao;
            $v->valor_total = $valorTotal;
            $v->valor_pago  = $valorPago;
            $v->created_at  = $createdAt;
            $v->updated_at  = $createdAt;
            $v->save();

            foreach ($itens as $item) {
                DetalheVenda::create([
                    'venda_id'             => $v->id,
                    'produto_id'           => $item['produto_id'],
                    'quantidade'           => $item['qtd'],
                    'valor'                => $item['valor'],
                    'porcentagem_desconto' => $item['desconto'] ?? 0,
                ]);
            }

            if ($valorPago > 0) {
                $rp = new RegistroPagamento();
                $rp->timestamps   = false;
                $rp->venda_id     = $v->id;
                $rp->type         = $valorPago >= $valorTotal ? 'general' : 'single';
                $rp->amount       = $valorPago;
                $rp->description  = $valorPago >= $valorTotal
                    ? 'Pagamento total da venda.'
                    : 'Pagamento parcial — entrada.';
                $rp->created_at   = $createdAt;
                $rp->updated_at   = $createdAt;
                $rp->save();
            }
        };

        // Referências de tempo relativas ao momento da criação da sessão
        $w  = now()->startOfWeek(); // segunda-feira da semana atual
        $m1 = now()->subMonth()->startOfMonth();  // início do mês anterior
        $m2 = now()->subMonths(2)->startOfMonth(); // início de 2 meses atrás
        $m3 = now()->subMonths(3)->startOfMonth(); // início de 3 meses atrás

        // ── Semana atual (para o gráfico de receita semanal) ─────
        $venda($rafael,   'Landing Page — Escritório Mendonça',  null,                                        800,   800,  $w->copy()->addHours(9)->toDateTimeString(),            [['produto_id' => $landing->id,  'qtd' => 1, 'valor' => 800]]);
        $venda($thiago,   'Identidade Visual Pessoal',           'Logo e paleta para uso profissional.',     1200,  1200,  $w->copy()->addDay()->addHours(10)->toDateTimeString(), [['produto_id' => $marca->id,    'qtd' => 1, 'valor' => 1200]]);
        $venda($cafe,     'Manutenção Mensal',                   null,                                        350,   350,  $w->copy()->addDays(2)->addHours(8)->toDateTimeString(),[['produto_id' => $manutencao->id,'qtd'=> 1, 'valor' => 350]]);
        $venda($academia, 'SEO — Pacote Mensal',                 'Otimização e relatório mensal.',            650,   650,  $w->copy()->addDays(3)->addHours(14)->toDateTimeString(),[['produto_id' => $seo->id,      'qtd' => 1, 'valor' => 650]]);
        $venda($isabela,  'Consultoria — Planejamento Digital',  '4h de consultoria estratégica.',            600,   600,  $w->copy()->addDays(4)->addHours(11)->toDateTimeString(),[['produto_id' => $consultoria->id,'qtd'=> 4,'valor' => 150]]);

        // ── Mês atual — antes da semana corrente (usando datas relativas ao início da semana) ─────
        $venda($greentech,   'Site Institucional GreenTech',     'Site com portfólio e formulário de contato.',  2200, 2200, $w->copy()->subDays(14)->addHours(10)->toDateTimeString(), [['produto_id' => $site->id,    'qtd' => 1, 'valor' => 2200]]);
        $venda($boutique,    'Integração Mercado Pago',          'Integração de gateway na loja existente.',     1800, 1800, $w->copy()->subDays(11)->addHours(14)->toDateTimeString(), [['produto_id' => $api->id,     'qtd' => 1, 'valor' => 1800]]);
        $venda($construtora, 'Landing Page — Captação de Obras', null,                                            800,    0, $w->copy()->subDays(8)->addHours(9)->toDateTimeString(),   [['produto_id' => $landing->id, 'qtd' => 1, 'valor' => 800]]);
        $venda($paulo,       'Manutenção Mensal',                null,                                            350,  350, $w->copy()->subDays(5)->addHours(8)->toDateTimeString(),   [['produto_id' => $manutencao->id,'qtd'=> 1,'valor' => 350]]);

        // ── Mês anterior ─────────────────────────────────────────
        $venda($clinica,  'Site Clínica VidaPlena',              'Site com agendamento e área do paciente.',    2200, 2200, $m1->copy()->addDays(3)->addHours(10)->toDateTimeString(),  [['produto_id' => $site->id,     'qtd' => 1, 'valor' => 2200]]);
        $venda($bruno,    'E-commerce — Produtos Artesanais',    'Loja online com catálogo e checkout.',        4500, 2250, $m1->copy()->addDays(6)->addHours(14)->toDateTimeString(),  [['produto_id' => $ecommerce->id,'qtd' => 1, 'valor' => 4500]]);
        $venda($fernanda, 'Identidade Visual + Landing Page',    'Branding completo e página de lançamento.',   2000, 2000, $m1->copy()->addDays(9)->addHours(11)->toDateTimeString(),  [['produto_id' => $marca->id, 'qtd' => 1, 'valor' => 1200], ['produto_id' => $landing->id, 'qtd' => 1, 'valor' => 800]]);
        $venda($rafael,   'Manutenção Mensal',                   null,                                           350,  350, $m1->copy()->addDays(12)->addHours(8)->toDateTimeString(),  [['produto_id' => $manutencao->id,'qtd'=> 1,'valor' => 350]]);
        $venda($academia, 'SEO — Pacote Mensal',                 null,                                           650,  650, $m1->copy()->addDays(15)->addHours(9)->toDateTimeString(),  [['produto_id' => $seo->id,      'qtd' => 1, 'valor' => 650]]);
        $venda($greentech,'Consultoria — Arquitetura de Sistema','3h de consultoria técnica.',                   450,  450, $m1->copy()->addDays(18)->addHours(16)->toDateTimeString(), [['produto_id' => $consultoria->id,'qtd'=>3,'valor' => 150]]);
        $venda($thiago,   'Sistema de Agendamento',              'Sistema web para barbearia.',                 6800,    0, $m1->copy()->addDays(22)->addHours(10)->toDateTimeString(), [['produto_id' => $sistema->id,  'qtd' => 1, 'valor' => 6800]]);

        // ── 2 meses atrás ─────────────────────────────────────────
        $venda($cafe,        'Site + SEO Inicial',               'Site institucional e configuração SEO.',      2850, 2850, $m2->copy()->addDays(4)->addHours(10)->toDateTimeString(),  [['produto_id' => $site->id, 'qtd' => 1, 'valor' => 2200], ['produto_id' => $seo->id, 'qtd' => 1, 'valor' => 650]]);
        $venda($construtora, 'Sistema de Gestão de Obras',       'Sistema web para orçamentos e contratos.',    6800, 3400, $m2->copy()->addDays(7)->addHours(9)->toDateTimeString(),   [['produto_id' => $sistema->id, 'qtd' => 1, 'valor' => 6800]]);
        $venda($paulo,       'Manutenção Mensal',                null,                                           350,  350, $m2->copy()->addDays(10)->addHours(8)->toDateTimeString(),  [['produto_id' => $manutencao->id,'qtd'=> 1,'valor' => 350]]);
        $venda($isabela,     'App Mobile — Salão de Beleza',     'App para agendamento e fidelização.',         8500, 4250, $m2->copy()->addDays(14)->addHours(11)->toDateTimeString(), [['produto_id' => $app->id,      'qtd' => 1, 'valor' => 8500]]);
        $venda($boutique,    'Integração de APIs — ERP',         'Integração loja + sistema de estoque.',       1800, 1800, $m2->copy()->addDays(20)->addHours(15)->toDateTimeString(), [['produto_id' => $api->id,      'qtd' => 1, 'valor' => 1800]]);
        $venda($rafael,      'Manutenção Mensal',                null,                                           350,  350, $m2->copy()->addDays(25)->addHours(8)->toDateTimeString(),  [['produto_id' => $manutencao->id,'qtd'=> 1,'valor' => 350]]);

        // ── 3 meses atrás ─────────────────────────────────────────
        $venda($clinica,  'Landing Page — Campanha Verão',       null,                                           800,  800, $m3->copy()->addDays(5)->addHours(10)->toDateTimeString(),  [['produto_id' => $landing->id,  'qtd' => 1, 'valor' => 800]]);
        $venda($greentech,'Site Institucional v2',               'Redesign completo do site.',                  2200, 2200, $m3->copy()->addDays(8)->addHours(14)->toDateTimeString(),  [['produto_id' => $site->id,     'qtd' => 1, 'valor' => 2200]]);
        $venda($bruno,    'Manutenção Mensal',                   null,                                           350,  350, $m3->copy()->addDays(12)->addHours(8)->toDateTimeString(),  [['produto_id' => $manutencao->id,'qtd'=> 1,'valor' => 350]]);
        $venda($fernanda, 'Consultoria — UX/UI',                 '2h de revisão de interface.',                  300,  300, $m3->copy()->addDays(16)->addHours(11)->toDateTimeString(), [['produto_id' => $consultoria->id,'qtd'=>2,'valor' => 150]]);
        $venda($paulo,    'E-commerce — Distribuidora',          'Loja online B2B com tabela de preços.',       4500,    0, $m3->copy()->addDays(20)->addHours(9)->toDateTimeString(),  [['produto_id' => $ecommerce->id,'qtd' => 1, 'valor' => 4500]]);
        $venda($academia, 'Manutenção Mensal',                   null,                                           350,  350, $m3->copy()->addDays(28)->addHours(8)->toDateTimeString(),  [['produto_id' => $manutencao->id,'qtd'=> 1,'valor' => 350]]);
    }
}
