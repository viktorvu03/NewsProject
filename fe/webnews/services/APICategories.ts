import apiClient from "@/Lib/APICall";

const APICategories = {
  /**
   * Return parsed JSON (array) or throw on error.
   * Callers can `await APICategories.getAllCategories()` and receive data directly.
   */
  getAllCategories: async () => {
    const url = "/GetCategory";
    const res = await apiClient.get(url);
    return res.data;
  },
};
export { APICategories };
