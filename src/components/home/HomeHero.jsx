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
} from "lucide-react";

import introVideo from "../../assets/newintro.mp4";
import homeImage from "../../assets/home.png";
import solarImage from "../../assets/solar.png";
import cctvImage from "../../assets/cctv.png";

const NAVY = "#061426";
const DEEP_NAVY = "#071A33";
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

  const videoRef = useRef(null);
  const finishedRef = useRef(false);

  const activeSlide = slides[currentSlide];

  // Lock scrolling while the intro video is visible.
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

  // Preload images for smoother slide transitions.
  useEffect(() => {
    slides.forEach(({ image }) => {
      const img = new Image();
      img.src = image;
    });
  }, []);

  // Start the intro video.
  useEffect(() => {
    const video = videoRef.current;

    if (!video || introFinished) return;

    video.muted = muted;

    video.play().catch(() => {
      // Muted autoplay is the most reliable browser option.
    });
  }, [introFinished, muted]);

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

  // Automatically advance slides every 6.5 seconds.
  useEffect(() => {
    if (!introFinished || isPaused) return;

    const timer = window.setInterval(() => {
      setCurrentSlide((previous) => (previous + 1) % slides.length);
    }, SLIDE_DURATION);

    return () => window.clearInterval(timer);
  }, [introFinished, isPaused]);

  // Toggle intro video audio.
  const toggleMute = () => {
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
      className="relative isolate min-h-[100svh] overflow-hidden bg-[#061426] text-white selection:bg-sky-300 selection:text-slate-950"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
    >
      {/* =========================================
          1. CINEMATIC INTRO VIDEO OVERLAY
      ========================================= */}
      {typeof document !== "undefined" &&
        createPortal(
          <AnimatePresence>
            {!introFinished && (
              <motion.div
                key="intro"
                initial={{ opacity: 1 }}
                exit={{ opacity: 0, scale: 1.02 }}
                transition={{
                  duration: 0.8,
                  ease: [0.22, 1, 0.36, 1],
                }}
                className="fixed inset-0 z-[99999] flex items-center justify-center overflow-hidden bg-white select-none"
              >
                {/* Fullscreen Video container */}
                <div className="relative z-10 flex h-full w-full items-center justify-center">
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
                    className="h-full w-full object-contain md:object-cover"
                  />
                </div>

                {/* Video progress indicator */}

                {/* Mute and Skip controls */}
                <div className="absolute right-4 top-4 z-40 flex items-center gap-2 sm:right-8 sm:top-8 sm:gap-3">
                  <button
                    type="button"
                    onClick={toggleMute}
                    aria-label={
                      muted
                        ? "Unmute introduction video"
                        : "Mute introduction video"
                    }
                    className="flex h-10 w-10 items-center justify-center rounded-full border border-slate-700/20 bg-[#071A33]/90 text-white shadow-lg backdrop-blur-xl transition duration-300 hover:scale-105 hover:bg-blue-600 hover:border-blue-500 active:scale-95 sm:h-11 sm:w-11"
                  >
                    {muted ? (
                      <VolumeX className="h-4 w-4 sm:h-5 sm:w-5" />
                    ) : (
                      <Volume2 className="h-4 w-4 sm:h-5 sm:w-5" />
                    )}
                  </button>

                  <button
                    type="button"
                    onClick={finishIntro}
                    className="flex h-10 items-center gap-2 rounded-full border border-slate-700/20 bg-[#071A33]/90 px-4 text-[10px] font-semibold uppercase tracking-[0.14em] text-white shadow-lg backdrop-blur-xl transition duration-300 hover:scale-105 hover:bg-blue-600 hover:border-blue-500 active:scale-95 sm:h-11 sm:px-5 sm:text-xs"
                  >
                    <span>Skip</span>
                    <SkipForward className="h-3.5 w-3.5" />
                  </button>
                </div>
              </motion.div>
            )}
          </AnimatePresence>,
          document.body,
        )}

      {/* =========================================
          2. MAIN CINEMATIC HERO
      ========================================= */}
      <div className="relative min-h-[100svh] overflow-hidden bg-[#061426]">
        {/* Background slides */}
        <AnimatePresence mode="sync">
          {introFinished && (
            <motion.div
              key={`slide-img-${activeSlide.id}`}
              initial={{ opacity: 0, scale: 1.05 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0 }}
              transition={{
                opacity: {
                  duration: 1.2,
                  ease: [0.22, 1, 0.36, 1],
                },
                scale: {
                  duration: SLIDE_DURATION / 1000,
                  ease: "linear",
                },
              }}
              className="absolute inset-0"
            >
              <img
                src={activeSlide.image}
                alt={activeSlide.title}
                draggable="false"
                className="h-full w-full select-none object-cover"
              />

              <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-[#061426] via-[#061426]/15 to-[#061426]/65" />

              <div className="pointer-events-none absolute inset-0 bg-gradient-to-r from-[#061426]/35 via-transparent to-[#061426]/10" />
            </motion.div>
          )}
        </AnimatePresence>

        {/* =========================================
            3. CENTERED FIRST-SLIDE SLOGAN
        ========================================= */}
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

                <motion.div
                  initial={{ scaleX: 0 }}
                  animate={{ scaleX: 1 }}
                  transition={{ duration: 0.8, delay: 0.45 }}
                  className="mx-auto my-5 h-[2px] w-24 origin-center bg-gradient-to-r from-transparent via-sky-400 to-transparent sm:my-7 sm:w-36"
                />

                <motion.p
                  initial={{ opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.7, delay: 0.4 }}
                  className="mx-auto max-w-2xl text-xs leading-relaxed text-white/85 sm:text-sm sm:leading-7 lg:text-base"
                >
                  Intelligent technology for safer homes, smarter spaces, and
                  effortless everyday living. Engineered for modern peace of
                  mind.
                </motion.p>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* =========================================
            4. CAPTIONS FOR OTHER SLIDES
        ========================================= */}
        <AnimatePresence mode="wait">
          {introFinished && !activeSlide.centerSlogan && (
            <motion.div
              key={`caption-${activeSlide.id}`}
              initial={{ opacity: 0, x: -30, filter: "blur(6px)" }}
              animate={{ opacity: 1, x: 0, filter: "blur(0px)" }}
              exit={{ opacity: 0, x: -20, filter: "blur(4px)" }}
              transition={{
                duration: 0.65,
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

              <a
                href="/services"
                className="group mt-5 inline-flex items-center gap-2 text-[10px] font-bold uppercase tracking-[0.15em] text-sky-300 transition-colors hover:text-white sm:mt-7 sm:text-xs"
              >
                Discover More
                <span className="transition-transform duration-300 group-hover:translate-x-1">
                  →
                </span>
              </a>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
}
