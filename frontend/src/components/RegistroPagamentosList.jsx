import {
  Combobox,
  ComboboxButton,
  ComboboxInput,
  ComboboxOption,
  ComboboxOptions,
} from '@headlessui/react';
import { format, isValid, parseISO } from 'date-fns';
import {
  BanknoteArrowUp,
  Calendar,
  ChevronRight,
  CircleDollarSign,
  Landmark,
  LayoutList,
  Receipt,
  User,
  Wallet,
} from 'lucide-react';
import { useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useLoading } from '../context/LoadingContext';
import { pagamentosIndex } from '../redux/slices/registroPagamentoSlice';
import { index as indexClientes } from '../redux/slices/clienteSlice';
import Pagination from './Pagination';

const currencyFormatter = new Intl.NumberFormat('pt-BR', {
  style: 'currency',
  currency: 'BRL',
});

const formatDate = (value) => {
  if (!value) return 'Sem Data';
  const parsed = parseISO(value);
  if (!isValid(parsed)) return 'Sem Data';
  return format(parsed, 'dd/MM/yyyy');
};

const formatDateTime = (value) => {
  if (!value) return 'Sem Data';
  const parsed = parseISO(value);
  if (!isValid(parsed)) return 'Sem Data';
  return format(parsed, "dd/MM/yyyy 'às' HH:mm");
};

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

  const [filters, setFilters] = useState({
    cliente_id: '',
    data_inicio: '',
    data_fim: '',
  });

  useEffect(() => {
    if (shouldFetch) {
      setLoading(loading);
    }
  }, [loading, shouldFetch]);

  // Carrega clientes
  useEffect(() => {
    if (user?.empresa?.id) {
      dispatch(
        indexClientes({
          empresa_id: user.empresa.id,
          page: 1,
          maxItems: 999,
          pesquisa: '',
        }),
      );
    }
  }, [dispatch, user?.empresa?.id]);

  // Dispara fetch com filtros
  useEffect(() => {
    const timer = setTimeout(() => {
      if (user?.empresa?.id) {
        setShouldFetch(true);
        dispatch(
          pagamentosIndex({
            empresa_id: user.empresa.id,
            page: 1,
            cliente_id: filters.cliente_id || null,
            data_inicio: filters.data_inicio || null,
            data_fim: filters.data_fim || null,
          }),
        );
      }
    }, 300);
    return () => clearTimeout(timer);
  }, [dispatch, user?.empresa?.id, filters]);

  const handlePageChange = (page) => {
    dispatch(
      pagamentosIndex({
        empresa_id: user.empresa.id,
        page,
        cliente_id: filters.cliente_id || null,
        data_inicio: filters.data_inicio || null,
        data_fim: filters.data_fim || null,
      }),
    );
  };

  // ── Métricas ──
  const totalPago = pagamentos.reduce(
    (acc, p) => acc + parseFloat(p.amount || 0),
    0,
  );
  const totalRegistros = pagamentos.length;
  const mediaPorPagamento = totalRegistros > 0 ? totalPago / totalRegistros : 0;

  const clientesFiltrados = (clientes || []).filter((c) =>
    c.nome.toLowerCase().includes(queryCliente.toLowerCase()),
  );

  return (
    <div className="w-full max-w-5xl">
      <div className="bg-white rounded-lg shadow-sm overflow-hidden border border-gray-200">

        {/* ── HEADER ── */}
        <div className="px-6 pt-6 pb-4 border-b border-gray-100 bg-linear-to-r from-white via-primary/2 to-primary/3">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
            <div>
              <h2 className="text-3xl sm:text-4xl font-semibold tracking-tight text-gray-900">
                Pagamentos
              </h2>
              <p className="text-sm text-gray-500 mt-1">
                Histórico de todos os pagamentos registrados.
              </p>
            </div>
          </div>

          {/* ── CARDS DE RESUMO ── */}
          <div className="w-full mt-5 grid grid-cols-1 sm:grid-cols-3 gap-3">

            {/* Card: Total Recebido */}
            <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-primary to-primary-light border-0 p-5 flex flex-col gap-3">
              <div className="absolute -top-4 -right-4 w-20 h-20 rounded-full bg-white/10 blur-xl pointer-events-none" />
              <div className="flex items-center justify-between">
                <span className="text-xs font-semibold uppercase tracking-widest text-white/70">
                  Total Recebido
                </span>
                <span className="flex items-center justify-center w-8 h-8 rounded-xl bg-white/20 text-white">
                  <Wallet size={16} />
                </span>
              </div>
              <p className="text-2xl font-bold text-white leading-none tracking-tight">
                {currencyFormatter.format(totalPago)}
              </p>
              <div className="h-1 w-full rounded-full bg-white/20">
                <div className="h-1 rounded-full bg-white/60 w-full" />
              </div>
            </div>

            {/* Card: Qtd. Registros */}
            <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-primary/5 to-primary/10 border border-primary/15 p-5 flex flex-col gap-3">
              <div className="absolute -top-4 -right-4 w-20 h-20 rounded-full bg-primary/10 blur-xl pointer-events-none" />
              <div className="flex items-center justify-between">
                <span className="text-xs font-semibold uppercase tracking-widest text-primary/70">
                  Qtd. Registros
                </span>
                <span className="flex items-center justify-center w-8 h-8 rounded-xl bg-primary/10 text-primary">
                  <LayoutList size={16} />
                </span>
              </div>
              <p className="text-2xl font-bold text-primary leading-none tracking-tight">
                {totalRegistros}
                <span className="text-sm font-medium text-primary/60 ml-1">pagamentos</span>
              </p>
              <div className="h-1 w-full rounded-full bg-primary/10">
                <div className="h-1 rounded-full bg-gradient-to-r from-primary to-primary-light w-full" />
              </div>
            </div>

            {/* Card: Ticket Médio */}
            <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-violet-50 to-purple-50 border border-violet-100 p-5 flex flex-col gap-3">
              <div className="absolute -top-4 -right-4 w-20 h-20 rounded-full bg-violet-100/60 blur-xl pointer-events-none" />
              <div className="flex items-center justify-between">
                <span className="text-xs font-semibold uppercase tracking-widest text-violet-500">
                  Ticket Médio
                </span>
                <span className="flex items-center justify-center w-8 h-8 rounded-xl bg-violet-100 text-violet-500">
                  <CircleDollarSign size={16} />
                </span>
              </div>
              <p className="text-2xl font-bold text-violet-600 leading-none tracking-tight">
                {currencyFormatter.format(mediaPorPagamento)}
              </p>
              <div className="h-1 w-full rounded-full bg-violet-100">
                <div className="h-1 rounded-full bg-gradient-to-r from-violet-400 to-purple-400 w-full" />
              </div>
            </div>
          </div>
        </div>

        {/* ── FILTROS ── */}
        <div className="px-4 sm:px-6 py-3 border-b border-gray-100 bg-gray-50/50">

          {/* Filtro de Cliente */}
          <div className="mb-3">
            <Combobox
              value={filters.cliente_id}
              onChange={(value) => {
                setFilters((prev) => ({ ...prev, cliente_id: value }));
                setQueryCliente('');
              }}
              immediate
            >
              <div className="relative">
                <div
                  className="h-11 flex items-center px-4 rounded-sm border border-primary-light bg-white hover:bg-primary/5 hover:border-primary/50 transition cursor-text"
                  onClick={() => clienteInputRef.current?.focus()}
                >
                  <User size={18} className="text-primary mr-3 shrink-0" />
                  <ComboboxInput
                    ref={clienteInputRef}
                    className="flex-1 bg-transparent border-none outline-none text-gray-800 font-medium placeholder-gray-400"
                    placeholder="Todos os clientes"
                    autoComplete="off"
                    displayValue={(clienteId) => {
                      if (!clienteId) return '';
                      const c = (clientes || []).find((c) => c.id === clienteId);
                      return c ? c.nome : '';
                    }}
                    onChange={(e) => setQueryCliente(e.target.value)}
                  />
                  <ComboboxButton className="ml-2 shrink-0">
                    <ChevronRight size={18} className="text-gray-400" />
                  </ComboboxButton>
                </div>
                <ComboboxOptions className="absolute z-20 w-full bg-white border border-gray-200 rounded-lg mt-1 max-h-60 overflow-y-auto shadow-xl">
                  <ComboboxOption
                    value=""
                    className={({ active, selected }) =>
                      `flex items-center px-3 py-2.5 cursor-pointer text-sm whitespace-nowrap ${
                        selected
                          ? 'bg-primary/10 text-primary font-medium'
                          : active ? 'bg-gray-50' : ''
                      }`
                    }
                  >
                    Todos os clientes
                  </ComboboxOption>
                  {clientesFiltrados.length === 0 && queryCliente ? (
                    <div className="px-3 py-2.5 text-sm text-gray-400">
                      Nenhum cliente encontrado
                    </div>
                  ) : (
                    clientesFiltrados.map((cliente) => (
                      <ComboboxOption
                        key={cliente.id}
                        value={cliente.id}
                        className={({ active, selected }) =>
                          `flex items-center px-3 py-2.5 cursor-pointer text-sm ${
                            selected
                              ? 'bg-primary/10 text-primary font-medium'
                              : active ? 'bg-gray-50' : ''
                          }`
                        }
                      >
                        <span className="truncate">{cliente.nome}</span>
                      </ComboboxOption>
                    ))
                  )}
                </ComboboxOptions>
              </div>
            </Combobox>
          </div>

          {/* Filtros de Data */}
          <div className="flex flex-wrap sm:flex-nowrap items-center gap-2">

            {/* Data Início */}
            <div
              className="relative cursor-pointer shrink-0"
              onClick={() => {
                const input = dateStartRef.current;
                if (input?.showPicker) input.showPicker();
                else input?.focus();
              }}
            >
              <div className="h-9 inline-flex items-center justify-center gap-2 px-3 rounded-lg border border-gray-300 bg-white hover:bg-gray-50 transition text-sm font-medium whitespace-nowrap">
                <Calendar size={16} className="text-gray-400" />
                <span className="text-gray-500 text-xs">De</span>
                <span className={filters.data_inicio ? 'text-gray-700' : 'text-gray-400'}>
                  {filters.data_inicio ? dateStartDisplay : 'Selecionar'}
                </span>
              </div>
              <input
                ref={dateStartRef}
                type="date"
                value={filters.data_inicio}
                onChange={(e) => {
                  const val = e.target.value;
                  setDateStartDisplay(val ? format(parseISO(val), 'dd/MM/yyyy') : '');
                  setFilters((prev) => ({ ...prev, data_inicio: val }));
                }}
                className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                tabIndex={-1}
              />
            </div>

            {/* Data Fim */}
            <div
              className="relative cursor-pointer shrink-0"
              onClick={() => {
                const input = dateEndRef.current;
                if (input?.showPicker) input.showPicker();
                else input?.focus();
              }}
            >
              <div className="h-9 inline-flex items-center justify-center gap-2 px-3 rounded-lg border border-gray-300 bg-white hover:bg-gray-50 transition text-sm font-medium whitespace-nowrap">
                <Calendar size={16} className="text-gray-400" />
                <span className="text-gray-500 text-xs">Até</span>
                <span className={filters.data_fim ? 'text-gray-700' : 'text-gray-400'}>
                  {filters.data_fim ? dateEndDisplay : 'Selecionar'}
                </span>
              </div>
              <input
                ref={dateEndRef}
                type="date"
                value={filters.data_fim}
                onChange={(e) => {
                  const val = e.target.value;
                  setDateEndDisplay(val ? format(parseISO(val), 'dd/MM/yyyy') : '');
                  setFilters((prev) => ({ ...prev, data_fim: val }));
                }}
                className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                tabIndex={-1}
              />
            </div>

            {/* Limpar datas */}
            {(filters.data_inicio || filters.data_fim) && (
              <button
                type="button"
                onClick={() => {
                  setDateStartDisplay('');
                  setDateEndDisplay('');
                  setFilters((prev) => ({ ...prev, data_inicio: '', data_fim: '' }));
                }}
                className="h-9 rounded-lg px-3 border border-gray-300 bg-white hover:bg-gray-50 transition text-sm font-medium text-gray-600 whitespace-nowrap shrink-0"
              >
                Limpar datas
              </button>
            )}

            {/* Contagem */}
            <span className="ml-auto text-sm text-gray-500 font-medium whitespace-nowrap shrink-0">
              {pagamentos.length} registro{pagamentos.length !== 1 ? 's' : ''}
            </span>
          </div>
        </div>

        {/* ── LISTA DE PAGAMENTOS ── */}
        <div className="divide-y divide-gray-100">
          {pagamentos.length === 0 && (
            <div className="py-12 px-6 text-center">
              <div className="flex flex-col items-center gap-3">
                <div className="w-14 h-14 rounded-2xl bg-gray-100 flex items-center justify-center">
                  <Receipt size={26} className="text-gray-400" />
                </div>
                <p className="text-gray-400 text-base">Nenhum registro de pagamento encontrado.</p>
              </div>
            </div>
          )}

          {pagamentos.length > 0 && (
            <div className="m-4 overflow-hidden rounded-lg">
              <ul className="flex flex-col gap-3">
                {pagamentos.map((pagamento) => {
                  const isGeneral = pagamento.type === 'general';
                  const isPago = true;

                  return (
                    <li
                      key={pagamento.id}
                      className="flex flex-col justify-between rounded-xl border border-gray-200 bg-gray-50 hover:border-primary transition-colors duration-150 p-4"
                    >
                      <div className="flex flex-col gap-2">

                        {/* Linha superior: ícone tipo + título + data */}
                        <div className="flex items-center gap-3 min-w-0">
                          {/* Ícone tipo */}
                          <div
                            className={`shrink-0 flex items-center justify-center w-9 h-9 rounded-xl ${
                              isGeneral
                                ? 'bg-primary/10 text-primary'
                                : 'bg-violet-100 text-violet-600'
                            }`}
                          >
                            {isGeneral ? <Landmark size={17} /> : <CircleDollarSign size={17} />}
                          </div>

                          {/* Título da venda */}
                          <span className="text-base font-semibold text-gray-800 truncate max-w-[55%]">
                            {pagamento.venda?.titulo ?? 'Sem título'}
                          </span>

                          {/* Data */}
                          <span className="text-gray-400 text-xs shrink-0 ml-auto">
                            {formatDateTime(pagamento.created_at)}
                          </span>
                        </div>

                        {/* Linha de detalhes */}
                        <div className="pl-12 flex flex-col gap-1.5">
                          {/* Descrição do pagamento */}
                          <p className="text-sm text-gray-500 leading-relaxed">
                            {pagamento.description}
                          </p>

                          {/* Tags + valor */}
                          <div className="flex items-center gap-2 flex-wrap mt-1">
                            {/* Badge tipo */}
                            {isGeneral ? (
                              <span className="inline-flex items-center gap-1.5 rounded-md bg-primary/10 text-primary border border-primary/20 px-2.5 py-0.5 text-xs font-semibold">
                                <LayoutList size={11} />
                                Pagamento Geral
                              </span>
                            ) : (
                              <span className="inline-flex items-center gap-1.5 rounded-md bg-violet-100 text-violet-700 border border-violet-200 px-2.5 py-0.5 text-xs font-semibold">
                                <CircleDollarSign size={11} />
                                Pagamento Individual
                              </span>
                            )}

                            {/* Nome do cliente */}
                            {pagamento.venda?.cliente && (
                              <span className="inline-flex items-center rounded-md bg-gray-100 text-gray-600 border border-gray-200 px-2.5 py-0.5 text-xs font-medium gap-1">
                                <User size={11} />
                                {pagamento.venda.cliente.nome ?? 'Sem cliente'}
                              </span>
                            )}

                            {/* Valor do pagamento - destaque */}
                            <span className="ml-auto inline-flex items-center rounded-md bg-green-50 text-green-700 border border-green-200 px-3 py-1 text-sm font-bold">
                              + {currencyFormatter.format(Number(pagamento.amount) || 0)}
                            </span>
                          </div>

                          {/* Descrição da venda, se houver */}
                          {pagamento.venda?.descricao && (
                            <p className="text-xs text-gray-400 mt-0.5 line-clamp-1">
                              <span className='font-semibold'>Descrição da venda/serviço:</span> {pagamento.venda.descricao}
                            </p>
                          )}
                        </div>
                      </div>
                    </li>
                  );
                })}
              </ul>
            </div>
          )}
        </div>

        {/* ── PAGINAÇÃO ── */}
        {pagamentos.length > 0 && (
          <div className="border-t border-gray-100 bg-gray-50">
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