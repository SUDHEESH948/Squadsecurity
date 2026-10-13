"use client";

import * as React from "react";
import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { cn } from "@/lib/utils";

// Register ScrollTrigger safely for React
if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

// -------------------------------------------------------------------------
// 1. HIGH-CONTRAST ARCHITECTURAL STYLES
// -------------------------------------------------------------------------
const STYLES = `
@import url('https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@300;400;500;600;700;800;900&display=swap');

.cinematic-footer-wrapper {
  font-family: 'Plus Jakarta Sans', sans-serif;
  -webkit-font-smoothing: antialiased;
  
  /* High-Contrast Tokens */
  --foreground: #0A1128;
  --background: #F8FAFC;
  --primary: #2563EB;
  --secondary: #0284C7;
  --muted: #E2E8F0;
  --muted-foreground: #475569;
  --border: rgba(15, 23, 42, 0.12);
  --destructive: #EF4444;

  /* Glass pill tokens */
  --pill-bg-1: rgba(255, 255, 255, 0.95);
  --pill-bg-2: rgba(248, 250, 252, 0.88);
  --pill-shadow: rgba(15, 23, 42, 0.08);
  --pill-highlight: #FFFFFF;
  --pill-inset-shadow: rgba(15, 23, 42, 0.04);
  --pill-border: rgba(203, 213, 225, 0.9);
  
  --pill-bg-1-hover: #FFFFFF;
  --pill-bg-2-hover: #F1F5F9;
  --pill-border-hover: #93C5FD;
  --pill-shadow-hover: rgba(37, 99, 235, 0.18);
  --pill-highlight-hover: #FFFFFF;
}

@keyframes footer-breathe {
  0% { transform: translate(-50%, -50%) scale(1); opacity: 0.5; }
  100% { transform: translate(-50%, -50%) scale(1.1); opacity: 0.85; }
}

@keyframes footer-scroll-marquee {
  from { transform: translateX(0); }
  to { transform: translateX(-50%); }
}

@keyframes footer-heartbeat {
  0%, 100% { transform: scale(1); filter: drop-shadow(0 0 4px rgba(239, 68, 68, 0.4)); }
  15%, 45% { transform: scale(1.2); filter: drop-shadow(0 0 8px rgba(239, 68, 68, 0.7)); }
  30% { transform: scale(1); }
}

.animate-footer-breathe {
  animation: footer-breathe 8s ease-in-out infinite alternate;
}

.animate-footer-scroll-marquee {
  animation: footer-scroll-marquee 40s linear infinite;
}

.animate-footer-heartbeat {
  animation: footer-heartbeat 2s cubic-bezier(0.25, 1, 0.5, 1) infinite;
}

/* Blueprint Grid Background */
.footer-bg-grid {
  background-size: 60px 60px;
  background-image: 
    linear-gradient(to right, rgba(37, 99, 235, 0.06) 1px, transparent 1px),
    linear-gradient(to bottom, rgba(37, 99, 235, 0.06) 1px, transparent 1px);
  mask-image: linear-gradient(to bottom, transparent, black 25%, black 75%, transparent);
  -webkit-mask-image: linear-gradient(to bottom, transparent, black 25%, black 75%, transparent);
}

/* Ambient Blue & Cyan Aurora Glow */
.footer-aurora {
  background: radial-gradient(
    circle at 50% 50%, 
    rgba(37, 99, 235, 0.14) 0%, 
    rgba(2, 132, 199, 0.08) 40%, 
    transparent 70%
  );
}

/* Frosted Glass Pills */
.footer-glass-pill {
  background: linear-gradient(145deg, var(--pill-bg-1) 0%, var(--pill-bg-2) 100%);
  box-shadow: 
      0 10px 25px -5px var(--pill-shadow), 
      inset 0 1px 1px var(--pill-highlight), 
      inset 0 -1px 2px var(--pill-inset-shadow);
  border: 1px solid var(--pill-border);
  backdrop-filter: blur(16px);
  -webkit-backdrop-filter: blur(16px);
  color: #0F172A;
  transition: all 0.3s cubic-bezier(0.16, 1, 0.3, 1);
}

.footer-glass-pill:hover {
  background: linear-gradient(145deg, var(--pill-bg-1-hover) 0%, var(--pill-bg-2-hover) 100%);
  border-color: var(--pill-border-hover);
  box-shadow: 
      0 18px 35px -8px var(--pill-shadow-hover), 
      inset 0 1px 1px var(--pill-highlight-hover);
  color: #1D4ED8;
}

/* Giant Background Watermark Text */
.footer-giant-bg-text {
  font-size: 26vw;
  line-height: 0.75;
  font-weight: 900;
  letter-spacing: -0.05em;
  color: transparent;
  -webkit-text-stroke: 1.5px rgba(37, 99, 235, 0.16);
  background: linear-gradient(180deg, rgba(37, 99, 235, 0.12) 0%, rgba(2, 132, 199, 0.03) 45%, transparent 75%);
  -webkit-background-clip: text;
  background-clip: text;
}

/* High-Contrast Bold Heading */
.footer-text-glow {
  background: linear-gradient(180deg, #0A1128 0%, #1E3A8A 55%, #0284C7 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  filter: drop-shadow(0px 8px 30px rgba(37, 99, 235, 0.16));
}
`;

