"use client";

import { useEffect } from "react";
import { useAnimate, useReducedMotion } from "motion/react";
import { easeOut } from "@/lib/motion";
import { useLandingReady } from "./LandingIntro";

export function HeroEntrance({ children }: { children: React.ReactNode }) {
  const [scope, animate] = useAnimate<HTMLDivElement>();
  const reduced = useReducedMotion();
  const ready = useLandingReady();
  useEffect(() => {
    if (!ready || reduced !== false) return;
    const items = Array.from(
      scope.current.querySelectorAll<HTMLElement>("[data-enter]"),
    );
    const animations = items.map((element, index) =>
      animate(
        element,
        {
          opacity: [0, 1],
          y: [element.dataset.enter === "line" ? 65 : 15, 0],
        },
        { duration: 0.65, delay: index * 0.075, ease: easeOut },
      ),
    );
    return () => animations.forEach((animation) => animation.stop());
  }, [animate, reduced, scope, ready]);
  return (
    <div ref={scope} className="hero-stage" data-ready={ready}>
      {children}
    </div>
  );
}
