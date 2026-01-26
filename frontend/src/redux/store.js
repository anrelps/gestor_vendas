import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./slices/userSlice";
import clienteReducer from "./slices/clienteSlice";
import produtoReducer from "./slices/produtoSlice";

export const store = configureStore({
  reducer: {
    user: userReducer,
    cliente: clienteReducer,
    produto: produtoReducer,
  },
});
