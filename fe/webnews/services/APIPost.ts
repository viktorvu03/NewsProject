import apiClient from "@/Lib/APICall";
import { Post } from "@/types/Post";

const APIPost = {
  /// api get tất cả các bài báo - return parsed JSON
  getAllPost: async () => {
    const url = "/GetProgram";
    const res = await apiClient.get(url);
    return res.data;
  },
  creatPost: async (post: Post) => {
    const url = "/CreatePrograms";
    const res = await apiClient.post(url, post);
    return res.data;
  },
  updatePost: async (post: Post) => {
    const url = "/UpdateProgram";
    const res = await apiClient.post(url, post);
    return res.data;
  },
  deletePost: async (id: number) => {
    const url = `/program/${id}`;
    const res = await apiClient.delete(url);
    return res.data;
  },
};
export { APIPost };
