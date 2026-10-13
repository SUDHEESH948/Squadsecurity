import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import {
  Video,
  Cpu,
  Lock,
  Home,
  ArrowRight,
  CheckCircle2,
  Sparkles,
  X,
  ExternalLink,
  MessageCircle,
} from "lucide-react";
import { companyInfo } from "../data/companyData";

const ease = [0.22, 1, 0.36, 1];

const u = (id, w = 900) =>
  `https://images.unsplash.com/${id}?auto=format&fit=crop&w=${w}&q=80`;

const projects = [
  {
    title: "Commercial Perimeter CCTV",
    category: "Surveillance",
    description:
      "High-definition camera network with remote monitoring, smart AI line crossing, and color night vision designed for commercial and retail operations.",
    tags: ["HD CCTV", "Night Vision", "Mobile View"],
    icon: <Video className="h-6 w-6" />,
    color: "sky",
    image: u("photo-1557597774-9d273605dfa9"),
  },
  {
    title: "Automated Villa Entry Gate & Shutters",
    category: "Automation",
    description:
      "Smart motorized gate automation with vehicle proximity sensing, rolling security shutters, and seamless emergency manual battery fallback.",
    tags: ["Gate Automation", "Rolling Shutters", "RFID Radar"],
    icon: <Cpu className="h-6 w-6" />,
    color: "blue",
    image: u("photo-1558002038-1055907df827"),
  },
  {
    title: "Smart Lighting & Curtain Setup",
    category: "Smart Home",
    description:
      "Voice-activated scene switches, soft-touch motorized drapery tracks, and integrated keyless biometric lock ecosystems for modern residences.",
    tags: ["Scene Switches", "Curtain Automation", "Alexa / Siri"],
    icon: <Home className="h-6 w-6" />,
    color: "indigo",
    image: u("photo-1513694203232-719a280e022f"),
  },
  {
    title: "Biometric Villa Access & Intercom",
    category: "Access Control",
    description:
      "Integrated smart digital biometric locks with multi-apartment video door phone intercoms, keypad backup, and instantaneous mobile entry authorization.",
    tags: ["Smart Biometrics", "Video Intercom", "Keyless Entry"],
    icon: <Lock className="h-6 w-6" />,
    color: "sky",
    image: u("photo-1584438784894-089d6a62b8fa"),
  },
];

const palette = {
  sky: {
    icon: "bg-sky-50 text-sky-600 border border-sky-100",
    category: "text-sky-600",
    badge: "bg-sky-500 text-white",
    line: "bg-gradient-to-r from-sky-400 via-sky-500 to-blue-500",
    tag: "bg-sky-50/80 border-sky-100 text-sky-700",
    glow: "bg-sky-300/20",
    arrow: "group-hover:text-sky-600",
    stroke: "#0ea5e9",
    ping: "border-sky-400",
  },
  blue: {
    icon: "bg-blue-50 text-blue-600 border border-blue-100",
    category: "text-blue-600",
    badge: "bg-blue-600 text-white",
    line: "bg-gradient-to-r from-blue-400 via-blue-500 to-sky-500",
    tag: "bg-blue-50/80 border-blue-100 text-blue-700",
    glow: "bg-blue-300/20",
    arrow: "group-hover:text-blue-600",
    stroke: "#2563eb",
    ping: "border-blue-400",
  },
  indigo: {
    icon: "bg-indigo-50 text-indigo-600 border border-indigo-100",
    category: "text-indigo-600",
    badge: "bg-indigo-600 text-white",
    line: "bg-gradient-to-r from-indigo-400 via-blue-500 to-sky-400",
    tag: "bg-indigo-50/80 border-indigo-100 text-indigo-700",
    glow: "bg-indigo-300/15",
    arrow: "group-hover:text-indigo-600",
    stroke: "#4f46e5",
    ping: "border-indigo-400",
  },
};

/*
 * BLUEPRINT TRACE + IMAGE REVEAL CARD
 */
