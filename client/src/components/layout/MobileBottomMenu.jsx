import React, { useEffect, useRef, useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { AnimatePresence, motion } from "framer-motion";
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
  Utensils,
  ShoppingBag,
  Car,
  House,
  Receipt,
  HeartPulse,
  Gamepad2,
  Plane,
  BriefcaseBusiness,
  Banknote,
  Building2,
  Coins,
  Check,
  Loader2,
} from "lucide-react";
import { useAuth } from "../../context/AuthContext";

/* =========================================================
   MAIN MENU
========================================================= */

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

/* =========================================================
   QUICK TRANSACTION CATEGORIES
========================================================= */

const expenseCategories = [
  {
    id: "food",
    label: "Food",
    icon: Utensils,
  },
  {
    id: "shopping",
    label: "Shopping",
    icon: ShoppingBag,
  },
  {
    id: "transport",
    label: "Transport",
    icon: Car,
  },
  {
    id: "housing",
    label: "Housing",
    icon: House,
  },
  {
    id: "bills",
    label: "Bills",
    icon: Receipt,
  },
  {
    id: "health",
    label: "Health",
    icon: HeartPulse,
  },
  {
    id: "entertainment",
    label: "Fun",
    icon: Gamepad2,
  },
  {
    id: "travel",
    label: "Travel",
    icon: Plane,
  },
];

const incomeCategories = [
  {
    id: "salary",
    label: "Salary",
    icon: Banknote,
  },
  {
    id: "freelance",
    label: "Freelance",
    icon: BriefcaseBusiness,
  },
  {
    id: "business",
    label: "Business",
    icon: Building2,
  },
  {
    id: "investment",
    label: "Investment",
    icon: Coins,
  },
  {
    id: "other",
    label: "Other",
    icon: MoreHorizontal,
  },
];

/* =========================================================
   MORE ITEM
   DO NOT CHANGE MORE MENU BEHAVIOR
========================================================= */