// -------------------------------------------------------------------------
// 2. MAGNETIC BUTTON PRIMITIVE
// -------------------------------------------------------------------------
export type MagneticButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement> & 
  React.AnchorHTMLAttributes<HTMLAnchorElement> & {
    as?: React.ElementType;
  };

export const MagneticButton = React.forwardRef<HTMLElement, MagneticButtonProps>(
  ({ className, children, as: Component = "button", ...props }, forwardedRef) => {
    const localRef = useRef<HTMLElement>(null);

    useEffect(() => {
      if (typeof window === "undefined") return;
      const element = localRef.current;
      if (!element) return;

      const ctx = gsap.context(() => {
        const handleMouseMove = (e: MouseEvent) => {
          const rect = element.getBoundingClientRect();
          const h = rect.width / 2;
          const w = rect.height / 2;
          const x = e.clientX - rect.left - h;
          const y = e.clientY - rect.top - w;

          gsap.to(element, {
            x: x * 0.35,
            y: y * 0.35,
            rotationX: -y * 0.12,
            rotationY: x * 0.12,
            scale: 1.04,
            ease: "power2.out",
            duration: 0.35,
          });
        };

        const handleMouseLeave = () => {
          gsap.to(element, {
            x: 0,
            y: 0,
            rotationX: 0,
            rotationY: 0,
            scale: 1,
            ease: "elastic.out(1, 0.3)",
            duration: 1.2,
          });
        };

        element.addEventListener("mousemove", handleMouseMove as any);
        element.addEventListener("mouseleave", handleMouseLeave);

        return () => {
          element.removeEventListener("mousemove", handleMouseMove as any);
          element.removeEventListener("mouseleave", handleMouseLeave);
        };
      }, element);

      return () => ctx.revert();
    }, []);

    return (
      <Component
        ref={(node: HTMLElement) => {
          (localRef as any).current = node;
          if (typeof forwardedRef === "function") forwardedRef(node);
          else if (forwardedRef) (forwardedRef as any).current = node;
        }}
        className={cn("cursor-pointer", className)}
        {...props}
      >
        {children}
      </Component>
    );
  }
);
MagneticButton.displayName = "MagneticButton";

// -------------------------------------------------------------------------
// 3. MAIN COMPONENT
// -------------------------------------------------------------------------
const MarqueeItem = ({ items }: { items?: string[] }) => (
  <div className="flex items-center space-x-12 px-6">
    {(items || [
      "Smart Video Surveillance",
      "Network & IT Infrastructure",
      "Home & Gate Automation",
      "Access Control & Biometrics",
      "Annual Maintenance (AMC)",
    ]).map((text, idx) => (
      <React.Fragment key={idx}>
        <span className="text-slate-800 font-semibold">{text}</span>
        <span className={idx % 2 === 0 ? "text-blue-600 font-bold" : "text-sky-500 font-bold"}>✦</span>
      </React.Fragment>
    ))}
  </div>
);

export interface CinematicFooterProps {
  brandText?: string;
  headingText?: string;
  subText?: string;
  marqueeItems?: string[];
  primaryActions?: Array<{ label: string; href: string; icon?: React.ReactNode }>;
  secondaryLinks?: Array<{ label: string; href: string }>;
  copyrightText?: string;
  craftedBy?: string;
}

