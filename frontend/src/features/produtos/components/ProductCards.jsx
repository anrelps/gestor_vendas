import { Edit2, Trash2 } from 'lucide-react';

const currencyFormatter = new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' });

const ProductCards = ({ produtos, onEdit, onDelete }) => (
  <div className='lg:hidden'>
    <div className='space-y-3 p-4 sm:p-6'>
      {produtos.map((produto) => (
        <div
          key={produto.id}
          className='bg-white border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow duration-150'
        >
          <h3 className='text-lg font-bold text-gray-900 mb-1'>{produto.titulo}</h3>
          <p className='text-sm text-gray-600 mb-3 leading-relaxed'>
            {produto.descricao || <span className='italic text-gray-400'>Sem descrição</span>}
          </p>
          <div className='flex items-center justify-between gap-3'>
            <span className='bg-gray-50 text-gray-700 font-semibold text-sm px-3 py-2 rounded border border-gray-200/40'>
              {currencyFormatter.format(Number(produto.valor))}
            </span>
            <div className='inline-flex items-stretch rounded bg-linear-to-b from-gray-50 to-gray-50 border border-gray-200'>
              <button
                className='flex items-center gap-2 px-3 py-1.5 text-purple-800 font-medium text-sm transition-colors duration-150 cursor-pointer'
                onClick={() => onEdit(produto)}
              >
                <Edit2 size={16} /> Editar
              </button>
              <div className='w-px bg-gray-200' />
              <button
                className='flex items-center justify-center p-2 text-red-600 transition-colors duration-150 cursor-pointer'
                onClick={() => onDelete(produto.id)}
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
);

export default ProductCards;
