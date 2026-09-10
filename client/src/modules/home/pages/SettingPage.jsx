import React, { useState } from "react";
import {
  AlertTriangle,
  Bell,
  Bot,
  Check,
  ChevronRight,
  Globe,
  LogOut,
  Moon,
  Palette,
  Phone,
  RotateCcw,
  Sparkles,
  Sun,
  Trash2,
  Wallet,
  Zap,
} from "lucide-react";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";
import { useAuth } from "../../../context/AuthContext";

const Settings = () => {
  const navigate = useNavigate();
  const { logout } = useAuth();

  const [settings, setSettings] = useState({
    emailNotifications: true,
    expenseAlerts: true,
    budgetAlerts: true,
    weeklyReport: false,
    whatsappAutomation: false,
    aiAnalysis: true,
    darkMode: false,
    compactMode: false,
  });

  const [currency, setCurrency] = useState("INR");
  const [language, setLanguage] = useState("English");
  const [loggingOut, setLoggingOut] = useState(false);

  const [deleteOpen, setDeleteOpen] = useState(false);
  const [resetOpen, setResetOpen] = useState(false);
  const [deleteText, setDeleteText] = useState("");
  const [resetText, setResetText] = useState("");
  const [deleting, setDeleting] = useState(false);
  const [resetting, setResetting] = useState(false);

  const plan = {
    name: "Premium",
    badge: "PRO",
    price: 499,
    interval: "month",
    status: "Active",
    daysLeft: 23,
    totalDays: 30,
    usedDays: 7,
    renewalDate: "03 Oct 2026",
  };

  const planProgress = (plan.daysLeft / plan.totalDays) * 100;

  const toggleSetting = (key) => {
    setSettings((prev) => ({
      ...prev,
      [key]: !prev[key],
    }));

    toast.success("Setting updated");
  };

  const handleCurrency = (e) => {
    setCurrency(e.target.value);
    toast.success("Currency updated");
  };

  const handleLanguage = (e) => {
    setLanguage(e.target.value);
    toast.success("Language updated");
  };

  const handleDeleteAccount = async () => {
    if (deleteText !== "DELETE") {
      toast.error("Please type DELETE to confirm");
      return;
    }

    try {
      setDeleting(true);

      // Future API:
      // await api.delete("/users/account");

      await new Promise((resolve) => setTimeout(resolve, 1000));

      toast.success("Account deletion request completed");
      setDeleteOpen(false);
      setDeleteText("");
    } catch (error) {
      console.error(error);
      toast.error("Unable to delete account");
    } finally {
      setDeleting(false);
    }
  };

  const handleResetData = async () => {
    if (resetText !== "RESET") {
      toast.error("Please type RESET to confirm");
      return;
    }

    try {
      setResetting(true);

      // Future API:
      // await api.delete("/transactions/reset");

      await new Promise((resolve) => setTimeout(resolve, 1000));

      toast.success("All personal data has been reset");
      setResetOpen(false);
      setResetText("");
    } catch (error) {
      console.error(error);
      toast.error("Unable to reset data");
    } finally {
      setResetting(false);
    }
  };

  const handleLogout = async () => {
    try {
      setLoggingOut(true);

      await logout();

      toast.success("Signed out successfully");

      navigate("/login", {
        replace: true,
      });
    } catch (error) {
      console.error(error);

      toast.error(
        error?.response?.data?.message ||
          "Unable to sign out. Please try again."
      );
    } finally {
      setLoggingOut(false);
    }
  };

  return (
    <div className="space-y-5">
      {/* PAGE HEADER */}
      <div>
        <p className="text-[10px] font-semibold uppercase tracking-[0.12em] text-primary">
          Preferences
        </p>

        <h1 className="mt-1 text-2xl font-semibold tracking-[-0.03em] text-foreground">
          Settings
        </h1>

        <p className="mt-1 text-xs text-secondary">
          Customize your Spendora experience and account.
        </p>
      </div>

      {/* CURRENT PLAN */}
      <section className="card overflow-hidden">
        <div className="border-b border-border px-5 py-4">
          <div className="flex items-center justify-between gap-3">
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary-muted text-primary">
                <Sparkles size={18} />
              </div>

              <div>
                <h2 className="text-sm font-semibold text-foreground">
                  Current plan
                </h2>

                <p className="mt-0.5 text-[10px] text-muted">
                  Manage your Spendora subscription.
                </p>
              </div>
            </div>

            <span className="rounded-full bg-success-muted px-2.5 py-1 text-[9px] font-semibold text-success">
              {plan.status}
            </span>
          </div>
        </div>

        <div className="p-5">
          <div className="flex flex-col gap-5 lg:flex-row lg:items-center lg:justify-between">
            <div className="flex items-start gap-4">
              <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-primary text-primary-foreground">
                <Sparkles size={20} />
              </div>

              <div>
                <div className="flex flex-wrap items-center gap-2">
                  <h3 className="text-lg font-semibold tracking-[-0.02em] text-foreground">
                    {plan.name}
                  </h3>

                  <span className="rounded-full bg-primary-muted px-2 py-1 text-[9px] font-semibold text-primary">
                    {plan.badge}
                  </span>
                </div>

                <p className="mt-1 max-w-xl text-xs text-secondary">
                  Everything you need to understand and control your spending.
                </p>

                <div className="mt-2 flex flex-wrap items-center gap-2">
                  <span className="text-sm font-semibold text-foreground">
                    ₹{plan.price}
                  </span>

                  <span className="text-[10px] text-muted">
                    / {plan.interval}
                  </span>

                  <span className="text-border">•</span>

                  <span className="text-[10px] text-muted">
                    Renews on {plan.renewalDate}
                  </span>
                </div>
              </div>
            </div>

            <div className="w-full min-w-0 lg:w-[280px]">
              <div className="flex items-center justify-between">
                <p className="text-[10px] text-muted">
                  Subscription period
                </p>

                <p className="text-xs font-semibold text-foreground">
                  {plan.daysLeft} days left
                </p>
              </div>

              <div className="mt-2 h-2 overflow-hidden rounded-full bg-card-secondary">
                <div
                  className="h-full rounded-full bg-primary transition-all duration-500"
                  style={{ width: `${planProgress}%` }}
                />
              </div>

              <div className="mt-1 flex justify-between">
                <p className="text-[9px] text-muted">
                  {plan.usedDays} days used
                </p>

                <p className="text-[9px] text-muted">
                  {plan.totalDays} days
                </p>
              </div>
            </div>
          </div>

          <div className="mt-5 flex flex-col gap-3 border-t border-border pt-4 sm:flex-row sm:items-center sm:justify-between">
            <p className="text-[10px] text-muted">
              Your Premium subscription is currently active.
            </p>

            <div className="flex gap-2">
              <button
                type="button"
                onClick={() =>
                  toast.info("Plan management will be connected later")
                }
                className="h-9 rounded-lg border border-border px-4 text-[11px] font-medium text-secondary transition hover:bg-card-secondary hover:text-foreground"
              >
                Manage plan
              </button>

              <button
                type="button"
                onClick={() =>
                  toast.info("Upgrade flow will be connected later")
                }
                className="btn-primary flex h-9 items-center gap-1.5 rounded-lg px-4 text-[11px] font-medium"
              >
                <Sparkles size={13} />
                Upgrade
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* PREFERENCES + APPEARANCE */}
      <div className="grid grid-cols-1 gap-4 lg:grid-cols-3">
        {/* PREFERENCES */}
        <section className="card lg:col-span-2">
          <SectionHeader
            icon={<Palette size={16} />}
            title="Preferences"
            description="Control how Spendora works for you."
          />

          <div className="divide-y divide-border">
            <div className="flex items-center gap-4 px-5 py-4">
              <IconBox icon={<Wallet size={16} />} />

              <div className="flex-1">
                <p className="text-xs font-medium text-foreground">
                  Default currency
                </p>

                <p className="mt-0.5 text-[10px] text-muted">
                  Currency used throughout your expense tracker.
                </p>
              </div>

              <select
                value={currency}
                onChange={handleCurrency}
                className="h-9 rounded-lg border border-border bg-card-secondary px-3 text-xs text-foreground outline-none focus:border-primary"
              >
                <option value="INR">₹ INR</option>
                <option value="USD">$ USD</option>
                <option value="EUR">€ EUR</option>
                <option value="GBP">£ GBP</option>
                <option value="JPY">¥ JPY</option>
              </select>
            </div>

            <div className="flex items-center gap-4 px-5 py-4">
              <IconBox icon={<Globe size={16} />} />

              <div className="flex-1">
                <p className="text-xs font-medium text-foreground">
                  Language
                </p>

                <p className="mt-0.5 text-[10px] text-muted">
                  Select your preferred language.
                </p>
              </div>

              <select
                value={language}
                onChange={handleLanguage}
                className="h-9 rounded-lg border border-border bg-card-secondary px-3 text-xs text-foreground outline-none focus:border-primary"
              >
                <option>English</option>
                <option>Hindi</option>
                <option>Bengali</option>
              </select>
            </div>

            <SettingRow
              icon={<Palette size={16} />}
              title="Compact mode"
              description="Use a tighter layout for dashboard cards."
              enabled={settings.compactMode}
              onClick={() => toggleSetting("compactMode")}
            />
          </div>
        </section>

        {/* APPEARANCE */}
        <section className="card">
          <SectionHeader
            icon={<Sun size={16} />}
            title="Appearance"
            description="Customize your interface."
          />

          <div className="p-4">
            <p className="mb-2 text-[10px] font-medium text-muted">
              Theme
            </p>

            <div className="grid grid-cols-2 gap-2">
              <ThemeButton
                active={!settings.darkMode}
                icon={<Sun size={15} />}
                label="Light"
                onClick={() =>
                  setSettings((prev) => ({
                    ...prev,
                    darkMode: false,
                  }))
                }
              />

              <ThemeButton
                active={settings.darkMode}
                icon={<Moon size={15} />}
                label="Dark"
                onClick={() =>
                  setSettings((prev) => ({
                    ...prev,
                    darkMode: true,
                  }))
                }
              />
            </div>

            <div className="mt-4 rounded-lg border border-border bg-card-secondary p-3">
              <div className="flex items-center gap-2">
                <Sparkles size={13} className="text-primary" />

                <p className="text-[10px] font-medium text-foreground">
                  Spendora theme
                </p>
              </div>

              <p className="mt-1 text-[9px] leading-4 text-muted">
                Appearance preferences can be synced with your account later.
              </p>
            </div>
          </div>
        </section>
      </div>

      {/* NOTIFICATIONS */}
      <section className="card">
        <SectionHeader
          icon={<Bell size={16} />}
          title="Notifications"
          description="Choose which notifications you want to receive."
        />

        <div className="grid grid-cols-1 md:grid-cols-2">
          <SettingRow
            icon={<Bell size={16} />}
            title="Email notifications"
            description="Receive important account updates by email."
            enabled={settings.emailNotifications}
            onClick={() => toggleSetting("emailNotifications")}
          />

          <SettingRow
            icon={<Wallet size={16} />}
            title="Expense alerts"
            description="Get notified when a new expense is recorded."
            enabled={settings.expenseAlerts}
            onClick={() => toggleSetting("expenseAlerts")}
          />

          <SettingRow
            icon={<Bell size={16} />}
            title="Budget alerts"
            description="Know when you are approaching a budget limit."
            enabled={settings.budgetAlerts}
            onClick={() => toggleSetting("budgetAlerts")}
          />

          <SettingRow
            icon={<Bell size={16} />}
            title="Weekly report"
            description="Receive a weekly summary of your spending."
            enabled={settings.weeklyReport}
            onClick={() => toggleSetting("weeklyReport")}
          />
        </div>
      </section>

      {/* WHATSAPP AUTOMATION */}
      <section className="card overflow-hidden">
        <div className="border-b border-border px-5 py-4">
          <div className="flex items-center justify-between gap-3">
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-success-muted text-success">
                <Phone size={18} />
              </div>

              <div>
                <h2 className="text-sm font-semibold text-foreground">
                  WhatsApp automation
                </h2>

                <p className="mt-0.5 text-[10px] text-muted">
                  Automatically send important Spendora updates.
                </p>
              </div>
            </div>

            <span className="rounded-full bg-success-muted px-2 py-1 text-[9px] font-medium text-success">
              Premium
            </span>
          </div>
        </div>

        <div className="p-5">
          <button
            type="button"
            onClick={() => toggleSetting("whatsappAutomation")}
            className="flex w-full items-center gap-4 rounded-xl border border-border bg-card-secondary p-4 text-left transition hover:border-primary/30"
          >
            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-success-muted text-success">
              <Zap size={17} />
            </div>

            <div className="flex-1">
              <p className="text-xs font-medium text-foreground">
                Enable WhatsApp automation
              </p>

              <p className="mt-0.5 text-[10px] leading-4 text-muted">
                Receive expense and budget updates directly on WhatsApp.
              </p>
            </div>

            <Toggle enabled={settings.whatsappAutomation} />
          </button>

          <div className="mt-3 flex items-center gap-2 rounded-lg bg-primary-muted px-3 py-2.5">
            <Phone size={13} className="text-primary" />

            <p className="text-[9px] leading-4 text-secondary">
              Add your WhatsApp number from your Profile page to activate
              this feature.
            </p>
          </div>
        </div>
      </section>

      {/* AI ANALYSIS */}
      <section className="card overflow-hidden">
        <div className="border-b border-border px-5 py-4">
          <div className="flex items-center justify-between gap-3">
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary-muted text-primary">
                <Bot size={18} />
              </div>

              <div>
                <h2 className="text-sm font-semibold text-foreground">
                  AI spending analysis
                </h2>

                <p className="mt-0.5 text-[10px] text-muted">
                  Understand your spending automatically.
                </p>
              </div>
            </div>

            <span className="flex items-center gap-1 rounded-full bg-primary-muted px-2 py-1 text-[9px] font-medium text-primary">
              <Sparkles size={10} />
              AI
            </span>
          </div>
        </div>

        <div className="p-5">
          <button
            type="button"
            onClick={() => toggleSetting("aiAnalysis")}
            className="flex w-full items-center gap-4 rounded-xl border border-border bg-card-secondary p-4 text-left transition hover:border-primary/30"
          >
            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-primary-muted text-primary">
              <Bot size={17} />
            </div>

            <div className="flex-1">
              <p className="text-xs font-medium text-foreground">
                Enable AI analysis
              </p>

              <p className="mt-0.5 text-[10px] leading-4 text-muted">
                Analyze patterns and generate personalized spending insights.
              </p>
            </div>

            <Toggle enabled={settings.aiAnalysis} />
          </button>

  

          <p className="mt-3 text-[9px] leading-4 text-muted">
            AI insights will use your Spendora transaction data.
          </p>
        </div>
      </section>

      {/* DANGER ZONE */}
      <section className="rounded-xl border border-danger/20 bg-danger/5">
        <div className="border-b border-danger/10 px-5 py-4">
          <div className="flex items-center gap-3">
            <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-danger/10 text-danger">
              <AlertTriangle size={16} />
            </div>

            <div>
              <h2 className="text-sm font-semibold text-foreground">
                Danger zone
              </h2>

              <p className="mt-0.5 text-[10px] text-muted">
                These actions cannot be easily undone.
              </p>
            </div>
          </div>
        </div>

        <div className="divide-y divide-danger/10">
          {/* RESET DATA */}
          <div className="flex flex-col gap-4 p-5 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <p className="text-xs font-medium text-foreground">
                Reset all data
              </p>

              <p className="mt-1 max-w-2xl text-[10px] leading-4 text-muted">
                Permanently remove your transactions, expenses, income,
                budgets, and related personal financial data. Your account
                will remain active.
              </p>
            </div>

            <button
              type="button"
              onClick={() => {
                setResetText("");
                setResetOpen(true);
              }}
              className="flex h-9 shrink-0 items-center justify-center gap-1.5 rounded-lg border border-danger/30 px-4 text-[11px] font-medium text-danger transition hover:bg-danger/10"
            >
              <RotateCcw size={13} />
              Reset data
            </button>
          </div>

          {/* DELETE ACCOUNT */}
          <div className="flex flex-col gap-4 p-5 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <p className="text-xs font-medium text-foreground">
                Delete account
              </p>

              <p className="mt-1 max-w-2xl text-[10px] leading-4 text-muted">
                Permanently delete your Spendora account and all associated
                data. This action cannot be undone.
              </p>
            </div>

            <button
              type="button"
              onClick={() => {
                setDeleteText("");
                setDeleteOpen(true);
              }}
              className="flex h-9 shrink-0 items-center justify-center gap-1.5 rounded-lg border border-danger/30 px-4 text-[11px] font-medium text-danger transition hover:bg-danger/10"
            >
              <Trash2 size={13} />
              Delete account
            </button>
          </div>
        </div>
      </section>

      {/* SIGN OUT */}
      <section className="card">
        <button
          type="button"
          onClick={handleLogout}
          disabled={loggingOut}
          className="flex w-full items-center gap-3 px-5 py-4 text-left transition hover:bg-card-secondary disabled:cursor-not-allowed disabled:opacity-60"
        >
          <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-danger/10 text-danger">
            <LogOut size={16} />
          </div>

          <div className="flex-1">
            <p className="text-xs font-medium text-foreground">
              {loggingOut ? "Signing out..." : "Sign out"}
            </p>

            <p className="mt-0.5 text-[10px] text-muted">
              Sign out of your Spendora account on this device.
            </p>
          </div>

          {!loggingOut && (
            <ChevronRight size={16} className="text-muted" />
          )}
        </button>
      </section>

      {/* DELETE MODAL */}
      {deleteOpen && (
        <ConfirmModal
          type="delete"
          title="Delete your account?"
          description="This will permanently delete your Spendora account and all associated data. This action cannot be undone."
          value={deleteText}
          setValue={setDeleteText}
          onCancel={() => {
            setDeleteOpen(false);
            setDeleteText("");
          }}
          onConfirm={handleDeleteAccount}
          loading={deleting}
        />
      )}

      {/* RESET MODAL */}
      {resetOpen && (
        <ConfirmModal
          type="reset"
          title="Reset all your data?"
          description="All transactions, expenses, income, budgets, and related financial data will be permanently removed. Your account will remain active."
          value={resetText}
          setValue={setResetText}
          onCancel={() => {
            setResetOpen(false);
            setResetText("");
          }}
          onConfirm={handleResetData}
          loading={resetting}
        />
      )}
    </div>
  );
};

