import apiClient from "@/Lib/APICall";
import { createEvaluationRequest } from "@/types/Evaluation";

const APIEvaluations = {
  getAllEvaluataion: async () => {
    const url = "/GetCause";
    const res = await apiClient.get(url);
    return res.data;
  },
  createEvaluation: async (
    createEvaluationRequest: createEvaluationRequest
  ) => {
    const url = "/CreateCause";
    const res = await apiClient.post(url, createEvaluationRequest);
    return res.data;
  },
  getAllEvaluataionByid: async (id: number) => {
    const url = `/causes/${id}`;
    const res = await apiClient.get(url);
    return res.data;
  },
};
export { APIEvaluations };
