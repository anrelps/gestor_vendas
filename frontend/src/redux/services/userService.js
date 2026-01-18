import api from "../../services/api";

export const userLogin = async ({ email, password }) => {
  const res = await api.post("/login", { email, password });
  return res.data.data;
};

export const getUserData = async () => {
  const res = await api.get("/me");
  return res.data;
};
