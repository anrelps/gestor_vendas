import { Logs, Plus } from 'lucide-react';
import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

// Mock vendas
const mockVendas = [
  {
    id: 1,
    titulo: 'Venda 001',
    cliente: 'João Silva',
    valor_total: 150.75,
    valor_pago: 150.75,
    data: '2026-01-28',
  },
  {
    id: 2,
    titulo: 'Venda 002',
    cliente: 'Maria Oliveira',
    valor_total: 320.0,
    valor_pago: 200.0, // incompleto
    data: '2026-01-27',
  },
  {
    id: 3,
    titulo: 'Venda 003',
    cliente: 'Carlos Souza',
    valor_total: 89.99,
    valor_pago: 89.99,
    data: '2026-01-26',
  },
];

const VendaList = () => {
  const [search, setSearch] = useState('');
  const navigate = useNavigate();

  const vendasFiltradas = mockVendas.filter((venda) =>
    venda.cliente.toLowerCase().includes(search.toLowerCase()),
  );

  return (
    <div className='w-full flex flex-col items-center mt-4 px-2 bg-gray-50'>
      <div className='w-full max-w-5xl'>
        <h2 className='text-2xl font-bold text-black mb-2 px-2 sm:px-0'>
          Vendas
        </h2>
        <div className='bg-white rounded-md shadow-sm overflow-hidden border border-gray-200'>
          <div className='flex flex-col gap-3 px-6 py-3 border-b-2 bg-linear-to-r from-white via-white/30 to-black/1 border-black/2'>
            <div className='w-full flex flex-col sm:flex-row sm:items-center sm:justify-start gap-2'>
              <div className='flex flex-1 gap-2'>
                <button
                  className='cursor-pointer px-4 py-2 rounded bg-white text-primary border border-primary hover:bg-primary/10 transition flex items-center gap-2 font-semibold min-w-30'
                  onClick={() => navigate('/nova-venda')}
                >
                  <Plus size={18} className='inline-block' />
                  <span className='hidden sm:inline'>Nova Venda</span>
                  <span className='sm:hidden'>Nova</span>
                </button>
                <input
                  type='text'
                  className='w-full max-w-xs truncate rounded-sm border border-gray-200 px-3 sm:px-4 py-2 text-gray-700 bg-gray- focus:bg-white focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary transition-all duration-100 '
                  placeholder='Buscar venda...'
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                />
              </div>
            </div>
            {/* Filtros extras */}
            <div className='flex gap-2 mt-1'>
              <button
                className='rounded-full px-3 py-1 bg-gray-100 text-gray-700 border border-gray-300 hover:bg-gray-200 hover:text-black transition text-sm font-medium shadow-none'
                title='Mostrar apenas vendas não pagas'
                // onClick={...} // implementar depois
              >
                Não pagas
              </button>
              <input
                type='date'
                className='rounded-full px-3 py-1 bg-gray-100 text-gray-700 border border-gray-300 hover:bg-gray-200 focus:bg-white focus:outline-none transition text-sm font-medium shadow-none'
                title='Filtrar por data'
                // onChange={...} // implementar depois
              />
            </div>
            {/* fim filtros extras */}
          </div>
          <div className='divide-y divide-gray-100'>
            {vendasFiltradas.length === 0 && (
              <div className='py-6 px-3 sm:px-6 text-center text-gray-400'>
                Nenhuma venda encontrada.
              </div>
            )}
            {vendasFiltradas.length > 0 && (
              <div className='border border-gray-200 rounded-lg m-4'>
                <ul className='flex flex-col'>
                  {vendasFiltradas.map((venda, idx) => (
                    <li
                      key={venda.id}
                      className={`flex flex-col px-4 py-3 cursor-pointer transition-colors ${
                        idx % 2 === 0 ? 'bg-white' : 'bg-white/85'
                      } hover:bg-primary/5 ${
                        idx !== vendasFiltradas.length - 1
                          ? 'border-b-2 border-b-gray-100'
                          : ''
                      }`}
                    >
                      <div className='flex items-center'>
                        <div className='flex-1 min-w-0 flex items-center gap-3'>
                          <span className='text-base text-gray-800 truncate font-semibold'>
                            {venda.titulo}
                          </span>
                          <span className='text-gray-600'>-</span>
                          <span className='text-base text-gray-700 truncate font-medium'>
                            {venda.cliente}
                          </span>
                          {venda.valor_pago < venda.valor_total ? (
                            <span className='inline-block bg-yellow-50 text-yellow-700 font-semibold rounded px-2 py-0.5 text-sm shadow-sm border border-yellow-200'>
                              R$ {Number(venda.valor_pago).toFixed(2)} / R$ {''}
                              {Number(venda.valor_total).toFixed(2)}
                            </span>
                          ) : (
                            <span className='inline-block bg-green-50 text-green-600 font-semibold rounded px-2 py-0.5 text-sm shadow-sm border border-green-100'>
                              R$ {Number(venda.valor_total).toFixed(2)}
                            </span>
                          )}
                          <span className='ml-2 text-xs text-gray-400'>
                            {venda.data}
                          </span>
                        </div>
                        <Link
                          to={`/vendas/${venda.id}/editar`}
                          className='ml-4 text-primary hover:text-primary/70'
                          title='Editar venda'
                        >
                          <Logs size={20} />
                        </Link>
                      </div>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default VendaList;
