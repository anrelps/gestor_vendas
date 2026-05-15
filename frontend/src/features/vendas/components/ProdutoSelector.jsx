import { Search } from 'lucide-react';
import { currencyFormatter } from '../utils';

const ProdutoSelector = ({ produtos, produtosSelecionados, query, onQueryChange, onCheck, onQuantityChange }) => {
  const filtrados = produtos.filter((p) => p.titulo.toLowerCase().includes(query.toLowerCase()));

  return (
    <div className='mt-5'>
      <span className='text-xs font-semibold text-gray-500 uppercase tracking-widest'>Produtos</span>

      <div className='mt-2 rounded-xl border border-gray-100 shadow-xs overflow-hidden'>

        <div className='relative bg-white border-b border-gray-100'>
          <Search size={15} className='absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400' />
          <input
            type='text'
            className='w-full pl-9 pr-4 py-2.5 border-0 focus:outline-none focus:ring-0 text-sm bg-transparent placeholder-gray-400'
            placeholder='Buscar produto...'
            value={query}
            onChange={(e) => onQueryChange(e.target.value)}
          />
        </div>

        <div className='flex flex-col bg-white max-h-80 overflow-y-auto divide-y divide-gray-100'>
          {filtrados.length === 0 ? (
            <div className='px-4 py-8 text-center text-sm text-gray-400'>Nenhum produto encontrado</div>
          ) : (
            filtrados.map((produto) => {
              const checked = produto.id in produtosSelecionados;
              const quantidade = checked ? produtosSelecionados[produto.id].quantidade : 1;

              return (
                <label
                  key={produto.id}
                  className={`flex items-center w-full px-4 py-3 cursor-pointer transition ${
                    checked ? 'bg-primary/8' : 'hover:bg-gray-50'
                  }`}
                >
                  <input
                    type='checkbox'
                    className='accent-primary mr-3 shrink-0'
                    checked={checked}
                    onChange={() => onCheck(produto)}
                  />
                  <span className={`flex-1 text-sm ${checked ? 'text-gray-800 font-medium' : 'text-gray-700'}`}>
                    {produto.titulo}
                  </span>

                  <div className='flex items-center mr-4 shrink-0'>
                    <div className={`inline-flex items-center rounded-md border overflow-hidden text-sm ${
                      checked ? 'border-gray-200 bg-white' : 'border-gray-100 bg-gray-50'
                    }`}>
                      <button
                        type='button'
                        className={`w-6 h-6 flex items-center justify-center transition ${
                          checked ? 'text-gray-600 hover:bg-gray-100' : 'text-gray-300 cursor-not-allowed'
                        }`}
                        onClick={(e) => { e.preventDefault(); checked && onQuantityChange(produto.id, -1); }}
                        disabled={!checked}
                      >
                        −
                      </button>
                      <span className={`w-6 text-center select-none text-xs font-medium ${checked ? 'text-gray-700' : 'text-gray-300'}`}>
                        {quantidade}
                      </span>
                      <button
                        type='button'
                        className={`w-6 h-6 flex items-center justify-center transition ${
                          checked ? 'text-gray-600 hover:bg-gray-100' : 'text-gray-300 cursor-not-allowed'
                        }`}
                        onClick={(e) => { e.preventDefault(); checked && onQuantityChange(produto.id, 1); }}
                        disabled={!checked}
                      >
                        +
                      </button>
                    </div>
                  </div>

                  <span className={`text-sm font-semibold shrink-0 w-24 text-right ${checked ? 'text-primary' : 'text-gray-400'}`}>
                    {currencyFormatter.format(Number(produto.valor))}
                  </span>
                </label>
              );
            })
          )}
        </div>
      </div>
    </div>
  );
};

export default ProdutoSelector;
