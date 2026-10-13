import React, { lazy, Suspense, useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { motion } from "framer-motion";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import FloatingContact from "./components/FloatingContact";
import SmoothScroll from "./components/SmoothScroll";

const Home = lazy(() => import("./pages/Home"));
const About = lazy(() => import("./pages/About"));
const Services = lazy(() => import("./pages/Services"));
const Projects = lazy(() => import("./pages/Projects"));
const Contact = lazy(() => import("./pages/Contact"));
const CctvHeroSlider = lazy(() => import("./components/CctvHeroSlider"));

function InitialLoader({ onComplete }) {
  return (
    <motion.div
      aria-hidden="true"
      initial={{ y: "0%" }}
      animate={{ y: "-100%" }}
      transition={{ duration: 0.85, delay: 0.2, ease: [0.76, 0, 0.24, 1] }}
      onAnimationComplete={onComplete}
      className="pointer-events-none fixed inset-0 z-[100] overflow-hidden bg-slate-950"
    >
      <div className="absolute inset-y-0 left-0 w-[18%] bg-sky-400" />
      <div className="absolute inset-y-0 left-[13%] w-[20%] -skew-x-[18deg] bg-blue-600" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_75%_35%,rgba(56,189,248,.35),transparent_25%)]" />
      <div className="absolute inset-0 opacity-20 [background-image:linear-gradient(rgba(255,255,255,.16)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,.16)_1px,transparent_1px)] [background-size:44px_44px]" />
      <div className="absolute inset-0 flex items-center justify-center">
        <img src="/images/squad-logo.png" alt="" className="h-12 w-auto brightness-0 invert sm:h-16" />
      </div>
    </motion.div>
  );
}

export default function App() {
  const [showInitialLoader, setShowInitialLoader] = useState(true);

  return (
    <Router>
      <SmoothScroll>
        <div className="min-h-screen bg-[#F8FAFC] text-[#0F172A] flex flex-col font-sans">
          <Navbar />
          <main className="flex-1 relative z-10 bg-[#F8FAFC]">
            <Suspense fallback={<div className="min-h-[50vh] bg-[#F8FAFC]" />}>
              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/about" element={<About />} />
                <Route path="/services" element={<Services />} />
                <Route path="/projects" element={<Projects />} />
                <Route path="/contact" element={<Contact />} />
                <Route path="/cctv-slider" element={<CctvHeroSlider />} />
              </Routes>
            </Suspense>
          </main>
          {showInitialLoader && <InitialLoader onComplete={() => setShowInitialLoader(false)} />}
          <FloatingContact />
          <Footer />
        </div>
      </SmoothScroll>
    </Router>
  );
}
