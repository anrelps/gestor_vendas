import { BanknoteArrowUp, Calendar } from 'lucide-react';

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
    {/* Selecionar todas */}
    <div
      className={`flex items-center gap-2 text-sm font-semibold rounded-lg px-2 h-9 border shrink-0 ${
        allSelected ? 'text-primary bg-primary/10 border-primary/20' : 'text-gray-700 bg-white border-transparent'
      }`}
    >
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
          className='text-sm font-semibold border border-gray-200 rounded-md px-3.5 py-1 bg-white text-gray-700 hover:text-gray-900'
        >
          Limpar
        </button>
      )}
    </div>

    {/* Não pagas */}
    <button
      value={filters.pendencias == 1 ? 0 : 1}
      onClick={onFilterChange('pendencias')}
      className={`${
        filters.pendencias == 1
          ? 'bg-primary text-white border-primary'
          : 'bg-white text-gray-700 border-gray-300 hover:bg-gray-50'
      } h-9 rounded-lg px-3 border transition text-sm font-medium cursor-pointer inline-flex items-center gap-2 whitespace-nowrap shrink-0`}
      title='Mostrar apenas vendas não pagas'
    >
      <span className={`w-2 h-2 rounded-full ${filters.pendencias == 1 ? 'bg-white' : 'bg-yellow-500'}`} />
      Não pagas
    </button>

    {/* Data Início */}
    <div
      className='relative cursor-pointer shrink-0'
      onClick={() => { const i = dateStartRef.current; if (i?.showPicker) i.showPicker(); else i?.focus(); }}
    >
      <div className='h-9 inline-flex items-center justify-center gap-2 px-3 rounded-lg border border-gray-300 bg-white hover:bg-gray-50 transition text-sm font-medium whitespace-nowrap'>
        <Calendar size={16} className='text-gray-400' />
        <span className='text-gray-500 text-xs'>De</span>
        <span className={filters.data_min ? 'text-gray-700' : 'text-gray-400'}>
          {filters.data_min ? dateStart : 'Selecionar'}
        </span>
      </div>
      <input
        ref={dateStartRef}
        type='date'
        value={dateStart}
        onChange={onDateStartChange}
        className='absolute inset-0 w-full h-full opacity-0 cursor-pointer'
        tabIndex={-1}
      />
    </div>

    {/* Data Fim */}
    <div
      className='relative cursor-pointer shrink-0'
      onClick={() => { const i = dateEndRef.current; if (i?.showPicker) i.showPicker(); else i?.focus(); }}
    >
      <div className='h-9 inline-flex items-center justify-center gap-2 px-3 rounded-lg border border-gray-300 bg-white hover:bg-gray-50 transition text-sm font-medium whitespace-nowrap'>
        <Calendar size={16} className='text-gray-400' />
        <span className='text-gray-500 text-xs'>Até</span>
        <span className={filters.data_max ? 'text-gray-700' : 'text-gray-400'}>
          {filters.data_max ? dateEnd : 'Selecionar'}
        </span>
      </div>
      <input
        ref={dateEndRef}
        type='date'
        value={dateEnd}
        onChange={onDateEndChange}
        className='absolute inset-0 w-full h-full opacity-0 cursor-pointer'
        tabIndex={-1}
      />
    </div>

    {/* Realizar Vários Pagamentos */}
    {filters.cliente && (
      <button
        onClick={onToggleMultiplePayment}
        className={`${
          showButtonMultiplePayment
            ? 'bg-primary text-white border-primary'
            : 'bg-white text-gray-700 border-gray-300 hover:bg-gray-50'
        } h-9 rounded-lg px-3 border transition text-sm font-medium cursor-pointer inline-flex items-center gap-2 whitespace-nowrap w-full sm:w-auto justify-center sm:justify-start`}
        title='Realizar vários pagamentos para as vendas filtradas'
      >
        <BanknoteArrowUp size={15} />
        Realizar Vários Pagamentos
      </button>
    )}
  </div>
);

export default VendaFilters;
