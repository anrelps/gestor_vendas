import { Edit2, Trash2 } from 'lucide-react';
import { formatTelefone } from '../utils';

const ClientTable = ({ clientes, onEdit, onDelete }) => (
  <div className='hidden lg:block overflow-x-auto'>
    <table className='w-full table-fixed'>
      <thead>
        <tr className='bg-gray-50 border-b border-gray-200'>
          <th className='px-4 sm:px-6 py-3 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider w-[30%]'>Cliente</th>
          <th className='px-4 sm:px-6 py-3 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider w-[30%]'>Email</th>
          <th className='px-4 sm:px-6 py-3 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider w-[20%]'>Telefone</th>
          <th className='px-4 sm:px-6 py-3 text-center text-xs font-semibold text-gray-700 uppercase tracking-wider w-[20%]'>Ações</th>
        </tr>
      </thead>
      <tbody className='divide-y divide-gray-100'>
        {clientes.map((cliente, i) => (
          <tr
            key={cliente.id}
            className={`hover:bg-purple-50/50 transition-colors duration-150 ${i % 2 === 1 ? 'bg-gray-100' : ''}`}
          >
            <td className='px-4 sm:px-6 py-4'>
              <p className='text-sm sm:text-base lg:text-lg font-semibold text-gray-900 truncate'>{cliente.nome}</p>
            </td>
            <td className='px-4 sm:px-6 py-4'>
              <p className='text-xs sm:text-sm text-gray-600 truncate'>
                {cliente.email || <span className='italic text-gray-400'>Não informado</span>}
              </p>
            </td>
            <td className='px-4 sm:px-6 py-4'>
              <p className='text-xs sm:text-sm text-gray-600 whitespace-nowrap'>
                {cliente.telefone ? formatTelefone(cliente.telefone) : <span className='italic text-gray-400'>Não informado</span>}
              </p>
            </td>
            <td className='px-4 sm:px-6 py-4'>
              <div className='inline-flex items-stretch rounded bg-linear-to-b from-gray-50 to-gray-50 border border-gray-200'>
                <button
                  className='flex items-center gap-2 px-3 py-1.5 text-purple-800 font-medium text-sm transition-colors duration-150 cursor-pointer'
                  onClick={() => onEdit(cliente)}
                  title='Editar cliente'
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
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  </div>
);

export default ClientTable;
