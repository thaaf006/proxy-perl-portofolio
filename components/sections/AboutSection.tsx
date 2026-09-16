"use client";

import { useRef } from "react";
import { motion, useReducedMotion, useScroll, useTransform } from "motion/react";
import { Reveal } from "@/components/shared/Reveal";
import { AnimatedStat } from "@/components/shared/AnimatedStat";
import { group } from "@/data/group";
import { members } from "@/data/members";

export function AboutSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const reduced = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: sectionRef, offset: ["start end", "end start"] });
  const signatureY = useTransform(scrollYProgress, [0, 1], reduced ? [0, 0] : [-6, 8]);
  const stats = [
    [members.filter((member) => member.role === "Leader").length, "Leader"],
    [members.filter((member) => member.role === "PJK").length, "PJK"],
    [members.filter((member) => member.role === "Member").length, "Members"],
    [members.length, "People"],
  ] as const;

  return (
    <section ref={sectionRef} id="about" className="about-section section">
      <motion.span className="about-signature" style={{ y: signatureY }} aria-hidden="true">[p]</motion.span>
      <div className="container about-editorial">
        <p className="eyebrow"><span>02 /</span> About</p>
        <div className="about-manifesto">
          <Reveal className="about-manifesto-heading">
            <span className="technical-label">Group manifesto</span>
            <h2>12 PEOPLE,<br />ONE PROXY.</h2>
          </Reveal>
          <Reveal className="about-copy" delay={0.08}>
            <p>{group.about}</p>
            <p>{group.aboutNote}</p>
          </Reveal>
        </div>
        <motion.div
          className="about-rule"
          initial={reduced ? false : { scaleX: 0 }}
          whileInView={{ scaleX: 1 }}
          viewport={{ once: true, amount: 0.6 }}
          transition={{ duration: reduced ? 0 : 0.7, ease: [0.22, 1, 0.36, 1] }}
        />
        <div className="about-numbers-label technical-label">By the numbers</div>
        <dl className="about-numbers">
          {stats.map(([value, label]) => (
            <div key={label}>
              <dd><AnimatedStat value={value} /></dd>
              <dt>{label}</dt>
            </div>
          ))}
        </dl>
        <p className="about-tagline">{group.tagline}</p>
      </div>
    </section>
  );
}