function ProjectCard({ item, index, onSelect }) {
  const c = palette[item.color];
  const d = index * 0.15;
  const view = { once: true, amount: 0.2 };

  return (
    <motion.article
      initial="hidden"
      whileInView="show"
      viewport={view}
      whileHover={{ y: -7 }}
      transition={{ duration: 0.3 }}
      onClick={onSelect}
      className="group relative cursor-pointer"
    >
      {/* Blueprint SVG outline */}
      <svg className="pointer-events-none absolute inset-0 z-30 h-full w-full overflow-visible">
        <motion.rect
          x="1"
          y="1"
          width="calc(100% - 2px)"
          height="calc(100% - 2px)"
          rx="28"
          fill="none"
          stroke={c.stroke}
          strokeWidth="2"
          strokeLinecap="round"
          pathLength="1"
          variants={{
            hidden: { pathLength: 0, opacity: 1 },
            show: {
              pathLength: 1,
              opacity: [1, 1, 0],
              transition: {
                duration: 1.5,
                delay: d,
                ease: "easeInOut",
                opacity: { duration: 1.8, delay: d, times: [0, 0.8, 1] },
              },
            },
          }}
        />
      </svg>

      {/* Card body */}
      <motion.div
        variants={{
          hidden: { opacity: 0, scale: 0.97 },
          show: { opacity: 1, scale: 1, transition: { duration: 0.8, delay: d + 0.85, ease } },
        }}
        className="relative overflow-hidden rounded-[28px] border border-sky-100/80 bg-white shadow-[0_20px_70px_rgba(37,99,235,0.07)] backdrop-blur-2xl transition-shadow duration-300 hover:shadow-[0_25px_80px_rgba(14,165,233,0.16)]"
      >
        <div
          className={`absolute -right-20 -top-20 h-48 w-48 rounded-full ${c.glow} opacity-0 blur-[70px] transition-opacity duration-500 group-hover:opacity-100`}
        />

        {/* Top colored accent line */}
        <motion.div
          variants={{
            hidden: { scaleX: 0 },
            show: { scaleX: 1, transition: { duration: 0.9, delay: d + 1.05, ease } },
          }}
          style={{ originX: 0 }}
          className={`absolute left-0 right-0 top-0 z-20 h-1.5 ${c.line}`}
        />

        {/* ================= PROJECT IMAGE HEADER ================= */}
        <div className="relative h-56 w-full overflow-hidden bg-slate-100 sm:h-64">
          <motion.img
            src={item.image}
            alt={item.title}
            loading="lazy"
            initial={{ scale: 1.15, filter: "brightness(0.95)" }}
            whileInView={{ scale: 1, filter: "brightness(1)" }}
            viewport={view}
            transition={{ duration: 1, delay: d + 0.9, ease }}
            className="h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-108"
          />

          {/* Gradients */}
          <div className="absolute inset-0 bg-gradient-to-t from-slate-900/80 via-slate-900/20 to-transparent" />
          <div className="absolute inset-0 bg-gradient-to-b from-slate-900/30 via-transparent to-transparent" />

          {/* Category Badge Floating on Image */}
          <span
            className={`absolute left-5 top-5 z-10 rounded-full px-3.5 py-1 text-[11px] font-bold uppercase tracking-wider shadow-sm backdrop-blur-md ${c.badge}`}
          >
            {item.category}
          </span>

          {/* Project Number Indicator on Image */}
          <motion.span
            variants={{
              hidden: { opacity: 0, x: 20 },
              show: { opacity: 1, x: 0, transition: { duration: 0.6, delay: d + 1.15 } },
            }}
            className="absolute right-5 top-4 font-serif text-3xl font-extrabold text-white/90 drop-shadow-md sm:text-4xl"
          >
            {String(index + 1).padStart(2, "0")}
          </motion.span>

          {/* Floating Icon overlapping Image & Content */}
          <div className="absolute -bottom-6 left-6 z-20">
            <div className="relative">
              <span
                className={`absolute inset-0 rounded-2xl border-2 ${c.ping} opacity-0 group-hover:animate-ping group-hover:opacity-60`}
              />
              <div
                className={`relative flex h-14 w-14 items-center justify-center rounded-2xl bg-white ${c.icon} shadow-[0_10px_30px_rgba(0,0,0,0.12)]`}
              >
                {item.icon}
              </div>
            </div>
          </div>
        </div>

        {/* ================= CONTENT SECTION ================= */}
        <div className="relative z-10 p-6 pt-9 sm:p-8 sm:pt-10">
          <p className={`text-xs font-bold uppercase tracking-[0.2em] ${c.category}`}>
            {item.category} Solution
          </p>

          <h3 className="mt-2 font-serif text-2xl font-bold tracking-[-0.025em] text-slate-900 sm:text-3xl transition-colors group-hover:text-blue-600">
            {item.title}
          </h3>

          <p className="mt-3 font-sans text-sm leading-relaxed text-slate-500 sm:text-base">
            {item.description}
          </p>

          {/* Tags */}
          <div className="mt-6 flex flex-wrap gap-2">
            {item.tags.map((tag, i) => (
              <motion.span
                key={tag}
                variants={{
                  hidden: { opacity: 0, x: -16 },
                  show: {
                    opacity: 1,
                    x: 0,
                    transition: { duration: 0.45, delay: d + 1.25 + i * 0.08, ease },
                  },
                }}
                className={`rounded-full border px-3 py-1.5 text-xs font-semibold ${c.tag}`}
              >
                {tag}
              </motion.span>
            ))}
          </div>

          {/* Bottom Bar */}
          <div className="mt-7 flex items-center justify-between border-t border-sky-100/70 pt-5">
            <div className="flex items-center gap-2 text-xs font-semibold text-slate-400">
              <CheckCircle2 className="h-4 w-4 text-sky-500" />
              Custom engineered installation
            </div>
            <div className={`flex items-center gap-1.5 text-xs font-bold ${c.category}`}>
              <span>View Specs</span>
              <ArrowRight
                className={`h-4 w-4 text-slate-400 transition-all ${c.arrow} group-hover:translate-x-1.5`}
              />
            </div>
          </div>
        </div>
      </motion.div>
    </motion.article>
  );
}

