import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export interface ServiceCardItem {
  id: number;
  title: string;
  category: string;
  badge: string;
  description: string;
  color: string;
  iconName: string;
  features: string[];
  link: string;
}

export const cardData: ServiceCardItem[] = [
  {
    id: 1,
    title: "Video Surveillance Solutions",
    category: "CORE DEFENSE",
    badge: "01 / ULTRA HD SURVEILLANCE",
    description:
      "Enterprise IP and 4K optical surveillance engineering with motorized varifocal zoom, DarkFighter low-light sensors, and AI-driven human/vehicle perimeter detection.",
    color: "rgba(14, 165, 233, 0.8)", // Electric Cyan/Sky
    iconName: "Camera",
    features: [
      "4K Motorized Optical Zoom",
      "AI Human & Vehicle Classification",
      "DarkFighter Ultra Low-Light Sensors",
      "Cloud NVR & Remote Mobile App Telemetry",
    ],
    link: "/services#surveillance",
  },
  {
    id: 2,
    title: "Network & IT Infrastructure",
    category: "CONNECTIVITY",
    badge: "02 / ENTERPRISE BACKBONE",
    description:
      "Structured Cat6/fiber-optic network design, multi-gigabit PoE backbone switching, and zero-dead-zone managed roaming WiFi mesh for modern residences and industrial campuses.",
    color: "rgba(37, 99, 235, 0.8)", // Squad Royal Blue
    iconName: "Network",
    features: [
      "Structured Cat6 & Fiber Splicing",
      "Enterprise Multi-Gigabit PoE Switching",
      "Seamless High-Density Wi-Fi 6/7 Mesh",
      "Industrial Firewall & Unified Gateways",
    ],
    link: "/services#network",
  },
  {
    id: 3,
    title: "Intelligent Automation Systems",
    category: "SMART LIVING",
    badge: "03 / AUTONOMOUS CONTROL",
    description:
      "Heavy-duty motorized sliding and swing gates, synchronized multi-zone climate and lighting scenes, and biometric smart lock integration engineered for effortless peace of mind.",
    color: "rgba(251, 184, 2, 0.8)", // Squad Golden Yellow
    iconName: "Cpu",
    features: [
      "Heavy-Duty Motorized Gate Motors",
      "AI Safety Photocells & Obstacle Detection",
      "Biometric Smart Locks & Video Door Phones",
      "Multi-Zone Touch Switching & App Automation",
    ],
    link: "/services#automation",
  },
  {
    id: 4,
    title: "Perimeter Defense & Access Control",
    category: "FACILITY SHIELD",
    badge: "04 / ACCESS TELEMETRY",
    description:
      "Sub-second biometric facial recognition terminals, automated boom barriers, encrypted keypad locks, and synchronized security auditing protecting every perimeter.",
    color: "rgba(168, 85, 247, 0.8)", // Electric Purple
    iconName: "ShieldCheck",
    features: [
      "Sub-Second Biometric Palm & Face ID",
      "RFID & Encrypted Touch Keypads",
      "Automated Vehicle Boom Barriers",
      "Centralized Visitor Logging & AMC Support",
    ],
    link: "/services",
  },
];
