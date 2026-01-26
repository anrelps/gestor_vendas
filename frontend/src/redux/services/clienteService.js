import api from "../../services/api";

export const indexClientes = async ({ empresa_id, page = 1, maxItems = 20, pesquisa = '' }) => {
  const params = {
    page,
    maxItems,
  }

  if(pesquisa) {
    params.pesquisa = pesquisa;
  }

  const res = await api.get(`/${empresa_id}/clientes`, { params });
  return res.data;
};
export const createCliente = async ({ empresa_id, data }) => {
  const res = await api.post(`/${empresa_id}/clientes`, data);
  return res.data;
};
export const updateCliente = async ({ empresa_id, cliente_id, data }) => {
  const res = await api.put(`/${empresa_id}/clientes/${cliente_id}`, data);
  return res.data;
};
export const destroyCliente = async ({empresa_id, cliente_id}) => {
  const res = await api.delete(`/${empresa_id}/clientes/${cliente_id}`);
  return res.data;
};