import { members } from "@/data/members";
import { MemberCard } from "@/components/members/MemberCard";
import { SectionHeading } from "@/components/shared/SectionHeading";
export function MembersSection() {
  return (
    <section id="members" className="container section members-section">
      <SectionHeading
        number="03"
        label="Members"
        title="Meet the people."
        description="Twelve people, each with a story of their own."
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
