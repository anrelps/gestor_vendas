import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import {
  createVenda,
  destroyVenda,
  indexVendas,
  showVenda,
  updateVenda,
} from '../services/vendaService';

export const index = createAsyncThunk(
  'venda/index',
  async ({
    empresa_id,
    page = 1,
    maxItems = 20,
    valor_min = '',
    valor_max = '',
    cliente = '',
    data_min = '',
    data_max = '',
    pendencias = '',
  }) => {
    try {
      const res = await indexVendas({
        empresa_id,
        page,
        maxItems,
        valor_min,
        valor_max,
        cliente,
        data_min,
        data_max,
        pendencias,
      });
      return res.data;
    } catch (error) {
      console.log(error);
    }
  },
);

export const show = createAsyncThunk(
  'venda/show',
  async ({ empresa_id, venda_id }) => {
    try {
      const res = await showVenda({ empresa_id, venda_id });
      return res;
    } catch (error) {
      console.log(error);
    }
  },
);

export const create = createAsyncThunk(
  'venda/create',
  async ({ empresa_id, data }) => {
    const res = await createVenda({ empresa_id, data });
    return res.data;
  },
);

export const update = createAsyncThunk(
  'venda/update',
  async ({ empresa_id, venda_id, data }) => {
    const res = await updateVenda({ empresa_id, venda_id, data });
    return res.data;
  },
);

export const destroy = createAsyncThunk(
  'venda/destroy',
  async ({ empresa_id, venda_id }) => {
    const res = await destroyVenda({ empresa_id, venda_id });
    return { venda_id };
  },
);

const vendaSlice = createSlice({
  name: 'venda',
  initialState: {
    vendas: [],
    venda: {},
    error: null,
    loading: false,
    loadingSaving: false,
    pagination: {
      current_page: 1,
      last_page: 1,
      per_page: 20,
      total: 0,
    },
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(index.pending, function (state) {
        state.loading = true;
        state.error = null;
      })
      .addCase(index.fulfilled, function (state, action) {
        state.loading = false;
        state.error = null;
        state.vendas = action.payload.data;
        state.pagination = {
          current_page: action.payload.meta.current_page,
          last_page: action.payload.meta.last_page,
          per_page: action.payload.meta.per_page,
          total: action.payload.meta.total,
        };
      })
      .addCase(index.rejected, function (state, action) {
        state.loading = false;
        state.error = action.error.message;
      })
      .addCase(show.pending, function (state) {
        state.loading = true;
        state.error = null;
      })
      .addCase(show.fulfilled, function (state, action) {
        state.loading = false;
        state.error = null;
        state.venda = action.payload.data;
      })
      .addCase(show.rejected, function (state, action) {
        state.loading = false;
        state.error = action.error.message;
      })
      .addCase(create.pending, function (state) {
        state.loadingSaving = true;
        state.error = null;
      })
      .addCase(create.fulfilled, function (state, action) {
        state.loadingSaving = false;
        state.error = null;
        state.venda = action.payload.data;
        state.vendas.unshift(action.payload.data);
        state.pagination.total += 1;
      })
      .addCase(create.rejected, function (state, action) {
        state.loadingSaving = false;
        state.error = action.error.message;
      })
      .addCase(update.pending, function (state) {
        state.loadingSaving = true;
        state.error = null;
      })
      .addCase(update.fulfilled, function (state, action) {
        state.loadingSaving = false;
        state.error = null;
        state.venda = action.payload.data;
        const index = state.vendas.findIndex(
          (v) => v.id === action.payload.data.id,
        );
        if (index !== -1) {
          state.vendas[index] = action.payload.data;
        }
      })
      .addCase(update.rejected, function (state, action) {
        state.loadingSaving = false;
        state.error = action.error.message;
      })
      .addCase(destroy.pending, function (state) {
        state.loadingSaving = true;
        state.error = null;
      })
      .addCase(destroy.fulfilled, function (state, action) {
        state.loadingSaving = false;
        state.error = null;
        state.vendas = state.vendas.filter(
          (v) => v.id !== action.payload.venda_id,
        );
      })
      .addCase(destroy.rejected, function (state, action) {
        state.loadingSaving = false;
        state.error = action.error.message;
      });
  },
});

export default vendaSlice.reducer;
