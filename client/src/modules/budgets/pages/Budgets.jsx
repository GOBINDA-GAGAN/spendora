import React, { useMemo, useState } from "react";
import { useForm } from "react-hook-form";
import {
  Wallet,
  Plus,
  Pencil,
  Trash2,
  X,
  Utensils,
  ShoppingBag,
  Car,
  House,
  Receipt,
  HeartPulse,
  Gamepad2,
  Plane,
  GraduationCap,
  BriefcaseBusiness,
  MoreHorizontal,
  Check,
  AlertCircle,
  TrendingDown,
  CalendarDays,
  CreditCard,
} from "lucide-react";

/* =========================================================
   CONSTANTS
========================================================= */

const PERIODS = ["Weekly", "Monthly", "Yearly"];

const ICONS = [
  { id: "food", label: "Food", icon: Utensils },
  { id: "shopping", label: "Shopping", icon: ShoppingBag },
  { id: "transport", label: "Transport", icon: Car },
  { id: "housing", label: "Housing", icon: House },
  { id: "bills", label: "Bills", icon: Receipt },
  { id: "health", label: "Health", icon: HeartPulse },
  { id: "entertainment", label: "Entertainment", icon: Gamepad2 },
  { id: "travel", label: "Travel", icon: Plane },
  { id: "education", label: "Education", icon: GraduationCap },
  { id: "work", label: "Work", icon: BriefcaseBusiness },
  { id: "other", label: "Other", icon: MoreHorizontal },
];

const COLORS = [
  {
    id: "blue",
    bg: "bg-blue-50",
    text: "text-blue-600",
    border: "border-blue-100",
    solid: "bg-blue-500",
  },
  {
    id: "green",
    bg: "bg-green-50",
    text: "text-green-600",
    border: "border-green-100",
    solid: "bg-green-500",
  },
  {
    id: "orange",
    bg: "bg-orange-50",
    text: "text-orange-600",
    border: "border-orange-100",
    solid: "bg-orange-500",
  },
  {
    id: "red",
    bg: "bg-red-50",
    text: "text-red-600",
    border: "border-red-100",
    solid: "bg-red-500",
  },
  {
    id: "purple",
    bg: "bg-purple-50",
    text: "text-purple-600",
    border: "border-purple-100",
    solid: "bg-purple-500",
  },
  {
    id: "pink",
    bg: "bg-pink-50",
    text: "text-pink-600",
    border: "border-pink-100",
    solid: "bg-pink-500",
  },
  {
    id: "cyan",
    bg: "bg-cyan-50",
    text: "text-cyan-600",
    border: "border-cyan-100",
    solid: "bg-cyan-500",
  },
  {
    id: "yellow",
    bg: "bg-yellow-50",
    text: "text-yellow-600",
    border: "border-yellow-100",
    solid: "bg-yellow-500",
  },
];

/* =========================================================
   HELPERS
========================================================= */

const money = (value) =>
  new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
    maximumFractionDigits: 0,
  }).format(Number(value) || 0);

const convertFromMonthly = (monthly, period) => {
  const value = Number(monthly) || 0;

  if (period === "Weekly") return value / 4;
  if (period === "Yearly") return value * 12;

  return value;
};

const convertToMonthly = (value, period) => {
  const amount = Number(value) || 0;

  if (period === "Weekly") return amount * 4;
  if (period === "Yearly") return amount / 12;

  return amount;
};

const getColor = (id) =>
  COLORS.find((color) => color.id === id) || COLORS[0];

const getIcon = (id) =>
  ICONS.find((item) => item.id === id)?.icon || MoreHorizontal;

/* =========================================================
   INITIAL DATA
========================================================= */

const EMPTY_TRANSACTIONS = [];

/* =========================================================
   PERIOD TABS
========================================================= */

const PeriodTabs = ({ period, setPeriod }) => {
  return (
    <div className="flex w-full rounded-xl border border-border bg-card p-1 sm:w-auto">
      {PERIODS.map((item) => (
        <button
          key={item}
          type="button"
          onClick={() => setPeriod(item)}
          className={`flex-1 rounded-lg px-3 py-2 text-xs font-medium transition sm:flex-none ${
            period === item
              ? "bg-foreground text-background shadow-sm"
              : "text-muted hover:bg-muted/40 hover:text-foreground"
          }`}
        >
          {item}
        </button>
      ))}
    </div>
  );
};

