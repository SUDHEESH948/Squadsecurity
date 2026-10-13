import React, { useState } from "react";
import { motion } from "framer-motion";
import {
  ShieldCheck,
  Sparkles,
  Cable,
  ArrowRight,
  CheckCircle2,
  Cpu,
  Radio,
  Mic2,
  SlidersHorizontal,
  Smartphone,
  ChevronRight,
} from "lucide-react";

// ================= DATA ARCHITECTURE =================
const companyInfo = {
  name: "Squad Security System",
  established: "2018",
  tagline: "Intelligent protection engineered for modern spaces.",
  description:
    "Founded on the principle that uncompromising security should seamlessly blend into daily architectural workflows. Squad integrates mission-critical surveillance, robust wired backbones, and ambient automation into one unified ecosystem.",

  stats: [
    { value: "2018", label: "Pioneering Since" },
    { value: "99.9%", label: "Uptime Stability" },
    { value: "100%", label: "Custom Retrofitting" },
  ],

  brands: [
    {
      name: "LUMI",
      subtitle: "Smart Living",
      svg: (
        <svg viewBox="0 0 120 40" className="h-6 w-auto fill-current">
          <text x="5" y="28" fontWeight="900" fontSize="24" letterSpacing="4">
            LUMI
          </text>
        </svg>
      ),
    },
    {
      name: "DomoGenie",
      subtitle: "Simple & Smart",
      svg: (
        <svg viewBox="0 0 160 45" className="h-6 w-auto fill-current">
          <path d="M125 15 C132 8, 142 8, 148 15" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" fill="none" />
          <path d="M129 19 C133 15, 140 15, 144 19" stroke="currentColor" strokeWidth="2" strokeLinecap="round" fill="none" />
          <text x="5" y="27" fontWeight="800" fontSize="20" letterSpacing="0.5">
            Dom<tspan fill="#0ea5e9">@</tspan>Genie
          </text>
        </svg>
      ),
    },
    {
      name: "TREMBLAY",
      subtitle: "Sound Matters",
      svg: (
        <svg viewBox="0 0 150 40" className="h-6 w-auto fill-current">
          <text x="2" y="24" fontWeight="900" fontSize="17" letterSpacing="2.5">
            TREMBLAY
          </text>
        </svg>
      ),
    },
    {
      name: "ESCULT",
      subtitle: "Smart Systems",
      svg: (
        <svg viewBox="0 0 120 40" className="h-6 w-auto fill-current">
          <rect x="5" y="8" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2.5" rx="3" />
          <path d="M10 13 H19 M10 17 H15" stroke="currentColor" strokeWidth="2" />
          <text x="32" y="23" fontWeight="800" fontSize="16" letterSpacing="2">
            ESCULT
          </text>
        </svg>
      ),
    },
    {
      name: "ZMOTE",
      subtitle: "Universal IoT",
      svg: (
        <svg viewBox="0 0 120 40" className="h-6 w-auto fill-current">
          <rect x="2" y="8" width="85" height="24" rx="12" fill="#0284c7" />
          <text x="14" y="24" fontWeight="800" fontSize="13" letterSpacing="2.5" fill="#ffffff">
            zmote
          </text>
        </svg>
      ),
    },
    {
      name: "OZONE",
      subtitle: "Architectural Locks",
      svg: (
        <svg viewBox="0 0 120 40" className="h-6 w-auto fill-current">
          <text x="5" y="27" fontWeight="900" fontSize="21" letterSpacing="3">
            OZONE
          </text>
        </svg>
      ),
    },
  ],

  protocols: [
    {
      name: "KNX System",
      type: "Wired Architecture",
      desc: "Industrial-grade stability with zero latency, tailored for large complexes.",
      badgeColor: "bg-sky-50 text-sky-700 border-sky-200",
    },
    {
      name: "Z-Wave Plus",
      type: "Mesh Hybrid",
      desc: "Dedicated radio frequencies to eliminate interference with standard Wi-Fi.",
      badgeColor: "bg-teal-50 text-teal-700 border-teal-200",
    },
    {
      name: "Zigbee & Wi-Fi",
      type: "Wireless Mesh",
      desc: "High-density modular peripheral mesh for smart sensors and micro-switches.",
      badgeColor: "bg-indigo-50 text-indigo-700 border-indigo-200",
    },
  ],

  platforms: [
    { name: "Google Home", type: "Hub & Assistant" },
    { name: "Apple HomeKit", type: "Siri & Automations" },
    { name: "Amazon Alexa", type: "Voice Service" },
    { name: "Apple Shortcuts", type: "Scene Triggers" },
  ],

  keyBenefits: [
    {
      id: "security",
      title: "Real-Time Perimeter Security",
      description: "Automated event monitoring with instant mobile push alarms and smart gate lock integration.",
      icon: ShieldCheck,
      metric: "Sub-second response alerts",
    },
    {
      id: "interface",
      title: "Intuitive Multi-User Access",
      description: "Streamlined dashboard optimized for simple guest management and multi-generational homes.",
      icon: SlidersHorizontal,
      metric: "Zero complex learning curves",
    },
    {
      id: "retrofit",
      title: "Non-Destructive Retrofitting",
      description: "Integrates directly behind standard switchboards and conduit pipes with zero structural wall damage.",
      icon: Cpu,
      metric: "Fits standard wall boxes",
    },
    {
      id: "scenes",
      title: "Automated Context Scenarios",
      description: "Single-tap routines synchronize lighting levels, CCTV recording profiles, and perimeter gating.",
      icon: Sparkles,
      metric: "Custom scene sequences",
    },
    {
      id: "remote",
      title: "Encrypted Cloud Remote Access",
      description: "End-to-end encrypted protocol channels ensure safe remote camera streaming and control anywhere.",
      icon: Smartphone,
      metric: "256-bit secure transport",
    },
  ],

  cablePartners: ["Finolex", "D-Link", "Polycab", "Schneider Electric"],
};

