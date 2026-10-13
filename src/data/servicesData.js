export const cctvBrands = ["HIKVISION", "PRAMA", "CP PLUS", "TP-LINK", "TVT", "DAHUA", "PANASONIC", "BOSCH", "HIFOCUS", "SPARSH"];

export const companyServices = [
  {
    id: "surveillance", number: "01", title: "CCTV & Video Surveillance", badge: "See what matters", iconName: "Camera",
    description: "Keep an eye on your home or business, day and night. We install clear cameras with secure recording and easy viewing on your phone.",
    image: "/images/cctv-surveillance.jpg", imageAlt: "CCTV camera installed for building security", brands: cctvBrands,
    items: ["Indoor and outdoor CCTV cameras", "Clear day and night recording", "Mobile phone live view", "DVR, NVR and storage setup", "Smart motion alerts", "Upgrades, repairs and AMC support"],
  },
  {
    id: "network", number: "02", title: "Network & Wi-Fi Setup", badge: "Stay connected", iconName: "Network",
    description: "A good security system needs a strong network. We build neat, reliable Wi-Fi and cable networks for homes, offices, shops, and larger buildings.",
    image: "/images/network-wifi-installation.jpg", imageAlt: "Professional network and Wi-Fi installation",
    items: ["Structured network cabling", "Home and office Wi-Fi", "Routers, switches and network racks", "Fiber optic connections", "PoE setup for CCTV cameras", "Network repair and expansion"],
  },
  {
    id: "automation", number: "03", title: "Smart Gates & Automation", badge: "Make life easier", iconName: "Cpu",
    description: "Control gates, doors, lights, and access from simple remotes, wall switches, or your phone. We make your space safer and easier to use.",
    image: "/images/smart-gate-automation.jpg", imageAlt: "Modern automatic gate at a smart home entrance",
    items: ["Sliding and swing gate motors", "Video door phones", "Smart locks and access control", "Remote and mobile app control", "Smart lights and switches", "Safety sensors and maintenance"],
  },
  {
    id: "solar", number: "04", title: "Solar Power Solutions", badge: "Save with sunlight", iconName: "Sun",
    description: "Use clean solar power for your home or business. We help you choose the right system and install it safely for reliable everyday savings.",
    image: "/images/solar-solutions.jpg", imageAlt: "Solar panels installed on a modern home roof",
    items: ["Home and business solar systems", "Rooftop solar panel installation", "Inverter and battery setup", "System size planning", "Neat wiring and safety checks", "Solar service and maintenance"],
  },
];
