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
    <div className='md:flex w-full items-center md:justify-between'>
      <h1 className='text-black text-lg font-bold'>Cliente</h1>
      <button
        className='w-full cursor-pointer mt-6 md:mt-0 md:w-auto md:shrink-0 px-4 py-2 rounded-sm bg-primary/5 text-primary border border-primary hover:bg-white active:scale-[0.97] transition-all duration-150 md:ml-2 flex items-center gap-2 font-semibold'
        style={{ minWidth: 120 }}
        onClick={onNewClientClick}
      >
        <Plus size={18} className='inline-block' />
        Novo Cliente
      </button>
    </div>

    <div className='mt-4'>
      <Combobox
        value={value}
        onChange={(val) => { onChange(val); onQueryChange(''); }}
        immediate
      >
        <div className='relative'>
          <div className='flex items-center w-full px-4 py-3 rounded-sm border border-gray-300 bg-gray-50 shadow-sm'>
            <span className='flex items-center justify-center w-9 h-9 rounded-full bg-primary mr-3 shrink-0'>
              <User size={22} className='text-white' />
            </span>
            <ComboboxInput
              className='flex-1 bg-transparent border-none outline-none text-base text-gray-700 placeholder-gray-400'
              placeholder='Selecione um cliente'
              displayValue={(clienteId) => {
                const c = clientes.find((c) => c.id === clienteId);
                return c ? c.nome : '';
              }}
              onChange={(e) => onQueryChange(e.target.value)}
            />
            <ComboboxButton className='ml-2 shrink-0'>
              <ChevronRight size={22} className='text-gray-400' />
            </ComboboxButton>
          </div>

          <ComboboxOptions className='absolute z-10 w-full bg-white border border-gray-300 rounded-md mt-2 max-h-60 overflow-y-auto shadow-lg'>
            {clientes.filter((c) => c.nome.toLowerCase().includes(query.toLowerCase())).length === 0 ? (
              <div className='px-4 py-3 text-gray-400'>Nenhum cliente encontrado</div>
            ) : (
              clientes
                .filter((c) => c.nome.toLowerCase().includes(query.toLowerCase()))
                .map((cliente) => (
                  <ComboboxOption
                    key={cliente.id}
                    value={cliente.id}
                    className={({ active, selected }) =>
                      ['flex items-center px-4 py-3 cursor-pointer', selected ? 'bg-primary/10' : active ? 'bg-gray-100' : 'bg-white'].join(' ')
                    }
                  >
                    <span className='text-base text-gray-700 truncate'>{cliente.nome}</span>
                  </ComboboxOption>
                ))
            )}
          </ComboboxOptions>
        </div>
      </Combobox>
    </div>
  </div>
);

export default ClienteSelector;
