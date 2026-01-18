import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { userLogin } from "../services/userService";

export const login = createAsyncThunk(
  "user/login",
  async ({ email, password }) => {
    const res = await userLogin({ email, password });
    return res;
  },
);

const userSlice = createSlice({
  name: "user",
  initialState: {
    user: null,
    token: localStorage.getItem("token") ?? null,
    loading: false,
    error: null,
    isAuthenticated: false,
  },
  reducers: {
    logout: (state) => {
      state.token = null;
      state.isAuthenticated = false;
      state.user = null;
      state.error = null;
      localStorage.removeItem("token");
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(login.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(login.fulfilled, (state, action) => {
        state.loading = false;
        state.error = null;
        state.user = action.payload.user;
        state.isAuthenticated = true;
        state.token = action.payload.token;
        localStorage.setItem("token", action.payload.token);
      })
      .addCase(login.rejected, (state, action) => {
        state.loading = false;
        state.user = null;
        state.isAuthenticated = false;
        state.token = null;
        state.error = action.error.message;
        localStorage.removeItem("token");
      });
  },
});

export const { logout } = userSlice.actions;
export default userSlice.reducer;
