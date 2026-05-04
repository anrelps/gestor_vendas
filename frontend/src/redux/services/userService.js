import api from "../../services/api";

export const userLogin = async ({ email, password }) => {
  const res = await api.post("/login", { email, password });
  return res.data.data;
};

export const getUserData = async () => {
  const res = await api.get("/me");
  return res.data;
};

export const userUpdate = async ({user_id, data}) => {
  const res = await api.put(`/user/update/${user_id}`, data);
  return res.data;
};

export const userChangePassword = async({user_id, data}) => {
  const res = await api.put(`/user/change-password/${user_id}`, data);
  return res.data;
};

export const userLogout = async() => {
  const res = await api.get("/user/logout");
  return res.data;
};

export const userDemoLogin = async () => {
  const res = await api.post("/demo-login");
  return res.data.data;
};
