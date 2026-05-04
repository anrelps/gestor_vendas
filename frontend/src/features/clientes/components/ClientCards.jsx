import { Edit2, Trash2 } from 'lucide-react';
import { formatTelefone } from '../utils';

const ClientCards = ({ clientes, onEdit, onDelete }) => (
  <div className='lg:hidden'>
    <div className='space-y-3 p-4 sm:p-6'>
      {clientes.map((cliente) => (
        <div
          key={cliente.id}
          className='bg-white border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow duration-150'
        >
          <h3 className='text-lg font-bold text-gray-900 mb-1'>{cliente.nome}</h3>

          <p className='text-sm text-gray-600 mb-1 leading-relaxed'>
            <span className='font-semibold text-gray-700'>Email: </span>
            {cliente.email || <span className='italic text-gray-400'>Não informado</span>}
          </p>

          <p className='text-sm text-gray-600 mb-3 leading-relaxed'>
            <span className='font-semibold text-gray-700'>Telefone: </span>
            {cliente.telefone ? formatTelefone(cliente.telefone) : <span className='italic text-gray-400'>Não informado</span>}
          </p>

          <div className='inline-flex items-stretch rounded bg-linear-to-b from-gray-50 to-gray-50 border border-gray-200'>
            <button
              className='flex items-center gap-2 px-3 py-1.5 text-purple-800 font-medium text-sm transition-colors duration-150 cursor-pointer'
              onClick={() => onEdit(cliente)}
            >
              <Edit2 size={16} /> Editar
            </button>
            <div className='w-px bg-gray-200' />
            <button
              className='flex items-center justify-center p-2 text-red-600 transition-colors duration-150 cursor-pointer'
              onClick={() => onDelete(cliente.id)}
              title='Remover cliente'
            >
              <Trash2 size={18} />
            </button>
          </div>
        </div>
      ))}
    </div>
  </div>
);

export default ClientCards;
