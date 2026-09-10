import React from "react";
import {
  BarChart3,
  BellRing,
  Brain,
  PieChart,
  ShieldCheck,
  Target,
  WalletCards,
} from "lucide-react";

const features = [
  {
    icon: WalletCards,
    title: "Track every expense",
    description:
      "Record your daily spending in seconds and keep every transaction organized in one place.",
    iconBg: "bg-info-muted",
    iconColor: "text-info",
  },
  {
    icon: PieChart,
    title: "Understand your spending",
    description:
      "See exactly where your money goes with simple categories and clear spending breakdowns.",
    iconBg: "bg-success-muted",
    iconColor: "text-success",
  },
  {
    icon: BarChart3,
    title: "Powerful insights",
    description:
      "Turn your spending history into useful insights so you can make smarter financial decisions.",
    iconBg: "bg-accent-muted",
    iconColor: "text-accent",
  },
  {
    icon: Target,
    title: "Set budgets & goals",
    description:
      "Create realistic budgets and savings goals, then stay on track without complicated spreadsheets.",
    iconBg: "bg-warning-muted",
    iconColor: "text-warning",
  },
  {
    icon: BellRing,
    title: "Smart alerts",
    description:
      "Get notified when your spending approaches a budget or something unusual needs your attention.",
    iconBg: "bg-danger-muted",
    iconColor: "text-danger",
  },
  {
    icon: ShieldCheck,
    title: "Private & secure",
    description:
      "Your financial information stays protected with secure authentication and privacy-focused design.",
    iconBg: "bg-primary-muted",
    iconColor: "text-foreground",
  },
];

