import { Pencil, Trash2 } from 'lucide-react';

const currencyFormatter = new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' });

const ProductCards = ({ produtos, onEdit, onDelete }) => (
  <div className='lg:hidden divide-y divide-gray-100'>
    {produtos.map((produto) => (
      <div
        key={produto.id}
        className='px-4 py-3.5 flex items-center justify-between gap-4 hover:bg-primary/3 transition-colors duration-100'
      >
        <div className='flex items-center gap-3 min-w-0'>
          <div className='w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center shrink-0'>
            <span className='text-xs font-bold text-primary'>{produto.titulo[0].toUpperCase()}</span>
          </div>
          <div className='min-w-0 overflow-hidden'>
            <p className='text-sm font-semibold text-gray-900 truncate'>{produto.titulo}</p>
            <p className='text-xs text-gray-400 mt-0.5 wrap-break-word'>
              {produto.descricao || <span className='text-gray-300'>Sem descrição</span>}
            </p>
            <span className='text-xs font-semibold text-primary mt-0.5 block'>
              {currencyFormatter.format(Number(produto.valor))}
            </span>
          </div>
        </div>
        <div className='flex items-center gap-0.5 shrink-0'>
          <button
            className='p-1.5 text-gray-400 hover:text-primary hover:bg-primary/10 rounded-md transition-all duration-150 cursor-pointer'
            onClick={() => onEdit(produto)}
            title='Editar produto'
          >
            <Pencil size={14} />
          </button>
          <button
            className='p-1.5 text-gray-400 hover:text-red-500 hover:bg-red-50 rounded-md transition-all duration-150 cursor-pointer'
            onClick={() => onDelete(produto.id)}
            title='Remover produto'
          >
            <Trash2 size={14} />
          </button>
        </div>
      </div>
    ))}
  </div>
);

export default ProductCards;
