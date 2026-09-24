"use client";

import { createContext, useContext, useEffect, useState } from "react";
import { motion } from "motion/react";
import { group } from "@/data/group";
import { members } from "@/data/members";
import { easeOut } from "@/lib/motion";
import { PixelCamel } from "./PixelCamel";

const ReadyContext = createContext(true);
const sessionKey = "proxy-perl-intro-seen";
export const useLandingReady = () => useContext(ReadyContext);

function statusFor(progress: number) {
  if (progress >= 100) return "READY";
  if (progress >= 65) return "LOADING MEMORIES";
  if (progress >= 30) return "LOADING MEMBERS";
  return "LOADING IDENTITY";
}

export function LandingIntro({ children }: { children: React.ReactNode }) {
  const [phase, setPhase] = useState<"intro" | "exit" | "ready">("intro");
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const skip = document.documentElement.dataset.intro === "skip";
    if (skip) {
      const frame = requestAnimationFrame(() => {
        setPhase("ready");
        setProgress(100);
      });
      return () => cancelAnimationFrame(frame);
    }

    const compact = matchMedia("(max-width: 767px)").matches;
    const duration = compact ? 1.55 : 1.85;
    const timers: ReturnType<typeof setTimeout>[] = [];
    let finished = false;

    try {
      sessionStorage.setItem(sessionKey, "1");
    } catch {
      /* The intro still completes when storage is unavailable. */
    }

    let progressFrame = 0;
    const startedAt = performance.now();
    const tickProgress = (now: number) => {
      const latest = Math.min(100, ((now - startedAt) / (duration * 1000)) * 100);
      setProgress(Math.round(latest));
      if (latest < 100 && !finished) progressFrame = requestAnimationFrame(tickProgress);
    };

    const finish = () => {
      if (finished) return;
      finished = true;
      cancelAnimationFrame(progressFrame);
      timers.forEach(clearTimeout);
      setProgress(100);
      setPhase("ready");
      document.documentElement.dataset.intro = "skip";
      window.removeEventListener("keydown", finish);
      window.removeEventListener("pointerdown", finish);
    };

    progressFrame = requestAnimationFrame(tickProgress);
    timers.push(setTimeout(() => setPhase("exit"), duration * 1000 + 160));
    timers.push(setTimeout(finish, duration * 1000 + 540));
    // Never leave the splash screen blocking the app if hydration is delayed.
    timers.push(setTimeout(finish, 3500));
    window.addEventListener("keydown", finish);
    window.addEventListener("pointerdown", finish);

    return () => {
      finished = true;
      cancelAnimationFrame(progressFrame);
      timers.forEach(clearTimeout);
      window.removeEventListener("keydown", finish);
      window.removeEventListener("pointerdown", finish);
    };
  }, []);

  const visible = phase !== "ready";
  const camelOffset = Math.round((progress / 100) * 64);

  return (
    <ReadyContext.Provider value={phase === "exit" || phase === "ready"}>
      {children}
      {visible && (
        <motion.div
          className="landing-intro"
          role="status"
          aria-live="polite"
          aria-label={`${statusFor(progress)}, ${progress} percent`}
          initial={false}
          animate={{ y: phase === "exit" ? "-100%" : "0%" }}
          transition={{ duration: 0.38, ease: easeOut }}
        >
          <div className="intro-frame">
            <p className="intro-brand">{group.name}</p>
            <div className="intro-status-block">
              <span>INITIALIZING</span>
              <strong>{statusFor(progress)}</strong>
            </div>
            <div className="intro-progress-scene" aria-hidden="true">
              <span className="intro-track-label">00</span>
              <div className="intro-track">
                <span className="intro-track-fill" style={{ width: `${progress}%` }} />
                <span
                  className="intro-camel-runner"
                  style={{ left: `calc(${progress}% - ${camelOffset}px)` }}
                >
                  <PixelCamel
                    className="intro-camel"
                    state={progress >= 100 ? "idle" : "run"}
                    label=""
                  />
                </span>
              </div>
              <span className="intro-track-label">100</span>
            </div>
            <p className="intro-percent">{String(progress).padStart(2, "0")}%</p>
            <p className="intro-signoff">{members.length} PEOPLE / ONE PROXY</p>
          </div>
          <span className="intro-skip">PRESS ANY KEY OR TAP TO SKIP</span>
        </motion.div>
      )}
    </ReadyContext.Provider>
  );
}
