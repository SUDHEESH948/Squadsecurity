import React, { useState } from "react";
import { NavLink, Link } from "react-router-dom";
import { Menu, X, ArrowUpRight } from "lucide-react";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  const links = [
    { to: "/", label: "Home" },
    { to: "/services", label: "Services" },
    { to: "/about", label: "About Us" },
    { to: "/projects", label: "Projects" },
    { to: "/contact", label: "Contact" },
  ];

  const navLinkClass = ({ isActive }) =>
    `group relative px-4 py-2 font-mono text-[11px] font-medium uppercase tracking-[0.16em] transition-all duration-200 ${
      isActive
        ? "font-bold text-[#075985]"
        : "text-slate-700 hover:text-[#0284c7]"
    }`;

  return (
    <header className="fixed inset-x-0 top-0 z-50 px-4 pt-4 sm:px-6">
      <div className="mx-auto max-w-7xl">
        {/* Main Navbar */}
        <nav className="relative flex h-[64px] items-center justify-between rounded-full border border-slate-200 bg-white/95 px-5 shadow-[0_8px_30px_rgba(15,23,42,0.10)] backdrop-blur-2xl transition-all duration-300 sm:px-7">
          {/* Logo */}
          <NavLink to="/" className="group flex items-center py-1">
            <img
              src="/images/squad-logo.png"
              alt="Squad Security System"
              className="h-8 w-auto object-contain transition-transform duration-300 group-hover:scale-105 sm:h-9"
            />
          </NavLink>

          {/* Desktop Navigation */}
          <div className="hidden items-center gap-1 md:flex">
            {links.map((link) => (
              <NavLink
                key={link.to}
                to={link.to}
                end={link.to === "/"}
                className={navLinkClass}
              >
                {({ isActive }) => (
                  <>
                    <span>{link.label}</span>
                    <span
                      className={`absolute bottom-0 left-4 right-4 h-[2px] rounded-full bg-gradient-to-r from-sky-400 to-blue-600 transition-all duration-300 ${
                        isActive
                          ? "scale-x-100 opacity-100"
                          : "scale-x-0 opacity-0 group-hover:scale-x-100 group-hover:opacity-75"
                      }`}
                    />
                  </>
                )}
              </NavLink>
            ))}
          </div>

          {/* Desktop CTA */}
          <div className="hidden items-center md:flex">
            <Link
              to="/contact"
              className="group inline-flex items-center gap-2 rounded-full bg-sky-500 px-5 py-2 font-mono text-[10.5px] font-bold uppercase tracking-[0.14em] text-white shadow-[0_4px_14px_rgba(14,165,233,0.20)] transition-all duration-300 hover:scale-105 hover:bg-sky-600 active:scale-[0.98]"
            >
              <span>Get in Touch</span>
              <ArrowUpRight
                size={14}
                className="transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
              />
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <button
            type="button"
            onClick={() => setIsOpen(!isOpen)}
            className="flex h-9 w-9 items-center justify-center rounded-full border border-slate-200 bg-slate-50 text-slate-800 transition-all duration-300 hover:border-sky-400 hover:bg-sky-50 active:scale-95 md:hidden"
            aria-label={
              isOpen ? "Close navigation menu" : "Open navigation menu"
            }
            aria-expanded={isOpen}
          >
            {isOpen ? <X className="h-4 w-4" /> : <Menu className="h-4 w-4" />}
          </button>
        </nav>

        {/* Mobile Dropdown */}
        {isOpen && (
          <div className="mt-2 overflow-hidden rounded-[24px] border border-slate-200 bg-white p-3 shadow-[0_16px_40px_rgba(15,23,42,0.14)] backdrop-blur-2xl md:hidden">
            {links.map((link) => (
              <NavLink
                key={link.to}
                to={link.to}
                end={link.to === "/"}
                onClick={() => setIsOpen(false)}
                className={({ isActive }) =>
                  `flex items-center justify-between rounded-xl px-4 py-3 font-mono text-[11px] font-medium uppercase tracking-[0.16em] transition-all duration-200 ${
                    isActive
                      ? "bg-sky-50 font-bold text-sky-700"
                      : "text-slate-700 hover:bg-slate-50 hover:text-sky-600"
                  }`
                }
              >
                {({ isActive }) => (
                  <>
                    <span>{link.label}</span>
                    {isActive && (
                      <span className="h-1.5 w-1.5 rounded-full bg-sky-500" />
                    )}
                  </>
                )}
              </NavLink>
            ))}

            {/* Mobile CTA */}
            <Link
              to="/contact"
              onClick={() => setIsOpen(false)}
              className="mt-2 flex items-center justify-center gap-2 rounded-xl bg-sky-500 px-4 py-3 font-mono text-[11px] font-bold uppercase tracking-[0.16em] text-white shadow-sm transition-all hover:bg-sky-600 active:scale-[0.98]"
            >
              <span>Get in Touch</span>
              <ArrowUpRight size={14} />
            </Link>
          </div>
        )}
      </div>
    </header>
  );
}
