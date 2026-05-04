import { Search } from 'lucide-react';
import { currencyFormatter } from '../utils';

const ProdutoSelector = ({ produtos, produtosSelecionados, query, onQueryChange, onCheck, onQuantityChange }) => {
  const filtrados = produtos.filter((p) => p.titulo.toLowerCase().includes(query.toLowerCase()));

  return (
    <div className='mt-6'>
      <div className='font-semibold text-black mb-2 text-lg'>Produtos</div>
      <div className='border border-gray-200 rounded-md shadow-sm overflow-hidden'>
        <div className='relative bg-white border-b border-gray-200'>
          <Search size={20} className='absolute left-3 top-1/2 -translate-y-1/2 text-gray-400' />
          <input
            type='text'
            className='w-full pl-10 pr-4 py-2.5 border-0 focus:outline-none focus:ring-0 text-base bg-transparent'
            placeholder='Buscar produto...'
            value={query}
            onChange={(e) => onQueryChange(e.target.value)}
          />
        </div>

        <div className='flex flex-col gap-0 bg-white max-h-96 overflow-y-auto'>
          {filtrados.length === 0 ? (
            <div className='px-4 py-8 text-center text-gray-400'>Nenhum produto encontrado</div>
          ) : (
            filtrados.map((produto, idx) => {
              const checked = produto.id in produtosSelecionados;
              const quantidade = checked ? produtosSelecionados[produto.id].quantidade : 1;
              const zebraBg = idx % 2 === 1 ? 'bg-gray-50' : 'bg-white';

              return (
                <div
                  key={produto.id}
                  className={`flex items-center w-full px-4 py-3 ${checked ? 'bg-primary/30' : zebraBg} ${idx !== filtrados.length - 1 ? 'border-b border-gray-100' : ''}`}
                >
                  <input
                    type='checkbox'
                    className='accent-primary mr-3'
                    checked={checked}
                    onChange={() => onCheck(produto)}
                  />
                  <span className='flex-1 text-gray-800 font-light'>{produto.titulo}</span>

                  <div
                    className='flex items-center mr-4 border border-gray-200 rounded-md overflow-hidden bg-white shrink-0'
                    style={{ minWidth: 66, height: 28 }}
                  >
                    <button
                      className={`w-6 h-6 flex items-center justify-center transition text-base ${checked ? 'bg-gray-100 text-gray-600' : 'bg-gray-50 text-gray-300 cursor-not-allowed'}`}
                      type='button'
                      onClick={() => checked && onQuantityChange(produto.id, -1)}
                      disabled={!checked}
                      style={{ border: 'none', borderRadius: 0 }}
                    >
                      -
                    </button>
                    <span className={`w-6 text-center select-none text-sm ${checked ? '' : 'text-gray-300'}`}>
                      {quantidade}
                    </span>
                    <button
                      className={`w-6 h-6 flex items-center justify-center transition text-base ${checked ? 'bg-gray-100 text-gray-600' : 'bg-gray-50 text-gray-300 cursor-not-allowed'}`}
                      type='button'
                      onClick={() => checked && onQuantityChange(produto.id, 1)}
                      disabled={!checked}
                      style={{ border: 'none', borderRadius: 0 }}
                    >
                      +
                    </button>
                  </div>

                  <span className='text-gray-500 text-sm text-right shrink-0' style={{ minWidth: 90 }}>
                    {currencyFormatter.format(Number(produto.valor))}
                  </span>
                </div>
              );
            })
          )}
        </div>
      </div>
    </div>
  );
};

export default ProdutoSelector;
