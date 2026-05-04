import { Pencil, Trash2 } from 'lucide-react';

const currencyFormatter = new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' });

const ProductTable = ({ produtos, onEdit, onDelete }) => (
  <div className='hidden lg:block overflow-x-auto'>
    <table className='w-full table-fixed'>
      <thead>
        <tr className='bg-gray-50 border-b border-gray-100'>
          <th className='px-6 py-3 text-left text-[11px] font-semibold text-gray-500 uppercase tracking-widest w-[60%]'>Produto</th>
          <th className='px-6 py-3 text-left text-[11px] font-semibold text-gray-500 uppercase tracking-widest w-[20%]'>Preço</th>
          <th className='px-6 py-3 text-center text-[11px] font-semibold text-gray-500 uppercase tracking-widest w-[20%]'>Ações</th>
        </tr>
      </thead>
      <tbody>
        {produtos.map((produto) => (
          <tr
            key={produto.id}
            className='border-b border-gray-100 hover:bg-primary/3 transition-colors duration-100'
          >
            <td className='px-6 py-3.5'>
              <p className='text-sm font-semibold text-gray-900 truncate'>{produto.titulo}</p>
              <p className='text-xs text-gray-400 mt-0.5 truncate'>
                {produto.descricao || <span className='text-gray-300'>Sem descrição</span>}
              </p>
            </td>
            <td className='px-6 py-3.5'>
              <span className='text-sm font-semibold text-primary whitespace-nowrap'>
                {currencyFormatter.format(Number(produto.valor))}
              </span>
            </td>
            <td className='px-6 py-3.5'>
              <div className='flex items-center justify-center gap-0.5'>
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
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  </div>
);

export default ProductTable;
