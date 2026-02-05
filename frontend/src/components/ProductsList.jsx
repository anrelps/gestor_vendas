import { ChevronRight, Plus, Trash } from 'lucide-react';
import { useEffect, useState } from 'react';
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
  const [openDropdownId, setOpenDropdownId] = useState(null);
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
    if (!search) return;
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

  const handleDropdown = (id) => {
    setOpenDropdownId(openDropdownId === id ? null : id);
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
    } catch (error) {
      console.log('Product delete error: ', error);
    }
  };

  const cancelDelete = () => {
    setShowDeletePopup(false);
    setRemoveProductId(null);
  };

  return (
    <div className=''>
      <div className='w-full max-w-5xl'>
        <div className='bg-white rounded-lg shadow-sm overflow-hidden border border-gray-200'>
          <div className='px-6 pt-6 pb-4 border-b border-gray-100 bg-linear-to-r from-white via-primary/2 to-primary/3'>
            <h2 className='text-3xl sm:text-4xl font-semibold tracking-tight text-gray-900'>
              Produtos
            </h2>
            <p className='text-sm text-gray-500 mt-1'>
              Gerencie os produtos cadastrados.
            </p>
          </div>
          <div className='flex flex-col gap-3 px-6 py-4 border-b-2 bg-linear-to-r from-white via-white/30 to-black/1 border-black/2'>
            <div className='w-full flex flex-col sm:flex-row sm:items-center sm:justify-start gap-2'>
              <div className='flex flex-1 gap-2'>
                <NewButton
                  label='Novo Produto'
                  shortLabel='Novo'
                  icon={<Plus size={18} />}
                  onClick={() => setShowNewProduct(true)}
                />
                <input
                  type='text'
                  className='w-full max-w-xs truncate rounded-sm border border-gray-200 px-3 sm:px-4 py-2 text-gray-700 bg-gray- focus:bg-white focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary transition-all duration-100 '
                  placeholder='Buscar produto...'
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                />
              </div>
            </div>
          </div>
          <div className='divide-y divide-gray-100'>
            {!loading && produtos.length === 0 && (
              <div className='py-8 px-3 sm:px-6 text-center text-gray-400'>
                Nenhum produto encontrado.
              </div>
            )}
            {!loading && produtos.length > 0 && (
              <div className='m-4 overflow-hidden rounded-lg border border-gray-200'>
                <ul className='flex flex-col'>
                  {produtos.map((produto, idx) => (
                    <li
                      key={produto.id}
                      className={`flex flex-col px-4 py-3 cursor-pointer transition-colors ${
                        idx % 2 === 0 ? 'bg-white' : 'bg-white/85'
                      } hover:bg-primary/5 ${idx !== produtos.length - 1 ? 'border-b-2 border-b-gray-100' : ''}`}
                      onClick={() => handleDropdown(produto.id)}
                    >
                      <div className='flex items-center'>
                        <div className='flex-1 min-w-0 flex items-center gap-3'>
                          <span className='text-base text-gray-800 truncate font-medium max-w-45 sm:max-w-none'>
                            {produto.titulo.length > 25
                              ? produto.titulo.slice(0, 22) + '...'
                              : produto.titulo}
                          </span>
                          <span className='inline-block bg-green-50 text-green-600 font-semibold rounded px-2 py-0.5 text-sm shadow-sm border border-green-100'>
                            {currencyFormatter.format(Number(produto.valor))}
                          </span>
                        </div>
                        <ChevronRight
                          size={20}
                          className={`text-gray-400 ml-2 transition-transform duration-150 ${
                            openDropdownId === produto.id ? 'rotate-90' : ''
                          }`}
                        />
                      </div>
                      {openDropdownId === produto.id && (
                        <div
                          className='mt-3 flex flex-col gap-2 text-sm items-start'
                          onClick={(e) => e.stopPropagation()}
                        >
                          <div className='mb-1 w-full'>
                            <span className='block text-xs text-gray-400 font-semibold mb-0.5'>
                              Nome:
                            </span>
                            <span className='block text-gray-900 font-medium wrap-break-word'>
                              {produto.titulo}
                            </span>
                          </div>
                          <div className='flex flex-row gap-2 w-full'>
                            <div className='flex flex-col gap-1 flex-1'>
                              <div className='flex items-center gap-2'>
                                <span className='text-gray-500 font-semibold min-w-15'>
                                  Descrição:
                                </span>
                                <span className='text-gray-700'>
                                  {produto.descricao || (
                                    <span className='italic text-gray-300'>
                                      Não informado
                                    </span>
                                  )}
                                </span>
                              </div>
                            </div>
                            <div className='flex items-end justify-end ml-4 gap-2'>
                              <button
                                className='px-3 py-1 rounded bg-primary/10 text-primary text-xs font-medium hover:bg-primary/20 transition flex items-center justify-center'
                                onClick={(e) => {
                                  e.stopPropagation();
                                  setEditProduct(produto);
                                }}
                                type='button'
                              >
                                Editar
                              </button>
                              <button
                                className='px-3 py-1 rounded bg-red-50 text-red-500 text-xs font-medium hover:bg-red-100 transition flex items-center justify-center'
                                title='Remover produto'
                                onClick={(e) => {
                                  e.stopPropagation();
                                  handleRemoveProduct(produto.id);
                                }}
                                type='button'
                              >
                                <Trash size={16} />
                              </button>
                            </div>
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
      {editProduct && (
        <EditProductPopup
          product={editProduct}
          onClose={() => setEditProduct(null)}
        />
      )}
      {showNewProduct && (
        <EditProductPopup product='' onClose={() => setShowNewProduct(null)} />
      )}
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
