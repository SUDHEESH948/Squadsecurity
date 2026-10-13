import React from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import {
  MapPin,
  Phone,
  ArrowRight,
  ArrowUpRight,
  Navigation,
  ShieldCheck,
  Clock,
} from "lucide-react";

export default function HomeLocation() {
  return (
    <section
      className="relative overflow-hidden bg-[#F8FAFC] py-28 sm:py-36 text-slate-900 border-t border-slate-200/80 selection:bg-blue-600 selection:text-white"
    >
      {/* Background Volumetric Glows */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <div className="absolute top-1/4 -left-40 h-[500px] w-[500px] rounded-full bg-blue-100/50 blur-[150px]" />
        <div className="absolute bottom-10 -right-40 h-[500px] w-[500px] rounded-full bg-sky-100/50 blur-[150px]" />
      </div>

      <div className="relative z-10 mx-auto max-w-7xl px-6 sm:px-10 lg:px-16">
        
        {/* ================= SECTION HEADER ================= */}
        <div className="mx-auto mb-16 max-w-3xl text-center">
          <div className="mb-4 inline-flex items-center gap-2 text-blue-600">
            <span className="h-1.5 w-1.5 rounded-full bg-blue-600" />
            <span className="font-mono text-xs font-bold uppercase tracking-[0.25em]">
              PHYSICAL HEADQUARTERS
            </span>
          </div>

          <h2 className="my-2 font-display text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-slate-950 leading-tight">
            Physical{" "}
            <span className="bg-gradient-to-r from-blue-700 via-blue-600 to-sky-600 bg-clip-text text-transparent italic font-normal">
              Headquarters.
            </span>
          </h2>

          <p className="mx-auto mt-5 max-w-xl text-base sm:text-lg text-slate-600 font-normal">
            Visit our experience center in Thalikulam, Kerala to test live 4K surveillance optics, motorized gates, and smart automation panels in person.
          </p>
        </div>

        {/* ================= MAIN GRID ================= */}
        <div className="grid items-stretch gap-8 lg:grid-cols-12">
          
          {/* ================= LEFT: INTERACTIVE GOOGLE MAP (7 COLS) ================= */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.7 }}
            className="group relative overflow-hidden rounded-[30px] border border-slate-200/90 bg-white/95 p-3.5 sm:p-5 backdrop-blur-xl lg:col-span-7 shadow-[0_15px_45px_rgba(15,23,42,0.06)] flex flex-col"
          >
            {/* Live Interactive Map Container */}
            <div className="relative overflow-hidden rounded-2xl border border-slate-200/80 w-full h-full min-h-[380px] sm:min-h-[440px] bg-slate-100 shadow-inner">
              <iframe
                title="Squad Security System Headquarters Location Map"
                src="https://maps.google.com/maps?q=Pulipparambil%20Building%20Thalikulam%20Kerala%20680569&t=&z=15&ie=UTF8&iwloc=&output=embed"
                className="h-full w-full border-0 block"
                loading="lazy"
                allowFullScreen
                referrerPolicy="no-referrer-when-downgrade"
              />

              {/* Top Status Overlays */}
              <div className="absolute top-3 left-3 right-3 flex items-center justify-between pointer-events-none">
                <div className="inline-flex items-center gap-2 rounded-full border border-blue-500/20 bg-white/95 px-3 py-1 font-mono text-[10px] font-bold uppercase tracking-wider text-blue-700 shadow-sm backdrop-blur-md">
                  <span className="h-1.5 w-1.5 rounded-full bg-blue-600 animate-pulse" />
                  HQ LIVE LOCATION · NH 66
                </div>

                <a
                  href="https://maps.google.com/?q=Pulipparambil+Building+Thalikulam+Kerala+680569"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="pointer-events-auto inline-flex items-center gap-1 rounded-full border border-slate-200 bg-white/95 px-3 py-1 font-mono text-[10px] font-bold text-slate-700 shadow-sm backdrop-blur-md transition-colors hover:bg-blue-600 hover:text-white"
                >
                  <span>FULL MAP</span>
                  <ArrowUpRight size={12} />
                </a>
              </div>
            </div>
          </motion.div>

          {/* ================= RIGHT: FACILITY DETAILS & MAP (5 COLS) ================= */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.7, delay: 0.15 }}
            className="flex flex-col justify-between rounded-[30px] border border-slate-200/90 bg-white/95 p-7 sm:p-9 backdrop-blur-xl lg:col-span-5 shadow-[0_15px_45px_rgba(15,23,42,0.06)]"
          >
            <div>
              {/* Header Badge */}
              <div className="flex items-center justify-between mb-8">
                <div className="flex h-12 w-12 items-center justify-center rounded-2xl border border-blue-200 bg-blue-50 text-blue-600">
                  <MapPin size={22} />
                </div>

                <div className="inline-flex items-center gap-2 rounded-full border border-blue-200 bg-blue-50 px-3 py-1 font-mono text-[10px] font-bold tracking-wider text-blue-700">
                  <span className="h-2 w-2 rounded-full bg-blue-600 shadow-[0_0_8px_#2563eb]" />
                  WALK-IN WELCOME
                </div>
              </div>

              {/* Facility Name & Address */}
              <h3 className="font-display text-2xl font-bold tracking-tight text-slate-950">
                Squad Security System HQ
              </h3>
              
              <p className="mt-3 text-sm leading-relaxed text-slate-600 font-normal">
                Pulipparambil Building, Room No: VII/504F, NH 66, Thalikulam, Thrissur, Kerala — 680569
              </p>

              {/* Key Details List */}
              <div className="mt-8 space-y-4 border-t border-slate-200 pt-6">
                <div className="flex items-center gap-3">
                  <div className="flex h-8 w-8 items-center justify-center rounded-xl bg-slate-50 border border-slate-200 text-blue-600">
                    <Phone size={14} />
                  </div>
                  <div>
                    <div className="font-mono text-[10px] uppercase text-slate-500 font-semibold">Direct Lines</div>
                    <div className="font-mono text-xs font-bold text-slate-900">
                      +91 99477 36929 / +91 92077 36929
                    </div>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <div className="flex h-8 w-8 items-center justify-center rounded-xl bg-slate-50 border border-slate-200 text-blue-600">
                    <Clock size={14} />
                  </div>
                  <div>
                    <div className="font-mono text-[10px] uppercase text-slate-500 font-semibold">Operating Hours</div>
                    <div className="font-mono text-xs font-bold text-slate-900">
                      Monday – Saturday: 09:00 – 19:00
                    </div>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <div className="flex h-8 w-8 items-center justify-center rounded-xl bg-slate-50 border border-slate-200 text-blue-600">
                    <ShieldCheck size={14} />
                  </div>
                  <div>
                    <div className="font-mono text-[10px] uppercase text-slate-500 font-semibold">Service Coverage</div>
                    <div className="font-mono text-xs font-bold text-slate-900">
                      Thrissur, Ernakulam, Malappuram & All Kerala
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Direct Action Buttons */}
            <div className="mt-10 flex flex-col gap-3">
              <a
                href="https://maps.google.com/?q=Pulipparambil+Building+Thalikulam+Kerala+680569"
                target="_blank"
                rel="noopener noreferrer"
                className="group flex items-center justify-center gap-2.5 rounded-full bg-slate-950 px-6 py-3.5 font-mono text-xs font-bold uppercase tracking-[0.14em] text-white shadow-[0_4px_16px_rgba(15,23,42,0.15)] transition-all duration-300 hover:bg-blue-600 hover:shadow-[0_4px_20px_rgba(37,99,235,0.3)] active:scale-[0.98]"
              >
                <Navigation size={14} />
                <span>Navigate on Google Maps</span>
                <ArrowUpRight size={14} className="transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
              </a>

              <Link
                to="/contact"
                className="flex items-center justify-center gap-2 rounded-full border border-slate-200 bg-slate-50 px-6 py-3.5 font-mono text-xs font-bold uppercase tracking-[0.14em] text-slate-800 transition-all duration-300 hover:bg-slate-100 hover:border-slate-300 active:scale-[0.98]"
              >
                <span>Schedule On-Site Consultation</span>
                <ArrowRight size={14} />
              </Link>
            </div>
          </motion.div>

        </div>

      </div>
    </section>
  );
}