import React from "react";
import { ArrowUpRight, Heart, Wallet } from "lucide-react";
import { Link } from "react-router-dom";

const footerLinks = {
  Product: [
    { label: "Features", href: "#features" },
    { label: "How it works", href: "#how-it-works" },
    { label: "Pricing", href: "#pricing" },
    { label: "Security", href: "#security" },
  ],
  Account: [
    { label: "Login", to: "/login" },
    { label: "Create account", to: "/register" },
  ],
  Resources: [
    { label: "Help center", href: "#" },
    { label: "Privacy", href: "#" },
    { label: "Terms", href: "#" },
  ],
};

const Footer = () => {
  const scrollToSection = (href) => {
    const element = document.querySelector(href);

    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <footer className="relative overflow-hidden border-t border-border bg-card">
      <div className="pointer-events-none absolute left-1/2 top-0 h-64 w-[600px] -translate-x-1/2 rounded-full bg-info-muted/30 blur-3xl" />

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Main footer */}
        <div className="grid gap-10 py-12 sm:py-14 lg:grid-cols-[1.5fr_1fr_1fr_1fr] lg:gap-12 lg:py-16">
          {/* Brand */}
          <div className="max-w-sm">
            <Link to="/" className="inline-flex items-center gap-2">
              <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary text-primary-foreground shadow-sm">
                <Wallet size={15} strokeWidth={2.3} />
              </div>

              <span className="text-base font-bold tracking-tight text-foreground">
                Spendora
              </span>
            </Link>

            <p className="mt-5 text-xs leading-5 text-secondary sm:text-sm sm:leading-6">
              A simpler way to track your spending, manage your budget, and
              build better financial habits.
            </p>

            {/* WhatsApp highlight */}
            <div className="mt-6 inline-flex items-center gap-2 rounded-full border border-success/20 bg-success-muted/60 px-3 py-2">
              <span className="h-1.5 w-1.5 rounded-full bg-success" />

              <span className="text-[10px] font-medium text-success">
                Track expenses through WhatsApp
              </span>
            </div>
          </div>

          {/* Product */}
          <div>
            <h3 className="text-[10px] font-semibold uppercase tracking-[0.12em] text-foreground">
              Product
            </h3>

            <ul className="mt-5 space-y-3">
              {footerLinks.Product.map((link) => (
                <li key={link.label}>
                  <button
                    type="button"
                    onClick={() => scrollToSection(link.href)}
                    className="group inline-flex items-center gap-1 text-xs text-secondary transition-colors hover:text-foreground"
                  >
                    {link.label}

                    <ArrowUpRight
                      size={11}
                      className="opacity-0 transition-opacity group-hover:opacity-100"
                    />
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Account */}
          <div>
            <h3 className="text-[10px] font-semibold uppercase tracking-[0.12em] text-foreground">
              Account
            </h3>

            <ul className="mt-5 space-y-3">
              {footerLinks.Account.map((link) => (
                <li key={link.label}>
                  <Link
                    to={link.to}
                    className="group inline-flex items-center gap-1 text-xs text-secondary transition-colors hover:text-foreground"
                  >
                    {link.label}

                    <ArrowUpRight
                      size={11}
                      className="opacity-0 transition-opacity group-hover:opacity-100"
                    />
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Resources */}
          <div>
            <h3 className="text-[10px] font-semibold uppercase tracking-[0.12em] text-foreground">
              Resources
            </h3>

            <ul className="mt-5 space-y-3">
              {footerLinks.Resources.map((link) => (
                <li key={link.label}>
                  <a
                    href={link.href}
                    className="group inline-flex items-center gap-1 text-xs text-secondary transition-colors hover:text-foreground"
                  >
                    {link.label}

                    <ArrowUpRight
                      size={11}
                      className="opacity-0 transition-opacity group-hover:opacity-100"
                    />
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Bottom */}
        <div className="flex flex-col gap-4 border-t border-border py-6 sm:flex-row sm:items-center sm:justify-between">
          <p className="text-[10px] text-muted sm:text-xs">
            © {new Date().getFullYear()} Spendora. All rights reserved.
          </p>

          <div className="flex items-center gap-1.5 text-[10px] text-muted sm:text-xs">
            Made for better financial habits
            <Heart size={11} className="text-danger" fill="currentColor" />
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;