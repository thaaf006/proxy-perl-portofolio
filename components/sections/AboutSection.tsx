"use client";

import { useRef } from "react";
import { motion, useReducedMotion } from "motion/react";
import { AnimatedStat } from "@/components/shared/AnimatedStat";
import { members } from "@/data/members";

export function AboutSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const reduced = useReducedMotion();
  const stats = [
    [members.filter((member) => member.role === "Leader").length, "Leader"],
    [members.filter((member) => member.role === "PJK").length, "PJK"],
    [members.filter((member) => member.role === "Member").length, "Members"],
    [members.length, "People"],
  ] as const;

  return (
    <section ref={sectionRef} id="about" className="about-section section">
      <div className="container about-editorial">
        <p className="eyebrow"><span>02 /</span> About</p>
        <motion.div
          className="about-rule"
          initial={reduced ? false : { scaleX: 0 }}
          whileInView={{ scaleX: 1 }}
          viewport={{ once: true, amount: 0.6 }}
          transition={{ duration: reduced ? 0 : 0.7, ease: [0.22, 1, 0.36, 1] }}
        />
        <dl className="about-numbers">
          {stats.map(([value, label]) => (
            <div key={label}>
              <dd><AnimatedStat value={value} /></dd>
              <dt>{label}</dt>
            </div>
          ))}
        </dl>
      </div>
    </section>
  );
}
