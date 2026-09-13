import React, { useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  CalendarDays,
  Check,
  ChevronDown,
  ChevronLeft,
  ChevronRight,
  CircleDollarSign,
  CreditCard,
  Filter,
  Plus,
  Search,
  SlidersHorizontal,
  Trash2,
  Wallet,
  X,
} from "lucide-react";
import { useTransaction } from "../../../context/TransactionContext";

const initialTransactions = [
  {
    id: 1,
    title: "Salary",
    category: "Salary",
    type: "income",
    amount: 85000,
    date: "2026-09-01",
    account: "Bank Account",
    status: "Completed",
    image: "/images/categories/salary.webp",
  },
  {
    id: 2,
    title: "Amazon Shopping",
    category: "Shopping",
    type: "expense",
    amount: 2499,
    date: "2026-09-02",
    account: "HDFC Card",
    status: "Completed",
    image: "/images/categories/shopping.webp",
  },
  {
    id: 3,
    title: "Grocery Store",
    category: "Food",
    type: "expense",
    amount: 1850,
    date: "2026-09-03",
    account: "UPI",
    status: "Completed",
    image: "/images/categories/food.webp",
  },
  {
    id: 4,
    title: "Freelance Project",
    category: "Freelance",
    type: "income",
    amount: 18000,
    date: "2026-09-04",
    account: "Bank Account",
    status: "Completed",
    image: "/images/categories/freelance.webp",
  },
  {
    id: 5,
    title: "Netflix",
    category: "Entertainment",
    type: "expense",
    amount: 649,
    date: "2026-09-05",
    account: "HDFC Card",
    status: "Completed",
    image: "/images/categories/entertainment.webp",
  },
  {
    id: 6,
    title: "Uber",
    category: "Transport",
    type: "expense",
    amount: 480,
    date: "2026-09-05",
    account: "UPI",
    status: "Completed",
    image: "/images/categories/transport.webp",
  },
  {
    id: 7,
    title: "Electricity Bill",
    category: "Bills",
    type: "expense",
    amount: 2200,
    date: "2026-09-06",
    account: "Bank Account",
    status: "Completed",
    image: "/images/categories/bills.webp",
  },
  {
    id: 8,
    title: "Investment Return",
    category: "Investment",
    type: "income",
    amount: 5200,
    date: "2026-09-07",
    account: "Bank Account",
    status: "Completed",
    image: "/images/categories/investment.webp",
  },
  {
    id: 9,
    title: "Coffee Shop",
    category: "Food",
    type: "expense",
    amount: 320,
    date: "2026-09-07",
    account: "UPI",
    status: "Completed",
    image: "/images/categories/food.webp",
  },
  {
    id: 10,
    title: "Rent",
    category: "Housing",
    type: "expense",
    amount: 18000,
    date: "2026-09-08",
    account: "Bank Account",
    status: "Completed",
    image: "/images/categories/housing.webp",
  },
  {
    id: 11,
    title: "Client Payment",
    category: "Freelance",
    type: "income",
    amount: 12500,
    date: "2026-09-08",
    account: "Bank Account",
    status: "Completed",
    image: "/images/categories/freelance.webp",
  },
  {
    id: 12,
    title: "Fuel",
    category: "Transport",
    type: "expense",
    amount: 1800,
    date: "2026-09-09",
    account: "HDFC Card",
    status: "Completed",
    image: "/images/categories/transport.webp",
  },
  {
    id: 13,
    title: "Restaurant",
    category: "Food",
    type: "expense",
    amount: 1450,
    date: "2026-09-09",
    account: "UPI",
    status: "Completed",
    image: "/images/categories/food.webp",
  },
  {
    id: 14,
    title: "Bonus",
    category: "Salary",
    type: "income",
    amount: 10000,
    date: "2026-09-10",
    account: "Bank Account",
    status: "Completed",
    image: "/images/categories/salary.webp",
  },
  {
    id: 15,
    title: "Mobile Recharge",
    category: "Bills",
    type: "expense",
    amount: 799,
    date: "2026-09-10",
    account: "UPI",
    status: "Completed",
    image: "/images/categories/bills.webp",
  },
  {
    id: 16,
    title: "Gym Membership",
    category: "Health",
    type: "expense",
    amount: 1200,
    date: "2026-09-10",
    account: "HDFC Card",
    status: "Completed",
    image: "/images/categories/health.webp",
  },
  {
    id: 17,
    title: "Stock Dividend",
    category: "Investment",
    type: "income",
    amount: 3400,
    date: "2026-09-11",
    account: "Bank Account",
    status: "Completed",
    image: "/images/categories/investment.webp",
  },
  {
    id: 18,
    title: "Shopping",
    category: "Shopping",
    type: "expense",
    amount: 3200,
    date: "2026-09-11",
    account: "HDFC Card",
    status: "Completed",
    image: "/images/categories/shopping.webp",
  },
];