const steps = [
  {
    n: "01",
    title: "Understand",
    text: "We inspect the architectural layout, perimeter blindspots, and automation goals before tailoring a blueprint.",
    text2: "sky",
  },
  {
    n: "02",
    title: "Integrate",
    text: "Surveillance, gate motors, lighting, and access controls are connected into a synchronized, local-first ecosystem.",
    text2: "blue",
  },
  {
    n: "03",
    title: "Deliver",
    text: "Tested for high reliability and configured for intuitive phone, remote, and voice-activated everyday operation.",
    text2: "indigo",
  },
];

const stepStyle = {
  sky: {
    num: "text-sky-600",
    border: "border-sky-100",
    glow: "bg-sky-200/20 group-hover:bg-sky-300/30",
    shadow: "hover:shadow-[0_20px_55px_rgba(14,165,233,0.10)]",
  },
  blue: {
    num: "text-blue-600",
    border: "border-blue-100",
    glow: "bg-blue-200/20 group-hover:bg-blue-300/30",
    shadow: "hover:shadow-[0_20px_55px_rgba(37,99,235,0.10)]",
  },
  indigo: {
    num: "text-indigo-600",
    border: "border-indigo-100",
    glow: "bg-indigo-200/20 group-hover:bg-indigo-300/30",
    shadow: "hover:shadow-[0_20px_55px_rgba(79,70,229,0.10)]",
  },
};

