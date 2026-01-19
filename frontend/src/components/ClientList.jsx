import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { index } from "../redux/slices/clienteSlice";

import {
  ChevronLeft,
  ChevronRight,
  MoreVertical,
  Plus,
  Trash,
  UserPen,
} from "lucide-react";
import { useState } from "react";
import ConfirmDialog from "./ConfirmDialog";
import EditClientPopup from "./EditClientPopup";

const headers = ["Nome", "Email", "Telefone"];

const ClientList = () => {
  const dispatch = useDispatch();
  const { clientes, loading, error } = useSelector((state) => state.cliente);
  const { user } = useSelector((state) => state.user);

  const [openMenuId, setOpenMenuId] = useState(null);
  const [search, setSearch] = useState("");
  const [clients, setClients] = useState([]);
  const [selectedId, setSelectedId] = useState(null);
  const [selectedClient, setSelectedClient] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [showDeletePopup, setShowDeletePopup] = useState(false);
  const [clientToDeleteId, setClientToDeleteId] = useState(null);

  // ✅ Faça o dispatch apenas quando user estiver disponível
  useEffect(() => {
    if (user?.empresa?.id) {
      dispatch(index({ empresa_id: user.empresa.id }));
    }
  }, [dispatch, user?.empresa?.id]);

  // ✅ Sincronize clientes do Redux com estado local
  useEffect(() => {
    if (clientes && clientes.length > 0) {
      setClients(clientes);
    }
  }, [clientes]);

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
    <div className="w-full flex flex-col items-center mt-10 px-2">
      <div className="w-full max-w-5xl bg-white rounded-2xl shadow-2xl overflow-hidden border border-gray-200">
        <div className="flex flex-col gap-3 sm:gap-4 bg-linear-to-r from-primary to-accent px-4 sm:px-8 py-4 sm:py-6">
          <h2 className="text-xl sm:text-2xl font-bold text-white tracking-wide drop-shadow text-center sm:text-left">
            Lista de Clientes
          </h2>
          <div className="w-full flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
            <div className="flex flex-1 gap-2">
              <input
                type="text"
                className="w-full max-w-xs truncate rounded-lg border border-gray-200 px-3 sm:px-4 py-2 text-gray-700 bg-gray-50 focus:bg-white focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary transition-all duration-100 shadow-sm"
                placeholder="Buscar cliente..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
              />
              <button
                className="flex items-center gap-2 bg-white font-semibold rounded-lg px-4 py-2 shadow hover:bg-gray-100 transition-all duration-100 border border-primary focus:outline-none focus:ring-2 focus:ring-primary/30"
                onClick={() => {
                  setSelectedId(null);
                  setSelectedClient(null);
                  setIsEditing(true);
                }}
              >
                <Plus size={18} />
                <span className="hidden sm:inline">Adicionar Cliente</span>
                <span className="sm:hidden">Novo</span>
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
            onSave={(updated) => {
              setClients((prev) =>
                prev.map((c, i) => (i === selectedId ? updated : c)),
              );
              setIsEditing(false);
              setSelectedId(null);
              setSelectedClient(null);
            }}
          />
        )}
        <ConfirmDialog
          open={showDeletePopup}
          title="Remover cliente?"
          message="Tem certeza que deseja remover este cliente? Esta ação não pode ser desfeita."
          onConfirm={confirmDelete}
          onCancel={cancelDelete}
        />
        <div className="overflow-x-auto">
          <table className="w-full min-w-100">
            <thead>
              <tr className="bg-gray-50">
                <th className="py-1 px-3 sm:px-6 text-left text-base font-semibold  uppercase tracking-wider border-b border-gray-200">
                  Nome
                </th>
                <th className="py-1 px-3 sm:px-6 text-left text-base font-semibold  uppercase tracking-wider border-b border-gray-200">
                  Email
                </th>
                <th className="py-1 px-3 sm:px-6 text-left text-base font-semibold uppercase tracking-wider border-b border-gray-200">
                  Telefone <span className="sr-only">Ações</span>
                </th>
              </tr>
            </thead>
            <tbody>
              {(loading && clients.length === 0) && (
                <tr>
                  <td
                    colSpan={3}
                    className="py-8 px-3 sm:px-6 text-center text-gray-400"
                  >
                    <div className='w-6 h-6 border-4 border-primary border-t-transparent rounded-full animate-spin m-auto'></div>
                  </td>
                </tr>
              )}
              {!loading && clients.length === 0 ? (
                <tr>
                  <td
                    colSpan={3}
                    className="py-8 px-3 sm:px-6 text-center text-gray-400"
                  >
                    Nenhum cliente encontrado.
                  </td>
                </tr>
              ) : (
                clients.map((client) => (
                  <tr
                    key={client.id}
                    className={`transition-colors ${
                      client.id % 2 === 0 ? "bg-white" : "bg-gray-50"
                    } hover:bg-primary/5`}
                  >
                    <td className="py-2 px-3 sm:px-6 text-gray-800 border-b border-gray-100">
                      {client.nome}
                    </td>
                    <td className="py-2 px-3 sm:px-6 text-gray-800 border-b border-gray-100">
                      {client.email}
                    </td>
                    <td className="py-2 px-3 sm:px-6 text-gray-800 border-b border-gray-100 flex items-center gap-2 min-w-0">
                      <span className="flex-1 truncate">
                        {client.telefone}
                      </span>
                      <div className="hidden sm:flex gap-1">
                        <button
                          className="rounded-md px-3 py-2 bg-gray-200 hover:bg-gray-300 text-gray-600 shadow transition-all duration-100 focus:outline-none"
                          title="Editar"
                          onClick={() => {
                            setSelectedId(client.id);
                            setSelectedClient(client);
                            setIsEditing(true);
                          }}
                        >
                          <UserPen size={18} />
                        </button>
                        <button
                          className="rounded-md px-3 py-2 bg-gray-200 hover:bg-gray-300 text-gray-600 shadow transition-all duration-100 focus:outline-none"
                          title="Remover"
                          onClick={() => handleDelete(client.id)}
                        >
                          <Trash size={18} />
                        </button>
                      </div>
                      <div className="relative flex sm:hidden">
                        <button
                          className="rounded-full p-2 bg-gray-200 hover:bg-gray-300 text-gray-700 shadow transition-all duration-100"
                          onClick={() => handleMenu(client.id)}
                          title="Ações"
                        >
                          <MoreVertical size={18} />
                        </button>
                        {openMenuId === client.id && (
                          <div className="absolute z-20 right-0 mt-2 w-24 bg-white border border-gray-200 rounded-lg shadow-lg animate-fade-in">
                            <button
                              className="block w-full text-left px-3 py-2 hover:bg-primary/10 text-gray-700 rounded-t-lg"
                              onClick={() => {
                                setOpenMenuId(null);
                                setSelectedId(client._id);
                                setSelectedClient(client);
                                setIsEditing(true);
                              }}
                            >
                              Editar
                            </button>
                            <button
                              className="block w-full text-left px-3 py-2 hover:bg-red-50 text-red-600 rounded-b-lg"
                              onClick={() => {
                                setOpenMenuId(null);
                                handleDelete(client.id);
                              }}
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
        <div className="flex flex-wrap justify-center items-center gap-2 py-6 bg-gray-50 border-t border-gray-100">
          <button className="rounded-full p-2 text-gray-500 hover:bg-primary/10 hover:text-primary transition-all duration-100">
            <ChevronLeft size={18} />
          </button>
          <button className="rounded-lg px-3 py-1 font-semibold text-primary bg-primary/10 hover:bg-primary/20 transition-all duration-100">
            1
          </button>
          <button className="rounded-lg px-3 py-1 font-semibold text-gray-700 hover:bg-primary/10 transition-all duration-100">
            2
          </button>
          <button className="rounded-lg px-3 py-1 font-semibold text-gray-700 hover:bg-primary/10 transition-all duration-100">
            3
          </button>
          <button className="rounded-full p-2 text-gray-500 hover:bg-primary/10 hover:text-primary transition-all duration-100">
            <ChevronRight size={18} />
          </button>
        </div>
      </div>
    </div>
  );
};

export default ClientList;
