import React, { useMemo, useState } from "react";
import {
  AlertTriangle,
  ArrowUpRight,
  BriefcaseBusiness,
  CalendarDays,
  Check,
  ChevronDown,
  ChevronLeft,
  ChevronRight,
  CircleDollarSign,
  Ellipsis,
  Filter,
  Gift,
  Loader2,
  MoreHorizontal,
  Search,
  Sparkles,
  Trash2,
  TrendingUp,
  Wallet,
} from "lucide-react";

/* =========================================
   DUMMY INCOME DATA
========================================= */

const initialIncome = [
  {
    id: 1,
    title: "Monthly Salary",
    category: "Salary",
    amount: 85000,
    date: "Sep 01, 2026",
    account: "Bank Account",
    icon: BriefcaseBusiness,
    color: "bg-emerald-50 text-emerald-600",
  },
  {
    id: 2,
    title: "Freelance Project",
    category: "Freelance",
    amount: 18500,
    date: "Aug 29, 2026",
    account: "Bank Account",
    icon: Wallet,
    color: "bg-blue-50 text-blue-600",
  },
  {
    id: 3,
    title: "Stock Dividend",
    category: "Investment",
    amount: 4200,
    date: "Aug 27, 2026",
    account: "Bank Account",
    icon: TrendingUp,
    color: "bg-violet-50 text-violet-600",
  },
  {
    id: 4,
    title: "Freelance Website",
    category: "Freelance",
    amount: 12000,
    date: "Aug 24, 2026",
    account: "UPI",
    icon: Wallet,
    color: "bg-blue-50 text-blue-600",
  },
  {
    id: 5,
    title: "Cashback",
    category: "Other",
    amount: 850,
    date: "Aug 21, 2026",
    account: "Credit Card",
    icon: Gift,
    color: "bg-pink-50 text-pink-600",
  },
  {
    id: 6,
    title: "Monthly Salary",
    category: "Salary",
    amount: 85000,
    date: "Aug 01, 2026",
    account: "Bank Account",
    icon: BriefcaseBusiness,
    color: "bg-emerald-50 text-emerald-600",
  },
  {
    id: 7,
    title: "Investment Return",
    category: "Investment",
    amount: 6500,
    date: "Jul 28, 2026",
    account: "Bank Account",
    icon: TrendingUp,
    color: "bg-violet-50 text-violet-600",
  },
  {
    id: 8,
    title: "Freelance App Project",
    category: "Freelance",
    amount: 22000,
    date: "Jul 22, 2026",
    account: "UPI",
    icon: Wallet,
    color: "bg-blue-50 text-blue-600",
  },
  {
    id: 9,
    title: "Performance Bonus",
    category: "Bonus",
    amount: 15000,
    date: "Jul 15, 2026",
    account: "Bank Account",
    icon: Gift,
    color: "bg-orange-50 text-orange-600",
  },
  {
    id: 10,
    title: "Monthly Salary",
    category: "Salary",
    amount: 85000,
    date: "Jul 01, 2026",
    account: "Bank Account",
    icon: BriefcaseBusiness,
    color: "bg-emerald-50 text-emerald-600",
  },
  {
    id: 11,
    title: "Freelance Design",
    category: "Freelance",
    amount: 9000,
    date: "Jun 26, 2026",
    account: "UPI",
    icon: Wallet,
    color: "bg-blue-50 text-blue-600",
  },
  {
    id: 12,
    title: "Investment Dividend",
    category: "Investment",
    amount: 3800,
    date: "Jun 20, 2026",
    account: "Bank Account",
    icon: TrendingUp,
    color: "bg-violet-50 text-violet-600",
  },
];

/* =========================================
   CATEGORY OPTIONS
========================================= */

const categoryOptions = [
  "All categories",
  "Salary",
  "Freelance",
  "Investment",
  "Bonus",
  "Other",
];

/* =========================================
   INCOME PAGE
========================================= */

