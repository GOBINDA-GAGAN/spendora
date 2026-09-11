import React, { useMemo, useState } from "react";
import { useForm } from "react-hook-form";
import {
  Banknote,
  BriefcaseBusiness,
  Building2,
  CalendarDays,
  Car,
  Check,
  ChevronDown,
  CircleDollarSign,
  Coffee,
  CreditCard,
  Film,
  Gift,
  HeartPulse,
  Home,
  MoreHorizontal,
  Plus,
  Receipt,
  ShoppingBag,
  Smartphone,
  Utensils,
  Wallet,
  X,
  Loader2,
  AlertCircle,
} from "lucide-react";

const expenseDefaults = [
  { name: "Food", icon: Utensils, color: "bg-orange-50 text-orange-600", active: "border-orange-200 bg-orange-50" },
  { name: "Shopping", icon: ShoppingBag, color: "bg-pink-50 text-pink-600", active: "border-pink-200 bg-pink-50" },
  { name: "Transport", icon: Car, color: "bg-blue-50 text-blue-600", active: "border-blue-200 bg-blue-50" },
  { name: "Bills", icon: Receipt, color: "bg-yellow-50 text-yellow-600", active: "border-yellow-200 bg-yellow-50" },
  { name: "Entertainment", icon: Film, color: "bg-purple-50 text-purple-600", active: "border-purple-200 bg-purple-50" },
  { name: "Housing", icon: Home, color: "bg-cyan-50 text-cyan-600", active: "border-cyan-200 bg-cyan-50" },
  { name: "Health", icon: HeartPulse, color: "bg-rose-50 text-rose-600", active: "border-rose-200 bg-rose-50" },
  { name: "Mobile", icon: Smartphone, color: "bg-indigo-50 text-indigo-600", active: "border-indigo-200 bg-indigo-50" },
  { name: "Coffee", icon: Coffee, color: "bg-amber-50 text-amber-700", active: "border-amber-200 bg-amber-50" },
  { name: "Other", icon: MoreHorizontal, color: "bg-slate-50 text-slate-600", active: "border-slate-200 bg-slate-50" },
];

const incomeDefaults = [
  { name: "Salary", icon: Banknote, color: "bg-emerald-50 text-emerald-600", active: "border-emerald-200 bg-emerald-50" },
  { name: "Freelance", icon: BriefcaseBusiness, color: "bg-blue-50 text-blue-600", active: "border-blue-200 bg-blue-50" },
  { name: "Investment", icon: Wallet, color: "bg-violet-50 text-violet-600", active: "border-violet-200 bg-violet-50" },
  { name: "Bonus", icon: Gift, color: "bg-amber-50 text-amber-600", active: "border-amber-200 bg-amber-50" },
  { name: "Business", icon: Building2, color: "bg-cyan-50 text-cyan-600", active: "border-cyan-200 bg-cyan-50" },
  { name: "Other", icon: MoreHorizontal, color: "bg-slate-50 text-slate-600", active: "border-slate-200 bg-slate-50" },
];

const iconOptions = [
  Utensils,
  ShoppingBag,
  Car,
  Receipt,
  Film,
  Home,
  HeartPulse,
  Smartphone,
  Coffee,
  Wallet,
  Gift,
  Building2,
];

const categoryColors = [
  { color: "bg-blue-50 text-blue-600", active: "border-blue-200 bg-blue-50" },
  { color: "bg-purple-50 text-purple-600", active: "border-purple-200 bg-purple-50" },
  { color: "bg-emerald-50 text-emerald-600", active: "border-emerald-200 bg-emerald-50" },
  { color: "bg-orange-50 text-orange-600", active: "border-orange-200 bg-orange-50" },
  { color: "bg-pink-50 text-pink-600", active: "border-pink-200 bg-pink-50" },
  { color: "bg-cyan-50 text-cyan-600", active: "border-cyan-200 bg-cyan-50" },
];

