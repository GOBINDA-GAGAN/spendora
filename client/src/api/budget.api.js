import { api } from "./axios";

/* Get all category budgets */
export const getBudgetsApi = (params) =>
  api.get("/budgets", { params });

/* Create category budget */
export const createBudgetApi = (data) =>
  api.post("/budgets", data);

/* Update category budget */
export const updateBudgetApi = (id, data) =>
  api.patch(`/budgets/${id}`, data);

/* Delete category budget */
export const deleteBudgetApi = (id) =>
  api.delete(`/budgets/${id}`);

/* Get budget summary */
export const getBudgetSummaryApi = () =>
  api.get("/budgets/summary");

/* Get final budget */
export const getFinalBudgetApi = () =>
  api.get("/budgets/final");

/* Update final budget */
export const updateFinalBudgetApi = (data) =>
  api.patch("/budgets/final", data);