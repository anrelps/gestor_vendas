import { ChevronRight, Plus, Trash } from 'lucide-react';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { index, destroy } from '../redux/slices/clienteSlice';
import NewButton from './layout/NewButton';
import ConfirmDialog from './ConfirmDialog';

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
  const [showDeletePopup, setShowDeletePopup] = useState(false);
  const [shouldFetch, setShouldFetch] = useState(false);
  const { setLoading } = useLoading();
  const itemsPerPage = 15;

  useEffect(() => {
    if (shouldFetch) {
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
    if (!search) return;
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
  }, [dispatch, user?.empresa?.id, itemsPerPage, search]);

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
    setShowDeletePopup(true);
  };

  const confirmDelete = async () => {
    try {
      await dispatch(
        destroy({ empresa_id: user.empresa.id, cliente_id: removeClientId }),
      ).unwrap();
      setShowDeletePopup(false);
      setRemoveClientId(null);
    } catch (error) {
          console.log('Client destroy error: ', error);
    }
  };
  
  const cancelDelete = () => {
    setShowDeletePopup(false);
    setRemoveClientId(null);
  };

  return (
    <div className=''>
      <div className='w-full max-w-5xl'>
        <div className='bg-white rounded-xl shadow-md hover:shadow-lg transition-shadow duration-300 overflow-hidden border border-gray-200'>
          <div className='px-6 pt-6 pb-4 border-b border-gray-200 bg-linear-to-br from-white via-primary/2 to-primary/3'>
            <div className='flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3'>
              <div>
                <h2 className='text-3xl sm:text-4xl font-semibold tracking-tight text-gray-900'>
                  Clientes
                </h2>
                <p className='text-sm text-gray-500 mt-1'>
                  Gerencie os clientes cadastrados.
                </p>
              </div>
              <NewButton
                label='Novo Cliente'
                shortLabel='Novo'
                icon={<Plus size={18} />}
                onClick={() => {
                  setEditClient({});
                  setShowNewClient(true);
                }}
              />
            </div>
          </div>
          <div className='flex flex-col gap-3 px-6 py-4 border-b border-gray-200 bg-linear-to-r from-gray-50 to-white'>
            <div className='w-full flex flex-col sm:flex-row sm:items-center sm:justify-start gap-2'>
              <div className='flex flex-1 gap-2'>
                <input
                  type='text'
                  className='w-full max-w-xs truncate rounded-md border border-gray-300 px-3 sm:px-4 py-2 text-gray-700 bg-white shadow-sm focus:bg-white focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary transition-all duration-200 cursor-text'
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
              <div className='m-4 overflow-hidden rounded-lg border border-gray-200 shadow-sm'>
                <ul className='flex flex-col'>
                  {clientes.map((cliente, idx) => (
                    <li
                      key={cliente.id}
                      className={`flex flex-col px-4 py-3 cursor-pointer ${
                        idx % 2 === 0 ? 'bg-white' : 'bg-gray-50/50'
                      } ${idx !== clientes.length - 1 ? 'border-b border-b-gray-100' : ''}`}
                      onClick={() => handleDropdown(cliente.id)}
                    >
                      <div className='flex items-center'>
                        <div className='flex-1 min-w-0 text-base text-gray-800 truncate font-medium'>
                          {cliente.nome}
                        </div>
                        <ChevronRight
                          size={20}
                          className={`text-gray-400 ml-2 transition-transform duration-200 ${
                            openDropdownId === cliente.id ? 'rotate-90' : ''
                          }`}
                        />
                      </div>
                      {openDropdownId === cliente.id && (
                        <div
                          className='mt-3 pt-3 border-t border-gray-100 flex flex-row gap-2 text-sm items-start bg-white/50 -mx-4 px-4 pb-1'
                          onClick={(e) => e.stopPropagation()}
                        >
                          <div className='flex flex-col gap-1.5 flex-1'>
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
                              className='px-3 py-1.5 rounded-md bg-primary/10 text-primary text-xs font-semibold flex items-center justify-center cursor-pointer'
                              onClick={(e) => {
                                e.stopPropagation();
                                setEditClient(cliente);
                              }}
                              type='button'
                            >
                              Editar
                            </button>
                            <button
                              className='px-3 py-1.5 rounded-md bg-red-50 text-red-500 text-xs font-semibold flex items-center justify-center cursor-pointer'
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
      {editClient && (
        <EditClientPopup
          client={editClient}
          onClose={() => {
            setEditClient(null);
            setShowNewClient(false);
          }}
        />
      )}
      <ConfirmDialog
        open={showDeletePopup}
        title='Remover Cliente?'
        message='Tem certeza que deseja remover este cliente? Esta ação não pode ser desfeita.'
        onConfirm={confirmDelete}
        onCancel={cancelDelete}
      />
    </div>
  );
};

export default ClientList;
