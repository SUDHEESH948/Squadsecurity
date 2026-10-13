import React from "react";
import MaskedHeading from "../MaskedHeading";

export default function HomeCinematicBanner() {
  return (
    <section className="relative overflow-hidden bg-gradient-to-b from-[#FFFFFF] via-[#F8FAFC] to-[#F1F5F9] py-10 sm:py-14 text-slate-900 border-y border-slate-200/80 selection:bg-blue-600 selection:text-white">
      {/* ================= DYNAMIC MOVING AMBIENT GRADIENT ================= */}
      {/* Matches official Squad Security System logo: Royal Blue (#0E52A6) + Golden Yellow (#FBB802) */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        {/* Pulsing Royal Blue Ambient Glow */}
        <div
          className="absolute top-1/2 left-[15%] -translate-y-1/2 w-[550px] h-[350px] rounded-full bg-[#0E52A6]/12 blur-[130px] animate-pulse"
          style={{ animationDuration: "8s" }}
        />

        {/* Pulsing Golden Yellow Ambient Glow from Logo Accent */}
        <div
          className="absolute top-1/2 right-[15%] -translate-y-1/2 w-[500px] h-[320px] rounded-full bg-[#FBB802]/15 blur-[130px] animate-pulse"
          style={{ animationDuration: "7s" }}
        />

        {/* Central Diffuse Radial Core */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[750px] h-[360px] rounded-full bg-[radial-gradient(ellipse_at_center,rgba(14,82,166,0.12)_0%,rgba(251,184,2,0.08)_50%,transparent_75%)] blur-[90px]" />
      </div>

      <div className="relative z-10 mx-auto max-w-5xl px-6 text-center">
        {/* Subtle Text Label */}
        <div className="mb-4 inline-flex items-center gap-2 text-blue-600">
          <span className="h-1.5 w-1.5 rounded-full bg-blue-600" />
          <span className="font-mono text-xs font-bold uppercase tracking-[0.25em]">
            Cinematic Engineering
          </span>
        </div>

        {/* React Bits MaskedHeading with Moving Gradient matching Logo Palette */}
        <div className="my-2">
          <MaskedHeading
            text="Designed in the details"
            tag="h2"
            mediaType="gradient"
            fillScale={1.3}
            parallax={34}
            drift={18}
            brightness={1.05}
            saturation={1.1}
            reveal="rise"
            trigger="view"
            duration={1.2}
            stagger={0.09}
            align="center"
            weight={800}
            tracking={-0.03}
            textScale={0.072}
            className="font-display uppercase text-slate-950"
          />
        </div>

        {/* Narrative Description */}
        <p className="mx-auto mt-6 max-w-2xl text-base sm:text-lg text-slate-600 leading-relaxed font-normal">
          From multi-coated optical glass and ultra-low-light sensors to weather-sealed alloy housings—engineered for relentless precision and confidence.
        </p>

        {/* Minimal Spec Highlights in Frosted Studio Glass */}
        <div className="mt-12 grid grid-cols-1 sm:grid-cols-3 gap-6 max-w-3xl mx-auto border-t border-slate-200/80 pt-10">
          <div className="p-5 rounded-2xl bg-white/90 border border-slate-200/80 shadow-[0_4px_20px_rgba(15,23,42,0.04)] backdrop-blur-md transition-transform hover:-translate-y-1">
            <div className="font-mono text-xl sm:text-2xl font-bold text-blue-600">4K / 60 FPS</div>
            <div className="mt-1 text-xs uppercase tracking-wider text-slate-500 font-mono">Ultra-HD Optics</div>
          </div>
          <div className="p-5 rounded-2xl bg-white/90 border border-slate-200/80 shadow-[0_4px_20px_rgba(15,23,42,0.04)] backdrop-blur-md transition-transform hover:-translate-y-1">
            <div className="font-mono text-xl sm:text-2xl font-bold text-blue-600">IP67 & IK10</div>
            <div className="mt-1 text-xs uppercase tracking-wider text-slate-500 font-mono">All-Weather Armor</div>
          </div>
          <div className="p-5 rounded-2xl bg-white/90 border border-slate-200/80 shadow-[0_4px_20px_rgba(15,23,42,0.04)] backdrop-blur-md transition-transform hover:-translate-y-1">
            <div className="font-mono text-xl sm:text-2xl font-bold text-blue-600">&lt; 15ms</div>
            <div className="mt-1 text-xs uppercase tracking-wider text-slate-500 font-mono">Zero-Latency AI</div>
          </div>
        </div>
      </div>
    </section>
  );
}
