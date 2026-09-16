import { members } from "@/data/members";
import { MemberCard } from "@/components/members/MemberCard";
import { SectionHeading } from "@/components/shared/SectionHeading";
export function MembersSection() {
  return (
    <section id="members" className="container section">
      <SectionHeading
        number="03"
        label="Members"
        title="meet_the_team()"
        description="Different personalities, a shared chapter. Select a person to get to know them a little better."
      />
      <div className="members-grid">
        {members.map((member, index) => (
          <MemberCard key={member.id} member={member} index={index} />
        ))}
      </div>
      <p className="section-endnote">12 perspectives. Every one belongs.</p>
    </section>
  );
}
