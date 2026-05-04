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
import { destroy, index } from '../../../redux/slices/produtoSlice';
import EditProductPopup from './EditProductPopup';
import ProductCards from './ProductCards';
import ProductTable from './ProductTable';

const ProductsList = () => {
  const dispatch = useDispatch();
  const { produtos, loading, pagination } = useSelector((state) => state.produto);
  const { user } = useSelector((state) => state.user);
  const { setLoading } = useLoading();

  const [search, setSearch] = useState('');
  const [editProduct, setEditProduct] = useState(null);
  const [showNewProduct, setShowNewProduct] = useState(false);
  const [removeProductId, setRemoveProductId] = useState(null);
  const [showDeletePopup, setShowDeletePopup] = useState(false);
  const [shouldFetch, setShouldFetch] = useState(false);
  const itemsPerPage = 15;

  useEffect(() => {
    if (shouldFetch) setLoading(loading);
  }, [loading, shouldFetch]);

  useEffect(() => {
    if (user?.empresa?.id && produtos.length === 0) {
      setShouldFetch(true);
      dispatch(index({ empresa_id: user.empresa.id, page: 1, maxItems: itemsPerPage, pesquisa: '' }));
    }
  }, [dispatch, user?.empresa?.id]);

  useEffect(() => {
    const timer = setTimeout(() => {
      if (user?.empresa?.id) {
        dispatch(index({ empresa_id: user.empresa.id, page: 1, maxItems: itemsPerPage, titulo: search }));
      }
    }, 500);
    return () => clearTimeout(timer);
  }, [dispatch, user?.empresa?.id, itemsPerPage, search]);

  const handlePageChange = (page) => {
    dispatch(index({ empresa_id: user.empresa.id, page, maxItems: itemsPerPage, titulo: search }));
  };

  const handleDelete = (id) => {
    setRemoveProductId(id);
    setShowDeletePopup(true);
  };

  const confirmDelete = async () => {
    try {
      await dispatch(destroy({ empresa_id: user.empresa.id, produto_id: removeProductId })).unwrap();
      setShowDeletePopup(false);
      setRemoveProductId(null);
      toast.success('Produto removido com sucesso!');
    } catch {
      toast.error('Erro ao remover produto. Tente novamente.');
    }
  };

  return (
    <div className='w-full'>
      <div className='bg-white rounded-xl border border-gray-100 shadow-xs overflow-hidden'>
        <PageHeader
          title='Produtos'
          subtitle='Gerencie os produtos cadastrados.'
          action={
            <NewButton
              label='Novo Produto'
              icon={<Plus size={18} />}
              onClick={() => setShowNewProduct(true)}
            />
          }
        />

        <SearchBar
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder='Buscar produto...'
          count={produtos.length}
          countLabel='produto'
        />

        <div>
          {!loading && produtos.length === 0 && (
            <EmptyState message='Nenhum produto encontrado.' />
          )}
          {!loading && produtos.length > 0 && (
            <>
              <ProductTable produtos={produtos} onEdit={setEditProduct} onDelete={handleDelete} />
              <ProductCards produtos={produtos} onEdit={setEditProduct} onDelete={handleDelete} />
            </>
          )}
        </div>

        {!loading && produtos.length > 0 && (
          <div className='border-t border-gray-100'>
            <Pagination
              current_page={pagination.current_page}
              lastPage={pagination.last_page}
              onPageChange={handlePageChange}
            />
          </div>
        )}
      </div>

      {editProduct && (
        <EditProductPopup product={editProduct} onClose={() => setEditProduct(null)} />
      )}
      {showNewProduct && (
        <EditProductPopup product='' onClose={() => setShowNewProduct(false)} />
      )}

      <ConfirmDialog
        open={showDeletePopup}
        title='Remover produto?'
        message='Tem certeza que deseja remover este produto? Esta ação não pode ser desfeita.'
        onConfirm={confirmDelete}
        onCancel={() => { setShowDeletePopup(false); setRemoveProductId(null); }}
      />
    </div>
  );
};

export default ProductsList;