const recentTransactions = [
  { id: 1, title: "Monthly Salary", category: "Salary", type: "income", amount: 65000, date: "Sep 10", icon: Banknote, color: "bg-emerald-50 text-emerald-600" },
  { id: 2, title: "Amazon Shopping", category: "Shopping", type: "expense", amount: 2499, date: "Sep 10", icon: ShoppingBag, color: "bg-pink-50 text-pink-600" },
  { id: 3, title: "Lunch", category: "Food", type: "expense", amount: 420, date: "Sep 09", icon: Utensils, color: "bg-orange-50 text-orange-600" },
  { id: 4, title: "Freelance Project", category: "Freelance", type: "income", amount: 12000, date: "Sep 09", icon: BriefcaseBusiness, color: "bg-blue-50 text-blue-600" },
  { id: 5, title: "Netflix", category: "Entertainment", type: "expense", amount: 649, date: "Sep 08", icon: Film, color: "bg-purple-50 text-purple-600" },
  { id: 6, title: "Uber Ride", category: "Transport", type: "expense", amount: 380, date: "Sep 08", icon: Car, color: "bg-blue-50 text-blue-600" },
  { id: 7, title: "Electricity Bill", category: "Bills", type: "expense", amount: 1850, date: "Sep 07", icon: Receipt, color: "bg-yellow-50 text-yellow-600" },
  { id: 8, title: "Stock Dividend", category: "Investment", type: "income", amount: 3200, date: "Sep 06", icon: Wallet, color: "bg-violet-50 text-violet-600" },
  { id: 9, title: "Apartment Rent", category: "Housing", type: "expense", amount: 15000, date: "Sep 05", icon: Home, color: "bg-cyan-50 text-cyan-600" },
  { id: 10, title: "Pharmacy", category: "Health", type: "expense", amount: 760, date: "Sep 04", icon: HeartPulse, color: "bg-rose-50 text-rose-600" },
];

