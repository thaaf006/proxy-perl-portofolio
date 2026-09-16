"use client";

import { useEffect, useRef } from "react";
import { motion, useMotionValue, useSpring } from "motion/react";

export function CustomCursor() {
  const root = useRef<HTMLDivElement>(null);
  const x = useMotionValue(-100);
  const y = useMotionValue(-100);
  const ringX = useSpring(x, { stiffness: 450, damping: 38, mass: 0.45 });
  const ringY = useSpring(y, { stiffness: 450, damping: 38, mass: 0.45 });

  useEffect(() => {
    const media = matchMedia(
      "(min-width: 1024px) and (hover: hover) and (pointer: fine) and (prefers-reduced-motion: no-preference)",
    );
    let visible = false;
    const hide = () => {
      visible = false;
      root.current?.removeAttribute("data-visible");
      document.documentElement.removeAttribute("data-custom-cursor");
    };
    const move = (event: PointerEvent) => {
      if (!media.matches || event.pointerType !== "mouse") {
        hide();
        return;
      }
      const target = event.target instanceof Element ? event.target : null;
      if (target?.closest(".landing-intro")) {
        hide();
        return;
      }
      const interactive = target?.closest(
        "a,button,[role=button],[data-cursor=terminal]",
      );
      if (
        (!interactive && target?.closest("p,h1,h2,h3,dt,dd,pre")) ||
        target?.closest("input,textarea,[contenteditable=true]")
      ) {
        hide();
        return;
      }
      if (!visible) {
        ringX.jump(event.clientX);
        ringY.jump(event.clientY);
      }
      x.set(event.clientX);
      y.set(event.clientY);
      visible = true;
      root.current?.setAttribute("data-visible", "");
      root.current?.setAttribute(
        "data-mode",
        target?.closest("[data-cursor=view]")
          ? "view"
          : interactive
            ? "interactive"
            : "normal",
      );
      document.documentElement.setAttribute("data-custom-cursor", "");
    };
    const key = (event: KeyboardEvent) => {
      if (event.key === "Tab") hide();
    };
    document.addEventListener("pointermove", move, { passive: true });
    document.addEventListener("pointerleave", hide);
    document.addEventListener("pointerdown", hide);
    document.addEventListener("keydown", key);
    window.addEventListener("blur", hide);
    window.addEventListener("scroll", hide, { passive: true });
    media.addEventListener("change", hide);
    return () => {
      hide();
      document.removeEventListener("pointermove", move);
      document.removeEventListener("pointerleave", hide);
      document.removeEventListener("pointerdown", hide);
      document.removeEventListener("keydown", key);
      window.removeEventListener("blur", hide);
      window.removeEventListener("scroll", hide);
      media.removeEventListener("change", hide);
    };
  }, [x, y, ringX, ringY]);

  return (
    <div ref={root} className="custom-cursor" aria-hidden="true">
      <motion.div className="cursor-dot" style={{ x, y }}>
        <i />
      </motion.div>
      <motion.div className="cursor-follower" style={{ x: ringX, y: ringY }}>
        <span className="cursor-ring">
          <span>VIEW ↗</span>
        </span>
      </motion.div>
    </div>
  );
}
