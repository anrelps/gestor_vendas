import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./slices/userSlice";
import clienteReducer from "./slices/clienteSlice";

export const store = configureStore({
  reducer: {
    user: userReducer,
    cliente: clienteReducer,
  },
});
