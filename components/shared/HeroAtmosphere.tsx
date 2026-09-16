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
import { PixelCamel } from "./PixelCamel";

export function HeroAtmosphere() {
  const root = useRef<HTMLDivElement>(null);
  const x = useMotionValue(-500);
  const y = useMotionValue(-500);
  const smoothX = useSpring(x, { stiffness: 85, damping: 25 });
  const smoothY = useSpring(y, { stiffness: 85, damping: 25 });
  const reactX = useMotionValue(0);
  const reactY = useMotionValue(0);
  const decorX = useSpring(reactX, { stiffness: 55, damping: 22 });
  const decorY = useSpring(reactY, { stiffness: 55, damping: 22 });
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
      reactX.set(((event.clientX - bounds.left) / bounds.width - 0.5) * 14);
      reactY.set(((event.clientY - bounds.top) / bounds.height - 0.5) * 10);
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
  }, [reactX, reactY, x, y]);

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
        <motion.div className="code-fragments" style={{ x: decorX, y: decorY }}>
          {["{ }", "::", ".pm", "</>", "$", "[]"].map((text, index) => (
            <span className={`fragment fragment-${index}`} key={text}>
              {text}
            </span>
          ))}
        </motion.div>
        <svg
          className="digital-landscape"
          viewBox="0 0 1200 260"
          preserveAspectRatio="none"
        >
          <path
            className="landscape-horizon"
            d="M0 190H150v-15h120v12h155v-36h95v21h160v-49h100v34h150v-18h120v51h150"
          />
          <path
            className="landscape-step"
            d="M0 231h185v-10h110v-14h160v9h92v-20h145v13h118v-31h170v17h220"
          />
          {[70, 270, 520, 780, 980, 1130].map((cx, index) => (
            <circle
              key={cx}
              cx={cx}
              cy={[190, 187, 172, 157, 139, 190][index]}
              r="3"
            />
          ))}
        </svg>
        <motion.div
          className="perl-constellation"
          style={{ x: decorX, y: decorY }}
        >
          <svg viewBox="0 0 360 230">
            <path d="M25 165L95 90L165 126L225 42L320 82M95 90L120 195L265 178L320 82M165 126L265 178" />
            <circle className="perl-signal" r="3" />
          </svg>
          {[
            [".pl", 7, 68],
            [".pm", 25, 32],
            ["$_", 45, 48],
            ["::", 63, 12],
            ["@", 88, 29],
            ["%", 72, 76],
            ["PERL", 31, 84],
          ].map(([label, left, top], index) => (
            <span
              key={String(label)}
              className={`constellation-node node-${index}`}
              style={{ left: `${left}%`, top: `${top}%` }}
            >
              <i />
              {label}
            </span>
          ))}
        </motion.div>
        <div className="hero-camel-route">
          <PixelCamel
            className="hero-camel"
            walking
            label="Distant pixel camel"
          />
        </div>
      </motion.div>
      <motion.div
        className="hero-spotlight"
        style={{ x: smoothX, y: smoothY }}
      />
    </div>
  );
}
