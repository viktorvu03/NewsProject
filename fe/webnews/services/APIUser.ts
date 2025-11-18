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
};
export default APIUser;
