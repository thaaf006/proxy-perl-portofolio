"use client";

import { useRef } from "react";
import { ArrowUpRight } from "lucide-react";
import { motion, useInView, useReducedMotion } from "motion/react";
import { group } from "@/data/group";
import { PixelCamel } from "@/components/shared/PixelCamel";
import { easeOut } from "@/lib/motion";
export function Footer() {
  const ref = useRef<HTMLElement>(null);
  const inView = useInView(ref, { once: true, amount: 0.4 });
  const reduced = useReducedMotion();
  return (
    <footer ref={ref} className="footer-system">
      <div className="container footer-signoff">
        <a className="footer-wordmark" href="#home">
          PROXY / PERL
        </a>
        <p>
          12 people.
          <br />
          One shared story.
        </p>
        <span>EOF_</span>
      </div>
      <div className="footer-camel-track" aria-hidden="true">
        <motion.div
          initial={false}
          animate={{ x: inView && !reduced ? "calc(100vw + 70px)" : 0 }}
          transition={{ duration: 8, ease: easeOut }}
        >
          <PixelCamel
            className="footer-camel"
            state={inView && !reduced ? "run" : "idle"}
            label=""
          />
        </motion.div>
      </div>
      <div className="container footer">
        <div>
          <a className="brand" href="#home">
            {group.name}
            <span className="brand-period">/</span>
          </a>
        </div>
        <span>
          © {new Date().getFullYear()} {group.name}
        </span>
        <a className="back-top" href="#home">
          Back to top <ArrowUpRight size={16} />
        </a>
      </div>
    </footer>
  );
}
