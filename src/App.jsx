import React, { lazy, Suspense } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
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

export default function App() {
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
          <FloatingContact />
          <Footer />
        </div>
      </SmoothScroll>
    </Router>
  );
}
