import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { indexClientes } from "../services/clienteService";

export const index = createAsyncThunk(
  "cliente/index",
  async ({ empresa_id }) => {
    const res = await indexClientes({empresa_id});
    console.log('slice', empresa_id, res);
    return res;
  },
);

const clienteSlice = createSlice({
  name: "cliente",
  initialState: {
    clientes: [],
    cliente: {},
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
        console.log("userSlice", action.payload.data);
      })
      .addCase(index.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });
  },
});

export default clienteSlice.reducer;
