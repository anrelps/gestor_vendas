import { Plus } from 'lucide-react';
import { useEffect, useState } from 'react';
import toast from 'react-hot-toast';
import { useDispatch, useSelector } from 'react-redux';

import ConfirmDialog from '../../../components/ui/ConfirmDialog';
import EmptyState from '../../../components/ui/EmptyState';
import NewButton from '../../../components/ui/NewButton';
import PageHeader from '../../../components/ui/PageHeader';
import Pagination from '../../../components/ui/Pagination';
import SearchBar from '../../../components/ui/SearchBar';
import { useLoading } from '../../../context/LoadingContext';
import { destroy, index } from '../../../redux/slices/clienteSlice';
import ClientCards from './ClientCards';
import ClientTable from './ClientTable';
import EditClientPopup from './EditClientPopup';

const ClientList = () => {
  const dispatch = useDispatch();
  const { clientes, loading, pagination } = useSelector((state) => state.cliente);
  const { user } = useSelector((state) => state.user);
  const { setLoading } = useLoading();

  const [search, setSearch] = useState('');
  const [editClient, setEditClient] = useState(null);
  const [removeClientId, setRemoveClientId] = useState(null);
  const [showDeletePopup, setShowDeletePopup] = useState(false);
  const [shouldFetch, setShouldFetch] = useState(false);
  const itemsPerPage = 15;

  useEffect(() => {
    if (shouldFetch) setLoading(loading);
  }, [loading, shouldFetch]);

  useEffect(() => {
    if (user?.empresa?.id && clientes.length === 0) {
      setShouldFetch(true);
      dispatch(index({ empresa_id: user.empresa.id, page: 1, maxItems: itemsPerPage, pesquisa: '' }));
    }
  }, [dispatch, user?.empresa?.id]);

  useEffect(() => {
    if (!search) return;
    const timer = setTimeout(() => {
      if (user?.empresa?.id) {
        dispatch(index({ empresa_id: user.empresa.id, page: 1, maxItems: itemsPerPage, pesquisa: search }));
      }
    }, 500);
    return () => clearTimeout(timer);
  }, [dispatch, user?.empresa?.id, itemsPerPage, search]);

  const handlePageChange = (page) => {
    dispatch(index({ empresa_id: user.empresa.id, page, maxItems: itemsPerPage, pesquisa: search }));
  };

  const handleDelete = (id) => {
    setRemoveClientId(id);
    setShowDeletePopup(true);
  };

  const confirmDelete = async () => {
    try {
      await dispatch(destroy({ empresa_id: user.empresa.id, cliente_id: removeClientId })).unwrap();
      setShowDeletePopup(false);
      setRemoveClientId(null);
      toast.success('Cliente removido com sucesso!');
    } catch {
      toast.error('Erro ao remover cliente. Tente novamente.');
    }
  };

  return (
    <div className='w-full'>
      <div className='bg-white rounded-xl border border-gray-100 shadow-xs overflow-hidden'>
        <PageHeader
          title='Clientes'
          subtitle='Gerencie os clientes cadastrados.'
          action={
            <NewButton
              label='Novo Cliente'
              icon={<Plus size={18} />}
              onClick={() => setEditClient({})}
            />
          }
        />

        <SearchBar
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder='Buscar cliente...'
          count={clientes.length}
          countLabel='cliente'
        />

        <div>
          {!loading && clientes.length === 0 && (
            <EmptyState message='Nenhum cliente encontrado.' />
          )}
          {!loading && clientes.length > 0 && (
            <>
              <ClientTable clientes={clientes} onEdit={setEditClient} onDelete={handleDelete} />
              <ClientCards clientes={clientes} onEdit={setEditClient} onDelete={handleDelete} />
            </>
          )}
        </div>

        {!loading && clientes.length > 0 && (
          <div className='border-t border-gray-100'>
            <Pagination
              current_page={pagination.current_page}
              lastPage={pagination.last_page}
              onPageChange={handlePageChange}
            />
          </div>
        )}
      </div>

      {editClient && (
        <EditClientPopup
          client={editClient}
          onClose={() => setEditClient(null)}
        />
      )}

      <ConfirmDialog
        open={showDeletePopup}
        title='Remover Cliente?'
        message='Tem certeza que deseja remover este cliente? Esta ação não pode ser desfeita.'
        onConfirm={confirmDelete}
        onCancel={() => { setShowDeletePopup(false); setRemoveClientId(null); }}
      />
    </div>
  );
};

export default ClientList;
