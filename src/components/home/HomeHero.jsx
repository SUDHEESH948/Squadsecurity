import React, { useEffect, useRef, useState, useCallback } from "react";
import { createPortal } from "react-dom";
import { Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import {
  ArrowRight,
  ArrowUpRight,
  ShieldCheck,
  Lock,
  Cpu,
  Volume2,
  VolumeX,
  SkipForward,
  ChevronDown,
} from "lucide-react";

import introVideo from "../../assets/intro.mp4";
import homeImage from "../../assets/home.png";
import solarImage from "../../assets/solar.png";
import cctvImage from "../../assets/cctv.png";

const slides = [
  {
    id: 1,
    image: homeImage,
    eyebrow: "SMART SECURITY · SMART LIVING",
    title: "Smart. Secure. Seamless.",
    description:
      "Intelligent technology for safer homes, smarter spaces, and effortless everyday living.",
    icon: ShieldCheck,
    centerSlogan: true,
  },
  {
    id: 2,
    image: solarImage,
    eyebrow: "POWERING A SMARTER FUTURE",
    title: "Clean Energy. Smarter Living.",
    description:
      "Discover intelligent solar solutions designed for efficient, sustainable living.",
    icon: Cpu,
    centerSlogan: false,
  },
  {
    id: 3,
    image: cctvImage,
    eyebrow: "PROTECTION WITHOUT COMPROMISE",
    title: "See More. Worry Less.",
    description:
      "Advanced CCTV and intelligent surveillance to keep what matters most protected.",
    icon: Lock,
    centerSlogan: false,
  },
];

const SLIDE_DURATION = 6500;

export default function HomeHero() {
  const [introFinished, setIntroFinished] = useState(false);
  const [muted, setMuted] = useState(true);
  const [progress, setProgress] = useState(0);
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isPaused, setIsPaused] = useState(false);

  const videoRef = useRef(null);
  const finishedRef = useRef(false);

  const activeSlide = slides[currentSlide];
  const ActiveIcon = activeSlide.icon;

  // Isolate intro video: lock background scroll and hide navbar/floating buttons
  useEffect(() => {
    if (!introFinished) {
      document.body.classList.add("intro-active");
      document.body.style.overflow = "hidden";
      document.documentElement.style.overflow = "hidden";
    } else {
      document.body.classList.remove("intro-active");
      document.body.style.overflow = "";
      document.documentElement.style.overflow = "";
    }

    return () => {
      document.body.classList.remove("intro-active");
      document.body.style.overflow = "";
      document.documentElement.style.overflow = "";
    };
  }, [introFinished]);

  // Preload hero images for smooth switching
  useEffect(() => {
    slides.forEach(({ image }) => {
      const img = new Image();
      img.src = image;
    });
  }, []);

  // Autoplay the intro video when mounted
  useEffect(() => {
    const video = videoRef.current;
    if (!video || introFinished) return;

    video.muted = muted;
    video.play().catch(() => {
      // Browsers may block unmuted autoplay; muted autoplay is permitted
    });
  }, [introFinished, muted]);

  // Finish intro video handler
  const finishIntro = useCallback(() => {
    if (finishedRef.current) return;
    finishedRef.current = true;
    setProgress(100);

    if (videoRef.current) {
      videoRef.current.pause();
    }

    setIntroFinished(true);
  }, []);

  // Automatic slide transitions: advance one slide at a time
  useEffect(() => {
    if (!introFinished || isPaused) return;

    const timer = window.setInterval(() => {
      setCurrentSlide((previous) => (previous + 1) % slides.length);
    }, SLIDE_DURATION);

    return () => window.clearInterval(timer);
  }, [introFinished, isPaused, currentSlide]);

  const toggleMute = () => {
    const video = videoRef.current;
    if (!video) return;

    const nextMuted = !muted;
    video.muted = nextMuted;
    setMuted(nextMuted);
  };

  const handleTimeUpdate = (event) => {
    const video = event.currentTarget;
    if (video.duration && Number.isFinite(video.duration)) {
      setProgress((video.currentTime / video.duration) * 100);
    }
  };

  const handleVideoError = () => {
    finishIntro();
  };

  const handleSelectSlide = (index) => {
    setCurrentSlide(index);
  };

  return (
    <section
      className="relative isolate min-h-[100svh] overflow-hidden bg-[#071019] text-white selection:bg-sky-300 selection:text-slate-950"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
    >
      {/* ==================================================
          1. INTRO VIDEO OVERLAY (PORTALED DIRECTLY TO BODY)
          Guaranteed to sit on top of all headers and navbars (z-[99999]).
          Completely hides navigation while playing.
          Smooth exit reveals the hero and navbar together.
      ================================================== */}
      {typeof document !== "undefined" &&
        createPortal(
          <AnimatePresence>
            {!introFinished && (
              <motion.div
                key="intro"
                initial={{ opacity: 1 }}
                exit={{
                  opacity: 0,
                  scale: 1.02,
                }}
                transition={{
                  duration: 0.8,
                  ease: [0.22, 1, 0.36, 1],
                }}
                className="fixed inset-0 z-[99999] flex items-center justify-center overflow-hidden bg-black select-none"
              >
                {/* Ambient glow behind video */}
                <div className="pointer-events-none absolute inset-0 flex items-center justify-center">
                  <div className="h-[60vh] w-[90vw] rounded-full bg-sky-500/15 blur-[120px]" />
                </div>

                {/* 16:9 Video centered responsively with object-contain to never crop the logo */}
                <video
                  ref={videoRef}
                  src={introVideo}
                  autoPlay
                  muted={muted}
                  playsInline
                  preload="auto"
                  onTimeUpdate={handleTimeUpdate}
                  onEnded={finishIntro}
                  onError={handleVideoError}
                  className="relative z-10 h-full w-full max-h-full max-w-full object-contain"
                />

                {/* Subtle cinematic gradient overlays on intro */}
                <div className="pointer-events-none absolute inset-0 z-10 bg-gradient-to-t from-black/80 via-transparent to-black/50" />

                

                {/* Top controls: Mute & Skip (Responsive padding and button sizes) */}
                <div className="absolute right-4 top-4 z-30 flex items-center gap-2 sm:right-8 sm:top-8 sm:gap-3">
                  <button
                    type="button"
                    onClick={toggleMute}
                    aria-label={muted ? "Unmute introduction video" : "Mute introduction video"}
                    className="flex h-9 w-9 sm:h-11 sm:w-11 cursor-pointer items-center justify-center rounded-full border border-white/20 bg-black/60 text-white backdrop-blur-xl transition hover:scale-105 hover:bg-white/20 active:scale-95 shadow-lg shadow-black/40"
                  >
                    {muted ? <VolumeX className="h-4 w-4 sm:h-5 sm:w-5" /> : <Volume2 className="h-4 w-4 sm:h-5 sm:w-5" />}
                  </button>

                  <button
                    type="button"
                    onClick={finishIntro}
                    className="flex h-9 sm:h-11 cursor-pointer items-center gap-1.5 sm:gap-2 rounded-full border border-white/20 bg-black/60 px-3.5 sm:px-5 text-[10px] sm:text-xs font-semibold uppercase tracking-[0.14em] text-white backdrop-blur-xl transition hover:scale-105 hover:bg-white/20 active:scale-95 shadow-lg shadow-black/40"
                  >
                    <span>Skip</span>
                    <SkipForward className="h-3 w-3 sm:h-3.5 sm:w-3.5" />
                  </button>
                </div>

                {/* Video playback progress indicator */}
                
              </motion.div>
            )}
          </AnimatePresence>,
          document.body
        )}

      {/* ==================================================
          2. CINEMATIC HERO SECTION
          Only active slide is visible with smooth transitions.
      ================================================== */}
      <div className="relative min-h-[100svh] overflow-hidden">
        {/* 3 HERO SLIDES (home.png, solar.png, cctv.png)
            Smooth cross-fade and subtle Ken-Burns zoom */}
        <AnimatePresence mode="sync">
          {introFinished && (
            <motion.div
              key={`slide-img-${activeSlide.id}`}
              initial={{ opacity: 0, scale: 1.05 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0 }}
              transition={{
                opacity: { duration: 1.2, ease: [0.22, 1, 0.36, 1] },
                scale: { duration: SLIDE_DURATION / 1000, ease: "linear" },
              }}
              className="absolute inset-0"
            >
              <img
                src={activeSlide.image}
                alt={activeSlide.title}
                draggable="false"
                className="h-full w-full select-none object-cover"
              />
            </motion.div>
          )}
        </AnimatePresence>

        
        

        {/* ==================================================
            3. FIRST SLIDE: “Smart. Secure. Seamless.”
               Prominently displayed in the center.
        ================================================== */}
        <AnimatePresence mode="wait">
          {introFinished && activeSlide.centerSlogan && (
            <motion.div
              key="center-slogan"
              initial={{ opacity: 0, y: 25, filter: "blur(8px)" }}
              animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
              exit={{ opacity: 0, y: -20, filter: "blur(6px)" }}
              transition={{
                duration: 0.9,
                ease: [0.22, 1, 0.36, 1],
              }}
              className="absolute inset-0 z-10 flex items-center justify-center px-5 pt-20 pb-24 text-center sm:px-10 sm:py-0"
            >
              <div className="max-w-4xl">
    

                <h1 className="text-[clamp(2.5rem,8vw,6.5rem)] font-extrabold leading-[1.02] tracking-tight text-white">
                  Smart.{" "}
                  <span className="font-serif italic font-normal text-sky-300 drop-shadow-[0_0_30px_rgba(56,189,248,0.4)]">
                    Secure.
                  </span>{" "}
                  Seamless.
                </h1>

                <motion.div
                  initial={{ scaleX: 0 }}
                  animate={{ scaleX: 1 }}
                  transition={{ duration: 0.8, delay: 0.45 }}
                  className="mx-auto my-4 h-[2px] w-20 origin-center bg-gradient-to-r from-transparent via-sky-400 to-transparent sm:my-6 sm:w-32"
                />

                <motion.p
                  initial={{ opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.7, delay: 0.4 }}
                  className="mx-auto max-w-xl text-xs leading-relaxed text-white/80 sm:text-sm sm:leading-7 lg:text-base"
                >
                  Intelligent technology for safer homes, smarter spaces, and effortless everyday living. Engineered for modern peace of mind.
                </motion.p>

               
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* ==================================================
            5. BOTTOM-LEFT CAPTION POSITION
            Each slide's caption is positioned at the bottom-left.
            (Shown on slides when center slogan is not active,
            ensuring no duplicate overlapping text on Slide 1).
        ================================================== */}
        <AnimatePresence mode="wait">
          {introFinished && !activeSlide.centerSlogan && (
            <motion.div
              key={`caption-${activeSlide.id}`}
              initial={{ opacity: 0, x: -30, filter: "blur(6px)" }}
              animate={{ opacity: 1, x: 0, filter: "blur(0px)" }}
              exit={{ opacity: 0, x: -20, filter: "blur(4px)" }}
              transition={{ duration: 0.65, ease: [0.22, 1, 0.36, 1] }}
              className="absolute bottom-24 left-5 z-10 max-w-[88%] sm:bottom-28 sm:left-10 sm:max-w-xl lg:bottom-28 lg:left-16"
            >
              <div className="mb-3 flex items-center gap-3 sm:mb-4">
                <span className="h-0.5 w-8 bg-sky-400 sm:w-12" />
                <span className="text-[9px] font-semibold uppercase tracking-[0.2em] text-sky-200 sm:text-[10px]">
                  {activeSlide.eyebrow}
                </span>
              </div>

              <h2 className="text-2xl font-bold leading-tight tracking-tight text-white sm:text-4xl lg:text-5xl">
                {activeSlide.title}
              </h2>

              <p className="mt-3 max-w-md text-xs leading-relaxed text-white/80 sm:text-sm sm:leading-7">
                {activeSlide.description}
              </p>

              
            </motion.div>
          )}
        </AnimatePresence>

        {/* ==================================================
            SLIDER CONTROLS & NAVIGATION
        ================================================== */}
        <div className="absolute bottom-6 left-5 right-5 z-20 flex items-end justify-between sm:bottom-8 sm:left-10 sm:right-10 lg:left-16 lg:right-16">
          {/* Slide indicators with progress line */}
          <div className="flex items-center gap-2.5 sm:gap-4">
            {slides.map((slide, index) => (
              <button
                key={slide.id}
                type="button"
                onClick={() => handleSelectSlide(index)}
                aria-label={`Show slide ${index + 1}: ${slide.title}`}
                aria-current={currentSlide === index ? "true" : undefined}
                className="group flex cursor-pointer items-center gap-2 py-2 sm:gap-3"
              >
                

                
              </button>
            ))}
          </div>

         
        </div>

        
      </div>
    </section>
  );
}