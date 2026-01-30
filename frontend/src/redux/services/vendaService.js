import api from "../../services/api";

export const indexVendas = async ({ empresa_id, page = 1, maxItems = 20, valor_min = '', valor_max = '', cliente = '', data_min = '', data_max = '', pendencias = '' }) => {
    const params = {
        page,
        maxItems,
    };

    if(valor_min) {
        params.valor_min = valor_min;
    }
    if(valor_max) {
        params.valor_max = valor_max;
    }
    if(cliente) {
        params.cliente = cliente;
    }
    if(data_min) {
        params.data_min = data_min;
    }
    if(data_max) {
        params.data_max = data_max;
    }
    if(pendencias) {
        params.pendencias = pendencias;
    }

    const res = await api.get(`/${empresa_id}/vendas`, {params});
    return res;
}

export const showVenda = async({empresa_id, venda_id}) => {
    const res = await api.get(`/${empresa_id}/vendas/${venda_id}`);
    return res.data;
}

export const createVenda = async ({empresa_id, data}) => {
    const res = await api.post(`/${empresa_id}/vendas`, data);
    return res;
}

export const updateVenda = async ({empresa_id, venda_id, data}) => {
    const res = await api.put(`/${empresa_id}/vendas/${venda_id}`, data);
    return res;
}

export const destroyVenda = async ({empresa_id, venda_id}) => {
    const res = await api.delete(`/${empresa_id}/vendas/${venda_id}`);
    return res;
}