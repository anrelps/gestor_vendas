import { Edit2, Plus, Trash2 } from 'lucide-react';
import { useEffect, useState } from 'react';
import toast from 'react-hot-toast';
import { useDispatch, useSelector } from 'react-redux';
import { destroy, index } from '../redux/slices/produtoSlice';
import ConfirmDialog from './ConfirmDialog';
import EditProductPopup from './EditProductPopup';
import NewButton from './layout/NewButton';
import Pagination from './Pagination';

import { useLoading } from '../context/LoadingContext';

const currencyFormatter = new Intl.NumberFormat('pt-BR', {
  style: 'currency',
  currency: 'BRL',
});

const ProductsList = () => {
  const dispatch = useDispatch();
  const { produtos, loading, pagination } = useSelector(
    (state) => state.produto,
  );
  const { user } = useSelector((state) => state.user);
  const [search, setSearch] = useState('');
  const [showNewProduct, setShowNewProduct] = useState(false);
  const [editProduct, setEditProduct] = useState(null);
  const [removeProductId, setRemoveProductId] = useState(null);
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
    if (user?.empresa?.id && produtos.length === 0) {
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
    const timer = setTimeout(() => {
      if (user?.empresa?.id) {
        dispatch(
          index({
            empresa_id: user.empresa.id,
            page: 1,
            maxItems: itemsPerPage,
            titulo: search,
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
        titulo: search,
      }),
    );
  };

  const handleRemoveProduct = (id) => {
    setRemoveProductId(id);
    setShowDeletePopup(true);
  };

  const confirmDelete = async () => {
    try {
      await dispatch(
        destroy({ empresa_id: user.empresa.id, produto_id: removeProductId }),
      ).unwrap();
      setShowDeletePopup(false);
      setRemoveProductId(null);
      toast.success('Produto removido com sucesso!');
    } catch (error) {
      toast.error('Erro ao remover produto. Tente novamente.');
      console.log('Product delete error: ', error);
    }
  };

  const cancelDelete = () => {
    setShowDeletePopup(false);
    setRemoveProductId(null);
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
                  Produtos
                </h2>
                <p className='text-sm text-gray-500 mt-1'>
                  Gerencie os produtos cadastrados.
                </p>
              </div>
              <NewButton
                label='Novo Produto'
                icon={<Plus size={18} />}
                onClick={() => setShowNewProduct(true)}
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
                  placeholder='Buscar produto...'
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                />
              </div>
              <span className='text-sm text-gray-600 font-medium whitespace-nowrap'>
                {produtos.length} produto{produtos.length !== 1 ? 's' : ''}
              </span>
            </div>
          </div>

          {/* Products List */}
          <div className='divide-y divide-gray-100'>
            {!loading && produtos.length === 0 && (
              <div className='py-12 px-4 sm:px-6 text-center'>
                <p className='text-gray-400 text-base'>
                  Nenhum produto encontrado.
                </p>
              </div>
            )}

            {!loading && produtos.length > 0 && (
              <>
                {/* Desktop Table View */}
                <div className='hidden lg:block overflow-x-auto'>
                  <table className='w-full table-fixed'>
                    <thead>
                      <tr className='bg-gray-50 border-b border-gray-200'>
                        <th className='px-4 sm:px-6 py-3 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider w-[60%]'>
                          Produto
                        </th>
                        <th className='px-4 sm:px-6 py-3 text-center text-xs font-semibold text-gray-700 uppercase tracking-wider w-[20%]'>
                          Preço
                        </th>
                        <th className='px-4 sm:px-6 py-3 text-center text-xs font-semibold text-gray-700 uppercase tracking-wider w-[20%]'>
                          Ações
                        </th>
                      </tr>
                    </thead>
                    <tbody className='divide-y divide-gray-100'>
                      {produtos.map((produto, index) => (
                        <tr
                          key={produto.id}
                          className={`hover:bg-purple-50/50 transition-colors duration-150 ${index % 2 === 1 ? 'bg-gray-100' : ''}`}
                        >
                          <td className='px-4 sm:px-6 py-4'>
                            <p className='text-sm sm:text-base lg:text-lg font-semibold text-gray-900 truncate'>
                              {produto.titulo}
                            </p>
                            <p className='text-xs text-gray-500 mt-1 truncate'>
                              {produto.descricao || (
                                <span className='italic text-gray-400'>
                                  Sem descrição
                                </span>
                              )}
                            </p>
                          </td>
                          <td className='px-4 sm:px-6 py-4 text-center'>
                            <span className='bg-gray-50 text-gray-700 font-semibold text-xs sm:text-sm px-3 py-2 rounded border border-gray-200/40 whitespace-nowrap inline-block'>
                              {currencyFormatter.format(Number(produto.valor))}
                            </span>
                          </td>
                          <td className='px-4 sm:px-6 py-4 text-center'>
                            <div className='inline-flex items-stretch rounded bg-linear-to-b from-gray-50 to-gray-50 border border-gray-200'>
                              <button
                                className='flex items-center gap-2 px-3 py-1.5 text-purple-800 font-medium text-sm transition-colors duration-150 cursor-pointer'
                                onClick={() => setEditProduct(produto)}
                                title='Editar produto'
                              >
                                <Edit2 size={16} />
                                Editar
                              </button>
                              <div className='w-px bg-gray-200'></div>
                              <button
                                className='flex items-center justify-center p-2 text-red-600 transition-colors duration-150 cursor-pointer'
                                onClick={() => handleRemoveProduct(produto.id)}
                                title='Remover produto'
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
                    {produtos.map((produto) => (
                      <div
                        key={produto.id}
                        className='bg-white border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow duration-150'
                      >
                        {/* Product Name */}
                        <h3 className='text-lg font-bold text-gray-900 mb-1'>
                          {produto.titulo}
                        </h3>

                        {/* Description */}
                        <p className='text-sm text-gray-600 mb-3 leading-relaxed'>
                          {produto.descricao || (
                            <span className='italic text-gray-400'>
                              Sem descrição
                            </span>
                          )}
                        </p>

                        {/* Price and Actions */}
                        <div className='flex items-center justify-between gap-3'>
                          <span className='bg-gray-50 text-gray-700 font-semibold text-sm px-3 py-2 rounded border border-gray-200/40'>
                            {currencyFormatter.format(Number(produto.valor))}
                          </span>
                          <div className='inline-flex items-stretch rounded bg-linear-to-b from-gray-50 to-gray-50 border border-gray-200'>
                            <button
                              className='flex items-center gap-2 px-3 py-1.5 text-purple-800 font-medium text-sm transition-colors duration-150 cursor-pointer'
                              onClick={() => setEditProduct(produto)}
                            >
                              <Edit2 size={16} />
                              Editar
                            </button>
                            <div className='w-px bg-gray-200'></div>
                            <button
                              className='flex items-center justify-center p-2 text-red-600 transition-colors duration-150 cursor-pointer'
                              onClick={() => handleRemoveProduct(produto.id)}
                              title='Remover produto'
                            >
                              <Trash2 size={18} />
                            </button>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </>
            )}
          </div>

          {/* Pagination */}
          {!loading && produtos.length > 0 && (
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

      {/* Edit Product Modal */}
      {editProduct && (
        <EditProductPopup
          product={editProduct}
          onClose={() => setEditProduct(null)}
        />
      )}

      {/* New Product Modal */}
      {showNewProduct && (
        <EditProductPopup product='' onClose={() => setShowNewProduct(false)} />
      )}

      {/* Delete Dialog */}
      <ConfirmDialog
        open={showDeletePopup}
        title='Remover produto?'
        message='Tem certeza que deseja remover este produto? Esta ação não pode ser desfeita.'
        onConfirm={confirmDelete}
        onCancel={cancelDelete}
      />
    </div>
  );
};

export default ProductsList;
