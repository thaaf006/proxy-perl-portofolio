"use client";

import { createContext, useContext, useEffect, useState } from "react";
import { createPortal } from "react-dom";
import { motion } from "motion/react";
import { group } from "@/data/group";
import { members } from "@/data/members";
import { easeOut } from "@/lib/motion";
import { PixelCamel } from "./PixelCamel";

const ReadyContext = createContext(true);
const sessionKey = "proxy-perl-intro-seen";
export const useLandingReady = () => useContext(ReadyContext);

export function LandingIntro({ children }: { children: React.ReactNode }) {
  const [phase, setPhase] = useState<"checking" | "intro" | "exit" | "ready">(
    "checking",
  );
  const [mobile, setMobile] = useState(false);
  useEffect(() => {
    const reduced = matchMedia("(prefers-reduced-motion: reduce)");
    const compact = matchMedia("(max-width: 767px)").matches;
    let seen = false;
    try {
      seen = sessionStorage.getItem(sessionKey) === "1";
    } catch {
      /* Storage can be unavailable in private contexts. */
    }
    const skip =
      seen || reduced.matches || Boolean(location.hash) || window.scrollY > 80;
    const timers: ReturnType<typeof setTimeout>[] = [];
    const remember = () => {
      try {
        sessionStorage.setItem(sessionKey, "1");
      } catch {
        /* The intro still completes without storage. */
      }
    };
    const finish = () => {
      timers.forEach(clearTimeout);
      window.removeEventListener("keydown", finish);
      window.removeEventListener("pointerdown", finish);
      reduced.removeEventListener("change", finish);
      remember();
      setPhase("ready");
    };
    timers.push(
      setTimeout(() => {
        setMobile(compact);
        if (skip) finish();
        else setPhase("intro");
        remember();
      }, 0),
    );
    if (!skip) {
      timers.push(setTimeout(() => setPhase("exit"), compact ? 1100 : 1550));
      timers.push(setTimeout(finish, compact ? 1500 : 2000));
    }
    window.addEventListener("keydown", finish);
    window.addEventListener("pointerdown", finish);
    reduced.addEventListener("change", finish);
    return () => {
      timers.forEach(clearTimeout);
      window.removeEventListener("keydown", finish);
      window.removeEventListener("pointerdown", finish);
      reduced.removeEventListener("change", finish);
    };
  }, []);

  const visible = phase === "intro" || phase === "exit";
  return (
    <ReadyContext.Provider value={phase === "exit" || phase === "ready"}>
      {children}
      {visible &&
        createPortal(
          <motion.div
            className="landing-intro"
            aria-hidden="true"
            initial={false}
            animate={{ y: phase === "exit" ? "-100%" : "0%" }}
            transition={{ duration: mobile ? 0.4 : 0.45, ease: easeOut }}
          >
            <div className="intro-frame">
              <span className="intro-index">BOOT SEQUENCE / 001</span>
              <div className="intro-brand">
                {group.name.replace(" ", " / ")}
              </div>
              <p className="intro-command">$ initializing proxy_perl...</p>
              <div className="intro-progress-scene">
                <motion.div
                  className="intro-camel-runner"
                  initial={{ left: "0%" }}
                  animate={{ left: ["0%", "35%", "70%", "calc(100% - 44px)"] }}
                  transition={{
                    duration: mobile ? 0.8 : 1.15,
                    times: [0, 0.22, 0.7, 1],
                    ease: "easeInOut",
                  }}
                >
                  <PixelCamel
                    className="intro-camel"
                    walking={phase === "intro"}
                  />
                </motion.div>
              </div>
              <div className="intro-progress">
                <motion.span
                  initial={{ scaleX: 0 }}
                  animate={{ scaleX: [0, 0.35, 0.7, 1] }}
                  transition={{
                    duration: mobile ? 0.8 : 1.15,
                    times: [0, 0.22, 0.7, 1],
                    ease: "easeInOut",
                  }}
                />
              </div>
              <div className="intro-log">
                {[
                  `${members.length} profiles detected`,
                  "gallery mounted",
                  "interface ready",
                ].map((line, index) => (
                  <motion.p
                    key={line}
                    initial={{ opacity: 0, y: 5 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{
                      delay:
                        index === 2
                          ? mobile
                            ? 0.82
                            : 1.16
                          : (mobile ? 0.18 : 0.3) * (index + 1),
                      duration: 0.2,
                    }}
                  >
                    <span>0{index + 1}</span>
                    {line}
                    <span>✓</span>
                  </motion.p>
                ))}
              </div>
              <motion.p
                className="intro-welcome"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: mobile ? 0.98 : 1.36, duration: 0.15 }}
              >
                &gt; welcome_
              </motion.p>
            </div>
            <span className="intro-skip">
              BRAND INTRO · PRESS ANY KEY OR CLICK TO SKIP
            </span>
          </motion.div>,
          document.body,
        )}
    </ReadyContext.Provider>
  );
}
