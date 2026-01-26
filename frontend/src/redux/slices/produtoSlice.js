import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { indexProdutos, createProduto, updateProduto, destroyProduto } from "../services/produtoService";

export const index = createAsyncThunk(
    'produto/index',
    async({empresa_id, page = 1, maxItems = 20, titulo = '', valor_min = '', valor_max = ''}) => {
        const res = await indexProdutos({empresa_id, page, maxItems, titulo, valor_min, valor_max});
        return res.data;
    },
);
export const create = createAsyncThunk(
    'produto/create',
    async({empresa_id, data}) => {
        const res = await createProduto({empresa_id, data})
        return res.data;
    },
);
export const update = createAsyncThunk(
    'produto/update',
    async({empresa_id, produto_id, data}) => {
        const res = await updateProduto({empresa_id, produto_id, data});
        return res.data;
    },
);
export const destroy = createAsyncThunk(
    'produto/destroy',
    async({empresa_id, produto_id}) => {
        const res = await destroyProduto({empresa_id, produto_id});
        return { produto_id };
    },
);

const produtoSlice = createSlice({
    name: 'produto',
    initialState: {
        produtos: [],
        produto: {},
        error: null,
        loading: false,
        pagination: {
            current_page: 1,
            last_page: 1,
            per_page: 20,
            total: 0
        }
    },
    reducers: {},
    extraReducers: (builder) => {
        builder.
            addCase(index.pending, function(state) {
                state.loading = true;
                state.error = null;
            }).
            addCase(index.fulfilled, function(state, action) {
                state.loading = false;
                state.error = null;
                state.produtos = action.payload.data;
                state.pagination = {
                    current_page: action.payload.meta.current_page,
                    last_page: action.payload.meta.last_page,
                    per_page: action.payload.meta.per_page,
                    total: action.payload.meta.total
                };
            }).
            addCase(index.rejected, function(state, action) {
                state.loading = false;
                state.error = action.error.message;
            }).
            addCase(create.pending, function(state) {
                state.loading = true;
                state.error = null;
            }).
            addCase(create.fulfilled, function(state, action) {
                state.loading = false;
                state.error = null;
                state.produto = action.payload.data;
                state.produtos.unshift(action.payload.data);
                state.pagination.total += 1;
            }).
            addCase(create.rejected, function(state, action) {
                state.loading = false;
                state.error = action.error.message;
            }).
            addCase(update.pending, function(state) {
                state.loading = true;
                state.error = null;
            }).
            addCase(update.fulfilled, function(state, action) {
                state.loading = false;
                state.error = null;
                state.produto = action.payload.data;
                const index = state.produtos.findIndex(p => p.id === action.payload.data.id);
                if(index !== -1) {
                    state.produtos[index] = action.payload.data;
                }
            }).
            addCase(update.rejected, function(state, action) {
                state.loading = false;
                state.error = action.error.message;
            }).
            addCase(destroy.pending, function(state) {
                state.loading = true;
                state.error = null;
            }).
            addCase(destroy.fulfilled, function(state, action) {
                state.loading = false;
                state.error = null;
                state.produtos = state.produtos.filter((p) => p.id !== action.payload.produto_id);
            }).
            addCase(destroy.rejected, function(state, action) {
                state.loading = false;
                state.error = action.error.message;
            });
    }
});

export default produtoSlice.reducer;