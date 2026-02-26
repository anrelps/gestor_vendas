import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { empresaUpdate } from "../services/empresaService";

export const updateEmpresa = createAsyncThunk(
    'empresa/update',
    async ({empresa_id, data}) => {
        const res = await empresaUpdate({empresa_id, data});
        return res; 
    }
);

const empresaSlice = createSlice({
    name: 'empresa',
    initialState: {
        empresas: {},
        empresa: null,
        loading: false,
        error: null,
    },
    reducers: {},
    extraReducers: (builder) => {
        builder.
            addCase(updateEmpresa.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(updateEmpresa.fulfilled, (state, action) => {
                state.loading = false;
                state.empresa = action.payload.data;
                state.error = null;
                console.log(state.empresa);
            })
            .addCase(updateEmpresa.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message;
            });
    }
});

export default empresaSlice.reducer;