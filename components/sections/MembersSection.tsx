import { members } from "@/data/members";
import { MemberCard } from "@/components/members/MemberCard";
import { SectionHeading } from "@/components/shared/SectionHeading";

export function MembersSection() {
  return (
    <section id="members" className="section members-section members-team-section">
      <div className="container">
        <SectionHeading number="03" label="Members" title="Meet our team" />
      </div>
      <div className="container members-grid">
        {members.map((member, index) => (
          <MemberCard key={member.id} member={member} index={index} />
        ))}
      </div>
    </section>
  );
}