export function CinematicFooter({
  brandText = "SQUAD",
  headingText = "Ready to secure your space?",
  marqueeItems,
  primaryActions,
  secondaryLinks,
  copyrightText = "© 2026 Squad Security System. All rights reserved.",
  craftedBy = "Squad Security",
}: CinematicFooterProps) {
  const wrapperRef = useRef<HTMLDivElement>(null);
  const giantTextRef = useRef<HTMLDivElement>(null);
  const headingRef = useRef<HTMLHeadingElement>(null);
  const linksRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (typeof window === "undefined") return;
    if (!wrapperRef.current) return;

    const ctx = gsap.context(() => {
      // Background Parallax
      gsap.fromTo(
        giantTextRef.current,
        { y: "8vh", scale: 0.85, opacity: 0 },
        {
          y: "0vh",
          scale: 1,
          opacity: 1,
          ease: "power1.out",
          scrollTrigger: {
            trigger: wrapperRef.current,
            start: "top 85%",
            end: "bottom bottom",
            scrub: 1,
          },
        }
      );

      // Staggered Content Reveal
      gsap.fromTo(
        [headingRef.current, linksRef.current],
        { y: 40, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          stagger: 0.15,
          ease: "power3.out",
          scrollTrigger: {
            trigger: wrapperRef.current,
            start: "top 50%",
            end: "bottom bottom",
            scrub: 1,
          },
        }
      );
    }, wrapperRef);

    return () => ctx.revert();
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <>
      <style dangerouslySetInnerHTML={{ __html: STYLES }} />
      
      {/* Standard-flow footer: visible after every route's content. */}
      <div
        ref={wrapperRef}
        className="relative min-h-[720px] w-full"
      >
        {/* Animated footer with clean architectural ivory/sky backdrop */}
        <footer className="relative flex min-h-[720px] w-full flex-col justify-between overflow-hidden bg-gradient-to-b from-[#FFFFFF] via-[#F8FAFC] to-[#F1F5F9] text-slate-900 cinematic-footer-wrapper border-t border-slate-200/80">
          
          {/* Ambient Sapphire Aurora & Grid Background */}
          <div className="footer-aurora absolute left-1/2 top-1/2 h-[65vh] w-[85vw] -translate-x-1/2 -translate-y-1/2 animate-footer-breathe rounded-[50%] blur-[90px] pointer-events-none z-0" />
          <div className="footer-bg-grid absolute inset-0 z-0 pointer-events-none" />

          {/* Giant background text (SQUAD) */}
          <div
            ref={giantTextRef}
            className="footer-giant-bg-text absolute -bottom-[5vh] left-1/2 -translate-x-1/2 whitespace-nowrap z-0 pointer-events-none select-none"
          >
            {brandText}
          </div>

          {/* 1. Diagonal Sleek Marquee (Top of footer) */}
          <div className="absolute top-12 left-0 w-full overflow-hidden border-y border-slate-200/90 bg-white/85 backdrop-blur-md py-4 z-10 -rotate-2 scale-110 shadow-sm">
            <div className="flex w-max animate-footer-scroll-marquee text-xs md:text-sm font-bold tracking-[0.3em] uppercase">
              <MarqueeItem items={marqueeItems} />
              <MarqueeItem items={marqueeItems} />
            </div>
          </div>

          {/* 2. Main Center Content */}
          <div className="relative z-10 flex flex-1 flex-col items-center justify-center px-6 mt-20 w-full max-w-5xl mx-auto">
            <h2
              ref={headingRef}
              className="text-4xl sm:text-6xl md:text-8xl font-black footer-text-glow tracking-tight mb-12 text-center"
            >
              {headingText}
            </h2>

            {/* Interactive Magnetic Pills Layout */}
            <div ref={linksRef} className="flex flex-col items-center gap-6 w-full">
              {/* Primary Action Pills */}
              {primaryActions && primaryActions.length > 0 && (
                <div className="flex flex-wrap justify-center gap-4 w-full">
                  {primaryActions.map((act, i) => (
                    <MagneticButton
                      key={i}
                      as="a"
                      href={act.href}
                      className="footer-glass-pill px-8 sm:px-10 py-4 sm:py-5 rounded-full font-bold text-sm md:text-base flex items-center gap-3 group"
                    >
                      {act.icon}
                      <span className="text-slate-900 group-hover:text-blue-600 transition-colors">{act.label}</span>
                    </MagneticButton>
                  ))}
                </div>
              )}

              {/* Secondary Navigation Links */}
              <div className="flex flex-wrap justify-center gap-3 md:gap-6 w-full mt-2">
                {(secondaryLinks || [
                  { label: "Surveillance", href: "/services" },
                  { label: "Automation", href: "/services" },
                  { label: "Network & IT", href: "/services" },
                  { label: "Projects", href: "/projects" },
                  { label: "Contact Us", href: "/contact" },
                ]).map((link, i) => (
                  <MagneticButton
                    key={i}
                    as="a"
                    href={link.href}
                    className="footer-glass-pill px-6 py-3 rounded-full text-slate-700 font-semibold text-xs md:text-sm hover:text-blue-600 transition-colors"
                  >
                    {link.label}
                  </MagneticButton>
                ))}
              </div>
            </div>
          </div>

          {/* 3. Bottom Bar / Credits */}
          <div className="relative z-20 w-full pb-8 px-6 md:px-12 flex flex-col md:flex-row items-center justify-between gap-6 border-t border-slate-200/70 pt-6">
            
            {/* Copyright */}
            <div className="text-slate-600 text-[10px] md:text-xs font-semibold tracking-widest uppercase order-2 md:order-1 text-center md:text-left">
              {copyrightText}
            </div>

            {/* "Made with Love" Badge */}
           

            {/* Back to top */}
            <MagneticButton
              as="button"
              onClick={scrollToTop}
              className="w-12 h-12 rounded-full footer-glass-pill flex items-center justify-center text-slate-700 hover:text-blue-600 group order-3"
              aria-label="Back to top"
            >
              <svg className="w-5 h-5 transform group-hover:-translate-y-1.5 transition-transform duration-300" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M5 10l7-7m0 0l7 7m-7-7v18"></path>
              </svg>
            </MagneticButton>

          </div>
        </footer>
      </div>
    </>
  );
}

export default CinematicFooter;
