import React from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowRight, Camera, Cpu, Network, ShieldCheck, Sun } from "lucide-react";
import { companyServices } from "../../data/servicesData";

const iconMap = { Camera, Network, Cpu, Sun };
const ease = [0.22, 1, 0.36, 1];

export default function HomeAbout() {
  return (
    <section className="relative overflow-hidden bg-[#F8FAFC] py-20 text-slate-900 sm:py-28">
      <div className="pointer-events-none absolute inset-0"><div className="absolute -left-48 top-24 h-96 w-96 rounded-full bg-blue-200/30 blur-[130px]" /><div className="absolute -right-48 bottom-16 h-96 w-96 rounded-full bg-sky-200/30 blur-[130px]" /></div>
      <div className="relative mx-auto max-w-7xl px-6 sm:px-10 lg:px-16">
        <motion.div initial={{ opacity: 0, y: 18 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, amount: 0.3 }} transition={{ duration: 0.7, ease }} className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
          <div className="max-w-2xl"><p className="flex items-center gap-2 text-xs font-bold uppercase tracking-[.22em] text-blue-600"><span className="h-1.5 w-1.5 rounded-full bg-blue-600" />Our services</p><h2 className="mt-4 text-4xl font-semibold leading-[1.04] tracking-[-.04em] text-slate-950 sm:text-5xl">Everything you need to protect and power your space.</h2></div>
          <Link to="/services" className="group inline-flex w-fit items-center gap-2 rounded-full border border-slate-200 bg-white px-5 py-3 text-xs font-bold uppercase tracking-[.14em] text-slate-800 shadow-sm transition hover:border-blue-500 hover:text-blue-600">View all services <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" /></Link>
        </motion.div>
        <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {companyServices.filter((service) => service.id !== "solar").map((service, index) => {
            const Icon = iconMap[service.iconName] || ShieldCheck;
            const image = service.image;
            return <motion.article key={service.id} initial={{ opacity: 0, y: 28 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, amount: 0.15 }} transition={{ duration: 0.7, delay: index * 0.09, ease }} whileHover={{ y: -7 }} className="group overflow-hidden rounded-[1.6rem] border border-slate-200 bg-white shadow-[0_14px_35px_rgba(15,23,42,.055)]">
              <div className="relative h-44 overflow-hidden bg-slate-100"><img src={image} alt={service.imageAlt} className="h-full w-full object-cover transition duration-700 group-hover:scale-110" /><div className="absolute inset-0 bg-gradient-to-t from-slate-950/65 via-transparent to-transparent" /><div className="absolute bottom-4 left-4 flex h-10 w-10 items-center justify-center rounded-xl bg-white/90 text-blue-600 shadow-lg backdrop-blur"><Icon className="h-5 w-5" /></div><span className="absolute right-4 top-4 rounded-full bg-slate-950/70 px-2.5 py-1 text-[10px] font-bold tracking-[.14em] text-white backdrop-blur">{service.number}</span></div>
              <div className="p-5"><h3 className="text-xl font-semibold tracking-[-.025em] text-slate-950">{service.title}</h3><p className="mt-2 min-h-12 text-sm leading-6 text-slate-600">{service.description}</p><div className="mt-4 flex flex-wrap gap-2">{service.items.slice(0, 2).map((item) => <span key={item} className="rounded-full bg-blue-50 px-2.5 py-1 text-[10px] font-semibold text-blue-700">{item}</span>)}</div><Link to="/services" className="mt-5 inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-[.13em] text-blue-600">Learn more <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-1" /></Link></div>
            </motion.article>;
          })}
        </div>
      </div>
    </section>
  );
}
