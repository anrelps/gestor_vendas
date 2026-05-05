import {
  Combobox,
  ComboboxButton,
  ComboboxInput,
  ComboboxOption,
  ComboboxOptions,
} from '@headlessui/react';
import { ChevronRight, Plus, User } from 'lucide-react';

const ClienteSelector = ({ clientes, value, query, onQueryChange, onChange, onNewClientClick }) => (
  <div>
    <div className='flex items-center justify-between mb-2'>
      <span className='text-xs font-semibold text-gray-500 uppercase tracking-widest'>Cliente</span>
      <button
        onClick={onNewClientClick}
        className='inline-flex items-center gap-1.5 text-xs font-medium text-primary hover:text-primary-light px-2.5 py-1 rounded-md border border-primary/20 bg-primary/5 hover:bg-primary/10 transition'
      >
        <Plus size={13} />
        Novo Cliente
      </button>
    </div>

    <Combobox
      value={value}
      onChange={(val) => { onChange(val); onQueryChange(''); }}
      immediate
    >
      <div className='relative'>
        <div
          className='h-9 flex items-center px-3.5 rounded-lg border border-gray-200 bg-white hover:bg-gray-50 hover:border-gray-300 transition cursor-text'
          onClick={() => {}}
        >
          <User size={15} className='text-gray-400 mr-2.5 shrink-0' />
          <ComboboxInput
            className='flex-1 bg-transparent border-none outline-none text-sm text-gray-700 placeholder-gray-400'
            placeholder='Selecione um cliente'
            autoComplete='off'
            displayValue={(clienteId) => clientes.find((c) => c.id === clienteId)?.nome ?? ''}
            onChange={(e) => onQueryChange(e.target.value)}
          />
          <ComboboxButton className='ml-2 shrink-0'>
            <ChevronRight size={15} className='text-gray-400' />
          </ComboboxButton>
        </div>

        <ComboboxOptions className='absolute z-20 w-full bg-white border border-gray-200 rounded-lg mt-1 max-h-60 overflow-y-auto shadow-xl'>
          {clientes.filter((c) => c.nome.toLowerCase().includes((query ?? '').toLowerCase())).length === 0 ? (
            <div className='px-3 py-2.5 text-sm text-gray-400'>Nenhum cliente encontrado</div>
          ) : (
            clientes
              .filter((c) => c.nome.toLowerCase().includes((query ?? '').toLowerCase()))
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
              ))
          )}
        </ComboboxOptions>
      </div>
    </Combobox>
  </div>
);

export default ClienteSelector;
