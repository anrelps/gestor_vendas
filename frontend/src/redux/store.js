import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./slices/userSlice";
import clienteReducer from "./slices/clienteSlice";
import produtoReducer from "./slices/produtoSlice";
import vendaSlicer from "./slices/vendaSlice";
import empresaReducer from "./slices/empresaSlice";
import chartReducer from "./slices/chartSlice";
import registroPagamentoReducer from "./slices/registroPagamentoSlice";

export const store = configureStore({
  reducer: {
    user: userReducer,
    cliente: clienteReducer,
    produto: produtoReducer,
    venda: vendaSlicer,
    empresa: empresaReducer,
    chart: chartReducer,
    pagamento: registroPagamentoReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: ['empresa/update/pending', 'empresa/update/fulfilled', 'empresa/update/rejected'],
        ignoredActionPaths: ['meta.arg.data'],
      },
    }),
});
