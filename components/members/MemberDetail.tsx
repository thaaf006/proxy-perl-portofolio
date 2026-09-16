"use client";
import { Dialog } from "@base-ui/react/dialog";
import { CodeXml, Camera, Mail, X } from "lucide-react";
import type { Member } from "@/data/members";
import { Photo } from "@/components/shared/Photo";
function socialUrl(value?: string) {
  if (!value) return undefined;
  try { const url = new URL(value); return url.protocol === "https:" && url.pathname.length > 1 && !url.hostname.endsWith("example.com") ? url.href : undefined; } catch { return undefined; }
}
export function MemberDetail({ member, number }: { member: Member; number: string }) {
  const socials = [{ label: "Instagram", href: socialUrl(member.instagram), icon: Camera }, { label: "GitHub", href: socialUrl(member.github), icon: CodeXml }, { label: "Email", href: member.email && /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(member.email) && !member.email.endsWith("example.com") ? `mailto:${member.email}` : undefined, icon: Mail }].filter(link => link.href);
  return <Dialog.Portal><Dialog.Backdrop className="dialog-backdrop" /><Dialog.Popup className="profile-dialog">
    <div className="dialog-toolbar"><span className="eyebrow">The people / {number}</span><Dialog.Close className="icon-button" aria-label="Close profile"><X size={21} /></Dialog.Close></div>
    <div className="profile-layout"><Photo src={member.image} alt={`Portrait of ${member.name}`} label={number} className="profile-photo" sizes="(max-width: 640px) 90vw, 350px" /><div className="profile-content"><p className="role-label">{member.role}</p><Dialog.Title className="profile-title">{member.name}</Dialog.Title><Dialog.Description className="profile-description">A closer look at one of us.</Dialog.Description><dl className="biodata">{[["NIM", member.nim], ["Origin", member.origin], ["Birthday", member.birthday], ["Hobbies", member.hobbies?.filter(Boolean).join(" · ")], ["Fun fact", member.funFact]].map(([label, value]) => value ? <div key={label}><dt>{label}</dt><dd>{value}</dd></div> : null)}</dl>{socials.length > 0 && <div className="social-links">{socials.map(({ label, href, icon: Icon }) => <a key={label} href={href} target={label === "Email" ? undefined : "_blank"} rel={label === "Email" ? undefined : "noopener noreferrer"}><Icon size={17} />{label}</a>)}</div>}</div></div>
    <Dialog.Close className="mobile-profile-close">Back to the team</Dialog.Close>
  </Dialog.Popup></Dialog.Portal>;
}

