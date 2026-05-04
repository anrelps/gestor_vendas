import { useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import EmptyState from '../../../components/ui/EmptyState';
import Pagination from '../../../components/ui/Pagination';
import { useLoading } from '../../../context/LoadingContext';
import { index as indexClientes } from '../../../redux/slices/clienteSlice';
import { pagamentosIndex } from '../../../redux/slices/registroPagamentoSlice';
import PagamentoCard from './PagamentoCard';
import PagamentoFilters from './PagamentoFilters';
import PagamentoSummaryCards from './PagamentoSummaryCards';

const RegistroPagamentosList = () => {
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.user);
  const { clientes } = useSelector((state) => state.cliente);
  const { pagamentos: pagamentosRaw, loading, pagination } = useSelector((state) => state.pagamento);
  const pagamentos = Array.isArray(pagamentosRaw) ? pagamentosRaw : [];
  const { setLoading } = useLoading();

  const [queryCliente, setQueryCliente] = useState('');
  const clienteInputRef = useRef(null);
  const dateStartRef = useRef(null);
  const dateEndRef = useRef(null);
  const [dateStartDisplay, setDateStartDisplay] = useState('');
  const [dateEndDisplay, setDateEndDisplay] = useState('');
  const [shouldFetch, setShouldFetch] = useState(false);

  const [filters, setFilters] = useState({ cliente_id: '', data_inicio: '', data_fim: '' });

  useEffect(() => {
    if (shouldFetch) setLoading(loading);
  }, [loading, shouldFetch]);

  useEffect(() => {
    if (user?.empresa?.id) {
      dispatch(indexClientes({ empresa_id: user.empresa.id, page: 1, maxItems: 999, pesquisa: '' }));
    }
  }, [dispatch, user?.empresa?.id]);

  useEffect(() => {
    const timer = setTimeout(() => {
      if (user?.empresa?.id) {
        setShouldFetch(true);
        dispatch(pagamentosIndex({
          empresa_id: user.empresa.id,
          page: 1,
          cliente_id: filters.cliente_id || null,
          data_inicio: filters.data_inicio || null,
          data_fim: filters.data_fim || null,
        }));
      }
    }, 300);
    return () => clearTimeout(timer);
  }, [dispatch, user?.empresa?.id, filters]);

  const handlePageChange = (page) => {
    dispatch(pagamentosIndex({
      empresa_id: user.empresa.id,
      page,
      cliente_id: filters.cliente_id || null,
      data_inicio: filters.data_inicio || null,
      data_fim: filters.data_fim || null,
    }));
  };

  const totalPago = pagamentos.reduce((acc, p) => acc + parseFloat(p.amount || 0), 0);
  const totalRegistros = pagamentos.length;
  const mediaPorPagamento = totalRegistros > 0 ? totalPago / totalRegistros : 0;

  return (
    <div className='w-full max-w-5xl'>
      <div className='bg-white rounded-xl border border-gray-100 shadow-xs overflow-hidden'>

        <div className='px-6 pt-6 pb-4 border-b border-gray-100'>
          <div className='flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3'>
            <div>
              <h2 className='text-lg font-semibold tracking-tight text-gray-900'>Pagamentos</h2>
              <p className='text-sm text-gray-400 mt-0.5'>Histórico de todos os pagamentos registrados.</p>
            </div>
          </div>

          <PagamentoSummaryCards
            totalPago={totalPago}
            totalRegistros={totalRegistros}
            mediaPorPagamento={mediaPorPagamento}
          />
        </div>

        <PagamentoFilters
          clientes={clientes}
          clienteId={filters.cliente_id}
          query={queryCliente}
          onQueryChange={setQueryCliente}
          onClienteChange={(val) => setFilters((prev) => ({ ...prev, cliente_id: val }))}
          clienteInputRef={clienteInputRef}
          filters={filters}
          onFiltersChange={setFilters}
          dateStartDisplay={dateStartDisplay}
          dateEndDisplay={dateEndDisplay}
          onDateStartChange={setDateStartDisplay}
          onDateEndChange={setDateEndDisplay}
          dateStartRef={dateStartRef}
          dateEndRef={dateEndRef}
          onClearDates={() => {
            setFilters((prev) => ({ ...prev, data_inicio: '', data_fim: '' }));
            setDateStartDisplay('');
            setDateEndDisplay('');
          }}
          count={pagamentos.length}
        />

        <div>
          {pagamentos.length === 0 && (
            <EmptyState message='Nenhum pagamento encontrado.' />
          )}

          {pagamentos.length > 0 && (
            <div className='p-4'>
              <ul className='flex flex-col gap-2'>
                {pagamentos.map((pagamento) => (
                  <PagamentoCard key={pagamento.id} pagamento={pagamento} />
                ))}
              </ul>
            </div>
          )}
        </div>

        {pagamentos.length > 0 && (
          <div className='border-t border-gray-100'>
            <Pagination
              current_page={pagination?.current_page ?? 1}
              lastPage={pagination?.last_page ?? 1}
              onPageChange={handlePageChange}
            />
          </div>
        )}
      </div>
    </div>
  );
};

export default RegistroPagamentosList;