export default function Projects() {
  const [selectedCategory, setSelectedCategory] = useState("ALL");
  const [selectedProject, setSelectedProject] = useState(null);

  const categories = ["ALL", "Surveillance", "Automation", "Smart Home", "Access Control"];

  const filteredProjects =
    selectedCategory === "ALL"
      ? projects
      : projects.filter((p) => p.category === selectedCategory);

  useEffect(() => {
    const onKeyDown = (e) => {
      if (e.key === "Escape") setSelectedProject(null);
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, []);

  return (
    <main className="premium-page premium-projects min-h-screen overflow-hidden bg-[#F7FBFF] text-slate-800">
      {/* BACKGROUND GLOWS */}
      <div className="pointer-events-none fixed inset-0 -z-0 overflow-hidden">
        <div className="absolute -left-40 -top-40 h-[550px] w-[550px] rounded-full bg-sky-200/35 blur-[140px]" />
        <div className="absolute -right-40 top-[35%] h-[550px] w-[550px] rounded-full bg-blue-200/30 blur-[140px]" />
        <div className="absolute bottom-0 left-1/3 h-[350px] w-[450px] rounded-full bg-sky-100/40 blur-[120px]" />
        <div className="absolute left-[42%] top-[20%] h-[350px] w-[350px] rounded-full bg-blue-100/25 blur-[120px]" />
      </div>

      {/* HERO */}
      <section className="premium-hero relative flex min-h-[58vh] items-center justify-center px-6 py-24">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease }}
          className="relative z-10 mx-auto max-w-4xl text-center"
        >
          <div className="mb-6 inline-flex items-center gap-2 text-blue-600">
            <span className="h-1.5 w-1.5 rounded-full bg-blue-600" />
            <span className="font-mono text-xs font-bold uppercase tracking-[0.25em]">
              Portfolio & Deployments
            </span>
          </div>

          <h1 className="font-serif text-5xl font-bold leading-[0.98] tracking-[-0.04em] text-slate-900 sm:text-6xl lg:text-7xl">
            Projects built for
            <br />
            <span className="bg-gradient-to-r from-sky-500 via-blue-600 to-indigo-600 bg-clip-text text-transparent">
              smarter spaces.
            </span>
          </h1>

          <p className="mx-auto mt-7 max-w-2xl font-sans text-base leading-8 text-slate-500 sm:text-lg">
            Explore live implementations of high-definition CCTV, automated gates, connected smart homes, and biometric access controls.
          </p>
        </motion.div>
      </section>

      {/* PROJECTS GRID & CATEGORY FILTERS */}
      <section className="relative px-6 pb-28">
        <div className="mx-auto max-w-6xl">
          <motion.div
            initial={{ opacity: 0, y: 25 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="mb-10 flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between"
          >
            <div>
              <p className="mb-2 text-xs font-bold uppercase tracking-[0.22em] text-sky-600">
                Selected Works
              </p>
              <h2 className="font-serif text-3xl font-bold tracking-[-0.035em] text-slate-900 sm:text-4xl">
                What we build & deploy
              </h2>
            </div>
            
            {/* Category Filter Tabs */}
            <div className="flex flex-wrap gap-2">
              {categories.map((cat) => (
                <button
                  key={cat}
                  onClick={() => setSelectedCategory(cat)}
                  className={`rounded-full px-4 py-2 text-xs font-bold uppercase tracking-wider transition ${
                    selectedCategory === cat
                      ? "bg-blue-600 text-white shadow-md shadow-blue-500/20"
                      : "border border-slate-200 bg-white text-slate-600 hover:border-blue-300 hover:bg-blue-50/50"
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>
          </motion.div>

          <div className="grid gap-8 md:grid-cols-2">
            {filteredProjects.map((item, i) => (
              <ProjectCard
                key={item.title}
                item={item}
                index={i}
                onSelect={() => setSelectedProject(item)}
              />
            ))}
          </div>
        </div>
      </section>

      {/* 3-STEP PROCESS */}
      <section className="relative px-6 pb-28">
        <div className="relative mx-auto max-w-6xl">
          <div className="pointer-events-none absolute -top-6 left-0 right-0 hidden md:block">
            <motion.div
              initial={{ scaleX: 0 }}
              whileInView={{ scaleX: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 1.4, ease }}
              style={{ originX: 0 }}
              className="h-px bg-gradient-to-r from-sky-400 via-blue-500 to-indigo-500"
            />
            <motion.span
              initial={{ left: "0%", opacity: 1 }}
              whileInView={{ left: "100%", opacity: [1, 1, 0] }}
              viewport={{ once: true }}
              transition={{ duration: 1.4, ease }}
              className="absolute -top-1 h-2.5 w-2.5 -translate-x-1/2 rounded-full bg-blue-500 shadow-[0_0_12px_3px_rgba(59,130,246,0.6)]"
            />
          </div>

          <div className="grid gap-5 md:grid-cols-3">
            {steps.map((s, i) => {
              const st = stepStyle[s.text2];
              return (
                <motion.div
                  key={s.n}
                  initial={{ opacity: 0, y: 40 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.7, delay: 0.3 + i * 0.25, ease }}
                  className={`group relative overflow-hidden rounded-[24px] border ${st.border} bg-white/80 p-7 shadow-[0_15px_45px_rgba(37,99,235,0.05)] backdrop-blur-xl transition-all duration-300 ${st.shadow}`}
                >
                  <div className={`absolute -right-10 -top-10 h-28 w-28 rounded-full blur-3xl transition-all ${st.glow}`} />
                  <div className="relative z-10">
                    <motion.div
                      initial={{ scale: 0 }}
                      whileInView={{ scale: 1 }}
                      viewport={{ once: true }}
                      transition={{ type: "spring", stiffness: 260, damping: 14, delay: 0.45 + i * 0.25 }}
                      className={`mb-3 inline-block font-serif text-3xl font-bold ${st.num}`}
                    >
                      {s.n}
                    </motion.div>
                    <h3 className="mb-2 font-serif text-xl font-bold text-slate-900">{s.title}</h3>
                    <p className="font-sans text-sm leading-6 text-slate-500">{s.text}</p>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="px-6 pb-24">
        <motion.div
          initial={{ opacity: 0, y: 35 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="relative mx-auto max-w-6xl overflow-hidden rounded-[32px] bg-gradient-to-br from-sky-950 via-blue-900 to-indigo-950 px-7 py-12 shadow-[0_25px_80px_rgba(30,64,175,0.18)] sm:px-12 sm:py-14"
        >
          <div className="absolute -right-24 -top-24 h-80 w-80 rounded-full bg-sky-400/20 blur-[100px]" />
          <div className="absolute -bottom-24 -left-24 h-80 w-80 rounded-full bg-blue-400/20 blur-[100px]" />

          <div className="relative z-10 flex flex-col gap-8 md:flex-row md:items-center md:justify-between">
            <div>
              <p className="mb-3 text-xs font-bold uppercase tracking-[0.2em] text-sky-300">
                Start Your Project
              </p>
              <h2 className="font-serif text-3xl font-bold tracking-[-0.035em] text-white sm:text-4xl">
                Have a project in mind?
              </h2>
              <p className="mt-3 max-w-xl font-sans leading-7 text-blue-100/80">
                Let's plan, automate, and secure your upcoming property project.
              </p>
            </div>

            <Link
              to="/contact"
              className="group inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-xl bg-white px-7 py-4 font-bold text-blue-900 shadow-[0_10px_30px_rgba(255,255,255,0.12)] transition-all duration-300 hover:bg-sky-50"
            >
              Discuss Your Project
              <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
            </Link>
          </div>
        </motion.div>
      </section>

      {/* ================= PROJECT DETAIL MODAL / LIGHTBOX ================= */}
      <AnimatePresence>
        {selectedProject && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6">
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setSelectedProject(null)}
              className="absolute inset-0 bg-slate-950/75 backdrop-blur-md"
            />

            {/* Modal Dialog */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              transition={{ type: "spring", stiffness: 300, damping: 26 }}
              className="relative z-10 max-h-[90vh] w-full max-w-3xl overflow-y-auto rounded-[32px] border border-sky-100 bg-white p-6 shadow-2xl sm:p-8"
            >
              {/* Close Button */}
              <button
                onClick={() => setSelectedProject(null)}
                aria-label="Close dialog"
                className="absolute right-5 top-5 flex h-10 w-10 items-center justify-center rounded-full bg-slate-100 text-slate-500 hover:bg-slate-200 hover:text-slate-800 transition"
              >
                <X className="h-5 w-5" />
              </button>

              {/* Modal Image Header */}
              <div className="relative h-64 sm:h-72 w-full overflow-hidden rounded-2xl bg-slate-100">
                <img
                  src={selectedProject.image}
                  alt={selectedProject.title}
                  className="h-full w-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-transparent" />
                <span className="absolute bottom-4 left-4 rounded-full bg-sky-500 px-3.5 py-1 text-xs font-bold uppercase tracking-wider text-white">
                  {selectedProject.category}
                </span>
              </div>

              {/* Modal Content */}
              <div className="mt-6">
                <h3 className="font-serif text-2xl sm:text-3xl font-bold text-slate-900">
                  {selectedProject.title}
                </h3>
                <p className="mt-3 text-sm sm:text-base leading-relaxed text-slate-600">
                  {selectedProject.description}
                </p>

                {/* Technical Specifications */}
                <div className="mt-6 rounded-2xl border border-sky-100 bg-sky-50/50 p-5">
                  <h4 className="font-mono text-xs font-bold uppercase tracking-wider text-sky-800">
                    Architectural & Engineering Highlights
                  </h4>
                  <ul className="mt-3 grid gap-2.5 sm:grid-cols-2 text-xs text-slate-700">
                    <li className="flex items-center gap-2">
                      <CheckCircle2 className="h-4 w-4 text-emerald-600 shrink-0" />
                      <span>Zero-latency local priority mesh</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <CheckCircle2 className="h-4 w-4 text-emerald-600 shrink-0" />
                      <span>Industrial weatherproof enclosure</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <CheckCircle2 className="h-4 w-4 text-emerald-600 shrink-0" />
                      <span>Encrypted cloud & local storage</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <CheckCircle2 className="h-4 w-4 text-emerald-600 shrink-0" />
                      <span>Emergency battery fallback integration</span>
                    </li>
                  </ul>
                </div>

                {/* Tags */}
                <div className="mt-5 flex flex-wrap gap-2">
                  {selectedProject.tags.map((tag) => (
                    <span
                      key={tag}
                      className="rounded-full border border-slate-200 bg-slate-50 px-3 py-1 font-mono text-[11px] font-semibold text-slate-600"
                    >
                      {tag}
                    </span>
                  ))}
                </div>

                {/* Modal Action CTA Buttons */}
                <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:items-center">
                  <Link
                    to="/contact"
                    onClick={() => setSelectedProject(null)}
                    className="flex flex-1 items-center justify-center gap-2 rounded-xl bg-blue-600 px-6 py-3.5 text-xs font-bold uppercase tracking-wider text-white shadow hover:bg-blue-700 transition"
                  >
                    <span>Request Similar Solution</span>
                    <ArrowRight className="h-4 w-4" />
                  </Link>

                  <a
                    href={companyInfo.whatsappUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center justify-center gap-2 rounded-xl border border-emerald-300 bg-emerald-50 px-5 py-3.5 text-xs font-bold text-emerald-800 hover:bg-emerald-100 transition"
                  >
                    <MessageCircle className="h-4 w-4 text-emerald-600" />
                    <span>WhatsApp Technical Inquiry</span>
                  </a>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </main>
  );
}
