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
      <div className="container footer-terminal">
        <span className="eyebrow">
          <span>05 /</span> EOF / end of program
        </span>
        <div className="footer-command">
          <span>$</span> end proxy_perl.pl
        </div>
        <div className="footer-output">
          <span>&gt; 12 profiles loaded</span>
          <span>&gt; one shared story</span>
          <span>&gt; session complete_</span>
        </div>
      </div>
      <div className="footer-camel-track" aria-hidden="true">
        <motion.div
          initial={false}
          animate={{ x: inView && !reduced ? "calc(100vw + 70px)" : 0 }}
          transition={{ duration: 8, ease: easeOut }}
        >
          <PixelCamel
            className="footer-camel"
            walking={inView && !reduced}
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
          <p>Twelve people. A story still unfolding.</p>
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
