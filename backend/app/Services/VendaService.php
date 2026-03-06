<?php

namespace App\Services;

use App\Models\Empresa;
use App\Models\Venda;
use Exception;
use Illuminate\Support\Facades\DB;

class VendaService {

    private $venda;
    private $registroPagamentoService;

    public function __construct(Venda $venda, RegistroPagamentoService $registroPagamentoService) {
        $this->venda = $venda;
        $this->registroPagamentoService = $registroPagamentoService;
    }

    public function index(Empresa $empresa, array $filters) {
        $maxItems = $filters['maxItems'] ?? 20;
        $vendas = $empresa->vendas()
            ->when(isset($filters['valor_min']), function($q) use ($filters) {
                $q->where('valor_total', '>=', $filters['valor_min']);
            })
            ->when(isset($filters['valor_max']), function($q) use ($filters) {
                $q->where('valor_total', '<=', $filters['valor_max']);
            })
            ->when(isset($filters['cliente']), function($q) use ($filters) {
                $q->where('cliente_id', $filters['cliente']);
            })
            ->when(isset($filters['data_min']), function($q) use ($filters) {
                $q->whereDate('created_at', '>=', $filters['data_min']);
            })
            ->when(isset($filters['data_max']), function($q) use ($filters) {
                $q->whereDate('created_at', '<=', $filters['data_max']);
            })
            ->when(isset($filters['pendencias']) && $filters['pendencias'] == 1, function($q) {
                $q->whereColumn('valor_pago', '<', 'valor_total');
            })
            ->orderBy('created_at', 'DESC')
            ->paginate($maxItems);
        return $vendas;
    }

    public function show(Empresa $empresa, Venda $venda) {
        $venda = $empresa->vendas()->find($venda->id);
        return $venda;
    }

    public function store(Empresa $empresa, array $input) {
        try {
            DB::beginTransaction();
            $venda = $empresa->vendas()->create([
                'cliente_id' => $input['cliente'],
                'titulo' => $input['titulo'],
                'descricao' => $input['descricao'],
                'valor_total' => $input['valor_total'],
                'valor_pago' => $input['valor_pago'],
            ]);

            if($input['valor_pago'] > 0) {
                $registroData = ['type' => 'single', 'amount' => $input['valor_pago'], 'description' => "Pagamento inicial de R$ {$input['valor_pago']} registrado no cadastro da venda."];
                $this->registroPagamentoService->createFromSale($venda, $registroData);
            }

            foreach($input['produtos'] as $produto) {
                $venda->detalhesVendas()->create([
                    'produto_id' => $produto['produto_id'],
                    'quantidade' => $produto['quantidade'],
                    'valor' => $produto['valor'] * $produto['quantidade'],
                    'porcentagem_desconto' => $produto['porcentagem_desconto'] ?? 0,
                ]);
            }
            DB::commit();
            return $venda;
        } catch(Exception $e) {
            DB::rollBack();
            throw $e;
        }
    }

    public function update(Venda $venda, array $input) {
        try {
            DB::beginTransaction();

            if($input['valor_pago'] > $venda->valor_pago) {
                $valorAdicionado = $input['valor_pago'] - $venda->valor_pago;
                $registroData  = ['type' => 'single', 'amount' => $input['valor_pago'], 'description' => "Pagamento de R$ {$valorAdicionado} adicionado via atualização da venda."];
                $this->registroPagamentoService->createFromSale($venda, $registroData);
            }

            $venda->update([
                'cliente_id' => $input['cliente'],
                'titulo' => $input['titulo'],
                'descricao' => $input['descricao'],
                'valor_total' => $input['valor_total'],
                'valor_pago' => $input['valor_pago'],
            ]);

            $venda->detalhesVendas()->delete();

            foreach($input['produtos'] as $produto) {
                $venda->detalhesVendas()->create([
                    'produto_id' => $produto['produto_id'],
                    'quantidade' => $produto['quantidade'],
                    'valor' => $produto['valor'],
                    'porcentagem_desconto' => $produto['porcentagem_desconto'] ?? 0,
                ]);
            }

            DB::commit();
            return $venda;
        } catch(Exception $e) {
            DB::rollBack();
            throw $e;
        }
    }

    public function destroy(Venda $venda) {
        $venda->detalhesVendas()->delete();
        return $venda->delete();
    }

    public function applyPaymentToMultipleSales(float $value, string $paymentType, array $data) {
        $vendas = $this->venda
            ->where('empresa_id', auth()->user()->empresa_id)
            ->whereColumn('valor_pago', '<>', 'valor_total')
            ->where('cliente_id', $data['cliente'])
            ->when(isset($data['vendas_ids']) && !empty($data['vendas_ids']), function($q) use ($data) {
                $q->whereIn('id', $data['vendas_ids']);
            });

        switch($paymentType) {
            case 'split_equally':
                $vendas = $vendas->get();
                $vendas_qty = $vendas->count();
                if ($vendas_qty === 0) break;
                if($value >= ($vendas->sum('valor_total') - $vendas->sum('valor_pago'))) {
                    foreach ($vendas as $venda) {
                        // Inserindo registro na tabela de registro de pagamentos
                        $valorPagoVenda = $venda->valor_total - $venda->valor_pago;
                        $registroData  = ['type' => 'general', 'amount' => $valorPagoVenda, 'description' => "Venda quitada via pagamento geral de R$ {$value}."];
                        $this->registroPagamentoService->createFromSale($venda, $registroData);

                        $venda->update(['valor_pago' => $venda->valor_total]);
                    }
                    break;
                }
                $valuePerSale = floor($value / $vendas_qty);
                foreach ($vendas as $venda) {
                    $valueToDiscount = min($valuePerSale, $venda->valor_total - $venda->valor_pago);
                    $venda->update(['valor_pago' => $venda->valor_pago + $valueToDiscount]);

                    // Inserindo registro na tabela de registro de pagamentos
                    $registroData  = ['type' => 'general', 'amount' => $valueToDiscount, 'description' => "R$ {$valueToDiscount} abatido via pagamento geral de R$ {$value} dividido igualmente entre as vendas."];
                    $this->registroPagamentoService->createFromSale($venda, $registroData);
                }
                break;
            case 'oldest_first':
                $vendas = $vendas->orderBy('created_at', 'ASC')->get();
                $total = $value;
                foreach ($vendas as $venda) {
                    if($value > 0) {
                        $valueToDiscount = min(($venda->valor_total - $venda->valor_pago), $value);
                        $venda->update([
                            'valor_pago' => $venda->valor_pago + $valueToDiscount,
                        ]);
                        $value -= $valueToDiscount;

                        // Inserindo registro na tabela de registro de pagamentos
                        $registroData  = ['type' => 'general', 'amount' => $valueToDiscount, 'description' => "R$ {$valueToDiscount} abatido via pagamento geral de R$ {$total}, priorizando vendas mais antigas."];
                        $this->registroPagamentoService->createFromSale($venda, $registroData);
                    }
                }
                break;
        }
    }
}
