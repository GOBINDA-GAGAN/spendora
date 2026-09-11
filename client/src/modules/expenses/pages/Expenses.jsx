import React, { useMemo, useState } from "react";
import {
  AlertTriangle,
  ArrowDownRight,
  CalendarDays,
  Check,
  ChevronDown,
  ChevronLeft,
  ChevronRight,
  CircleDollarSign,
  Coffee,
  Ellipsis,
  Filter,
  Film,
  HeartPulse,
  Home,
  Loader2,
  Search,
  ShoppingBag,
  Sparkles,
  Trash2,
  TrendingDown,
  Utensils,
  Wallet,
} from "lucide-react";

/* =========================================
   DUMMY EXPENSE DATA
========================================= */

const initialExpenses = [
  {
    id: 1,
    title: "Amazon Shopping",
    category: "Shopping",
    amount: 2499,
    date: "Sep 10, 2026",
    account: "Credit Card",
    icon: ShoppingBag,
    color: "bg-pink-50 text-pink-600",
  },
  {
    id: 2,
    title: "Lunch",
    category: "Food",
    amount: 420,
    date: "Sep 09, 2026",
    account: "UPI",
    icon: Utensils,
    color: "bg-orange-50 text-orange-600",
  },
  {
    id: 3,
    title: "Netflix",
    category: "Entertainment",
    amount: 649,
    date: "Sep 08, 2026",
    account: "Bank Account",
    icon: Film,
    color: "bg-purple-50 text-purple-600",
  },
  {
    id: 4,
    title: "Uber Ride",
    category: "Transport",
    amount: 380,
    date: "Sep 08, 2026",
    account: "UPI",
    icon: Wallet,
    color: "bg-blue-50 text-blue-600",
  },
  {
    id: 5,
    title: "Electricity Bill",
    category: "Bills",
    amount: 1850,
    date: "Sep 07, 2026",
    account: "Bank Account",
    icon: CircleDollarSign,
    color: "bg-yellow-50 text-yellow-600",
  },
  {
    id: 6,
    title: "Apartment Rent",
    category: "Housing",
    amount: 15000,
    date: "Sep 05, 2026",
    account: "Bank Account",
    icon: Home,
    color: "bg-cyan-50 text-cyan-600",
  },
  {
    id: 7,
    title: "Pharmacy",
    category: "Health",
    amount: 760,
    date: "Sep 04, 2026",
    account: "UPI",
    icon: HeartPulse,
    color: "bg-rose-50 text-rose-600",
  },
  {
    id: 8,
    title: "Morning Coffee",
    category: "Coffee",
    amount: 180,
    date: "Sep 03, 2026",
    account: "Cash",
    icon: Coffee,
    color: "bg-amber-50 text-amber-700",
  },
  {
    id: 9,
    title: "Movie Night",
    category: "Entertainment",
    amount: 850,
    date: "Sep 02, 2026",
    account: "Credit Card",
    icon: Film,
    color: "bg-purple-50 text-purple-600",
  },
  {
    id: 10,
    title: "Grocery Store",
    category: "Food",
    amount: 3200,
    date: "Sep 01, 2026",
    account: "UPI",
    icon: Utensils,
    color: "bg-orange-50 text-orange-600",
  },
  {
    id: 11,
    title: "Mobile Bill",
    category: "Bills",
    amount: 699,
    date: "Aug 30, 2026",
    account: "UPI",
    icon: CircleDollarSign,
    color: "bg-yellow-50 text-yellow-600",
  },
  {
    id: 12,
    title: "Weekend Shopping",
    category: "Shopping",
    amount: 1850,
    date: "Aug 29, 2026",
    account: "Credit Card",
    icon: ShoppingBag,
    color: "bg-pink-50 text-pink-600",
  },
];

/* =========================================
   CATEGORY OPTIONS
========================================= */

const categoryOptions = [
  "All categories",
  "Food",
  "Shopping",
  "Transport",
  "Bills",
  "Entertainment",
  "Housing",
  "Health",
  "Coffee",
];

/* =========================================
   EXPENSES PAGE
========================================= */

