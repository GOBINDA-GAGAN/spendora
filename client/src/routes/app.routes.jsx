import { createBrowserRouter } from "react-router-dom";

import LandingPage from "../modules/landing/LandingPage";

import Login from "../modules/auth/pages/LoginPage";
import Register from "../modules/auth/pages/RegisterPage";
import ForgotPassword from "../modules/auth/pages/ForgotPassword";

import Home from "../modules/home/pages/Home";

import DashboardLayout from "../components/layout/DashboardLayout";
import ProtectedRoute from "./ProtectedRoute";
import AdminRoute from "./AdminRoute";

import AdminLayout from "../modules/admin/layout/AdminLayout";
import AdminHome from "../modules/admin/pages/AdminHome";
import Profile from "../modules/home/pages/Profile";
import Settings from "../modules/home/pages/SettingPage";
import Transactions from "../modules/transactions/pages/Transactions";
import NewExpenses from "../modules/transactions/pages/NewExpenses";
import Expenses from "../modules/expenses/pages/Expenses";
import Income from "../modules/income/pages/Income";
import Budgets from "../modules/budgets/pages/Budgets";

const router = createBrowserRouter([
  // Public routes
  {
    path: "/",
    element: <LandingPage />,
  },
  {
    path: "/login",
    element: <Login />,
  },
  {
    path: "/register",
    element: <Register />,
  },
  {
    path: "/forgot-password",
    element: <ForgotPassword />,
  },

  // Protected user routes
  {
    element: <ProtectedRoute />,
    children: [
      {
        element: <DashboardLayout />,
        children: [
          {
            path: "/home",
            element: <Home />,
          },
          {
            path: "/transactions",
            element: <Transactions />,
          },
          {
            path: "/expenses",
            element: <Expenses />,
          },
          {
            path: "/income",
            element: <Income />,
          },
          {
            path: "/budgets",
            element: <Budgets />,
          },
          {
            path: "/expenses/new",
            element: <NewExpenses />,
          },
          {
            path: "/profile/me",
            element: <Profile />,
          },
          {
            path: "/settings",
            element: <Settings />,
          },
        ],
      },
    ],
  },

  // Protected admin routes
  {
    element: <ProtectedRoute />,
    children: [
      {
        element: <AdminRoute />,
        children: [
          {
            element: <AdminLayout />,
            children: [
              {
                path: "/admin/home",
                element: <AdminHome />,
              },
            ],
          },
        ],
      },
    ],
  },
]);

export default router;
