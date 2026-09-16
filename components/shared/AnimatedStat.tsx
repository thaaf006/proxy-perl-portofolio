"use client";

import { useEffect, useRef } from "react";
import {
  animate,
  motion,
  useInView,
  useMotionValue,
  useReducedMotion,
  useTransform,
} from "motion/react";

export function AnimatedStat({ value }: { value: number }) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, amount: 0.8 });
  const reduced = useReducedMotion();
  const count = useMotionValue(reduced ? value : 0);
  const display = useTransform(count, (latest) =>
    String(Math.round(latest)).padStart(2, "0"),
  );

  useEffect(() => {
    if (!inView) return;
    if (reduced) {
      count.set(value);
      return;
    }
    const controls = animate(count, value, { duration: 0.65, ease: "easeOut" });
    return () => controls.stop();
  }, [count, inView, reduced, value]);

  return <motion.span ref={ref}>{display}</motion.span>;
}
