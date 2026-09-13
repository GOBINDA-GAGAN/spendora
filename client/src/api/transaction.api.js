import { api } from "./axios";
export const createTransactionApi = (data) => {
  return api.post("/transactions/create", data);
};

export const getTransactionsApi = ({
  page = 1,
  limit = 10,
  type,
  category,
  startDate,
  endDate,
} = {}) => {
  return api.get("/transactions", {
    params: {
      page,
      limit,
      ...(type && { type }),
      ...(category && { category }),
      ...(startDate && { startDate }),
      ...(endDate && { endDate }),
    },
  });
};
