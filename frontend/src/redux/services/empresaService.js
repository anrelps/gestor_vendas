import api from "../../services/api";

export const empresaUpdate = async ({empresa_id, data}) => {
    data.append('_method', 'PUT');
    const res = await api.post(`/empresas/${empresa_id}`, data, {
        headers: {
            'Content-Type': 'multipart/form-data',
        },
    });
    return res.data;
};