import React, { useEffect, useRef, useState, useCallback } from "react";
import { createPortal } from "react-dom";
import { motion, AnimatePresence } from "framer-motion";
import {
  ShieldCheck,
  Lock,
  Cpu,
  Volume2,
  VolumeX,
  SkipForward,
  Play,
} from "lucide-react";

import introVideo from "../../assets/newintro.mp4";
import introPoster from "../../assets/intro-poster.jpg";
import homeImage from "../../assets/home.png";
import solarImage from "../../assets/solar.png";
import cctvImage from "../../assets/cctv1.png";

const SLIDE_DURATION = 6500;

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

export default function HomeHero() {
  const [introFinished, setIntroFinished] = useState(false);
  const [muted, setMuted] = useState(true);
  const [progress, setProgress] = useState(0);
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const [autoplayBlocked, setAutoplayBlocked] = useState(false);

  const videoRef = useRef(null);
  const finishedRef = useRef(false);

  const activeSlide = slides[currentSlide];

  // Lock scrolling while the intro video is visible.
  useEffect(() => {
    if (!introFinished) {
      document.body.classList.add("intro-active");
      document.body.style.overflow = "hidden";
      document.documentElement.style.overflow = "hidden";
    }

    return () => {
      document.body.classList.remove("intro-active");
      document.body.style.overflow = "";
      document.documentElement.style.overflow = "";
    };
  }, [introFinished]);

  // Preload images for smoother slide transitions.
  useEffect(() => {
    slides.forEach(({ image }) => {
      const img = new Image();
      img.src = image;
    });
  }, []);

  // Finish the intro exactly once.
  const finishIntro = useCallback(() => {
    if (finishedRef.current) return;

    finishedRef.current = true;
    setProgress(100);

    if (videoRef.current) {
      videoRef.current.pause();
    }

    setIntroFinished(true);
  }, []);

  // Start the intro video with resilient autoplay handling and 10s safety fallback.
  useEffect(() => {
    const video = videoRef.current;
    if (!video || introFinished) return;

    video.muted = true;
    video.defaultMuted = true;
    video.playsInline = true;

    const startPlayback = () => {
      if (!video) return;
      video.muted = true;
      const playPromise = video.play();
      if (playPromise !== undefined) {
        playPromise
          .then(() => {
            setAutoplayBlocked(false);
          })
          .catch((err) => {
            // Autoplay blocked by browser policy; show interactive play button on white canvas
            console.warn("Intro autoplay paused by browser policy:", err);
            setAutoplayBlocked(true);
          });
      }
    };

    if (video.readyState >= 2) {
      startPlayback();
    } else {
      video.addEventListener("canplay", startPlayback, { once: true });
    }

    // Safety timeout: automatically transition after 10 seconds if user is idle
    const safetyTimer = setTimeout(() => {
      if (!finishedRef.current) {
        finishIntro();
      }
    }, 10000);

    return () => {
      clearTimeout(safetyTimer);
      if (video) {
        video.removeEventListener("canplay", startPlayback);
      }
    };
  }, [introFinished, finishIntro]);

  // Automatically advance slides every 6.5 seconds.
  useEffect(() => {
    if (!introFinished || isPaused) return;

    const timer = window.setInterval(() => {
      setCurrentSlide((previous) => (previous + 1) % slides.length);
    }, SLIDE_DURATION);

    return () => window.clearInterval(timer);
  }, [introFinished, isPaused, currentSlide]);

  // Toggle intro video audio.
  const toggleMute = (e) => {
    e?.stopPropagation?.();
    const video = videoRef.current;
    if (!video) return;

    const nextMuted = !muted;
    video.muted = nextMuted;
    setMuted(nextMuted);
  };

  // Update video progress.
  const handleTimeUpdate = (event) => {
    const video = event.currentTarget;

    if (video.duration && Number.isFinite(video.duration)) {
      setProgress((video.currentTime / video.duration) * 100);
      if (video.currentTime >= video.duration - 0.2) {
        finishIntro();
      }
    }
  };

  // Manual play handler when browser blocks initial autoplay
  const handleUserPlay = () => {
    const video = videoRef.current;
    if (video) {
      video.muted = muted;
      video
        .play()
        .then(() => setAutoplayBlocked(false))
        .catch(() => finishIntro());
    }
  };

  // If the video cannot load, continue to the hero.
  const handleVideoError = () => {
    finishIntro();
  };

  const handleSelectSlide = (index) => {
    setCurrentSlide(index);
  };

  return (
    <section
      className="relative isolate h-[100svh] min-h-[640px] w-full overflow-hidden bg-[#061426] text-white selection:bg-sky-300 selection:text-slate-950"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
    >
      {/* =========================================
          1. CINEMATIC INTRO VIDEO OVERLAY (FULLSCREEN WHITE)
      ========================================= */}
      {typeof document !== "undefined" &&
        createPortal(
          <AnimatePresence
            onExitComplete={() => {
              document.body.classList.remove("intro-active");
              document.body.style.overflow = "";
              document.documentElement.style.overflow = "";
            }}
          >
            {!introFinished && (
              <motion.div
                key="intro-overlay"
                initial={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{
                  duration: 0.7,
                  ease: [0.22, 1, 0.36, 1],
                }}
                onClick={autoplayBlocked ? handleUserPlay : undefined}
                className="fixed inset-0 z-[99999] flex items-center justify-center overflow-hidden bg-white select-none"
              >
                {/* Fullscreen Video canvas on white background */}
                <div className="relative z-10 flex h-full w-full items-center justify-center bg-white">
                  <video
                    ref={videoRef}
                    src={introVideo}
                    poster={introPoster}
                    autoPlay
                    muted
                    defaultMuted
                    playsInline
                    preload="auto"
                    onTimeUpdate={handleTimeUpdate}
                    onEnded={finishIntro}
                    onError={handleVideoError}
                    className="h-full w-full object-contain md:object-cover"
                  />

                  {/* Play prompt if browser blocks unprompted autoplay */}
                  {autoplayBlocked && (
                    <div className="absolute inset-0 z-30 flex flex-col items-center justify-center bg-white/70 backdrop-blur-xs">
                      <button
                        type="button"
                        onClick={handleUserPlay}
                        className="group flex flex-col items-center gap-3 cursor-pointer"
                      >
                        <div className="flex h-16 w-16 items-center justify-center rounded-full bg-blue-600 text-white shadow-xl shadow-blue-600/30 transition duration-300 group-hover:scale-110 group-active:scale-95 sm:h-20 sm:w-20">
                          <Play className="h-7 w-7 translate-x-0.5 fill-current sm:h-8 sm:w-8" />
                        </div>
                        <span className="font-mono text-xs font-bold uppercase tracking-[0.2em] text-slate-800 group-hover:text-blue-600 sm:text-sm">
                          Click to Watch Intro
                        </span>
                      </button>
                    </div>
                  )}
                </div>

                {/* Top controls: Mute & Skip buttons */}
                <div className="absolute right-4 top-4 z-40 flex items-center gap-2 sm:right-8 sm:top-8 sm:gap-3">
                  <button
                    type="button"
                    onClick={toggleMute}
                    aria-label={
                      muted
                        ? "Unmute introduction video"
                        : "Mute introduction video"
                    }
                    className="flex h-10 w-10 cursor-pointer items-center justify-center rounded-full border border-slate-700/20 bg-[#071A33]/90 text-white shadow-lg backdrop-blur-xl transition duration-300 hover:scale-105 hover:bg-blue-600 hover:border-blue-500 active:scale-95 sm:h-11 sm:w-11"
                  >
                    {muted ? (
                      <VolumeX className="h-4 w-4 sm:h-5 sm:w-5" />
                    ) : (
                      <Volume2 className="h-4 w-4 sm:h-5 sm:w-5" />
                    )}
                  </button>

                  <button
                    type="button"
                    onClick={(e) => {
                      e.stopPropagation();
                      finishIntro();
                    }}
                    className="flex h-10 cursor-pointer items-center gap-2 rounded-full border border-slate-700/20 bg-[#071A33]/90 px-4 text-[10px] font-semibold uppercase tracking-[0.14em] text-white shadow-lg backdrop-blur-xl transition duration-300 hover:scale-105 hover:bg-blue-600 hover:border-blue-500 active:scale-95 sm:h-11 sm:px-5 sm:text-xs"
                  >
                    <span>Skip</span>
                    <SkipForward className="h-3.5 w-3.5" />
                  </button>
                </div>

                {/* Bottom video progress indicator */}
              </motion.div>
            )}
          </AnimatePresence>,
          document.body,
        )}

      {/* =========================================
          2. MAIN CINEMATIC HERO (ACTIVE SLIDE UNDERLAY)
      ========================================= */}
      <div className="relative h-full w-full overflow-hidden bg-[#061426]">
        {/* Background slides - initial={false} ensures instant visibility without black frame */}
        <AnimatePresence initial={false} mode="sync">
          <motion.div
            key={`slide-img-${activeSlide.id}`}
            initial={{ opacity: 0, scale: 1.04 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0 }}
            transition={{
              opacity: {
                duration: 1.0,
                ease: [0.22, 1, 0.36, 1],
              },
              scale: {
                duration: SLIDE_DURATION / 1000,
                ease: "linear",
              },
            }}
            className="absolute inset-0 z-0 h-full w-full"
          >
            <img
              src={activeSlide.image}
              alt={activeSlide.title}
              fetchPriority="high"
              loading="eager"
              draggable="false"
              className="h-full w-full select-none object-cover"
            />

            {/* Softened gradient overlays to eliminate dark opaque blocks */}
            <div className="pointer-events-none absolute inset-0 z-[1] bg-gradient-to-t from-[#061426]/75 via-[#061426]/20 to-[#061426]/35" />

            <div className="pointer-events-none absolute inset-0 z-[1] bg-gradient-to-r from-[#061426]/40 via-transparent to-[#061426]/15" />
          </motion.div>
        </AnimatePresence>

        {/* =========================================
            3. SLIDE CONTENT (CENTERED SLOGAN & CAPTIONS)
            Always pre-rendered so it is instantly visible when intro fades out
        ========================================= */}
        <AnimatePresence initial={false} mode="wait">
          {activeSlide.centerSlogan ? (
            <motion.div
              key={`center-slogan-${activeSlide.id}`}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              transition={{
                duration: 0.6,
                ease: [0.22, 1, 0.36, 1],
              }}
              className="absolute inset-0 z-10 flex items-center justify-center px-5 pb-24 pt-20 text-center sm:px-10 sm:py-0"
            >
              <div className="max-w-5xl">
                <div className="mb-5 flex items-center justify-center gap-3 sm:mb-7">
                  <span className="h-px w-7 bg-sky-400/80 sm:w-12" />
                  <span className="text-[9px] font-semibold uppercase tracking-[0.25em] text-sky-200 sm:text-xs">
                    Smart Security · Smart Living
                  </span>
                  <span className="h-px w-7 bg-sky-400/80 sm:w-12" />
                </div>

                <h1 className="text-[clamp(2.5rem,8vw,6.5rem)] font-extrabold leading-[1.02] tracking-tight text-white">
                  Smart.{" "}
                  <span className="font-serif font-normal italic text-sky-300 drop-shadow-[0_0_30px_rgba(56,189,248,0.4)]">
                    Secure.
                  </span>{" "}
                  Seamless.
                </h1>

                <div className="mx-auto my-5 h-[2px] w-24 origin-center bg-gradient-to-r from-transparent via-sky-400 to-transparent sm:my-7 sm:w-36" />

                <p className="mx-auto max-w-2xl text-xs leading-relaxed text-white/85 sm:text-sm sm:leading-7 lg:text-base">
                  Intelligent technology for safer homes, smarter spaces, and
                  effortless everyday living. Engineered for modern peace of
                  mind.
                </p>

                {/* Primary CTA Buttons */}
                <div className="mt-8 flex flex-wrap items-center justify-center gap-4 sm:mt-10">
                  <a
                    href="/services"
                    className="inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-blue-600 to-sky-500 px-6 py-3 text-xs font-bold uppercase tracking-wider text-white shadow-lg shadow-blue-500/25 transition-all hover:scale-105 hover:shadow-blue-500/40 active:scale-95 sm:px-8 sm:py-3.5 sm:text-sm"
                  >
                    <span>Explore Solutions</span>
                    <span>→</span>
                  </a>

                  <a
                    href="/contact"
                    className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-6 py-3 text-xs font-bold uppercase tracking-wider text-white backdrop-blur-md transition-all hover:scale-105 hover:bg-white/20 active:scale-95 sm:px-8 sm:py-3.5 sm:text-sm"
                  >
                    <span>Contact Us</span>
                  </a>
                </div>
              </div>
            </motion.div>
          ) : (
            <motion.div
              key={`caption-${activeSlide.id}`}
              initial={{ opacity: 0, x: -25 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -15 }}
              transition={{
                duration: 0.6,
                ease: [0.22, 1, 0.36, 1],
              }}
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

              <p className="mt-3 max-w-md text-xs leading-relaxed text-white/85 sm:text-sm sm:leading-7">
                {activeSlide.description}
              </p>

              <div className="mt-6 flex items-center gap-4">
                <a
                  href="/services"
                  className="group inline-flex items-center gap-2 rounded-full bg-sky-500/20 border border-sky-400/40 px-5 py-2.5 text-xs font-bold uppercase tracking-wider text-sky-200 backdrop-blur-md transition-all hover:bg-sky-500 hover:text-white"
                >
                  <span>Discover More</span>
                  <span className="transition-transform duration-300 group-hover:translate-x-1">
                    →
                  </span>
                </a>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
}
