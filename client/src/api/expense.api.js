import { api } from "./axios";

export const getExpensesApi = (params) =>
  api.get("/expenses", { params });

export const deleteExpenseApi = (id) =>
  api.delete(`/expenses/${id}`);

export const deleteExpensesApi = (ids) =>
  api.delete("/expenses/bulk", {
    data: { ids },
  });

export const getExpenseStatsApi = () =>
  api.get("/expenses/stats");

export const getExpenseAiAnalysisApi = () =>
  api.get("/expenses/ai-analysis");