import React from "react";
import {
  ArrowRight,
  CheckCircle2,
  Cookie,
  KeyRound,
  LockKeyhole,
  ShieldCheck,
  Smartphone,
} from "lucide-react";
import { Link } from "react-router-dom";

const securityFeatures = [
  {
    icon: LockKeyhole,
    title: "Secure authentication",
    description:
      "Your account is protected with secure authentication and session-based access controls.",
  },
  {
    icon: KeyRound,
    title: "Protected sessions",
    description:
      "Authentication tokens are handled through secure server-side mechanisms instead of browser storage.",
  },
  {
    icon: Smartphone,
    title: "Private by design",
    description:
      "Your personal spending information is designed to stay accessible only to your account.",
  },
  {
    icon: Cookie,
    title: "Secure cookies",
    description:
      "Authentication cookies can use HttpOnly, Secure, and appropriate SameSite protections.",
  },
];

const Security = () => {
  return (
    <section id="security" className="relative overflow-hidden py-20 sm:py-24 lg:py-28">
      <div className="pointer-events-none absolute left-1/2 top-10 h-80 w-[600px] -translate-x-1/2 rounded-full bg-info-muted/40 blur-3xl" />

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mx-auto max-w-2xl text-center">
          <div className="badge mb-4">
            <span className="mr-2 h-1.5 w-1.5 rounded-full bg-success" />
            Security & privacy
          </div>

          <h2 className="text-gradient text-3xl font-bold tracking-[-0.035em] sm:text-4xl lg:text-5xl">
            Your money deserves privacy.
          </h2>

          <p className="mx-auto mt-4 max-w-xl text-sm leading-6 text-secondary sm:text-base sm:leading-7">
            Spendora is built with security in mind, so managing your finances
            doesn't mean giving up control of your personal information.
          </p>
        </div>

        {/* Main security panel */}
        <div className="card relative mx-auto mt-12 max-w-5xl overflow-hidden p-6 sm:mt-14 sm:p-8 lg:p-10">
          <div className="pointer-events-none absolute -right-32 -top-32 h-72 w-72 rounded-full bg-success-muted/50 blur-3xl" />
          <div className="pointer-events-none absolute -bottom-32 -left-32 h-64 w-64 rounded-full bg-info-muted/40 blur-3xl" />

          <div className="relative grid gap-10 lg:grid-cols-[0.9fr_1.1fr] lg:items-center">
            {/* Shield */}
            <div className="flex justify-center lg:justify-start">
              <div className="relative">
                <div className="absolute inset-0 rounded-full bg-success-muted blur-3xl" />

                <div className="relative flex h-52 w-52 items-center justify-center rounded-full border border-border bg-card-secondary shadow-sm sm:h-60 sm:w-60">
                  <div className="absolute inset-6 rounded-full border border-border" />

                  <div className="absolute inset-12 rounded-full bg-success-muted/70" />

                  <ShieldCheck
                    size={78}
                    strokeWidth={1.5}
                    className="relative text-success"
                  />

                  <div className="absolute bottom-7 rounded-full border border-success/20 bg-card px-3 py-1.5 shadow-sm">
                    <div className="flex items-center gap-1.5">
                      <span className="h-1.5 w-1.5 rounded-full bg-success" />

                      <span className="text-[9px] font-semibold text-success">
                        Protection enabled
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Content */}
            <div>
              <div className="inline-flex items-center gap-2 rounded-full border border-border bg-card-secondary px-3 py-1.5">
                <LockKeyhole size={12} className="text-success" />

                <span className="text-[10px] font-medium text-secondary">
                  Built with security in mind
                </span>
              </div>

              <h3 className="mt-5 text-2xl font-bold tracking-[-0.035em] text-foreground sm:text-3xl">
                Security shouldn't be
                <span className="text-muted"> complicated.</span>
              </h3>

              <p className="mt-4 text-sm leading-6 text-secondary">
                Spendora follows security-focused patterns across
                authentication, sessions, cookies, and access control. Your
                financial dashboard should feel simple while the underlying
                protection does the heavy lifting.
              </p>

              <div className="mt-7 space-y-3">
                {[
                  "Authentication handled securely",
                  "Protected account sessions",
                  "Role-based access control",
                  "Sensitive tokens kept away from client-side storage",
                ].map((item) => (
                  <div key={item} className="flex items-center gap-2.5">
                    <CheckCircle2
                      size={15}
                      strokeWidth={2}
                      className="shrink-0 text-success"
                    />

                    <span className="text-xs font-medium text-secondary">
                      {item}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Security features */}
        <div className="mt-5 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {securityFeatures.map((feature) => {
            const Icon = feature.icon;

            return (
              <article
                key={feature.title}
                className="card group relative overflow-hidden p-5 transition-all duration-300 hover:-translate-y-1 hover:shadow-lg"
              >
                <div className="pointer-events-none absolute -right-10 -top-10 h-24 w-24 rounded-full bg-success-muted/50 opacity-0 blur-2xl transition-opacity duration-300 group-hover:opacity-100" />

                <div className="relative flex h-9 w-9 items-center justify-center rounded-lg bg-success-muted text-success">
                  <Icon size={17} />
                </div>

                <h3 className="relative mt-5 text-sm font-semibold text-foreground">
                  {feature.title}
                </h3>

                <p className="relative mt-2 text-xs leading-5 text-secondary">
                  {feature.description}
                </p>
              </article>
            );
          })}
        </div>

        {/* Bottom CTA */}
        <div className="mt-10 flex flex-col items-center justify-center gap-4 text-center sm:mt-12">
          <div className="flex items-center gap-2">
            <ShieldCheck size={15} className="text-success" />

            <p className="text-xs text-secondary">
              Designed around privacy, security, and user control.
            </p>
          </div>

          <Link
            to="/register"
            className="btn-primary inline-flex h-10 items-center gap-2 px-5 text-xs font-medium"
          >
            Create your account
            <ArrowRight size={13} />
          </Link>
        </div>
      </div>
    </section>
  );
};

export default Security;