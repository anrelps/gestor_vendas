import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { indexClientes, createCliente, updateCliente, destroyCliente } from "../services/clienteService";

export const index = createAsyncThunk(
  "cliente/index",
  async ({ empresa_id, page = 1, maxItems = 20, pesquisa = '' }) => {
    const res = await indexClientes({empresa_id, page, maxItems, pesquisa});
    return res;
  },
);

export const create = createAsyncThunk(
  "cliente/create",
  async({ empresa_id, data }) => {
    const res = await createCliente({empresa_id, data});
    return res;
  }
);

export const update = createAsyncThunk(
  "cliente/update",
  async({ empresa_id, cliente_id, data }) => {
    const res = await updateCliente({empresa_id, cliente_id, data});
    return res;
  }
);

export const destroy = createAsyncThunk(
  "cliente/delete",
  async({ empresa_id, cliente_id }) => {
    await destroyCliente({ empresa_id, cliente_id });
    return { cliente_id };
  }
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
      })
      .addCase(create.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(create.fulfilled, (state, action) => {
        state.loading = false;
        state.error = null;
        state.cliente = action.payload.data;
        state.clientes.unshift(action.payload.data);
        state.pagination.total += 1;
      })
      .addCase(create.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      .addCase(update.pending, function(state) {
        state.loading = true;
        state.error = null;
      })
      .addCase(update.fulfilled, function(state, action) {
        state.loading = false;
        state.error = null;
        state.cliente = action.payload.data;
        const index = state.clientes.findIndex(c => c.id === action.payload.data.id);
        if(index !== - 1) {
          state.clientes[index] = action.payload.data;
        }
      })
      .addCase(update.rejected, function(state, action) {
        state.loading = false;
        state.error = action.error.message;
      })
      .addCase(destroy.pending, function(state) {
        state.loading = true;
        state.error = null;
      })
      .addCase(destroy.fulfilled, function(state, action) {
        state.loading = false;
        state.error = null;
        state.clientes = state.clientes.filter((c) => c.id !== action.payload.cliente_id)
      })
      .addCase(destroy.rejected, function(state, action) {
        state.loading = false;
        state.error = action.error.message;
      });
  },
});

export default clienteSlice.reducer;