/* SECTION HEADER */
const SectionHeader = ({ icon, title, description }) => (
  <div className="flex items-center gap-3 border-b border-border px-5 py-4">
    <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-primary-muted text-primary">
      {icon}
    </div>

    <div>
      <h2 className="text-sm font-semibold text-foreground">{title}</h2>

      <p className="mt-0.5 text-[10px] text-muted">{description}</p>
    </div>
  </div>
);

/* ICON BOX */
const IconBox = ({ icon }) => (
  <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-primary-muted text-primary">
    {icon}
  </div>
);

/* PLAN FEATURE */
const PlanFeature = ({ text }) => (
  <div className="flex items-center gap-2 rounded-lg bg-card-secondary px-3 py-2.5">
    <div className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-success-muted text-success">
      <Check size={11} strokeWidth={3} />
    </div>

    <span className="text-[10px] font-medium text-secondary">
      {text}
    </span>
  </div>
);

/* SETTING ROW */
const SettingRow = ({
  icon,
  title,
  description,
  enabled,
  onClick,
}) => (
  <button
    type="button"
    onClick={onClick}
    className="flex w-full items-center gap-4 px-5 py-4 text-left transition hover:bg-card-secondary"
  >
    <IconBox icon={icon} />

    <div className="flex-1">
      <p className="text-xs font-medium text-foreground">{title}</p>

      <p className="mt-0.5 text-[10px] text-muted">
        {description}
      </p>
    </div>

    <Toggle enabled={enabled} />
  </button>
);