const Expenses = () => {
  const [expenses, setExpenses] = useState(initialExpenses);

  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("All categories");

  const [page, setPage] = useState(1);
  const perPage = 8;

  const [selectedExpenses, setSelectedExpenses] = useState([]);

  const [deletingId, setDeletingId] = useState(null);
  const [deletingSelected, setDeletingSelected] = useState(false);

  const [error, setError] = useState("");

  /* =========================================
     FILTER
  ========================================= */

  const filteredExpenses = useMemo(() => {
    return expenses.filter((expense) => {
      const searchValue = search.toLowerCase().trim();

      const matchesSearch =
        !searchValue ||
        expense.title.toLowerCase().includes(searchValue) ||
        expense.category.toLowerCase().includes(searchValue) ||
        expense.account.toLowerCase().includes(searchValue);

      const matchesCategory =
        category === "All categories" ||
        expense.category === category;

      return matchesSearch && matchesCategory;
    });
  }, [expenses, search, category]);

  /* =========================================
     PAGINATION
  ========================================= */

  const totalPages = Math.max(
    1,
    Math.ceil(filteredExpenses.length / perPage)
  );

  const visibleExpenses = filteredExpenses.slice(
    (page - 1) * perPage,
    page * perPage
  );

  /* =========================================
     STATS
  ========================================= */

  const totalExpenses = expenses.reduce(
    (sum, expense) => sum + expense.amount,
    0
  );

  const foodExpenses = expenses
    .filter((expense) => expense.category === "Food")
    .reduce((sum, expense) => sum + expense.amount, 0);

  const shoppingExpenses = expenses
    .filter((expense) => expense.category === "Shopping")
    .reduce((sum, expense) => sum + expense.amount, 0);

  const highestExpense =
    expenses.length > 0
      ? Math.max(...expenses.map((expense) => expense.amount))
      : 0;

  /* =========================================
     SELECTION
  ========================================= */

  const allVisibleSelected =
    visibleExpenses.length > 0 &&
    visibleExpenses.every((expense) =>
      selectedExpenses.includes(expense.id)
    );

  const toggleExpense = (id) => {
    setSelectedExpenses((prev) =>
      prev.includes(id)
        ? prev.filter((item) => item !== id)
        : [...prev, id]
    );
  };

  const handleSelectAll = () => {
    if (allVisibleSelected) {
      setSelectedExpenses((prev) =>
        prev.filter(
          (id) =>
            !visibleExpenses.some(
              (expense) => expense.id === id
            )
        )
      );

      return;
    }

    setSelectedExpenses((prev) => [
      ...new Set([
        ...prev,
        ...visibleExpenses.map((expense) => expense.id),
      ]),
    ]);
  };

  /* =========================================
     DELETE ONE
  ========================================= */

  const handleDeleteExpense = async (id) => {
    setError("");
    setDeletingId(id);

    try {
      /*
       * ====================================
       * YOUR API CALL HERE
       * ====================================
       *
       * Example:
       *
       * await deleteExpenseApi(id);
       *
       */

      await new Promise((resolve) =>
        setTimeout(resolve, 400)
      );

      setExpenses((prev) =>
        prev.filter((expense) => expense.id !== id)
      );

      setSelectedExpenses((prev) =>
        prev.filter((item) => item !== id)
      );

      const remaining =
        filteredExpenses.length - 1;

      const newTotalPages = Math.max(
        1,
        Math.ceil(remaining / perPage)
      );

      if (page > newTotalPages) {
        setPage(newTotalPages);
      }
    } catch (error) {
      setError(
        error?.response?.data?.message ||
          error?.message ||
          "Failed to delete expense."
      );
    } finally {
      setDeletingId(null);
    }
  };

  /* =========================================
     DELETE SELECTED
  ========================================= */

  const handleDeleteSelected = async () => {
    if (!selectedExpenses.length) return;

    setError("");
    setDeletingSelected(true);

    try {
      /*
       * ====================================
       * YOUR API CALL HERE
       * ====================================
       *
       * Example:
       *
       * await Promise.all(
       *   selectedExpenses.map((id) =>
       *     deleteExpenseApi(id)
       *   )
       * );
       *
       */

      await new Promise((resolve) =>
        setTimeout(resolve, 500)
      );

      setExpenses((prev) =>
        prev.filter(
          (expense) =>
            !selectedExpenses.includes(expense.id)
        )
      );

      setSelectedExpenses([]);

      const remaining =
        filteredExpenses.length -
        selectedExpenses.length;

      const newTotalPages = Math.max(
        1,
        Math.ceil(remaining / perPage)
      );

      if (page > newTotalPages) {
        setPage(newTotalPages);
      }
    } catch (error) {
      setError(
        error?.response?.data?.message ||
          error?.message ||
          "Failed to delete selected expenses."
      );
    } finally {
      setDeletingSelected(false);
    }
  };

  /* =========================================
     SEARCH / FILTER RESET
  ========================================= */

  const handleSearch = (value) => {
    setSearch(value);
    setPage(1);
  };

  const handleCategory = (value) => {
    setCategory(value);
    setPage(1);
  };

  return (
    <div className="space-y-4 pb-6">
      {/* =====================================
          HEADER
      ====================================== */}

      <div className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
        <div className="min-w-0">
          <p className="text-[10px] font-medium uppercase tracking-[0.14em] text-muted">
            Financial overview
          </p>

          <h1 className="mt-1 text-2xl font-semibold tracking-tight text-foreground">
            Expenses
          </h1>

          <p className="mt-1 text-xs text-muted">
            Track where your money is going.
          </p>
        </div>

        <button
          type="button"
          className="btn-primary flex h-9 w-full items-center justify-center gap-2 px-4 text-xs font-medium sm:w-auto"
        >
          <ArrowDownRight size={15} />
          Add expense
        </button>
      </div>

      {/* =====================================
          ERROR
      ====================================== */}

      {error && (
        <div className="flex items-center gap-2 rounded-xl border border-danger/10 bg-danger-muted px-3 py-2.5 text-xs text-danger">
          <AlertTriangle
            size={14}
            className="shrink-0"
          />

          <span className="min-w-0 flex-1">
            {error}
          </span>

          <button
            type="button"
            onClick={() => setError("")}
            className="shrink-0 text-danger/70 hover:text-danger"
          >
            ×
          </button>
        </div>
      )}

      {/* =====================================
          STATS
      ====================================== */}

      <div className="grid grid-cols-2 gap-3 lg:grid-cols-4">
        <StatCard
          title="Total expenses"
          value={`₹${totalExpenses.toLocaleString("en-IN")}`}
          subtitle="This month"
          icon={CircleDollarSign}
          iconClass="bg-danger-muted text-danger"
        />

        <StatCard
          title="Food"
          value={`₹${foodExpenses.toLocaleString("en-IN")}`}
          subtitle="Food spending"
          icon={Utensils}
          iconClass="bg-orange-50 text-orange-600"
        />

        <StatCard
          title="Shopping"
          value={`₹${shoppingExpenses.toLocaleString("en-IN")}`}
          subtitle="Shopping spending"
          icon={ShoppingBag}
          iconClass="bg-pink-50 text-pink-600"
        />

        <StatCard
          title="Largest expense"
          value={`₹${highestExpense.toLocaleString("en-IN")}`}
          subtitle="Single transaction"
          icon={TrendingDown}
          iconClass="bg-blue-50 text-blue-600"
        />
      </div>

      {/* =====================================
          AI ANALYSIS
      ====================================== */}

      <section className="overflow-hidden rounded-2xl border border-accent/10 bg-gradient-to-br from-accent-muted via-card to-card p-4 shadow-sm sm:p-5">
        <div className="flex gap-3">
          <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-accent text-white shadow-sm">
            <Sparkles size={18} />
          </div>

          <div className="min-w-0 flex-1">
            <div className="flex flex-wrap items-center gap-2">
              <h2 className="text-sm font-semibold text-foreground">
                AI spending analysis
              </h2>

              <span className="rounded-full bg-accent/10 px-2 py-0.5 text-[8px] font-semibold tracking-wide text-accent">
                AI INSIGHT
              </span>
            </div>

            <p className="mt-1.5 text-[11px] leading-5 text-secondary sm:text-xs">
              Your spending is currently concentrated in
              housing and shopping. Shopping appears higher
              than your normal pattern. Reducing discretionary
              shopping could improve your monthly savings.
            </p>

            <div className="mt-3 grid grid-cols-1 gap-2 sm:grid-cols-3">
              <Insight
                label="Top category"
                value="Housing"
                icon={Home}
              />

              <Insight
                label="Watch closely"
                value="Shopping"
                icon={AlertTriangle}
              />

              <Insight
                label="Potential saving"
                value="₹2,100"
                icon={TrendingDown}
              />
            </div>
          </div>
        </div>
      </section>

      {/* =====================================
          EXPENSE TABLE
      ====================================== */}

      <section className="card overflow-hidden">
        {/* ===================================
            TABLE HEADER
        ==================================== */}

        <div className="flex flex-col gap-3 border-b border-border p-4 sm:p-5 lg:flex-row lg:items-center lg:justify-between">
          <div className="min-w-0">
            <h2 className="text-sm font-semibold text-foreground">
              All expenses
            </h2>

            <p className="mt-0.5 text-[10px] text-muted">
              {filteredExpenses.length} transactions found
            </p>
          </div>

          <div className="flex flex-col gap-2 sm:flex-row">
            {/* Search */}
            <div className="relative">
              <Search
                size={14}
                className="absolute left-3 top-1/2 -translate-y-1/2 text-muted"
              />

              <input
                value={search}
                onChange={(e) =>
                  handleSearch(e.target.value)
                }
                placeholder="Search expenses..."
                className="input h-9 w-full pl-9 pr-3 text-xs sm:w-[220px]"
              />
            </div>

            {/* Category */}
            <div className="relative">
              <Filter
                size={13}
                className="absolute left-3 top-1/2 -translate-y-1/2 text-muted"
              />

              <select
                value={category}
                onChange={(e) =>
                  handleCategory(e.target.value)
                }
                className="input h-9 w-full appearance-none pl-8 pr-8 text-xs sm:w-[170px]"
              >
                {categoryOptions.map((item) => (
                  <option key={item}>{item}</option>
                ))}
              </select>

              <ChevronDown
                size={13}
                className="pointer-events-none absolute right-2.5 top-1/2 -translate-y-1/2 text-muted"
              />
            </div>
          </div>
        </div>

        {/* ===================================
            SELECTED BAR
        ==================================== */}

        {selectedExpenses.length > 0 && (
          <div className="flex items-center justify-between gap-3 border-b border-danger/10 bg-danger-muted px-4 py-2.5 sm:px-5">
            <div className="flex min-w-0 items-center gap-2">
              <div className="flex h-5 w-5 shrink-0 items-center justify-center rounded-md bg-danger text-white">
                <Check
                  size={11}
                  strokeWidth={3}
                />
              </div>

              <p className="truncate text-[10px] font-medium text-danger">
                {selectedExpenses.length} selected
              </p>
            </div>

            <button
              type="button"
              disabled={deletingSelected}
              onClick={handleDeleteSelected}
              className="flex h-7 shrink-0 items-center gap-1.5 rounded-lg bg-danger px-3 text-[10px] font-medium text-white transition hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-50"
            >
              {deletingSelected ? (
                <Loader2
                  size={12}
                  className="animate-spin"
                />
              ) : (
                <Trash2 size={12} />
              )}

              <span className="hidden sm:inline">
                {deletingSelected
                  ? "Deleting..."
                  : "Delete selected"}
              </span>

              <span className="sm:hidden">
                {deletingSelected
                  ? "..."
                  : "Delete"}
              </span>
            </button>
          </div>
        )}

        {/* ===================================
            DESKTOP TABLE
        ==================================== */}

        <div className="hidden overflow-x-auto md:block">
          <table className="w-full min-w-[780px]">
            <thead>
              <tr className="border-b border-border bg-surface/70">
                {/* Select all */}
                <th className="w-12 px-4 py-3">
                  <CheckBox
                    checked={allVisibleSelected}
                    onClick={handleSelectAll}
                  />
                </th>

                <th className="px-3 py-3 text-left text-[10px] font-medium text-muted">
                  Expense
                </th>

                <th className="px-4 py-3 text-left text-[10px] font-medium text-muted">
                  Category
                </th>

                <th className="px-4 py-3 text-left text-[10px] font-medium text-muted">
                  Date
                </th>

                <th className="px-4 py-3 text-left text-[10px] font-medium text-muted">
                  Account
                </th>

                <th className="px-5 py-3 text-right text-[10px] font-medium text-muted">
                  Amount
                </th>

                <th className="w-12 px-2" />
              </tr>
            </thead>

            <tbody className="divide-y divide-border">
              {visibleExpenses.map((expense) => {
                const selected =
                  selectedExpenses.includes(
                    expense.id
                  );

                return (
                  <ExpenseRow
                    key={expense.id}
                    expense={expense}
                    selected={selected}
                    deleting={deletingId === expense.id}
                    onSelect={() =>
                      toggleExpense(expense.id)
                    }
                    onDelete={() =>
                      handleDeleteExpense(expense.id)
                    }
                  />
                );
              })}
            </tbody>
          </table>
        </div>

        {/* ===================================
            MOBILE LIST
        ==================================== */}

        <div className="divide-y divide-border md:hidden">
          {visibleExpenses.map((expense) => {
            const selected =
              selectedExpenses.includes(
                expense.id
              );

            return (
              <MobileExpenseRow
                key={expense.id}
                expense={expense}
                selected={selected}
                deleting={deletingId === expense.id}
                onSelect={() =>
                  toggleExpense(expense.id)
                }
                onDelete={() =>
                  handleDeleteExpense(expense.id)
                }
              />
            );
          })}
        </div>

        {/* ===================================
            EMPTY
        ==================================== */}

        {!visibleExpenses.length && (
          <div className="flex flex-col items-center justify-center px-5 py-14 text-center">
            <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-surface text-muted">
              <Search size={18} />
            </div>

            <p className="mt-3 text-xs font-medium text-foreground">
              No expenses found
            </p>

            <p className="mt-1 text-[10px] text-muted">
              Try changing your search or category
              filter.
            </p>
          </div>
        )}

        {/* ===================================
            PAGINATION
        ==================================== */}

        {filteredExpenses.length > 0 && (
          <div className="flex items-center justify-between border-t border-border px-3 py-3 sm:px-5">
            <p className="text-[9px] text-muted sm:text-[10px]">
              Showing{" "}
              <span className="font-medium text-foreground">
                {(page - 1) * perPage + 1}
              </span>{" "}
              to{" "}
              <span className="font-medium text-foreground">
                {Math.min(
                  page * perPage,
                  filteredExpenses.length
                )}
              </span>{" "}
              of{" "}
              <span className="font-medium text-foreground">
                {filteredExpenses.length}
              </span>
            </p>

            <div className="flex items-center gap-1.5">
              <button
                type="button"
                disabled={page === 1}
                onClick={() =>
                  setPage((p) => p - 1)
                }
                className="flex h-8 w-8 items-center justify-center rounded-lg border border-border text-muted transition hover:bg-surface disabled:cursor-not-allowed disabled:opacity-40"
              >
                <ChevronLeft size={14} />
              </button>

              <span className="flex h-8 min-w-8 items-center justify-center rounded-lg bg-primary px-2 text-[10px] font-medium text-primary-foreground">
                {page}
              </span>

              <button
                type="button"
                disabled={page === totalPages}
                onClick={() =>
                  setPage((p) => p + 1)
                }
                className="flex h-8 w-8 items-center justify-center rounded-lg border border-border text-muted transition hover:bg-surface disabled:cursor-not-allowed disabled:opacity-40"
              >
                <ChevronRight size={14} />
              </button>
            </div>
          </div>
        )}
      </section>
    </div>
  );
};

