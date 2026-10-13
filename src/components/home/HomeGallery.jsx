import React, { useState } from "react";
import { Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import {
  Camera,
  Network,
  Cpu,
  ArrowRight,
  ArrowUpRight,
  CheckCircle2,
  ShieldCheck,
  Compass,
} from "lucide-react";
import { companyServices, cctvBrands } from "../../data/servicesData";

export default function HomeGallery() {
  const [activeTab, setActiveTab] = useState("surveillance");

  const currentService =
    companyServices.find((s) => s.id === activeTab) || companyServices[0];

  return (
    <section className="relative overflow-hidden bg-[#FFFFFF] py-28 sm:py-36 text-slate-900 border-t border-slate-200/80 selection:bg-blue-600 selection:text-white">
      {/* Background Subtle Diffuse Glows */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <div className="absolute top-1/3 -right-48 h-[600px] w-[600px] rounded-full bg-blue-100/50 blur-[160px]" />
        <div className="absolute bottom-10 -left-48 h-[600px] w-[600px] rounded-full bg-sky-100/50 blur-[160px]" />
      </div>

      <div className="relative z-10 mx-auto max-w-7xl px-6 sm:px-10 lg:px-16">
        
        {/* ================= SECTION HEADER ================= */}
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-8 mb-14">
          <div className="max-w-2xl text-left">
            <div className="mb-4 flex items-center gap-2 text-blue-600">
              <span className="h-1.5 w-1.5 rounded-full bg-blue-600" />
              <span className="font-mono text-xs font-bold uppercase tracking-[0.25em]">
                SYSTEM SPECIFICATIONS
              </span>
            </div>

            <h2 className="font-display text-3xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-slate-950 leading-[1.08]">
              Itemized Service{" "}
              <span className="bg-gradient-to-r from-blue-700 via-blue-600 to-sky-600 bg-clip-text text-transparent italic font-normal">
                Directory.
              </span>
            </h2>

            <p className="mt-4 text-base sm:text-lg text-slate-600 font-normal">
              Select an infrastructure vertical below to inspect all 33 certified engineering services.
            </p>
          </div>

          {/* Interactive Vertical Switcher Tabs */}
          <div className="flex flex-wrap gap-2 rounded-full border border-slate-200 bg-slate-100/80 p-1.5 backdrop-blur-xl">
            {companyServices.map((service) => (
              <button
                key={service.id}
                onClick={() => setActiveTab(service.id)}
                className={`rounded-full px-5 py-2.5 font-mono text-xs font-bold uppercase tracking-[0.14em] transition-all duration-300 ${
                  activeTab === service.id
                    ? "bg-slate-950 text-white shadow-[0_4px_16px_rgba(15,23,42,0.18)]"
                    : "text-slate-600 hover:text-slate-950 hover:bg-white/60"
                }`}
              >
                {service.shortTitle}
              </button>
            ))}
          </div>
        </div>

        {/* ================= ACTIVE PILLAR SHOWCASE ================= */}
        <AnimatePresence mode="wait">
          <motion.div
            key={currentService.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.4 }}
            className="rounded-[32px] border border-slate-200/90 bg-[#F8FAFC]/95 p-8 sm:p-12 backdrop-blur-2xl shadow-[0_15px_45px_rgba(15,23,42,0.06)]"
          >
            {/* Header with Approach Callout */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start mb-10 pb-8 border-b border-slate-200">
              <div className="lg:col-span-7">
                <span className="font-mono text-xs font-bold uppercase tracking-[0.2em] text-blue-600">
                  PILLAR {currentService.number} · {currentService.badge}
                </span>

                <h3 className="mt-2 font-display text-3xl sm:text-4xl font-bold text-slate-950">
                  {currentService.title}
                </h3>

                <p className="mt-4 text-base text-slate-600 leading-relaxed font-normal">
                  {currentService.description}
                </p>
              </div>

              <div className="lg:col-span-5 rounded-2xl border border-blue-200/70 bg-blue-50/60 p-5 backdrop-blur-md">
                <div className="flex items-center gap-2 font-mono text-xs font-bold uppercase tracking-wider text-blue-700 mb-2">
                  <Compass size={15} />
                  Our Approach
                </div>
                <p className="text-xs sm:text-sm text-slate-700 leading-relaxed font-normal">
                  {currentService.approach}
                </p>
              </div>
            </div>

            {/* Complete Numbered Service Checklist Grid */}
            <div className="mb-10">
              <div className="flex items-center justify-between mb-6">
                <h4 className="font-mono text-xs font-bold uppercase tracking-[0.2em] text-slate-500">
                  All {currentService.items.length} Scope Deliverables
                </h4>

                <span className="font-mono text-xs text-blue-600 font-semibold">
                  100% Certified Implementation
                </span>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {currentService.items.map((item, idx) => (
                  <div
                    key={item}
                    className="flex items-start gap-3.5 rounded-2xl border border-slate-200/80 bg-white p-4 transition-all duration-300 hover:border-blue-400 hover:shadow-md"
                  >
                    <span className="flex h-6 w-6 flex-shrink-0 items-center justify-center rounded-lg border border-blue-200 bg-blue-50 font-mono text-[11px] font-bold text-blue-700">
                      {idx + 1}
                    </span>
                    <span className="text-sm font-semibold text-slate-800 leading-snug">
                      {item}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* CCTV Brands Pill Bar if Surveillance Tab */}
            {currentService.brands && (
              <div className="mb-10 rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
                <div className="font-mono text-xs uppercase tracking-wider text-slate-500 mb-3 font-semibold">
                  Integrated Industry CCTV Brands
                </div>
                <div className="flex flex-wrap gap-2">
                  {currentService.brands.map((brand) => (
                    <span
                      key={brand}
                      className="rounded-lg border border-blue-200 bg-blue-50/70 px-3 py-1 font-mono text-xs font-bold text-blue-800"
                    >
                      {brand}
                    </span>
                  ))}
                </div>
              </div>
            )}

            {/* Bottom Direct CTA */}
            <div className="flex flex-wrap items-center justify-between gap-4 pt-6 border-t border-slate-200">
              <div className="font-mono text-xs text-slate-500">
                Need customized system schematics or an on-site survey?
              </div>

              <Link
                to="/contact"
                className="group inline-flex items-center gap-2.5 rounded-full bg-slate-950 px-7 py-3 font-mono text-xs font-bold uppercase tracking-[0.14em] text-white shadow-[0_4px_16px_rgba(15,23,42,0.15)] transition-all duration-300 hover:bg-blue-600 hover:shadow-[0_4px_20px_rgba(37,99,235,0.3)]"
              >
                <span>Request Quotation</span>
                <ArrowRight size={14} className="transition-transform duration-300 group-hover:translate-x-1" />
              </Link>
            </div>
          </motion.div>
        </AnimatePresence>

      </div>
    </section>
  );
}