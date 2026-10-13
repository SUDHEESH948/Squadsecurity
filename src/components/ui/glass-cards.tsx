import React, { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { cardData } from "../../lib/utils";
import {
  Camera,
  Network,
  Cpu,
  ShieldCheck,
  ArrowRight,
  CheckCircle2,
} from "lucide-react";

gsap.registerPlugin(ScrollTrigger);

const iconMap: Record<string, React.ElementType> = {
  Camera,
  Network,
  Cpu,
  ShieldCheck,
};

export interface CardProps {
  id: number;
  title: string;
  description: string;
  index: number;
  totalCards: number;
  color: string;
  category?: string;
  badge?: string;
  iconName?: string;
  features?: string[];
  image?: string;
  link?: string;
}

const Card: React.FC<CardProps> = ({
  title,
  description,
  index,
  totalCards,
  color,
  category,
  badge,
  iconName = "ShieldCheck",
  features = [],
  image,
  link = "/services",
}) => {
  const cardRef = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  const IconComponent = iconMap[iconName] || ShieldCheck;

  useEffect(() => {
    const card = cardRef.current;
    const container = containerRef.current;
    if (!card || !container) return;

    const targetScale = 1 - (totalCards - index) * 0.05;

    // Set initial state
    gsap.set(card, {
      scale: 1,
      transformOrigin: "center top",
    });

    // Create scroll trigger for stacking effect
    const st = ScrollTrigger.create({
      trigger: container,
      start: "top center",
      end: "bottom center",
      scrub: 1,
      onUpdate: (self) => {
        const progress = self.progress;
        const scale = gsap.utils.interpolate(1, targetScale, progress);

        gsap.set(card, {
          scale: Math.max(scale, targetScale),
          transformOrigin: "center top",
        });
      },
    });

    return () => {
      st.kill();
    };
  }, [index, totalCards]);

  return (
    <div
      ref={containerRef}
      style={{
        height: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        position: "sticky",
        top: 0,
      }}
    >
      <div
        ref={cardRef}
        style={{
          position: "relative",
          width: "min(92%, 1020px)",
          minHeight: "470px",
          borderRadius: "28px",
          isolation: "isolate",
          top: `calc(-4vh + ${index * 24}px)`,
          transformOrigin: "top",
        }}
        className="card-content"
      >
        {/* Main Card Content */}
        <div
          style={{
            position: "relative",
            width: "100%",
            height: "100%",
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-between",
            borderRadius: "28px",
            background: `
                linear-gradient(145deg, 
                    rgba(255, 255, 255, 0.98) 0%, 
                    rgba(248, 250, 252, 0.98) 50%,
                    rgba(241, 245, 249, 0.99) 100%
                )
            `,
            backdropFilter: "blur(30px) saturate(150%)",
            border: "1px solid rgba(148, 163, 184, 0.35)",
            boxShadow: `
                0 25px 65px rgba(0, 0, 0, 0.55),
                0 4px 16px rgba(0, 0, 0, 0.35),
                inset 0 1px 0 rgba(255, 255, 255, 0.9),
                inset 0 -1px 0 rgba(148, 163, 184, 0.12)
            `,
            overflow: "hidden",
            padding: "clamp(1.5rem, 4vw, 3rem)",
          }}
        >
          {image && (
            <>
              <img src={image} alt="" loading="lazy" decoding="async" className="absolute inset-0 h-full w-full object-cover opacity-75" />
              <div className="absolute inset-0 bg-[linear-gradient(105deg,rgba(255,255,255,.82)_0%,rgba(255,255,255,.68)_48%,rgba(248,250,252,.42)_100%)]" />
            </>
          )}
          {/* Enhanced Glass reflection overlay */}
          <div
            style={{
              position: "absolute",
              top: 0,
              left: 0,
              right: 0,
              height: "60%",
              background:
                "linear-gradient(135deg, rgba(255, 255, 255, 0.18) 0%, rgba(255, 255, 255, 0.05) 50%, transparent 100%)",
              pointerEvents: "none",
              borderRadius: "28px 28px 0 0",
            }}
          />

          {/* Glass shine effect */}
          <div
            style={{
              position: "absolute",
              top: "10px",
              left: "10px",
              right: "10px",
              height: "2px",
              background:
                "linear-gradient(90deg, transparent 0%, rgba(255, 255, 255, 0.5) 50%, transparent 100%)",
              borderRadius: "1px",
              pointerEvents: "none",
            }}
          />

          {/* Side glass reflection */}
          <div
            style={{
              position: "absolute",
              top: 0,
              left: 0,
              width: "2px",
              height: "100%",
              background:
                "linear-gradient(180deg, rgba(255, 255, 255, 0.25) 0%, transparent 50%)",
              borderRadius: "28px 0 0 28px",
              pointerEvents: "none",
            }}
          />

          {/* Frosted glass texture */}
          <div
            style={{
              position: "absolute",
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
              backgroundImage: `
                radial-gradient(circle at 20% 30%, rgba(255,255,255,0.08) 1px, transparent 2px),
                radial-gradient(circle at 80% 70%, rgba(255,255,255,0.06) 1px, transparent 2px),
                radial-gradient(circle at 40% 80%, rgba(255,255,255,0.04) 1px, transparent 2px)
            `,
              backgroundSize: "30px 30px, 25px 25px, 35px 35px",
              pointerEvents: "none",
              borderRadius: "28px",
              opacity: 0.6,
            }}
          />

          {/* ================= CARD HEADER ================= */}
          <div className="relative z-10 flex flex-wrap items-center justify-between gap-4 border-b border-slate-200 pb-5">
            <div className="flex items-center gap-3.5">
              <div
                className="flex h-12 w-12 sm:h-14 sm:w-14 items-center justify-center rounded-2xl border backdrop-blur-md shadow-lg transition-transform duration-300 group-hover:scale-105"
                style={{
                  backgroundColor: "rgba(239, 246, 255, 0.95)",
                  borderColor: "#cbd5e1",
                  boxShadow: "0 8px 20px rgba(15, 23, 42, 0.08)",
                }}
              >
                <IconComponent
                  className="h-6 w-6 sm:h-7 sm:w-7"
                  style={{ color: "#0f172a" }}
                />
              </div>
              <div>
                <span
                  className="font-mono text-xs font-bold uppercase tracking-[0.2em] block"
                  style={{ color }}
                >
                  {badge || `SERVICE VERTICAL 0${index + 1}`}
                </span>
              </div>
            </div>

            {/* Stage Counter */}
            <div className="flex items-center gap-2 font-mono text-xs text-slate-400">
              <span className="font-bold text-slate-900 text-base">
                {String(index + 1).padStart(2, "0")}
              </span>
              <span>/</span>
              <span>{String(totalCards).padStart(2, "0")}</span>
            </div>
          </div>

          {/* ================= CARD BODY ================= */}
          <div className="relative z-10 my-6 sm:my-8 grid gap-6 lg:grid-cols-12 items-center">
            <div className="lg:col-span-7">
              <h3 className="font-display text-2xl sm:text-4xl lg:text-5xl font-black text-slate-950 tracking-tight leading-tight mb-4">
                {title}
              </h3>
              <p className="text-sm sm:text-base lg:text-lg text-slate-600 font-normal leading-relaxed max-w-xl">
                {description}
              </p>
            </div>

            {/* Feature Pills */}
            <div className="lg:col-span-5 flex flex-col gap-2.5">
              {features.map((feat, i) => (
                <div
                  key={i}
                  className="flex items-center gap-2.5 rounded-xl border border-slate-200 bg-white px-3.5 py-2 backdrop-blur-md transition-all hover:border-sky-300 hover:shadow-sm"
                >
                  <CheckCircle2
                    className="h-4 w-4 shrink-0"
                    style={{ color }}
                  />
                  <span className="font-sans text-xs sm:text-sm font-medium text-slate-700">
                    {feat}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* ================= CARD FOOTER ================= */}
          <div className="relative z-10 flex flex-wrap items-center justify-between gap-4 pt-4 border-t border-slate-200">
            <div className="flex items-center gap-2 text-slate-500 text-xs font-mono">
              <span
                className="h-2 w-2 rounded-full animate-pulse"
                style={{ backgroundColor: color }}
              />
              <span>DESIGNED FOR EVERYDAY USE</span>
            </div>

            <a
              href={link}
              className="inline-flex items-center gap-2 rounded-full px-5 py-2.5 text-xs sm:text-sm font-bold tracking-wide transition-all duration-300 hover:scale-105 active:scale-95 text-slate-950 shadow-lg"
              style={{
                backgroundColor: "#0f172a",
                boxShadow: "0 8px 25px rgba(15, 23, 42, 0.16)",
              }}
            >
              <span className="text-white">Explore service</span>
              <ArrowRight className="h-4 w-4 text-sky-300" />
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export interface StackedCardsProps {
  title?: string;
  subtitle?: string;
  badge?: string;
  cards?: CardProps[];
  showHeader?: boolean;
}

export const StackedCards: React.FC<StackedCardsProps> = ({
  title = "Engineered Systems Portfolio",
  subtitle = "Scroll through Squad Security's certified engineering verticals built for unyielding resilience.",
  badge = "CERTIFIED VERTICALS",
  cards = cardData,
  showHeader = false,
}) => {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    gsap.fromTo(
      container,
      { opacity: 0 },
      {
        opacity: 1,
        duration: 1.2,
        ease: "power2.out",
      }
    );
  }, []);

  return (
    <main
      ref={containerRef}
      style={{
        background: "#F8FAFC",
        position: "relative",
        width: "100%",
        overflow: "visible",
      }}
    >
      {/* Background Volumetric Glows */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <div className="absolute top-[20%] -left-48 h-[650px] w-[650px] rounded-full bg-blue-200/45 blur-[180px]" />
        <div className="absolute top-[60%] -right-48 h-[650px] w-[650px] rounded-full bg-sky-200/45 blur-[180px]" />
        <div className="absolute bottom-10 left-1/3 h-[500px] w-[500px] rounded-full bg-blue-100/40 blur-[180px]" />
      </div>

      {/* Hero Section */}
      {showHeader && (
        <section
          style={{
            minHeight: "60vh",
            width: "100%",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            position: "relative",
            color: "#ffffff",
            padding: "6rem 1.5rem 3rem 1.5rem",
            textAlign: "center",
          }}
        >
          <div
            style={{
              position: "absolute",
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
              backgroundImage: `
                  linear-gradient(to right, rgba(255, 255, 255, 0.04) 1px, transparent 1px),
                  linear-gradient(to bottom, rgba(255, 255, 255, 0.04) 1px, transparent 1px)
              `,
              backgroundSize: "54px 54px",
              maskImage:
                "radial-gradient(ellipse 60% 50% at 50% 0%, #000 70%, transparent 100%)",
            }}
          />

          {/* Section Badge */}
          {badge && (
            <div className="relative z-10 mb-5 inline-flex items-center gap-2 rounded-full border border-blue-500/30 bg-blue-500/15 px-4 py-1.5 font-mono text-xs font-bold uppercase tracking-[0.25em] text-blue-300 backdrop-blur-md">
              <span className="h-1.5 w-1.5 rounded-full bg-blue-400 animate-pulse" />
              {badge}
            </div>
          )}

          {title && (
            <h2
              style={{
                fontSize: "clamp(2.4rem, 6vw, 4.5rem)",
                fontWeight: "900",
                textAlign: "center",
                lineHeight: "1.1",
                padding: "0 1rem",
                position: "relative",
                zIndex: 1,
                letterSpacing: "-0.03em",
              }}
              className="font-display text-white max-w-4xl mx-auto"
            >
              {title}
            </h2>
          )}

          {subtitle && (
            <p className="relative z-10 mt-5 max-w-2xl mx-auto text-base sm:text-lg text-slate-400 font-normal leading-relaxed">
              {subtitle}
            </p>
          )}

          <div className="relative z-10 mt-6 inline-flex items-center gap-2 font-mono text-xs uppercase tracking-widest text-sky-400">
            <span>Scroll down to stack service cards</span>
            <span className="animate-bounce">↓</span>
          </div>
        </section>
      )}

      {/* Cards Section */}
      <section
        style={{
          color: "#ffffff",
          width: "100%",
          position: "relative",
          zIndex: 10,
        }}
      >
        {cards.map((card, index) => {
          return (
            <Card
              key={card.id}
              id={card.id}
              title={card.title}
              description={card.description}
              index={index}
              totalCards={cards.length}
              color={card.color}
              category={card.category}
              badge={card.badge}
              iconName={card.iconName}
              features={card.features}
              image={card.image}
              link={card.link}
            />
          );
        })}
      </section>
    </main>
  );
};

export default StackedCards;
