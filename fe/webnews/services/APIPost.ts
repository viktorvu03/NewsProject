import apiClient from "@/Lib/APICall";

const APIPost = {
  /// api get tất cả các bài báo - return parsed JSON
  getAllPost: async () => {
    const url = "/GetProgram";
    const res = await apiClient.get(url);
    return res.data;
  },
};
export { APIPost };
