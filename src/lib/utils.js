import { clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs) {
  return twMerge(clsx(inputs));
}

export const cardData = [
  {
    id: 1,
    title: "Video Surveillance",
    category: "SMART SECURITY",
    badge: "01 / CCTV",
    description:
      "Clear, reliable camera coverage for your home, business, or facility.",
    color: "rgba(14, 165, 233, 0.8)",
    image: "/images/cctv-surveillance.jpg",
    iconName: "Camera",
    features: [
      "Day & night recording",
      "Mobile live view",
      "Smart motion alerts",
    ],
    link: "/services#surveillance",
  },
  {
    id: 2,
    title: "Network & Wi-Fi",
    category: "CONNECTIVITY",
    badge: "02 / NETWORK",
    description:
      "Fast, stable Wi-Fi and neat network wiring for every room and device.",
    color: "rgba(37, 99, 235, 0.8)",
    image: "/images/network-wifi-installation.jpg",
    iconName: "Network",
    features: [
      "Structured cabling",
      "Strong Wi-Fi coverage",
      "CCTV-ready network",
    ],
    link: "/services#network",
  },
  {
    id: 3,
    title: "Smart Automation",
    category: "SMART LIVING",
    badge: "03 / AUTOMATION",
    description:
      "Simple control for gates, locks, lights, and entry from one place.",
    color: "rgba(251, 184, 2, 0.8)",
    image: "/images/smart-gate-automation.jpg",
    iconName: "Cpu",
    features: [
      "Automatic gates",
      "Smart locks & door phones",
      "App and remote control",
    ],
    link: "/services#automation",
  },
  {
    id: 4,
    title: "Access Control",
    category: "FACILITY SECURITY",
    badge: "04 / ACCESS",
    description:
      "Easy, controlled entry for people, visitors, and vehicles.",
    color: "rgba(168, 85, 247, 0.8)",
    image: "/images/access-control.jpg",
    iconName: "ShieldCheck",
    features: [
      "Smart card and biometric entry",
      "Visitor access control",
      "Barrier and gate integration",
    ],
    link: "/services",
  },
];