/* =========================================================
   FINAL BUDGET CARD
========================================================= */

const FinalBudgetCard = ({
  monthlyBudget,
  spent,
  period,
  onEdit,
}) => {
  const displayBudget = convertFromMonthly(monthlyBudget, period);
  const displaySpent = convertFromMonthly(spent, period);
  const displayAvailable = displayBudget - displaySpent;

  const percentage =
    displayBudget > 0
      ? Math.min((displaySpent / displayBudget) * 100, 100)
      : 0;

  const isOver = displayAvailable < 0;

  return (
    <div className="relative overflow-hidden rounded-3xl border border-border bg-card p-5 shadow-sm transition hover:shadow-md sm:p-6">
      {/* Header */}
      <div className="flex items-start justify-between">
        <div>
          <p className="text-[10px] font-bold uppercase tracking-[0.18em] text-muted">
            Spendora
          </p>

          <div className="mt-5 flex items-center gap-2">
            <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-foreground text-background">
              <CreditCard className="h-4 w-4" />
            </div>

            <div>
              <p className="text-[10px] font-semibold uppercase tracking-wider text-muted">
                Final Budget
              </p>

              <p className="text-xs text-muted">
                {period} spending limit
              </p>
            </div>
          </div>
        </div>

        <button
          type="button"
          onClick={onEdit}
          className="flex h-8 w-8 items-center justify-center rounded-lg border border-border bg-card-secondary text-muted transition hover:text-foreground"
        >
          <Pencil className="h-3.5 w-3.5" />
        </button>
      </div>

      {/* Amount */}
      <div className="mt-6">
        <p className="text-2xl font-semibold tracking-tight text-foreground sm:text-3xl">
          {money(displayBudget)}
        </p>

        <p className="mt-1 text-[10px] font-medium uppercase tracking-wider text-muted">
          Total budget
        </p>
      </div>

      {/* Progress */}
      <div className="mt-6">
        <div className="h-2 overflow-hidden rounded-full bg-muted">
          <div
            className={`h-full rounded-full transition-all ${
              isOver ? "bg-red-500" : "bg-foreground"
            }`}
            style={{ width: `${percentage}%` }}
          />
        </div>
      </div>

      {/* Bottom numbers */}
      <div className="mt-5 grid grid-cols-2 gap-4">
        <div>
          <p className="text-[10px] font-medium uppercase tracking-wider text-muted">
            Spent
          </p>

          <p className="mt-1 text-sm font-semibold text-foreground">
            {money(displaySpent)}
          </p>
        </div>

        <div className="text-right">
          <p className="text-[10px] font-medium uppercase tracking-wider text-muted">
            {isOver ? "Over budget" : "Available"}
          </p>

          <p
            className={`mt-1 text-sm font-semibold ${
              isOver ? "text-red-600" : "text-foreground"
            }`}
          >
            {money(displayAvailable)}
          </p>
        </div>
      </div>

      {/* Status */}
      <div className="mt-5 flex items-center justify-between border-t border-border pt-4">
        <div
          className={`flex items-center gap-2 text-[10px] font-semibold uppercase tracking-wider ${
            isOver ? "text-red-600" : "text-green-600"
          }`}
        >
          <span
            className={`h-2 w-2 rounded-full ${
              isOver ? "bg-red-500" : "bg-green-500"
            }`}
          />

          {isOver ? "Budget exceeded" : "Within budget"}
        </div>

        <p className="text-[10px] font-medium uppercase tracking-wider text-muted">
          {period}
        </p>
      </div>
    </div>
  );
};

/* =========================================================
   CATEGORY CARD
========================================================= */