export default function About() {
  const [activeBenefit, setActiveBenefit] = useState(companyInfo.keyBenefits[0].id);

  return (
    <main className="premium-page premium-about min-h-screen bg-[#F8FAFC] text-[#0F172A] selection:bg-sky-500 selection:text-white">
      {/* Background Gradients */}
      <div className="pointer-events-none fixed inset-0 -z-10 overflow-hidden">
        <div className="absolute -left-[20%] top-0 h-[600px] w-[600px] rounded-full bg-sky-200/40 blur-[130px]" />
        <div className="absolute -right-[15%] top-1/4 h-[550px] w-[550px] rounded-full bg-blue-200/35 blur-[140px]" />
        <div className="absolute bottom-10 left-1/3 h-[500px] w-[500px] rounded-full bg-teal-100/40 blur-[120px]" />
      </div>

      {/* ================= HERO SECTION ================= */}
      <section className="premium-hero relative px-6 pt-24 pb-20 sm:px-8 lg:px-12">
        <div className="mx-auto max-w-6xl">
          <div className="flex flex-col items-center text-center">
            {/* Subtle Text Label */}
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="mb-4 inline-flex items-center gap-2.5 text-blue-600"
            >
              <img
                src="/images/squad-logo.png"
                alt="Squad Security System"
                className="h-6 w-auto object-contain"
              />
              <span className="text-xs font-mono font-bold uppercase tracking-[0.25em] text-blue-600 border-l border-slate-300 pl-2.5">
                About The Company
              </span>
            </motion.div>

            {/* Headline */}
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.1 }}
              className="mt-6 text-4xl font-extrabold tracking-tight sm:text-6xl lg:text-7xl"
            >
              Security crafted to be <br className="hidden sm:block" />
              <span className="bg-gradient-to-r from-sky-600 via-blue-600 to-indigo-600 bg-clip-text text-transparent">
                smart, silent & effortless.
              </span>
            </motion.h1>

            {/* Description */}
            <motion.p
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="mx-auto mt-6 max-w-2xl text-base leading-relaxed text-slate-600 sm:text-lg"
            >
              {companyInfo.tagline} {companyInfo.description}
            </motion.p>

            {/* Metric Strip */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="mt-12 grid w-full max-w-2xl grid-cols-3 divide-x divide-slate-200 rounded-2xl border border-slate-200/80 bg-white/70 p-4 shadow-sm backdrop-blur-sm"
            >
              {companyInfo.stats.map((stat) => (
                <div key={stat.label} className="text-center">
                  <div className="text-xl font-black text-slate-900 sm:text-2xl">{stat.value}</div>
                  <div className="text-[10px] font-semibold uppercase tracking-wider text-slate-400 sm:text-xs">
                    {stat.label}
                  </div>
                </div>
              ))}
            </motion.div>
          </div>
        </div>
      </section>

      {/* ================= PARTNER LOGO GRID ================= */}
      <section className="relative px-6 pb-20 sm:px-8 lg:px-12">
        <div className="mx-auto max-w-6xl">
          <div className="rounded-3xl border border-slate-200/80 bg-white/80 p-8 shadow-sm backdrop-blur-md sm:p-10">
            <div className="flex flex-col items-start justify-between gap-4 border-b border-slate-100 pb-6 md:flex-row md:items-end">
              <div>
                <span className="text-[11px] font-bold uppercase tracking-widest text-sky-600">
                  Global Integration Standards
                </span>
                <h2 className="mt-1 text-2xl font-bold tracking-tight text-slate-900 sm:text-3xl">
                  Certified Technology Partners
                </h2>
              </div>
              <p className="max-w-md text-xs text-slate-500 sm:text-sm">
                Direct integration with precision international manufacturers ensures compatibility, reliability, and long product life cycles.
              </p>
            </div>

            <div className="mt-8 grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-6">
              {companyInfo.brands.map((brand, idx) => (
                <motion.div
                  key={brand.name}
                  initial={{ opacity: 0, y: 15 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: idx * 0.05 }}
                  whileHover={{ y: -3 }}
                  className="group flex flex-col items-center justify-center rounded-2xl border border-slate-100 bg-slate-50/50 p-5 text-slate-700 transition hover:border-sky-300 hover:bg-white hover:text-sky-600 hover:shadow-md hover:shadow-sky-500/5"
                >
                  <div className="flex h-10 w-full items-center justify-center transition-transform group-hover:scale-105">
                    {brand.svg}
                  </div>
                  <span className="mt-3 text-[10px] font-semibold tracking-wide text-slate-400 group-hover:text-slate-600">
                    {brand.subtitle}
                  </span>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ================= ARCHITECTURE BENTO GRID ================= */}
      <section className="relative px-6 pb-20 sm:px-8 lg:px-12">
        <div className="mx-auto max-w-6xl">
          <div className="grid gap-6 lg:grid-cols-12">
            {/* PROTOCOLS (7 COLS) */}
            <motion.div
              initial={{ opacity: 0, y: 25 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="flex flex-col justify-between rounded-3xl border border-slate-200/80 bg-white/90 p-8 shadow-sm backdrop-blur-md lg:col-span-7"
            >
              <div>
                <div className="flex items-center gap-3">
                  <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-sky-50 text-sky-600">
                    <Radio className="h-5 w-5" />
                  </div>
                  <div>
                    <span className="text-[10px] font-bold uppercase tracking-widest text-sky-600">
                      Communication Protocols
                    </span>
                    <h3 className="text-xl font-bold tracking-tight text-slate-900">
                      Standardized Architecture
                    </h3>
                  </div>
                </div>

                <p className="mt-4 text-sm leading-relaxed text-slate-500">
                  We configure open, internationally standardized protocols to prevent signal drops and provide uninterrupted zero-latency performance across all sensors and panels.
                </p>

                <div className="mt-6 space-y-3">
                  {companyInfo.protocols.map((proto) => (
                    <div
                      key={proto.name}
                      className="group flex flex-col justify-between rounded-2xl border border-slate-100 bg-slate-50/60 p-4 transition hover:border-sky-200 hover:bg-white hover:shadow-sm sm:flex-row sm:items-center"
                    >
                      <div>
                        <div className="flex items-center gap-2">
                          <span className="text-sm font-bold text-slate-900">{proto.name}</span>
                          <span className={`rounded-md border px-2 py-0.5 text-[10px] font-bold ${proto.badgeColor}`}>
                            {proto.type}
                          </span>
                        </div>
                        <p className="mt-1 text-xs text-slate-500">{proto.desc}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Cabling Partners */}
              <div className="mt-8 border-t border-slate-100 pt-6">
                <span className="text-[10px] font-bold uppercase tracking-widest text-slate-400">
                  Cabling Infrastructure Partners
                </span>
                <div className="mt-3 flex flex-wrap gap-2">
                  {companyInfo.cablePartners.map((cable) => (
                    <span
                      key={cable}
                      className="inline-flex items-center gap-1.5 rounded-lg border border-slate-200 bg-white px-3 py-1 text-xs font-semibold text-slate-600 shadow-2xs"
                    >
                      <Cable className="h-3 w-3 text-sky-500" />
                      {cable}
                    </span>
                  ))}
                </div>
              </div>
            </motion.div>

            {/* ECOSYSTEM PLATFORMS (5 COLS) */}
            <motion.div
              initial={{ opacity: 0, y: 25 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="flex flex-col justify-between rounded-3xl border border-slate-800 bg-gradient-to-br from-slate-900 via-[#0A192F] to-slate-950 p-8 text-white shadow-xl lg:col-span-5"
            >
              <div>
                <div className="flex items-center gap-3">
                  <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-white/10 text-sky-400">
                    <Mic2 className="h-5 w-5" />
                  </div>
                  <div>
                    <span className="text-[10px] font-bold uppercase tracking-widest text-sky-400">
                      Native Control
                    </span>
                    <h3 className="text-xl font-bold tracking-tight text-white">
                      Smart Assistant Ready
                    </h3>
                  </div>
                </div>

                <div className="mt-6 rounded-2xl border border-white/10 bg-white/5 p-4 text-xs italic text-slate-300">
                  “Command lighting, motorized shutters, digital door locks, and security perimeters directly through simple voice commands and native apps.”
                </div>

                <div className="mt-6 space-y-2.5">
                  {companyInfo.platforms.map((platform) => (
                    <div
                      key={platform.name}
                      className="flex items-center justify-between rounded-xl border border-white/5 bg-white/5 px-4 py-3 transition hover:border-sky-400/30 hover:bg-white/10"
                    >
                      <div className="flex items-center gap-2.5">
                        <CheckCircle2 className="h-4 w-4 text-sky-400" />
                        <span className="text-xs font-bold text-white">{platform.name}</span>
                      </div>
                      <span className="text-[10px] font-medium text-slate-400">{platform.type}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="mt-8 border-t border-white/10 pt-5 text-center text-xs text-slate-400">
                100% platform agnostic — iOS, Android & Voice hubs supported.
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ================= CORE BENEFITS ================= */}
      <section className="relative px-6 pb-24 sm:px-8 lg:px-12">
        <div className="mx-auto max-w-6xl">
          <div className="flex flex-col items-center text-center">
            <span className="text-[11px] font-bold uppercase tracking-widest text-sky-600">
              The Squad Advantage
            </span>
            <h2 className="mt-2 text-3xl font-extrabold tracking-tight text-slate-900 sm:text-4xl">
              Engineered for comfort and peace of mind
            </h2>
            <p className="mt-3 max-w-xl text-sm leading-relaxed text-slate-500">
              Every system is designed around silent reliability, non-intrusive aesthetic integration, and proactive defense.
            </p>
          </div>

          <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {companyInfo.keyBenefits.map((benefit, idx) => {
              const Icon = benefit.icon;
              const isSelected = activeBenefit === benefit.id;

              return (
                <motion.div
                  key={benefit.id}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: idx * 0.05 }}
                  onClick={() => setActiveBenefit(benefit.id)}
                  className={`group relative flex cursor-pointer flex-col justify-between rounded-3xl border p-7 transition-all ${
                    isSelected
                      ? "border-sky-500 bg-white shadow-xl shadow-sky-500/10 ring-1 ring-sky-500"
                      : "border-slate-200/80 bg-white/70 hover:border-slate-300 hover:bg-white"
                  }`}
                >
                  <div>
                    <div className="flex items-center justify-between">
                      <div
                        className={`flex h-12 w-12 items-center justify-center rounded-2xl transition ${
                          isSelected
                            ? "bg-sky-600 text-white"
                            : "bg-slate-100 text-slate-700 group-hover:bg-sky-50 group-hover:text-sky-600"
                        }`}
                      >
                        <Icon className="h-6 w-6" />
                      </div>
                      <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400">
                        {benefit.metric}
                      </span>
                    </div>

                    <h3 className="mt-6 text-base font-bold text-slate-900">{benefit.title}</h3>
                    <p className="mt-2 text-sm leading-relaxed text-slate-500">{benefit.description}</p>
                  </div>

                  <div className="mt-6 flex items-center gap-1.5 text-xs font-semibold text-sky-600">
                    <span>Learn capability</span>
                    <ChevronRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-1" />
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ================= CALL TO ACTION ================= */}
      <section className="relative px-6 pb-24 sm:px-8 lg:px-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="relative mx-auto max-w-6xl overflow-hidden rounded-[32px] bg-gradient-to-r from-slate-950 via-sky-950 to-slate-900 p-8 shadow-2xl sm:p-14"
        >
          <div className="pointer-events-none absolute -right-20 -top-20 h-72 w-72 rounded-full bg-sky-500/20 blur-[100px]" />
          <div className="pointer-events-none absolute -bottom-20 -left-20 h-72 w-72 rounded-full bg-blue-500/20 blur-[100px]" />

          <div className="relative z-10 flex flex-col items-start justify-between gap-8 md:flex-row md:items-center">
            <div>
              <span className="text-[11px] font-bold uppercase tracking-widest text-sky-400">
                Let's Build Your Setup
              </span>
              <h2 className="mt-2 text-3xl font-extrabold tracking-tight text-white sm:text-4xl">
                Ready to make your space safer and smarter?
              </h2>
              <p className="mt-3 max-w-xl text-sm leading-relaxed text-slate-300">
                Book a consultation or schedule an on-site survey for custom home automation, CCTV surveillance topologies, and access control.
              </p>
            </div>

            <a
              href="/contact"
              className="group inline-flex items-center gap-2 rounded-xl bg-white px-7 py-3.5 text-sm font-bold text-slate-950 shadow-lg transition duration-200 hover:bg-sky-50 hover:shadow-sky-500/20"
            >
              Get In Touch
              <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
            </a>
          </div>
        </motion.div>
      </section>
    </main>
  );
}
