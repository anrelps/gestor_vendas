import { useDispatch, useSelector } from 'react-redux';
import { create, update } from '../redux/slices/produtoSlice';

import { useEffect, useState } from 'react';
import { DollarSign, Tag, X } from 'lucide-react';

const EditProductPopup = ({
  product = {},
  onClose = () => {},
  onSave = () => {},
}) => {

  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.user);
  const { loading } = useSelector((state) => state.produto);

  const [form, setForm] = useState({
    productId: '',
    titulo: '',
    valor: '',
  });

  useEffect(() => {
    setForm({
      productId: product.id || '',
      titulo: product.titulo || '',
      valor: product.valor || '',
    });
  }, [product]);

  const handleChange = (key) => (e) =>
    setForm((s) => ({ ...s, [key]: e.target.value }));

  const handleSubmit = async () => {
    try {
      const productData = {
        titulo: form.titulo,
        valor: form.valor,
        descricao: null,
      }

      if(product.id) {
        await dispatch(update({
          empresa_id: user.empresa.id,
          produto_id: product.id,
          data: productData,
        })).unwrap();
      } else {
        await dispatch(create({
          empresa_id: user.empresa.id,
          data: productData,
        })).unwrap();
      }

      onClose();
    } catch(error) {
      console.log('Product submit error: ', error);
    }
  };
  return (
    <div className='fixed inset-0 flex items-center justify-center z-50'>
      <div className='absolute inset-0 bg-black/40' onClick={onClose} />
      <div className='bg-white rounded-lg p-6 relative z-10 w-full max-w-md'>
        <div className='flex items-start justify-between mb-4 pb-2 border-b border-gray-200'>
          <h3 className='text-lg font-semibold'>{product ? 'Editar Produto' : 'Novo Produto'}</h3>
          <button
            onClick={onClose}
            aria-label='Fechar'
            className='ml-4 cursor-pointer rounded-full p-1 border-gray-200 bg-white text-gray-600 hover:bg-gray-50'
          >
            <X size={18} />
          </button>
        </div>

        <form className='mb-4'>
          <div className='grid grid-cols-2 gap-3 mb-3'>
            <label className='block'>
              <span className='text-xs text-gray-500 mb-1 block'>
                Nome do Produto
              </span>
              <div className='relative'>
                <span className='absolute left-3 top-1/2 -translate-y-1/2 text-gray-400'>
                  <Tag size={16} />
                </span>
                <input
                  type='text'
                  value={form.titulo}
                  onChange={handleChange('titulo')}
                  placeholder='Ex: Notebook Dell'
                  className='w-full pl-10 pr-3 py-2 rounded-lg border border-gray-200 bg-white text-gray-700 focus:outline-none focus:ring-1 focus:ring-primary/40 transition'
                />
              </div>
            </label>

            <label className='block'>
              <span className='text-xs text-gray-500 mb-1 block'>
                Valor (R$)
              </span>
              <div className='relative'>
                <span className='absolute left-3 top-1/2 -translate-y-1/2 text-gray-400'>
                  <DollarSign size={16} />
                </span>
                <input
                  type='number'
                  value={form.valor}
                  onChange={handleChange('valor')}
                  placeholder='Ex: 3500.00'
                  className='w-full pl-10 pr-3 py-2 rounded-lg border border-gray-200 bg-white text-gray-700 focus:outline-none focus:ring-1 focus:ring-primary/40 transition'
                />
              </div>
            </label>
          </div>
        </form>

        <div className='grid grid-cols-2 gap-2'>
          <button
            onClick={onClose}
            className='w-full px-3 py-2 rounded border border-gray-200 bg-white text-gray-700 cursor-pointer'
            type='button'
            disabled={loading}
          >
            Cancelar
          </button>
          <button
            onClick={handleSubmit}
            className='w-full px-3 py-2 rounded bg-primary text-white cursor-pointer hover:bg-primary/90 transition'
            type='button'
            disabled={loading}
          >
            {loading ? 'Salvando...' : 'Salvar'}
          </button>
        </div>
      </div>
    </div>
  );
};

export default EditProductPopup;