const CategoryCard = ({
  category,
  spent,
  period,
  onEdit,
  onDelete,
}) => {
  const color = getColor(category.color);
  const Icon = getIcon(category.icon);

  const displayBudget = convertFromMonthly(
    category.monthlyLimit,
    period
  );

  const displaySpent = convertFromMonthly(spent, period);

  const displayAvailable = displayBudget - displaySpent;

  const percentage =
    displayBudget > 0
      ? Math.min((displaySpent / displayBudget) * 100, 100)
      : 0;

  const isOver = displayAvailable < 0;

  return (
    <div className="group relative overflow-hidden rounded-3xl border border-border bg-card p-5 shadow-sm transition hover:-translate-y-0.5 hover:shadow-md">
      {/* Header */}
      <div className="flex items-start justify-between">
        <div className="flex items-center gap-3">
          <div
            className={`flex h-10 w-10 items-center justify-center rounded-xl border ${color.bg} ${color.border} ${color.text}`}
          >
            <Icon className="h-4.5 w-4.5" />
          </div>

          <div>
            <p className="text-[10px] font-bold uppercase tracking-[0.16em] text-muted">
              Spendora
            </p>

            <h3 className="mt-1 text-sm font-semibold text-foreground">
              {category.name}
            </h3>
          </div>
        </div>

        <div className="flex gap-1 opacity-100 transition sm:opacity-0 sm:group-hover:opacity-100">
          <button
            type="button"
            onClick={() => onEdit(category)}
            className="flex h-7 w-7 items-center justify-center rounded-lg text-muted hover:bg-muted hover:text-foreground"
          >
            <Pencil className="h-3.5 w-3.5" />
          </button>

          <button
            type="button"
            onClick={() => onDelete(category.id)}
            className="flex h-7 w-7 items-center justify-center rounded-lg text-muted hover:bg-red-50 hover:text-red-600"
          >
            <Trash2 className="h-3.5 w-3.5" />
          </button>
        </div>
      </div>

      {/* Budget */}
      <div className="mt-7">
        <p className="text-2xl font-semibold tracking-tight text-foreground">
          {money(displayBudget)}
        </p>

        <p className="mt-1 text-[10px] font-medium uppercase tracking-wider text-muted">
          {period} limit
        </p>
      </div>

      {/* Progress */}
      <div className="mt-6">
        <div className="h-2 overflow-hidden rounded-full bg-muted">
          <div
            className={`h-full rounded-full transition-all ${
              isOver ? "bg-red-500" : color.solid
            }`}
            style={{ width: `${percentage}%` }}
          />
        </div>
      </div>

      {/* Spent / Available */}
      <div className="mt-5 grid grid-cols-2 gap-3">
        <div>
          <p className="text-[10px] font-medium uppercase tracking-wider text-muted">
            Spent
          </p>

          <p className="mt-1 text-sm font-semibold text-foreground">
            {money(displaySpent)}
          </p>
        </div>

        <div className="text-right">
          <p className="text-[10px] font-medium uppercase tracking-wider text-muted">
            {isOver ? "Over" : "Left"}
          </p>

          <p
            className={`mt-1 text-sm font-semibold ${
              isOver ? "text-red-600" : "text-foreground"
            }`}
          >
            {money(displayAvailable)}
          </p>
        </div>
      </div>

      {/* Footer */}
      <div className="mt-5 flex items-center justify-between border-t border-border pt-4">
        <div
          className={`flex items-center gap-2 text-[10px] font-semibold uppercase tracking-wider ${
            isOver ? "text-red-600" : "text-green-600"
          }`}
        >
          <span
            className={`h-2 w-2 rounded-full ${
              isOver ? "bg-red-500" : "bg-green-500"
            }`}
          />

          {isOver ? "Over budget" : "Within budget"}
        </div>

        <span className="text-[10px] font-medium text-muted">
          {Math.round(
            displayBudget > 0
              ? (displaySpent / displayBudget) * 100
              : 0
          )}
          %
        </span>
      </div>
    </div>
  );
};

/* =========================================================
   MODAL WRAPPER
========================================================= */

const ModalWrapper = ({ children, onClose }) => {
  return (
    <div
      className="fixed inset-0 z-50 flex items-end justify-center bg-black/30 p-0 backdrop-blur-[2px] sm:items-center sm:p-4"
      onMouseDown={onClose}
    >
      <div
        className="max-h-[92vh] w-full overflow-y-auto rounded-t-3xl border border-border bg-card shadow-2xl sm:max-w-lg sm:rounded-3xl"
        onMouseDown={(e) => e.stopPropagation()}
      >
        {children}
      </div>
    </div>
  );
};

