import api from "../../services/api";

export const indexPagamentos = async({empresa_id, page = 1, cliente_id = null, data_inicio = null, data_fim = null}) => {
    const params = {
        page,
    }

    if(cliente_id) {
        params.cliente_id = cliente_id;
    }
    if(data_inicio) {
        params.data_inicio = data_inicio;
    }
    if(data_fim) {
        params.data_fim = data_fim;
    }

    const res = await api.get(`/${empresa_id}/pagamentos/`, {params});
    console.log('Res Service: ', res);
    return res;
}