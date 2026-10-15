import React, { lazy, Suspense, useEffect, useRef, useState } from "react";

import HomeHero from "../components/home/HomeHero";
const HomeBrandTicker = lazy(() => import("../components/home/HomeBrandTicker"));
const HomeCinematicBanner = lazy(() => import("../components/home/HomeCinematicBanner"));
const HomeAbout = lazy(() => import("../components/home/HomeAbout"));
const HomeServicesStack = lazy(() => import("../components/home/HomeServicesStack"));
const HomeVideoScroll = lazy(() => import("../components/home/HomeVideoScroll"));
const HomeLocation = lazy(() => import("../components/home/HomeLocation"));

function DeferredSection({ children, minHeight = 320 }) {
  const ref = useRef(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        setVisible(true);
        observer.disconnect();
      }
    }, { rootMargin: "500px 0px" });
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  return <div ref={ref} style={{ minHeight: visible ? undefined : minHeight }}>{visible && <Suspense fallback={<div style={{ minHeight }} />}>{children}</Suspense>}</div>;
}

export default function Home() {
  return (
    <main className="relative min-h-screen w-full overflow-x-clip bg-[#071019] text-[#0F172A] selection:bg-blue-600 selection:text-white">
      {/* ================= GLOBAL AMBIENT BACKGROUND ================= */}
      <div className="pointer-events-none fixed inset-0 -z-10 overflow-hidden">
        {/* Soft Sapphire Ambient Flare */}
        <div className="absolute -left-48 top-[20%] h-[700px] w-[700px] rounded-full bg-blue-200/25 blur-[180px]" />

        {/* Soft Sky Ambient Flare */}
        <div className="absolute -right-48 top-[55%] h-[700px] w-[700px] rounded-full bg-sky-200/25 blur-[180px]" />

        {/* Soft Indigo Glow */}
        <div className="absolute bottom-0 left-1/3 h-[500px] w-[600px] rounded-full bg-indigo-100/30 blur-[160px]" />
      </div>

      {/* ================= HOME SECTIONS ================= */}

      {/* 1. Cinematic Home Hero with Intro Video & 3-Slide Showcase */}
      <HomeHero />

      {/* 2. Flowing Brand Partners Glow Showcase (Left-to-Right Animated Ticker) */}
      <DeferredSection minHeight={120}><HomeBrandTicker /></DeferredSection>

      {/* 3. Cinematic Masked Heading Showcase ("Designed in the details") */}
      <DeferredSection minHeight={420}><HomeCinematicBanner /></DeferredSection>

      {/* 4. Core Capabilities & Architecture */}
      <DeferredSection minHeight={500}><HomeAbout /></DeferredSection>

      {/* 5. Stacking Glass Cards: Certified Engineering Services Showcase */}
      <DeferredSection minHeight={420}><HomeServicesStack /></DeferredSection>

      {/* 6. Video Scroll Animation: Smart Living & High-Security Architecture */}
      <DeferredSection minHeight={420}><HomeVideoScroll /></DeferredSection>

      {/* 7. Headquarters & Command Center ("Shot on location") */}
      <DeferredSection minHeight={420}><HomeLocation /></DeferredSection>
    </main>
  );
}
