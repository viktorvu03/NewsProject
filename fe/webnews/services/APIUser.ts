import apiClient from "@/Lib/APICall";
import { UserLoginReuest, UserRegisReuest } from "@/types/User";

const APIUser = {
  login: async (userLogin: UserLoginReuest) => {
    const url = "api/User/Login";
    const res = await apiClient.post(url, userLogin);
    return res.data;
  },
  register: async (userRegis: UserRegisReuest) => {
    const url = "api/User/CreateUser";
    const res = await apiClient.post(url, userRegis);
    return res.data;
  },
  getAllUser: async () => {
    const url = "api/User";
    const res = await apiClient.get(url);
    return res.data;
  },
  delete: async (id: number) => {
    const url = `api/User/${id}`;
    const res = await apiClient.delete(url);
    return res.data;
  },
  createUser: async (userRegis: UserRegisReuest) => {
    const url = `api/User/CreateUserorAdmin`;
    const res = await apiClient.post(url, userRegis);
    return res.data;
  },
  updateUser: async (userRegis: UserRegisReuest) => {
    const url = `api/User/UpdateUser`;
    const res = await apiClient.post(url, userRegis);
    return res.data;
  },
};
export default APIUser;
