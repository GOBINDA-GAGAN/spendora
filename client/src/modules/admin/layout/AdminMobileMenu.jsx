import React, { useEffect, useRef, useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import {
  BarChart3,
  CreditCard,
  LayoutDashboard,
  LogOut,
  MoreHorizontal,
  Settings,
  ShieldCheck,
  UserRound,
  Users,
  WalletCards,
  X,
} from "lucide-react";
import { useAuth } from "../../../context/AuthContext";

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

    <span className="text-xs font-medium">
      {label}
    </span>
  </NavLink>
);

const AdminMobileMenu = () => {
  const { logout } = useAuth();
  const navigate = useNavigate();

  const [moreOpen, setMoreOpen] = useState(false);
  const moreRef = useRef(null);

  useEffect(() => {
    const handleOutsideClick = (event) => {
      if (
        moreRef.current &&
        !moreRef.current.contains(event.target)
      ) {
        setMoreOpen(false);
      }
    };

    document.addEventListener("mousedown", handleOutsideClick);

    return () => {
      document.removeEventListener(
        "mousedown",
        handleOutsideClick
      );
    };
  }, []);

  const closeMore = () => {
    setMoreOpen(false);
  };

  const handleLogout = async () => {
    closeMore();

    try {
      await logout();
    } finally {
      navigate("/login");
    }
  };

  return (
    <nav className="fixed inset-x-0 bottom-0 z-50 md:hidden">
      {/* =========================================
          MORE FLOATING CARD
      ========================================= */}
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
                Admin
              </p>

              <p className="text-[9px] text-muted">
                Administration & account
              </p>
            </div>

            <button
              type="button"
              onClick={closeMore}
              aria-label="Close menu"
              className="rounded-lg p-1.5 text-muted transition-colors hover:bg-card-secondary hover:text-foreground"
            >
              <X size={14} />
            </button>
          </div>

          <div className="space-y-0.5">
            {/* Admin Settings */}
            <MoreItem
              icon={Settings}
              label="Admin Settings"
              path="/admin/settings"
              onClick={closeMore}
            />

            {/* Admin Roles */}
            <MoreItem
              icon={ShieldCheck}
              label="Roles & Permissions"
              path="/admin/roles"
              onClick={closeMore}
            />

            {/* Admin Wallet */}
            <MoreItem
              icon={WalletCards}
              label="Financial Overview"
              path="/admin/financial-overview"
              onClick={closeMore}
            />

            <div className="my-1.5 border-t border-border" />

            {/* Profile */}
            <MoreItem
              icon={UserRound}
              label="Profile"
              path="/profile"
              onClick={closeMore}
            />

            {/* User Dashboard */}
            <button
              type="button"
              onClick={() => {
                closeMore();
                navigate("/home");
              }}
              className="flex w-full items-center gap-3 rounded-xl px-3 py-2.5 text-foreground transition-all hover:bg-card-secondary"
            >
              <LayoutDashboard
                size={17}
                strokeWidth={1.8}
              />

              <span className="text-xs font-medium">
                User Dashboard
              </span>
            </button>

            {/* Logout */}
            <button
              type="button"
              onClick={handleLogout}
              className="flex w-full items-center gap-3 rounded-xl px-3 py-2.5 text-danger transition-all hover:bg-danger/10"
            >
              <LogOut size={17} strokeWidth={1.8} />

              <span className="text-xs font-medium">
                Logout
              </span>
            </button>
          </div>
        </div>
      </div>

      {/* =========================================
          BOTTOM NAVIGATION
      ========================================= */}
      <div className="border-t border-border bg-background/95 backdrop-blur-xl">
        <div className="mx-auto flex h-16 max-w-lg items-center justify-around px-2">
          {/* Home */}
          <NavLink
            to="/admin/home"
            className={({ isActive }) =>
              `flex min-w-14 flex-col items-center justify-center gap-1 rounded-lg px-2 py-1.5 transition-colors ${
                isActive
                  ? "text-primary"
                  : "text-muted hover:text-foreground"
              }`
            }
          >
            <LayoutDashboard
              size={19}
              strokeWidth={1.9}
            />

            <span className="text-[9px] font-medium">
              Home
            </span>
          </NavLink>

          {/* Users */}
          <NavLink
            to="/admin/users"
            className={({ isActive }) =>
              `flex min-w-14 flex-col items-center justify-center gap-1 rounded-lg px-2 py-1.5 transition-colors ${
                isActive
                  ? "text-primary"
                  : "text-muted hover:text-foreground"
              }`
            }
          >
            <Users
              size={19}
              strokeWidth={1.9}
            />

            <span className="text-[9px] font-medium">
              Users
            </span>
          </NavLink>

          {/* Transactions */}
          <NavLink
            to="/admin/transactions"
            className={({ isActive }) =>
              `flex min-w-14 flex-col items-center justify-center gap-1 rounded-lg px-2 py-1.5 transition-colors ${
                isActive
                  ? "text-primary"
                  : "text-muted hover:text-foreground"
              }`
            }
          >
            <CreditCard
              size={19}
              strokeWidth={1.9}
            />

            <span className="text-[9px] font-medium">
              Transactions
            </span>
          </NavLink>

          {/* Analytics */}
          <NavLink
            to="/admin/analytics"
            className={({ isActive }) =>
              `flex min-w-14 flex-col items-center justify-center gap-1 rounded-lg px-2 py-1.5 transition-colors ${
                isActive
                  ? "text-primary"
                  : "text-muted hover:text-foreground"
              }`
            }
          >
            <BarChart3
              size={19}
              strokeWidth={1.9}
            />

            <span className="text-[9px] font-medium">
              Analytics
            </span>
          </NavLink>

          {/* More */}
          <button
            type="button"
            onClick={() => setMoreOpen((prev) => !prev)}
            aria-label="More admin options"
            className={`flex min-w-14 flex-col items-center justify-center gap-1 rounded-lg px-2 py-1.5 transition-colors ${
              moreOpen
                ? "text-primary"
                : "text-muted hover:text-foreground"
            }`}
          >
            <MoreHorizontal
              size={20}
              strokeWidth={1.9}
            />

            <span className="text-[9px] font-medium">
              More
            </span>
          </button>
        </div>
      </div>
    </nav>
  );
};

export default AdminMobileMenu;