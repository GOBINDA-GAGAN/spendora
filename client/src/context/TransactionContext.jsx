import { createContext, useContext, useEffect, useState } from "react";
import {
  createTransactionApi,
  getTransactionsApi,
} from "../api/transaction.api";

const TransactionContext = createContext(null);

export const TransactionProvider = ({ children }) => {
  const [transactions, setTransactions] = useState([]);
  const [loading, setLoading] = useState(false);

  const createTransaction = async (data) => {
    try {
      setLoading(true);

      const response = await createTransactionApi(data);
      return response.data;
    } catch (error) {
      console.error("Create transaction error:", error);
      throw error;
    } finally {
      setLoading(false);
    }
  };

  const getTransactions = async (params = {}) => {
    try {
      setLoading(true);

      const response = await getTransactionsApi(params);

      setTransactions(response.data.transactions);

      return response.data;
    } catch (error) {
      console.error("Get transactions error:", error);
      throw error;
    } finally {
      setLoading(false);
    }
  };

  return (
    <TransactionContext.Provider
      value={{
        transactions,
        setTransactions,
        loading,
        createTransaction,
        getTransactions,
      }}
    >
      {children}
    </TransactionContext.Provider>
  );
};

export const useTransaction = () => {
  return useContext(TransactionContext);
};
