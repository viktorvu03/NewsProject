import apiClient from "@/Lib/APICall";

const APIUser = {
  login: () => {
    return apiClient.get("");
  },
};
export default APIUser;
