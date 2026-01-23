import { useEffect, useState, useMemo } from "react";
import { useSelector, useDispatch } from "react-redux";
import { index } from "../redux/slices/clienteSlice";

import {
  MoreVertical,
  Plus,
  Trash,
  UserPen,
} from "lucide-react";

import ConfirmDialog from "./ConfirmDialog";
import EditClientPopup from "./EditClientPopup";
import Pagination from "./Pagination";

const headers = ['Nome', 'Email', 'Telefone'];

const ClientList = () => {
  const dispatch = useDispatch();
  const { clientes, loading, error, pagination } = useSelector((state) => state.cliente);
  const { user } = useSelector((state) => state.user);
  const [search, setSearch] = useState("");

  const itemsPerPage = 15;

  // Carrega apenas uma vez ao montar
    useEffect(() => {
      if (user?.empresa?.id) {
        dispatch(index({ 
          empresa_id: user.empresa.id,
          page: 1,
          maxItems: itemsPerPage,
          pesquisa: ""
        }));
      }
    }, [dispatch, user?.empresa?.id]);

    // Separa o efeito da busca
    useEffect(() => {
      if (!search) return;
      
      const timer = setTimeout(() => {
        if (user?.empresa?.id) {
          dispatch(index({ 
            empresa_id: user.empresa.id,
            page: 1,
            maxItems: itemsPerPage,
            pesquisa: search
          }));
        }
      }, 500);

      return () => clearTimeout(timer);
    }, [search]);

  const handlePageChange = (page) => {
    dispatch(index({ 
      empresa_id: user.empresa.id,
      page,
      maxItems: itemsPerPage,
      pesquisa: search
    }));
  };

  const [openMenuId, setOpenMenuId] = useState(null);
  const [selectedId, setSelectedId] = useState(null);
  const [selectedClient, setSelectedClient] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [showDeletePopup, setShowDeletePopup] = useState(false);
  const [clientToDeleteId, setClientToDeleteId] = useState(null);

  const handleMenu = (id) => {
    setOpenMenuId(openMenuId === id ? null : id);
  };

  const handleDelete = (id) => {
    setClientToDeleteId(id);
    setShowDeletePopup(true);
  };

  const confirmDelete = () => {
    setClients((prev) => prev.filter((_, i) => i !== clientToDeleteId));
    setShowDeletePopup(false);
    setClientToDeleteId(null);
  };

  const cancelDelete = () => {
    setShowDeletePopup(false);
    setClientToDeleteId(null);
  };

  return (
    <div className='w-full flex flex-col items-center mt-10 px-2'>
      <div className='w-full max-w-5xl bg-white rounded-2xl shadow-sm overflow-hidden border border-gray-200'>
        <div className='flex flex-col gap-3 sm:gap-4 bg-linear-to-r from-primary to-accent px-4 sm:px-8 py-4 sm:py-6'>
          <h2 className='text-xl sm:text-2xl font-bold text-white tracking-wide drop-shadow text-center sm:text-left'>
            Lista de Clientes
          </h2>
          <div className='w-full flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2'>
            <div className='flex flex-1 gap-2'>
              <input
                type='text'
                className='w-full max-w-xs truncate rounded-lg border border-gray-200 px-3 sm:px-4 py-2 text-gray-700 bg-gray-50 focus:bg-white focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary transition-all duration-100 shadow-sm'
                placeholder='Buscar cliente...'
                value={search}
                onChange={(e) => setSearch(e.target.value)}
              />
              <button
                className='flex items-center gap-2 bg-white font-semibold rounded-lg px-4 py-2 shadow hover:bg-gray-100 transition-all duration-100 border border-primary focus:outline-none focus:ring-2 focus:ring-primary/30'
                onClick={() => {
                  setSelectedId(null);
                  setSelectedClient(null);
                  setIsEditing(true);
                }}
              >
                <Plus size={18} />
                <span className='hidden sm:inline'>Adicionar Cliente</span>
                <span className='sm:hidden'>Novo</span>
              </button>
            </div>
          </div>
        </div>
        {isEditing && (
          <EditClientPopup
            client={selectedClient || {}}
            onClose={() => {
              setIsEditing(false);
              setSelectedId(null);
              setSelectedClient(null);
            }}
          />
        )}
        <ConfirmDialog
          open={showDeletePopup}
          title='Remover cliente?'
          message='Tem certeza que deseja remover este cliente? Esta ação não pode ser desfeita.'
          onConfirm={confirmDelete}
          onCancel={cancelDelete}
        />
        <div className='overflow-x-auto'>
          <table className='w-full min-w-100'>
            <thead>
              <tr className='bg-gray-50'>
                <th className='py-1 px-3 sm:px-6 text-left text-base font-semibold  uppercase tracking-wider border-b border-gray-200'>
                  Nome
                </th>
                <th className='py-1 px-3 sm:px-6 text-left text-base font-semibold  uppercase tracking-wider border-b border-gray-200'>
                  Email
                </th>
                <th className='py-1 px-3 sm:px-6 text-left text-base font-semibold uppercase tracking-wider border-b border-gray-200'>
                  Telefone <span className='sr-only'>Ações</span>
                </th>
              </tr>
            </thead>
            <tbody>
              {(loading && clientes.length === 0) && (
                <tr>
                  <td
                    colSpan={3}
                    className='py-8 px-3 sm:px-6 text-center text-gray-400'
                  >
                    <div className='w-6 h-6 border-4 border-primary border-t-transparent rounded-full animate-spin m-auto'></div>
                  </td>
                </tr>
              )}
              {!loading && clientes.length === 0 ? (
                <tr>
                  <td
                    colSpan={3}
                    className='py-8 px-3 sm:px-6 text-center text-gray-400'
                  >
                    Nenhum cliente encontrado.
                  </td>
                </tr>
              ) : (
                clientes.map((cliente) => (
                  <tr
                    key={cliente.id}
                    className={`transition-colors ${
                      cliente.id % 2 === 0 ? "bg-white" : "bg-gray-50"
                    } hover:bg-primary/5`}
                  >
                    <td className="py-2 px-3 sm:px-6 text-gray-800 border-b border-gray-100">
                      {cliente.nome}
                    </td>
                    <td className="py-2 px-3 sm:px-6 text-gray-800 border-b border-gray-100">
                      {cliente.email}
                    </td>
                    <td className="py-2 px-3 sm:px-6 text-gray-800 border-b border-gray-100 flex items-center gap-2 min-w-0">
                      <span className="flex-1 truncate">
                        {cliente.telefone}
                      </span>
                      <div className="hidden sm:flex gap-1">
                        <button
                          className='rounded-md px-3 py-2 bg-gray-200 hover:bg-gray-300 text-gray-600 shadow transition-all duration-100 focus:outline-none'
                          title='Editar'
                          onClick={() => {
                            setSelectedId(cliente.id);
                            setSelectedClient(cliente);
                            setIsEditing(true);
                          }}
                        >
                          <UserPen size={18} />
                        </button>
                        <button
                          className="rounded-md px-3 py-2 bg-gray-200 hover:bg-gray-300 text-gray-600 shadow transition-all duration-100 focus:outline-none"
                          title="Remover"
                          onClick={() => handleDelete(cliente.id)}
                        >
                          <Trash size={18} />
                        </button>
                      </div>
                      <div className='relative flex sm:hidden'>
                        <button
                          className="rounded-full p-2 bg-gray-200 hover:bg-gray-300 text-gray-700 shadow transition-all duration-100"
                          onClick={() => handleMenu(cliente.id)}
                          title="Ações"
                        >
                          <MoreVertical size={18} />
                        </button>
                        {openMenuId === cliente.id && (
                          <div className="absolute z-20 right-0 mt-2 w-24 bg-white border border-gray-200 rounded-lg shadow-lg animate-fade-in">
                            <button
                              className='block w-full text-left px-3 py-2 hover:bg-primary/10 text-gray-700 rounded-t-lg'
                              onClick={() => {
                                setOpenMenuId(null);
                                setSelectedClient(cliente);
                                setIsEditing(true);
                              }}
                            >
                              Editar
                            </button>
                            <button
                              className="block w-full text-left px-3 py-2 hover:bg-red-50 text-red-600 rounded-b-lg"
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
          <Pagination
            current_page={pagination.current_page}
            lastPage={pagination.last_page}
            onPageChange={handlePageChange}
          />
        </div>
      </div>
    </div>
  );
};

export default ClientList;
