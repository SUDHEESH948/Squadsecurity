import React from "react";
import { Sparkles, ShieldCheck } from "lucide-react";

const TAGLINES = [
  "VIDEO SURVEILLANCE",
  "NETWORK & IT INFRASTRUCTURE",
  "HOME & GATE AUTOMATION",
  "BIOMETRIC ACCESS CONTROL",
  "ANNUAL MAINTENANCE CONTRACTS",
  "FIBER OPTIC CONNECTIVITY",
  "STRUCTURED NETWORK CABLING",
  "AI SMART VISION & ANALYTICS",
];

export default function HomeBrandTicker() {
  return (
    <section className="relative z-20 w-full">
      {/* Sleek Horizontal Flowing Strip - No heavy capsule box */}
      <div className="relative w-full border-y border-slate-200/80 bg-white/70 backdrop-blur-md py-4 sm:py-5 overflow-hidden">
        
        {/* Soft Ambient Horizontal Glow */}
        <div className="pointer-events-none absolute inset-x-0 top-1/2 -translate-y-1/2 h-12 bg-gradient-to-r from-transparent via-blue-500/10 to-transparent blur-xl" />

        {/* Flowing Marquee Track with Smooth Edge Fade Masks */}
        <div
          className="relative w-full overflow-hidden"
          style={{
            maskImage:
              "linear-gradient(to right, transparent, black 6%, black 94%, transparent)",
            WebkitMaskImage:
              "linear-gradient(to right, transparent, black 6%, black 94%, transparent)",
          }}
        >
          {/* Flowing Left-to-Right Animated Strip */}
          <div className="flex w-max animate-brand-flow-ltr will-change-transform items-center">
            {/* Segment 1 */}
            <div className="flex shrink-0 items-center space-x-10 sm:space-x-14 pr-10 sm:pr-14">
              {TAGLINES.map((text, idx) => (
                <React.Fragment key={`tag-seg1-${idx}`}>
                  <span className="font-display text-xs sm:text-sm md:text-base font-extrabold tracking-[0.26em] uppercase text-slate-800 hover:text-blue-600 transition-colors cursor-default whitespace-nowrap">
                    {text}
                  </span>
                  <span className="text-blue-600 text-sm sm:text-base font-bold drop-shadow-[0_0_8px_rgba(37,99,235,0.5)]">
                    ✦
                  </span>
                </React.Fragment>
              ))}
            </div>

            {/* Segment 2 (Exact Duplicate for Seamless Infinite Loop) */}
            <div className="flex shrink-0 items-center space-x-10 sm:space-x-14 pr-10 sm:pr-14" aria-hidden="true">
              {TAGLINES.map((text, idx) => (
                <React.Fragment key={`tag-seg2-${idx}`}>
                  <span className="font-display text-xs sm:text-sm md:text-base font-extrabold tracking-[0.26em] uppercase text-slate-800 hover:text-blue-600 transition-colors cursor-default whitespace-nowrap">
                    {text}
                  </span>
                  <span className="text-blue-600 text-sm sm:text-base font-bold drop-shadow-[0_0_8px_rgba(37,99,235,0.5)]">
                    ✦
                  </span>
                </React.Fragment>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

