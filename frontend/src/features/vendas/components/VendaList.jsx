import { BanknoteArrowUp, FileText, Plus, Share2 } from 'lucide-react';
import { useEffect, useRef, useState } from 'react';
import toast from 'react-hot-toast';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

import ConfirmDialog from '../../../components/ui/ConfirmDialog';
import EmptyState from '../../../components/ui/EmptyState';
import NewButton from '../../../components/ui/NewButton';
import Pagination from '../../../components/ui/Pagination';
import { useLoading } from '../../../context/LoadingContext';
import { index as indexClientes } from '../../../redux/slices/clienteSlice';
import { destroy, gerarRelatorioVendas, index, quickPay, realizarMultiplePayment } from '../../../redux/slices/vendaSlice';
import MultiplePaymentPopup from './MultiplePaymentPopup';
import VendaCard from './VendaCard';
import VendaClientFilter from './VendaClientFilter';
import VendaFilters from './VendaFilters';
import VendaSummaryCards from './VendaSummaryCards';

const VendaList = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { vendas, loading, pagination } = useSelector((state) => state.venda);
  const { clientes } = useSelector((state) => state.cliente);
  const { user } = useSelector((state) => state.user);
  const { setLoading } = useLoading();

  const [queryCliente, setQueryCliente] = useState('');
  const clienteInputRef = useRef(null);
  const dateStartRef = useRef(null);
  const dateEndRef = useRef(null);

  const [filters, setFilters] = useState({
    valor_min: '', valor_max: '', cliente: '',
    data_min: '', data_max: '', pendencias: 0, vendas_ids: [],
  });
  const [dateStart, setDateStart] = useState('');
  const [dateEnd, setDateEnd] = useState('');
  const [selectedVendasIds, setSelectedVendasIds] = useState([]);
  const [shouldFetch, setShouldFetch] = useState(false);
  const [removeVendaId, setRemoveVendaId] = useState(null);
  const [showDeletePopup, setShowDeletePopup] = useState(false);
  const [showButtonMultiplePayment, setShowButtonMultiplePayment] = useState(false);
  const [showPopUpMultiplePayment, setShowPopupMultiplePayment] = useState(false);
  const itemsPerPage = 15;

  useEffect(() => { if (shouldFetch) setLoading(loading); }, [loading, shouldFetch]);

  useEffect(() => {
    if (user?.empresa?.id) {
      dispatch(indexClientes({ empresa_id: user.empresa.id, page: 1, maxItems: 999, pesquisa: '' }));
    }
  }, [dispatch, user?.empresa?.id]);

  useEffect(() => {
    if (user?.empresa?.id && vendas.length === 0) {
      setShouldFetch(true);
      dispatch(index({ empresa_id: user?.empresa?.id, page: 1, maxItems: itemsPerPage }));
    }
  }, [dispatch, user?.empresa?.id]);

  useEffect(() => {
    if (!user?.empresa?.id) return;
    setShouldFetch(true);
    dispatch(index({
      empresa_id: user.empresa.id,
      data_max: filters.data_max,
      data_min: filters.data_min,
      pendencias: filters.pendencias,
      cliente: filters.cliente,
    }));
  }, [filters, user?.empresa?.id]);

  const handleFilterChange = (key) => (e) =>
    setFilters((prev) => ({ ...prev, [key]: e.target.value }));

  const handleSelectVenda = (id) => {
    setSelectedVendasIds((prev) => {
      const newIds = prev.includes(id) ? prev.filter((v) => v !== id) : [...prev, id];
      setFilters((f) => ({ ...f, vendas_ids: newIds }));
      return newIds;
    });
  };

  const allSelected = vendas.length > 0 && vendas.every((v) => selectedVendasIds.includes(v.id));

  const handleToggleSelectAll = () => {
    const visibleIds = vendas.map((v) => v.id);
    if (allSelected) {
      setSelectedVendasIds((prev) => {
        const newIds = prev.filter((id) => !visibleIds.includes(id));
        setFilters((f) => ({ ...f, vendas_ids: newIds }));
        return newIds;
      });
    } else {
      setSelectedVendasIds((prev) => {
        const newIds = [...new Set([...prev, ...visibleIds])];
        setFilters((f) => ({ ...f, vendas_ids: newIds }));
        return newIds;
      });
    }
  };

  const handleClearSelection = () => {
    setSelectedVendasIds([]);
    setFilters((f) => ({ ...f, vendas_ids: [] }));
  };

  const handleDelete = (id) => { setRemoveVendaId(id); setShowDeletePopup(true); };

  const handleQuickPay = async (vendaId) => {
    await dispatch(quickPay({ empresa_id: user.empresa.id, venda_id: vendaId })).unwrap();
    toast.success('Venda marcada como paga!');
  };

  const confirmDelete = async () => {
    try {
      await dispatch(destroy({ empresa_id: user.empresa.id, venda_id: removeVendaId })).unwrap();
      setShowDeletePopup(false);
      setRemoveVendaId(null);
      toast.success('Venda removida com sucesso!');
    } catch {
      toast.error('Erro ao remover venda. Tente novamente.');
    }
  };

  const handleGerarRelatorio = async () => {
    setLoading(true);
    try {
      const response = await dispatch(
        gerarRelatorioVendas({ empresa_id: user?.empresa?.id, filters: { ...filters, vendas_ids: selectedVendasIds } }),
      );
      if (gerarRelatorioVendas.fulfilled.match(response)) {
        const url = window.URL.createObjectURL(response.payload);
        window.open(url, '_blank');
        setTimeout(() => window.URL.revokeObjectURL(url), 1000);
      }
    } finally {
      setLoading(false);
    }
  };

  const handleCopiarLinkRelatorio = async () => {
    const baseURL = import.meta.env.VITE_API_URL;
    const endpoint = `public/relatorios/${user?.empresa?.id}/pdf/vendas`;
    const filtrosLimpos = Object.fromEntries(
      Object.entries(filters).filter(([, value]) => {
        if (typeof value === 'string') return value.length > 0;
        if (typeof value === 'number') return value > 0;
        return true;
      }),
    );
    const params = new URLSearchParams();
    Object.entries(filtrosLimpos).forEach(([key, value]) => {
      if (Array.isArray(value)) value.forEach((v) => params.append(`${key}[]`, v));
      else params.append(key, value);
    });
    navigator.clipboard.writeText(`Olá! Segue seu relatório de venda/serviços:\n${baseURL}${endpoint}?${params.toString()}`);
    toast.success('Mensagem copiada com sucesso!');
  };

  const handleOpenMultiplePayment = () => {
    if (!filters.cliente) { toast.error('Escolha um cliente primeiro'); return; }
    setShowPopupMultiplePayment(true);
  };

  const handleMultiplePayments = async ({ valor, metodo, cliente, vendasIds }) => {
    setLoading(true);
    try {
      await dispatch(realizarMultiplePayment({ empresa_id: user.empresa.id, valor, metodo, cliente, vendasIds })).unwrap();
      await dispatch(index({ empresa_id: user?.empresa?.id, data_max: filters.data_max, data_min: filters.data_min, pendencias: filters.pendencias, cliente: filters.cliente })).unwrap();
      setShowPopupMultiplePayment(false);
      toast.success('Pagamentos processados com sucesso!');
    } catch {
      toast.error('Erro ao processar pagamentos. Tente novamente.');
    }
    setLoading(false);
  };

  const valorTotal = vendas.reduce((t, v) => t + v.valor_total, 0);
  const valorTotalPendente = valorTotal - vendas.reduce((t, v) => t + v.valor_pago, 0);

  return (
    <div>
      {showButtonMultiplePayment && filters.cliente && (
        <button
          className='px-5 py-3 bg-linear-to-r from-primary-accent to-primary-light rounded-3xl fixed bottom-10 right-10 cursor-pointer'
          onClick={handleOpenMultiplePayment}
        >
          <span className='text-white font-semibold flex gap-2 items-center'>
            <BanknoteArrowUp size={17} /> Pagar Vários
          </span>
        </button>
      )}

      {showPopUpMultiplePayment && (
        <MultiplePaymentPopup
          cliente={filters.cliente}
          vendasIds={filters.vendas_ids ?? null}
          open={showPopUpMultiplePayment}
          onClose={() => setShowPopupMultiplePayment(false)}
          onConfirm={handleMultiplePayments}
        />
      )}

      <div className='w-full max-w-5xl'>
        <div className='bg-white rounded-xl border border-gray-100 shadow-xs overflow-hidden'>
          {/* Header + Cards */}
          <div className='px-6 pt-6 pb-4 border-b border-gray-100'>
            <div className='flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3'>
              <div>
                <h2 className='text-lg font-semibold tracking-tight text-gray-900'>Vendas</h2>
                <p className='text-sm text-gray-400 mt-0.5'>Acompanhe as vendas e pagamentos.</p>
              </div>
              <NewButton label='Nova Venda' icon={<Plus size={18} />} onClick={() => navigate('/nova-venda')} />
            </div>
            <VendaSummaryCards valorTotalPendente={valorTotalPendente} valorTotal={valorTotal} count={vendas.length} />
          </div>

          {/* Filtros */}
          <div className='px-6 py-3 border-b border-gray-100'>
            <VendaClientFilter
              clientes={clientes}
              value={filters.cliente}
              query={queryCliente}
              onQueryChange={setQueryCliente}
              onChange={(val) => setFilters((f) => ({ ...f, cliente: val }))}
              inputRef={clienteInputRef}
            />
            <VendaFilters
              allSelected={allSelected}
              selectedCount={selectedVendasIds.length}
              onToggleSelectAll={handleToggleSelectAll}
              onClearSelection={handleClearSelection}
              filters={filters}
              onFilterChange={handleFilterChange}
              dateStart={dateStart}
              dateEnd={dateEnd}
              dateStartRef={dateStartRef}
              dateEndRef={dateEndRef}
              onDateStartChange={(e) => { setDateStart(e.target.value); handleFilterChange('data_min')(e); }}
              onDateEndChange={(e) => { setDateEnd(e.target.value); handleFilterChange('data_max')(e); }}
              showButtonMultiplePayment={showButtonMultiplePayment}
              onToggleMultiplePayment={() => setShowButtonMultiplePayment((v) => !v)}
            />
          </div>

          {/* Lista */}
          <div className='divide-y divide-gray-100'>
            {vendas.length === 0 && <EmptyState message='Nenhuma venda encontrada.' />}
            {vendas.length > 0 && (
              <div className='p-4'>
                <ul className='flex flex-col gap-2'>
                  {vendas.map((venda) => (
                    <VendaCard
                      key={venda.id}
                      venda={venda}
                      isSelected={selectedVendasIds.includes(venda.id)}
                      onSelect={handleSelectVenda}
                      onDelete={handleDelete}
                      onQuickPay={handleQuickPay}
                    />
                  ))}
                </ul>
              </div>
            )}
          </div>

          <Pagination
            current_page={pagination.current_page}
            lastPage={pagination.last_page}
            onPageChange={(page) => dispatch(index({
              empresa_id: user.empresa.id,
              page,
              data_max: filters.data_max,
              data_min: filters.data_min,
              pendencias: filters.pendencias,
              cliente: filters.cliente,
            }))}
          />

          {/* Ações de relatório */}
          <div className='px-6 py-4 border-t border-gray-100 flex flex-col md:flex-row gap-2'>
            <button
              onClick={handleGerarRelatorio}
              className='flex-1 px-3 py-2 rounded-lg bg-primary hover:bg-primary/90 text-white font-medium text-sm transition flex items-center justify-center gap-2 cursor-pointer'
            >
              <FileText size={15} /> Gerar PDF
            </button>
            <button
              onClick={handleCopiarLinkRelatorio}
              className='flex-1 px-3 py-2 rounded-lg bg-primary hover:bg-primary/90 text-white font-medium text-sm transition flex items-center justify-center gap-2 cursor-pointer'
            >
              <Share2 size={15} /> Compartilhar (PDF)
            </button>
          </div>
        </div>
      </div>

      <ConfirmDialog
        open={showDeletePopup}
        title='Remover Venda/OS?'
        message='Tem certeza que deseja remover esta Venda/OS? Esta ação não pode ser desfeita.'
        onConfirm={confirmDelete}
        onCancel={() => { setShowDeletePopup(false); setRemoveVendaId(null); }}
      />
    </div>
  );
};

export default VendaList;
