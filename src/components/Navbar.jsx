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

  return (
    <header className="fixed top-0 inset-x-0 z-50 px-4 sm:px-6 pt-4">
      <div className="mx-auto max-w-7xl">
        {/* ================= DESKTOP / MAIN NAV ================= */}
        <nav className="relative flex h-[64px] items-center justify-between rounded-full border border-slate-200/80 bg-white/80 px-5 shadow-[0_10px_35px_rgba(15,23,42,0.06)] backdrop-blur-2xl sm:px-7 transition-all">
          {/* ================= LOGO ================= */}
          <NavLink to="/" className="group flex items-center py-1">
            <img
              src="/images/squad-logo.png"
              alt="Squad Security System"
              className="h-8 sm:h-9 w-auto object-contain transition-transform duration-300 group-hover:scale-105"
            />
          </NavLink>

          {/* ================= DESKTOP NAVIGATION LINKS ================= */}
          <div className="hidden items-center gap-1 md:flex">
            {links.map((link) => (
              <NavLink
                key={link.to}
                to={link.to}
                className={({ isActive }) =>
                  `group relative px-4 py-2 font-mono text-[11px] font-medium uppercase tracking-[0.16em] transition-all duration-200 ${
                    isActive
                      ? "text-slate-950 font-bold"
                      : "text-slate-600 hover:text-slate-950"
                  }`
                }
              >
                {({ isActive }) => (
                  <>
                    <span>{link.label}</span>
                    {/* Active / Hover Indicator */}
                    <span
                      className={`absolute bottom-0 left-4 right-4 h-[2px] rounded-full bg-gradient-to-r from-blue-600 to-sky-500 transition-all duration-300 ${
                        isActive
                          ? "scale-x-100 opacity-100 shadow-[0_0_8px_#2563eb]"
                          : "scale-x-0 opacity-0 group-hover:scale-x-100 group-hover:opacity-75"
                      }`}
                    />
                  </>
                )}
              </NavLink>
            ))}
          </div>

          {/* ================= DESKTOP ACTION CTA ================= */}
          <div className="hidden items-center md:flex">
            <Link
              to="/contact"
              className="group inline-flex items-center gap-2 rounded-full bg-slate-900 px-5 py-2 font-mono text-[10.5px] font-semibold uppercase tracking-[0.14em] text-white shadow-[0_4px_16px_rgba(15,23,42,0.15)] transition-all duration-300 hover:bg-blue-600 hover:shadow-[0_4px_20px_rgba(37,99,235,0.3)] active:scale-[0.98]"
            >
              <span>Get in Touch</span>
              <ArrowUpRight
                size={14}
                className="text-blue-300 transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-white"
              />
            </Link>
          </div>

          {/* ================= MOBILE MENU BUTTON ================= */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="flex h-9 w-9 items-center justify-center rounded-full border border-slate-200 bg-slate-50 text-slate-800 transition-all duration-300 hover:border-blue-400 hover:bg-blue-50 md:hidden"
            aria-label="Toggle navigation menu"
            aria-expanded={isOpen}
          >
            {isOpen ? <X className="h-4 w-4" /> : <Menu className="h-4 w-4" />}
          </button>
        </nav>

        {/* ================= MOBILE DROPDOWN ================= */}
        {isOpen && (
          <div className="mt-2 overflow-hidden rounded-[24px] border border-slate-200/90 bg-white/95 p-3 shadow-[0_20px_50px_rgba(15,23,42,0.12)] backdrop-blur-2xl md:hidden">
            {links.map((link) => (
              <NavLink
                key={link.to}
                to={link.to}
                onClick={() => setIsOpen(false)}
                className={({ isActive }) =>
                  `flex items-center justify-between rounded-xl px-4 py-3 font-mono text-[11px] font-medium uppercase tracking-[0.16em] transition-all duration-200 ${
                    isActive
                      ? "bg-blue-50 text-blue-900 font-bold"
                      : "text-slate-600 hover:bg-slate-50 hover:text-slate-900"
                  }`
                }
              >
                {({ isActive }) => (
                  <>
                    <span>{link.label}</span>
                    {isActive && (
                      <span className="h-1.5 w-1.5 rounded-full bg-blue-600 shadow-[0_0_8px_#2563eb]" />
                    )}
                  </>
                )}
              </NavLink>
            ))}

            <Link
              to="/contact"
              onClick={() => setIsOpen(false)}
              className="mt-2 flex items-center justify-center gap-2 rounded-xl bg-slate-900 px-4 py-3 font-mono text-[11px] font-bold uppercase tracking-[0.16em] text-white shadow-[0_4px_16px_rgba(15,23,42,0.15)] transition-transform active:scale-[0.98]"
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