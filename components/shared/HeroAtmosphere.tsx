"use client";

import { useEffect, useState } from "react";
import { useTheme } from "next-themes";
import { useReducedMotion } from "motion/react";
import MoltenMetal from "@/components/MoltenMetal";
import { PixelCamel } from "./PixelCamel";

const fragments = [".pl", "$_", "{}", "::"];

export function HeroAtmosphere() {
  const { resolvedTheme } = useTheme();
  const reduced = useReducedMotion();
  const [compact, setCompact] = useState(false);

  useEffect(() => {
    const media = matchMedia("(max-width: 767px)");
    const update = () => setCompact(media.matches);
    update();
    media.addEventListener("change", update);
    return () => media.removeEventListener("change", update);
  }, []);

  const dark = resolvedTheme === "dark";

  return (
    <div className="hero-atmosphere" aria-hidden="true">
      <MoltenMetal
        className="hero-molten"
        color1={dark ? "#05070d" : "#d8dce7"}
        color2={dark ? "#2448c7" : "#4969dc"}
        color3={dark ? "#eef3ff" : "#ffffff"}
        backgroundColor={dark ? "#11131a" : "#f2f1ed"}
        lightMode={!dark}
        speed={reduced ? 0 : compact ? 0.12 : 0.2}
        scale={compact ? 3.2 : 3.8}
        detail={compact ? 2 : 3}
        glow={compact ? 1.05 : 1.3}
        coreSize={0.075}
        swirl={0.78}
        fold={-0.16}
        blackPoint={dark ? 0.1 : 0.07}
        brightness={dark ? 1.08 : 0.92}
        grain={!compact}
        grainIntensity={0.025}
        mouseInteraction={false}
        opacity={dark ? 0.82 : 0.72}
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
        <PixelCamel className="hero-camel" walking={!reduced} label="Distant pixel camel" />
      </div>
    </div>
  );
}
