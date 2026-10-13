import React from "react";
import { CinematicFooter } from "@/components/ui/motion-footer";

export default function Footer() {
  return (
    <CinematicFooter
      brandText="SQUAD"
      headingText="Ready to secure your space?"
      marqueeItems={[
        "Video Surveillance Solutions",
        "Network & IT Infrastructure",
        "Gate & Shutter Automation",
        "Biometric Access Systems",
        "Annual Maintenance Contracts",
      ]}
      secondaryLinks={[
        { label: "Surveillance", href: "/services#surveillance" },
        { label: "Automation", href: "/services#automation" },
        { label: "Network & IT", href: "/services#network" },
        { label: "About Us", href: "/about" },
        { label: "Projects", href: "/projects" },
        { label: "Contact", href: "/contact" },
      ]}
      copyrightText="© 2026 Squad Security System. All rights reserved."
      craftedBy="Squad Security"
    />
  );
}
