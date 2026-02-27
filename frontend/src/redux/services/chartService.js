import api from "../../services/api";

export const fetchLucroSemanal = async () => {
    const res = await api.get('/charts/lucro-semanal');
    return res.data;
}

export const fetchResumoFinanceiro = async () => {
    const res = await api.get('/charts/resumo-financeiro');
    return res.data;
}

export const fetchResumoMes = async () => {
    const res = await api.get('/charts/resumo-mes');
    return res.data;
}