/* =========================================
   STAT CARD
========================================= */

const StatCard = ({
  title,
  value,
  subtitle,
  icon: Icon,
  iconClass,
}) => {
  return (
    <div className="card min-w-0 p-3.5 sm:p-4">
      <div className="flex items-start justify-between">
        <div
          className={`flex h-8 w-8 items-center justify-center rounded-lg ${iconClass}`}
        >
          <Icon size={15} />
        </div>

        <Ellipsis
          size={14}
          className="text-muted"
        />
      </div>

      <p className="mt-3 truncate text-[10px] text-muted">
        {title}
      </p>

      <p className="mt-0.5 truncate text-base font-semibold tracking-tight text-foreground sm:text-lg">
        {value}
      </p>

      <p className="mt-1 truncate text-[9px] text-muted">
        {subtitle}
      </p>
    </div>
  );
};

/* =========================================
   CHECKBOX
========================================= */

const CheckBox = ({ checked, onClick }) => {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-label={
        checked
          ? "Deselect all expenses"
          : "Select all expenses"
      }
      className={`flex h-4 w-4 items-center justify-center rounded border transition ${
        checked
          ? "border-primary bg-primary text-primary-foreground"
          : "border-border bg-card hover:border-border-strong"
      }`}
    >
      {checked && (
        <Check
          size={10}
          strokeWidth={3}
        />
      )}
    </button>
  );
};

