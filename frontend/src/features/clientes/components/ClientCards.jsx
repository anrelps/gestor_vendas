import { Pencil, Trash2 } from 'lucide-react';
import { formatTelefone } from '../utils';

const ClientCards = ({ clientes, onEdit, onDelete }) => (
  <div className='lg:hidden divide-y divide-gray-100'>
    {clientes.map((cliente) => (
      <div
        key={cliente.id}
        className='px-4 py-3.5 flex items-center justify-between gap-4 hover:bg-primary/3 transition-colors duration-100'
      >
        <div className='flex items-center gap-3 min-w-0'>
          <div className='w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center shrink-0'>
            <span className='text-xs font-bold text-primary'>{cliente.nome[0].toUpperCase()}</span>
          </div>
          <div className='min-w-0'>
            <p className='text-sm font-semibold text-gray-900 truncate'>{cliente.nome}</p>
            <p className='text-xs text-gray-500 mt-0.5 truncate'>
              {cliente.email || <span className='text-gray-300'>Email não informado</span>}
            </p>
            <p className='text-xs text-gray-500 mt-0.5'>
              {cliente.telefone ? formatTelefone(cliente.telefone) : <span className='text-gray-300'>Telefone não informado</span>}
            </p>
          </div>
        </div>
        <div className='flex items-center gap-0.5 shrink-0'>
          <button
            className='p-1.5 text-gray-400 hover:text-primary hover:bg-primary/10 rounded-md transition-all duration-150 cursor-pointer'
            onClick={() => onEdit(cliente)}
            title='Editar cliente'
          >
            <Pencil size={14} />
          </button>
          <button
            className='p-1.5 text-gray-400 hover:text-red-500 hover:bg-red-50 rounded-md transition-all duration-150 cursor-pointer'
            onClick={() => onDelete(cliente.id)}
            title='Remover cliente'
          >
            <Trash2 size={14} />
          </button>
        </div>
      </div>
    ))}
  </div>
);

export default ClientCards;
