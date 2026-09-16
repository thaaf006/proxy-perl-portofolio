"use client";

import { useEffect, useRef, useState } from "react";
import {
  motion,
  useMotionValue,
  useSpring,
  useScroll,
  useTransform,
  useReducedMotion,
} from "motion/react";

export function HeroAtmosphere() {
  const root = useRef<HTMLDivElement>(null);
  const x = useMotionValue(-500);
  const y = useMotionValue(-500);
  const smoothX = useSpring(x, { stiffness: 85, damping: 25 });
  const smoothY = useSpring(y, { stiffness: 85, damping: 25 });
  const reduced = useReducedMotion();
  const [inView, setInView] = useState(true);
  const { scrollY } = useScroll();
  const depth = useTransform(scrollY, [0, 900], [0, -26]);

  useEffect(() => {
    const hero = root.current?.closest("section");
    if (!hero) return;
    const media = matchMedia(
      "(min-width: 1024px) and (hover: hover) and (pointer: fine) and (prefers-reduced-motion: no-preference)",
    );
    const hide = () => root.current?.removeAttribute("data-spotlight");
    const move = (event: PointerEvent) => {
      if (!media.matches || event.pointerType !== "mouse") {
        hide();
        return;
      }
      const bounds = hero.getBoundingClientRect();
      x.set(event.clientX - bounds.left);
      y.set(event.clientY - bounds.top);
      root.current?.setAttribute("data-spotlight", "");
    };
    const observer = new IntersectionObserver(([entry]) =>
      setInView(entry.isIntersecting),
    );
    observer.observe(hero);
    hero.addEventListener("pointermove", move, { passive: true });
    hero.addEventListener("pointerleave", hide);
    media.addEventListener("change", hide);
    return () => {
      observer.disconnect();
      hero.removeEventListener("pointermove", move);
      hero.removeEventListener("pointerleave", hide);
      media.removeEventListener("change", hide);
    };
  }, [x, y]);

  return (
    <div
      ref={root}
      className="hero-atmosphere"
      aria-hidden="true"
      data-paused={!inView}
    >
      <motion.div className="hero-depth" style={{ y: reduced ? 0 : depth }}>
        <div className="ambient-grid" />
        <div className="ambient-shape ambient-blue" />
        <div className="ambient-shape ambient-purple" />
        <div className="code-fragments">
          {["{ }", "::", ".pm", "</>", "$", "[]"].map((text, index) => (
            <span className={`fragment fragment-${index}`} key={text}>
              {text}
            </span>
          ))}
        </div>
      </motion.div>
      <motion.div
        className="hero-spotlight"
        style={{ x: smoothX, y: smoothY }}
      />
    </div>
  );
}
