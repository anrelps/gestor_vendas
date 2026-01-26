import {
  Combobox,
  ComboboxOption,
  ComboboxOptions,
  Input,
} from '@headlessui/react';
import { format } from 'date-fns';
import { ChevronDown } from 'lucide-react';
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
      <div className='mx-auto mt-10 bg-white rounded-md shadow p-6'>
        <div className='flex flex-col md:flex-row md:items-center md:gap-3'>
          <div className='relative flex-1'>
            <Combobox
              value={clienteSelecionado}
              onChange={setClienteSelecionado}
            >
              <div className='relative'>
                <Input
                  ref={inputRef}
                  className='w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring focus:border-primary text-base pr-10'
                  placeholder='Buscar cliente...'
                  onChange={(e) => {
                    setBusca(e.target.value);
                    setOpen(true);
                  }}
                  onFocus={() => setOpen(true)}
                  onBlur={handleBlur}
                  displayValue={(id) => {
                    const c = mockClientes.find((c) => c.id === id);
                    return c ? c.nome : '';
                  }}
                />
                <span className='absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none'>
                  <ChevronDown size={18} />
                </span>
              </div>
              {open && (
                <ComboboxOptions
                  static
                  className='absolute z-10 w-full bg-white border border-gray-300 border-t-0 rounded-b max-h-44 overflow-y-auto shadow'
                >
                  {clientesFiltrados.length === 0 && (
                    <div className='px-3 py-2 text-gray-400'>
                      Nenhum cliente encontrado
                    </div>
                  )}
                  {clientesFiltrados.map((cliente) => (
                    <ComboboxOption
                      key={cliente.id}
                      value={cliente.id}
                      className={`px-3 py-2 cursor-pointer ${
                        clienteSelecionado === cliente.id
                          ? 'bg-gray-100'
                          : 'bg-white'
                      }`}
                    >
                      {cliente.nome}
                    </ComboboxOption>
                  ))}
                </ComboboxOptions>
              )}
            </Combobox>
          </div>
          <button
            className='mt-6 md:mt-0 md:w-auto md:shrink-0 px-4 py-2 rounded bg-primary text-white font-semibold hover:bg-primary/90 transition md:ml-2'
            style={{ minWidth: 120 }}
            onClick={() => setShowNewClient(true)}
          >
            Novo Cliente
          </button>
        </div>
        <input
          className='mt-4 w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring focus:border-primary text-base'
          value={tituloVenda}
          onChange={(e) => setTituloVenda(e.target.value)}
          placeholder='Título da venda'
        />
        <textarea
          className='mt-4 w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring focus:border-primary text-base resize-none'
          value={descricaoVenda}
          onChange={(e) => setDescricaoVenda(e.target.value)}
          placeholder='Descrição da venda'
          rows={3}
        />
        <div className='mt-6'>
          <div className='font-semibold text-gray-700 mb-2'>Produtos</div>
          <div className='flex flex-col gap-2'>
            {mockProdutos.map((produto) => (
              <label
                key={produto.id}
                className='flex items-center gap-2 cursor-pointer'
              >
                <input
                  type='checkbox'
                  className='accent-primary'
                  checked={produtosSelecionados.includes(produto.id)}
                  onChange={() => handleProdutoCheck(produto.id)}
                />
                <span className='flex-1'>{produto.nome}</span>
                <span className='text-gray-500 text-sm'>
                  R$ {Number(produto.valor).toFixed(2)}
                </span>
              </label>
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
      <div className='fixed left-1/2 transform -translate-x-1/2 bottom-8 md:bottom-12 z-50'>
        <div className='bg-white border border-gray-200 rounded-md px-6 py-4 flex flex-col gap-3 w-85 max-w-full mx-auto'>
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
