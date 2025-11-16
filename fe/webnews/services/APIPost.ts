import apiClient from "@/Lib/APICall";

const APIPost = {
  getAllPost: () => {
    return apiClient.get("");
  },
};
export { APIPost };
