import { format, isValid, parseISO } from 'date-fns';
import { BanknoteArrowUp } from 'lucide-react';
import DateRangeFilter from '../../../components/ui/DateRangeFilter';

const fmt = (val) => {
  if (!val) return '';
  const d = parseISO(val);
  return isValid(d) ? format(d, 'dd/MM/yyyy') : val;
};

const VendaFilters = ({
  allSelected,
  selectedCount,
  onToggleSelectAll,
  onClearSelection,
  filters,
  onFilterChange,
  dateStart,
  dateEnd,
  dateStartRef,
  dateEndRef,
  onDateStartChange,
  onDateEndChange,
  showButtonMultiplePayment,
  onToggleMultiplePayment,
}) => (
  <div className='flex flex-wrap lg:flex-nowrap items-center gap-2'>

    <div className={`flex items-center gap-2 text-sm font-medium rounded-lg px-2 h-9 border shrink-0 ${
      allSelected ? 'text-primary bg-primary/10 border-primary/20' : 'text-gray-600 bg-white border-gray-200'
    }`}>
      <label className='flex items-center gap-2 cursor-pointer'>
        <input
          type='checkbox'
          checked={allSelected}
          onChange={onToggleSelectAll}
          className='h-4 w-4 rounded border-gray-300 text-primary focus:ring-primary accent-primary'
        />
        Selecionar todas
      </label>
      {selectedCount > 0 && (
        <button
          type='button'
          onClick={onClearSelection}
          className='text-xs font-medium border border-gray-200 rounded-md px-2.5 py-1 bg-white text-gray-600 hover:text-gray-800'
        >
          Limpar
        </button>
      )}
    </div>

    <button
      value={filters.pendencias == 1 ? 0 : 1}
      onClick={onFilterChange('pendencias')}
      className={`h-9 rounded-lg px-3 border transition text-sm font-medium cursor-pointer inline-flex items-center gap-2 whitespace-nowrap shrink-0 ${
        filters.pendencias == 1
          ? 'bg-primary text-white border-primary'
          : 'bg-white text-gray-600 border-gray-200 hover:bg-gray-50'
      }`}
    >
      <span className={`w-2 h-2 rounded-full ${filters.pendencias == 1 ? 'bg-white' : 'bg-yellow-400'}`} />
      Não pagas
    </button>

    <DateRangeFilter
      dateStart={dateStart}
      dateEnd={dateEnd}
      dateStartDisplay={fmt(dateStart)}
      dateEndDisplay={fmt(dateEnd)}
      dateStartRef={dateStartRef}
      dateEndRef={dateEndRef}
      onDateStartChange={onDateStartChange}
      onDateEndChange={onDateEndChange}
      onClear={() => {
        onDateStartChange({ target: { value: '' } });
        onDateEndChange({ target: { value: '' } });
      }}
    />

    {filters.cliente && (
      <button
        onClick={onToggleMultiplePayment}
        className={`h-9 rounded-lg px-3 border transition text-sm font-medium cursor-pointer inline-flex items-center gap-2 whitespace-nowrap w-full sm:w-auto justify-center sm:justify-start ${
          showButtonMultiplePayment
            ? 'bg-primary text-white border-primary'
            : 'bg-white text-gray-600 border-gray-200 hover:bg-gray-50'
        }`}
      >
        <BanknoteArrowUp size={15} />
        Realizar Vários Pagamentos
      </button>
    )}
  </div>
);

export default VendaFilters;
