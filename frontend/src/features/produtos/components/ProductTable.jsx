import { Edit2, Trash2 } from 'lucide-react';

const currencyFormatter = new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' });

const ProductTable = ({ produtos, onEdit, onDelete }) => (
  <div className='hidden lg:block overflow-x-auto'>
    <table className='w-full table-fixed'>
      <thead>
        <tr className='bg-gray-50 border-b border-gray-200'>
          <th className='px-4 sm:px-6 py-3 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider w-[60%]'>Produto</th>
          <th className='px-4 sm:px-6 py-3 text-center text-xs font-semibold text-gray-700 uppercase tracking-wider w-[20%]'>Preço</th>
          <th className='px-4 sm:px-6 py-3 text-center text-xs font-semibold text-gray-700 uppercase tracking-wider w-[20%]'>Ações</th>
        </tr>
      </thead>
      <tbody className='divide-y divide-gray-100'>
        {produtos.map((produto, i) => (
          <tr
            key={produto.id}
            className={`hover:bg-purple-50/50 transition-colors duration-150 ${i % 2 === 1 ? 'bg-gray-100' : ''}`}
          >
            <td className='px-4 sm:px-6 py-4'>
              <p className='text-sm sm:text-base lg:text-lg font-semibold text-gray-900 truncate'>{produto.titulo}</p>
              <p className='text-xs text-gray-500 mt-1 truncate'>
                {produto.descricao || <span className='italic text-gray-400'>Sem descrição</span>}
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
                  onClick={() => onEdit(produto)}
                  title='Editar produto'
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
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  </div>
);

export default ProductTable;
