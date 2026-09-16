import { ArrowDownRight, ArrowUpRight, Asterisk } from "lucide-react";
import { group } from "@/data/group";
import { Photo } from "@/components/shared/Photo";
import { Reveal } from "@/components/shared/Reveal";
export function HeroSection() {
  return (
    <section id="home" className="container hero">
      <Reveal className="hero-copy">
        <p className="eyebrow">
          <span className="status-dot" />
          {group.university}
        </p>
        <h1>
          {group.name}
          <span className="hero-slash">/</span>
          <span>{group.tagline}</span>
        </h1>
        <p className="hero-description">{group.description}</p>
        <a className="primary-link" href="#members">
          Meet The Team <ArrowUpRight size={18} />
        </a>
        <div className="hero-footnote">
          <span className="tiny-stack" aria-hidden="true">
            <i>01</i>
            <i>02</i>
            <i>12</i>
          </span>
          <span>
            12 individuals.
            <br />
            One collective.
          </span>
        </div>
      </Reveal>
      <Reveal className="hero-art" delay={0.12}>
        <div className="art-topline">
          <span>A collective in the making</span>
          <Asterisk size={23} />
        </div>
        <Photo
          src={group.heroImage}
          alt="Group photograph placeholder"
          label="12"
          className="hero-photo"
          sizes="(max-width: 768px) 100vw, 50vw"
        />
        <div className="art-caption">
          <span>Fig. 01 — All of us, together</span>
          <ArrowDownRight size={22} />
        </div>
        <div className="art-sticker">
          Many minds.
          <br />
          <em>Shared moments.</em>
        </div>
      </Reveal>
      <div className="hero-bottom">
        <span>People first. Always.</span>
        <a href="#about">
          Get to know us <ArrowDownRight size={16} />
        </a>
        <span>01 — 04</span>
      </div>
    </section>
  );
}
