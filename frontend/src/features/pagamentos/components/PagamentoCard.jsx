import { format, isValid, parseISO } from 'date-fns';
import { CircleDollarSign, Landmark, LayoutList, User } from 'lucide-react';

const currencyFormatter = new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' });

const formatDateTime = (value) => {
  if (!value) return 'Sem Data';
  const parsed = parseISO(value);
  if (!isValid(parsed)) return 'Sem Data';
  return format(parsed, "dd/MM/yyyy 'às' HH:mm");
};

const PagamentoCard = ({ pagamento }) => {
  const isGeneral = pagamento.type === 'general';

  return (
    <li className='flex flex-col rounded-xl border border-gray-200 bg-gray-50 hover:border-primary/50 transition-colors duration-150 p-3.5 gap-2'>
      {/* Linha 1: ícone + título + data */}
      <div className='flex items-center gap-3 min-w-0'>
        <div className={`shrink-0 flex items-center justify-center w-8 h-8 rounded-lg ${
          isGeneral ? 'bg-primary/10 text-primary' : 'bg-primary/15 text-primary-light'
        }`}>
          {isGeneral ? <Landmark size={15} /> : <CircleDollarSign size={15} />}
        </div>
        <span className='text-sm font-semibold text-gray-900 truncate flex-1'>
          {pagamento.venda?.titulo ?? 'Sem título'}
        </span>
        <span className='text-xs text-gray-400 shrink-0'>
          {formatDateTime(pagamento.created_at)}
        </span>
      </div>

      {/* Linha 2: descrição do pagamento + descrição da venda */}
      <div className='pl-11'>
        {pagamento.description && (
          <p className='text-sm text-gray-500'>{pagamento.description}</p>
        )}
        {pagamento.venda?.descricao && (
          <p className='text-xs text-gray-400 mt-0.5 line-clamp-1'>{pagamento.venda.descricao}</p>
        )}
      </div>

      {/* Linha 3: badges + valor */}
      <div className='pl-11 flex items-center gap-2 flex-wrap'>
        {isGeneral ? (
          <span className='inline-flex items-center gap-1 rounded-md bg-primary/10 text-primary border border-primary/20 px-2 py-0.5 text-xs font-semibold'>
            <LayoutList size={10} /> Pagamento Geral
          </span>
        ) : (
          <span className='inline-flex items-center gap-1 rounded-md bg-primary/15 text-primary-light border border-primary/20 px-2 py-0.5 text-xs font-semibold'>
            <CircleDollarSign size={10} /> Pagamento Individual
          </span>
        )}

        {pagamento.venda?.cliente && (
          <span className='inline-flex items-center gap-1 rounded-md bg-gray-100 text-gray-600 border border-gray-200 px-2 py-0.5 text-xs font-medium'>
            <User size={10} /> {pagamento.venda.cliente.nome}
          </span>
        )}

        <span className='ml-auto inline-flex items-center rounded-md bg-green-50 text-green-700 border border-green-200 px-2.5 py-0.5 text-sm font-bold whitespace-nowrap'>
          + {currencyFormatter.format(Number(pagamento.amount) || 0)}
        </span>
      </div>
    </li>
  );
};

export default PagamentoCard;
