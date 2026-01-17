import { useState } from 'react';
import EditClientPopup from './EditClientPopup';

const headers = ['Nome', 'Email', 'Telefone'];
const initialClients = [
    { Nome: 'João', Email: 'joao@email.com', Telefone: '9999-9999' },
    { Nome: 'Maria', Email: 'maria@email.com', Telefone: '8888-8888' },
    { Nome: 'Pedro', Email: 'pedro@email.com', Telefone: '7777-7777' },
    { Nome: 'Ana', Email: 'ana@email.com', Telefone: '6666-6666' },
    { Nome: 'Carlos', Email: 'carlos@email.com', Telefone: '5555-5555' },
    { Nome: 'Fernanda', Email: 'fernanda@email.com', Telefone: '4444-4444' },
];

const ClientList = () => {
    const [openMenuIdx, setOpenMenuIdx] = useState(null);
    const [search, setSearch] = useState('');
    const [clients, setClients] = useState(initialClients);
    const [selectedIdx, setSelectedIdx] = useState(null);
    const [selectedClient, setSelectedClient] = useState(null);
    const [isEditing, setIsEditing] = useState(false);

    const handleMenu = (idx) => {
        setOpenMenuIdx(openMenuIdx === idx ? null : idx);
    };

    const filteredClients = clients
        .map((c, i) => ({ ...c, _idx: i }))
        .filter((client) =>
            Object.values(client)
                .join(' ')
                .toLowerCase()
                .includes(search.toLowerCase()),
        );

    return (
        <div className='w-full flex flex-col items-center mt-10 px-2'>
            <div className='w-full max-w-5xl bg-white rounded-2xl shadow-2xl overflow-hidden border border-gray-200'>
                <div className='flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 sm:gap-4 bg-linear-to-r from-primary to-accent px-4 sm:px-8 py-4 sm:py-6'>
                    <h2 className='text-xl sm:text-2xl font-bold text-white tracking-wide drop-shadow text-center sm:text-left'>
                        Lista de Clientes
                    </h2>
                    <div className='w-full sm:w-auto flex justify-center sm:justify-end'>
                        <input
                            type='text'
                            className='w-full max-w-xs truncate rounded-lg border border-gray-200 px-3 sm:px-4 py-2 text-gray-700 bg-gray-50 focus:bg-white focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary transition-all duration-100 shadow-sm'
                            placeholder='Buscar cliente...'
                            value={search}
                            onChange={(e) => setSearch(e.target.value)}
                        />
                    </div>
                </div>
                {isEditing && (
                    <EditClientPopup
                        client={selectedClient || {}}
                        onClose={() => {
                            setIsEditing(false);
                            setSelectedIdx(null);
                            setSelectedClient(null);
                        }}
                        onSave={(updated) => {
                            setClients((prev) =>
                                prev.map((c, i) =>
                                    i === selectedIdx ? updated : c,
                                ),
                            );
                            setIsEditing(false);
                            setSelectedIdx(null);
                            setSelectedClient(null);
                        }}
                    />
                )}
                <div className='overflow-x-auto'>
                    <table className='w-full min-w-100'>
                        <thead>
                            <tr>
                                <th className='py-2 px-3 sm:px-6 text-left text-base font-semibold text-gray-700 bg-gray-50 uppercase tracking-wider border-b border-gray-200 rounded-tl-2xl'>
                                    Nome
                                </th>
                                <th className='py-2 px-3 sm:px-6 text-left text-base font-semibold text-gray-700 bg-gray-50 uppercase tracking-wider border-b border-gray-200'>
                                    Email
                                </th>
                                <th className='py-2 px-3 sm:px-6 text-left text-base font-semibold text-gray-700 bg-gray-50 uppercase tracking-wider border-b border-gray-200 rounded-tr-2xl'>
                                    Telefone{' '}
                                    <span className='sr-only'>e Ações</span>
                                </th>
                            </tr>
                        </thead>
                        <tbody>
                            {filteredClients.length === 0 ? (
                                <tr>
                                    <td
                                        colSpan={3}
                                        className='py-8 px-3 sm:px-6 text-center text-gray-400'
                                    >
                                        Nenhum cliente encontrado.
                                    </td>
                                </tr>
                            ) : (
                                filteredClients.map((client) => (
                                    <tr
                                        key={client._idx}
                                        className={`transition-colors ${
                                            client._idx % 2 === 0
                                                ? 'bg-white'
                                                : 'bg-gray-50'
                                        } hover:bg-primary/5`}
                                    >
                                        {/* Nome */}
                                        <td className='py-4 px-3 sm:px-6 text-gray-800 border-b border-gray-100'>
                                            {client['Nome']}
                                        </td>
                                        {/* Email */}
                                        <td className='py-4 px-3 sm:px-6 text-gray-800 border-b border-gray-100'>
                                            {client['Email']}
                                        </td>
                                        {/* Telefone + Ações juntos */}
                                        <td className='py-4 px-3 sm:px-6 text-gray-800 border-b border-gray-100 flex items-center gap-2 min-w-0'>
                                            <span className='flex-1 truncate'>
                                                {client['Telefone']}
                                            </span>
                                            {/* Desktop: mostrar botões normais */}
                                            <div className='hidden sm:flex gap-1'>
                                                <button
                                                    className='rounded-md px-3 py-2 bg-gray-200 hover:bg-gray-300 text-gray-600 shadow transition-all duration-100 focus:outline-none'
                                                    title='Editar'
                                                    onClick={() => {
                                                        setSelectedIdx(
                                                            client._idx,
                                                        );
                                                        setSelectedClient(
                                                            client,
                                                        );
                                                        setIsEditing(true);
                                                    }}
                                                >
                                                    <i className='fa fa-edit'></i>
                                                </button>
                                                <button
                                                    className='rounded-md px-3 py-2 bg-gray-200 hover:bg-gray-300 text-gray-600 shadow transition-all duration-100 focus:outline-none'
                                                    title='Remover'
                                                >
                                                    <i className='fa fa-trash'></i>
                                                </button>
                                            </div>
                                            {/* Mobile: mostrar menu de 3 pontinhos */}
                                            <div className='relative flex sm:hidden'>
                                                <button
                                                    className='rounded-full p-2 bg-gray-200 hover:bg-gray-300 text-gray-700 shadow transition-all duration-100'
                                                    onClick={() =>
                                                        handleMenu(client._idx)
                                                    }
                                                    title='Ações'
                                                >
                                                    <i className='fa fa-ellipsis-v'></i>
                                                </button>
                                                {openMenuIdx ===
                                                    client._idx && (
                                                    <div className='absolute z-20 right-0 mt-2 w-24 bg-white border border-gray-200 rounded-lg shadow-lg animate-fade-in'>
                                                        <button
                                                            className='block w-full text-left px-3 py-2 hover:bg-primary/10 text-gray-700 rounded-t-lg'
                                                            onClick={() => {
                                                                setOpenMenuIdx(
                                                                    null,
                                                                );
                                                                setSelectedIdx(
                                                                    client._idx,
                                                                );
                                                                setSelectedClient(
                                                                    client,
                                                                );
                                                                setIsEditing(
                                                                    true,
                                                                );
                                                            }}
                                                        >
                                                            Editar
                                                        </button>
                                                        <button
                                                            className='block w-full text-left px-3 py-2 hover:bg-red-50 text-red-600 rounded-b-lg'
                                                            onClick={() =>
                                                                setOpenMenuIdx(
                                                                    null,
                                                                )
                                                            }
                                                        >
                                                            Remover
                                                        </button>
                                                    </div>
                                                )}
                                            </div>
                                        </td>
                                    </tr>
                                ))
                            )}
                        </tbody>
                    </table>
                </div>
                {/* Paginação */}
                <div className='flex flex-wrap justify-center items-center gap-2 py-6 bg-gray-50 border-t border-gray-100'>
                    <button className='rounded-full p-2 text-gray-500 hover:bg-primary/10 hover:text-primary transition-all duration-100'>
                        <i className='fa fa-chevron-left'></i>
                    </button>
                    <button className='rounded-lg px-3 py-1 font-semibold text-primary bg-primary/10 hover:bg-primary/20 transition-all duration-100'>
                        1
                    </button>
                    <button className='rounded-lg px-3 py-1 font-semibold text-gray-700 hover:bg-primary/10 transition-all duration-100'>
                        2
                    </button>
                    <button className='rounded-lg px-3 py-1 font-semibold text-gray-700 hover:bg-primary/10 transition-all duration-100'>
                        3
                    </button>
                    <button className='rounded-full p-2 text-gray-500 hover:bg-primary/10 hover:text-primary transition-all duration-100'>
                        <i className='fa fa-chevron-right'></i>
                    </button>
                </div>
            </div>
        </div>
    );
};

export default ClientList;
