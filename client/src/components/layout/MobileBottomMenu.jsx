import React, { useEffect, useRef, useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import {
  BarChart3,
  CircleDollarSign,
  CreditCard,
  LayoutDashboard,
  MoreHorizontal,
  Plus,
  Settings,
  ShieldCheck,
  TrendingUp,
  UserRound,
  Wallet,
  X,
} from "lucide-react";
import { useAuth } from "../../context/AuthContext";

const mainMenu = [
  {
    label: "Dashboard",
    path: "/home",
    icon: LayoutDashboard,
  },
  {
    label: "Transactions",
    path: "/transactions",
    icon: CreditCard,
  },
  {
    label: "Expenses",
    path: "/expenses",
    icon: CircleDollarSign,
  },
];

const MoreItem = ({ icon: Icon, label, path, onClick }) => (
  <NavLink
    to={path}
    onClick={onClick}
    className={({ isActive }) =>
      `flex items-center gap-3 rounded-xl px-3 py-2.5 transition-all ${
        isActive
          ? "bg-primary/10 text-primary"
          : "text-foreground hover:bg-card-secondary"
      }`
    }
  >
    <Icon size={17} strokeWidth={1.8} />
    <span className="text-xs font-medium">{label}</span>
  </NavLink>
);

const MobileBottomMenu = () => {
  const { user } = useAuth();
  const navigate = useNavigate();

  const [moreOpen, setMoreOpen] = useState(false);
  const moreRef = useRef(null);

  useEffect(() => {
    const handleOutsideClick = (event) => {
      if (moreRef.current && !moreRef.current.contains(event.target)) {
        setMoreOpen(false);
      }
    };

    document.addEventListener("mousedown", handleOutsideClick);

    return () => {
      document.removeEventListener("mousedown", handleOutsideClick);
    };
  }, []);

  const openExpense = () => {
    setMoreOpen(false);
    navigate("/expenses/new");
  };

  return (
    <nav className="fixed inset-x-0 bottom-0 z-50 md:hidden">
      {/* More Menu */}
      <div
        ref={moreRef}
        className={`absolute bottom-[72px] right-3 w-56 origin-bottom-right transition-all duration-200 ${
          moreOpen
            ? "pointer-events-auto scale-100 opacity-100"
            : "pointer-events-none scale-95 opacity-0"
        }`}
      >
        <div className="overflow-hidden rounded-2xl border border-border bg-background/95 p-2 shadow-[0_12px_45px_rgba(0,0,0,0.16)] backdrop-blur-2xl">
          {/* Header */}
          <div className="mb-1 flex items-center justify-between px-3 py-2">
            <div>
              <p className="text-xs font-semibold text-foreground">
                More
              </p>

              <p className="text-[9px] text-muted">
                Account & tools
              </p>
            </div>

            <button
              type="button"
              onClick={() => setMoreOpen(false)}
              className="rounded-lg p-1.5 text-muted transition-colors hover:bg-card-secondary hover:text-foreground"
            >
              <X size={14} />
            </button>
          </div>

          <div className="space-y-0.5">
            {/* Income */}
            <MoreItem
              icon={TrendingUp}
              label="Income"
              path="/income"
              onClick={() => setMoreOpen(false)}
            />

            {/* Budgets */}
            <MoreItem
              icon={Wallet}
              label="Budgets"
              path="/budgets"
              onClick={() => setMoreOpen(false)}
            />

            {/* Reports */}
            <MoreItem
              icon={BarChart3}
              label="Reports"
              path="/reports"
              onClick={() => setMoreOpen(false)}
            />

            <div className="my-1.5 border-t border-border" />

            {/* Profile */}
            <MoreItem
              icon={UserRound}
              label="Profile"
              path="/profile"
              onClick={() => setMoreOpen(false)}
            />

            {/* Settings */}
            <MoreItem
              icon={Settings}
              label="Settings"
              path="/settings"
              onClick={() => setMoreOpen(false)}
            />

            {/* Admin */}
            {user?.role === "admin" && (
              <>
                <div className="my-1.5 border-t border-border" />

                <MoreItem
                  icon={ShieldCheck}
                  label="Admin Portal"
                  path="/admin/home"
                  onClick={() => setMoreOpen(false)}
                />
              </>
            )}
          </div>
        </div>
      </div>

      {/* Bottom Navigation */}
      <div className="border-t border-border bg-background/90 px-2 pb-[max(8px,env(safe-area-inset-bottom))] pt-2 shadow-[0_-8px_30px_rgba(0,0,0,0.05)] backdrop-blur-2xl">
        <div className="mx-auto flex h-14 max-w-lg items-center justify-around">

          {/* Dashboard */}
          <NavLink
            to="/home"
            className={({ isActive }) =>
              `flex min-w-[58px] flex-col items-center justify-center gap-1 rounded-xl px-1.5 py-1.5 transition-all ${
                isActive
                  ? "text-primary"
                  : "text-muted hover:text-foreground"
              }`
            }
          >
            <LayoutDashboard size={19} strokeWidth={1.9} />

            <span className="text-[9px] font-medium">
              Dashboard
            </span>
          </NavLink>

          {/* Transactions */}
          <NavLink
            to="/transactions"
            className={({ isActive }) =>
              `flex min-w-[58px] flex-col items-center justify-center gap-1 rounded-xl px-1.5 py-1.5 transition-all ${
                isActive
                  ? "text-primary"
                  : "text-muted hover:text-foreground"
              }`
            }
          >
            <CreditCard size={19} strokeWidth={1.9} />

            <span className="text-[9px] font-medium">
              Transactions
            </span>
          </NavLink>

          {/* Center Add */}
          <button
            type="button"
            onClick={openExpense}
            aria-label="Add expense"
            className="relative -mt-7 flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-primary text-primary-foreground shadow-[0_8px_25px_rgba(0,113,227,0.3)] ring-4 ring-background transition-all duration-200 hover:scale-105 active:scale-95"
          >
            <Plus size={23} strokeWidth={2.2} />
          </button>

          {/* Expenses */}
          <NavLink
            to="/expenses"
            className={({ isActive }) =>
              `flex min-w-[58px] flex-col items-center justify-center gap-1 rounded-xl px-1.5 py-1.5 transition-all ${
                isActive
                  ? "text-primary"
                  : "text-muted hover:text-foreground"
              }`
            }
          >
            <CircleDollarSign size={19} strokeWidth={1.9} />

            <span className="text-[9px] font-medium">
              Expenses
            </span>
          </NavLink>

          {/* More */}
          <button
            type="button"
            onClick={() => setMoreOpen((prev) => !prev)}
            className={`flex min-w-[58px] flex-col items-center justify-center gap-1 rounded-xl px-1.5 py-1.5 transition-all ${
              moreOpen
                ? "text-primary"
                : "text-muted hover:text-foreground"
            }`}
          >
            <MoreHorizontal size={20} strokeWidth={1.9} />

            <span className="text-[9px] font-medium">
              More
            </span>
          </button>
        </div>
      </div>
    </nav>
  );
};

export default MobileBottomMenu;