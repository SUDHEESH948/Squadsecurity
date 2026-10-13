
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import {
  ArrowRight,
  ArrowUpRight,
  Sparkles,
  ShieldCheck,
  Lock,
  Cpu,
  Volume2,
  VolumeX,
  SkipForward,
} from "lucide-react";

import introVideo from "../../assets/intro.mp4";
// Background slides
const slides = [
  {
    id: 1,
    title: "CCTV & AI Security",
    icon: ShieldCheck,
    image:
      "https://images.unsplash.com/photo-1557597774-9d273605dfa9?q=80&w=1920&auto=format&fit=crop",
  },
  {
    id: 2,
    title: "Access Control & Gate Automation",
    icon: Lock,
    image:
      "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?q=80&w=1920&auto=format&fit=crop",
  },
  {
    id: 3,
    title: "Smart Home Automation",
    icon: Cpu,
    image:
      "https://images.unsplash.com/photo-1558002038-1055907df827?q=80&w=1920&auto=format&fit=crop",
  },
];

export default function HomeHero() {
  const [introFinished, setIntroFinished] = useState(false);
  const [introSkipped, setIntroSkipped] = useState(false);
  const [muted, setMuted] = useState(true);
  const [progress, setProgress] = useState(0);
  const [currentSlide, setCurrentSlide] = useState(0);
  const videoRef = React.useRef(null);

  // Preload background images
  useEffect(() => {
    slides.forEach((slide) => {
      const img = new Image();
      img.src = slide.image;
    });
  }, []);

  // Ensure video autoplay with muted audio on mobile & modern browsers
  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.muted = muted;
      videoRef.current.play().catch(() => {});
    }
  }, []);

  // Automatically cycle through the hero slides
  useEffect(() => {
    if (!introFinished) return;

    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 5000);

    return () => clearInterval(timer);
  }, [introFinished]);

  const finishIntro = () => {
    setIntroSkipped(true);
    setIntroFinished(true);
  };

  const toggleMute = () => {
    setMuted((prev) => {
      const next = !prev;
      if (videoRef.current) {
        videoRef.current.muted = next;
      }
      return next;
    });
  };

  const handleTimeUpdate = (e) => {
    const video = e.currentTarget;
    if (video.duration) {
      setProgress((video.currentTime / video.duration) * 100);
    }
  };

  const activeSlide = slides[currentSlide];
  const SlideIcon = activeSlide.icon;

  return (
    <section className="relative min-h-[92vh] overflow-hidden bg-white selection:bg-blue-100 selection:text-blue-900">

      {/* INTRO VIDEO */}
      <AnimatePresence>
        {!introFinished && (
          <motion.div
            key="intro-video"
            initial={{ opacity: 1 }}
            exit={{ opacity: 0, scale: 1.02 }}
            transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
            className="fixed inset-0 z-[100] flex items-center justify-center bg-black overflow-hidden"
          >
            {/* Main Video: object-contain ensures 16:9 widescreen video is never cropped on mobile portrait screens */}
            <video
              ref={videoRef}
              className="relative z-10 h-full w-full object-contain"
              src={introVideo}
              autoPlay
              muted={muted}
              playsInline
              preload="auto"
              onTimeUpdate={handleTimeUpdate}
              onEnded={finishIntro}
              onError={finishIntro}
            />

            {/* Cinematic subtle edge vignette */}
            <div className="pointer-events-none absolute inset-0 z-20 bg-gradient-to-t from-black/60 via-transparent to-black/40" />

            {/* Video controls */}
            <div className="absolute right-5 top-5 z-30 flex items-center gap-3 sm:right-10 sm:top-8">
              <button
                type="button"
                onClick={toggleMute}
                aria-label={muted ? "Unmute introduction" : "Mute introduction"}
                className="flex h-11 w-11 items-center justify-center rounded-full border border-white/25 bg-black/40 text-white backdrop-blur-md transition hover:bg-white/20 active:scale-95 cursor-pointer"
              >
                {muted ? <VolumeX size={18} /> : <Volume2 size={18} />}
              </button>

              <button
                type="button"
                onClick={finishIntro}
                className="flex h-11 items-center gap-2 rounded-full border border-white/25 bg-black/40 px-4 text-xs font-semibold uppercase tracking-wider text-white backdrop-blur-md transition hover:bg-white/20 active:scale-95 cursor-pointer"
              >
                <SkipForward size={14} />
                Skip
              </button>
            </div>

            {/* Real-time playback progress indicator */}
            <div className="absolute bottom-0 left-0 z-30 h-1 w-full bg-white/15">
              <div
                className="h-full bg-blue-500 transition-[width] duration-150 ease-linear"
                style={{ width: `${progress}%` }}
              />
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* MAIN HERO */}
      <div className="relative flex min-h-[92vh] items-center justify-center px-4 py-24 sm:px-6">

        {/* Background slider */}
        <div className="absolute inset-0">
          <AnimatePresence mode="sync">
            <motion.div
              key={activeSlide.id}
              initial={{ opacity: 0, scale: 1.08 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.98 }}
              transition={{
                duration: 1.6,
                ease: [0.16, 1, 0.3, 1],
              }}
              className="absolute inset-0"
            >
              <img
                src={activeSlide.image}
                alt={activeSlide.title}
                className="h-full w-full object-cover"
                loading="eager"
                onError={(event) => {
                  event.currentTarget.src =
                    "https://images.unsplash.com/photo-1558002038-1055907df827?q=80&w=1920&auto=format&fit=crop";
                }}
              />
            </motion.div>
          </AnimatePresence>

          <div className="absolute inset-0 bg-white/55" />
          <div className="absolute inset-0 bg-gradient-to-b from-white/75 via-white/25 to-white/90" />

          {/* Blueprint grid */}
          <div
            className="pointer-events-none absolute inset-0 opacity-[0.04]"
            style={{
              backgroundImage:
                "linear-gradient(rgba(37,99,235,1) 1px, transparent 1px), linear-gradient(90deg, rgba(37,99,235,1) 1px, transparent 1px)",
              backgroundSize: "50px 50px",
            }}
          />
        </div>

        {/* Hero content */}
        <div className="relative z-10 mx-auto w-full max-w-6xl text-center">

          <motion.div
            initial={{ opacity: 0, y: -15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="mb-7 inline-flex max-w-full items-center gap-2 rounded-full border border-blue-200/80 bg-white/90 px-3 py-2 shadow-sm backdrop-blur-md sm:px-4"
          >
            <SlideIcon className="h-4 w-4 shrink-0 animate-pulse text-blue-600" />

            <span className="truncate font-mono text-[9px] font-semibold uppercase tracking-[0.12em] text-blue-900 sm:text-[10px] sm:tracking-[0.22em]">
              {activeSlide.title}
            </span>

            <span className="h-1 w-1 shrink-0 rounded-full bg-blue-400" />

            <span className="shrink-0 font-mono text-[9px] text-blue-900/60">
              0{currentSlide + 1}/0{slides.length}
            </span>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{
              duration: 0.9,
              delay: 0.1,
              ease: [0.22, 1, 0.36, 1],
            }}
            className="font-serif text-[clamp(3.3rem,10vw,8rem)] font-normal leading-[0.9] tracking-[-0.045em] text-blue-950"
          >
            Smart.
            <br />

            <span className="relative inline-block italic text-blue-600">
              Secure.
              <span className="absolute -bottom-1 left-1/2 h-[2px] w-3/4 -translate-x-1/2 bg-gradient-to-r from-transparent via-blue-500 to-transparent sm:-bottom-2" />
            </span>

            <br />

            <span className="text-blue-950/90">Seamless.</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 25 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.35 }}
            className="mx-auto mt-7 max-w-2xl px-2 text-sm leading-7 text-blue-950/80 sm:mt-10 sm:text-base lg:text-lg"
          >
            Reliable CCTV security, intelligent smart-home automation,
            and motorized access control systems designed to make modern
            spaces safer, smarter, and more resilient.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 25 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.5 }}
            className="mt-8 flex flex-col justify-center gap-3 sm:mt-10 sm:flex-row"
          >
            <Link
              to="/services"
              className="group inline-flex min-h-12 items-center justify-center gap-4 rounded-full bg-blue-950 px-7 py-3.5 text-xs font-semibold uppercase tracking-[0.12em] text-white shadow-lg shadow-blue-950/15 transition duration-300 hover:scale-[1.03] hover:bg-blue-600"
            >
              Explore Services
              <span className="flex h-7 w-7 items-center justify-center rounded-full bg-white/10 transition-transform group-hover:translate-x-1">
                <ArrowRight size={14} />
              </span>
            </Link>

            <Link
              to="/contact"
              className="group inline-flex min-h-12 items-center justify-center gap-3 rounded-full border border-blue-900/20 bg-white/90 px-7 py-3.5 text-xs font-semibold uppercase tracking-[0.12em] text-blue-950 shadow-sm backdrop-blur-sm transition duration-300 hover:border-blue-400 hover:bg-blue-50"
            >
              Contact Us
              <ArrowUpRight className="h-4 w-4 text-blue-600 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
            </Link>
          </motion.div>

          {/* Service indicators */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.8 }}
            className="mt-12 flex flex-wrap items-center justify-center gap-x-5 gap-y-3 text-[10px] font-semibold uppercase tracking-[0.12em] text-blue-950/70 sm:gap-x-8 sm:text-xs"
          >
            <span className="flex items-center gap-2">
              <ShieldCheck size={15} className="text-blue-600" />
              CCTV & AI
            </span>

            <span className="h-1 w-1 rounded-full bg-blue-400" />

            <span className="flex items-center gap-2">
              <Lock size={15} className="text-blue-600" />
              Access Control
            </span>

            <span className="h-1 w-1 rounded-full bg-blue-400" />

            <span className="flex items-center gap-2">
              <Cpu size={15} className="text-blue-600" />
              Smart Living
            </span>
          </motion.div>
        </div>

        {/* Decorative accents */}
        <motion.div
          initial={{ opacity: 0, x: -30, rotate: 8 }}
          animate={{ opacity: 1, x: 0, rotate: 8 }}
          transition={{ duration: 0.8, delay: 0.9 }}
          className="absolute left-[7%] top-[25%] hidden h-16 w-16 rounded-2xl border border-blue-100 bg-white/80 shadow-md backdrop-blur-md lg:block"
        >
          <div className="flex h-full items-center justify-center">
            <Sparkles className="h-5 w-5 text-blue-500" />
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.7 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: 1 }}
          className="absolute bottom-[18%] right-[8%] hidden h-20 w-20 rounded-full border border-blue-200/80 bg-blue-50/60 backdrop-blur-sm lg:block"
        >
          <div className="absolute inset-3 rounded-full border border-blue-200/60" />
        </motion.div>

        <div className="absolute bottom-[20%] left-[16%] hidden h-2 w-2 rounded-full bg-blue-500 lg:block" />
        <div className="absolute right-[17%] top-[23%] hidden h-2 w-2 rounded-full bg-blue-400 lg:block" />
      </div>
    </section>
  );
}