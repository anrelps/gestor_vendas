import { format, parseISO } from 'date-fns';
import ClienteCombobox from '../../../components/ui/ClienteCombobox';
import DateRangeFilter from '../../../components/ui/DateRangeFilter';

const PagamentoFilters = ({
  clientes,
  clienteId,
  query,
  onQueryChange,
  onClienteChange,
  clienteInputRef,
  filters,
  onFiltersChange,
  dateStartDisplay,
  dateEndDisplay,
  onDateStartChange,
  onDateEndChange,
  dateStartRef,
  dateEndRef,
  onClearDates,
  count,
}) => (
  <div className='px-6 py-3 border-b border-gray-100 flex flex-col gap-3'>
    <ClienteCombobox
      clientes={clientes}
      value={clienteId}
      query={query}
      onQueryChange={onQueryChange}
      onChange={onClienteChange}
      inputRef={clienteInputRef}
    />

    <div className='flex flex-wrap sm:flex-nowrap items-center gap-2'>
      <DateRangeFilter
        dateStart={filters.data_inicio}
        dateEnd={filters.data_fim}
        dateStartDisplay={dateStartDisplay}
        dateEndDisplay={dateEndDisplay}
        dateStartRef={dateStartRef}
        dateEndRef={dateEndRef}
        onDateStartChange={(e) => {
          const val = e.target.value;
          onDateStartChange(val ? format(parseISO(val), 'dd/MM/yyyy') : '');
          onFiltersChange((prev) => ({ ...prev, data_inicio: val }));
        }}
        onDateEndChange={(e) => {
          const val = e.target.value;
          onDateEndChange(val ? format(parseISO(val), 'dd/MM/yyyy') : '');
          onFiltersChange((prev) => ({ ...prev, data_fim: val }));
        }}
        onClear={onClearDates}
      />

      <span className='ml-auto text-xs text-gray-400 font-medium whitespace-nowrap shrink-0'>
        {count} registro{count !== 1 ? 's' : ''}
      </span>
    </div>
  </div>
);

export default PagamentoFilters;
