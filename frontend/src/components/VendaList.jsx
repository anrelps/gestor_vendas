import {
  Combobox,
  ComboboxButton,
  ComboboxInput,
  ComboboxOption,
  ComboboxOptions,
} from '@headlessui/react';
import { endOfMonth, format, isValid, parseISO, startOfMonth } from 'date-fns';
import {
  Calendar,
  ChevronRight,
  FileText,
  Logs,
  Plus,
  Share2,
  Trash2,
  User,
} from 'lucide-react';
import { useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { useLoading } from '../context/LoadingContext';
import { index as indexClientes } from '../redux/slices/clienteSlice';
import {
  destroy,
  gerarRelatorioVendas,
  index,
} from '../redux/slices/vendaSlice';
import ConfirmDialog from './ConfirmDialog';
import NewButton from './layout/NewButton';
import Pagination from './Pagination';

const currencyFormatter = new Intl.NumberFormat('pt-BR', {
  style: 'currency',
  currency: 'BRL',
});

const formatVendaDate = (value) => {
  if (!value) return 'Sem Data';
  const parsed = parseISO(value);
  if (!isValid(parsed)) return 'Sem Data';
  return format(parsed, 'dd/MM/yyyy');
};

const VendaList = () => {
  const [search, setSearch] = useState('');
  const [queryCliente, setQueryCliente] = useState('');
  const clienteInputRef = useRef(null);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { vendas, loading } = useSelector((state) => state.venda);
  const { clientes } = useSelector((state) => state.cliente);
  const { user } = useSelector((state) => state.user);

  const [filters, setFilters] = useState({
    valor_min: '',
    valor_max: '',
    cliente: '',
    data_min: '',
    data_max: '',
    pendencias: 0,
    vendas_ids: [],
  });

  const getMonthRange = () => {
    const now = new Date();
    const start = startOfMonth(now);
    const end = endOfMonth(now);
    const toISO = (d) => format(d, 'yyyy-MM-dd');
    return { start: toISO(start), end: toISO(end) };
  };

  const itemsPerPage = 15;

  const [shouldFetch, setShouldFetch] = useState(false);
  const { setLoading } = useLoading();

  useEffect(() => {
    if (shouldFetch) {
      setLoading(loading);
    }
  }, [loading, shouldFetch]);

  const [dateStart, setDateStart] = useState(() => {
    const now = new Date();
    const start = startOfMonth(now);
    return format(start, 'yyyy-MM-dd');
  });

  const [dateEnd, setDateEnd] = useState(() => {
    const now = new Date();
    const end = endOfMonth(now);
    return format(end, 'yyyy-MM-dd');
  });

  const dateStartRef = useRef(null);
  const dateEndRef = useRef(null);

  const [removeVendaId, setRemoveVendaId] = useState(null);
  const [showDeletePopup, setShowDeletePopup] = useState(false);

  const handleRemoveVenda = (id) => {
    setRemoveVendaId(id);
    setShowDeletePopup(true);
  };

  const confirmDelete = async () => {
    try {
      await dispatch(
        destroy({ empresa_id: user.empresa.id, venda_id: removeVendaId }),
      ).unwrap();
      setShowDeletePopup(false);
      setRemoveVendaId(null);
    } catch (error) {
      console.log('Venda destroy error: ', error);
    }
  };

  const cancelDelete = () => {
    setShowDeletePopup(false);
    setRemoveVendaId(null);
  };

  // Carregar clientes
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

  useEffect(() => {
    if (user?.empresa?.id && vendas.length === 0) {
      setShouldFetch(true);
      dispatch(
        index({
          empresa_id: user?.empresa?.id,
          page: 1,
          maxItems: itemsPerPage,
        }),
      );
    }
  }, [dispatch, user?.empresa?.id]);

  useEffect(() => {
    setShouldFetch(true);
    dispatch(
      index({
        empresa_id: user?.empresa?.id,
        data_max: filters['data_max'],
        data_min: filters['data_min'],
        pendencias: filters['pendencias'],
        cliente: filters['cliente'],
      }),
    );
  }, [filters]);

  const handleChange = (key) => (e) => {
    setFilters((prev) => ({ ...prev, [key]: e.target.value }));
  };

  const [selectedVendasIds, setSelectedVendasIds] = useState([]);

  const isDateFilterApplied = Boolean(filters.data_min || filters.data_max);

  const handleGerarRelatorio = async () => {
    setLoading(true);
    const empresa_id = user?.empresa?.id;

    if (!empresa_id) {
      setLoading(false);
      return;
    }

    // Fonte de verdade: seleção atual (evita filters "atrasado")
    const finalFilters = {
      ...filters,
      vendas_ids: selectedVendasIds,
    };

    // Se você quiser impedir "imprimir tudo" quando nada estiver selecionado:
    // if (!finalFilters.vendas_ids?.length) { setLoading(false); return; }

    try {
      const response = await dispatch(
        gerarRelatorioVendas({
          empresa_id,
          filters: finalFilters,
        }),
      );

      if (gerarRelatorioVendas.fulfilled.match(response)) {
        const blob = response.payload;
        const url = window.URL.createObjectURL(blob);
        window.open(url, '_blank');

        setTimeout(() => {
          window.URL.revokeObjectURL(url);
        }, 1000);
      }
    } finally {
      setLoading(false);
    }
  };

  const handleCopiarLinkRelatorio = async () => {
    const empresa_id = user?.empresa?.id;
    //const baseURL = ''; // URL PROD
    //const baseURL = 'http://127.0.0.1:8000/api/v1/'; // URL DEV
    const baseURL = 'https://uselumenz.com/api/v1/'; // URL PROD
    const endpoint = `public/relatorios/${empresa_id}/pdf/vendas`;

    const filtrosLimpos = Object.fromEntries(
      Object.entries(filters).filter(([key, value]) => {
        if (typeof value === 'string') return value.length > 0;
        if (typeof value === 'number') return value > 0;
        return true;
      }),
    );

    const params = new URLSearchParams();
    Object.entries(filtrosLimpos).forEach(([key, value]) => {
      if (Array.isArray(value)) {
        value.forEach((v) => params.append(`${key}[]`, v));
      } else {
        params.append(key, value);
      }
    });

    const url = `${baseURL}${endpoint}?${params.toString()}`;
    const mensagem = `Olá! Segue seu relatório de venda/serviços:
${url}`;
    navigator.clipboard.writeText(mensagem);
    alert('Mensagem Copiada com sucesso!');
    return url;
  };

  const handleSelectVenda = (id) => {
    setSelectedVendasIds((prev) => {
      const newIds = prev.includes(id)
        ? prev.filter((vendaId) => vendaId !== id)
        : [...prev, id];

      setFilters((prevFilters) => ({ ...prevFilters, vendas_ids: newIds }));
      return newIds;
    });
  };

  const allSelected =
    vendas.length > 0 &&
    vendas.every((venda) => selectedVendasIds.includes(venda.id));

  const handleToggleSelectAll = () => {
    const visibleIds = vendas.map((v) => v.id);

    if (allSelected) {
      // remove os visíveis baseado no estado anterior (sem stale)
      setSelectedVendasIds((prev) => {
        const newIds = prev.filter((id) => !visibleIds.includes(id));
        setFilters((prevFilters) => ({ ...prevFilters, vendas_ids: newIds }));
        return newIds;
      });
      return;
    }

    // adiciona visíveis aos já selecionados
    setSelectedVendasIds((prev) => {
      const newIds = [...new Set([...prev, ...visibleIds])];
      setFilters((prevFilters) => ({ ...prevFilters, vendas_ids: newIds }));
      return newIds;
    });
  };

  const handleClearSelection = () => {
    setSelectedVendasIds([]);
    setFilters((prevFilters) => ({ ...prevFilters, vendas_ids: [] }));
  };

  const valorTotal = vendas.reduce((total, venda) => total + venda.valor_total, 0);
  const valorTotalPendente = valorTotal - vendas.reduce((total, venda) => total + venda.valor_pago, 0);

  return (
    <div className=''>
      <div className='w-full max-w-5xl'>
        <div className='bg-white rounded-lg shadow-sm overflow-hidden border border-gray-200'>
          
          {/* Header */}
          <div className='px-6 pt-6 pb-4 border-b border-gray-100 bg-linear-to-r from-white via-primary/2 to-primary/3'>
            <div className='flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3'>
              <div>
                <h2 className='text-3xl sm:text-4xl font-semibold tracking-tight text-gray-900'>
                  Vendas
                </h2>
                <p className='text-sm text-gray-500 mt-1'>
                  Acompanhe as vendas e pagamentos.
                </p>
              </div>
              <NewButton
                label='Nova Venda'
                icon={<Plus size={18} />}
                onClick={() => navigate('/nova-venda')}
              />
            </div>

            {/* RESUMO DE VENDAS */}
            <div className="w-full mt-5 p-4 md:flex justify-between gap-3">
              <div className='w-full border border-gray-300 rounded-xl p-5'>
                <span className='block text-gray-600 text-left text-sm'>Total Pendente</span>
                <p className='text-red-500 font-semibold text-left'>
                  {currencyFormatter.format(
                    Number(valorTotalPendente) || 0,
                  )}
                </p>
              </div>

              <div className='w-full border border-gray-300 rounded-xl p-5 my-3 md:my-0'>
                <span className='block text-gray-600 text-left text-sm'>Total Geral</span>
                <p className='text-primary font-semibold text-left'>
                  {currencyFormatter.format(
                    Number(valorTotal) || 0,
                  )}
                </p>
              </div>

              <div className='w-full border border-gray-300 bg-primary rounded-xl p-5'>
                <span className='block text-left text-sm text-white'>Qtd. Vendas/Serviços</span>
                <p className='font-semibold text-left text-white'>
                  { vendas.length }
                </p>
              </div>
            </div>
          </div>

          {/* Filtros */}
          <div className='px-4 sm:px-6 py-3 border-b border-gray-100 bg-gray-50/50'>
            {/* Filtro de Cliente - Destacado */}
            <div className='mb-3'>
              <Combobox
                value={filters.cliente}
                onChange={(value) => {
                  setFilters((prev) => ({ ...prev, cliente: value }));
                  setQueryCliente('');
                }}
                immediate
              >
                <div className='relative'>
                  <div
                    className='h-11 flex items-center px-4 rounded-lg border border-primary-light bg-white hover:bg-primary/5 hover:border-primary/50 transition cursor-text'
                    onClick={() => clienteInputRef.current?.focus()}
                  >
                    <User size={18} className='text-primary mr-3 shrink-0' />
                    <ComboboxInput
                      ref={clienteInputRef}
                      className='flex-1 bg-transparent border-none outline-none text-gray-800 font-medium placeholder-gray-400'
                      placeholder='Todos os clientes'
                      displayValue={(clienteId) => {
                        if (!clienteId) return '';
                        const c = clientes.find((c) => c.id === clienteId);
                        return c ? c.nome : '';
                      }}
                      onChange={(e) => setQueryCliente(e.target.value)}
                    />
                    <ComboboxButton className='ml-2 shrink-0'>
                      <ChevronRight size={18} className='text-gray-400' />
                    </ComboboxButton>
                  </div>
                  <ComboboxOptions className='absolute z-20 w-full bg-white border border-gray-200 rounded-lg mt-1 max-h-60 overflow-y-auto shadow-xl'>
                    {(() => {
                      const clientesFiltrados = clientes.filter((cliente) =>
                        cliente.nome
                          .toLowerCase()
                          .includes(queryCliente.toLowerCase()),
                      );
                      return (
                        <>
                          <ComboboxOption
                            value=''
                            className={({ active, selected }) =>
                              `flex items-center px-3 py-2.5 cursor-pointer text-sm whitespace-nowrap ${
                                selected
                                  ? 'bg-primary/10 text-primary font-medium'
                                  : active
                                    ? 'bg-gray-50'
                                    : ''
                              }`
                            }
                          >
                            Todos os clientes
                          </ComboboxOption>
                          {clientesFiltrados.length === 0 && queryCliente ? (
                            <div className='px-3 py-2.5 text-sm text-gray-400'>
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
                                      : active
                                        ? 'bg-gray-50'
                                        : ''
                                  }`
                                }
                              >
                                <span className='truncate'>{cliente.nome}</span>
                              </ComboboxOption>
                            ))
                          )}
                        </>
                      );
                    })()}
                  </ComboboxOptions>
                </div>
              </Combobox>
            </div>

            {/* Outros Filtros */}
            <div className='flex flex-wrap items-center gap-2'>
              <div
                className={`flex items-center gap-2 text-sm font-semibold rounded-lg px-2 h-9 border ${
                  allSelected
                    ? 'text-primary bg-primary/10 border-primary/20'
                    : 'text-gray-700 bg-white border-transparent'
                }`}
              >
                <label className='flex items-center gap-2 cursor-pointer'>
                  <input
                    type='checkbox'
                    checked={allSelected}
                    onChange={handleToggleSelectAll}
                    className='h-4 w-4 rounded border-gray-300 text-primary focus:ring-primary accent-primary'
                  />
                  Selecionar todas
                </label>
                {selectedVendasIds.length > 0 && (
                  <button
                    type='button'
                    onClick={handleClearSelection}
                    className='text-sm font-semibold border border-gray-200 rounded-md px-3.5 py-1 bg-white text-gray-700 hover:text-gray-900'
                  >
                    Limpar
                  </button>
                )}
              </div>

              {/* Filtro: Não pagas */}
              <button
                value={filters.pendencias == 1 ? 0 : 1}
                onClick={handleChange('pendencias')}
                className={`${
                  filters.pendencias == 1
                    ? 'bg-primary text-white border-primary'
                    : 'bg-white text-gray-700 border-gray-300 hover:bg-gray-50'
                } h-9 rounded-lg px-3 border transition text-sm font-medium cursor-pointer inline-flex items-center gap-2 whitespace-nowrap`}
                title='Mostrar apenas vendas não pagas'
              >
                <span
                  className={`w-2 h-2 rounded-full ${
                    filters.pendencias == 1 ? 'bg-white' : 'bg-yellow-500'
                  }`}
                />
                Não pagas
              </button>

              <div className='flex items-center gap-2 flex-nowrap'>
                {/* Filtro: Data Início */}
                <div
                  className='relative cursor-pointer'
                  onClick={() => {
                    const input = dateStartRef.current;
                    if (input?.showPicker) input.showPicker();
                    else input?.focus();
                  }}
                >
                  <div className='h-9 inline-flex items-center justify-center gap-2 px-3 rounded-lg border border-gray-300 bg-white hover:bg-gray-50 transition text-sm font-medium whitespace-nowrap'>
                    <Calendar size={16} className='text-gray-400' />
                    <span className='text-gray-500 text-xs'>De</span>
                    <span
                      className={
                        filters.data_min ? 'text-gray-700' : 'text-gray-400'
                      }
                    >
                      {filters.data_min ? dateStart : 'Selecionar'}
                    </span>
                  </div>
                  <input
                    ref={dateStartRef}
                    type='date'
                    value={dateStart}
                    onChange={(e) => {
                      setDateStart(e.target.value);
                      handleChange('data_min')(e);
                    }}
                    className='absolute inset-0 w-full h-full opacity-0 cursor-pointer'
                    tabIndex={-1}
                  />
                </div>

                {/* Filtro: Data Fim */}
                <div
                  className='relative cursor-pointer'
                  onClick={() => {
                    const input = dateEndRef.current;
                    if (input?.showPicker) input.showPicker();
                    else input?.focus();
                  }}
                >
                  <div className='h-9 inline-flex items-center justify-center gap-2 px-3 rounded-lg border border-gray-300 bg-white hover:bg-gray-50 transition text-sm font-medium whitespace-nowrap'>
                    <Calendar size={16} className='text-gray-400' />
                    <span className='text-gray-500 text-xs'>Até</span>
                    <span
                      className={
                        filters.data_max ? 'text-gray-700' : 'text-gray-400'
                      }
                    >
                      {filters.data_max ? dateEnd : 'Selecionar'}
                    </span>
                  </div>
                  <input
                    ref={dateEndRef}
                    type='date'
                    value={dateEnd}
                    onChange={(e) => {
                      setDateEnd(e.target.value);
                      handleChange('data_max')(e);
                    }}
                    className='absolute inset-0 w-full h-full opacity-0 cursor-pointer'
                    tabIndex={-1}
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Lista de Vendas */}
          <div className='divide-y divide-gray-100'>
            {vendas.length === 0 && (
              <div className='py-6 px-3 sm:px-6 text-center text-gray-400'>
                Nenhuma venda encontrada.
              </div>
            )}

            {vendas.length > 0 && (
              <div className='m-4 overflow-hidden rounded-lg'>
                <ul className='flex flex-col gap-3'>
                  {vendas.map((venda) => (
                    <li
                      key={venda.id}
                      className={`flex flex-col justify-between rounded-xl border transition-colors duration-150 p-4 h-full min-h-30 ${
                        selectedVendasIds.includes(venda.id)
                          ? 'border-primary/30 bg-primary/10'
                          : 'border-gray-200 bg-gray-50 hover:border-primary'
                      }`}
                    >
                      <div className='flex flex-col gap-2 flex-1'>
                        <div className='flex items-center gap-3 min-w-0'>
                          <div className='shrink-0 flex items-center justify-center'>
                            <input
                              type='checkbox'
                              checked={selectedVendasIds.includes(venda.id)}
                              onChange={() => handleSelectVenda(venda.id)}
                              className='h-4 w-4 rounded border-gray-300 text-primary focus:ring-primary accent-primary'
                            />
                          </div>
                          <span className='text-base font-semibold text-gray-800 truncate max-w-[60%]'>
                            {venda?.titulo ?? 'Sem título'}
                          </span>
                          <span className='text-gray-400 text-xs shrink-0 ml-auto'>
                            <span className='block truncate max-w-22.5 text-ellipsis overflow-hidden'>
                              {formatVendaDate(venda?.created_at)}
                            </span>
                          </span>
                        </div>

                        <div className='pl-7'>
                          <div className='sm:hidden'>
                            <div className='flex flex-col gap-2'>
                              <span className='text-base text-gray-700 truncate font-medium'>
                                {venda?.cliente?.nome ?? 'Sem cliente'}
                              </span>

                              <div className='flex items-center gap-2 flex-wrap'>
                                {(Number(venda?.valor_pago) || 0) <
                                (Number(venda?.valor_total) || 0) ? (
                                  <span className='inline-block bg-gray-100 text-gray-700 font-semibold rounded px-2 py-0.5 text-sm border border-gray-200 whitespace-normal break-all'>
                                    {currencyFormatter.format(
                                      Number(venda?.valor_pago) || 0,
                                    )}{' '}
                                    /{' '}
                                    {currencyFormatter.format(
                                      Number(venda?.valor_total) || 0,
                                    )}
                                  </span>
                                ) : (
                                  <span className='inline-block bg-green-50 text-gray-700 font-semibold rounded px-2 py-0.5 text-sm border border-green-300 whitespace-normal break-all'>
                                    {currencyFormatter.format(
                                      Number(venda?.valor_total) || 0,
                                    )}
                                  </span>
                                )}

                                {(Number(venda?.valor_pago) || 0) <
                                (Number(venda?.valor_total) || 0) ? (
                                  <span className='inline-flex items-center rounded-md bg-yellow-100 text-yellow-800 border border-yellow-300 px-2.5 py-0.5 text-xs font-semibold shadow-sm'>
                                    Pendente
                                  </span>
                                ) : (
                                  <span className='inline-flex items-center rounded-md bg-green-100 text-green-800 border border-green-300 px-2.5 py-0.5 text-xs font-semibold shadow-sm'>
                                    Pago
                                  </span>
                                )}
                              </div>

                              <div className='flex items-center justify-between w-full'>
                                <Link
                                  to={`/vendas/${venda.id}/editar`}
                                  className='flex items-center gap-3 text-primary hover:text-primary/70 transition cursor-pointer'
                                  title='Ir até a venda'
                                >
                                  <span className='text-sm font-semibold'>
                                    Ir até a venda
                                  </span>
                                  <Logs size={22} />
                                </Link>

                                <button
                                  className='px-2 py-2 text-gray-600 hover:text-gray-800 text-sm font-semibold flex items-center justify-center cursor-pointer'
                                  onClick={(e) => {
                                    e.stopPropagation();
                                    handleRemoveVenda(venda.id);
                                  }}
                                >
                                  <Trash2 size={20} />
                                </button>
                              </div>
                            </div>

                            {venda.descricao && (
                              <span className='text-xs text-gray-500 mt-1 line-clamp-2'>
                                {venda.descricao}
                              </span>
                            )}
                          </div>

                          <div className='hidden sm:block'>
                            <div className='flex items-center gap-2 flex-wrap'>
                              <span className='text-base text-gray-700 truncate font-medium max-w-[60%]'>
                                {venda?.cliente?.nome ?? 'Sem cliente'}
                              </span>

                              {(Number(venda?.valor_pago) || 0) <
                              (Number(venda?.valor_total) || 0) ? (
                                <span className='inline-block bg-gray-100 text-gray-700 font-semibold rounded px-2 py-0.5 text-sm border border-gray-200 ml-auto max-w-full whitespace-normal break-all'>
                                  {currencyFormatter.format(
                                    Number(venda?.valor_pago) || 0,
                                  )}{' '}
                                  /{' '}
                                  {currencyFormatter.format(
                                    Number(venda?.valor_total) || 0,
                                  )}
                                </span>
                              ) : (
                                <span className='inline-block bg-green-50 text-gray-700 font-semibold rounded px-2 py-0.5 text-sm border border-green-300 ml-auto max-w-full whitespace-normal break-all'>
                                  {currencyFormatter.format(
                                    Number(venda?.valor_total) || 0,
                                  )}
                                </span>
                              )}
                            </div>

                            {venda.descricao && (
                              <span className='text-xs text-gray-500 mt-1 line-clamp-2'>
                                {venda.descricao}
                              </span>
                            )}
                          </div>
                        </div>
                      </div>

                      <div className='hidden sm:flex items-center justify-between flex-row-reverse mt-3 gap-2 pl-7'>
                        <div className='flex items-center gap-2'>
                          {(Number(venda?.valor_pago) || 0) <
                          (Number(venda?.valor_total) || 0) ? (
                            <span className='inline-flex items-center rounded-md bg-yellow-100 text-yellow-800 border border-yellow-300 px-3 py-1 text-sm font-semibold shadow-sm'>
                              Pendente
                            </span>
                          ) : (
                            <span className='inline-flex items-center rounded-md bg-green-100 text-green-800 border border-green-300 px-3 py-1 text-sm font-semibold shadow-sm'>
                              Pago
                            </span>
                          )}

                          <button
                            className='px-2 py-2 text-gray-600 hover:text-gray-800 text-sm font-semibold flex items-center justify-center cursor-pointer'
                            onClick={(e) => {
                              e.stopPropagation();
                              handleRemoveVenda(venda.id);
                            }}
                          >
                            <Trash2 size={20} />
                          </button>
                        </div>

                        <Link
                          to={`/vendas/${venda.id}/editar`}
                          className='flex items-center gap-5 text-primary hover:text-primary/70 transition cursor-pointer'
                          title='Ir até a venda'
                        >
                          <span className='text-sm font-semibold'>
                            Ir até a venda
                          </span>
                          <Logs size={22} />
                        </Link>
                      </div>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>

          <div>
            <Pagination current_page={1} lastPage={1} onPageChange={() => {}} />
          </div>

          <div className='px-6 mt-4 mb-6 flex flex-col md:flex-row gap-2'>
            <button
              onClick={handleGerarRelatorio}
              className='flex-1 px-3 py-2 rounded bg-primary hover:bg-primary/90 text-white font-semibold transition flex items-center justify-center gap-2 cursor-pointer'
              title='Gerar relatório em PDF'
            >
              <FileText size={17} />
              <span>Gerar PDF</span>
            </button>

            <button
              onClick={handleCopiarLinkRelatorio}
              className='flex-1 px-3 py-2 rounded bg-primary hover:bg-primary/90 text-white font-semibold transition flex items-center justify-center gap-2 cursor-pointer'
              title='Compartilhar PDF'
            >
              <Share2 size={17} />
              <span>Compartilhar (PDF)</span>
            </button>
          </div>
        </div>
      </div>

      <ConfirmDialog
        open={showDeletePopup}
        title='Remover Venda/OS?'
        message='Tem certeza que deseja remover esta Venda/OS? Esta ação não pode ser desfeita.'
        onConfirm={confirmDelete}
        onCancel={cancelDelete}
      />
    </div>
  );
};

export default VendaList;