const Income = () => {
  const [income, setIncome] = useState(initialIncome);

  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("All categories");

  const [page, setPage] = useState(1);
  const perPage = 8;

  const [selectedIncome, setSelectedIncome] = useState([]);

  const [deletingId, setDeletingId] = useState(null);
  const [deletingSelected, setDeletingSelected] =
    useState(false);

  const [error, setError] = useState("");

  /* =========================================
     FILTER
  ========================================= */

  const filteredIncome = useMemo(() => {
    return income.filter((item) => {
      const searchValue = search
        .toLowerCase()
        .trim();

      const matchesSearch =
        !searchValue ||
        item.title
          .toLowerCase()
          .includes(searchValue) ||
        item.category
          .toLowerCase()
          .includes(searchValue) ||
        item.account
          .toLowerCase()
          .includes(searchValue);

      const matchesCategory =
        category === "All categories" ||
        item.category === category;

      return matchesSearch && matchesCategory;
    });
  }, [income, search, category]);

  /* =========================================
     PAGINATION
  ========================================= */

  const totalPages = Math.max(
    1,
    Math.ceil(filteredIncome.length / perPage)
  );

  const visibleIncome = filteredIncome.slice(
    (page - 1) * perPage,
    page * perPage
  );

  /* =========================================
     STATS
  ========================================= */

  const totalIncome = income.reduce(
    (sum, item) => sum + item.amount,
    0
  );

  const salaryIncome = income
    .filter((item) => item.category === "Salary")
    .reduce((sum, item) => sum + item.amount, 0);

  const freelanceIncome = income
    .filter((item) => item.category === "Freelance")
    .reduce((sum, item) => sum + item.amount, 0);

  const highestIncome =
    income.length > 0
      ? Math.max(
          ...income.map((item) => item.amount)
        )
      : 0;

  /* =========================================
     SELECTION
  ========================================= */

  const allVisibleSelected =
    visibleIncome.length > 0 &&
    visibleIncome.every((item) =>
      selectedIncome.includes(item.id)
    );

  const toggleIncome = (id) => {
    setSelectedIncome((prev) =>
      prev.includes(id)
        ? prev.filter((item) => item !== id)
        : [...prev, id]
    );
  };

  const handleSelectAll = () => {
    if (allVisibleSelected) {
      setSelectedIncome((prev) =>
        prev.filter(
          (id) =>
            !visibleIncome.some(
              (item) => item.id === id
            )
        )
      );

      return;
    }

    setSelectedIncome((prev) => [
      ...new Set([
        ...prev,
        ...visibleIncome.map((item) => item.id),
      ]),
    ]);
  };

  /* =========================================
     DELETE ONE
  ========================================= */

  const handleDeleteIncome = async (id) => {
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
       * await deleteIncomeApi(id);
       *
       */

      await new Promise((resolve) =>
        setTimeout(resolve, 400)
      );

      setIncome((prev) =>
        prev.filter((item) => item.id !== id)
      );

      setSelectedIncome((prev) =>
        prev.filter((item) => item !== id)
      );

      const remaining =
        filteredIncome.length - 1;

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
          "Failed to delete income."
      );
    } finally {
      setDeletingId(null);
    }
  };

  /* =========================================
     DELETE SELECTED
  ========================================= */

  const handleDeleteSelected = async () => {
    if (!selectedIncome.length) return;

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
       *   selectedIncome.map((id) =>
       *     deleteIncomeApi(id)
       *   )
       * );
       *
       */

      await new Promise((resolve) =>
        setTimeout(resolve, 500)
      );

      setIncome((prev) =>
        prev.filter(
          (item) =>
            !selectedIncome.includes(item.id)
        )
      );

      setSelectedIncome([]);

      const remaining =
        filteredIncome.length -
        selectedIncome.length;

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
          "Failed to delete selected income."
      );
    } finally {
      setDeletingSelected(false);
    }
  };

  /* =========================================
     SEARCH / FILTER
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
            Income
          </h1>

          <p className="mt-1 text-xs text-muted">
            Track your earnings and incoming money.
          </p>
        </div>

        <button
          type="button"
          className="btn-primary flex h-9 w-full items-center justify-center gap-2 px-4 text-xs font-medium sm:w-auto"
        >
          <ArrowUpRight size={15} />
          Add income
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
          title="Total income"
          value={`₹${totalIncome.toLocaleString(
            "en-IN"
          )}`}
          subtitle="Tracked income"
          icon={CircleDollarSign}
          iconClass="bg-success-muted text-success"
        />

        <StatCard
          title="Salary"
          value={`₹${salaryIncome.toLocaleString(
            "en-IN"
          )}`}
          subtitle="Salary income"
          icon={BriefcaseBusiness}
          iconClass="bg-emerald-50 text-emerald-600"
        />

        <StatCard
          title="Freelance"
          value={`₹${freelanceIncome.toLocaleString(
            "en-IN"
          )}`}
          subtitle="Side income"
          icon={Wallet}
          iconClass="bg-blue-50 text-blue-600"
        />

        <StatCard
          title="Largest income"
          value={`₹${highestIncome.toLocaleString(
            "en-IN"
          )}`}
          subtitle="Single transaction"
          icon={TrendingUp}
          iconClass="bg-violet-50 text-violet-600"
        />
      </div>

      {/* =====================================
          AI ANALYSIS
      ====================================== */}

      <section className="overflow-hidden rounded-2xl border border-success/10 bg-gradient-to-br from-success-muted via-card to-card p-4 shadow-sm sm:p-5">
        <div className="flex gap-3">
          <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-success text-white shadow-sm">
            <Sparkles size={18} />
          </div>

          <div className="min-w-0 flex-1">
            <div className="flex flex-wrap items-center gap-2">
              <h2 className="text-sm font-semibold text-foreground">
                AI income analysis
              </h2>

              <span className="rounded-full bg-success/10 px-2 py-0.5 text-[8px] font-semibold tracking-wide text-success">
                AI INSIGHT
              </span>
            </div>

            <p className="mt-1.5 text-[11px] leading-5 text-secondary sm:text-xs">
              Your primary income source is salary, while
              freelance work adds a healthy secondary
              stream. Increasing recurring freelance income
              could strengthen your monthly cash flow.
            </p>

            <div className="mt-3 grid grid-cols-1 gap-2 sm:grid-cols-3">
              <Insight
                label="Primary source"
                value="Salary"
                icon={BriefcaseBusiness}
              />

              <Insight
                label="Side income"
                value={`₹${freelanceIncome.toLocaleString(
                  "en-IN"
                )}`}
                icon={Wallet}
              />

              <Insight
                label="Growth opportunity"
                value="Freelance"
                icon={TrendingUp}
              />
            </div>
          </div>
        </div>
      </section>

      {/* =====================================
          INCOME TABLE
      ====================================== */}

      <section className="card overflow-hidden">
        {/* ===================================
            TABLE HEADER
        ==================================== */}

        <div className="flex flex-col gap-3 border-b border-border p-4 sm:p-5 lg:flex-row lg:items-center lg:justify-between">
          <div className="min-w-0">
            <h2 className="text-sm font-semibold text-foreground">
              All income
            </h2>

            <p className="mt-0.5 text-[10px] text-muted">
              {filteredIncome.length} transactions found
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
                placeholder="Search income..."
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

        {selectedIncome.length > 0 && (
          <div className="flex items-center justify-between gap-3 border-b border-danger/10 bg-danger-muted px-4 py-2.5 sm:px-5">
            <div className="flex min-w-0 items-center gap-2">
              <div className="flex h-5 w-5 shrink-0 items-center justify-center rounded-md bg-danger text-white">
                <Check
                  size={11}
                  strokeWidth={3}
                />
              </div>

              <p className="truncate text-[10px] font-medium text-danger">
                {selectedIncome.length} selected
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
                {deletingSelected ? "..." : "Delete"}
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
                <th className="w-12 px-4 py-3">
                  <CheckBox
                    checked={allVisibleSelected}
                    onClick={handleSelectAll}
                  />
                </th>

                <th className="px-3 py-3 text-left text-[10px] font-medium text-muted">
                  Income
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
              {visibleIncome.map((item) => {
                const selected =
                  selectedIncome.includes(item.id);

                return (
                  <IncomeRow
                    key={item.id}
                    item={item}
                    selected={selected}
                    deleting={
                      deletingId === item.id
                    }
                    onSelect={() =>
                      toggleIncome(item.id)
                    }
                    onDelete={() =>
                      handleDeleteIncome(item.id)
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
          {visibleIncome.map((item) => {
            const selected =
              selectedIncome.includes(item.id);

            return (
              <MobileIncomeRow
                key={item.id}
                item={item}
                selected={selected}
                deleting={
                  deletingId === item.id
                }
                onSelect={() =>
                  toggleIncome(item.id)
                }
                onDelete={() =>
                  handleDeleteIncome(item.id)
                }
              />
            );
          })}
        </div>

        {/* ===================================
            EMPTY STATE
        ==================================== */}

        {!visibleIncome.length && (
          <div className="flex flex-col items-center justify-center px-5 py-14 text-center">
            <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-surface text-muted">
              <Search size={18} />
            </div>

            <p className="mt-3 text-xs font-medium text-foreground">
              No income found
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

        {filteredIncome.length > 0 && (
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
                  filteredIncome.length
                )}
              </span>{" "}
              of{" "}
              <span className="font-medium text-foreground">
                {filteredIncome.length}
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
          ? "Deselect income"
          : "Select income"
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
   DESKTOP INCOME ROW
========================================= */

const IncomeRow = ({
  item,
  selected,
  deleting,
  onSelect,
  onDelete,
}) => {
  const Icon = item.icon;

  return (
    <tr
      className={`group transition ${
        selected
          ? "bg-success-muted/40"
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

      {/* Income */}

      <td className="px-3 py-3.5">
        <div className="flex items-center gap-3">
          <div
            className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-xl ${item.color}`}
          >
            <Icon size={16} />
          </div>

          <div className="min-w-0">
            <p className="truncate text-xs font-medium text-foreground">
              {item.title}
            </p>

            <p className="mt-0.5 text-[9px] text-muted">
              Income
            </p>
          </div>
        </div>
      </td>

      {/* Category */}

      <td className="px-4 py-3.5">
        <span className="inline-flex rounded-full bg-success-muted px-2.5 py-1 text-[9px] font-medium text-success">
          {item.category}
        </span>
      </td>

      {/* Date */}

      <td className="px-4 py-3.5">
        <div className="flex items-center gap-1.5 text-[10px] text-secondary">
          <CalendarDays
            size={12}
            className="text-muted"
          />

          {item.date}
        </div>
      </td>

      {/* Account */}

      <td className="px-4 py-3.5 text-[10px] text-secondary">
        {item.account}
      </td>

      {/* Amount */}

      <td className="px-5 py-3.5 text-right">
        <span className="text-xs font-semibold text-success">
          +₹{item.amount.toLocaleString("en-IN")}
        </span>
      </td>

      {/* Delete */}

      <td className="px-2 py-3.5">
        <button
          type="button"
          disabled={deleting}
          onClick={onDelete}
          className="flex h-7 w-7 items-center justify-center rounded-lg text-muted opacity-0 transition hover:bg-danger-muted hover:text-danger group-hover:opacity-100 disabled:opacity-100"
          title="Delete income"
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
   MOBILE INCOME ROW
========================================= */

const MobileIncomeRow = ({
  item,
  selected,
  deleting,
  onSelect,
  onDelete,
}) => {
  const Icon = item.icon;

  return (
    <div
      className={`flex items-center gap-2.5 px-3.5 py-3 ${
        selected ? "bg-success-muted/40" : ""
      }`}
    >
      {/* Checkbox */}

      <CheckBox
        checked={selected}
        onClick={onSelect}
      />

      {/* Icon */}

      <div
        className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-xl ${item.color}`}
      >
        <Icon size={15} />
      </div>

      {/* Details */}

      <div className="min-w-0 flex-1">
        <p className="truncate text-[11px] font-medium text-foreground">
          {item.title}
        </p>

        <div className="mt-0.5 flex items-center gap-1.5">
          <span className="truncate text-[9px] text-muted">
            {item.category}
          </span>

          <span className="h-1 w-1 shrink-0 rounded-full bg-surface-tertiary" />

          <span className="shrink-0 text-[9px] text-muted">
            {item.date}
          </span>
        </div>

        <p className="mt-0.5 truncate text-[9px] text-muted">
          {item.account}
        </p>
      </div>

      {/* Amount */}

      <div className="flex shrink-0 items-center gap-1">
        <p className="text-[11px] font-semibold text-success">
          +₹{item.amount.toLocaleString("en-IN")}
        </p>

        <button
          type="button"
          disabled={deleting}
          onClick={onDelete}
          className="flex h-7 w-7 items-center justify-center rounded-lg text-muted hover:bg-danger-muted hover:text-danger disabled:opacity-60"
          title="Delete income"
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
        className="shrink-0 text-success"
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

export default Income;