import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { fetchLucroSemanal, fetchResumoFinanceiro, fetchResumoMes } from "../services/chartService";

export const getLucroSemanal = createAsyncThunk(
    'chart/getLucroSemanal',
    async () => {
        const res = await fetchLucroSemanal();
        return res;
    }
);

export const getResumoFinanceiro = createAsyncThunk(
    'chart/getResumoFinanceiro',
    async () => {
        const res = await fetchResumoFinanceiro();
        return res;
    }
);

export const getResumoMes = createAsyncThunk(
    'chart/getResumoMes',
    async () => {
        const res = await fetchResumoMes();
        return res;
    }
);

const chartSlice = createSlice({
    name: 'chart',
    initialState: {
        lucroSemanal: {
            Seg: 0,
            Ter: 0,
            Qua: 0,
            Qui: 0,
            Sex: 0,
            Sab: 0,
            Dom: 0,
        },
        resumoFinanceiro: {
            total: 0,
            pago: 0,
            pendente: 0,
        },
        resumoMes: {
            atual: 0,
            anterior: 0
        },
        loading: false,
        error: null
    },
    extraReducers: (builder) => {
        builder
            .addCase(getLucroSemanal.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(getLucroSemanal.fulfilled, (state, action) => {
                state.loading = false;
                state.lucroSemanal = action.payload.data;
            })
            .addCase(getLucroSemanal.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message;
            })
            .addCase(getResumoFinanceiro.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(getResumoFinanceiro.fulfilled, (state, action) => {
                state.loading = false;
                state.resumoFinanceiro = action.payload.data;
            })
            .addCase(getResumoFinanceiro.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message;
            })
            .addCase(getResumoMes.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(getResumoMes.fulfilled, (state, action) => {
                state.loading = false;
                state.resumoMes = action.payload.data;
            })
            .addCase(getResumoMes.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message;
            });
    }
});

export default chartSlice.reducer;