/* =========================================
   DESKTOP ROW
========================================= */

const ExpenseRow = ({
  expense,
  selected,
  deleting,
  onSelect,
  onDelete,
}) => {
  const Icon = expense.icon;

  return (
    <tr
      className={`group transition ${
        selected
          ? "bg-danger-muted/40"
          : "hover:bg-card-hover"
      }`}
    >
      {/* Checkbox */}
      <td className="px-4 py-3">
        <CheckBox
          checked={selected}
          onClick={onSelect}
        />
      </td>

      {/* Expense */}
      <td className="px-3 py-3.5">
        <div className="flex items-center gap-3">
          <div
            className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-xl ${expense.color}`}
          >
            <Icon size={16} />
          </div>

          <div className="min-w-0">
            <p className="truncate text-xs font-medium text-foreground">
              {expense.title}
            </p>

            <p className="mt-0.5 text-[9px] text-muted">
              Expense
            </p>
          </div>
        </div>
      </td>

      {/* Category */}
      <td className="px-4 py-3.5">
        <span className="inline-flex rounded-full bg-surface px-2.5 py-1 text-[9px] font-medium text-secondary">
          {expense.category}
        </span>
      </td>

      {/* Date */}
      <td className="px-4 py-3.5">
        <div className="flex items-center gap-1.5 text-[10px] text-secondary">
          <CalendarDays
            size={12}
            className="text-muted"
          />

          {expense.date}
        </div>
      </td>

      {/* Account */}
      <td className="px-4 py-3.5 text-[10px] text-secondary">
        {expense.account}
      </td>

      {/* Amount */}
      <td className="px-5 py-3.5 text-right">
        <span className="text-xs font-semibold text-danger">
          -₹{expense.amount.toLocaleString("en-IN")}
        </span>
      </td>

      {/* Delete */}
      <td className="px-2 py-3.5">
        <button
          type="button"
          disabled={deleting}
          onClick={onDelete}
          className="flex h-7 w-7 items-center justify-center rounded-lg text-muted opacity-0 transition hover:bg-danger-muted hover:text-danger group-hover:opacity-100 disabled:opacity-100"
          title="Delete expense"
        >
          {deleting ? (
            <Loader2
              size={14}
              className="animate-spin"
            />
          ) : (
            <Trash2 size={14} />
          )}
        </button>
      </td>
    </tr>
  );
};

/* =========================================
   MOBILE ROW
========================================= */

const MobileExpenseRow = ({
  expense,
  selected,
  deleting,
  onSelect,
  onDelete,
}) => {
  const Icon = expense.icon;

  return (
    <div
      className={`flex items-center gap-2.5 px-3.5 py-3 ${
        selected ? "bg-danger-muted/40" : ""
      }`}
    >
      {/* Checkbox */}
      <CheckBox
        checked={selected}
        onClick={onSelect}
      />

      {/* Icon */}
      <div
        className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-xl ${expense.color}`}
      >
        <Icon size={15} />
      </div>

      {/* Details */}
      <div className="min-w-0 flex-1">
        <p className="truncate text-[11px] font-medium text-foreground">
          {expense.title}
        </p>

        <div className="mt-0.5 flex items-center gap-1.5">
          <span className="truncate text-[9px] text-muted">
            {expense.category}
          </span>

          <span className="h-1 w-1 shrink-0 rounded-full bg-surface-tertiary" />

          <span className="shrink-0 text-[9px] text-muted">
            {expense.date}
          </span>
        </div>

        <p className="mt-0.5 truncate text-[9px] text-muted">
          {expense.account}
        </p>
      </div>

      {/* Amount */}
      <div className="flex shrink-0 items-center gap-1">
        <p className="text-[11px] font-semibold text-danger">
          -₹{expense.amount.toLocaleString("en-IN")}
        </p>

        <button
          type="button"
          disabled={deleting}
          onClick={onDelete}
          className="flex h-7 w-7 items-center justify-center rounded-lg text-muted hover:bg-danger-muted hover:text-danger disabled:opacity-60"
          title="Delete expense"
        >
          {deleting ? (
            <Loader2
              size={13}
              className="animate-spin"
            />
          ) : (
            <Trash2 size={13} />
          )}
        </button>
      </div>
    </div>
  );
};

/* =========================================
   AI INSIGHT
========================================= */

const Insight = ({
  label,
  value,
  icon: Icon,
}) => {
  return (
    <div className="flex items-center gap-2 rounded-xl border border-border/70 bg-card/70 px-3 py-2.5">
      <Icon
        size={14}
        className="shrink-0 text-accent"
      />

      <div className="min-w-0">
        <p className="text-[9px] text-muted">
          {label}
        </p>

        <p className="truncate text-[10px] font-semibold text-foreground">
          {value}
        </p>
      </div>
    </div>
  );
};

export default Expenses;