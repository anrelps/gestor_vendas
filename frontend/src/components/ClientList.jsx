import { Edit2, Plus, Trash2 } from 'lucide-react';
import { useEffect, useState } from 'react';
import toast from 'react-hot-toast';
import { useDispatch, useSelector } from 'react-redux';
import { destroy, index } from '../redux/slices/clienteSlice';
import ConfirmDialog from './ConfirmDialog';
import NewButton from './layout/NewButton';

import EditClientPopup from './EditClientPopup';
import Pagination from './Pagination';

import { useLoading } from '../context/LoadingContext';

const formatTelefone = (telefone) => {
  if (!telefone) return '';

  let cleaned = telefone.replace(/\D/g, '');

  // Remove DDI 55 se existir
  if (cleaned.length === 13 && cleaned.startsWith('55')) {
    cleaned = cleaned.slice(2);
  }

  if (cleaned.length === 11) {
    return `(${cleaned.slice(0, 2)}) ${cleaned.slice(2, 7)}-${cleaned.slice(7)}`;
  }

  if (cleaned.length === 10) {
    return `(${cleaned.slice(0, 2)}) ${cleaned.slice(2, 6)}-${cleaned.slice(6)}`;
  }

  return cleaned;
};

const ClientList = () => {
  const dispatch = useDispatch();
  const { clientes, loading, pagination } = useSelector(
    (state) => state.cliente,
  );
  const { user } = useSelector((state) => state.user);
  const [search, setSearch] = useState('');
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
      toast.success('Cliente removido com sucesso!');
    } catch (error) {
      toast.error('Erro ao remover cliente. Tente novamente.');
      console.log('Client destroy error: ', error);
    }
  };

  const cancelDelete = () => {
    setShowDeletePopup(false);
    setRemoveClientId(null);
  };

  return (
    <div className='w-full'>
      <div className='w-full'>
        <div className='bg-white rounded-lg shadow-sm border border-gray-200'>
          {/* Header */}
          <div className='px-4 sm:px-6 pt-6 pb-4 border-b border-gray-100 bg-linear-to-r from-white via-purple-50/30 to-purple-50/10'>
            <div className='flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4'>
              <div>
                <h2 className='text-2xl sm:text-3xl font-bold text-gray-900'>
                  Clientes
                </h2>
                <p className='text-sm text-gray-500 mt-1'>
                  Gerencie os clientes cadastrados.
                </p>
              </div>
              <NewButton
                label='Novo Cliente'
                icon={<Plus size={18} />}
                onClick={() => {
                  setEditClient({});
                  setShowNewClient(true);
                }}
              />
            </div>
          </div>

          {/* Search Bar */}
          <div className='px-4 sm:px-6 py-4 border-b border-gray-100 bg-gray-50'>
            <div className='flex flex-col sm:flex-row gap-3 items-start sm:items-center'>
              <div className='w-full sm:w-auto'>
                <input
                  type='text'
                  className='w-full sm:w-64 rounded-sm border border-gray-300 px-4 py-2.5 text-sm text-gray-700 bg-white focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all cursor-pointer'
                  placeholder='Buscar cliente...'
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                />
              </div>
              <span className='text-sm text-gray-600 font-medium whitespace-nowrap'>
                {clientes.length} cliente{clientes.length !== 1 ? 's' : ''}
              </span>
            </div>
          </div>

          {/* Clients List */}
          <div className='divide-y divide-gray-100'>
            {!loading && clientes.length === 0 && (
              <div className='py-12 px-4 sm:px-6 text-center'>
                <p className='text-gray-400 text-base'>
                  Nenhum cliente encontrado.
                </p>
              </div>
            )}

            {!loading && clientes.length > 0 && (
              <>
                {/* Desktop Table View */}
                <div className='hidden lg:block overflow-x-auto'>
                  <table className='w-full table-fixed'>
                    <thead>
                      <tr className='bg-gray-50 border-b border-gray-200'>
                        <th className='px-4 sm:px-6 py-3 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider w-[30%]'>
                          Cliente
                        </th>
                        <th className='px-4 sm:px-6 py-3 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider w-[30%]'>
                          Email
                        </th>
                        <th className='px-4 sm:px-6 py-3 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider w-[20%]'>
                          Telefone
                        </th>
                        <th className='px-4 sm:px-6 py-3 text-center text-xs font-semibold text-gray-700 uppercase tracking-wider w-[20%]'>
                          Ações
                        </th>
                      </tr>
                    </thead>
                    <tbody className='divide-y divide-gray-100'>
                      {clientes.map((cliente, index) => (
                        <tr
                          key={cliente.id}
                          className={`hover:bg-purple-50/50 transition-colors duration-150 ${index % 2 === 1 ? 'bg-gray-100' : ''}`}
                        >
                          <td className='px-4 sm:px-6 py-4'>
                            <p className='text-sm sm:text-base lg:text-lg font-semibold text-gray-900 truncate'>
                              {cliente.nome}
                            </p>
                          </td>
                          <td className='px-4 sm:px-6 py-4'>
                            <p className='text-xs sm:text-sm text-gray-600 truncate'>
                              {cliente.email || (
                                <span className='italic text-gray-400'>
                                  Não informado
                                </span>
                              )}
                            </p>
                          </td>
                          <td className='px-4 sm:px-6 py-4'>
                            <p className='text-xs sm:text-sm text-gray-600 whitespace-nowrap'>
                              {cliente.telefone ? (
                                formatTelefone(cliente.telefone)
                              ) : (
                                <span className='italic text-gray-400'>
                                  Não informado
                                </span>
                              )}
                            </p>
                          </td>
                          <td className='px-4 sm:px-6 py-4'>
                            <div className='inline-flex items-stretch rounded bg-linear-to-b from-gray-50 to-gray-50 border border-gray-200'>
                              <button
                                className='flex items-center gap-2 px-3 py-1.5 text-purple-800 font-medium text-sm transition-colors duration-150 cursor-pointer'
                                onClick={() => setEditClient(cliente)}
                                title='Editar cliente'
                              >
                                <Edit2 size={16} />
                                Editar
                              </button>
                              <div className='w-px bg-gray-200'></div>
                              <button
                                className='flex items-center justify-center p-2 text-red-600 transition-colors duration-150 cursor-pointer'
                                onClick={() => handleRemoveClient(cliente.id)}
                                title='Remover cliente'
                              >
                                <Trash2 size={18} />
                              </button>
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>

                {/* Tablet and Mobile Card View */}
                <div className='lg:hidden'>
                  <div className='space-y-3 p-4 sm:p-6'>
                    {clientes.map((cliente) => (
                      <div
                        key={cliente.id}
                        className='bg-white border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow duration-150'
                      >
                        {/* Client Name */}
                        <h3 className='text-lg font-bold text-gray-900 mb-1'>
                          {cliente.nome}
                        </h3>

                        {/* Email */}
                        <p className='text-sm text-gray-600 mb-1 leading-relaxed'>
                          <span className='font-semibold text-gray-700'>
                            Email:
                          </span>{' '}
                          {cliente.email || (
                            <span className='italic text-gray-400'>
                              Não informado
                            </span>
                          )}
                        </p>

                        {/* Phone */}
                        <p className='text-sm text-gray-600 mb-3 leading-relaxed'>
                          <span className='font-semibold text-gray-700'>
                            Telefone:
                          </span>{' '}
                          {cliente.telefone ? (
                            formatTelefone(cliente.telefone)
                          ) : (
                            <span className='italic text-gray-400'>
                              Não informado
                            </span>
                          )}
                        </p>

                        {/* Actions */}
                        <div className='inline-flex items-stretch rounded bg-linear-to-b from-gray-50 to-gray-50 border border-gray-200'>
                          <button
                            className='flex items-center gap-2 px-3 py-1.5 text-purple-800 font-medium text-sm transition-colors duration-150 cursor-pointer'
                            onClick={() => setEditClient(cliente)}
                          >
                            <Edit2 size={16} />
                            Editar
                          </button>
                          <div className='w-px bg-gray-200'></div>
                          <button
                            className='flex items-center justify-center p-2 text-red-600 transition-colors duration-150 cursor-pointer'
                            onClick={() => handleRemoveClient(cliente.id)}
                            title='Remover cliente'
                          >
                            <Trash2 size={18} />
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </>
            )}
          </div>

          {/* Pagination */}
          {!loading && clientes.length > 0 && (
            <div className='border-t border-gray-100 bg-gray-50'>
              <Pagination
                current_page={pagination.current_page}
                lastPage={pagination.last_page}
                onPageChange={handlePageChange}
              />
            </div>
          )}
        </div>
      </div>

      {/* Edit Client Modal */}
      {editClient && (
        <EditClientPopup
          client={editClient}
          onClose={() => {
            setEditClient(null);
            setShowNewClient(false);
          }}
        />
      )}

      {/* Delete Dialog */}
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