const NewExpense = () => {
  const [type, setType] = useState("expense");
  const [category, setCategory] = useState("Food");

  const [customExpenseCategories, setCustomExpenseCategories] = useState([]);
  const [customIncomeCategories, setCustomIncomeCategories] = useState([]);

  const [showCategoryModal, setShowCategoryModal] = useState(false);
  const [newCategoryIcon, setNewCategoryIcon] = useState(0);
  const [apiError, setApiError] = useState("");

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm({
    defaultValues: {
      amount: "",
      title: "",
      date: new Date().toISOString().split("T")[0],
      account: "Bank Account",
      note: "",
    },
  });

  const {
    register: registerCategory,
    handleSubmit: handleCategorySubmit,
    reset: resetCategory,
    formState: {
      errors: categoryErrors,
      isSubmitting: isCategorySubmitting,
    },
  } = useForm({
    defaultValues: {
      name: "",
    },
  });

  const categories = useMemo(() => {
    return type === "expense"
      ? [...expenseDefaults, ...customExpenseCategories]
      : [...incomeDefaults, ...customIncomeCategories];
  }, [type, customExpenseCategories, customIncomeCategories]);

  const handleTypeChange = (nextType) => {
    setType(nextType);
    setCategory(nextType === "expense" ? "Food" : "Salary");
    setApiError("");
  };

  /*
   * ================================
   * CREATE TRANSACTION API
   * ================================
   */
  const createTransaction = async (data) => {
    setApiError("");

    try {
      const payload = {
        ...data,
        type,
        category,
        amount: Number(data.amount),
      };

      // your api call here
      // const response = await api.post("/transactions", payload);

      console.log("CREATE TRANSACTION:", payload);

      // Example:
      // if (!response.data.success) {
      //   throw new Error(response.data.message);
      // }

      reset();
      setCategory(type === "expense" ? "Food" : "Salary");
    } catch (error) {
      setApiError(
        error?.response?.data?.message ||
          error?.message ||
          "Unable to create transaction."
      );
    }
  };

  /*
   * ================================
   * CREATE CATEGORY API
   * ================================
   */
  const createCategory = async (data) => {
    setApiError("");

    try {
      const name = data.name.trim();

      const exists = categories.some(
        (item) => item.name.toLowerCase() === name.toLowerCase()
      );

      if (exists) {
        throw new Error("Category already exists.");
      }

      const palette =
        categoryColors[
          type === "expense"
            ? customExpenseCategories.length
            : customIncomeCategories.length
        ] || categoryColors[0];

      const newCategory = {
        id: crypto.randomUUID(),
        name,
        icon: iconOptions[newCategoryIcon],
        color: palette.color,
        active: palette.active,
      };

      // your api call here
      // const response = await api.post("/categories", {
      //   name,
      //   type,
      //   icon: newCategoryIcon,
      // });

      console.log("CREATE CATEGORY:", {
        name,
        type,
        icon: newCategoryIcon,
      });

      /*
       * Temporary local update.
       * Remove this when your API returns the category.
       */
      if (type === "expense") {
        setCustomExpenseCategories((prev) => [...prev, newCategory]);
      } else {
        setCustomIncomeCategories((prev) => [...prev, newCategory]);
      }

      setCategory(name);
      resetCategory();
      setNewCategoryIcon(0);
      setShowCategoryModal(false);
    } catch (error) {
      setApiError(
        error?.response?.data?.message ||
          error?.message ||
          "Unable to create category."
      );
    }
  };

  return (
    <div className="space-y-4 pb-5">
      {/* Header */}
      <div className="flex items-center justify-between gap-3">
        <div className="min-w-0">
          <p className="text-[10px] font-medium uppercase tracking-wider text-muted">
            Transactions
          </p>

          <h1 className="mt-1 truncate text-xl font-semibold tracking-tight text-foreground sm:text-2xl">
            New transaction
          </h1>
        </div>

        <button
          type="button"
          onClick={() => {
            setApiError("");
            setShowCategoryModal(true);
          }}
          className="btn-secondary flex h-9 shrink-0 items-center gap-1.5 px-3 text-[11px] font-medium"
        >
          <Plus size={14} />
          <span className="hidden sm:inline">Create category</span>
          <span className="sm:hidden">Category</span>
        </button>
      </div>

      {/* API Error */}
      {apiError && (
        <div className="flex items-center gap-2 rounded-xl border border-danger/15 bg-danger-muted px-3 py-2.5 text-xs text-danger">
          <AlertCircle size={15} className="shrink-0" />
          <span>{apiError}</span>

          <button
            type="button"
            onClick={() => setApiError("")}
            className="ml-auto"
          >
            <X size={14} />
          </button>
        </div>
      )}

      <div className="grid gap-4 lg:grid-cols-[minmax(0,1fr)_360px]">
        {/* Form */}
        <form
          onSubmit={handleSubmit(createTransaction)}
          className="card p-3.5 sm:p-5"
        >
          {/* Tabs */}
          <div className="grid grid-cols-2 gap-1 rounded-xl bg-surface p-1">
            <button
              type="button"
              onClick={() => handleTypeChange("expense")}
              className={`h-9 rounded-lg text-xs font-medium transition ${
                type === "expense"
                  ? "bg-card text-danger shadow-sm"
                  : "text-muted"
              }`}
            >
              Expense
            </button>

            <button
              type="button"
              onClick={() => handleTypeChange("income")}
              className={`h-9 rounded-lg text-xs font-medium transition ${
                type === "income"
                  ? "bg-card text-success shadow-sm"
                  : "text-muted"
              }`}
            >
              Income
            </button>
          </div>

          {/* Amount */}
          <div className="mt-4 rounded-xl bg-surface px-4 py-4 text-center">
            <p className="text-[9px] font-medium uppercase tracking-wider text-muted">
              Amount
            </p>

            <div className="mt-1 flex items-center justify-center">
              <span
                className={`mr-1.5 text-xl font-semibold ${
                  type === "income" ? "text-success" : "text-danger"
                }`}
              >
                ₹
              </span>

              <input
                type="number"
                min="0"
                step="0.01"
                placeholder="0.00"
                {...register("amount", {
                  required: "Amount is required",
                  min: {
                    value: 1,
                    message: "Amount must be greater than 0",
                  },
                })}
                className="w-full max-w-[180px] bg-transparent text-center text-3xl font-semibold tracking-tight text-foreground outline-none placeholder:text-surface-tertiary"
              />
            </div>

            {errors.amount && (
              <p className="mt-1 text-[10px] text-danger">
                {errors.amount.message}
              </p>
            )}
          </div>

          {/* Categories */}
          <div className="mt-4">
            <div className="mb-2.5 flex items-center justify-between">
              <p className="text-xs font-semibold text-foreground">
                Category
              </p>

              <button
                type="button"
                onClick={() => setShowCategoryModal(true)}
                className="flex items-center gap-1 text-[10px] font-medium text-accent"
              >
                <Plus size={12} />
                New
              </button>
            </div>

            <div className="grid grid-cols-3 gap-1.5 sm:grid-cols-4 xl:grid-cols-5">
              {categories.map((item) => {
                const Icon = item.icon;
                const selected = category === item.name;

                return (
                  <button
                    key={item.id || item.name}
                    type="button"
                    onClick={() => setCategory(item.name)}
                    className={`relative flex min-h-[68px] flex-col items-center justify-center rounded-xl border p-1.5 transition ${
                      selected
                        ? `${item.active} shadow-sm`
                        : "border-border bg-card hover:bg-card-hover"
                    }`}
                  >
                    <div
                      className={`flex h-8 w-8 items-center justify-center rounded-lg ${item.color}`}
                    >
                      <Icon size={15} />
                    </div>

                    <span className="mt-1.5 max-w-full truncate px-1 text-[9px] font-medium text-foreground">
                      {item.name}
                    </span>

                    {selected && (
                      <span className="absolute right-1 top-1 flex h-3.5 w-3.5 items-center justify-center rounded-full bg-primary text-primary-foreground">
                        <Check size={8} />
                      </span>
                    )}
                  </button>
                );
              })}

              <button
                type="button"
                onClick={() => setShowCategoryModal(true)}
                className="flex min-h-[68px] flex-col items-center justify-center rounded-xl border border-dashed border-border bg-surface p-1.5"
              >
                <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-accent-muted text-accent">
                  <Plus size={15} />
                </div>

                <span className="mt-1.5 text-[9px] font-medium text-muted">
                  Create
                </span>
              </button>
            </div>
          </div>

          {/* Details */}
          <div className="mt-4 grid gap-3 sm:grid-cols-2">
            <FormField
              label="Title"
              error={errors.title?.message}
            >
              <input
                {...register("title", {
                  required: "Title is required",
                  minLength: {
                    value: 2,
                    message: "Title is too short",
                  },
                })}
                className="input h-9 px-3 text-xs"
                placeholder={
                  type === "expense"
                    ? "e.g. Grocery shopping"
                    : "e.g. Monthly salary"
                }
              />
            </FormField>

            <FormField
              label="Date"
              error={errors.date?.message}
            >
              <div className="relative">
                <CalendarDays
                  size={14}
                  className="absolute left-3 top-1/2 -translate-y-1/2 text-muted"
                />

                <input
                  type="date"
                  {...register("date", {
                    required: "Date is required",
                  })}
                  className="input h-9 pl-9 pr-3 text-xs"
                />
              </div>
            </FormField>

            <FormField label="Payment account">
              <div className="relative">
                <CreditCard
                  size={14}
                  className="absolute left-3 top-1/2 -translate-y-1/2 text-muted"
                />

                <select
                  {...register("account")}
                  className="input h-9 appearance-none pl-9 pr-8 text-xs"
                >
                  <option>Bank Account</option>
                  <option>Cash</option>
                  <option>Credit Card</option>
                  <option>UPI</option>
                  <option>Wallet</option>
                </select>

                <ChevronDown
                  size={13}
                  className="absolute right-2.5 top-1/2 -translate-y-1/2 text-muted"
                />
              </div>
            </FormField>

            <FormField label="Note">
              <input
                {...register("note")}
                className="input h-9 px-3 text-xs"
                placeholder="Optional note"
              />
            </FormField>
          </div>

          {/* Submit */}
          <div className="mt-4 flex gap-2 border-t border-border pt-3">
            <button
              type="button"
              className="btn-secondary h-9 flex-1 text-xs font-medium sm:flex-none sm:px-5"
            >
              Cancel
            </button>

            <button
              type="submit"
              disabled={isSubmitting}
              className={`flex h-9 flex-1 items-center justify-center gap-2 rounded-lg px-5 text-xs font-medium text-white disabled:cursor-not-allowed disabled:opacity-60 sm:flex-none ${
                type === "income"
                  ? "bg-success"
                  : "bg-danger"
              }`}
            >
              {isSubmitting && (
                <Loader2 size={14} className="animate-spin" />
              )}

              {isSubmitting
                ? "Saving..."
                : `Add ${type === "income" ? "income" : "expense"}`}
            </button>
          </div>
        </form>

        {/* Recent Transactions */}
        <section className="card overflow-hidden">
          <div className="flex items-center justify-between border-b border-border px-4 py-3.5">
            <div>
              <p className="text-sm font-semibold text-foreground">
                Recent transactions
              </p>

              <p className="mt-0.5 text-[9px] text-muted">
                Latest 10 transactions
              </p>
            </div>

            <CircleDollarSign size={18} className="text-muted" />
          </div>

          <div className="divide-y divide-border">
            {recentTransactions.map((transaction) => {
              const Icon = transaction.icon;

              return (
                <div
                  key={transaction.id}
                  className="flex items-center gap-2.5 px-4 py-2.5 hover:bg-card-hover"
                >
                  <div
                    className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-lg ${transaction.color}`}
                  >
                    <Icon size={14} />
                  </div>

                  <div className="min-w-0 flex-1">
                    <p className="truncate text-[11px] font-medium text-foreground">
                      {transaction.title}
                    </p>

                    <p className="mt-0.5 text-[9px] text-muted">
                      {transaction.category} · {transaction.date}
                    </p>
                  </div>

                  <p
                    className={`shrink-0 text-[11px] font-semibold ${
                      transaction.type === "income"
                        ? "text-success"
                        : "text-danger"
                    }`}
                  >
                    {transaction.type === "income" ? "+" : "-"}₹
                    {transaction.amount.toLocaleString("en-IN")}
                  </p>
                </div>
              );
            })}
          </div>

          <div className="border-t border-border bg-surface px-4 py-2.5 text-center">
            <button
              type="button"
              className="text-[10px] font-medium text-accent"
            >
              View all transactions →
            </button>
          </div>
        </section>
      </div>

      {/* Category Modal */}
      {showCategoryModal && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/30 p-3 backdrop-blur-sm sm:items-center sm:p-4"
          onMouseDown={(e) => {
            if (e.target === e.currentTarget) {
              setShowCategoryModal(false);
              resetCategory();
            }
          }}
        >
          <form
            onSubmit={handleCategorySubmit(createCategory)}
            className="w-full max-w-sm rounded-2xl border border-border bg-card p-4 shadow-xl sm:p-5"
          >
            {/* Modal Header */}
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-sm font-semibold text-foreground">
                  Create category
                </h2>

                <p className="mt-0.5 text-[9px] text-muted">
                  New {type} category
                </p>
              </div>

              <button
                type="button"
                onClick={() => {
                  setShowCategoryModal(false);
                  resetCategory();
                }}
                className="flex h-7 w-7 items-center justify-center rounded-lg text-muted hover:bg-surface"
              >
                <X size={15} />
              </button>
            </div>

            {/* Preview */}
            <div className="mt-4 flex items-center gap-3 rounded-xl bg-surface p-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-accent-muted text-accent">
                {React.createElement(iconOptions[newCategoryIcon], {
                  size: 18,
                })}
              </div>

              <div>
                <p className="text-xs font-semibold text-foreground">
                  New category
                </p>

                <p className="mt-0.5 text-[9px] text-muted">
                  {type === "expense" ? "Expense" : "Income"}
                </p>
              </div>
            </div>

            {/* Name */}
            <div className="mt-4">
              <label className="mb-1.5 block text-[10px] font-medium text-secondary">
                Category name
              </label>

              <input
                autoFocus
                {...registerCategory("name", {
                  required: "Category name is required",
                  minLength: {
                    value: 2,
                    message: "Minimum 2 characters",
                  },
                  maxLength: {
                    value: 30,
                    message: "Maximum 30 characters",
                  },
                })}
                placeholder="e.g. Gym, Education"
                className="input h-9 px-3 text-xs"
              />

              {categoryErrors.name && (
                <p className="mt-1 text-[9px] text-danger">
                  {categoryErrors.name.message}
                </p>
              )}
            </div>

            {/* Icons */}
            <div className="mt-4">
              <p className="mb-2 text-[10px] font-medium text-secondary">
                Choose icon
              </p>

              <div className="grid grid-cols-6 gap-1.5">
                {iconOptions.map((Icon, index) => (
                  <button
                    key={index}
                    type="button"
                    onClick={() => setNewCategoryIcon(index)}
                    className={`flex h-9 items-center justify-center rounded-lg border transition ${
                      newCategoryIcon === index
                        ? "border-accent bg-accent-muted text-accent"
                        : "border-border bg-surface text-muted hover:text-foreground"
                    }`}
                  >
                    <Icon size={15} />
                  </button>
                ))}
              </div>
            </div>

            {/* Modal Actions */}
            <div className="mt-5 flex gap-2">
              <button
                type="button"
                onClick={() => {
                  setShowCategoryModal(false);
                  resetCategory();
                }}
                className="btn-secondary h-9 flex-1 text-xs font-medium"
              >
                Cancel
              </button>

              <button
                type="submit"
                disabled={isCategorySubmitting}
                className="btn-primary flex h-9 flex-1 items-center justify-center gap-2 text-xs font-medium disabled:opacity-50"
              >
                {isCategorySubmitting && (
                  <Loader2 size={13} className="animate-spin" />
                )}

                {isCategorySubmitting ? "Creating..." : "Create category"}
              </button>
            </div>
          </form>
        </div>
      )}
    </div>
  );
};

const FormField = ({ label, error, children }) => (
  <label className="block">
    <span className="mb-1.5 block text-[10px] font-medium text-secondary">
      {label}
    </span>

    {children}

    {error && (
      <span className="mt-1 block text-[9px] text-danger">
        {error}
      </span>
    )}
  </label>
);

export default NewExpense;