/* TOGGLE */
const Toggle = ({ enabled }) => (
  <span
    className={`relative block h-5 w-9 shrink-0 rounded-full transition ${
      enabled ? "bg-primary" : "bg-border"
    }`}
  >
    <span
      className={`absolute top-0.5 h-4 w-4 rounded-full bg-white shadow-sm transition ${
        enabled ? "left-[18px]" : "left-0.5"
      }`}
    />
  </span>
);

/* THEME BUTTON */
const ThemeButton = ({
  active,
  icon,
  label,
  onClick,
}) => (
  <button
    type="button"
    onClick={onClick}
    className={`flex h-9 items-center justify-center gap-2 rounded-lg border text-[11px] font-medium transition ${
      active
        ? "border-primary bg-primary-muted text-primary"
        : "border-border bg-card text-secondary hover:bg-card-secondary"
    }`}
  >
    {icon}
    {label}
  </button>
);

/* CONFIRM MODAL */
const ConfirmModal = ({
  type,
  title,
  description,
  value,
  setValue,
  onCancel,
  onConfirm,
  loading,
}) => {
  const isDelete = type === "delete";
  const confirmWord = isDelete ? "DELETE" : "RESET";

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/50 px-4 backdrop-blur-sm">
      <div className="w-full max-w-md rounded-2xl border border-border bg-card p-5 shadow-2xl">
        {/* HEADER */}
        <div className="flex items-start gap-3">
          <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-danger/10 text-danger">
            <AlertTriangle size={19} />
          </div>

          <div className="flex-1">
            <h2 className="text-sm font-semibold text-foreground">
              {title}
            </h2>

            <p className="mt-1.5 text-[11px] leading-5 text-secondary">
              {description}
            </p>
          </div>
        </div>

        {/* WARNING */}
        <div className="mt-4 rounded-xl border border-danger/20 bg-danger/5 p-3">
          <div className="flex gap-2">
            <AlertTriangle
              size={14}
              className="mt-0.5 shrink-0 text-danger"
            />

            <p className="text-[10px] leading-4 text-danger">
              Warning: This action is permanent. Please make sure you
              understand what will be removed before continuing.
            </p>
          </div>
        </div>

        {/* CONFIRM INPUT */}
        <div className="mt-4">
          <label className="mb-1.5 block text-[10px] font-medium text-foreground">
            Type{" "}
            <span className="font-bold text-danger">
              {confirmWord}
            </span>{" "}
            to confirm
          </label>

          <input
            value={value}
            onChange={(e) => setValue(e.target.value)}
            placeholder={confirmWord}
            autoFocus
            className="h-10 w-full rounded-lg border border-border bg-card-secondary px-3 text-xs text-foreground outline-none transition placeholder:text-muted focus:border-danger focus:ring-2 focus:ring-danger/10"
          />
        </div>

        {/* ACTIONS */}
        <div className="mt-5 flex justify-end gap-2">
          <button
            type="button"
            onClick={onCancel}
            disabled={loading}
            className="h-9 rounded-lg border border-border px-4 text-[11px] font-medium text-secondary transition hover:bg-card-secondary disabled:opacity-50"
          >
            Cancel
          </button>

          <button
            type="button"
            onClick={onConfirm}
            disabled={loading || value !== confirmWord}
            className="flex h-9 items-center gap-1.5 rounded-lg bg-danger px-4 text-[11px] font-medium text-white transition hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-40"
          >
            {loading ? (
              <>
                <span className="h-3.5 w-3.5 animate-spin rounded-full border-2 border-current border-t-transparent" />
                Processing...
              </>
            ) : (
              <>
                {isDelete ? (
                  <Trash2 size={13} />
                ) : (
                  <RotateCcw size={13} />
                )}

                {isDelete ? "Delete account" : "Reset data"}
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
};

export default Settings;