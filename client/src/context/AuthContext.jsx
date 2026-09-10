import {
  createContext,
  useContext,
  useEffect,
  useState,
} from "react";

import { api } from "../api/axios";

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  const register = async (userData) => {
    const response = await api.post("/auth/register", userData);
    return response.data;
  };

  const login = async (credentials) => {
    const response = await api.post("/auth/login", credentials);

    setUser(response.data.user);

    return response.data;
  };

  const getUser = async () => {
    const response = await api.get("/auth/me");

    setUser(response.data.user);

    return response.data.user;
  };

  const refreshAccessToken = async () => {
    const response = await api.post("/auth/refresh-token");

    return response.data;
  };

  const checkAuth = async () => {
    try {
      // First try existing access token
      await getUser();
    } catch (error) {
      // Access token may be expired
      if (error?.response?.status === 401) {
        try {
          // Try refresh token
          await refreshAccessToken();

          // Get user again with new access token
          await getUser();
        } catch (refreshError) {
          // Refresh token is also invalid/expired
          setUser(null);
        }
      } else {
        setUser(null);
      }
    }
  };

  const logout = async () => {
    try {
      await api.post("/auth/logout");
    } finally {
      setUser(null);
    }
  };

  useEffect(() => {
    const initializeAuth = async () => {
      try {
        await checkAuth();
      } finally {
        setLoading(false);
      }
    };

    initializeAuth();
  }, []);

  return (
    <AuthContext.Provider
      value={{
        user,
        loading,
        register,
        login,
        getUser,
        refreshAccessToken,
        logout,
        isAuthenticated: !!user,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  return useContext(AuthContext);
};