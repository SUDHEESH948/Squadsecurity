"use client";

import React, { useState, useEffect, useCallback } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowRight, Shield } from "lucide-react";

// =========================================================================
// 1. DATA CONFIGURATION
// =========================================================================
const CAMERAS = [
  {
    id: "hikvision-bullet",
    brand: "HIKVISION",
    model: "Pro Series Varifocal",
    bigText: "HIKVISION",
    tagline: "Intelligent Human & Vehicle Perimeter Defense",
    specs: [
      "4K Ultra HD motorized zoom",
      "DarkFighter low-light sensor",
      "IP67 weatherproof",
    ],
    bgColor: "#2D1D23",
    bgBase: "#120B0E",
    accentColor: "#E11D24",
    image: "/cameras/hikvision-bullet.png",
  },
  {
    id: "hikvision-dome",
    brand: "CP PLUS",
    model: "Guard+ AI Vandal Dome",
    bigText: "CP PLUS",
    tagline: "Ultra-Wide Acoustic AI Surveillance",
    specs: [
      "5MP Super HD 30fps",
      "IK10 Vandal-Proof Casing",
      "Built-in Dual Mic & Siren",
    ],
    bgColor: "#23262F",
    bgBase: "#0D0F14",
    accentColor: "#DC2626",
    image: "/cameras/hikvision-dome.png",
  },
  {
    id: "hikvision-ptz",
    brand: "TP-LINK",
    model: "VIGI 360° Starlight PTZ",
    bigText: "TP-LINK",
    tagline: "Autonomous 360° Optical Tracking & Patrol",
    specs: [
      "25x Optical Zoom Precision",
      "F1.0 Starlight Color Sensor",
      "Auto Smart Tracking & Patrol",
    ],
    bgColor: "#132735",
    bgBase: "#07121A",
    accentColor: "#0EA5E9",
    image: "/cameras/hikvision-ptz.png",
  },
];

