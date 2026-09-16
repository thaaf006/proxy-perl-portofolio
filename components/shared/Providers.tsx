"use client";

import { ThemeProvider } from "next-themes";
import { MotionConfig } from "motion/react";
import { CustomCursor } from "./CustomCursor";
import { ScrollProgress } from "./ScrollProgress";

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <ThemeProvider
      attribute="class"
      defaultTheme="light"
      enableSystem={false}
      disableTransitionOnChange
    >
      <MotionConfig reducedMotion="user">
        <ScrollProgress />
        {children}
        <CustomCursor />
      </MotionConfig>
    </ThemeProvider>
  );
}
