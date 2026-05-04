import {
  Combobox,
  ComboboxButton,
  ComboboxInput,
  ComboboxOption,
  ComboboxOptions,
} from '@headlessui/react';
import { format, parseISO } from 'date-fns';
import { Calendar, ChevronRight, User } from 'lucide-react';

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
}) => {
  const clientesFiltrados = (clientes || []).filter((c) =>
    c.nome.toLowerCase().includes(query.toLowerCase()),
  );

  return (
    <div className='px-4 sm:px-6 py-3 border-b border-gray-100 bg-gray-50/50'>
      {/* Filtro de Cliente */}
      <div className='mb-3'>
        <Combobox
          value={clienteId}
          onChange={(val) => { onClienteChange(val); onQueryChange(''); }}
          immediate
        >
          <div className='relative'>
            <div
              className='h-11 flex items-center px-4 rounded-sm border border-primary-light bg-white hover:bg-primary/5 hover:border-primary/50 transition cursor-text'
              onClick={() => clienteInputRef.current?.focus()}
            >
              <User size={18} className='text-primary mr-3 shrink-0' />
              <ComboboxInput
                ref={clienteInputRef}
                className='flex-1 bg-transparent border-none outline-none text-gray-800 font-medium placeholder-gray-400'
                placeholder='Todos os clientes'
                autoComplete='off'
                displayValue={(id) => {
                  if (!id) return '';
                  const c = (clientes || []).find((c) => c.id === id);
                  return c ? c.nome : '';
                }}
                onChange={(e) => onQueryChange(e.target.value)}
              />
              <ComboboxButton className='ml-2 shrink-0'>
                <ChevronRight size={18} className='text-gray-400' />
              </ComboboxButton>
            </div>

            <ComboboxOptions className='absolute z-20 w-full bg-white border border-gray-200 rounded-lg mt-1 max-h-60 overflow-y-auto shadow-xl'>
              <ComboboxOption
                value=''
                className={({ active, selected }) =>
                  `flex items-center px-3 py-2.5 cursor-pointer text-sm whitespace-nowrap ${selected ? 'bg-primary/10 text-primary font-medium' : active ? 'bg-gray-50' : ''}`
                }
              >
                Todos os clientes
              </ComboboxOption>
              {clientesFiltrados.length === 0 && query ? (
                <div className='px-3 py-2.5 text-sm text-gray-400'>Nenhum cliente encontrado</div>
              ) : (
                clientesFiltrados.map((cliente) => (
                  <ComboboxOption
                    key={cliente.id}
                    value={cliente.id}
                    className={({ active, selected }) =>
                      `flex items-center px-3 py-2.5 cursor-pointer text-sm ${selected ? 'bg-primary/10 text-primary font-medium' : active ? 'bg-gray-50' : ''}`
                    }
                  >
                    <span className='truncate'>{cliente.nome}</span>
                  </ComboboxOption>
                ))
              )}
            </ComboboxOptions>
          </div>
        </Combobox>
      </div>

      {/* Filtros de Data */}
      <div className='flex flex-wrap sm:flex-nowrap items-center gap-2'>
        {/* Data Início */}
        <div
          className='relative cursor-pointer shrink-0'
          onClick={() => { const i = dateStartRef.current; if (i?.showPicker) i.showPicker(); else i?.focus(); }}
        >
          <div className='h-9 inline-flex items-center justify-center gap-2 px-3 rounded-lg border border-gray-300 bg-white hover:bg-gray-50 transition text-sm font-medium whitespace-nowrap'>
            <Calendar size={16} className='text-gray-400' />
            <span className='text-gray-500 text-xs'>De</span>
            <span className={filters.data_inicio ? 'text-gray-700' : 'text-gray-400'}>
              {filters.data_inicio ? dateStartDisplay : 'Selecionar'}
            </span>
          </div>
          <input
            ref={dateStartRef}
            type='date'
            value={filters.data_inicio}
            onChange={(e) => {
              const val = e.target.value;
              onDateStartChange(val ? format(parseISO(val), 'dd/MM/yyyy') : '');
              onFiltersChange((prev) => ({ ...prev, data_inicio: val }));
            }}
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
            <span className={filters.data_fim ? 'text-gray-700' : 'text-gray-400'}>
              {filters.data_fim ? dateEndDisplay : 'Selecionar'}
            </span>
          </div>
          <input
            ref={dateEndRef}
            type='date'
            value={filters.data_fim}
            onChange={(e) => {
              const val = e.target.value;
              onDateEndChange(val ? format(parseISO(val), 'dd/MM/yyyy') : '');
              onFiltersChange((prev) => ({ ...prev, data_fim: val }));
            }}
            className='absolute inset-0 w-full h-full opacity-0 cursor-pointer'
            tabIndex={-1}
          />
        </div>

        {(filters.data_inicio || filters.data_fim) && (
          <button
            type='button'
            onClick={onClearDates}
            className='h-9 rounded-lg px-3 border border-gray-300 bg-white hover:bg-gray-50 transition text-sm font-medium text-gray-600 whitespace-nowrap shrink-0'
          >
            Limpar datas
          </button>
        )}

        <span className='ml-auto text-sm text-gray-500 font-medium whitespace-nowrap shrink-0'>
          {count} registro{count !== 1 ? 's' : ''}
        </span>
      </div>
    </div>
  );
};

export default PagamentoFilters;