/* =========================================================
   FINAL BUDGET MODAL
========================================================= */

const FinalBudgetModal = ({
  currentMonthlyBudget,
  period,
  onClose,
  onSave,
}) => {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors, isSubmitting },
  } = useForm({
    defaultValues: {
      amount: convertFromMonthly(currentMonthlyBudget, period),
    },
  });

  const amount = watch("amount");

  const monthlyValue = convertToMonthly(amount, period);

  const submit = async (data) => {
    await onSave(
      convertToMonthly(data.amount, period)
    );
  };

  return (
    <ModalWrapper onClose={onClose}>
      <form onSubmit={handleSubmit(submit)}>
        <div className="flex items-center justify-between border-b border-border px-5 py-4">
          <div>
            <h2 className="text-sm font-semibold text-foreground">
              Set Final Budget
            </h2>

            <p className="mt-0.5 text-[11px] text-muted">
              Set your overall spending limit.
            </p>
          </div>

          <button
            type="button"
            onClick={onClose}
            className="flex h-8 w-8 items-center justify-center rounded-lg text-muted hover:bg-muted"
          >
            <X className="h-4 w-4" />
          </button>
        </div>

        <div className="space-y-5 p-5">
          <div>
            <label className="mb-2 block text-xs font-medium text-foreground">
              {period} budget
            </label>

            <div className="relative">
              <span className="absolute left-3 top-1/2 -translate-y-1/2 text-sm text-muted">
                ₹
              </span>

              <input
                type="number"
                min="0"
                step="1"
                {...register("amount", {
                  required: "Budget amount is required",
                  min: {
                    value: 0,
                    message: "Budget cannot be negative",
                  },
                })}
                className="h-11 w-full rounded-xl border border-border bg-background pl-8 pr-3 text-sm text-foreground outline-none transition focus:border-primary focus:ring-2 focus:ring-primary/10"
                placeholder="0"
              />
            </div>

            {errors.amount && (
              <p className="mt-1.5 text-xs text-red-500">
                {errors.amount.message}
              </p>
            )}
          </div>

          <div className="rounded-xl border border-border bg-card-secondary p-4">
            <div className="flex items-center justify-between">
              <span className="text-xs text-muted">
                Monthly value
              </span>

              <span className="text-sm font-semibold text-foreground">
                {money(monthlyValue)}
              </span>
            </div>

            <p className="mt-2 text-[10px] leading-4 text-muted">
              Your budget is stored as a monthly value. The selected
              period only changes how it is displayed.
            </p>
          </div>

          <div className="flex gap-2 pt-1">
            <button
              type="button"
              onClick={onClose}
              className="h-10 flex-1 rounded-xl border border-border text-xs font-semibold text-foreground hover:bg-muted"
            >
              Cancel
            </button>

            <button
              type="submit"
              disabled={isSubmitting}
              className="h-10 flex-1 rounded-xl bg-primary text-xs font-semibold text-primary-foreground transition hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-60"
            >
              {isSubmitting ? "Saving..." : "Save Budget"}
            </button>
          </div>
        </div>
      </form>
    </ModalWrapper>
  );
};

/* =========================================================
   CATEGORY MODAL
========================================================= */

