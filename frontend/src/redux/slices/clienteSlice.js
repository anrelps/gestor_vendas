import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { indexClientes } from "../services/clienteService";

export const index = createAsyncThunk(
  "cliente/index",
  async ({ empresa_id, page = 1, maxItems = 20, pesquisa = '' }) => {
    const res = await indexClientes({empresa_id, page, maxItems, pesquisa});
    return res;
  },
);

const clienteSlice = createSlice({
  name: "cliente",
  initialState: {
    clientes: [],
    cliente: {},
    pagination: {
      current_page: 1,
      last_page: 1,
      per_page: 20,
      total: 0
    },
    error: null,
    loading: false,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(index.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(index.fulfilled, (state, action) => {
        state.loading = false;
        state.error = null;
        state.clientes = action.payload.data;
        state.pagination = {
          current_page: action.payload.meta.current_page,
          last_page: action.payload.meta.last_page,
          per_page: action.payload.meta.per_page,
          total: action.payload.meta.total
        };
      })
      .addCase(index.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });
  },
});

export default clienteSlice.reducer;
