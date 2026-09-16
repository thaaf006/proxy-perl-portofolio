"use client";
import { Dialog } from "@base-ui/react/dialog";
import { ArrowUpRight } from "lucide-react";
import type { Member } from "@/data/members";
import { Photo } from "@/components/shared/Photo";
import { MemberDetail } from "./MemberDetail";
export function MemberCard({ member, index }: { member: Member; index: number }) {
  const number = String(index + 1).padStart(2, "0");
  return <Dialog.Root><Dialog.Trigger className={`member-card tone-${index % 4}`} aria-label={`View ${member.name} profile`}><Photo src={member.image} alt={`Portrait of ${member.name}`} label={number} className="member-photo" /><div className="member-info"><div><h3>{member.name}</h3><span className={member.role !== "Member" ? "role-label" : "member-role"}>{member.role}</span></div><span className="card-arrow"><ArrowUpRight size={19} /></span></div></Dialog.Trigger><MemberDetail member={member} number={number} /></Dialog.Root>;
}
