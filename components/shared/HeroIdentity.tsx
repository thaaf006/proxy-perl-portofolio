"use client";

import { useEffect, useState } from "react";
import Shuffle from "@/components/Shuffle";
import { useLandingReady } from "./LandingIntro";

const identity = "PROXY\nPERL";

export function HeroIdentity() {
  const ready = useLandingReady();
  const [decode, setDecode] = useState(false);

  useEffect(() => {
    if (!ready) return;

    const reduced = matchMedia("(prefers-reduced-motion: reduce)").matches;
    const timer = window.setTimeout(() => setDecode(true), reduced ? 0 : 260);
    return () => window.clearTimeout(timer);
  }, [ready]);

  return (
    <span className="hero-identity" aria-hidden="true">
      {decode ? (
        <Shuffle
          text={identity}
          tag="span"
          className="hero-identity-shuffle"
          textAlign="left"
          shuffleDirection="left"
          duration={0.42}
          stagger={0.022}
          shuffleTimes={2}
          scrambleCharset=""
          animationMode="evenodd"
          onShuffleComplete={undefined}
          colorFrom={undefined}
          colorTo={undefined}
          triggerOnce
          triggerOnHover={false}
          respectReducedMotion
        />
      ) : (
        <span className="hero-identity-static">{identity}</span>
      )}
      <span className="code-caret" aria-hidden="true">
        _
      </span>
    </span>
  );
}
