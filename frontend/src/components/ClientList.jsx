import { ChevronRight, Plus, Trash } from 'lucide-react';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { index } from '../redux/slices/clienteSlice';
import NewButton from './layout/NewButton';

import EditClientPopup from './EditClientPopup';
import Pagination from './Pagination';

import { useLoading } from '../context/LoadingContext';

const ClientList = () => {
  const dispatch = useDispatch();
  const { clientes, loading, pagination } = useSelector(
    (state) => state.cliente,
  );
  const { user } = useSelector((state) => state.user);
  const [search, setSearch] = useState('');
  const [openDropdownId, setOpenDropdownId] = useState(null);
  const [showNewClient, setShowNewClient] = useState(false);
  const [editClient, setEditClient] = useState(null);
  const [removeClientId, setRemoveClientId] = useState(null);
  const [shouldFetch, setShouldFetch] = useState(false);
  const { setLoading } = useLoading();
  const itemsPerPage = 15;

  useEffect(() => {
    if(shouldFetch) {
      setLoading(loading);
    }
  }, [loading, shouldFetch]);

  useEffect(() => {
    if (user?.empresa?.id && clientes.length === 0) {
      setShouldFetch(true);
      dispatch(
        index({
          empresa_id: user.empresa.id,
          page: 1,
          maxItems: itemsPerPage,
          pesquisa: '',
        }),
      );
    }
  }, [dispatch, user?.empresa?.id]);

  useEffect(() => {
    if(!search) return;
    const timer = setTimeout(() => {
      if (user?.empresa?.id) {
        dispatch(
          index({
            empresa_id: user.empresa.id,
            page: 1,
            maxItems: itemsPerPage,
            pesquisa: search,
          }),
        );
      }
    }, 500);
    return () => clearTimeout(timer);
  }, [search]);

  const handlePageChange = (page) => {
    dispatch(
      index({
        empresa_id: user.empresa.id,
        page,
        maxItems: itemsPerPage,
        pesquisa: search,
      }),
    );
  };

  const handleDropdown = (id) => {
    setOpenDropdownId(openDropdownId === id ? null : id);
  };

  const handleRemoveClient = (id) => {
    setRemoveClientId(id);
  };

  return (
    <div className='w-full flex flex-col items-center mt-10 px-2 bg-gray-50'>
      <div className='w-full max-w-5xl'>
        <h2 className='text-2xl font-bold text-black mb-4 px-2 sm:px-0'>
          Clientes
        </h2>
        <div className='bg-white rounded-md shadow-sm overflow-hidden border border-gray-200'>
          <div className='flex flex-col gap-3 px-6 py-4 border-b-2 bg-linear-to-r from-white via-white/30 to-black/1 border-black/2'>
            <div className='w-full flex flex-col sm:flex-row sm:items-center sm:justify-start gap-2'>
              <div className='flex flex-1 gap-2'>
                <NewButton
                  label='Novo Cliente'
                  shortLabel='Novo'
                  icon={<Plus size={18} />}
                  onClick={() => {
                    setEditClient({});
                    setShowNewClient(true);
                  }}
                />
                <input
                  type='text'
                  className='w-full max-w-xs truncate rounded-sm border border-gray-200 px-3 sm:px-4 py-2 text-gray-700 bg-gray- focus:bg-white focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary transition-all duration-100 '
                  placeholder='Buscar cliente...'
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                />
              </div>
            </div>
          </div>
          <div className='divide-y divide-gray-100'>
            {!loading && clientes.length === 0 && (
              <div className='py-8 px-3 sm:px-6 text-center text-gray-400'>
                Nenhum cliente encontrado.
              </div>
            )}
            {!loading && clientes.length > 0 && (
              <div className='m-4 overflow-hidden rounded-lg border border-gray-200'>
                <ul className='flex flex-col'>
                  {clientes.map((cliente, idx) => (
                    <li
                      key={cliente.id}
                      className={`flex flex-col px-4 py-3 cursor-pointer transition-colors ${
                        idx % 2 === 0 ? 'bg-white' : 'bg-white/85'
                      } hover:bg-primary/5 ${idx !== clientes.length - 1 ? 'border-b-2 border-b-gray-100' : ''}`}
                      onClick={() => handleDropdown(cliente.id)}
                    >
                      <div className='flex items-center cursor-pointer'>
                        <div className='flex-1 min-w-0 text-base text-gray-800 truncate font-medium cursor-pointer'>
                          {cliente.nome}
                        </div>
                        <ChevronRight
                          size={20}
                          className={`text-gray-400 ml-2 transition-transform duration-150 cursor-pointer ${
                            openDropdownId === cliente.id ? 'rotate-90' : ''
                          }`}
                        />
                      </div>
                      {openDropdownId === cliente.id && (
                        <div
                          className='mt-3 pl-2 flex flex-row gap-2 text-sm items-start'
                          onClick={(e) => e.stopPropagation()}
                        >
                          <div className='flex flex-col gap-1 flex-1'>
                            <div className='flex items-center gap-2'>
                              <span className='text-gray-500 font-semibold min-w-15'>
                                Email:
                              </span>
                              <span className='text-gray-700'>
                                {cliente.email || (
                                  <span className='italic text-gray-300'>
                                    Não informado
                                  </span>
                                )}
                              </span>
                            </div>
                            <div className='flex items-center gap-2'>
                              <span className='text-gray-500 font-semibold min-w-15'>
                                Telefone:
                              </span>
                              <span className='text-gray-700'>
                                {cliente.telefone || (
                                  <span className='italic text-gray-300'>
                                    Não informado
                                  </span>
                                )}
                              </span>
                            </div>
                          </div>
                          <div className='flex items-end justify-end ml-4 gap-2'>
                            <button
                              className='px-3 py-1 rounded bg-primary/10 text-primary text-xs font-medium hover:bg-primary/20 transition flex items-center justify-center cursor-pointer'
                              onClick={(e) => {
                                e.stopPropagation();
                                setEditClient(cliente);
                              }}
                              type='button'
                            >
                              Editar
                            </button>
                            <button
                              className='px-3 py-1 rounded bg-red-50 text-red-500 text-xs font-medium hover:bg-red-100 transition flex items-center justify-center cursor-pointer'
                              title='Remover cliente'
                              onClick={(e) => {
                                e.stopPropagation();
                                handleRemoveClient(cliente.id);
                              }}
                              type='button'
                            >
                              <Trash size={16} />
                            </button>
                          </div>
                        </div>
                      )}
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>
          <div>
            <Pagination
              current_page={pagination.current_page}
              lastPage={pagination.last_page}
              onPageChange={handlePageChange}
            />
          </div>
        </div>
      </div>
      {editClient && showNewClient && (
        <EditClientPopup
          client={editClient}
          onClose={() => {
            setEditClient(null);
            setShowNewClient(false);
          }}
        />
      )}
    </div>
  );
};

export default ClientList;
