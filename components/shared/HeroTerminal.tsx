"use client";

import { motion, useReducedMotion } from "motion/react";
import { easeOut } from "@/lib/motion";
import { useLandingReady } from "./LandingIntro";

export function HeroTerminal({ count, name }: { count: number; name: string }) {
  const reduced = useReducedMotion();
  const ready = useLandingReady();
  return (
    <div
      className="hero-terminal"
      data-cursor="terminal"
      data-ready={ready}
      role="img"
      aria-label={`${name}: ${count} members, initialized`}
    >
      <div className="terminal-bar" aria-hidden="true">
        <span>
          <i />
          <i />
          <i />
        </span>
        <span>group.pl</span>
        <span>↗</span>
      </div>
      <div className="terminal-body" aria-hidden="true">
        <p className="terminal-command">
          <span>$</span> perl --group
        </p>
        <p className="terminal-loading">&gt; Loading members...</p>
        <div className="terminal-meter">
          <span>
            <motion.i
              initial={false}
              animate={{ scaleX: !ready ? 0 : reduced ? 1 : [0, 1] }}
              transition={{
                duration: reduced ? 0 : 0.8,
                delay: reduced ? 0 : 0.65,
                ease: easeOut,
              }}
            />
          </span>
          <b>
            {count}/{count}
          </b>
        </div>
        <p className="terminal-result">&gt; {name} initialized.</p>
      </div>
    </div>
  );
}
