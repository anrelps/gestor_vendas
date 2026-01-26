import api from "../../services/api";

export const indexProdutos = async ({ empresa_id, page = 1, maxItems = 20, titulo = '', valor_min = '', valor_max = '' }) => {
    const params = {
        page,
        maxItems,
    };

    if(titulo) {
        params.titulo = titulo;
    }
    if(valor_min) {
        params.valor_min = valor_min;
    }
    if(valor_max) {
        params.valor_max = valor_max;
    }

    const res = await api.get(`/${empresa_id}/produtos`, {params});
    return res;
}

export const createProduto = async ({ empresa_id, data }) => {
    const res = await api.post(`/${empresa_id}/produtos`, data);
    return res;
}

export const updateProduto = async ({ empresa_id, produto_id, data }) => {
    const res = await api.put(`/${empresa_id}/produtos/${produto_id}`, data);
    return res;
}

export const destroyProduto = async ({ empresa_id, produto_id, data }) => {
    const res = await api.delete(`/${empresa_id}/produtos/${produto_id}`, data);
    return res;
}