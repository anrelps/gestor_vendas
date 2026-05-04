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
    <li className='flex flex-col justify-between rounded-xl border border-gray-200 bg-gray-50 hover:border-primary transition-colors duration-150 p-4'>
      <div className='flex flex-col gap-2'>
        <div className='flex items-center gap-3 min-w-0'>
          <div
            className={`shrink-0 flex items-center justify-center w-9 h-9 rounded-xl ${
              isGeneral ? 'bg-primary/10 text-primary' : 'bg-violet-100 text-violet-600'
            }`}
          >
            {isGeneral ? <Landmark size={17} /> : <CircleDollarSign size={17} />}
          </div>

          <span className='text-base font-semibold text-gray-800 truncate max-w-[55%]'>
            {pagamento.venda?.titulo ?? 'Sem título'}
          </span>

          <span className='text-gray-400 text-xs shrink-0 ml-auto'>
            {formatDateTime(pagamento.created_at)}
          </span>
        </div>

        <div className='pl-12 flex flex-col gap-1.5'>
          <p className='text-sm text-gray-500 leading-relaxed'>{pagamento.description}</p>

          <div className='flex items-center gap-2 flex-wrap mt-1'>
            {isGeneral ? (
              <span className='inline-flex items-center gap-1.5 rounded-md bg-primary/10 text-primary border border-primary/20 px-2.5 py-0.5 text-xs font-semibold'>
                <LayoutList size={11} />
                Pagamento Geral
              </span>
            ) : (
              <span className='inline-flex items-center gap-1.5 rounded-md bg-violet-100 text-violet-700 border border-violet-200 px-2.5 py-0.5 text-xs font-semibold'>
                <CircleDollarSign size={11} />
                Pagamento Individual
              </span>
            )}

            {pagamento.venda?.cliente && (
              <span className='inline-flex items-center rounded-md bg-gray-100 text-gray-600 border border-gray-200 px-2.5 py-0.5 text-xs font-medium gap-1'>
                <User size={11} />
                {pagamento.venda.cliente.nome ?? 'Sem cliente'}
              </span>
            )}

            <span className='ml-auto inline-flex items-center rounded-md bg-green-50 text-green-700 border border-green-200 px-3 py-1 text-sm font-bold'>
              + {currencyFormatter.format(Number(pagamento.amount) || 0)}
            </span>
          </div>

          {pagamento.venda?.descricao && (
            <p className='text-xs text-gray-400 mt-0.5 line-clamp-1'>
              <span className='font-semibold'>Descrição da venda/serviço:</span> {pagamento.venda.descricao}
            </p>
          )}
        </div>
      </div>
    </li>
  );
};

export default PagamentoCard;
