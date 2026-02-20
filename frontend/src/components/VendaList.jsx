import {
  Combobox,
  ComboboxButton,
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
  User,
  Share2,
} from 'lucide-react';
import { useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { index as indexClientes } from '../redux/slices/clienteSlice';
import { gerarRelatorioVendas, index } from '../redux/slices/vendaSlice';
import NewButton from './layout/NewButton';
import Pagination from './Pagination';

import { useLoading } from '../context/LoadingContext';

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

  const handleGerarRelatorio = async () => {
    setLoading(true);
    const empresa_id = user?.empresa?.id;
    if (empresa_id) {
      const response = await dispatch(
        gerarRelatorioVendas({
          empresa_id,
          filters,
        }),
      );

      if (gerarRelatorioVendas.fulfilled.match(response)) {
        const blob = response.payload;
        const url = window.URL.createObjectURL(blob);
        window.open(url, '_blank');
      }

      setTimeout(() => {
        window.URL.revokeObjectURL(url);
      }, 100);
    }
    setLoading(false);
  };

  const handleCopiarLinkRelatorio = async () => {
    const empresa_id = user?.empresa?.id;
    //const baseURL = ''; // URL PROD
    //const baseURL = 'http://localhost:9000/api/v1'; // URL DEV
    const baseURL = 'https://uselumenz.com/api/v1/'; // URL PROD
    const endpoint = `public/relatorios/${empresa_id}/pdf/vendas`;

    const filtrosLimpos = Object.fromEntries(
      Object.entries(filters).filter(([key, value]) => {
        if (typeof value === 'string') return value.length > 0;
        if (typeof value === 'number') return value > 0;
        return true;
      })
    );

    console.log(filtrosLimpos);

    const params = new URLSearchParams({
      ...filtrosLimpos,
    });
    const url = `${baseURL}${endpoint}?${params.toString()}`;
        const mensagem = `Olá! Segue seu relatório de venda/serviços:
${url}`;
    navigator.clipboard.writeText(mensagem);
    alert('Mensagem Copiada com sucesso!');
    return url;
  }

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
                shortLabel='Nova'
                icon={<Plus size={18} />}
                onClick={() => navigate('/nova-venda')}
              />
            </div>
          </div>

          {/* Filtros */}
          <div className='px-4 sm:px-6 py-3 border-b border-gray-100 bg-gray-50/50'>
            {/* Layout flexível: wrap em mobile, linha em desktop */}
            <div className='flex flex-wrap items-center gap-2'>
              {/* Filtro: Não pagas - tamanho fixo */}
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
                  className={`w-2 h-2 rounded-full ${filters.pendencias == 1 ? 'bg-white' : 'bg-yellow-500'}`}
                />
                Não pagas
              </button>

              {/* Filtro: Cliente - cresce mas nunca trunca "Todos os clientes" */}
              <Combobox
                value={filters.cliente}
                onChange={(value) => {
                  setFilters((prev) => ({ ...prev, cliente: value }));
                }}
              >
                <div className='relative'>
                  <ComboboxButton>
                    <div className='h-9 inline-flex items-center px-3 rounded-lg border border-gray-300 bg-white hover:bg-gray-50 transition cursor-pointer text-sm font-medium whitespace-nowrap'>
                      <User size={16} className='text-gray-400 mr-2 shrink-0' />
                      <span className='text-gray-700'>
                        {(() => {
                          if (!filters.cliente) return 'Todos os clientes';
                          const c = clientes.find(
                            (c) => c.id === filters.cliente,
                          );
                          return c ? c.nome : 'Todos os clientes';
                        })()}
                      </span>
                      <ChevronRight
                        size={16}
                        className='text-gray-400 ml-2 shrink-0'
                      />
                    </div>
                  </ComboboxButton>
                  <ComboboxOptions className='absolute z-20 min-w-full bg-white border border-gray-200 rounded-lg mt-1 max-h-60 overflow-y-auto shadow-xl'>
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
                    {clientes.map((cliente) => (
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
                    ))}
                  </ComboboxOptions>
                </div>
              </Combobox>

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
                  <span className='text-gray-700'>{dateStart}</span>
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
                  <span className='text-gray-700'>{dateEnd}</span>
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
              <div>
                <button 
                  className="h-9 inline-flex items-center justify-center gap-2 px-3 rounded-lg bg-white hover:bg-gray-50 border border-gray-300 text-sm font-medium"
                  onClick={handleCopiarLinkRelatorio}
                >
                    <Share2 size={16} className='text-gray-400' />
                    <span className='text-gray-700'>Compartilhar (PDF)</span>
                </button>
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
                <ul className='flex flex-col gap-4'>
                  {vendas.map((venda) => (
                    <li
                      key={venda.id}
                      className='flex flex-col justify-between rounded-xl border border-gray-200 bg-gray-50 hover:border-primary transition-colors duration-150 p-5 h-full min-h-30'
                    >
                      <div className='flex flex-col gap-2 flex-1'>
                        <div className='flex items-center gap-2 min-w-0'>
                          <span className='text-base font-semibold text-gray-800 truncate max-w-[60%]'>
                            {venda?.titulo ?? 'Sem título'}
                          </span>
                          <span className='text-gray-400 text-xs shrink-0 ml-auto'>
                            <span className='block truncate max-w-22.5 text-ellipsis overflow-hidden'>
                              {formatVendaDate(venda?.created_at)}
                            </span>
                          </span>
                        </div>
                        <div className='flex items-center gap-2 flex-wrap'>
                          <span className='text-base text-gray-700 truncate font-medium max-w-[60%]'>
                            {venda?.cliente?.nome ?? 'Sem cliente'}
                          </span>
                          {(Number(venda?.valor_pago) || 0) <
                          (Number(venda?.valor_total) || 0) ? (
                            <span className='inline-block bg-yellow-50 text-yellow-700 font-semibold rounded px-2 py-0.5 text-sm shadow-sm border border-yellow-200 ml-auto max-w-full whitespace-normal break-all'>
                              {currencyFormatter.format(
                                Number(venda?.valor_pago) || 0,
                              )}{' '}
                              /{' '}
                              {currencyFormatter.format(
                                Number(venda?.valor_total) || 0,
                              )}
                            </span>
                          ) : (
                            <span className='inline-block bg-green-50 text-green-600 font-semibold rounded px-2 py-0.5 text-sm shadow-sm border border-green-100 ml-auto max-w-full whitespace-normal break-all'>
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
                      <div className='flex items-center justify-end mt-4 gap-2'>
                        <Link
                          to={`/vendas/${venda.id}/editar`}
                          className='flex items-center gap-5 text-primary hover:text-primary/70 transition cursor-pointer'
                          title='Ir até a venda'
                        >
                          <span className='text-xs font-semibold'>
                            Ir até a venda
                          </span>
                          <Logs size={20} />
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
        </div>
      </div>

      {/* Botão Flutuante Gerar PDF */}
      <button
        onClick={handleGerarRelatorio}
        className='fixed bottom-6 right-6 z-50 flex items-center justify-center gap-3 px-6 py-4 rounded-full bg-primary hover:bg-primary/90 text-white shadow-lg hover:shadow-xl transition-all duration-200 font-semibold text-base group cursor-pointer'
        title='Gerar relatório em PDF'
      >
        <FileText
          size={22}
          className='group-hover:scale-110 transition-transform'
        />
        <span>Gerar PDF</span>
      </button>
    </div>
  );
};

export default VendaList;
