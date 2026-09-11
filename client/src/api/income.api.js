import { api } from "./axios";

export const getIncomeApi = (params) =>
  api.get("/income", { params });

export const createIncomeApi = (data) =>
  api.post("/income", data);

export const deleteIncomeApi = (id) =>
  api.delete(`/income/${id}`);

export const deleteIncomeBulkApi = (ids) =>
  api.delete("/income/bulk", {
    data: { ids },
  });

export const getIncomeStatsApi = () =>
  api.get("/income/stats");

export const getIncomeAiAnalysisApi = () =>
  api.get("/income/ai-analysis");