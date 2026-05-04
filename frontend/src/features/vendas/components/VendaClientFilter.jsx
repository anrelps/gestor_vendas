import {
  Combobox,
  ComboboxButton,
  ComboboxInput,
  ComboboxOption,
  ComboboxOptions,
} from '@headlessui/react';
import { ChevronRight, User } from 'lucide-react';

const VendaClientFilter = ({ clientes, value, query, onQueryChange, onChange, inputRef }) => (
  <div className='mb-3'>
    <Combobox
      value={value}
      onChange={(val) => { onChange(val); onQueryChange(''); }}
      immediate
    >
      <div className='relative'>
        <div
          className='h-11 flex items-center px-4 rounded-sm border border-primary-light bg-white hover:bg-primary/5 hover:border-primary/50 transition cursor-text'
          onClick={() => inputRef.current?.focus()}
        >
          <User size={18} className='text-primary mr-3 shrink-0' />
          <ComboboxInput
            ref={inputRef}
            className='flex-1 bg-transparent border-none outline-none text-gray-800 font-medium placeholder-gray-400'
            placeholder='Todos os clientes'
            autoComplete='off'
            displayValue={(clienteId) => {
              if (!clienteId) return '';
              const c = clientes.find((c) => c.id === clienteId);
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
              `flex items-center px-3 py-2.5 cursor-pointer text-sm whitespace-nowrap ${
                selected ? 'bg-primary/10 text-primary font-medium' : active ? 'bg-gray-50' : ''
              }`
            }
          >
            Todos os clientes
          </ComboboxOption>

          {clientes
            .filter((c) => c.nome.toLowerCase().includes(query.toLowerCase()))
            .map((cliente) => (
              <ComboboxOption
                key={cliente.id}
                value={cliente.id}
                className={({ active, selected }) =>
                  `flex items-center px-3 py-2.5 cursor-pointer text-sm ${
                    selected ? 'bg-primary/10 text-primary font-medium' : active ? 'bg-gray-50' : ''
                  }`
                }
              >
                <span className='truncate'>{cliente.nome}</span>
              </ComboboxOption>
            ))}

          {clientes.filter((c) => c.nome.toLowerCase().includes(query.toLowerCase())).length === 0 && query && (
            <div className='px-3 py-2.5 text-sm text-gray-400'>Nenhum cliente encontrado</div>
          )}
        </ComboboxOptions>
      </div>
    </Combobox>
  </div>
);

export default VendaClientFilter;
