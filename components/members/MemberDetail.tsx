"use client";
import { useState } from "react";
import { Dialog } from "@base-ui/react/dialog";
import { Camera, CodeXml, FileText, Link, Mail, X } from "lucide-react";
import { members, type Member } from "@/data/members";
import { CircularTestimonials } from "@/components/ui/circular-testimonials";
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
  memberIndex,
}: {
  member: Member;
  number: string;
  memberIndex: number;
}) {
  const [activeIndex, setActiveIndex] = useState(memberIndex);
  const activeMember = members[activeIndex] ?? member;
  const profileActions = [
    { label: "Instagram", href: socialUrl(activeMember.instagram), icon: Camera, external: true },
    { label: "LinkedIn", href: socialUrl(activeMember.linkedin), icon: Link, external: true },
    { label: "GitHub", href: socialUrl(activeMember.github), icon: CodeXml, external: true },
    {
      label: "Email",
      href:
        activeMember.email &&
        /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(activeMember.email) &&
        !activeMember.email.endsWith("example.com")
          ? `mailto:${activeMember.email}`
          : undefined,
      icon: Mail,
      external: false,
    },
    { label: "View CV", href: cvUrl(activeMember.cv), icon: FileText, external: true },
  ];
  const hasProfileActions = profileActions.some((action) => action.href);
  const testimonials = members.map((profile, index) => ({
    name: profile.name,
    designation: `${profile.role} / ${profile.origin ?? "Profile"}`,
    quote: profile.funFact ?? "A closer look at one of us.",
    src: profile.image?.startsWith("/") ? profile.image : undefined,
    fallbackLabel: String(index + 1).padStart(2, "0"),
  }));
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
          <CircularTestimonials
            testimonials={testimonials}
            initialIndex={memberIndex}
            onActiveIndexChange={setActiveIndex}
          />
          <div className="profile-content">
            <p className="role-label">{activeMember.role}</p>
            <Dialog.Title className="profile-title">{activeMember.name}</Dialog.Title>
            <Dialog.Description className="profile-description">
              A closer look at one of us.
            </Dialog.Description>
            <dl className="biodata">
              {[
                ["Nickname", activeMember.nickname],
                ["NIM", activeMember.nim],
                ["Origin", activeMember.origin],
                ["Birthday", activeMember.birthday],
                ["Hobbies", activeMember.hobbies?.filter(Boolean).join(" · ")],
                ["Fun fact", activeMember.funFact],
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
              <div className="profile-actions" aria-label={`${activeMember.name} links`}>
                {profileActions.map(({ label, href, icon: Icon, external }) =>
                  href ? (
                    <a
                      key={label}
                      href={href}
                      target={external ? "_blank" : undefined}
                      rel={external ? "noopener noreferrer" : undefined}
                      aria-label={
                        label === "View CV"
                          ? `View ${activeMember.name}'s CV`
                          : label === "Email"
                            ? `Email ${activeMember.name}`
                            : `Open ${activeMember.name}'s ${label}`
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
