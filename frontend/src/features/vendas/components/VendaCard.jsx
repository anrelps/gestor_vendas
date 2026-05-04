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

const StatusBadge = ({ pending, size = 'sm' }) => {
  const base = 'inline-flex items-center rounded-md font-semibold shadow-sm';
  const pad = size === 'sm' ? 'px-2.5 py-0.5 text-xs' : 'px-3 py-1 text-sm';
  return pending ? (
    <span className={`${base} ${pad} bg-yellow-100 text-yellow-800 border border-yellow-300`}>
      Pendente
    </span>
  ) : (
    <span className={`${base} ${pad} bg-green-100 text-green-800 border border-green-300`}>
      Pago
    </span>
  );
};

const AmountBadge = ({ venda }) => {
  const pending = isPending(venda);
  return pending ? (
    <span className='inline-block bg-gray-100 text-gray-700 font-semibold rounded px-2 py-0.5 text-sm border border-gray-200 whitespace-normal break-all'>
      {currencyFormatter.format(Number(venda?.valor_pago) || 0)} / {currencyFormatter.format(Number(venda?.valor_total) || 0)}
    </span>
  ) : (
    <span className='inline-block bg-green-50 text-gray-700 font-semibold rounded px-2 py-0.5 text-sm border border-green-300 whitespace-normal break-all'>
      {currencyFormatter.format(Number(venda?.valor_total) || 0)}
    </span>
  );
};

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
    className={`flex flex-col justify-between rounded-xl border transition-colors duration-150 p-4 h-full min-h-30 ${
      isSelected ? 'border-primary/30 bg-primary/10' : 'border-gray-200 bg-gray-50 hover:border-primary'
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
        <span className='text-base font-semibold text-gray-800 truncate max-w-[60%]'>
          {venda?.titulo ?? 'Sem título'}
        </span>
        <span className='text-gray-400 text-xs shrink-0 ml-auto truncate max-w-22.5'>
          {formatVendaDate(venda?.created_at)}
        </span>
      </div>

      {/* Mobile layout */}
      <div className='pl-7 sm:hidden'>
        <div className='flex flex-col gap-2'>
          <span className='text-base text-gray-700 truncate font-medium'>
            {venda?.cliente?.nome ?? 'Sem cliente'}
          </span>
          <div className='flex items-center gap-2 flex-wrap'>
            <AmountBadge venda={venda} />
            <StatusBadge pending={pending} size='xs' />
          </div>
          <div className='flex items-center justify-between w-full gap-2'>
            {pending && (
              <button
                disabled={paying}
                onClick={handleQuickPay}
                className='flex items-center gap-1.5 text-xs font-semibold text-emerald-700 bg-emerald-50 border border-emerald-200 rounded-md px-2.5 py-1.5 hover:bg-emerald-100 transition disabled:opacity-50 cursor-pointer'
              >
                {paying ? <span className='w-3 h-3 border-2 border-emerald-600 border-t-transparent rounded-full animate-spin' /> : <BanknoteArrowUp size={13} />}
                Marcar como paga
              </button>
            )}
            <Link
              to={`/vendas/${venda.id}/editar`}
              className='flex items-center gap-2 text-primary hover:text-primary/70 transition cursor-pointer ml-auto'
            >
              <span className='text-sm font-semibold'>Ver venda</span>
              <Logs size={20} />
            </Link>
            <button
              className='px-2 py-2 text-gray-400 hover:text-red-500 transition cursor-pointer'
              onClick={(e) => { e.stopPropagation(); onDelete(venda.id); }}
            >
              <Trash2 size={18} />
            </button>
          </div>
        </div>
        {venda.descricao && (
          <span className='text-xs text-gray-500 mt-1 line-clamp-2'>{venda.descricao}</span>
        )}
      </div>

      {/* Desktop layout */}
      <div className='pl-7 hidden sm:block'>
        <div className='flex items-center gap-2 flex-wrap'>
          <span className='text-base text-gray-700 truncate font-medium max-w-[60%]'>
            {venda?.cliente?.nome ?? 'Sem cliente'}
          </span>
          <div className='ml-auto max-w-full'>
            <AmountBadge venda={venda} />
          </div>
        </div>
        {venda.descricao && (
          <span className='text-xs text-gray-500 mt-1 line-clamp-2'>{venda.descricao}</span>
        )}
      </div>
    </div>

    {/* Desktop footer */}
    <div className='hidden sm:flex items-center justify-between mt-3 gap-2 pl-7'>
      <div className='flex items-center gap-2'>
        <Link
          to={`/vendas/${venda.id}/editar`}
          className='flex items-center gap-2 text-primary hover:text-primary/70 transition cursor-pointer'
        >
          <span className='text-sm font-semibold'>Ir até a venda</span>
          <Logs size={20} />
        </Link>
      </div>
      <div className='flex items-center gap-2'>
        {pending && (
          <button
            disabled={paying}
            onClick={handleQuickPay}
            className='flex items-center gap-1.5 text-xs font-semibold text-emerald-700 bg-emerald-50 border border-emerald-200 rounded-md px-2.5 py-1.5 hover:bg-emerald-100 transition disabled:opacity-50 cursor-pointer'
          >
            {paying ? <span className='w-3 h-3 border-2 border-emerald-600 border-t-transparent rounded-full animate-spin' /> : <BanknoteArrowUp size={13} />}
            Marcar como paga
          </button>
        )}
        <StatusBadge pending={pending} size='sm' />
        <button
          className='px-2 py-2 text-gray-400 hover:text-red-500 transition cursor-pointer'
          onClick={(e) => { e.stopPropagation(); onDelete(venda.id); }}
        >
          <Trash2 size={18} />
        </button>
      </div>
    </div>
  </li>
  );
};

export default VendaCard;
