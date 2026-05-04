import { Pencil, Trash2 } from 'lucide-react';
import { formatTelefone } from '../utils';

const ClientTable = ({ clientes, onEdit, onDelete }) => (
  <div className='hidden lg:block overflow-x-auto'>
    <table className='w-full table-fixed'>
      <thead>
        <tr className='bg-gray-50 border-b border-gray-100'>
          <th className='px-6 py-3 text-left text-[11px] font-semibold text-gray-500 uppercase tracking-widest w-[30%]'>Cliente</th>
          <th className='px-6 py-3 text-left text-[11px] font-semibold text-gray-500 uppercase tracking-widest w-[30%]'>Email</th>
          <th className='px-6 py-3 text-left text-[11px] font-semibold text-gray-500 uppercase tracking-widest w-[20%]'>Telefone</th>
          <th className='px-6 py-3 text-center text-[11px] font-semibold text-gray-500 uppercase tracking-widest w-[20%]'>Ações</th>
        </tr>
      </thead>
      <tbody>
        {clientes.map((cliente) => (
          <tr
            key={cliente.id}
            className='border-b border-gray-100 hover:bg-primary/3 transition-colors duration-100 group'
          >
            <td className='px-6 py-3.5'>
              <div className='flex items-center gap-3'>
                <div className='w-7 h-7 rounded-full bg-primary/10 flex items-center justify-center shrink-0'>
                  <span className='text-[11px] font-bold text-primary'>{cliente.nome[0].toUpperCase()}</span>
                </div>
                <p className='text-sm font-semibold text-gray-900 truncate'>{cliente.nome}</p>
              </div>
            </td>
            <td className='px-6 py-3.5'>
              <p className='text-sm text-gray-500 truncate'>
                {cliente.email || <span className='text-gray-300'>—</span>}
              </p>
            </td>
            <td className='px-6 py-3.5'>
              <p className='text-sm text-gray-500 whitespace-nowrap'>
                {cliente.telefone ? formatTelefone(cliente.telefone) : <span className='text-gray-300'>—</span>}
              </p>
            </td>
            <td className='px-6 py-3.5'>
              <div className='flex items-center justify-center gap-0.5'>
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
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  </div>
);

export default ClientTable;
