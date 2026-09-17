"use client";

import { useEffect, useState } from "react";
import { useReducedMotion } from "motion/react";
import MoltenMetal from "@/components/MoltenMetal";
import { PixelCamel } from "./PixelCamel";

const fragments = [".pl", "$_"];

export function HeroAtmosphere() {
  const reduced = useReducedMotion();
  const [compact, setCompact] = useState(false);

  useEffect(() => {
    const media = matchMedia("(max-width: 767px)");
    const update = () => setCompact(media.matches);
    update();
    media.addEventListener("change", update);
    return () => media.removeEventListener("change", update);
  }, []);

  return (
    <div className="hero-atmosphere" aria-hidden="true">
      <MoltenMetal
        className="hero-molten"
        color1="#05070d"
        color2="#2448c7"
        color3="#eef3ff"
        backgroundColor="#11131a"
        lightMode={false}
        speed={reduced ? 0 : compact ? 0.12 : 0.2}
        scale={compact ? 4.2 : 4.8}
        detail={compact ? 3 : 4}
        glow={compact ? 1.5 : 1.72}
        coreSize={0.11}
        swirl={0.78}
        fold={-0.19}
        blackPoint={0.03}
        brightness={1.24}
        grain={!compact}
        grainIntensity={0.025}
        mouseInteraction={false}
        opacity={0.9}
        maxDpr={compact ? 1 : 1.5}
        motionEnabled={!reduced}
      />
      <div className="hero-metal-scrim" />
      <div className="hero-perl-marks">
        {fragments.map((fragment, index) => (
          <span className={`hero-perl-mark hero-perl-mark-${index}`} key={fragment}>
            {fragment}
          </span>
        ))}
      </div>
      <div className="hero-camel-route">
        <PixelCamel className="hero-camel" state={reduced ? "idle" : "run"} label="Distant pixel camel" />
      </div>
    </div>
  );
}
