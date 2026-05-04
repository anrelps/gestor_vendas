import {
  Combobox,
  ComboboxButton,
  ComboboxInput,
  ComboboxOption,
  ComboboxOptions,
} from '@headlessui/react';
import { ChevronRight, User } from 'lucide-react';

const ClienteCombobox = ({ clientes = [], value, query, onQueryChange, onChange, inputRef }) => {
  const filtrados = clientes.filter((c) =>
    c.nome.toLowerCase().includes((query ?? '').toLowerCase()),
  );

  return (
    <Combobox
      value={value}
      onChange={(val) => { onChange(val); onQueryChange(''); }}
      immediate
    >
      <div className='relative'>
        <div
          className='h-9 flex items-center px-3.5 rounded-lg border border-gray-200 bg-white hover:bg-gray-50 hover:border-gray-300 transition cursor-text'
          onClick={() => inputRef?.current?.focus()}
        >
          <User size={15} className='text-gray-400 mr-2.5 shrink-0' />
          <ComboboxInput
            ref={inputRef}
            className='flex-1 bg-transparent border-none outline-none text-sm text-gray-700 placeholder-gray-400'
            placeholder='Todos os clientes'
            autoComplete='off'
            displayValue={(id) => {
              if (!id) return '';
              return clientes.find((c) => c.id === id)?.nome ?? '';
            }}
            onChange={(e) => onQueryChange(e.target.value)}
          />
          <ComboboxButton className='ml-2 shrink-0'>
            <ChevronRight size={15} className='text-gray-400' />
          </ComboboxButton>
        </div>

        <ComboboxOptions className='absolute z-20 w-full bg-white border border-gray-200 rounded-lg mt-1 max-h-60 overflow-y-auto shadow-xl'>
          <ComboboxOption
            value=''
            className={({ active, selected }) =>
              `flex items-center px-3 py-2.5 cursor-pointer text-sm ${
                selected ? 'bg-primary/10 text-primary font-medium' : active ? 'bg-gray-50' : ''
              }`
            }
          >
            Todos os clientes
          </ComboboxOption>
          {filtrados.length === 0 && query ? (
            <div className='px-3 py-2.5 text-sm text-gray-400'>Nenhum cliente encontrado</div>
          ) : (
            filtrados.map((cliente) => (
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
            ))
          )}
        </ComboboxOptions>
      </div>
    </Combobox>
  );
};

export default ClienteCombobox;
