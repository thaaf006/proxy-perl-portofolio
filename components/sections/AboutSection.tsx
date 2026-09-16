import { group } from "@/data/group";
import { members } from "@/data/members";
export function AboutSection() {
  const stats = [[members.length, "People"], [members.filter(m => m.role === "Leader").length, "Leader"], [members.filter(m => m.role === "PJK").length, "PJK"], [members.filter(m => m.role === "Member").length, "Members"]];
  return <section id="about" className="about-section section"><div className="container"><p className="eyebrow"><span>01 /</span> A little about us</p><div className="about-grid"><h2>{group.aboutTitle}</h2><div className="about-copy"><p>{group.about}</p><p>{group.aboutNote}</p></div></div><dl className="stats">{stats.map(([value, label]) => <div key={label}><dt>{label}</dt><dd>{String(value).padStart(2, "0")}<span>.</span></dd></div>)}</dl></div></section>;
}
