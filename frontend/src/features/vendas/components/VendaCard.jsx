import { format, isValid, parseISO } from 'date-fns';
import { BanknoteArrowUp, Logs, Trash2 } from 'lucide-react';
import { useState } from 'react';
import { Link } from 'react-router-dom';

const currencyFormatter = new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' });

const formatVendaDate = (value) => {
  if (!value) return 'Sem Data';
  const parsed = parseISO(value);
  if (!isValid(parsed)) return 'Sem Data';
  return format(parsed, 'dd/MM/yyyy');
};

const isPending = (venda) =>
  (Number(venda?.valor_pago) || 0) < (Number(venda?.valor_total) || 0);

const StatusBadge = ({ pending }) => pending ? (
  <span className='inline-flex items-center rounded-md font-semibold px-2.5 py-0.5 text-xs bg-yellow-100 text-yellow-800 border border-yellow-300'>
    Pendente
  </span>
) : (
  <span className='inline-flex items-center rounded-md font-semibold px-2.5 py-0.5 text-xs bg-green-100 text-green-800 border border-green-300'>
    Pago
  </span>
);

const AmountBadge = ({ venda }) => {
  const pending = isPending(venda);
  return pending ? (
    <span className='inline-block w-fit bg-gray-100 text-gray-700 font-semibold rounded px-2 py-0.5 text-sm border border-gray-200 whitespace-nowrap'>
      {currencyFormatter.format(Number(venda?.valor_pago) || 0)} / {currencyFormatter.format(Number(venda?.valor_total) || 0)}
    </span>
  ) : (
    <span className='inline-block w-fit bg-green-50 text-green-800 font-semibold rounded px-2 py-0.5 text-sm border border-green-200 whitespace-nowrap'>
      {currencyFormatter.format(Number(venda?.valor_total) || 0)}
    </span>
  );
};

const QuickPayButton = ({ paying, onClick, size = 'sm' }) => (
  <button
    disabled={paying}
    onClick={onClick}
    className={`flex items-center gap-1.5 font-semibold bg-emerald-600 text-white rounded-md hover:bg-emerald-700 transition disabled:opacity-50 cursor-pointer whitespace-nowrap ${
      size === 'xs' ? 'text-xs px-2 py-1' : 'text-xs px-2.5 py-1.5'
    }`}
  >
    {paying
      ? <span className='w-3 h-3 border-2 border-white border-t-transparent rounded-full animate-spin' />
      : <BanknoteArrowUp size={12} />
    }
    Marcar como paga
  </button>
);

const VendaCard = ({ venda, isSelected, onSelect, onDelete, onQuickPay }) => {
  const [paying, setPaying] = useState(false);
  const pending = isPending(venda);

  const handleQuickPay = async (e) => {
    e.stopPropagation();
    setPaying(true);
    try { await onQuickPay(venda.id); } finally { setPaying(false); }
  };

  return (
    <li
      className={`flex flex-col justify-between rounded-xl border transition-colors duration-150 p-3.5 h-full ${
        isSelected ? 'border-primary/30 bg-primary/10' : 'border-gray-200 bg-gray-50 hover:border-primary/50'
      }`}
    >
      <div className='flex flex-col gap-2 flex-1'>
        {/* Title row */}
        <div className='flex items-center gap-3 min-w-0'>
          <input
            type='checkbox'
            checked={isSelected}
            onChange={() => onSelect(venda.id)}
            className='h-4 w-4 rounded border-gray-300 text-primary focus:ring-primary accent-primary shrink-0'
          />
          <span className='text-sm font-semibold text-gray-900 truncate flex-1'>
            {venda?.titulo ?? 'Sem título'}
          </span>
          <span className='text-gray-400 text-xs shrink-0'>
            {formatVendaDate(venda?.created_at)}
          </span>
        </div>

        {/* Mobile layout */}
        <div className='pl-7 sm:hidden flex flex-col gap-2'>
          <div>
            <span className='text-sm text-gray-500 font-medium truncate block'>
              {venda?.cliente?.nome ?? 'Sem cliente'}
            </span>
            {venda.descricao && (
              <span className='text-xs text-gray-400 line-clamp-1 block mt-0.5'>{venda.descricao}</span>
            )}
          </div>

          <AmountBadge venda={venda} />

          <div className='flex items-center justify-between gap-2'>
            <StatusBadge pending={pending} />
            <div className='flex items-center gap-1.5 shrink-0'>
              {pending && <QuickPayButton paying={paying} onClick={handleQuickPay} size='xs' />}
              <Link
                to={`/vendas/${venda.id}/editar`}
                className='flex items-center gap-1 text-primary hover:text-primary/70 transition cursor-pointer'
              >
                <span className='text-xs font-semibold'>Ver</span>
                <Logs size={14} />
              </Link>
              <button
                className='p-1 text-gray-400 hover:text-red-500 transition cursor-pointer'
                onClick={(e) => { e.stopPropagation(); onDelete(venda.id); }}
              >
                <Trash2 size={14} />
              </button>
            </div>
          </div>
        </div>

        {/* Desktop layout */}
        <div className='pl-7 hidden sm:block'>
          <div className='flex items-center gap-2 flex-wrap'>
            <span className='text-sm text-gray-500 truncate font-medium max-w-[60%]'>
              {venda?.cliente?.nome ?? 'Sem cliente'}
            </span>
            <div className='ml-auto'>
              <AmountBadge venda={venda} />
            </div>
          </div>
          {venda.descricao && (
            <span className='text-xs text-gray-400 mt-1 line-clamp-2 block'>{venda.descricao}</span>
          )}
        </div>
      </div>

      {/* Desktop footer */}
      <div className='hidden sm:flex items-center justify-between mt-3 gap-2 pl-7'>
        <Link
          to={`/vendas/${venda.id}/editar`}
          className='flex items-center gap-1.5 text-primary hover:text-primary/70 transition cursor-pointer'
        >
          <span className='text-sm font-semibold'>Ir até a venda</span>
          <Logs size={16} />
        </Link>
        <div className='flex items-center gap-2'>
          {pending && <QuickPayButton paying={paying} onClick={handleQuickPay} />}
          <StatusBadge pending={pending} />
          <button
            className='p-1.5 text-gray-400 hover:text-red-500 transition cursor-pointer'
            onClick={(e) => { e.stopPropagation(); onDelete(venda.id); }}
          >
            <Trash2 size={15} />
          </button>
        </div>
      </div>
    </li>
  );
};

export default VendaCard;
