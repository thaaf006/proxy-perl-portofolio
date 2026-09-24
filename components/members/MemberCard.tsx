"use client";
import { Dialog } from "@base-ui/react/dialog";
import { ArrowUpRight } from "lucide-react";
import type { Member } from "@/data/members";
import { Photo } from "@/components/shared/Photo";
import { MemberDetail } from "./MemberDetail";
import { motion, useReducedMotion } from "motion/react";
import { Reveal } from "@/components/shared/Reveal";
import { easeOut } from "@/lib/motion";
function InstagramIcon() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <path d="M7.05 2h9.9A5.05 5.05 0 0 1 22 7.05v9.9A5.05 5.05 0 0 1 16.95 22h-9.9A5.05 5.05 0 0 1 2 16.95v-9.9A5.05 5.05 0 0 1 7.05 2Zm0 2A3.05 3.05 0 0 0 4 7.05v9.9A3.05 3.05 0 0 0 7.05 20h9.9A3.05 3.05 0 0 0 20 16.95v-9.9A3.05 3.05 0 0 0 16.95 4h-9.9ZM12 7a5 5 0 1 1 0 10 5 5 0 0 1 0-10Zm0 2a3 3 0 1 0 0 6 3 3 0 0 0 0-6Zm5.25-3.25a1.25 1.25 0 1 1 0 2.5 1.25 1.25 0 0 1 0-2.5Z" fill="currentColor"/>
    </svg>
  );
}

function GithubIcon() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <path d="M12 2a10 10 0 0 0-3.16 19.49c.5.09.68-.22.68-.48v-1.7c-2.78.61-3.37-1.18-3.37-1.18-.46-1.16-1.11-1.47-1.11-1.47-.91-.62.07-.61.07-.61 1.01.07 1.54 1.04 1.54 1.04.9 1.54 2.36 1.1 2.94.84.09-.65.35-1.1.64-1.36-2.22-.25-4.55-1.11-4.55-4.94 0-1.09.39-1.98 1.03-2.68-.1-.25-.45-1.27.1-2.64 0 0 .84-.27 2.75 1.02A9.55 9.55 0 0 1 12 7.87c.85 0 1.7.12 2.49.36 1.91-1.29 2.75-1.02 2.75-1.02.55 1.37.2 2.39.1 2.64.64.7 1.03 1.59 1.03 2.68 0 3.84-2.34 4.69-4.57 4.94.36.31.68.92.68 1.85v2.73c0 .27.18.58.69.48A10 10 0 0 0 12 2Z" fill="currentColor"/>
    </svg>
  );
}

export function MemberCard({
  member,
  index,
}: {
  member: Member;
  index: number;
}) {
  const number = String(index + 1).padStart(2, "0");
  const reduced = useReducedMotion();
  return (
    <Reveal className="member-entry" delay={(index % 4) * 0.055}>
      <Dialog.Root>
        <Dialog.Trigger
          render={
            <motion.button
              initial="rest"
              whileHover="active"
              whileFocus="active"
            />
          }
          data-cursor="view"
          className={`member-card tone-${index % 4}`}
          aria-label={`View ${member.name} profile`}
        >
          <span className="member-border-trace" aria-hidden="true" />
          <span className="member-index">
            <span>{number}</span>
            <span aria-hidden="true">↗</span>
          </span>
          <div className="member-media">
            <div className="member-image-frame">
              <motion.div
                variants={{
                  rest: { scale: 1 },
                  active: { scale: reduced ? 1 : 1.035 },
                }}
                transition={{ duration: 0.55, ease: easeOut }}
              >
                <Photo
                  src={member.image}
                  alt={`Portrait of ${member.name}`}
                  label={number}
                  className="member-photo"
                  sizes="(max-width: 767px) 50vw, (max-width: 1199px) 33vw, 25vw"
                />
              </motion.div>
            </div>
          </div>
          <div className="member-info">
            <div>
              <h3>{member.name}</h3>
              <span
                className={
                  member.role !== "Member" ? "role-label" : "member-role"
                }
              >
                {member.role}
              </span>
            </div>
            <span className="card-arrow">
              <ArrowUpRight size={19} />
            </span>
          </div>
        </Dialog.Trigger>
        <div className="member-hover-actions" aria-label={member.name + " social links"}>
          {member.instagram ? (
            <a href={member.instagram} target="_blank" rel="noopener noreferrer" aria-label={member.name + " Instagram"}>
              <InstagramIcon />
            </a>
          ) : null}
          {member.github ? (
            <a href={member.github} target="_blank" rel="noopener noreferrer" aria-label={member.name + " GitHub"}>
              <GithubIcon />
            </a>
          ) : null}
        </div>
        <MemberDetail member={member} number={number} memberIndex={index} />
      </Dialog.Root>
    </Reveal>
  );
}
