"use client";
import { useEffect, useState } from "react";
import { Dialog } from "@base-ui/react/dialog";
import { useReducedMotion } from "motion/react";
import { Camera, CodeXml, FileText, Link, Mail, X } from "lucide-react";
import type { Member } from "@/data/members";
import ProfileCard from "@/components/ProfileCard";
function socialUrl(value?: string) {
  if (!value) return undefined;
  try {
    const url = new URL(value);
    return url.protocol === "https:" &&
      url.pathname.length > 1 &&
      !url.hostname.endsWith("example.com")
      ? url.href
      : undefined;
  } catch {
    return undefined;
  }
}
function cvUrl(value?: string) {
  return value?.startsWith("/cv/") && value.toLowerCase().endsWith(".pdf")
    ? value
    : undefined;
}
export function MemberDetail({
  member,
  number,
}: {
  member: Member;
  number: string;
}) {
  const reduced = useReducedMotion();
  const [finePointer, setFinePointer] = useState(false);
  useEffect(() => {
    const query = matchMedia("(hover: hover) and (pointer: fine)");
    const sync = () => setFinePointer(query.matches);
    sync();
    query.addEventListener("change", sync);
    return () => query.removeEventListener("change", sync);
  }, []);
  const profileActions = [
    { label: "Instagram", href: socialUrl(member.instagram), icon: Camera, external: true },
    { label: "LinkedIn", href: socialUrl(member.linkedin), icon: Link, external: true },
    { label: "GitHub", href: socialUrl(member.github), icon: CodeXml, external: true },
    {
      label: "Email",
      href:
        member.email &&
        /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(member.email) &&
        !member.email.endsWith("example.com")
          ? `mailto:${member.email}`
          : undefined,
      icon: Mail,
      external: false,
    },
    { label: "View CV", href: cvUrl(member.cv), icon: FileText, external: true },
  ];
  const hasProfileActions = profileActions.some((action) => action.href);
  return (
    <Dialog.Portal>
      <Dialog.Backdrop className="dialog-backdrop" />
      <Dialog.Popup className="profile-dialog">
        <div className="dialog-toolbar">
          <span className="eyebrow">Profile / {number}</span>
          <Dialog.Close className="icon-button" aria-label="Close profile">
            <X size={21} />
          </Dialog.Close>
        </div>
        <div className="profile-layout">
          <ProfileCard
            className="proxy-profile-card"
            avatarUrl={member.image || ""}
            name={member.name}
            title={member.role}
            handle={member.nim}
            status={member.origin}
            fallbackLabel={number}
            innerGradient="none"
            behindGlowEnabled={false}
            showUserInfo={false}
            enableTilt={finePointer && !reduced}
            enableMobileTilt={false}
            tiltIntensity={0.24}
          />
          <div className="profile-content">
            <p className="role-label">{member.role}</p>
            <Dialog.Title className="profile-title">{member.name}</Dialog.Title>
            <Dialog.Description className="profile-description">
              A closer look at one of us.
            </Dialog.Description>
            <dl className="biodata">
              {[
                ["NIM", member.nim],
                ["Origin", member.origin],
                ["Birthday", member.birthday],
                ["Hobbies", member.hobbies?.filter(Boolean).join(" · ")],
                ["Fun fact", member.funFact],
              ].map(([label, value]) =>
                value ? (
                  <div key={label}>
                    <dt>
                      <span aria-hidden="true">&gt; </span>
                      {label}
                    </dt>
                    <dd>{value}</dd>
                  </div>
                ) : null,
              )}
            </dl>
            {hasProfileActions && (
              <div className="profile-actions" aria-label={`${member.name} links`}>
                {profileActions.map(({ label, href, icon: Icon, external }) =>
                  href ? (
                    <a
                      key={label}
                      href={href}
                      target={external ? "_blank" : undefined}
                      rel={external ? "noopener noreferrer" : undefined}
                      aria-label={
                        label === "View CV"
                          ? `View ${member.name}'s CV`
                          : label === "Email"
                            ? `Email ${member.name}`
                            : `Open ${member.name}'s ${label}`
                      }
                    >
                      <Icon size={16} aria-hidden="true" />
                      <span>{label}</span>
                      <span aria-hidden="true">↗</span>
                    </a>
                  ) : null,
                )}
              </div>
            )}
          </div>
        </div>
        <Dialog.Close className="mobile-profile-close">
          Back to the team
        </Dialog.Close>
      </Dialog.Popup>
    </Dialog.Portal>
  );
}
