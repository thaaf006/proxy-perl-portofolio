"use client";

import { MotionConfig } from "motion/react";
import { ScrollProgress } from "./ScrollProgress";
import { LandingIntro } from "./LandingIntro";
import { SplashCursorLayer } from "./SplashCursorLayer";

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <MotionConfig reducedMotion="user">
      <LandingIntro>
        <ScrollProgress />
        {children}
        <SplashCursorLayer />
      </LandingIntro>
    </MotionConfig>
  );
}
