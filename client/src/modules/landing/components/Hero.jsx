import React from "react";
import { Link } from "react-router-dom";
import {
  ArrowRight,
  Bell,
  ChevronRight,
  Coffee,
  CreditCard,
  Home,
  ShoppingBag,
  TrendingUp,
  Wallet,
  Zap,
} from "lucide-react";

const Hero = () => {
  return (
    <section id="hero" className="relative overflow-hidden">
      {/* Background Grid */}
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.3]"
        style={{
          backgroundImage:
            "linear-gradient(rgba(23,32,31,0.035) 1px, transparent 1px), linear-gradient(90deg, rgba(23,32,31,0.035) 1px, transparent 1px)",
          backgroundSize: "48px 48px",
        }}
      />

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Hero Content */}
        <div className="mx-auto max-w-3xl pt-12 text-center sm:pt-16 lg:pt-20">
          <div className="badge mb-5">
            <span className="mr-2 h-1.5 w-1.5 rounded-full bg-success" />
            Smart expense tracking
          </div>

          <h1 className="text-gradient text-[42px] font-bold leading-[0.98] tracking-[-0.045em] sm:text-5xl md:text-6xl lg:text-[68px]">
            Stop guessing.
            <br />
            Start understanding.
          </h1>

          <p className="mx-auto mt-5 max-w-xl text-sm leading-6 text-secondary sm:text-base sm:leading-7">
            Track your spending, understand where your money goes, and build
            better financial habits with Spendora.
          </p>

          {/* Social Proof */}
          <div className="mt-5 flex flex-wrap items-center justify-center gap-x-2 gap-y-1 text-[10px] text-secondary sm:text-xs">
            <div className="flex items-center gap-[1px] text-accent">
              <span>★</span>
              <span>★</span>
              <span>★</span>
              <span>★</span>
              <span>★</span>
            </div>
            <span className="h-3 w-px bg-border" />
            <span>Trusted by everyday money managers</span>
          </div>
        </div>

        {/* Product Preview */}
        <div className="relative mx-auto mt-10 h-[400px] max-w-6xl sm:mt-12 sm:h-[475px] lg:h-[510px]">
          {/* Phone Shadow */}
          <div className="absolute left-1/2 top-8 h-[360px] w-[190px] -translate-x-1/2 rounded-[30px] bg-primary-muted blur-2xl sm:h-[425px] sm:w-[230px]" />

          {/* Phone */}
          <div className="absolute left-1/2 top-3 z-20 h-[370px] w-[194px] -translate-x-1/2 overflow-hidden rounded-[28px] border-[5px] border-primary bg-card shadow-xl sm:h-[435px] sm:w-[232px]">
            {/* Phone Header */}
            <div className="relative flex h-8 items-center justify-center">
              <div className="absolute top-0 h-4 w-20 rounded-b-xl bg-primary" />
              <span className="absolute left-3 text-[8px] font-medium text-secondary">9:41</span>
              <div className="absolute right-3 flex items-center gap-1">
                <span className="h-1.5 w-2.5 rounded-sm bg-primary" />
                <span className="h-1.5 w-1.5 rounded-full bg-primary" />
              </div>
            </div>

            <div className="px-4 pt-2">
              {/* App Header */}
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-[7px] text-muted">Good Morning</p>
                  <p className="mt-0.5 text-sm font-semibold text-foreground">Your finances</p>
                </div>

                <div className="flex h-7 w-7 items-center justify-center rounded-full bg-primary-muted text-foreground">
                  <Bell size={12} />
                </div>
              </div>

              {/* Balance */}
              <div className="mt-4 rounded-xl bg-primary p-4 text-primary-foreground">
                <div className="flex items-center justify-between">
                  <p className="text-[8px] opacity-70">Total balance</p>
                  <Wallet size={13} />
                </div>

                <p className="mt-1 text-xl font-semibold tracking-tight">₹42,850</p>

                <div className="mt-2 flex items-center gap-1 text-[8px] opacity-70">
                  <TrendingUp size={10} />
                  <span>12.4% saved this month</span>
                </div>
              </div>

              {/* Stats */}
              <div className="mt-3 grid grid-cols-2 gap-2">
                <div className="card-secondary p-2.5">
                  <p className="text-[7px] text-muted">Income</p>
                  <p className="mt-1 text-xs font-semibold text-foreground">₹65,000</p>
                  <p className="mt-1 text-[7px] text-success">+8.2%</p>
                </div>

                <div className="card-secondary p-2.5">
                  <p className="text-[7px] text-muted">Spent</p>
                  <p className="mt-1 text-xs font-semibold text-foreground">₹22,150</p>
                  <p className="mt-1 text-[7px] text-danger">34.1%</p>
                </div>
              </div>

              {/* Recent Expenses */}
              <div className="mt-4">
                <div className="flex items-center justify-between">
                  <p className="text-[9px] font-semibold text-foreground">Recent expenses</p>
                  <span className="text-[7px] text-link">View all</span>
                </div>

                <div className="mt-2 space-y-2">
                  {/* Coffee */}
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-warning-muted text-warning">
                        <Coffee size={11} />
                      </div>

                      <div>
                        <p className="text-[8px] font-medium text-foreground">Coffee Shop</p>
                        <p className="text-[7px] text-muted">Food & Dining</p>
                      </div>
                    </div>

                    <span className="text-[8px] font-medium text-foreground">-₹250</span>
                  </div>

                  {/* Shopping */}
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-info-muted text-info">
                        <ShoppingBag size={11} />
                      </div>

                      <div>
                        <p className="text-[8px] font-medium text-foreground">Shopping</p>
                        <p className="text-[7px] text-muted">Lifestyle</p>
                      </div>
                    </div>

                    <span className="text-[8px] font-medium text-foreground">-₹1,250</span>
                  </div>

                  {/* Rent */}
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-success-muted text-success">
                        <Home size={11} />
                      </div>

                      <div>
                        <p className="text-[8px] font-medium text-foreground">Rent</p>
                        <p className="text-[7px] text-muted">Housing</p>
                      </div>
                    </div>

                    <span className="text-[8px] font-medium text-foreground">-₹8,500</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Phone Navigation */}
            <div className="absolute bottom-0 left-0 right-0 flex h-12 items-center justify-around border-t border-border bg-card">
              <div className="flex flex-col items-center gap-0.5 text-primary">
                <Wallet size={13} />
                <span className="text-[6px]">Home</span>
              </div>

              <div className="flex flex-col items-center gap-0.5 text-muted">
                <TrendingUp size={13} />
                <span className="text-[6px]">Insights</span>
              </div>

              <div className="flex h-8 w-8 items-center justify-center rounded-full bg-primary text-primary-foreground shadow-sm">
                <span className="text-lg leading-none">+</span>
              </div>

              <div className="flex flex-col items-center gap-0.5 text-muted">
                <CreditCard size={13} />
                <span className="text-[6px]">Cards</span>
              </div>

              <div className="flex flex-col items-center gap-0.5 text-muted">
                <Zap size={13} />
                <span className="text-[6px]">Goals</span>
              </div>
            </div>
          </div>

          {/* Left Floating Card */}
          <div className="absolute left-[3%] top-20 z-10 hidden w-48 -rotate-[8deg] rounded-xl border border-border bg-card/90 p-4 shadow-lg backdrop-blur-md sm:block lg:left-[9%] lg:w-56">
            <div className="flex items-start justify-between">
              <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-danger-muted text-danger">
                <TrendingUp size={15} />
              </div>

              <span className="text-[9px] text-muted">Today</span>
            </div>

            <p className="mt-3 text-xs font-semibold text-foreground">High Spend Alert</p>
            <p className="mt-1 text-[10px] leading-4 text-secondary">
              You spent ₹2,450 more than usual this week.
            </p>
          </div>

          {/* Right Floating Card */}
          <div className="absolute right-[3%] top-24 z-10 hidden w-48 rotate-[8deg] rounded-xl border border-border bg-card/90 p-4 shadow-lg backdrop-blur-md sm:block lg:right-[9%] lg:w-56">
            <div className="flex items-start justify-between">
              <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-success-muted text-success">
                <TrendingUp size={15} />
              </div>

              <span className="text-[9px] text-success">+18.5%</span>
            </div>

            <p className="mt-3 text-xs font-semibold text-foreground">Monthly Savings</p>
            <p className="mt-1 text-[10px] leading-4 text-secondary">
              Great work! You saved ₹8,250 this month.
            </p>
          </div>

          {/* Bottom Left Card */}
          <div className="absolute bottom-12 left-[8%] z-30 hidden w-44 -rotate-[5deg] rounded-xl border border-border bg-card/90 p-3 shadow-lg backdrop-blur-md lg:block">
            <div className="flex items-center gap-3">
              <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-warning-muted text-warning">
                <Coffee size={14} />
              </div>

              <div>
                <p className="text-[9px] text-muted">Food & Dining</p>
                <p className="mt-0.5 text-sm font-semibold text-foreground">₹4,850</p>
              </div>
            </div>

            <div className="mt-2 h-1.5 overflow-hidden rounded-full bg-secondary">
              <div className="h-full w-[68%] rounded-full bg-warning" />
            </div>
          </div>

          {/* Bottom Right Card */}
          <div className="absolute bottom-10 right-[8%] z-30 hidden w-48 rotate-[4deg] rounded-xl border border-border bg-card/90 p-3 shadow-lg backdrop-blur-md lg:block">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-[9px] text-muted">Budget remaining</p>
                <p className="mt-1 text-sm font-semibold text-foreground">₹12,450</p>
              </div>

              <div className="flex h-8 w-8 items-center justify-center rounded-full bg-success-muted text-success">
                <ChevronRight size={15} />
              </div>
            </div>
          </div>

          {/* Decorative Lines */}
          <div className="absolute left-[18%] top-[48%] hidden h-24 w-px rotate-[25deg] bg-gradient-to-b from-transparent via-info/20 to-transparent lg:block" />
          <div className="absolute right-[18%] top-[48%] hidden h-24 w-px -rotate-[25deg] bg-gradient-to-b from-transparent via-success/20 to-transparent lg:block" />
        </div>
      </div>
    </section>
  );
};

export default Hero;