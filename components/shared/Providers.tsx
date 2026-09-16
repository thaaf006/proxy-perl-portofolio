"use client";

import { ThemeProvider } from "next-themes";
import { MotionConfig } from "motion/react";
import { ScrollProgress } from "./ScrollProgress";
import { LandingIntro } from "./LandingIntro";
import { SplashCursorLayer } from "./SplashCursorLayer";

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <ThemeProvider
      attribute="class"
      defaultTheme="light"
      enableSystem={false}
      disableTransitionOnChange
    >
      <MotionConfig reducedMotion="user">
        <LandingIntro>
          <ScrollProgress />
          {children}
          <SplashCursorLayer />
        </LandingIntro>
      </MotionConfig>
    </ThemeProvider>
  );
}
