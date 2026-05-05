import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { indexPagamentos } from "../services/registroPagamentoService";

export const pagamentosIndex = createAsyncThunk(
    'pagamentos/index',
    async({empresa_id, page = 1, cliente_id = null, data_inicio = null, data_fim = null}) => {
        const res = await indexPagamentos({empresa_id, page, cliente_id, data_inicio, data_fim});
        return res.data;
    }
)

const registroPagamentoSlice = createSlice({
    name: 'pagamento',
    initialState: {
        pagamentos: [],
        loading: false,
        error: null,
        pagination: {
            current_page: 1,
            last_page: 1,
            per_page: 20,
            total: 0,
        }
    },
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(pagamentosIndex.pending, function(state) {
                state.loading = true;
                state.error = null;
            })
            .addCase(pagamentosIndex.fulfilled, function(state, action) {
                state.loading = false;
                state.error = null;
                state.pagamentos = action.payload.data;
                state.pagination = {
                    current_page: action.payload.meta.current_page,
                    last_page: action.payload.meta.last_page,
                    per_page: action.payload.meta.per_page,
                    total: action.payload.meta.total,
                };
            })
            .addCase(pagamentosIndex.rejected, function(state, action) {
                state.loading = false;
                state.error = action.error.message;
            });
    }
});

export default registroPagamentoSlice.reducer;