const Features = () => {
  return (
    <section id="features" className="relative overflow-hidden py-20 sm:py-24 lg:py-28">
      {/* Background Glow */}
      <div className="pointer-events-none absolute left-1/2 top-0 h-72 w-[600px] -translate-x-1/2 rounded-full bg-info-muted/40 blur-3xl" />

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="mx-auto max-w-2xl text-center">
          <div className="badge mb-4">
            <span className="mr-2 h-1.5 w-1.5 rounded-full bg-success" />
            Everything you need
          </div>

          <h2 className="text-gradient text-3xl font-bold tracking-[-0.035em] sm:text-4xl lg:text-5xl">
            Your money, made clearer.
          </h2>

          <p className="mx-auto mt-4 max-w-xl text-sm leading-6 text-secondary sm:text-base sm:leading-7">
            Spendora gives you the tools to understand your spending, manage
            your budget, and build better financial habits.
          </p>
        </div>

        {/* Feature Grid */}
        <div className="mt-12 grid gap-4 sm:grid-cols-2 lg:mt-16 lg:grid-cols-3">
          {features.map((feature) => {
            const Icon = feature.icon;

            return (
              <article
                key={feature.title}
                className="card group relative overflow-hidden p-5 transition-all duration-300 hover:-translate-y-1 hover:shadow-lg sm:p-6"
              >
                {/* Hover Glow */}
                <div className="pointer-events-none absolute -right-12 -top-12 h-28 w-28 rounded-full bg-primary-muted/50 opacity-0 blur-2xl transition-opacity duration-300 group-hover:opacity-100" />

                {/* Icon */}
                <div className={`relative flex h-10 w-10 items-center justify-center rounded-lg ${feature.iconBg} ${feature.iconColor}`}>
                  <Icon size={19} strokeWidth={2} />
                </div>

                {/* Content */}
                <div className="relative mt-5">
                  <h3 className="text-sm font-semibold tracking-tight text-foreground sm:text-base">
                    {feature.title}
                  </h3>

                  <p className="mt-2 text-xs leading-5 text-secondary sm:text-sm sm:leading-6">
                    {feature.description}
                  </p>
                </div>

                {/* Bottom Line */}
                <div className="mt-5 h-px w-0 bg-border-strong transition-all duration-300 group-hover:w-full" />
              </article>
            );
          })}
        </div>

        {/* Feature Showcase */}
        <div className="mt-4 grid gap-4 lg:grid-cols-2">
          {/* Spending Insights */}
          <div className="card group relative overflow-hidden p-6 sm:p-7">
            <div className="pointer-events-none absolute -right-16 -top-16 h-40 w-40 rounded-full bg-success-muted/60 blur-3xl" />

            <div className="relative">
              <div className="flex items-start justify-between">
                <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-success-muted text-success">
                  <Brain size={19} />
                </div>

                <span className="hidden rounded-full bg-success-muted px-2.5 py-1 text-[10px] font-medium text-success sm:block">
                  Insights
                </span>
              </div>

              <h3 className="mt-5 text-base font-semibold text-foreground">
                Know where your money goes
              </h3>

              <p className="mt-2 max-w-md text-xs leading-5 text-secondary sm:text-sm sm:leading-6">
                Spendora turns your transactions into simple, actionable
                insights so you can spot spending patterns before they become
                problems.
              </p>

              {/* Chart */}
              <div className="mt-7 rounded-lg border border-border bg-card-secondary p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-[10px] text-muted">
                      Monthly spending
                    </p>

                    <p className="mt-1 text-lg font-semibold text-foreground">
                      ₹28,750
                    </p>
                  </div>

                  <div className="text-right">
                    <p className="text-[10px] text-muted">
                      vs last month
                    </p>

                    <p className="mt-1 text-xs font-medium text-success">
                      -12.4%
                    </p>
                  </div>
                </div>

                <div className="mt-5 flex h-20 items-end gap-1.5 sm:gap-2">
                  {[38, 52, 45, 68, 55, 72, 61, 82, 66, 88, 74, 62].map(
                    (height, index) => (
                      <div key={index} className="flex h-full flex-1 items-end">
                        <div
                          className="w-full rounded-t bg-success/70 transition-all duration-300 group-hover:bg-success"
                          style={{ height: `${height}%` }}
                        />
                      </div>
                    )
                  )}
                </div>

                <div className="mt-2 flex justify-between text-[8px] text-muted">
                  <span>Jan</span>
                  <span>Feb</span>
                  <span>Mar</span>
                  <span>Apr</span>
                  <span>May</span>
                  <span>Jun</span>
                </div>
              </div>
            </div>
          </div>

          {/* Budget */}
          <div className="card group relative overflow-hidden p-6 sm:p-7">
            <div className="pointer-events-none absolute -bottom-16 -right-16 h-40 w-40 rounded-full bg-accent-muted/60 blur-3xl" />

            <div className="relative">
              <div className="flex items-start justify-between">
                <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-accent-muted text-accent">
                  <Target size={19} />
                </div>

                <span className="hidden rounded-full bg-accent-muted px-2.5 py-1 text-[10px] font-medium text-accent sm:block">
                  Budget
                </span>
              </div>

              <h3 className="mt-5 text-base font-semibold text-foreground">
                Stay ahead of your budget
              </h3>

              <p className="mt-2 max-w-md text-xs leading-5 text-secondary sm:text-sm sm:leading-6">
                Set spending limits for the things that matter and always know
                how much you have left.
              </p>

              {/* Budget Preview */}
              <div className="mt-7 rounded-lg border border-border bg-card-secondary p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-[10px] text-muted">
                      Monthly budget
                    </p>

                    <p className="mt-1 text-lg font-semibold text-foreground">
                      ₹40,000
                    </p>
                  </div>

                  <div className="text-right">
                    <p className="text-[10px] text-muted">
                      Remaining
                    </p>

                    <p className="mt-1 text-xs font-medium text-accent">
                      ₹12,450
                    </p>
                  </div>
                </div>

                <div className="mt-5 h-2 overflow-hidden rounded-full bg-secondary">
                  <div className="h-full w-[69%] rounded-full bg-accent transition-all duration-500 group-hover:w-[73%]" />
                </div>

                <div className="mt-2 flex justify-between">
                  <span className="text-[9px] text-muted">
                    ₹27,550 spent
                  </span>

                  <span className="text-[9px] text-secondary">
                    69%
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Message */}
        <div className="mt-10 text-center">
          <p className="text-xs text-secondary">
            Built to make managing your money feel simple, not stressful.
          </p>
        </div>
      </div>
    </section>
  );
};

export default Features;