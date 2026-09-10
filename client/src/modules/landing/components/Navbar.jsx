import React, { useState } from "react";
import { Link } from "react-router-dom";
import {
  Wallet,
  Menu,
  X,
  ArrowRight,
} from "lucide-react";

const Navbar = () => {
  const [mobileMenu, setMobileMenu] = useState(false);

  return (
    <header className="sticky top-0 z-50 border-b border-border bg-background/90 backdrop-blur-xl">
      <div className="mx-auto flex h-14 max-w-6xl items-center justify-between px-4 sm:px-6 lg:px-8">

        {/* Logo */}
        <Link
          to="/"
          className="flex items-center gap-2"
        >
          <div className="flex h-7 w-7 items-center justify-center rounded-md bg-primary text-primary-foreground">
            <Wallet size={14} strokeWidth={2.4} />
          </div>

          <span className="text-sm font-semibold tracking-tight text-foreground">
            Spendora
          </span>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden items-center gap-6 md:flex">
          <a
            href="#features"
            className="text-[11px] font-medium text-secondary transition-colors hover:text-foreground"
          >
            Features
          </a>

          <a
            href="#how-it-works"
            className="text-[11px] font-medium text-secondary transition-colors hover:text-foreground"
          >
            How it works
          </a>

          <a
            href="#pricing"
            className="text-[11px] font-medium text-secondary transition-colors hover:text-foreground"
          >
            Pricing
          </a>

          <a
            href="#security"
            className="text-[11px] font-medium text-secondary transition-colors hover:text-foreground"
          >
            Security
          </a>
        </nav>

        {/* Desktop Actions */}
        <div className="hidden items-center gap-3 md:flex">
          <Link
            to="/login"
            className="px-2 py-1.5 text-[11px] font-medium text-secondary transition-colors hover:text-foreground"
          >
            Login
          </Link>

          <Link
            to="/register"
            className="inline-flex h-8 items-center gap-1.5 rounded-md bg-primary px-3.5 text-[11px] font-medium text-primary-foreground shadow-sm transition-all hover:bg-primary-hover active:scale-[0.98]"
          >
            Get started
            <ArrowRight size={12} />
          </Link>
        </div>

        {/* Mobile Menu Button */}
        <button
          type="button"
          onClick={() => setMobileMenu((value) => !value)}
          className="flex h-8 w-8 items-center justify-center rounded-md border border-border text-foreground transition hover:bg-card-secondary md:hidden"
          aria-label="Toggle navigation"
          aria-expanded={mobileMenu}
        >
          {mobileMenu ? (
            <X size={17} />
          ) : (
            <Menu size={17} />
          )}
        </button>
      </div>

      {/* Mobile Navigation */}
      {mobileMenu && (
        <div className="border-t border-border bg-background md:hidden">
          <nav className="mx-auto flex max-w-6xl flex-col px-4 py-3 sm:px-6">

            <a
              href="#features"
              onClick={() => setMobileMenu(false)}
              className="rounded-md px-3 py-2.5 text-xs font-medium text-secondary transition hover:bg-card-secondary hover:text-foreground"
            >
              Features
            </a>

            <a
              href="#how-it-works"
              onClick={() => setMobileMenu(false)}
              className="rounded-md px-3 py-2.5 text-xs font-medium text-secondary transition hover:bg-card-secondary hover:text-foreground"
            >
              How it works
            </a>

            <a
              href="#pricing"
              onClick={() => setMobileMenu(false)}
              className="rounded-md px-3 py-2.5 text-xs font-medium text-secondary transition hover:bg-card-secondary hover:text-foreground"
            >
              Pricing
            </a>

            <a
              href="#security"
              onClick={() => setMobileMenu(false)}
              className="rounded-md px-3 py-2.5 text-xs font-medium text-secondary transition hover:bg-card-secondary hover:text-foreground"
            >
              Security
            </a>

            <div className="my-2 h-px bg-border" />

            <Link
              to="/login"
              onClick={() => setMobileMenu(false)}
              className="rounded-md px-3 py-2.5 text-xs font-medium text-secondary transition hover:bg-card-secondary hover:text-foreground"
            >
              Login
            </Link>

            <Link
              to="/register"
              onClick={() => setMobileMenu(false)}
              className="mt-2 flex h-9 items-center justify-center gap-2 rounded-md bg-primary text-xs font-medium text-primary-foreground transition hover:bg-primary-hover"
            >
              Get started
              <ArrowRight size={13} />
            </Link>

          </nav>
        </div>
      )}
    </header>
  );
};

export default Navbar;