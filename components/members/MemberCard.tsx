"use client";
import { Dialog } from "@base-ui/react/dialog";
import { ArrowUpRight } from "lucide-react";
import type { Member } from "@/data/members";
import { Photo } from "@/components/shared/Photo";
import { MemberDetail } from "./MemberDetail";
import { motion, useReducedMotion } from "motion/react";
import { Reveal } from "@/components/shared/Reveal";
import { easeOut } from "@/lib/motion";
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
            <motion.div
              initial={reduced ? false : { clipPath: "inset(0 0 100% 0)" }}
              whileInView={{ clipPath: "inset(0 0 0% 0)" }}
              viewport={{ once: true, amount: 0.16 }}
              transition={{ duration: reduced ? 0 : 0.6, ease: easeOut }}
            >
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
                />
              </motion.div>
            </motion.div>
            <motion.span
              className="member-view"
              variants={{
                rest: { y: 3, opacity: 0.7 },
                active: { y: 0, opacity: 1 },
              }}
              transition={{ duration: reduced ? 0 : 0.25 }}
            >
              VIEW
            </motion.span>
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
        <MemberDetail member={member} number={number} />
      </Dialog.Root>
    </Reveal>
  );
}