export default function CctvHeroSlider({ showTopNav = true }) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [direction, setDirection] = useState(1);

  const count = CAMERAS.length;
  const activeCamera = CAMERAS[currentIndex];

  const handleNext = useCallback(() => {
    setDirection(1);
    setCurrentIndex((prev) => (prev + 1) % count);
  }, [count]);

  const handlePrev = useCallback(() => {
    setDirection(-1);
    setCurrentIndex((prev) => (prev - 1 + count) % count);
  }, [count]);

  // Keyboard navigation: ArrowLeft and ArrowRight
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === "ArrowRight") {
        handleNext();
      } else if (e.key === "ArrowLeft") {
        handlePrev();
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [handleNext, handlePrev]);

  // Auto-advance camera slide continuously every 3.0 seconds in an infinite loop
  useEffect(() => {
    const timer = setInterval(() => {
      handleNext();
    }, 3000);

    return () => clearInterval(timer);
  }, [currentIndex, handleNext]);

  // Helper to calculate 3D slot properties for active, next, previous states
  const getSlotTransform = (diff) => {
    if (diff === 0) {
      // Center (Active)
      return {
        x: "0%",
        y: "0%",
        scale: 1.05,
        opacity: 1,
        zIndex: 30,
        filter: "blur(0px)",
      };
    }
    if (diff === 1) {
      // Right (Next camera - reduced further for deeper 3D perspective)
      return {
        x: "52%",
        y: "-3%",
        scale: 0.48,
        opacity: 0.4,
        zIndex: 20,
        filter: "blur(2px)",
      };
    }
    if (diff === -1) {
      // Left (Previous camera - reduced further for deeper 3D perspective)
      return {
        x: "-52%",
        y: "-3%",
        scale: 0.48,
        opacity: 0.25,
        zIndex: 10,
        filter: "blur(3.5px)",
      };
    }
    return {
      x: diff > 0 ? "100%" : "-100%",
      y: "-8%",
      scale: 0.35,
      opacity: 0,
      zIndex: 0,
      filter: "blur(6px)",
    };
  };

  return (
    <section
      className="relative w-full h-[100vh] h-[100svh] max-h-screen overflow-hidden flex flex-col justify-between selection:bg-blue-600 selection:text-white font-sans text-white transition-colors duration-700 ease-out"
      style={{
        background: `radial-gradient(circle at 50% 45%, ${activeCamera.bgColor} 0%, ${activeCamera.bgBase} 100%)`,
      }}
    >
      {/* Base Solid Darkness Fallback */}
      <div className="pointer-events-none absolute inset-0 -z-40 bg-[#0C121B]" />

      {/* Dynamic Radial Gradient Background with 850ms Smooth Crossfade */}
      <AnimatePresence mode="popLayout">
        <motion.div
          key={activeCamera.id + "-radial-bg"}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.85, ease: [0.25, 1, 0.5, 1] }}
          className="pointer-events-none absolute inset-0 -z-30 transition-colors duration-700 ease-out"
          style={{
            background: `radial-gradient(circle at 50% 45%, ${activeCamera.bgColor} 0%, ${activeCamera.bgBase} 100%)`,
          }}
        />
      </AnimatePresence>

      {/* Subtle Ambient Spotlight Overlay Centered Behind Camera */}
      <div className="pointer-events-none absolute inset-0 -z-20 bg-[radial-gradient(ellipse_at_center,_rgba(255,255,255,0.08)_0%,_transparent_70%)]" />

      {/* Soft Studio Vignette */}
      <div className="pointer-events-none absolute inset-0 -z-10 bg-[radial-gradient(circle_at_center,transparent_45%,rgba(0,0,0,0.45)_100%)]" />

      {/* Subtle Architectural Micro-grid Texture */}
      <div
        className="pointer-events-none absolute inset-0 -z-10 opacity-[0.035]"
        style={{
          backgroundImage: `linear-gradient(to right, #ffffff 1px, transparent 1px), linear-gradient(to bottom, #ffffff 1px, transparent 1px)`,
          backgroundSize: "64px 64px",
        }}
      />

      {/* =========================================================================
          LAYER 4 (TOP): UI LAYER - NAVIGATION BAR
          ========================================================================= */}
      {showTopNav ? (
        <header className="relative z-40 w-full px-6 sm:px-10 lg:px-16 pt-5 sm:pt-6 flex items-center justify-between shrink-0">
          {/* Brand Identity */}
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-white/10 border border-white/15 backdrop-blur-md shadow-lg">
              <Shield className="h-5 w-5 text-blue-400" />
            </div>
            <div>
              <span className="font-display text-base sm:text-lg font-black tracking-wider uppercase text-white block leading-tight">
                SQUAD SECURITY
              </span>
              <span className="font-mono text-[10px] tracking-[0.2em] uppercase text-white/50 block">
                SYSTEMS ARCHITECTURE
              </span>
            </div>
          </div>

          {/* Slide Counter Indicator */}
          <div className="hidden md:flex items-center gap-2 font-mono text-xs tracking-widest text-white/40">
            <span className="font-bold text-white text-sm">
              {String(currentIndex + 1).padStart(2, "0")}
            </span>
            <span>/</span>
            <span>{String(count).padStart(2, "0")}</span>
          </div>

          {/* CTA Button */}
          <a
            href="/contact"
            className="group relative inline-flex items-center gap-2 rounded-full bg-white text-slate-950 px-5 sm:px-6 py-2.5 sm:py-3 text-xs sm:text-sm font-bold tracking-wide transition-all duration-300 hover:bg-blue-600 hover:text-white hover:shadow-[0_8px_30px_rgba(37,99,235,0.4)] active:scale-95"
          >
            <span>Request Quote</span>
            <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
          </a>
        </header>
      ) : (
        <div className="w-full pt-16 sm:pt-20 shrink-0" />
      )}

      {/* =========================================================================
          LAYER 2 & 3: CENTER STAGE (TYPOGRAPHY BACK + 3D CAROUSEL MIDDLE)
          ========================================================================= */}
      <div className="relative flex-1 w-full flex items-center justify-center overflow-hidden py-1">
        {/* =====================================================================
            LAYER 2: TYPOGRAPHY LAYER (BACK - TRANSLATES & CROSS-FADES)
            ===================================================================== */}
        <div className="absolute inset-0 flex items-center justify-center translate-y-24 sm:translate-y-32 lg:translate-y-36 overflow-hidden pointer-events-none select-none z-0">
          <AnimatePresence mode="wait" custom={direction}>
            <motion.h1
              key={activeCamera.bigText}
              custom={direction}
              initial={(d) => ({
                opacity: 0,
                x: d > 0 ? 100 : -100,
                scale: 0.94,
              })}
              animate={{
                opacity: 1,
                x: 0,
                scale: 1,
              }}
              exit={(d) => ({
                opacity: 0,
                x: d > 0 ? -100 : 100,
                scale: 1.06,
              })}
              transition={{ duration: 0.85, ease: [0.25, 1, 0.5, 1] }}
              className="font-black text-[clamp(4.5rem,13vw,14rem)] leading-none uppercase whitespace-nowrap text-white/10 text-center tracking-tighter"
            >
              {activeCamera.bigText}
            </motion.h1>
          </AnimatePresence>
        </div>

        {/* =====================================================================
            LAYER 3: 3D DEPTH ROTATION CAROUSEL (3 CAMERAS SIMULTANEOUSLY)
            ===================================================================== */}
        <div className="relative w-full max-w-5xl h-[320px] sm:h-[380px] lg:h-[440px] flex items-center justify-center px-4">
          {CAMERAS.map((camera, i) => {
            let diff = (i - currentIndex) % count;
            if (diff > count / 2) diff -= count;
            if (diff < -count / 2) diff += count;

            const slotProps = getSlotTransform(diff);
            const isActive = diff === 0;
            const isNext = diff === 1;
            const isPrev = diff === -1;

            return (
              <motion.div
                key={camera.id}
                animate={slotProps}
                transition={{
                  duration: 0.85,
                  ease: [0.25, 1, 0.5, 1],
                }}
                whileHover={
                  isNext
                    ? { scale: 0.54, opacity: 0.55, filter: "blur(1px)" }
                    : isPrev
                    ? { scale: 0.54, opacity: 0.4, filter: "blur(2px)" }
                    : {}
                }
                whileTap={isNext || isPrev ? { scale: 0.44 } : {}}
                onClick={() => {
                  if (isNext) handleNext();
                  if (isPrev) handlePrev();
                }}
                className={`absolute flex flex-col items-center justify-center select-none ${
                  isActive
                    ? "cursor-default"
                    : isNext || isPrev
                    ? "cursor-pointer group"
                    : "pointer-events-none"
                }`}
                style={{
                  zIndex: slotProps.zIndex,
                }}
                title={
                  isNext
                    ? `Next: ${camera.brand} ${camera.model}`
                    : isPrev
                    ? `Previous: ${camera.brand} ${camera.model}`
                    : `${camera.brand} ${camera.model}`
                }
              >
                {/* Idle Hovering / Vertical Bobbing Animation Wrapper (Active Camera Only) */}
                <motion.div
                  animate={isActive ? { y: [0, -14, 0] } : { y: 0 }}
                  transition={
                    isActive
                      ? {
                          duration: 4.2,
                          repeat: Infinity,
                          ease: "easeInOut",
                        }
                      : { duration: 0.5 }
                  }
                  className="relative flex items-center justify-center"
                >
                  {/* Camera Transparent PNG Container */}
                  <div className="relative w-[230px] h-[190px] sm:w-[320px] sm:h-[260px] lg:w-[410px] lg:h-[330px]">
                    <Image
                      src={camera.image}
                      alt={`${camera.brand} ${camera.model}`}
                      fill
                      priority={isActive}
                      className="object-contain drop-shadow-[0_25px_45px_rgba(0,0,0,0.65)]"
                    />
                  </div>
                </motion.div>

                {/* Ground Contact Shadow */}
                <motion.div
                  animate={
                    isActive
                      ? {
                          scaleX: [1, 0.85, 1],
                          scaleY: [1, 0.8, 1],
                          opacity: [0.55, 0.35, 0.55],
                        }
                      : {
                          scaleX: 0.65,
                          scaleY: 0.6,
                          opacity: 0.22,
                        }
                  }
                  transition={
                    isActive
                      ? {
                          duration: 4.2,
                          repeat: Infinity,
                          ease: "easeInOut",
                        }
                      : { duration: 0.5 }
                  }
                  className="pointer-events-none absolute -bottom-5 left-1/2 -translate-x-1/2 h-5 w-[50%] max-w-[260px] rounded-[100%] bg-[radial-gradient(ellipse_at_center,rgba(0,0,0,0.7)_0%,transparent_70%)] blur-[8px]"
                />
              </motion.div>
            );
          })}
        </div>
      </div>

    </section>
  );
}