const categories = [
  "All categories",
  "Food",
  "Shopping",
  "Transport",
  "Bills",
  "Entertainment",
  "Housing",
  "Health",
  "Salary",
  "Freelance",
  "Investment",
];

const formatCurrency = (amount) =>
  new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
    maximumFractionDigits: 0,
  }).format(amount);

const formatDate = (date) =>
  new Intl.DateTimeFormat("en-IN", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  }).format(new Date(date));

const Transactions = () => {
  // const [transactions, setTransactions] = useState(initialTransactions);

  const [search, setSearch] = useState("");
  const [type, setType] = useState("all");
  const [category, setCategory] = useState("All categories");
  const [date, setDate] = useState("");
  const [showFilters, setShowFilters] = useState(false);
  const [selectedIds, setSelectedIds] = useState([]);
  const [page, setPage] = useState(1);

  const navigate = useNavigate();

  const { transactions, getTransactions, setTransactions } = useTransaction();

  const itemsPerPage = 10;

  useEffect(() => {
    getTransactions({
      page: 1,
      limit: 20,
    });
  }, []);

  /* =========================================
     FILTER
  ========================================= */

  const filteredTransactions = useMemo(() => {
    return transactions.filter((transaction) => {
      const searchValue = search.toLowerCase();

      const searchMatch =
        transaction.title.toLowerCase().includes(searchValue) ||
        transaction.category.toLowerCase().includes(searchValue) ||
        transaction.account.toLowerCase().includes(searchValue);

      const typeMatch = type === "all" || transaction.type === type;

      const categoryMatch =
        category === "All categories" || transaction.category === category;

      const dateMatch = !date || transaction.date === date;

      return searchMatch && typeMatch && categoryMatch && dateMatch;
    });
  }, [transactions, search, type, category, date]);

  /* =========================================
     PAGINATION
  ========================================= */

  const totalPages = Math.max(
    1,
    Math.ceil(filteredTransactions.length / itemsPerPage),
  );

  const currentPage = Math.min(page, totalPages);

  const paginatedTransactions = filteredTransactions.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage,
  );

  /* =========================================
     SELECTION
  ========================================= */

  const pageIds = paginatedTransactions.map((transaction) => transaction.id);

  const allPageSelected =
    pageIds.length > 0 && pageIds.every((id) => selectedIds.includes(id));

  const toggleSelect = (id) => {
    setSelectedIds((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id],
    );
  };

  const toggleSelectAll = () => {
    if (allPageSelected) {
      setSelectedIds((prev) => prev.filter((id) => !pageIds.includes(id)));
    } else {
      setSelectedIds((prev) => [...new Set([...prev, ...pageIds])]);
    }
  };

  /* =========================================
     DELETE
  ========================================= */

  const deleteSelected = () => {
    if (!selectedIds.length) return;

    setTransactions((prev) =>
      prev.filter((transaction) => !selectedIds.includes(transaction.id)),
    );

    setSelectedIds([]);
    setPage(1);
  };

  /* =========================================
     FILTER RESET
  ========================================= */

  const resetFilters = () => {
    setSearch("");
    setType("all");
    setCategory("All categories");
    setDate("");
    setPage(1);
  };

  const hasFilters =
    search || type !== "all" || category !== "All categories" || date;

  /* =========================================
     SUMMARY
  ========================================= */

  const totalIncome = transactions
    .filter((item) => item.type === "income")
    .reduce((sum, item) => sum + item.amount, 0);

  const totalExpense = transactions
    .filter((item) => item.type === "expense")
    .reduce((sum, item) => sum + item.amount, 0);

  const netBalance = totalIncome - totalExpense;

  return (
    <div className="space-y-5">
      {/* HEADER */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <p className="text-[10px] font-semibold uppercase tracking-[0.12em] text-primary">
            Finance
          </p>

          <h1 className="mt-1 text-2xl font-semibold tracking-[-0.03em] text-foreground">
            Transactions
          </h1>

          <p className="mt-1 text-xs text-secondary">
            View and manage all your income and expenses.
          </p>
        </div>

        <button
          type="button"
          onClick={() => navigate("/expenses/new")}
          className="btn-primary flex h-9 w-full items-center justify-center gap-2 rounded-lg px-4 text-xs font-medium sm:w-auto"
        >
          <Plus size={15} />
          Add transaction
        </button>
      </div>

      {/* SUMMARY */}
      <div className="grid grid-cols-2 gap-3 lg:grid-cols-4">
        <SummaryCard
          label="Transactions"
          value={transactions.length}
          icon={<CreditCard size={16} />}
        />

        <SummaryCard
          label="Income"
          value={formatCurrency(totalIncome)}
          icon={<Wallet size={16} />}
          type="income"
        />

        <SummaryCard
          label="Expenses"
          value={formatCurrency(totalExpense)}
          icon={<CircleDollarSign size={16} />}
          type="expense"
        />

        <SummaryCard
          label="Net balance"
          value={formatCurrency(netBalance)}
          icon={<Wallet size={16} />}
          type={netBalance >= 0 ? "income" : "expense"}
        />
      </div>

      {/* TABLE CARD */}
      <section className="card overflow-hidden">
        {/* TOOLBAR */}
        <div className="border-b border-border p-4">
          <div className="flex flex-col gap-3 lg:flex-row lg:items-center lg:justify-between">
            {/* SEARCH */}
            <div className="relative w-full lg:max-w-sm">
              <Search
                size={15}
                className="absolute left-3 top-1/2 -translate-y-1/2 text-muted"
              />

              <input
                type="text"
                value={search}
                onChange={(e) => {
                  setSearch(e.target.value);
                  setPage(1);
                }}
                placeholder="Search transactions..."
                className="h-9 w-full rounded-lg border border-border bg-card-secondary pl-9 pr-9 text-xs text-foreground outline-none transition placeholder:text-muted focus:border-primary focus:ring-2 focus:ring-primary/10"
              />

              {search && (
                <button
                  type="button"
                  onClick={() => setSearch("")}
                  className="absolute right-2.5 top-1/2 -translate-y-1/2 text-muted hover:text-foreground"
                >
                  <X size={14} />
                </button>
              )}
            </div>

            {/* DESKTOP FILTERS */}
            <div className="hidden items-center gap-2 lg:flex">
              <FilterSelect
                value={type}
                onChange={(value) => {
                  setType(value);
                  setPage(1);
                }}
                options={[
                  { value: "all", label: "All types" },
                  { value: "income", label: "Income" },
                  { value: "expense", label: "Expenses" },
                ]}
              />

              <FilterSelect
                value={category}
                onChange={(value) => {
                  setCategory(value);
                  setPage(1);
                }}
                options={categories.map((item) => ({
                  value: item,
                  label: item,
                }))}
              />

              <div className="relative">
                <CalendarDays
                  size={14}
                  className="absolute left-3 top-1/2 -translate-y-1/2 text-muted"
                />

                <input
                  type="date"
                  value={date}
                  onChange={(e) => {
                    setDate(e.target.value);
                    setPage(1);
                  }}
                  className="h-9 rounded-lg border border-border bg-card-secondary pl-9 pr-3 text-[11px] text-foreground outline-none focus:border-primary"
                />
              </div>

              {hasFilters && (
                <button
                  type="button"
                  onClick={resetFilters}
                  className="h-9 rounded-lg px-3 text-[11px] font-medium text-muted hover:bg-card-secondary hover:text-foreground"
                >
                  Clear
                </button>
              )}
            </div>

            {/* MOBILE FILTER */}
            <button
              type="button"
              onClick={() => setShowFilters((prev) => !prev)}
              className={`flex h-9 items-center justify-center gap-2 rounded-lg border px-3 text-[11px] font-medium lg:hidden ${
                showFilters || hasFilters
                  ? "border-primary/30 bg-primary/5 text-primary"
                  : "border-border text-secondary"
              }`}
            >
              <SlidersHorizontal size={14} />
              Filters
              {hasFilters && (
                <span className="flex h-4 min-w-4 items-center justify-center rounded-full bg-primary px-1 text-[8px] text-primary-foreground">
                  !
                </span>
              )}
            </button>
          </div>

          {/* MOBILE FILTERS */}
          {showFilters && (
            <div className="mt-3 grid grid-cols-1 gap-2 border-t border-border pt-3 sm:grid-cols-3 lg:hidden">
              <FilterSelect
                value={type}
                onChange={(value) => {
                  setType(value);
                  setPage(1);
                }}
                options={[
                  { value: "all", label: "All types" },
                  { value: "income", label: "Income" },
                  { value: "expense", label: "Expenses" },
                ]}
                full
              />

              <FilterSelect
                value={category}
                onChange={(value) => {
                  setCategory(value);
                  setPage(1);
                }}
                options={categories.map((item) => ({
                  value: item,
                  label: item,
                }))}
                full
              />

              <div className="relative">
                <CalendarDays
                  size={14}
                  className="absolute left-3 top-1/2 -translate-y-1/2 text-muted"
                />

                <input
                  type="date"
                  value={date}
                  onChange={(e) => {
                    setDate(e.target.value);
                    setPage(1);
                  }}
                  className="h-9 w-full rounded-lg border border-border bg-card-secondary pl-9 pr-3 text-[11px] text-foreground outline-none focus:border-primary"
                />
              </div>
            </div>
          )}
        </div>

        {/* SELECTION BAR */}
        {selectedIds.length > 0 && (
          <div className="flex items-center justify-between border-b border-danger/10 bg-danger/5 px-4 py-2.5">
            <div className="flex items-center gap-2">
              <span className="flex h-5 min-w-5 items-center justify-center rounded-full bg-danger px-1 text-[9px] font-semibold text-white">
                {selectedIds.length}
              </span>

              <span className="text-[10px] font-medium text-danger">
                {selectedIds.length} transaction
                {selectedIds.length > 1 ? "s" : ""} selected
              </span>
            </div>

            <button
              type="button"
              onClick={deleteSelected}
              className="flex h-7 items-center gap-1.5 rounded-lg bg-danger px-2.5 text-[10px] font-medium text-white transition hover:opacity-90"
            >
              <Trash2 size={13} />
              Delete
            </button>
          </div>
        )}

        {/* RESULT INFO */}
        <div className="flex items-center justify-between border-b border-border px-4 py-3">
          <div>
            <p className="text-[11px] font-medium text-foreground">
              All transactions
            </p>

            <p className="mt-0.5 text-[9px] text-muted">
              {filteredTransactions.length} results found
            </p>
          </div>

          <div className="hidden items-center gap-1.5 text-[9px] text-muted sm:flex">
            <CircleDollarSign size={12} />
            Updated just now
          </div>
        </div>

        {/* TABLE */}
        <div className="overflow-x-auto">
          <table className="w-full min-w-[850px]">
            <thead>
              <tr className="border-b border-border bg-card-secondary/40">
                <th className="w-12 px-4 py-3">
                  <Checkbox
                    checked={allPageSelected}
                    onChange={toggleSelectAll}
                  />
                </th>

                <TableHead>Transaction</TableHead>
                <TableHead>Category</TableHead>
                <TableHead>Date</TableHead>
                <TableHead>Account</TableHead>
                <TableHead>Status</TableHead>
                <TableHead align="right">Amount</TableHead>
              </tr>
            </thead>

            <tbody>
              {paginatedTransactions.length > 0 ? (
                paginatedTransactions.map((transaction) => (
                  <TransactionRow
                    key={transaction.id}
                    transaction={transaction}
                    selected={selectedIds.includes(transaction.id)}
                    onSelect={() => toggleSelect(transaction.id)}
                  />
                ))
              ) : (
                <tr>
                  <td colSpan="7" className="px-4 py-16 text-center">
                    <div className="mx-auto flex max-w-xs flex-col items-center">
                      <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-card-secondary text-muted">
                        <Search size={18} />
                      </div>

                      <p className="mt-3 text-xs font-medium text-foreground">
                        No transactions found
                      </p>

                      <p className="mt-1 text-[10px] text-muted">
                        Try changing your search or filters.
                      </p>

                      {hasFilters && (
                        <button
                          type="button"
                          onClick={resetFilters}
                          className="mt-3 text-[10px] font-medium text-primary hover:underline"
                        >
                          Clear filters
                        </button>
                      )}
                    </div>
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        {/* PAGINATION */}
        <div className="flex flex-col gap-3 border-t border-border px-4 py-3 sm:flex-row sm:items-center sm:justify-between">
          <p className="text-[10px] text-muted">
            Showing{" "}
            <span className="font-medium text-foreground">
              {filteredTransactions.length === 0
                ? 0
                : (currentPage - 1) * itemsPerPage + 1}
            </span>
            {" - "}
            <span className="font-medium text-foreground">
              {Math.min(
                currentPage * itemsPerPage,
                filteredTransactions.length,
              )}
            </span>{" "}
            of{" "}
            <span className="font-medium text-foreground">
              {filteredTransactions.length}
            </span>
          </p>

          <div className="flex items-center justify-between gap-2 sm:justify-end">
            <button
              type="button"
              disabled={currentPage === 1}
              onClick={() => setPage((prev) => Math.max(1, prev - 1))}
              className="flex h-8 items-center gap-1 rounded-lg border border-border px-2.5 text-[10px] font-medium text-secondary transition hover:bg-card-secondary disabled:cursor-not-allowed disabled:opacity-40"
            >
              <ChevronLeft size={14} />
              <span className="hidden sm:inline">Previous</span>
            </button>

            <div className="flex items-center gap-1">
              {Array.from({ length: totalPages }, (_, index) => index + 1).map(
                (number) => (
                  <button
                    key={number}
                    type="button"
                    onClick={() => setPage(number)}
                    className={`flex h-8 min-w-8 items-center justify-center rounded-lg px-2 text-[10px] font-medium transition ${
                      currentPage === number
                        ? "bg-primary text-primary-foreground"
                        : "text-muted hover:bg-card-secondary hover:text-foreground"
                    }`}
                  >
                    {number}
                  </button>
                ),
              )}
            </div>

            <button
              type="button"
              disabled={currentPage === totalPages}
              onClick={() => setPage((prev) => Math.min(totalPages, prev + 1))}
              className="flex h-8 items-center gap-1 rounded-lg border border-border px-2.5 text-[10px] font-medium text-secondary transition hover:bg-card-secondary disabled:cursor-not-allowed disabled:opacity-40"
            >
              <span className="hidden sm:inline">Next</span>

              <ChevronRight size={14} />
            </button>
          </div>
        </div>
      </section>
    </div>
  );
};

/* =========================================
   IMAGE COMPONENT
========================================= */

const CategoryImage = ({ transaction }) => {
  const [imageError, setImageError] = useState(false);

  const isIncome = transaction.type === "income";

  if (imageError) {
    return (
      <div
        className={`flex h-10 w-10 shrink-0 items-center justify-center overflow-hidden rounded-xl ${
          isIncome
            ? "bg-success-muted text-success"
            : "bg-danger-muted text-danger"
        }`}
      >
        <CircleDollarSign size={18} strokeWidth={1.8} />
      </div>
    );
  }

  return (
    <div
      className={`h-10 w-10 shrink-0 overflow-hidden rounded-xl border ${
        isIncome ? "border-success/15" : "border-danger/15"
      } bg-card-secondary shadow-sm`}
    >
      <img
        src={transaction.image || <X/>}
        alt={transaction.category}
        onError={() => setImageError(true)}
        className="h-full w-full object-cover transition duration-300 group-hover:scale-110"
      />
    </div>
  );
};

/* =========================================
   CHECKBOX
========================================= */

const Checkbox = ({ checked, onChange }) => (
  <button
    type="button"
    onClick={onChange}
    aria-label={checked ? "Deselect" : "Select"}
    className={`flex h-4 w-4 items-center justify-center rounded-[5px] border transition-all ${
      checked
        ? "border-primary bg-primary text-primary-foreground"
        : "border-border bg-background hover:border-primary/50"
    }`}
  >
    {checked && <Check size={11} strokeWidth={3} />}
  </button>
);

/* =========================================
   SUMMARY CARD
========================================= */

const SummaryCard = ({ label, value, icon, type }) => {
  const color =
    type === "income"
      ? "text-success"
      : type === "expense"
        ? "text-danger"
        : "text-foreground";

  const bg =
    type === "income"
      ? "bg-success-muted"
      : type === "expense"
        ? "bg-danger-muted"
        : "bg-card-secondary";

  return (
    <div className="card p-4">
      <div className="flex items-center justify-between">
        <div
          className={`flex h-8 w-8 items-center justify-center rounded-lg ${bg} ${color}`}
        >
          {icon}
        </div>

        {type && (
          <span className={`text-[9px] font-medium ${color}`}>
            {type === "income" ? "Income" : "Expense"}
          </span>
        )}
      </div>

      <p className="mt-3 text-[10px] text-muted">{label}</p>

      <p
        className={`mt-0.5 truncate text-sm font-semibold tracking-[-0.02em] ${color}`}
      >
        {value}
      </p>
    </div>
  );
};

/* =========================================
   FILTER SELECT
========================================= */

const FilterSelect = ({ value, onChange, options, full = false }) => (
  <div className={`relative ${full ? "w-full" : ""}`}>
    <select
      value={value}
      onChange={(e) => onChange(e.target.value)}
      className={`h-9 appearance-none rounded-lg border border-border bg-card-secondary pl-3 pr-8 text-[11px] text-foreground outline-none transition focus:border-primary ${
        full ? "w-full" : "min-w-32"
      }`}
    >
      {options.map((option) => (
        <option key={option.value} value={option.value}>
          {option.label}
        </option>
      ))}
    </select>

    <ChevronDown
      size={13}
      className="pointer-events-none absolute right-2.5 top-1/2 -translate-y-1/2 text-muted"
    />
  </div>
);

/* =========================================
   TABLE HEAD
========================================= */

const TableHead = ({ children, align }) => (
  <th
    className={`px-4 py-3 text-[9px] font-semibold uppercase tracking-[0.08em] text-muted ${
      align === "right" ? "text-right" : "text-left"
    }`}
  >
    {children}
  </th>
);

/* =========================================
   TRANSACTION ROW
========================================= */

const TransactionRow = ({ transaction, selected, onSelect }) => {
  const isIncome = transaction.type === "income";

  return (
    <tr
      className={`group border-b border-border last:border-0 transition-colors ${
        selected ? "bg-primary/[0.035]" : "hover:bg-card-secondary/50"
      }`}
    >
      {/* Checkbox */}
      <td className="w-12 px-4 py-3.5">
        <Checkbox checked={selected} onChange={onSelect} />
      </td>

      {/* Transaction + Image */}
      <td className="px-4 py-3.5">
        <div className="flex items-center gap-3">
          <CategoryImage transaction={transaction} />

          <div className="min-w-0">
            <p className="truncate text-xs font-medium text-foreground">
              {transaction.title}
            </p>

            <p className="mt-0.5 text-[9px] text-muted">
              #{String(transaction.id).padStart(4, "0")}
            </p>
          </div>
        </div>
      </td>

      {/* Category */}
      <td className="px-4 py-3.5">
        <span
          className={`inline-flex rounded-full px-2.5 py-1 text-[9px] font-medium ${
            isIncome
              ? "bg-success-muted text-success"
              : "bg-danger-muted text-danger"
          }`}
        >
          {transaction.category}
        </span>
      </td>

      {/* Date */}
      <td className="px-4 py-3.5 text-[10px] text-secondary">
        {formatDate(transaction.date)}
      </td>

      {/* Account */}
      <td className="px-4 py-3.5">
        <div className="flex items-center gap-2">
          <CreditCard size={13} className="text-muted" />

          <span className="text-[10px] text-secondary">
            {transaction.account}
          </span>
        </div>
      </td>

      {/* Status */}
      <td className="px-4 py-3.5">
        <span className="inline-flex items-center gap-1.5 rounded-full bg-success-muted px-2.5 py-1 text-[9px] font-medium text-success">
          <span className="h-1.5 w-1.5 rounded-full bg-success" />
          {transaction.status}
        </span>
      </td>

      {/* Amount */}
      <td className="px-4 py-3.5 text-right">
        <p
          className={`text-xs font-semibold ${
            isIncome ? "text-success" : "text-danger"
          }`}
        >
          {isIncome ? "+" : "-"}
          {formatCurrency(transaction.amount)}
        </p>

        <p
          className={`mt-0.5 text-[9px] capitalize ${
            isIncome ? "text-success/70" : "text-danger/70"
          }`}
        >
          {transaction.type}
        </p>
      </td>
    </tr>
  );
};

export default Transactions;
