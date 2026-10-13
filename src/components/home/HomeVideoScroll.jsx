"use client";

import React from "react";
import ScrollExpand from "../ScrollExpand";

export default function HomeVideoScroll() {
  return (
    <section className="relative w-full bg-[#050811] text-white">
      <ScrollExpand
        src="/video-project-4-trimmed.mp4"
        poster="/video-frames-trimmed/frame_000.webp"
        mediaType="video"
        title="Intelligent Living & Defense"
        scrollHint="Scroll to expand"
        useWindowScroll
        startWidth={56}
        startHeight={64}
        startRadius={24}
        endRadius={0}
        mediaZoom={1.25}
        scrollDistance={1.1}
        holdDistance={0.2}
        overlayScrim={0.5}
      >
        <div className="max-w-3xl mx-auto text-center px-6">
          
          <h2 className="font-display text-3xl sm:text-5xl lg:text-6xl font-black text-white tracking-tight leading-tight mb-4">
            Complete Smart Automation & Perimeter Security
          </h2>
          <p className="text-sm sm:text-lg text-white/80 max-w-2xl mx-auto font-normal leading-relaxed mb-8">
            From biometric encrypted digital locks and synchronized climate control to panoramic 360° optical surveillance — engineered for absolute peace of mind.
          </p>
          <a
            href="/contact"
            className="inline-flex items-center gap-2 rounded-full bg-white text-slate-950 px-7 py-3.5 font-mono text-xs font-bold uppercase tracking-[0.16em] shadow-[0_10px_35px_rgba(255,255,255,0.2)] transition-all hover:bg-blue-600 hover:text-white hover:shadow-[0_15px_40px_rgba(37,99,235,0.4)] active:scale-95"
          >
            <span>Consult Engineering Team</span>
            <span>→</span>
          </a>
        </div>
      </ScrollExpand>
    </section>
  );
}
