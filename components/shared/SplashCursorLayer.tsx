"use client";

import { useEffect, useState } from "react";
import SplashCursor from "@/components/SplashCursor";

const desktopPointer =
  "(min-width: 1024px) and (hover: hover) and (pointer: fine) and (prefers-reduced-motion: no-preference)";

export function SplashCursorLayer() {
  const [enabled, setEnabled] = useState(false);

  useEffect(() => {
    const media = matchMedia(desktopPointer);
    const update = () => setEnabled(media.matches);
    update();
    media.addEventListener("change", update);
    return () => media.removeEventListener("change", update);
  }, []);

  if (!enabled) return null;

  return (
    <SplashCursor
      SIM_RESOLUTION={96}
      DYE_RESOLUTION={768}
      CAPTURE_RESOLUTION={256}
      DENSITY_DISSIPATION={2.8}
      VELOCITY_DISSIPATION={2.4}
      PRESSURE={0.08}
      PRESSURE_ITERATIONS={14}
      CURL={2.2}
      SPLAT_RADIUS={0.11}
      SPLAT_FORCE={2600}
      SHADING
      COLOR_UPDATE_SPEED={4}
      TRANSPARENT
      RAINBOW_MODE={false}
      COLOR="#4169e1"
    />
  );
}
