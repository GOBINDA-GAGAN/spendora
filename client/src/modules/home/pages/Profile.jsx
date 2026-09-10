import React, { useState } from "react";
import {
  Camera,
  Check,
  ChevronRight,
  Globe,
  Home,
  Lock,
  Mail,
  MapPin,
  Phone,
  ShieldCheck,
  User,
  X,
} from "lucide-react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { useAuth } from "../../../context/AuthContext";


const Profile = () => {
  const { user } = useAuth();

  const [editing, setEditing] = useState(false);
  const [passwordOpen, setPasswordOpen] = useState(false);

  const initial = user?.name?.charAt(0)?.toUpperCase() || "U";

  /* --------------------------------
     PROFILE FORM
  -------------------------------- */

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm({
    mode: "onBlur",
    defaultValues: {
      name: user?.name || "",
      email: user?.email || "",
      whatsapp: user?.whatsapp || "",
      address: user?.address || "",
      city: user?.city || "",
      state: user?.state || "",
      country: user?.country || "",
    },
  });

  /* --------------------------------
     PASSWORD FORM
  -------------------------------- */

  const {
    register: registerPassword,
    handleSubmit: handlePasswordSubmit,
    reset: resetPassword,
    watch,
    formState: {
      errors: passwordErrors,
      isSubmitting: passwordSubmitting,
    },
  } = useForm({
    mode: "onBlur",
  });

  const newPassword = watch("newPassword");

  /* --------------------------------
     EDIT
  -------------------------------- */

  const handleEdit = () => {
    setEditing(true);
  };

  /* --------------------------------
     CANCEL
  -------------------------------- */

  const handleCancel = () => {
    reset({
      name: user?.name || "",
      email: user?.email || "",
      whatsapp: user?.whatsapp || "",
      address: user?.address || "",
      city: user?.city || "",
      state: user?.state || "",
      country: user?.country || "",
    });

    setEditing(false);
  };

  /* --------------------------------
     SAVE PROFILE
  -------------------------------- */

  const onProfileSubmit = async (data) => {
    try {
      /*
        API WILL BE CONNECTED LATER

        Example:

        await api.patch("/auth/profile", data);
      */

      console.log("Profile data:", data);

      // Temporary frontend simulation
      await new Promise((resolve) => setTimeout(resolve, 700));

      toast.success("Profile updated successfully");

      setEditing(false);
    } catch (error) {
      console.error(error);

      toast.error(
        error?.response?.data?.message ||
          "Something went wrong. Please try again."
      );
    }
  };

  /* --------------------------------
     PASSWORD
  -------------------------------- */

  const onPasswordSubmit = async (data) => {
    try {
      /*
        API WILL BE CONNECTED LATER

        Example:

        await api.patch("/auth/change-password", {
          currentPassword: data.currentPassword,
          newPassword: data.newPassword,
        });
      */

      console.log("Password data:", data);

      // Temporary frontend simulation
      await new Promise((resolve) => setTimeout(resolve, 700));

      toast.success("Password changed successfully");

      resetPassword();
      setPasswordOpen(false);
    } catch (error) {
      console.error(error);

      toast.error(
        error?.response?.data?.message ||
          "Unable to change password."
      );
    }
  };

  return (
    <div className="space-y-5">
      {/* =========================================
          HEADER
      ========================================= */}

      <div>
        <p className="text-[10px] font-semibold uppercase tracking-[0.12em] text-primary">
          Account
        </p>

        <h1 className="mt-1 text-2xl font-semibold tracking-[-0.03em] text-foreground">
          Profile
        </h1>

        <p className="mt-1 text-xs text-secondary">
          Manage your personal information and account settings.
        </p>
      </div>

      {/* =========================================
          MAIN GRID
      ========================================= */}

      <div className="grid grid-cols-1 gap-4 lg:grid-cols-3">
        {/* =======================================
            PERSONAL INFORMATION
        ======================================= */}

        <section className="card lg:col-span-2">
          {/* Card Header */}

          <div className="flex items-center justify-between border-b border-border px-5 py-4">
            <div>
              <h2 className="text-sm font-semibold text-foreground">
                Personal information
              </h2>

              <p className="mt-0.5 text-[10px] text-muted">
                Your basic account and contact information.
              </p>
            </div>

            {/* Header Buttons */}

            {!editing ? (
              <button
                type="button"
                onClick={handleEdit}
                className="btn-primary h-8 rounded-lg px-3 text-[11px] font-medium"
              >
                Edit profile
              </button>
            ) : (
              <div className="flex gap-2">
                {/* Cancel */}

                <button
                  type="button"
                  onClick={handleCancel}
                  disabled={isSubmitting}
                  className="flex h-8 items-center gap-1.5 rounded-lg border border-border px-3 text-[11px] font-medium text-secondary transition hover:bg-card-secondary disabled:opacity-50"
                >
                  <X size={13} />
                  Cancel
                </button>

                {/* Save */}

                <button
                  type="submit"
                  form="profile-form"
                  disabled={isSubmitting}
                  className="btn-primary flex h-8 items-center gap-1.5 rounded-lg px-3 text-[11px] font-medium disabled:opacity-50"
                >
                  <Check size={13} />

                  {isSubmitting ? "Saving..." : "Save"}
                </button>
              </div>
            )}
          </div>

          {/* =====================================
              FORM
          ===================================== */}

          <form
            id="profile-form"
            onSubmit={handleSubmit(onProfileSubmit)}
            className="p-5"
          >
            {/* =================================
                AVATAR
            ================================= */}

            <div className="mb-6 flex items-center gap-4">
              <div className="relative">
                <div className="flex h-16 w-16 items-center justify-center rounded-full bg-primary text-xl font-semibold text-primary-foreground">
                  {initial}
                </div>

                <button
                  type="button"
                  disabled={!editing}
                  className="absolute -bottom-1 -right-1 flex h-7 w-7 items-center justify-center rounded-full border border-border bg-card text-muted shadow-sm transition hover:text-foreground disabled:cursor-not-allowed disabled:opacity-60"
                  aria-label="Change profile picture"
                >
                  <Camera size={13} />
                </button>
              </div>

              <div>
                <h3 className="text-sm font-semibold text-foreground">
                  {user?.name || "User"}
                </h3>

                <p className="mt-0.5 text-[10px] text-muted">
                  {user?.email || "user@example.com"}
                </p>

                <span className="mt-2 inline-flex rounded-full bg-primary-muted px-2 py-1 text-[9px] font-medium capitalize text-primary">
                  {user?.role || "user"}
                </span>
              </div>
            </div>

            {/* =================================
                NAME + EMAIL
            ================================= */}

            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              <FormInput
                label="Full name"
                icon={<User size={14} />}
                disabled={!editing}
                error={errors.name?.message}
                {...register("name", {
                  required: "Name is required",

                  minLength: {
                    value: 2,
                    message:
                      "Name must contain at least 2 characters",
                  },

                  maxLength: {
                    value: 50,
                    message:
                      "Name cannot exceed 50 characters",
                  },
                })}
              />

              <FormInput
                label="Email address"
                type="email"
                icon={<Mail size={14} />}
                disabled={!editing}
                error={errors.email?.message}
                {...register("email", {
                  required: "Email is required",

                  pattern: {
                    value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                    message:
                      "Enter a valid email address",
                  },
                })}
              />

              {/* WhatsApp */}

              <FormInput
                label="WhatsApp number"
                icon={<Phone size={14} />}
                placeholder="+91 98765 43210"
                disabled={!editing}
                error={errors.whatsapp?.message}
                {...register("whatsapp", {
                  pattern: {
                    value: /^[0-9+\-\s()]{8,20}$/,
                    message:
                      "Enter a valid WhatsApp number",
                  },
                })}
              />

              {/* Country */}

              <FormInput
                label="Country"
                icon={<Globe size={14} />}
                placeholder="India"
                disabled={!editing}
                error={errors.country?.message}
                {...register("country", {
                  maxLength: {
                    value: 50,
                    message:
                      "Country name cannot exceed 50 characters",
                  },
                })}
              />
            </div>

            {/* =================================
                ADDRESS
            ================================= */}

            <div className="mt-4">
              <FormInput
                label="Address"
                icon={<Home size={14} />}
                placeholder="House / Street / Area"
                disabled={!editing}
                error={errors.address?.message}
                {...register("address", {
                  maxLength: {
                    value: 200,
                    message:
                      "Address cannot exceed 200 characters",
                  },
                })}
              />
            </div>

            {/* =================================
                CITY + STATE
            ================================= */}

            <div className="mt-4 grid grid-cols-1 gap-4 sm:grid-cols-2">
              <FormInput
                label="City"
                icon={<MapPin size={14} />}
                placeholder="Kolkata"
                disabled={!editing}
                error={errors.city?.message}
                {...register("city", {
                  maxLength: {
                    value: 50,
                    message:
                      "City name cannot exceed 50 characters",
                  },
                })}
              />

              <FormInput
                label="State"
                icon={<MapPin size={14} />}
                placeholder="West Bengal"
                disabled={!editing}
                error={errors.state?.message}
                {...register("state", {
                  maxLength: {
                    value: 50,
                    message:
                      "State name cannot exceed 50 characters",
                  },
                })}
              />
            </div>

            {/* Helper */}

            {editing && (
              <p className="mt-4 text-[10px] text-muted">
                Keep your contact information up to date for
                important Spendora notifications.
              </p>
            )}
          </form>
        </section>

        {/* =======================================
            ACCOUNT STATUS
        ======================================= */}

        <section className="card">
          <div className="border-b border-border px-5 py-4">
            <h2 className="text-sm font-semibold text-foreground">
              Account status
            </h2>

            <p className="mt-0.5 text-[10px] text-muted">
              Security and account overview.
            </p>
          </div>

          <div className="space-y-3 p-4">
            {/* Account */}

            <StatusItem
              icon={<ShieldCheck size={15} />}
              iconClass="bg-success-muted text-success"
              title="Account status"
              description="Active"
              descriptionClass="text-success"
            />

            {/* Password */}

            <button
              type="button"
              onClick={() => setPasswordOpen(true)}
              className="flex w-full items-center gap-3 rounded-lg bg-card-secondary p-3 text-left transition hover:bg-card-secondary/70"
            >
              <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary-muted text-primary">
                <Lock size={15} />
              </div>

              <div className="flex-1">
                <p className="text-xs font-medium text-foreground">
                  Password
                </p>

                <p className="text-[10px] text-muted">
                  Change your password
                </p>
              </div>

              <ChevronRight
                size={15}
                className="text-muted"
              />
            </button>

            {/* WhatsApp */}

            <StatusItem
              icon={<Phone size={15} />}
              iconClass="bg-success-muted text-success"
              title="WhatsApp"
              description={
                user?.whatsapp
                  ? "Connected"
                  : "Add your WhatsApp"
              }
              descriptionClass={
                user?.whatsapp
                  ? "text-success"
                  : "text-muted"
              }
            />
          </div>
        </section>
      </div>

      {/* =========================================
          CHANGE PASSWORD MODAL
      ========================================= */}

      {passwordOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 px-4 backdrop-blur-sm">
          <div className="w-full max-w-md rounded-2xl border border-border bg-card shadow-xl">
            {/* Modal Header */}

            <div className="flex items-center justify-between border-b border-border px-5 py-4">
              <div>
                <h2 className="text-sm font-semibold text-foreground">
                  Change password
                </h2>

                <p className="mt-0.5 text-[10px] text-muted">
                  Update your Spendora password.
                </p>
              </div>

              <button
                type="button"
                onClick={() => {
                  resetPassword();
                  setPasswordOpen(false);
                }}
                className="flex h-8 w-8 items-center justify-center rounded-lg text-muted transition hover:bg-card-secondary hover:text-foreground"
              >
                <X size={16} />
              </button>
            </div>

            {/* Password Form */}

            <form
              onSubmit={handlePasswordSubmit(
                onPasswordSubmit
              )}
              className="space-y-4 p-5"
            >
              <FormInput
                label="Current password"
                type="password"
                icon={<Lock size={14} />}
                error={
                  passwordErrors.currentPassword?.message
                }
                {...registerPassword("currentPassword", {
                  required:
                    "Current password is required",
                })}
              />

              <FormInput
                label="New password"
                type="password"
                icon={<Lock size={14} />}
                error={passwordErrors.newPassword?.message}
                {...registerPassword("newPassword", {
                  required: "New password is required",

                  minLength: {
                    value: 8,
                    message:
                      "Password must contain at least 8 characters",
                  },
                })}
              />

              <FormInput
                label="Confirm new password"
                type="password"
                icon={<Lock size={14} />}
                error={
                  passwordErrors.confirmPassword?.message
                }
                {...registerPassword("confirmPassword", {
                  required:
                    "Please confirm your password",

                  validate: (value) =>
                    value === newPassword ||
                    "Passwords do not match",
                })}
              />

              <button
                type="submit"
                disabled={passwordSubmitting}
                className="btn-primary h-10 w-full rounded-lg text-xs font-medium disabled:opacity-50"
              >
                {passwordSubmitting
                  ? "Updating..."
                  : "Update password"}
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

/* =============================================
   FORM INPUT
============================================= */

const FormInput = React.forwardRef(
  (
    {
      label,
      icon,
      error,
      type = "text",
      disabled = false,
      placeholder,
      ...props
    },
    ref
  ) => {
    const addText = `Add your ${label.toLowerCase()}`;

    return (
      <div>
        {/* Label */}

        <label className="mb-1.5 block text-[10px] font-medium text-foreground">
          {label}
        </label>

        {/* Input Wrapper */}

        <div className="relative">
          {/* Icon always visible */}

          <span
            className={`absolute left-3 top-1/2 z-10 -translate-y-1/2 ${
              disabled
                ? "text-muted"
                : "text-secondary"
            }`}
          >
            {icon}
          </span>

          {/* Input */}

          <input
            ref={ref}
            type={type}
            disabled={disabled}
            placeholder={
              disabled
                ? addText
                : placeholder || addText
            }
            {...props}
            className={`h-10 w-full rounded-lg border bg-card-secondary pl-9 pr-3 text-xs outline-none transition placeholder:text-muted ${
              error
                ? "border-danger focus:border-danger"
                : disabled
                  ? "border-border"
                  : "border-border focus:border-primary focus:ring-2 focus:ring-primary/10"
            } ${
              disabled
                ? "cursor-default opacity-100"
                : "cursor-text"
            } ${
              error
                ? "text-danger"
                : "text-foreground"
            }`}
          />
        </div>

        {/* Error */}

        {error && (
          <p className="mt-1 text-[10px] text-danger">
            {error}
          </p>
        )}
      </div>
    );
  }
);

FormInput.displayName = "FormInput";

/* =============================================
   STATUS ITEM
============================================= */

const StatusItem = ({
  icon,
  iconClass,
  title,
  description,
  descriptionClass = "text-muted",
}) => (
  <div className="flex items-center gap-3 rounded-lg bg-card-secondary p-3">
    <div
      className={`flex h-8 w-8 items-center justify-center rounded-lg ${iconClass}`}
    >
      {icon}
    </div>

    <div className="flex-1">
      <p className="text-xs font-medium text-foreground">
        {title}
      </p>

      <p
        className={`text-[10px] ${descriptionClass}`}
      >
        {description}
      </p>
    </div>
  </div>
);

export default Profile;