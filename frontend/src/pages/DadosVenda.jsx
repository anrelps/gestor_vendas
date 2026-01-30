import { useDispatch, useSelector } from 'react-redux';

import {
  Combobox,
  ComboboxButton,
  ComboboxOption,
  ComboboxOptions,
} from '@headlessui/react';
import { ChevronRight, Pencil, Plus, User } from 'lucide-react';
import { useEffect, useRef, useState } from 'react';
import Layout from '../Layout';
import EditClientPopup from '../components/EditClientPopup';

import { index as indexClientes } from '../redux/slices/clienteSlice';
import { index as indexProdutos } from '../redux/slices/produtoSlice';
import { create, show } from '../redux/slices/vendaSlice';

const DadosVenda = ({ isEditing = false, vendaId = null }) => {
  const dispatch = useDispatch();

  const { user } = useSelector((state) => state.user);
  const { clientes, loading } = useSelector((state) => state.cliente);
  const { produtos } = useSelector((state) => state.produto);
  const { venda } = useSelector((state) => state.venda);

  // Edit venda
  useEffect(() => {
    if(isEditing && user?.empresa?.id) {
      console.log('editing');
      dispatch(show({
        empresa_id: user.empresa.id,
        venda_id: vendaId,
      }));
    }
  }, [isEditing, vendaId, user?.empresa?.id])
  
  // End edit venda

  useEffect(() => {
    if (user?.empresa?.id) {
      dispatch(
        indexClientes({
          empresa_id: user.empresa.id,
          page: 1,
          maxItems: 999,
          pesquisa: '',
        }),
      );
    }
  }, [dispatch, user?.empresa?.id]);

  useEffect(() => {
    if (user?.empresa?.id) {
      dispatch(
        indexProdutos({
          empresa_id: user.empresa.id,
          page: 1,
          maxItems: 999,
          pesquisa: '',
        }),
      );
    }
  }, [dispatch, user?.empresa?.id]);

  const [busca, setBusca] = useState('');
  const [clienteSelecionado, setClienteSelecionado] = useState('');
  const [showNewClient, setShowNewClient] = useState(false);
  const [tituloVenda, setTituloVenda] = useState(`Venda ${Date.now()}`);
  const [descricaoVenda, setDescricaoVenda] = useState('');
  const [produtosSelecionados, setProdutosSelecionados] = useState({});
  const [valorTotal, setValorTotal] = useState(0);
  const [valorPago, setValorPago] = useState(0);
  const inputRef = useRef();

  useEffect(() => {
    if(isEditing && venda?.id) {
      setTituloVenda(venda.titulo);
      setClienteSelecionado(venda.cliente.id);
      setDescricaoVenda(venda.descricao);
      setValorPago(venda.valor_pago);
      setValorTotal(venda.valor_total);

      let detalhesVenda = venda.detalhesVenda;
      const produtosMap = {};

      detalhesVenda.forEach(detalhe => {
        produtosMap[detalhe.produto_id] = detalhe;
      });

      setProdutosSelecionados(produtosMap);
    }

  }, [isEditing, venda])

  // Função para lidar com seleção/deseleção de produtos
  const handleProdutoCheck = (produto) => {
    console.log(produto);
    let pid = produto.id;
    setProdutosSelecionados((prev) => {
      const newState = { ...prev };

      if (newState[pid]) {
        delete newState[pid];
      } else {
        newState[pid] = {
          produto_id: pid,
          quantidade: 1,
          valor: produto.valor,
          porcentagem_desconto: 0,
        };
      }
      console.log(newState);
      return newState;
    });
  };

  const handleSubmit = async () => {
    try {
      const data = {
        cliente: clienteSelecionado,
        titulo: tituloVenda,
        descricao: descricaoVenda,
        valor_total: valorTotal,
        valor_pago: valorPago,
        produtos: produtosSelecionados,
      };

      await dispatch(
        create({
          empresa_id: user.empresa.id,
          data,
        }),
      ).unwrap();
    } catch (error) {
      console.log('error submit venda: ', error);
    }
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
                <ComboboxButton className='w-full'>
                  <div
                    className='flex items-center w-full px-4 py-3 rounded-sm border border-gray-300 bg-gray-50 hover:bg-gray-100 transition cursor-pointer shadow-sm'
                    style={{ minHeight: 56 }}
                  >
                    <span className='flex items-center justify-center w-9 h-9 rounded-full bg-primary mr-3'>
                      <User size={22} className='text-white' />
                    </span>
                    <span className='text-base text-gray-700 truncate'>
                      {(() => {
                        const c = clientes.find(
                          (c) => c.id === clienteSelecionado,
                        );
                        return c ? c.nome : 'Selecione um cliente';
                      })()}
                    </span>
                    <ChevronRight size={22} className='text-gray-400 ml-auto' />
                  </div>
                </ComboboxButton>
                <ComboboxOptions className='absolute z-10 w-full bg-white border border-gray-300 rounded-md mt-2 max-h-56 overflow-y-auto shadow'>
                  {clientes.length === 0 && (
                    <div className='px-4 py-3 text-gray-400'>
                      Nenhum cliente encontrado
                    </div>
                  )}
                  {clientes.map((cliente) => (
                    <ComboboxOption
                      key={cliente.id}
                      value={cliente.id}
                      className={({ active, selected }) =>
                        [
                          'flex items-center px-4 py-3 cursor-pointer',
                          selected
                            ? 'bg-primary/10'
                            : active
                              ? 'bg-gray-100'
                              : 'bg-white',
                        ].join(' ')
                      }
                    >
                      <span className='text-base text-gray-700 truncate'>
                        {cliente.nome}
                      </span>
                    </ComboboxOption>
                  ))}
                </ComboboxOptions>
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
            {produtos.map((produto, idx) => {
              const checked = produto.id in produtosSelecionados;
              const quantidade = checked
                ? produtosSelecionados[produto.id].quantidade
                : 1;
              const zebraBg = idx % 2 === 1 ? 'bg-gray-50' : 'bg-white';
              return (
                <div
                  key={produto.id}
                  className={`flex items-center w-full px-4 py-3 ${checked ? 'bg-primary/30' : zebraBg} ${
                    idx !== produtos.length - 1
                      ? 'border-b border-gray-100'
                      : ''
                  }`}
                >
                  <input
                    type='checkbox'
                    className='accent-primary mr-3'
                    checked={checked}
                    onChange={() => handleProdutoCheck(produto)}
                  />
                  <span className='flex-1 text-gray-800 font-light'>
                    {produto.titulo}
                  </span>
                  <div
                    className='flex items-center mr-4 border border-gray-200 rounded-md overflow-hidden bg-white'
                    style={{ minWidth: 66, height: 28 }}
                  >
                    <button
                      className={`w-6 h-6 flex items-center justify-center transition text-base ${
                        checked
                          ? 'bg-gray-100 text-gray-600'
                          : 'bg-gray-50 text-gray-300 cursor-not-allowed'
                      }`}
                      type='button'
                      onClick={() => {
                        if (!checked) return;
                        setProdutosSelecionados((prev) => {
                          const newState = { ...prev };
                          if (newState[produto.id]?.quantidade > 1) {
                            newState[produto.id] = {
                              ...newState[produto.id],
                              quantidade: newState[produto.id].quantidade - 1,
                            };
                          }
                          return newState;
                        });
                      }}
                      tabIndex={-1}
                      disabled={!checked}
                      style={{ border: 'none', borderRadius: 0 }}
                    >
                      -
                    </button>
                    <span
                      className={`w-6 text-center select-none text-sm ${checked ? '' : 'text-gray-300'}`}
                    >
                      {quantidade}
                    </span>
                    <button
                      className={`w-6 h-6 flex items-center justify-center transition text-base ${
                        checked
                          ? 'bg-gray-100 text-gray-600'
                          : 'bg-gray-50 text-gray-300 cursor-not-allowed'
                      }`}
                      type='button'
                      onClick={() => {
                        if (!checked) return;
                        setProdutosSelecionados((prev) => {
                          const newState = { ...prev };
                          if (checked) {
                            newState[produto.id] = {
                              ...newState[produto.id],
                              quantidade: newState[produto.id].quantidade + 1,
                            };
                          }
                          return newState;
                        });
                      }}
                      tabIndex={-1}
                      disabled={!checked}
                      style={{ border: 'none', borderRadius: 0 }}
                    >
                      +
                    </button>
                  </div>
                  <span className='text-gray-500 text-sm'>
                    R$ {Number(produto.valor).toFixed(2)}
                  </span>
                </div>
              );
            })}
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
                Valor Pago
              </label>
              <input
                type='number'
                className='w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring text-base'
                placeholder='R$ 0,00'
                value={valorPago}
                onChange={(e) => setValorPago(e.target.value)}
              />
            </div>
            <div className='flex-1'>
              <label className='block text-xs text-gray-500 mb-1'>
                Valor Total
              </label>
              <input
                type='number'
                className='w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring text-base'
                placeholder='R$ 0,00'
                value={valorTotal}
                onChange={(e) => setValorTotal(e.target.value)}
              />
            </div>
          </div>
          <div className='flex gap-2 mt-2'>
            <button className='flex-1 px-3 py-2 rounded bg-gray-200 text-gray-700 font-semibold hover:bg-gray-300 transition'>
              Cancelar
            </button>
            <button
              onClick={handleSubmit}
              disabled={loading}
              className='flex-1 px-3 py-2 rounded bg-primary text-white font-semibold hover:bg-primary/90 transition'
            >
              {loading ? 'Carregando...' : 'Salvar'}
            </button>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default DadosVenda;
