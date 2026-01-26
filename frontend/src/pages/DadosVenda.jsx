import { Combobox, ComboboxOption, ComboboxOptions } from '@headlessui/react';
import { format } from 'date-fns';
import { ChevronRight, Pencil, Plus, User } from 'lucide-react'; // adicionado Plus
import { useRef, useState } from 'react';
import Layout from '../Layout';
import EditClientPopup from '../components/EditClientPopup';

const mockClientes = [
  { id: 1, nome: 'João da Silva' },
  { id: 2, nome: 'Maria Oliveira' },
  { id: 3, nome: 'Carlos Souza' },
  { id: 4, nome: 'Ana Paula' },
  { id: 5, nome: 'Fernanda Lima' },
  { id: 6, nome: 'Pedro Santos' },
];

const mockProdutos = [
  { id: 1, nome: 'Notebook Dell', valor: 3500.0 },
  { id: 2, nome: 'Mouse Logitech', valor: 120.5 },
  { id: 3, nome: 'Teclado Mecânico', valor: 450.99 },
  { id: 4, nome: 'Monitor LG 24"', valor: 899.9 },
  { id: 5, nome: 'Cadeira Gamer', valor: 1299.0 },
];

const DadosVenda = () => {
  const [busca, setBusca] = useState('');
  const [clienteSelecionado, setClienteSelecionado] = useState('');
  const [open, setOpen] = useState(false);
  const [showNewClient, setShowNewClient] = useState(false);
  const [tituloVenda, setTituloVenda] = useState(
    `Venda ${format(new Date(), 'dd/MM/yyyy HH:mm')}`,
  );
  const [descricaoVenda, setDescricaoVenda] = useState('');
  const [produtosSelecionados, setProdutosSelecionados] = useState([]);
  const inputRef = useRef();

  // Filtra clientes pelo nome
  const clientesFiltrados = mockClientes.filter((c) =>
    c.nome.toLowerCase().includes(busca.toLowerCase()),
  );

  // Fecha o dropdown ao perder o foco do input
  const handleBlur = (e) => {
    setTimeout(() => setOpen(false), 100);
  };

  // Função para lidar com seleção/deseleção de produtos
  const handleProdutoCheck = (id) => {
    setProdutosSelecionados((prev) =>
      prev.includes(id) ? prev.filter((pid) => pid !== id) : [...prev, id],
    );
  };

  return (
    <Layout>
      <div className='mt-4 flex items-center gap-2' style={{ maxWidth: 500 }}>
        <div className='relative w-full'>
          <input
            className='w-full px-0 py-1 pr-8 border-0 border-b-2 border-gray-200 focus:border-primary focus:outline-none bg-transparent text-3xl transition-colors duration-150'
            value={tituloVenda}
            onChange={(e) => setTituloVenda(e.target.value)}
            placeholder='Título da venda'
          />
          <Pencil
            size={22}
            className='absolute right-0 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none'
            title='Editar título'
          />
        </div>
      </div>
      <div className='mx-auto mt-2 bg-white rounded-md shadow p-6'>
        <div>
          <div className='flex w-full items-center justify-between'>
            <h1 className='text-black text-lg font-bold'>Cliente</h1>
            <button
              className='cursor-pointer mt-6 md:mt-0 md:w-auto md:shrink-0 px-4 py-2 rounded bg-white text-primary border border-primary hover:bg-primary/10 transition md:ml-2 flex items-center gap-2'
              style={{ minWidth: 120 }}
              onClick={() => setShowNewClient(true)}
            >
              <Plus size={18} className='inline-block' />
              Novo Cliente
            </button>
          </div>
          <div className='mt-4'>
            <Combobox
              value={clienteSelecionado}
              onChange={setClienteSelecionado}
            >
              <div className='relative'>
                <Combobox.Button
                  className='w-full'
                  onClick={() => setOpen((prev) => !prev)}
                >
                  <div
                    className='flex items-center w-full px-4 py-3 rounded-md border border-gray-300 bg-gray-50 hover:bg-gray-100 transition cursor-pointer shadow-sm'
                    style={{ minHeight: 56 }}
                  >
                    <span className='flex items-center justify-center w-9 h-9 rounded-full bg-primary mr-3'>
                      <User size={22} className='text-white' />
                    </span>
                    <span className='text-base text-gray-700 truncate'>
                      {(() => {
                        const c = mockClientes.find(
                          (c) => c.id === clienteSelecionado,
                        );
                        return c ? c.nome : 'Selecione um cliente';
                      })()}
                    </span>
                    <ChevronRight size={22} className='text-gray-400 ml-auto' />
                  </div>
                </Combobox.Button>
                {open && (
                  <ComboboxOptions className='absolute z-10 w-full bg-white border border-gray-300 rounded-md mt-2 max-h-56 overflow-y-auto shadow'>
                    {clientesFiltrados.length === 0 && (
                      <div className='px-4 py-3 text-gray-400'>
                        Nenhum cliente encontrado
                      </div>
                    )}
                    {clientesFiltrados.map((cliente) => (
                      <ComboboxOption
                        key={cliente.id}
                        value={cliente.id}
                        className={`flex items-center px-4 py-3 cursor-pointer rounded-lg ${
                          clienteSelecionado === cliente.id
                            ? 'bg-primary/10'
                            : 'bg-white'
                        }`}
                        onClick={() => setOpen(false)}
                      >
                        <span className='text-base text-gray-700 truncate'>
                          {cliente.nome}
                        </span>
                      </ComboboxOption>
                    ))}
                  </ComboboxOptions>
                )}
              </div>
            </Combobox>
          </div>
        </div>

        <textarea
          className='mt-4 w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring focus:border-primary text-base resize-none'
          value={descricaoVenda}
          onChange={(e) => setDescricaoVenda(e.target.value)}
          placeholder='Descrição da venda'
          rows={3}
        />
        <div className='mt-6'>
          <div className='font-semibold text-black mb-2 text-lg'>Produtos</div>
          <div className='flex flex-col gap-0 rounded-md border border-gray-200 shadow-sm bg-white'>
            {mockProdutos.map((produto, idx) => (
              <div
                key={produto.id}
                className={`flex items-center w-full px-4 py-3 ${
                  idx !== mockProdutos.length - 1
                    ? 'border-b border-gray-100'
                    : ''
                }`}
              >
                <input
                  type='checkbox'
                  className='accent-primary mr-3'
                  checked={produtosSelecionados.includes(produto.id)}
                  onChange={() => handleProdutoCheck(produto.id)}
                />
                <span className='flex-1 text-gray-800'>{produto.nome}</span>
                <span className='text-gray-500 text-sm'>
                  R$ {Number(produto.valor).toFixed(2)}
                </span>
              </div>
            ))}
          </div>
        </div>
        {showNewClient && (
          <EditClientPopup
            client={{}}
            onClose={() => setShowNewClient(false)}
          />
        )}
      </div>
      <div className='mt-8'>
        <div className='bg-white border border-gray-200 rounded-md px-6 py-4 flex flex-col gap-3 w-full max-w-full mx-auto shadow-sm'>
          <div className='flex gap-4 mb-2'>
            <div className='flex-1'>
              <label className='block text-xs text-gray-500 mb-1'>
                Valor Total
              </label>
              <input
                type='text'
                className='w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring text-base'
                placeholder='R$ 0,00'
                disabled
              />
            </div>
            <div className='flex-1'>
              <label className='block text-xs text-gray-500 mb-1'>
                Valor Pago
              </label>
              <input
                type='text'
                className='w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring text-base'
                placeholder='R$ 0,00'
                disabled
              />
            </div>
          </div>
          <div className='flex gap-2 mt-2'>
            <button className='flex-1 px-3 py-2 rounded bg-gray-200 text-gray-700 font-semibold hover:bg-gray-300 transition'>
              Cancelar
            </button>
            <button className='flex-1 px-3 py-2 rounded bg-primary text-white font-semibold hover:bg-primary/90 transition'>
              Salvar
            </button>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default DadosVenda;