const MoreItem = ({
  icon: Icon,
  label,
  path,
  onClick,
}) => (
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

/* =========================================================
   QUICK TRANSACTION MODAL
========================================================= */

const QuickTransactionModal = ({ onClose }) => {
  const [type, setType] = useState("expense");
  const [amount, setAmount] = useState("");
  const [category, setCategory] = useState("");
  const [date, setDate] = useState(
    new Date().toISOString().split("T")[0]
  );
  const [account, setAccount] = useState("Cash");
  const [note, setNote] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const amountRef = useRef(null);

  const isIncome = type === "income";

  const categories = isIncome
    ? incomeCategories
    : expenseCategories;

  /* =======================================================
     ESCAPE
  ======================================================= */

  useEffect(() => {
    const handleEscape = (event) => {
      if (event.key === "Escape") {
        onClose();
      }
    };

    document.addEventListener(
      "keydown",
      handleEscape
    );

    return () => {
      document.removeEventListener(
        "keydown",
        handleEscape
      );
    };
  }, [onClose]);

  /* =======================================================
     AUTO FOCUS
  ======================================================= */

  useEffect(() => {
    const timer = setTimeout(() => {
      amountRef.current?.focus();
    }, 180);

    return () => clearTimeout(timer);
  }, []);

  /* =======================================================
     CHANGE TYPE
  ======================================================= */

  const handleTypeChange = (newType) => {
    setType(newType);
    setCategory("");
    setError("");
  };

  /* =======================================================
     SUBMIT
  ======================================================= */

  const handleSubmit = async (event) => {
    event.preventDefault();

    setError("");

    if (!amount || Number(amount) <= 0) {
      setError("Please enter a valid amount.");
      return;
    }

    if (!category) {
      setError("Please select a category.");
      return;
    }

    try {
      setLoading(true);

      const payload = {
        type,
        amount: Number(amount),
        category,
        date,
        account,
        note: note.trim(),
      };

      /* ================================================
         YOUR API CALL HERE
      ================================================ */

      // await createTransactionApi(payload);

      console.log("Quick transaction:", payload);

      await new Promise((resolve) =>
        setTimeout(resolve, 600)
      );

      onClose();
    } catch (error) {
      setError(
        error?.response?.data?.message ||
          error?.message ||
          "Failed to add transaction."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <motion.div
      className="fixed inset-0 z-[100] md:hidden"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      {/* =================================================
          BACKDROP
      ================================================= */}

      <motion.button
        type="button"
        aria-label="Close transaction"
        onClick={onClose}
        className="absolute inset-0 h-full w-full cursor-default bg-black/20 backdrop-blur-[3px]"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
      />

      {/* =================================================
          QUICK TRANSACTION PANEL
          ABOVE BOTTOM MENU
      ================================================= */}

      <motion.div
        initial={{
          opacity: 0,
          y: 30,
          scale: 0.96,
        }}
        animate={{
          opacity: 1,
          y: 0,
          scale: 1,
        }}
        exit={{
          opacity: 0,
          y: 25,
          scale: 0.96,
        }}
        transition={{
          type: "spring",
          stiffness: 380,
          damping: 30,
          mass: 0.75,
        }}
        className={`absolute inset-x-2 bottom-[75px] overflow-hidden rounded-[24px] border bg-background/95 backdrop-blur-2xl sm:left-1/2 sm:w-[430px] sm:-translate-x-1/2 ${
          isIncome
            ? "border-green-200 shadow-[0_15px_60px_rgba(34,197,94,0.20)]"
            : "border-red-200 shadow-[0_15px_60px_rgba(239,68,68,0.20)]"
        }`}
      >
        {/* =================================================
            COLOR ACCENT
        ================================================= */}

        <motion.div
          layout
          className={`h-[3px] w-full ${
            isIncome
              ? "bg-green-500"
              : "bg-red-500"
          }`}
        />

        <form
          onSubmit={handleSubmit}
          className="p-4"
        >
          {/* =================================================
              HEADER
          ================================================= */}

          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2.5">
              <motion.div
                layout
                animate={{
                  boxShadow: isIncome
                    ? "0 0 22px rgba(34,197,94,.20)"
                    : "0 0 22px rgba(239,68,68,.20)",
                }}
                className={`flex h-9 w-9 items-center justify-center rounded-xl ${
                  isIncome
                    ? "bg-green-50 text-green-600"
                    : "bg-red-50 text-red-600"
                }`}
              >
                {isIncome ? (
                  <TrendingUp
                    size={17}
                    strokeWidth={1.9}
                  />
                ) : (
                  <CircleDollarSign
                    size={17}
                    strokeWidth={1.9}
                  />
                )}
              </motion.div>

              <div>
                <p className="text-sm font-semibold text-foreground">
                  Quick Transaction
                </p>

                <p className="text-[9px] text-muted">
                  Add it without leaving the page
                </p>
              </div>
            </div>

            {/* CLOSE */}
            <motion.button
              type="button"
              whileTap={{ scale: 0.88 }}
              onClick={onClose}
              className="flex h-8 w-8 items-center justify-center rounded-full bg-card-secondary text-muted transition hover:text-foreground"
            >
              <X size={15} />
            </motion.button>
          </div>

          {/* =================================================
              EXPENSE / INCOME
          ================================================= */}

          <div className="mt-3 grid grid-cols-2 rounded-xl bg-card-secondary p-1">
            <button
              type="button"
              onClick={() =>
                handleTypeChange("expense")
              }
              className={`relative h-8 rounded-lg text-[10px] font-semibold ${
                type === "expense"
                  ? "text-red-600"
                  : "text-muted"
              }`}
            >
              {type === "expense" && (
                <motion.div
                  layoutId="transaction-type"
                  className="absolute inset-0 rounded-lg bg-background shadow-sm"
                />
              )}

              <span className="relative z-10">
                Expense
              </span>
            </button>

            <button
              type="button"
              onClick={() =>
                handleTypeChange("income")
              }
              className={`relative h-8 rounded-lg text-[10px] font-semibold ${
                type === "income"
                  ? "text-green-600"
                  : "text-muted"
              }`}
            >
              {type === "income" && (
                <motion.div
                  layoutId="transaction-type"
                  className="absolute inset-0 rounded-lg bg-background shadow-sm"
                />
              )}

              <span className="relative z-10">
                Income
              </span>
            </button>
          </div>

          {/* =================================================
              AMOUNT
          ================================================= */}

          <div className="mt-3">
            <motion.div
              layout
              animate={{
                boxShadow: isIncome
                  ? "0 0 25px rgba(34,197,94,.10)"
                  : "0 0 25px rgba(239,68,68,.10)",
              }}
              className={`relative rounded-2xl border bg-card ${
                isIncome
                  ? "border-green-200"
                  : "border-red-200"
              }`}
            >
              <span
                className={`absolute left-3.5 top-1/2 -translate-y-1/2 text-lg font-medium ${
                  isIncome
                    ? "text-green-500"
                    : "text-red-500"
                }`}
              >
                ₹
              </span>

              <input
                ref={amountRef}
                type="number"
                min="0"
                step="1"
                value={amount}
                onChange={(event) =>
                  setAmount(event.target.value)
                }
                placeholder="0"
                className="h-12 w-full bg-transparent pl-9 pr-3 text-xl font-semibold tracking-tight text-foreground outline-none placeholder:text-muted/30"
              />
            </motion.div>
          </div>

          {/* =================================================
              CATEGORY
          ================================================= */}

          <div className="mt-3">
            <div className="mb-1.5 flex items-center justify-between">
              <label className="text-[9px] font-semibold uppercase tracking-wider text-muted">
                Category
              </label>

              <span className="text-[8px] text-muted">
                Required
              </span>
            </div>

            <div className="grid grid-cols-4 gap-1.5">
              {categories.map((item) => {
                const Icon = item.icon;

                const active =
                  category === item.id;

                return (
                  <motion.button
                    key={item.id}
                    type="button"
                    whileTap={{ scale: 0.93 }}
                    onClick={() => {
                      setCategory(item.id);
                      setError("");
                    }}
                    className={`relative flex min-h-[54px] flex-col items-center justify-center gap-1 rounded-xl border transition-all ${
                      active
                        ? isIncome
                          ? "border-green-200 bg-green-50 text-green-600 shadow-[0_4px_15px_rgba(34,197,94,.13)]"
                          : "border-red-200 bg-red-50 text-red-600 shadow-[0_4px_15px_rgba(239,68,68,.13)]"
                        : "border-border bg-card text-muted hover:text-foreground"
                    }`}
                  >
                    <Icon
                      size={15}
                      strokeWidth={1.8}
                    />

                    <span className="max-w-full truncate px-1 text-[8px] font-medium">
                      {item.label}
                    </span>

                    {active && (
                      <motion.span
                        initial={{
                          scale: 0,
                          opacity: 0,
                        }}
                        animate={{
                          scale: 1,
                          opacity: 1,
                        }}
                        className={`absolute right-1.5 top-1.5 flex h-3.5 w-3.5 items-center justify-center rounded-full text-[7px] text-white ${
                          isIncome
                            ? "bg-green-500"
                            : "bg-red-500"
                        }`}
                      >
                        ✓
                      </motion.span>
                    )}
                  </motion.button>
                );
              })}
            </div>
          </div>

          {/* =================================================
              DATE + ACCOUNT
          ================================================= */}

          <div className="mt-3 grid grid-cols-2 gap-2">
            <div>
              <label className="mb-1 block text-[9px] font-medium text-muted">
                Date
              </label>

              <input
                type="date"
                value={date}
                onChange={(event) =>
                  setDate(event.target.value)
                }
                className="h-9 w-full rounded-xl border border-border bg-card px-2.5 text-[9px] text-foreground outline-none focus:border-primary"
              />
            </div>

            <div>
              <label className="mb-1 block text-[9px] font-medium text-muted">
                Account
              </label>

              <select
                value={account}
                onChange={(event) =>
                  setAccount(event.target.value)
                }
                className="h-9 w-full rounded-xl border border-border bg-card px-2.5 text-[9px] text-foreground outline-none focus:border-primary"
              >
                <option>Cash</option>
                <option>Bank</option>
                <option>UPI</option>
                <option>Credit Card</option>
                <option>Wallet</option>
              </select>
            </div>
          </div>

          {/* =================================================
              NOTE
          ================================================= */}

          <div className="mt-3">
            <input
              type="text"
              value={note}
              onChange={(event) =>
                setNote(event.target.value)
              }
              placeholder="Add a note..."
              className="h-9 w-full rounded-xl border border-border bg-card px-3 text-[9px] text-foreground outline-none placeholder:text-muted/50 focus:border-primary"
            />
          </div>

          {/* =================================================
              ERROR
          ================================================= */}

          <AnimatePresence>
            {error && (
              <motion.div
                initial={{
                  opacity: 0,
                  height: 0,
                }}
                animate={{
                  opacity: 1,
                  height: "auto",
                }}
                exit={{
                  opacity: 0,
                  height: 0,
                }}
                className="mt-2 overflow-hidden rounded-xl bg-red-50 px-3 py-2 text-[9px] text-red-600"
              >
                {error}
              </motion.div>
            )}
          </AnimatePresence>

          {/* =================================================
              SUBMIT
          ================================================= */}

          <motion.button
            type="submit"
            disabled={loading}
            whileTap={{ scale: 0.98 }}
            className={`mt-3 flex h-10 w-full items-center justify-center gap-2 rounded-xl text-[10px] font-semibold text-white transition ${
              isIncome
                ? "bg-green-500 shadow-[0_7px_22px_rgba(34,197,94,.22)]"
                : "bg-red-500 shadow-[0_7px_22px_rgba(239,68,68,.22)]"
            } disabled:cursor-not-allowed disabled:opacity-60`}
          >
            {loading ? (
              <>
                <Loader2
                  size={13}
                  className="animate-spin"
                />
                Adding...
              </>
            ) : (
              <>
                <Check size={13} />
                Add {isIncome ? "Income" : "Expense"}
              </>
            )}
          </motion.button>
        </form>
      </motion.div>
    </motion.div>
  );
};

/* =========================================================
   MOBILE BOTTOM MENU
========================================================= */

const MobileBottomMenu = () => {
  const { user } = useAuth();

  const navigate = useNavigate();

  const [moreOpen, setMoreOpen] = useState(false);

  const [quickTransactionOpen, setQuickTransactionOpen] =
    useState(false);

  const moreRef = useRef(null);

  /* =======================================================
     OUTSIDE CLICK
     ONLY FOR MORE MENU
======================================================= */

  useEffect(() => {
    const handleOutsideClick = (event) => {
      if (
        moreRef.current &&
        !moreRef.current.contains(event.target)
      ) {
        setMoreOpen(false);
      }
    };

    document.addEventListener(
      "mousedown",
      handleOutsideClick
    );

    return () => {
      document.removeEventListener(
        "mousedown",
        handleOutsideClick
      );
    };
  }, []);

  /* =======================================================
     OPEN QUICK TRANSACTION
======================================================= */

  const openQuickTransaction = () => {
    setMoreOpen(false);
    setQuickTransactionOpen(true);
  };

  return (
    <>
      {/* =====================================================
          QUICK TRANSACTION
      ===================================================== */}

      <AnimatePresence>
        {quickTransactionOpen && (
          <QuickTransactionModal
            onClose={() =>
              setQuickTransactionOpen(false)
            }
          />
        )}
      </AnimatePresence>

      {/* =====================================================
          MOBILE NAV
      ===================================================== */}

      <nav className="fixed inset-x-0 bottom-0 z-50 md:hidden">
        {/* ===================================================
            MORE MENU
            KEEPING YOUR EXISTING MORE MENU
        =================================================== */}

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
                onClick={() =>
                  setMoreOpen(false)
                }
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
                onClick={() =>
                  setMoreOpen(false)
                }
              />

              {/* Budgets */}
              <MoreItem
                icon={Wallet}
                label="Budgets"
                path="/budgets"
                onClick={() =>
                  setMoreOpen(false)
                }
              />

              {/* Reports */}
              <MoreItem
                icon={BarChart3}
                label="Reports"
                path="/reports"
                onClick={() =>
                  setMoreOpen(false)
                }
              />

              <div className="my-1.5 border-t border-border" />

              {/* Profile */}
              <MoreItem
                icon={UserRound}
                label="Profile"
                path="/profile/me"
                onClick={() =>
                  setMoreOpen(false)
                }
              />

              {/* Settings */}
              <MoreItem
                icon={Settings}
                label="Settings"
                path="/settings"
                onClick={() =>
                  setMoreOpen(false)
                }
              />

              {/* Admin */}
              {user?.role === "admin" && (
                <>
                  <div className="my-1.5 border-t border-border" />

                  <MoreItem
                    icon={ShieldCheck}
                    label="Admin Portal"
                    path="/admin/home"
                    onClick={() =>
                      setMoreOpen(false)
                    }
                  />
                </>
              )}
            </div>
          </div>
        </div>

        {/* ===================================================
            BOTTOM BAR
        =================================================== */}

        <div className="border-t border-border bg-background/90 px-2 pb-[max(7px,env(safe-area-inset-bottom))] pt-1.5 shadow-[0_-8px_30px_rgba(0,0,0,0.05)] backdrop-blur-2xl">
          <div className="mx-auto flex h-14 max-w-lg items-center justify-around">
            {/* =================================================
                DASHBOARD
            ================================================= */}

            <NavLink
              to="/home"
              className={({ isActive }) =>
                `flex min-w-[58px] flex-col items-center justify-center gap-0.5 rounded-xl px-1 py-1 transition ${
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

              <span className="text-[8px] font-medium">
                Dashboard
              </span>
            </NavLink>

            {/* =================================================
                TRANSACTIONS
            ================================================= */}

            <NavLink
              to="/transactions"
              className={({ isActive }) =>
                `flex min-w-[58px] flex-col items-center justify-center gap-0.5 rounded-xl px-1 py-1 transition ${
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

              <span className="text-[8px] font-medium">
                Transactions
              </span>
            </NavLink>

            {/* =================================================
                CENTER PLUS / X
            ================================================= */}

            <motion.button
              type="button"
              aria-label={
                quickTransactionOpen
                  ? "Close quick transaction"
                  : "Add quick transaction"
              }
              onClick={() =>
                setQuickTransactionOpen(
                  (prev) => !prev
                )
              }
              whileTap={{
                scale: 0.88,
              }}
              animate={{
                rotate: quickTransactionOpen
                  ? 45
                  : 0,
              }}
              transition={{
                type: "spring",
                stiffness: 420,
                damping: 22,
              }}
              className={`relative -mt-7 flex h-12 w-12 shrink-0 items-center justify-center rounded-full ring-4 ring-background ${
                quickTransactionOpen
                  ? "bg-foreground text-background shadow-[0_8px_28px_rgba(0,0,0,0.22)]"
                  : "bg-primary text-primary-foreground shadow-[0_8px_25px_rgba(0,113,227,0.3)]"
              }`}
            >
              <Plus
                size={23}
                strokeWidth={2.2}
              />
            </motion.button>

            {/* =================================================
                EXPENSES
            ================================================= */}

            <NavLink
              to="/expenses"
              className={({ isActive }) =>
                `flex min-w-[58px] flex-col items-center justify-center gap-0.5 rounded-xl px-1 py-1 transition ${
                  isActive
                    ? "text-primary"
                    : "text-muted hover:text-foreground"
                }`
              }
            >
              <CircleDollarSign
                size={19}
                strokeWidth={1.9}
              />

              <span className="text-[8px] font-medium">
                Expenses
              </span>
            </NavLink>

            {/* =================================================
                MORE
            ================================================= */}

            <button
              type="button"
              onClick={() =>
                setMoreOpen((prev) => !prev)
              }
              className={`flex min-w-[58px] flex-col items-center justify-center gap-0.5 rounded-xl px-1 py-1 transition ${
                moreOpen
                  ? "text-primary"
                  : "text-muted hover:text-foreground"
              }`}
            >
              <MoreHorizontal
                size={20}
                strokeWidth={1.9}
              />

              <span className="text-[8px] font-medium">
                More
              </span>
            </button>
          </div>
        </div>
      </nav>
    </>
  );
};

export default MobileBottomMenu;