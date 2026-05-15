import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { getUserData, userLogin, userUpdate, userLogout, userChangePassword, userDemoLogin } from '../services/userService';
export const login = createAsyncThunk(
  'user/login',
  async ({ email, password }) => {
    const res = await userLogin({ email, password });
    return res;
  },
);

export const checkAuth = createAsyncThunk('user/checkAuth', async () => {
  const res = await getUserData();
  return res;
});

export const updateUser = createAsyncThunk('user/update', async ({user_id, data}) => {
  const res = await userUpdate({user_id, data});
  return res;
});

export const changePassword = createAsyncThunk('user/changePassword', async ({user_id, data}) => {
  const res = await userChangePassword({user_id, data});
  return res;
})

export const demoLogin = createAsyncThunk('user/demoLogin', async () => {
  const res = await userDemoLogin();
  return res;
});

export const logoutUser = createAsyncThunk(
  'user/logout',
  async() => {
    const res = await userLogout();
    return res;
  }
)

const userSlice = createSlice({
  name: 'user',
  initialState: {
    user: null,
    token: localStorage.getItem('token') ?? null,
    loading: false,
    error: null,
    isAuthenticated: false,
    authChecked: false,
  },
  reducers: {
    logout: (state) => { // Deprecated (removido por questões de segurança)
      state.token = null;
      state.isAuthenticated = false;
      state.authChecked = true;
      state.user = null;
      state.error = null;
      localStorage.removeItem('token');
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(demoLogin.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(demoLogin.fulfilled, (state, action) => {
        state.loading = false;
        state.error = null;
        state.user = action.payload.user;
        state.isAuthenticated = true;
        state.authChecked = true;
        state.token = action.payload.token;
        localStorage.setItem('token', action.payload.token);
      })
      .addCase(demoLogin.rejected, (state, action) => {
        state.loading = false;
        state.isAuthenticated = false;
        state.authChecked = true;
        state.token = null;
        state.error = action.error.message;
        localStorage.removeItem('token');
      })
      .addCase(login.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(login.fulfilled, (state, action) => {
        state.loading = false;
        state.error = null;
        state.user = action.payload.user;
        state.isAuthenticated = true;
        state.authChecked = true;
        state.token = action.payload.token;
        localStorage.setItem('token', action.payload.token);
      })
      .addCase(login.rejected, (state, action) => {
        state.loading = false;
        state.user = null;
        state.isAuthenticated = false;
        state.authChecked = true;
        state.token = null;
        state.error = action.error.message;
        localStorage.removeItem('token');
      })
      .addCase(logoutUser.pending, (state) => {
        state.error = null;
        state.loading = true;
      })
      .addCase(logoutUser.fulfilled, (state, action) => {
        state.error = null;
        state.loading = false;
        state.user = null;
        state.isAuthenticated = false;
        state.authChecked = true;
        state.token = null;
        localStorage.removeItem('token');
      })
      .addCase(logoutUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      .addCase(checkAuth.pending, (state) => {
        state.loading = true;
      })
      .addCase(checkAuth.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload.data;
        state.isAuthenticated = true;
        state.authChecked = true;
      })
      .addCase(checkAuth.rejected, (state) => {
        state.loading = false;
        state.user = null;
        state.isAuthenticated = false;
        state.authChecked = true;
        state.token = null;
        localStorage.removeItem('token');
      })
      .addCase(updateUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updateUser.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload.data;
      })
      .addCase(updateUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      .addCase(changePassword.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(changePassword.fulfilled, (state) => {
        state.loading = false;
      })
      .addCase(changePassword.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
  },
});

export const { logout } = userSlice.actions;
export const selectAuthUserDisplayName = (state) => {
  const user = state.user.user;
  return user?.name || user?.nome || 'Usuário';
};

export const selectCompanyName = (state) => {
  return state.empresa?.nome || state.user.user?.empresa?.nome || 'Empresa';;
};

export default userSlice.reducer;
