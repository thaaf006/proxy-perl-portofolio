import { Reveal } from "@/components/shared/Reveal";
import { group } from "@/data/group";
import { members } from "@/data/members";
import { AnimatedStat } from "@/components/shared/AnimatedStat";
export function AboutSection() {
  const stats = [
    [members.filter((m) => m.role === "Leader").length, "Leader"],
    [members.filter((m) => m.role === "PJK").length, "PJK"],
    [members.filter((m) => m.role === "Member").length, "Members"],
    [members.length, "Total"],
  ];
  return (
    <section id="about" className="about-section section">
      <div className="container">
        <p className="eyebrow">
          <span>02 /</span> About the group
        </p>
        <div className="about-grid">
          <Reveal>
            <h2>{group.aboutTitle}</h2>
          </Reveal>
          <Reveal className="about-copy" delay={0.1}>
            <p>{group.about}</p>
            <p>{group.aboutNote}</p>
          </Reveal>
        </div>
        <dl className="stats">
          {stats.map(([value, label]) => (
            <div key={label}>
              <dt>{label}</dt>
              <dd>
                <AnimatedStat value={Number(value)} />
                <span>.</span>
              </dd>
            </div>
          ))}
        </dl>
      </div>
    </section>
  );
}