const CategoryBudgetModal = ({
  editingCategory,
  period,
  onClose,
  onSave,
}) => {
  const [selectedIcon, setSelectedIcon] = useState(
    editingCategory?.icon || "other"
  );

  const [selectedColor, setSelectedColor] = useState(
    editingCategory?.color || "blue"
  );

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm({
    defaultValues: {
      name: editingCategory?.name || "",
      amount: editingCategory
        ? convertFromMonthly(
            editingCategory.monthlyLimit,
            period
          )
        : 0,
    },
  });

  const submit = async (data) => {
    await onSave({
      id: editingCategory?.id,
      name: data.name.trim(),
      icon: selectedIcon,
      color: selectedColor,
      monthlyLimit: convertToMonthly(
        data.amount,
        period
      ),
    });
  };

  return (
    <ModalWrapper onClose={onClose}>
      <form onSubmit={handleSubmit(submit)}>
        {/* Header */}
        <div className="flex items-center justify-between border-b border-border px-5 py-4">
          <div>
            <h2 className="text-sm font-semibold text-foreground">
              {editingCategory
                ? "Edit Category"
                : "Add Category"}
            </h2>

            <p className="mt-0.5 text-[11px] text-muted">
              Create a budget for a spending category.
            </p>
          </div>

          <button
            type="button"
            onClick={onClose}
            className="flex h-8 w-8 items-center justify-center rounded-lg text-muted hover:bg-muted"
          >
            <X className="h-4 w-4" />
          </button>
        </div>

        <div className="space-y-5 p-5">
          {/* Name */}
          <div>
            <label className="mb-2 block text-xs font-medium text-foreground">
              Category name
            </label>

            <input
              {...register("name", {
                required: "Category name is required",
                minLength: {
                  value: 2,
                  message: "Enter at least 2 characters",
                },
                maxLength: {
                  value: 30,
                  message: "Maximum 30 characters",
                },
              })}
              className="h-10 w-full rounded-xl border border-border bg-background px-3 text-sm text-foreground outline-none focus:border-primary focus:ring-2 focus:ring-primary/10"
              placeholder="e.g. Food"
            />

            {errors.name && (
              <p className="mt-1.5 text-xs text-red-500">
                {errors.name.message}
              </p>
            )}
          </div>

          {/* Icon */}
          <div>
            <label className="mb-2 block text-xs font-medium text-foreground">
              Choose icon
            </label>

            <div className="grid grid-cols-6 gap-2">
              {ICONS.map((item) => {
                const Icon = item.icon;
                const active = selectedIcon === item.id;

                return (
                  <button
                    key={item.id}
                    type="button"
                    title={item.label}
                    onClick={() => setSelectedIcon(item.id)}
                    className={`flex h-10 items-center justify-center rounded-xl border transition ${
                      active
                        ? "border-primary bg-primary/5 text-primary ring-2 ring-primary/10"
                        : "border-border bg-background text-muted hover:border-primary/30 hover:text-foreground"
                    }`}
                  >
                    <Icon className="h-4 w-4" />
                  </button>
                );
              })}
            </div>
          </div>

          {/* Color */}
          <div>
            <label className="mb-2 block text-xs font-medium text-foreground">
              Choose color
            </label>

            <div className="flex flex-wrap gap-2">
              {COLORS.map((color) => {
                const active = selectedColor === color.id;

                return (
                  <button
                    key={color.id}
                    type="button"
                    onClick={() => setSelectedColor(color.id)}
                    className={`flex h-9 w-9 items-center justify-center rounded-full border ${color.bg} ${
                      active
                        ? "ring-2 ring-primary ring-offset-2"
                        : ""
                    }`}
                  >
                    <span
                      className={`h-3.5 w-3.5 rounded-full ${color.solid}`}
                    />
                  </button>
                );
              })}
            </div>
          </div>

          {/* Budget */}
          <div>
            <label className="mb-2 block text-xs font-medium text-foreground">
              {period} budget
            </label>

            <div className="relative">
              <span className="absolute left-3 top-1/2 -translate-y-1/2 text-sm text-muted">
                ₹
              </span>

              <input
                type="number"
                min="0"
                step="1"
                {...register("amount", {
                  required: "Budget amount is required",
                  min: {
                    value: 0,
                    message: "Budget cannot be negative",
                  },
                })}
                className="h-11 w-full rounded-xl border border-border bg-background pl-8 pr-3 text-sm text-foreground outline-none focus:border-primary focus:ring-2 focus:ring-primary/10"
                placeholder="0"
              />
            </div>

            {errors.amount && (
              <p className="mt-1.5 text-xs text-red-500">
                {errors.amount.message}
              </p>
            )}
          </div>

          {/* Info */}
          <div className="flex gap-3 rounded-xl border border-border bg-card-secondary p-3">
            <CalendarDays className="mt-0.5 h-4 w-4 shrink-0 text-muted" />

            <p className="text-[10px] leading-4 text-muted">
              This value is converted and stored as your monthly
              budget. You can switch between Weekly, Monthly and
              Yearly anytime.
            </p>
          </div>

          {/* Actions */}
          <div className="flex gap-2 pt-1">
            <button
              type="button"
              onClick={onClose}
              className="h-10 flex-1 rounded-xl border border-border text-xs font-semibold text-foreground hover:bg-muted"
            >
              Cancel
            </button>

            <button
              type="submit"
              disabled={isSubmitting}
              className="h-10 flex-1 rounded-xl bg-primary text-xs font-semibold text-primary-foreground hover:opacity-90 disabled:opacity-60"
            >
              {isSubmitting
                ? "Saving..."
                : editingCategory
                ? "Save Changes"
                : "Add Category"}
            </button>
          </div>
        </div>
      </form>
    </ModalWrapper>
  );
};

