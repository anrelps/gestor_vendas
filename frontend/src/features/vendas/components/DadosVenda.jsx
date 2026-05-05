import { useEffect, useState } from 'react';
import toast from 'react-hot-toast';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

import { useLoading } from '../../../context/LoadingContext';
import { index as indexClientes } from '../../../redux/slices/clienteSlice';
import { index as indexProdutos } from '../../../redux/slices/produtoSlice';
import { create, gerarRelatorioDetalhesVenda, index, show, update } from '../../../redux/slices/vendaSlice';
import EditClientPopup from '../../clientes/components/EditClientPopup';
import { formatCurrencyInput } from '../utils';
import ClienteSelector from './ClienteSelector';
import PagamentoForm from './PagamentoForm';
import ProdutoSelector from './ProdutoSelector';

const DadosVenda = ({ isEditing = false, vendaId = null }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { setLoading } = useLoading();

  const { user } = useSelector((state) => state.user);
  const { clientes } = useSelector((state) => state.cliente);
  const { produtos } = useSelector((state) => state.produto);
  const { vendas, venda, loading, loadingSaving } = useSelector((state) => state.venda);

  const [shouldFetch, setShouldFetch] = useState(false);
  const [clienteSelecionado, setClienteSelecionado] = useState('');
  const [queryCliente, setQueryCliente] = useState('');
  const [showNewClient, setShowNewClient] = useState(false);
  const [descricaoVenda, setDescricaoVenda] = useState('');
  const [queryProduto, setQueryProduto] = useState('');
  const [produtosSelecionados, setProdutosSelecionados] = useState({});
  const [valorTotal, setValorTotal] = useState('');
  const [valorPago, setValorPago] = useState('');
  const [tituloVenda, setTituloVenda] = useState('');
  const [totalVendas, setTotalVendas] = useState(0);
  const [valorTotalEditadoManualmente, setValorTotalEditadoManualmente] = useState(false);
  const [dadosCarregados, setDadosCarregados] = useState(false);

  useEffect(() => { if (shouldFetch) setLoading(loading); }, [loading, shouldFetch]);

  useEffect(() => {
    if (isEditing && user?.empresa?.id) {
      dispatch(show({ empresa_id: user.empresa.id, venda_id: vendaId }));
    }
  }, [dispatch, isEditing, vendaId, user?.empresa?.id]);

  useEffect(() => {
    if (user?.empresa?.id) {
      dispatch(indexClientes({ empresa_id: user.empresa.id, page: 1, maxItems: 999, pesquisa: '' }));
      dispatch(indexProdutos({ empresa_id: user.empresa.id, page: 1, maxItems: 999, pesquisa: '' }));
    }
  }, [dispatch, user?.empresa?.id]);

  if (!isEditing) {
    useEffect(() => {
      setShouldFetch(true);
      if (user?.empresa?.id) dispatch(index({ empresa_id: user.empresa.id, page: 1, maxItems: 999 }));
    }, [dispatch, user?.empresa?.id]);

    useEffect(() => {
      setTotalVendas(vendas.length);
      setTituloVenda(`OS ${totalVendas + 1}`);
    }, [vendas]);
  }

  useEffect(() => {
    setShouldFetch(true);
    if (isEditing && venda?.id) {
      setTituloVenda(venda.titulo);
      setClienteSelecionado(venda.cliente.id);
      setDescricaoVenda(venda.descricao);
      setValorPago(venda.valor_pago != null ? formatCurrencyInput(String(Math.round(Number(venda.valor_pago) * 100))) : '');
      setValorTotal(venda.valor_total != null ? formatCurrencyInput(String(Math.round(Number(venda.valor_total) * 100))) : '');

      const produtosMap = {};
      venda.detalhesVenda.forEach((detalhe) => {
        const valorUnitario = detalhe.quantidade > 0 ? detalhe.valor / detalhe.quantidade : detalhe.valor;
        produtosMap[detalhe.produto_id] = { ...detalhe, valor: valorUnitario };
      });
      setProdutosSelecionados(produtosMap);
      setDadosCarregados(true);
      setValorTotalEditadoManualmente(true);
    }
  }, [isEditing, venda]);

  useEffect(() => {
    if (valorTotalEditadoManualmente) return;
    const total = Object.values(produtosSelecionados).reduce((acc, item) => {
      return acc + (Number(item.quantidade) || 0) * (Number(item.valor) || 0);
    }, 0);
    setValorTotal(formatCurrencyInput(String(Math.round(total * 100))));
  }, [produtosSelecionados, valorTotalEditadoManualmente]);

  const handleProdutoCheck = (produto) => {
    setValorTotalEditadoManualmente(false);
    setProdutosSelecionados((prev) => {
      const newState = { ...prev };
      if (newState[produto.id]) {
        delete newState[produto.id];
      } else {
        newState[produto.id] = { produto_id: produto.id, quantidade: 1, valor: produto.valor, porcentagem_desconto: 0 };
      }
      return newState;
    });
  };

  const handleQuantityChange = (produtoId, delta) => {
    setValorTotalEditadoManualmente(false);
    setProdutosSelecionados((prev) => {
      const newState = { ...prev };
      const current = newState[produtoId];
      if (!current) return newState;
      const newQtd = current.quantidade + delta;
      if (newQtd < 1) return newState;
      newState[produtoId] = { ...current, quantidade: newQtd };
      return newState;
    });
  };

  const handleSubmit = async () => {
    try {
      const data = {
        cliente: clienteSelecionado,
        titulo: tituloVenda,
        descricao: descricaoVenda,
        valor_total: Number(String(valorTotal).replace(/\./g, '').replace(',', '.')) || 0,
        valor_pago: Number(String(valorPago).replace(/\./g, '').replace(',', '.')) || 0,
        produtos: produtosSelecionados,
      };
      if (isEditing) {
        await dispatch(update({ empresa_id: user.empresa.id, venda_id: vendaId, data })).unwrap();
      } else {
        await dispatch(create({ empresa_id: user.empresa.id, data })).unwrap();
      }
      toast.success('Venda salva com sucesso!');
      navigate('/vendas');
    } catch {
      toast.error('Erro ao salvar venda. Tente novamente.');
    }
  };

  const handleGerarPDF = async () => {
    if (!isEditing) return;
    const res = await dispatch(gerarRelatorioDetalhesVenda({ empresa_id: user.empresa.id, venda_id: vendaId }));
    if (gerarRelatorioDetalhesVenda.fulfilled.match(res)) {
      const url = window.URL.createObjectURL(res.payload);
      window.open(url, '_blank');
      setTimeout(() => window.URL.revokeObjectURL(url), 100);
    }
  };

  return (
    <>
      {/* Breadcrumb */}
      <p className='text-xs font-semibold text-gray-400 uppercase tracking-widest mb-4'>
        {isEditing ? 'Editar Venda' : 'Nova Venda'}
      </p>

      {/* Formulário principal */}
      <div className='mx-auto bg-white rounded-xl border border-gray-100 shadow-xs p-6'>
        {/* Título da venda */}
        <div className='mb-5'>
          <label className='block text-xs font-semibold text-gray-500 uppercase tracking-widest mb-1.5'>
            Título
          </label>
          <input
            className='w-full px-3 py-2.5 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary text-sm text-gray-700 placeholder-gray-400'
            value={tituloVenda}
            onChange={(e) => setTituloVenda(e.target.value)}
            placeholder='Título da venda'
          />
        </div>

        <ClienteSelector
          clientes={clientes}
          value={clienteSelecionado}
          query={queryCliente}
          onQueryChange={setQueryCliente}
          onChange={setClienteSelecionado}
          onNewClientClick={() => setShowNewClient(true)}
        />

        <textarea
          className='mt-4 w-full px-3 py-2.5 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary text-sm text-gray-700 resize-none placeholder-gray-400'
          value={descricaoVenda}
          onChange={(e) => setDescricaoVenda(e.target.value)}
          placeholder='Descrição da venda'
          rows={3}
        />

        <ProdutoSelector
          produtos={produtos}
          produtosSelecionados={produtosSelecionados}
          query={queryProduto}
          onQueryChange={setQueryProduto}
          onCheck={handleProdutoCheck}
          onQuantityChange={handleQuantityChange}
        />

        {showNewClient && (
          <EditClientPopup client={{}} onClose={() => setShowNewClient(false)} />
        )}
      </div>

      {/* Pagamento */}
      <PagamentoForm
        valorPago={valorPago}
        valorTotal={valorTotal}
        onValorPagoChange={(e) => setValorPago(formatCurrencyInput(e.target.value))}
        onValorTotalChange={(e) => { setValorTotalEditadoManualmente(true); setValorTotal(formatCurrencyInput(e.target.value)); }}
        onCancel={() => navigate('/vendas')}
        onSave={handleSubmit}
        loadingSaving={loadingSaving}
        isEditing={isEditing}
        onGerarPDF={handleGerarPDF}
      />
    </>
  );
};

export default DadosVenda;
