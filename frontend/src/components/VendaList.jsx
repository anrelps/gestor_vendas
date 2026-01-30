import { endOfMonth, format, startOfMonth } from 'date-fns';
import { Calendar, Logs, Plus } from 'lucide-react';
import { useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { index } from '../redux/slices/vendaSlice';
import NewButton from './layout/NewButton';

import { useLoading } from '../context/LoadingContext';

const VendaList = () => {
  const [search, setSearch] = useState('');
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { vendas, loading } = useSelector((state) => state.venda);
  const { user } = useSelector((state) => state.user);

  const getMonthRange = () => {
    const now = new Date();
    const start = startOfMonth(now);
    const end = endOfMonth(now);
    const toISO = (d) => format(d, 'yyyy-MM-dd');
    return { start: toISO(start), end: toISO(end) };
  };

  const { setLoading } = useLoading();
  
  useEffect(() => {
    setLoading(loading);
  }, [loading]);

  const { start, end } = getMonthRange();
  const [dateStart, setDateStart] = useState(start);
  const [dateEnd, setDateEnd] = useState(end);

  const dateStartRef = useRef(null);
  const dateEndRef = useRef(null);

  useEffect(() => {
    if (user?.empresa?.id) {
      dispatch(index({ empresa_id: user?.empresa?.id }));
    }
  }, [dispatch, user?.empresa?.id]);

  return (
    <div className='w-full flex flex-col items-center mt-4 px-2 bg-gray-50'>
      <div className='w-full max-w-5xl'>
        <h2 className='text-2xl font-bold text-black mb-2 px-2 sm:px-0'>
          Vendas
        </h2>
        <div className='bg-white rounded-md shadow-sm overflow-hidden border border-gray-200'>
          <div className='flex flex-col gap-3 px-6 py-3 border-b-2 bg-linear-to-r from-white via-white/30 to-black/1 border-black/2'>
            <div className='w-full flex flex-col sm:flex-row sm:items-center sm:justify-start gap-2'>
              <div className='flex flex-1 gap-2'>
                <NewButton
                  label='Nova Venda'
                  shortLabel='Nova'
                  icon={<Plus size={18} />}
                  onClick={() => navigate('/nova-venda')}
                />
                <input
                  type='text'
                  className='w-full max-w-xs truncate rounded-sm border border-gray-200 px-3 sm:px-4 py-2 text-gray-700 bg-gray- focus:bg-white focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary transition-all duration-100 '
                  placeholder='Buscar venda...'
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                />
              </div>
            </div>
            <div className='flex flex-wrap gap-4 mt-1 items-center'>
              <button
                className='rounded-full px-3 py-1 bg-gray-100 text-gray-700 border border-gray-300 hover:bg-gray-200 hover:text-black transition text-sm font-medium shadow-none cursor-pointer'
                title='Mostrar apenas vendas não pagas'
              >
                Não pagas
              </button>
              {/* Datas: mobile em coluna, desktop em linha */}
              <div className='flex flex-col w-full gap-2 sm:flex-row sm:w-auto sm:gap-2'>
                {/* Data início */}
                <div
                  className='flex items-center gap-2 relative cursor-pointer group flex-1'
                  onClick={() =>
                    dateStartRef.current &&
                    dateStartRef.current.showPicker &&
                    dateStartRef.current.showPicker()
                  }
                  tabIndex={0}
                  role='button'
                >
                  <label className='text-xs text-gray-500' htmlFor='dateStart'>
                    Início:
                  </label>
                  <div className='relative flex items-center w-full max-w-31.25 sm:max-w-none sm:w-31.25'>
                    <input
                      id='dateStart'
                      type='text'
                      inputMode='none'
                      value={dateStart}
                      readOnly
                      className='rounded-full px-3 py-1 bg-gray-100 text-gray-700 border border-gray-300 pr-9 hover:bg-gray-200 focus:bg-white focus:outline-none transition text-sm font-medium shadow-none w-full cursor-pointer text-center'
                      title='Filtrar por data inicial'
                      tabIndex={-1}
                    />
                    <span className='absolute right-2 top-1/2 -translate-y-1/2 pointer-events-none flex items-center'>
                      <Calendar size={18} className='text-gray-400' />
                    </span>
                    <input
                      ref={dateStartRef}
                      type='date'
                      value={dateStart}
                      onChange={(e) => setDateStart(e.target.value)}
                      className='absolute left-0 top-0 w-full h-full opacity-0 cursor-pointer'
                      tabIndex={-1}
                    />
                  </div>
                </div>
                {/* Data fim */}
                <div
                  className='flex items-center gap-2 relative cursor-pointer group flex-1'
                  onClick={() =>
                    dateEndRef.current &&
                    dateEndRef.current.showPicker &&
                    dateEndRef.current.showPicker()
                  }
                  tabIndex={0}
                  role='button'
                >
                  <label className='text-xs text-gray-500' htmlFor='dateEnd'>
                    Fim:
                  </label>
                  <div className='relative flex items-center w-full max-w-31.25 sm:max-w-none sm:w-31.25'>
                    <input
                      id='dateEnd'
                      type='text'
                      inputMode='none'
                      value={dateEnd}
                      readOnly
                      className='rounded-full px-3 py-1 bg-gray-100 text-gray-700 border border-gray-300 pr-9 hover:bg-gray-200 focus:bg-white focus:outline-none transition text-sm font-medium shadow-none w-full cursor-pointer text-center'
                      title='Filtrar por data final'
                      tabIndex={-1}
                    />
                    <span className='absolute right-2 top-1/2 -translate-y-1/2 pointer-events-none flex items-center'>
                      <Calendar size={18} className='text-gray-400' />
                    </span>
                    <input
                      ref={dateEndRef}
                      type='date'
                      value={dateEnd}
                      onChange={(e) => setDateEnd(e.target.value)}
                      className='absolute left-0 top-0 w-full h-full opacity-0 cursor-pointer'
                      tabIndex={-1}
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
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
                        <div className='flex items-center gap-2'>
                          <span className='text-base font-semibold text-gray-800 truncate max-w-[60%]'>
                            {venda.titulo}
                          </span>
                          <span className='text-gray-400 text-xs shrink-0 ml-auto'>
                            {venda.data ? (
                              <span className='block truncate max-w-22.5 text-ellipsis overflow-hidden'>
                                {venda.data}
                              </span>
                            ) : (
                              'Sem Data'
                            )}
                          </span>
                        </div>
                        <div className='flex items-center gap-2'>
                          <span className='text-base text-gray-700 truncate font-medium max-w-[60%]'>
                            {venda.cliente.nome}
                          </span>
                          {venda.valor_pago < venda.valor_total ? (
                            <span className='inline-block bg-yellow-50 text-yellow-700 font-semibold rounded px-2 py-0.5 text-sm shadow-sm border border-yellow-200 truncate max-w-27.5 ml-auto'>
                              R$ {Number(venda.valor_pago).toFixed(2)} / R${' '}
                              {Number(venda.valor_total).toFixed(2)}
                            </span>
                          ) : (
                            <span className='inline-block bg-green-50 text-green-600 font-semibold rounded px-2 py-0.5 text-sm shadow-sm border border-green-100 truncate max-w-27.5 ml-auto'>
                              R$ {Number(venda.valor_total).toFixed(2)}
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
                          className='flex items-center gap-5 text-primary hover:text-primary/70 transition'
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
        </div>
      </div>
    </div>
  );
};

export default VendaList;
