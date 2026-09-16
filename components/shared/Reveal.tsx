"use client";
import { motion, useReducedMotion } from "motion/react";
import { easeOut, revealDuration } from "@/lib/motion";

export function Reveal({
  children,
  className,
  delay = 0,
}: {
  children: React.ReactNode;
  className?: string;
  delay?: number;
}) {
  const reduced = useReducedMotion();
  return (
    <motion.div
      className={className}
      initial={false}
      whileInView={{
        opacity: reduced ? 1 : [0.35, 1],
        y: reduced ? 0 : [24, 0],
      }}
      viewport={{ once: true, amount: 0.08 }}
      transition={{
        duration: reduced ? 0 : revealDuration,
        delay: reduced ? 0 : delay,
        ease: easeOut,
      }}
    >
      {children}
    </motion.div>
  );
}