/* =========================================================
   EMPTY STATE
========================================================= */

const EmptyCategories = ({ onAdd }) => {
  return (
    <div className="rounded-3xl border border-dashed border-border bg-card p-8 text-center sm:p-12">
      <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-2xl bg-muted text-muted">
        <Wallet className="h-5 w-5" />
      </div>

      <h3 className="mt-4 text-sm font-semibold text-foreground">
        No category budgets yet
      </h3>

      <p className="mx-auto mt-1 max-w-sm text-xs leading-5 text-muted">
        Add your first category and decide how much you want to
        spend on it.
      </p>

      <button
        type="button"
        onClick={onAdd}
        className="mt-5 inline-flex h-9 items-center gap-2 rounded-xl bg-primary px-4 text-xs font-semibold text-primary-foreground transition hover:opacity-90"
      >
        <Plus className="h-3.5 w-3.5" />
        Add Category
      </button>
    </div>
  );
};

/* =========================================================
   MAIN PAGE
========================================================= */

const Budgets = () => {
  const [period, setPeriod] = useState("Monthly");

  const [finalBudgetMonthly, setFinalBudgetMonthly] =
    useState(0);

  const [categories, setCategories] = useState([]);

  /*
   * Starts EMPTY.
   * Replace this with API transaction data later.
   */
  const [transactions] = useState(
    EMPTY_TRANSACTIONS
  );

  const [isFinalBudgetModalOpen, setIsFinalBudgetModalOpen] =
    useState(false);

  const [isCategoryModalOpen, setIsCategoryModalOpen] =
    useState(false);

  const [editingCategory, setEditingCategory] =
    useState(null);

  const [error, setError] = useState("");

  /* =======================================================
     SPENDING
  ======================================================= */

  const getSpent = (categoryName) => {
    return transactions
      .filter(
        (transaction) =>
          transaction.type === "expense" &&
          transaction.category === categoryName
      )
      .reduce(
        (total, transaction) =>
          total + Number(transaction.amount || 0),
        0
      );
  };

  const totalSpent = useMemo(() => {
    return transactions
      .filter(
        (transaction) => transaction.type === "expense"
      )
      .reduce(
        (total, transaction) =>
          total + Number(transaction.amount || 0),
        0
      );
  }, [transactions]);

  /* =======================================================
     SUMMARY
  ======================================================= */

  const displayFinalBudget = convertFromMonthly(
    finalBudgetMonthly,
    period
  );

  const displayTotalSpent = convertFromMonthly(
    totalSpent,
    period
  );

  const displayFinalAvailable =
    displayFinalBudget - displayTotalSpent;

  /* =======================================================
     FINAL BUDGET
  ======================================================= */

  const handleSaveFinalBudget = async (monthlyValue) => {
    try {
      setError("");

      // your api call here
      // await updateFinalBudgetApi({ monthlyLimit: monthlyValue });

      setFinalBudgetMonthly(monthlyValue);
      setIsFinalBudgetModalOpen(false);
    } catch (error) {
      setError(
        error?.response?.data?.message ||
          error?.message ||
          "Failed to save final budget"
      );
    }
  };

  /* =======================================================
     CATEGORY
  ======================================================= */

  const handleSaveCategory = async (data) => {
    try {
      setError("");

      if (!data.name) {
        setError("Category name is required.");
        return;
      }

      const duplicate = categories.some(
        (category) =>
          category.name.toLowerCase() ===
            data.name.toLowerCase() &&
          category.id !== data.id
      );

      if (duplicate) {
        setError(
          "A category with this name already exists."
        );
        return;
      }

      if (data.id) {
        // your api call here
        // await updateBudgetApi(data.id, data);

        setCategories((prev) =>
          prev.map((category) =>
            category.id === data.id
              ? { ...category, ...data }
              : category
          )
        );
      } else {
        // your api call here
        // const response = await createBudgetApi(data);

        setCategories((prev) => [
          ...prev,
          {
            ...data,
            id: crypto.randomUUID(),
          },
        ]);
      }

      setEditingCategory(null);
      setIsCategoryModalOpen(false);
    } catch (error) {
      setError(
        error?.response?.data?.message ||
          error?.message ||
          "Failed to save category"
      );
    }
  };

  /* =======================================================
     DELETE CATEGORY
  ======================================================= */

  const handleDeleteCategory = async (id) => {
    const category = categories.find(
      (item) => item.id === id
    );

    if (!category) return;

    const confirmed = window.confirm(
      `Delete "${category.name}" budget?`
    );

    if (!confirmed) return;

    try {
      setError("");

      // your api call here
      // await deleteBudgetApi(id);

      setCategories((prev) =>
        prev.filter((item) => item.id !== id)
      );
    } catch (error) {
      setError(
        error?.response?.data?.message ||
          error?.message ||
          "Failed to delete category"
      );
    }
  };

  /* =======================================================
     OPEN EDIT
  ======================================================= */

  const handleEditCategory = (category) => {
    setEditingCategory(category);
    setIsCategoryModalOpen(true);
  };

  /* =======================================================
     RENDER
  ======================================================= */

  return (
    <div className="space-y-5">
      {/* ===================================================
          HEADER
      =================================================== */}

      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <p className="text-[10px] font-semibold uppercase tracking-[0.18em] text-muted">
            Money management
          </p>

          <h1 className="mt-1 text-xl font-semibold tracking-tight text-foreground sm:text-2xl">
            Budgets
          </h1>

          <p className="mt-1 text-xs text-muted">
            Set limits for your spending and stay in control.
          </p>
        </div>

        <div className="flex flex-col gap-2 sm:flex-row sm:items-center">
          <PeriodTabs
            period={period}
            setPeriod={setPeriod}
          />

          <button
            type="button"
            onClick={() => {
              setEditingCategory(null);
              setIsCategoryModalOpen(true);
            }}
            className="flex h-10 items-center justify-center gap-2 rounded-xl bg-primary px-4 text-xs font-semibold text-primary-foreground transition hover:opacity-90"
          >
            <Plus className="h-4 w-4" />
            Add Category
          </button>
        </div>
      </div>

      {/* ===================================================
          ERROR
      =================================================== */}

      {error && (
        <div className="flex items-center gap-3 rounded-xl border border-red-100 bg-red-50 px-4 py-3 text-xs text-red-600">
          <AlertCircle className="h-4 w-4 shrink-0" />

          <span className="flex-1">{error}</span>

          <button
            type="button"
            onClick={() => setError("")}
            className="text-red-500 hover:text-red-700"
          >
            <X className="h-4 w-4" />
          </button>
        </div>
      )}

      {/* ===================================================
          FINAL BUDGET + QUICK SUMMARY
      =================================================== */}

      <div className="grid gap-4 lg:grid-cols-[1.5fr_1fr]">
        <FinalBudgetCard
          monthlyBudget={finalBudgetMonthly}
          spent={totalSpent}
          period={period}
          onEdit={() =>
            setIsFinalBudgetModalOpen(true)
          }
        />

        <div className="grid grid-cols-2 gap-4 lg:grid-cols-1">
          {/* Available */}
          <div className="rounded-3xl border border-border bg-card p-5 shadow-sm">
            <div className="flex items-center justify-between">
              <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-green-50 text-green-600">
                <Wallet className="h-4 w-4" />
              </div>

              <span className="text-[10px] font-medium uppercase tracking-wider text-muted">
                {period}
              </span>
            </div>

            <p className="mt-5 text-[10px] font-medium uppercase tracking-wider text-muted">
              Available
            </p>

            <p
              className={`mt-1 text-xl font-semibold tracking-tight ${
                displayFinalAvailable < 0
                  ? "text-red-600"
                  : "text-foreground"
              }`}
            >
              {money(displayFinalAvailable)}
            </p>
          </div>

          {/* Spent */}
          <div className="rounded-3xl border border-border bg-card p-5 shadow-sm">
            <div className="flex items-center justify-between">
              <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-orange-50 text-orange-600">
                <TrendingDown className="h-4 w-4" />
              </div>

              <span className="text-[10px] font-medium uppercase tracking-wider text-muted">
                {period}
              </span>
            </div>

            <p className="mt-5 text-[10px] font-medium uppercase tracking-wider text-muted">
              Total spent
            </p>

            <p className="mt-1 text-xl font-semibold tracking-tight text-foreground">
              {money(displayTotalSpent)}
            </p>
          </div>
        </div>
      </div>

      {/* ===================================================
          CATEGORY SECTION
      =================================================== */}

      <div>
        <div className="mb-3 flex items-center justify-between">
          <div>
            <h2 className="text-sm font-semibold text-foreground">
              Category Budgets
            </h2>

            <p className="mt-0.5 text-[11px] text-muted">
              Each category has its own spending limit.
            </p>
          </div>

          {categories.length > 0 && (
            <span className="text-[10px] font-medium text-muted">
              {categories.length}{" "}
              {categories.length === 1
                ? "category"
                : "categories"}
            </span>
          )}
        </div>

        {categories.length === 0 ? (
          <EmptyCategories
            onAdd={() => {
              setEditingCategory(null);
              setIsCategoryModalOpen(true);
            }}
          />
        ) : (
          <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
            {categories.map((category) => (
              <CategoryCard
                key={category.id}
                category={category}
                spent={getSpent(category.name)}
                period={period}
                onEdit={handleEditCategory}
                onDelete={handleDeleteCategory}
              />
            ))}

            {/* Add another card */}
            <button
              type="button"
              onClick={() => {
                setEditingCategory(null);
                setIsCategoryModalOpen(true);
              }}
              className="group flex min-h-[300px] items-center justify-center rounded-3xl border border-dashed border-border bg-card p-5 transition hover:border-primary/40 hover:bg-primary/[0.02]"
            >
              <div className="text-center">
                <div className="mx-auto flex h-11 w-11 items-center justify-center rounded-2xl bg-muted text-muted transition group-hover:bg-primary/5 group-hover:text-primary">
                  <Plus className="h-5 w-5" />
                </div>

                <p className="mt-3 text-xs font-semibold text-foreground">
                  Add another category
                </p>

                <p className="mt-1 text-[10px] text-muted">
                  Create a new spending limit
                </p>
              </div>
            </button>
          </div>
        )}
      </div>

      {/* ===================================================
          BOTTOM INFO
      =================================================== */}

      <div className="flex items-start gap-3 rounded-2xl border border-border bg-card-secondary p-4">
        <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-card text-muted">
          <Check className="h-4 w-4" />
        </div>

        <div>
          <p className="text-xs font-medium text-foreground">
            Your budget stays flexible
          </p>

          <p className="mt-1 text-[10px] leading-4 text-muted">
            Add categories whenever you need them. Spending will
            later be calculated from your transactions and deducted
            from the corresponding category and final budget.
          </p>
        </div>
      </div>

      {/* ===================================================
          FINAL BUDGET MODAL
      =================================================== */}

      {isFinalBudgetModalOpen && (
        <FinalBudgetModal
          currentMonthlyBudget={finalBudgetMonthly}
          period={period}
          onClose={() =>
            setIsFinalBudgetModalOpen(false)
          }
          onSave={handleSaveFinalBudget}
        />
      )}

      {/* ===================================================
          CATEGORY MODAL
      =================================================== */}

      {isCategoryModalOpen && (
        <CategoryBudgetModal
          editingCategory={editingCategory}
          period={period}
          onClose={() => {
            setIsCategoryModalOpen(false);
            setEditingCategory(null);
          }}
          onSave={handleSaveCategory}
        />
      )}
    </div>
  );
};

export default Budgets;