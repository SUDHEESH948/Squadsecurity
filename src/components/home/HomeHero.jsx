import { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import gsap from "gsap";
import { ArrowRight, ArrowUpRight } from "lucide-react";
import LightRays from "../LightRays";

const HERO_CAMERAS = [
  {
    id: "hikvision",
    brand: "HIKVISION",
    tagline: "4K ColorVu Smart Hybrid Bullet",
    src: "/images/hero-camera.png",
    alt: "Hikvision 4K ColorVu Surveillance Camera",
    badge: "Flagship 4K",
  },
  {
    id: "cpplus",
    brand: "CP PLUS",
    tagline: "Guard+ 5MP Vandal-Proof Dome",
    src: "/images/hero-camera-cpplus.png",
    alt: "CP PLUS 5MP Vandal Dome CCTV Camera",
    badge: "5MP Dome AI",
  },
  {
    id: "tplink",
    brand: "TP-LINK",
    tagline: "VIGI 4MP Full-Color Smart AI",
    src: "/images/hero-camera-tplink.png",
    alt: "TP-Link VIGI 4MP Outdoor Bullet CCTV Camera",
    badge: "VIGI Smart AI",
  },
  {
    id: "prama",
    brand: "PRAMA",
    tagline: "India Series 4K Ultra-Low-Light",
    src: "/images/hero-camera-prama.png",
    alt: "Prama India 4K Ultra-Low-Light Bullet CCTV Camera",
    badge: "Prama 4K Matrix",
  },
];

export default function HomeHero() {
  const sectionRef = useRef(null);
  const badgeRef = useRef(null);
  const headingRef = useRef(null);
  const descRef = useRef(null);
  const buttonsRef = useRef(null);
  const specsRef = useRef(null);
  const cameraContainerRef = useRef(null);
  const glowRef = useRef(null);

  const [currentIndex, setCurrentIndex] = useState(0);
  const [direction, setDirection] = useState(1);
  const [isPaused, setIsPaused] = useState(false);

  // Auto-rotate cameras every 4.5 seconds
  useEffect(() => {
    if (isPaused) return;
    const timer = setInterval(() => {
      setDirection(1);
      setCurrentIndex((prev) => (prev + 1) % HERO_CAMERAS.length);
    }, 4500);
    return () => clearInterval(timer);
  }, [isPaused]);

  const handleNext = () => {
    setDirection(1);
    setCurrentIndex((prev) => (prev + 1) % HERO_CAMERAS.length);
  };

  const handlePrev = () => {
    setDirection(-1);
    setCurrentIndex((prev) => (prev - 1 + HERO_CAMERAS.length) % HERO_CAMERAS.length);
  };

  const handleSelect = (idx) => {
    setDirection(idx > currentIndex ? 1 : -1);
    setCurrentIndex(idx);
  };

  useEffect(() => {
    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;

    const ctx = gsap.context(() => {
      if (prefersReducedMotion) {
        gsap.set(
          [
            badgeRef.current,
            headingRef.current,
            descRef.current,
            buttonsRef.current,
            specsRef.current,
            cameraContainerRef.current,
            glowRef.current,
          ],
          {
            opacity: 1,
            y: 0,
            x: 0,
            scale: 1,
          }
        );
        return;
      }

      // Initial state setup for entrance
      gsap.set(badgeRef.current, { opacity: 0, y: -20 });
      gsap.set(headingRef.current?.querySelectorAll(".hero-headline-line"), {
        opacity: 0,
        y: 40,
      });
      gsap.set(descRef.current, { opacity: 0, y: 24 });
      gsap.set(buttonsRef.current, { opacity: 0, y: 20 });
      gsap.set(specsRef.current, { opacity: 0, y: 16 });
      gsap.set(cameraContainerRef.current, {
        opacity: 0,
        x: 60,
        scale: 0.94,
      });
      gsap.set(glowRef.current, { opacity: 0, scale: 0.8 });

      // Entrance animation timeline
      const tl = gsap.timeline({ defaults: { ease: "power3.out" } });

      tl.to(badgeRef.current, {
        opacity: 1,
        y: 0,
        duration: 0.7,
        delay: 0.15,
      })
        .to(
          headingRef.current?.querySelectorAll(".hero-headline-line"),
          {
            opacity: 1,
            y: 0,
            duration: 0.95,
            stagger: 0.14,
            ease: "power4.out",
          },
          "-=0.35"
        )
        .to(descRef.current, { opacity: 1, y: 0, duration: 0.75 }, "-=0.55")
        .to(buttonsRef.current, { opacity: 1, y: 0, duration: 0.7 }, "-=0.55")
        .to(specsRef.current, { opacity: 1, y: 0, duration: 0.65 }, "-=0.45")
        .to(
          cameraContainerRef.current,
          {
            opacity: 1,
            x: 0,
            scale: 1,
            duration: 1.25,
            ease: "power3.out",
          },
          "-=1.1"
        )
        .to(
          glowRef.current,
          {
            opacity: 1,
            scale: 1,
            duration: 1.3,
            ease: "power2.out",
          },
          "-=1.1"
        );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const currentCamera = HERO_CAMERAS[currentIndex];

  return (
    <section
      ref={sectionRef}
      id="hero"
      aria-label="CCTV Security Solutions Hero"
      className="relative isolate min-h-[100svh] w-full overflow-hidden bg-gradient-to-b from-[#F8FAFC] via-[#F1F5F9] to-[#FFFFFF] text-slate-900 flex items-center"
    >
      {/* Subtle Architectural Blueprint Grid */}
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.035]"
        style={{
          backgroundImage:
            "linear-gradient(rgba(37,99,235,1) 1px, transparent 1px), linear-gradient(90deg, rgba(37,99,235,1) 1px, transparent 1px)",
          backgroundSize: "64px 64px",
        }}
      />

      {/* Ambient Diffuse Atmospheric Flares */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <div className="absolute top-1/4 right-[10%] h-[600px] w-[600px] rounded-full bg-blue-400/15 blur-[160px]" />
        <div className="absolute bottom-1/4 left-[5%] h-[500px] w-[500px] rounded-full bg-sky-300/20 blur-[150px]" />
      </div>

      {/* Dynamic Interactive Volumetric Light Rays (React Bits) */}
      <div className="pointer-events-none absolute inset-0 z-[1] overflow-hidden opacity-30 mix-blend-multiply">
        <LightRays
          raysOrigin="top-right"
          raysColor="#0284c7"
          raysSpeed={1.0}
          lightSpread={0.7}
          rayLength={1.3}
          followMouse={true}
          mouseInfluence={0.06}
          noiseAmount={0.05}
          distortion={0.03}
          className="w-full h-full"
        />
      </div>

      {/* Main Content Container: 50% Typography / 50% Camera Carousel Showcase */}
      <div className="relative z-10 mx-auto w-full max-w-7xl px-6 sm:px-10 lg:px-16 pt-32 pb-16 lg:py-24">
        <div className="flex flex-col lg:flex-row items-center justify-between gap-12 lg:gap-8">
          
          {/* ================= LEFT COLUMN: 50% Typography & CTAs ================= */}
          <div className="w-full lg:w-[50%] flex flex-col justify-center text-left z-20">
            
            {/* Small Heading / Elegant Text Label */}
            <div ref={badgeRef} className="mb-4 sm:mb-6 flex items-center gap-2 text-blue-600">
              <span className="h-1.5 w-1.5 rounded-full bg-blue-600" />
              <span className="font-mono text-xs font-bold uppercase tracking-[0.25em]">
                SMART SECURITY SOLUTIONS
              </span>
            </div>

            {/* Main Headline */}
            <h1
              ref={headingRef}
              className="font-display text-[clamp(2.75rem,5.4vw,5.5rem)] font-bold tracking-[-0.04em] leading-[0.98] text-slate-950"
            >
              <span className="hero-headline-line block">See Everything.</span>
              <span className="hero-headline-line block bg-gradient-to-r from-blue-700 via-blue-600 to-sky-600 bg-clip-text text-transparent">
                Secure Everything.
              </span>
            </h1>

            {/* Description */}
            <p
              ref={descRef}
              className="mt-6 sm:mt-8 max-w-lg text-[15px] sm:text-lg leading-relaxed text-slate-600 font-normal"
            >
              Advanced CCTV surveillance solutions designed to protect what matters most with multi-brand intelligent optics.
            </p>

            {/* Action Buttons */}
            <div
              ref={buttonsRef}
              className="mt-8 sm:mt-10 flex flex-wrap items-center gap-4"
            >
              {/* Primary Button */}
              <Link
                to="/services"
                className="group relative inline-flex min-h-[52px] items-center justify-center gap-3 rounded-full bg-slate-950 px-7 sm:px-8 py-3.5 text-xs sm:text-sm font-semibold tracking-wide text-white shadow-[0_10px_30px_rgba(15,23,42,0.18)] transition-all duration-300 hover:bg-blue-600 hover:shadow-[0_10px_35px_rgba(37,99,235,0.35)] active:scale-[0.98]"
              >
                <span>Explore Products</span>
                <ArrowRight
                  size={16}
                  className="transition-transform duration-300 group-hover:translate-x-1"
                />
              </Link>

              {/* Secondary Button */}
              <Link
                to="/services"
                className="group inline-flex min-h-[52px] items-center justify-center gap-3 rounded-full border border-slate-300/80 bg-white/90 px-7 sm:px-8 py-3.5 text-xs sm:text-sm font-semibold tracking-wide text-slate-800 shadow-sm backdrop-blur-md transition-all duration-300 hover:border-blue-400 hover:bg-slate-50 hover:text-blue-700 active:scale-[0.98]"
              >
                <span>Our Solutions</span>
                <ArrowUpRight
                  size={16}
                  className="text-blue-600 transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
                />
              </Link>
            </div>

            {/* Subtle Minimalist Key Specs */}
            <div
              ref={specsRef}
              className="mt-10 sm:mt-12 flex flex-wrap items-center gap-4 sm:gap-6 border-t border-slate-200/80 pt-5 font-mono text-[11px] uppercase tracking-[0.16em] text-slate-500"
            >
              <div className="flex items-center gap-1.5">
                <span className="font-bold text-blue-600">4K</span> Ultra HD
              </div>
              <span className="h-1 w-1 rounded-full bg-slate-300" />
              <div className="flex items-center gap-1.5">
                <span className="font-bold text-blue-600">AI</span> Smart Detection
              </div>
              <span className="h-1 w-1 rounded-full bg-slate-300" />
              <div className="flex items-center gap-1.5">
                <span className="font-bold text-blue-600">24/7</span> Continuous Guard
              </div>
            </div>

          </div>

          {/* ================= RIGHT COLUMN: ROTATING CAMERA CAROUSEL ================= */}
          <div
            className="w-full lg:w-[50%] relative flex flex-col items-center justify-center z-10 mt-6 lg:mt-0"
            onMouseEnter={() => setIsPaused(true)}
            onMouseLeave={() => setIsPaused(false)}
          >
            {/* Floating Camera Stage */}
            <div
              ref={cameraContainerRef}
              className="relative w-full flex items-center justify-center min-h-[300px] sm:min-h-[380px] lg:min-h-[460px]"
            >
              {/* Subtle Sapphire Ambient Glow Behind Camera */}
              <div
                ref={glowRef}
                className="pointer-events-none absolute inset-0 m-auto h-[260px] w-[260px] sm:h-[360px] sm:w-[360px] lg:h-[420px] lg:w-[420px] rounded-full bg-[radial-gradient(circle,rgba(56,189,248,0.22)_0%,rgba(37,99,235,0.10)_45%,transparent_70%)] blur-[55px]"
              />

              {/* Realistic Soft Shadow Synchronized with Float */}
              <motion.div
                animate={{
                  scaleX: [1, 0.88, 1],
                  scaleY: [1, 0.82, 1],
                  opacity: [0.35, 0.22, 0.35],
                }}
                transition={{ duration: 3.4, repeat: Infinity, ease: "easeInOut" }}
                className="pointer-events-none absolute bottom-5 sm:bottom-7 lg:bottom-9 left-1/2 -translate-x-1/2 h-5 sm:h-7 w-[55%] max-w-[320px] rounded-[100%] bg-[radial-gradient(ellipse_at_center,rgba(15,23,42,0.35)_0%,rgba(15,23,42,0.10)_45%,transparent_75%)] blur-[8px]"
              />
              <motion.div
                animate={{
                  scaleX: [1, 0.84, 1],
                  scaleY: [1, 0.78, 1],
                  opacity: [0.45, 0.3, 0.45],
                }}
                transition={{ duration: 3.4, repeat: Infinity, ease: "easeInOut" }}
                className="pointer-events-none absolute bottom-6 sm:bottom-8 lg:bottom-10 left-1/2 -translate-x-1/2 h-2.5 sm:h-3.5 w-[35%] max-w-[200px] rounded-[100%] bg-[radial-gradient(ellipse_at_center,rgba(15,23,42,0.45)_0%,transparent_70%)] blur-[3.5px]"
              />

              {/* Carousel 3D Rotating Camera Slide */}
              <div className="relative w-full flex items-center justify-center">
                <AnimatePresence mode="wait" custom={direction}>
                  <motion.div
                    key={currentCamera.id}
                    custom={direction}
                    variants={{
                      enter: (d) => ({
                        opacity: 0,
                        x: d > 0 ? 55 : -55,
                        scale: 0.9,
                        rotateY: d > 0 ? 12 : -12,
                      }),
                      center: {
                        opacity: 1,
                        x: 0,
                        scale: 1,
                        rotateY: 0,
                        transition: {
                          duration: 0.55,
                          ease: [0.22, 1, 0.36, 1],
                        },
                      },
                      exit: (d) => ({
                        opacity: 0,
                        x: d > 0 ? -55 : 55,
                        scale: 0.9,
                        rotateY: d > 0 ? -12 : 12,
                        transition: {
                          duration: 0.38,
                          ease: [0.22, 1, 0.36, 1],
                        },
                      }),
                    }}
                    initial="enter"
                    animate="center"
                    exit="exit"
                    className="relative z-10 flex w-full items-center justify-center select-none"
                  >
                    {/* Continuous Floating Breathing Motion */}
                    <motion.img
                      src={currentCamera.src}
                      alt={currentCamera.alt}
                      fetchPriority="high"
                      loading="eager"
                      animate={{ y: [0, -12, 0] }}
                      transition={{
                        duration: 3.4,
                        repeat: Infinity,
                        ease: "easeInOut",
                      }}
                      className="h-auto w-full max-w-[340px] sm:max-w-[420px] lg:max-w-[480px] xl:max-w-[510px] object-contain drop-shadow-[0_16px_30px_rgba(15,23,42,0.18)] pointer-events-none transition-transform duration-300"
                    />
                  </motion.div>
                </AnimatePresence>
              </div>

            </div>

          </div>

        </div>
      </div>

      {/* Subtle Bottom Ambient Gradient for Seamless Content Transition */}
      <div className="pointer-events-none absolute bottom-0 inset-x-0 h-24 bg-gradient-to-t from-white to-transparent" />
    </section>
  );
}
