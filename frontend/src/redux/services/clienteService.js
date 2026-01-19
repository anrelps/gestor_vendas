import api from "../../services/api";

export const indexClientes = async ({ empresa_id }) => {
  const res = await api.get(`/${empresa_id}/clientes`);
  console.log('service', res.data);
  return res.data;
};
export const createCliente = async () => {};
export const deleteCliente = async () => {};
export const updateCliente = async () => {};
