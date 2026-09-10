import React from "react";
import {
  ArrowRight,
  CheckCircle2,
  Plus,
  Receipt,
  BarChart3,
  Target,
} from "lucide-react";
import { Link } from "react-router-dom";

const steps = [
  {
    number: "01",
    icon: Plus,
    title: "Add your expenses",
    description:
      "Quickly record what you spend and organize it into simple categories.",
  },
  {
    number: "02",
    icon: BarChart3,
    title: "Understand your spending",
    description:
      "See where your money goes with clear insights and easy-to-read summaries.",
  },
  {
    number: "03",
    icon: Target,
    title: "Build better habits",
    description:
      "Set budgets, track your progress, and make smarter decisions with your money.",
  },
];

const HowItWorks = () => {
  return (
    <section id="how-it-works" className="relative overflow-hidden py-20 sm:py-24 lg:py-28">
      <div className="pointer-events-none absolute left-1/2 top-20 h-72 w-[500px] -translate-x-1/2 rounded-full bg-success-muted/40 blur-3xl" />

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mx-auto max-w-2xl text-center">
          <div className="badge mb-4">
            <span className="mr-2 h-1.5 w-1.5 rounded-full bg-success" />
            How it works
          </div>

          <h2 className="text-gradient text-3xl font-bold tracking-[-0.035em] sm:text-4xl lg:text-5xl">
            Simple from day one.
          </h2>

          <p className="mx-auto mt-4 max-w-xl text-sm leading-6 text-secondary sm:text-base sm:leading-7">
            Spendora removes the complexity from managing your money. Start
            tracking in minutes and let the numbers tell the story.
          </p>
        </div>

        {/* Steps */}
        <div className="relative mt-14 lg:mt-16">
          {/* Connection line */}
          <div className="absolute left-[16.66%] right-[16.66%] top-10 hidden h-px bg-border lg:block" />

          <div className="grid gap-5 lg:grid-cols-3">
            {steps.map((step) => {
              const Icon = step.icon;

              return (
                <div key={step.number} className="relative">
                  {/* Step */}
                  <div className="card group relative h-full p-6 transition-all duration-300 hover:-translate-y-1 hover:shadow-lg sm:p-7">
                    {/* Number */}
                    <div className="flex items-center justify-between">
                      <span className="text-[11px] font-semibold tracking-wider text-muted">
                        {step.number}
                      </span>

                      <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary text-primary-foreground transition-transform duration-300 group-hover:scale-105">
                        <Icon size={18} strokeWidth={2} />
                      </div>
                    </div>

                    <h3 className="mt-6 text-base font-semibold tracking-tight text-foreground sm:text-lg">
                      {step.title}
                    </h3>

                    <p className="mt-2 text-xs leading-5 text-secondary sm:text-sm sm:leading-6">
                      {step.description}
                    </p>

                    {/* Bottom line */}
                    <div className="mt-6 h-px w-0 bg-primary transition-all duration-300 group-hover:w-full" />
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Product flow */}
        <div className="mt-5 grid gap-5 lg:grid-cols-[1.1fr_0.9fr]">
          {/* Expense example */}
          <div className="card relative overflow-hidden p-6 sm:p-8">
            <div className="pointer-events-none absolute -right-20 -top-20 h-48 w-48 rounded-full bg-info-muted/60 blur-3xl" />

            <div className="relative">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-xs font-medium text-muted">
                    Your daily spending
                  </p>

                  <h3 className="mt-1 text-lg font-semibold tracking-tight text-foreground">
                    Everything in one place
                  </h3>
                </div>

                <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-info-muted text-info">
                  <Receipt size={17} />
                </div>
              </div>

              {/* Transactions */}
              <div className="mt-6 space-y-2">
                <div className="flex items-center justify-between rounded-lg border border-border bg-card-secondary p-3">
                  <div className="flex items-center gap-3">
                    <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-warning-muted text-warning">
                      <Receipt size={13} />
                    </div>

                    <div>
                      <p className="text-xs font-medium text-foreground">
                        Grocery Store
                      </p>

                      <p className="text-[10px] text-muted">
                        Food & Dining
                      </p>
                    </div>
                  </div>

                  <span className="text-xs font-semibold text-foreground">
                    -₹1,850
                  </span>
                </div>

                <div className="flex items-center justify-between rounded-lg border border-border bg-card-secondary p-3">
                  <div className="flex items-center gap-3">
                    <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-success-muted text-success">
                      <CheckCircle2 size={13} />
                    </div>

                    <div>
                      <p className="text-xs font-medium text-foreground">
                        Salary
                      </p>

                      <p className="text-[10px] text-muted">
                        Income
                      </p>
                    </div>
                  </div>

                  <span className="text-xs font-semibold text-success">
                    +₹65,000
                  </span>
                </div>

                <div className="flex items-center justify-between rounded-lg border border-border bg-card-secondary p-3">
                  <div className="flex items-center gap-3">
                    <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-accent-muted text-accent">
                      <Receipt size={13} />
                    </div>

                    <div>
                      <p className="text-xs font-medium text-foreground">
                        Netflix
                      </p>

                      <p className="text-[10px] text-muted">
                        Entertainment
                      </p>
                    </div>
                  </div>

                  <span className="text-xs font-semibold text-foreground">
                    -₹649
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Simple insight */}
          <div className="card relative overflow-hidden p-6 sm:p-8">
            <div className="pointer-events-none absolute -bottom-20 -right-20 h-48 w-48 rounded-full bg-success-muted/60 blur-3xl" />

            <div className="relative">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-xs font-medium text-muted">
                    Spendora insight
                  </p>

                  <h3 className="mt-1 text-lg font-semibold tracking-tight text-foreground">
                    Your money has a story.
                  </h3>
                </div>

                <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-success-muted text-success">
                  <BarChart3 size={17} />
                </div>
              </div>

              {/* Insight */}
              <div className="mt-6 rounded-xl border border-border bg-card-secondary p-5">
                <div className="flex items-start gap-3">
                  <div className="mt-0.5 flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-success-muted text-success">
                    <CheckCircle2 size={15} />
                  </div>

                  <div>
                    <p className="text-sm font-semibold text-foreground">
                      You're spending less on dining
                    </p>

                    <p className="mt-1 text-xs leading-5 text-secondary">
                      Your food spending is down 18% compared with last month.
                    </p>
                  </div>
                </div>

                <div className="mt-5 h-2 overflow-hidden rounded-full bg-secondary">
                  <div className="h-full w-[72%] rounded-full bg-success" />
                </div>

                <div className="mt-2 flex items-center justify-between">
                  <span className="text-[10px] text-muted">
                    Last month
                  </span>

                  <span className="text-[10px] font-medium text-success">
                    18% lower
                  </span>
                </div>
              </div>

              {/* CTA */}
              <div className="mt-6 flex items-center justify-between">
                <p className="text-xs text-secondary">
                  Small changes add up.
                </p>

                <span className="inline-flex items-center gap-1 text-xs font-medium text-link">
                  See insights
                  <ArrowRight size={13} />
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom CTA */}
        <div className="mt-12 text-center sm:mt-14">
          <Link
            to="/register"
            className="btn-primary inline-flex h-10 items-center gap-2 px-5 text-xs font-medium"
          >
            Start with Spendora
            <ArrowRight size={14} />
          </Link>
        </div>
      </div>
    </section>
  );
};

export default HowItWorks;