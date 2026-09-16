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
          <span>02 /</span> Group data / the human side
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
        <Reveal className="about-code" delay={0.16}>
          <span>const proxyPerl = &#123;</span>
          <span>&nbsp;&nbsp;leader: 1, &nbsp;pjk: 1, &nbsp;members: 10,</span>
          <span>&nbsp;&nbsp;total: 12, &nbsp;story: &quot;one&quot;</span>
          <span>&#125;;</span>
        </Reveal>
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
