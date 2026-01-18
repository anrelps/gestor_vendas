import api from "../../services/api";

export const userLogin = async ({ email, password }) => {
  const res = await api.post("/login", { email, password });
  return res.data.data;
};
