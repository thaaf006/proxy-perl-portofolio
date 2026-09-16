import { ArrowDownRight, ArrowUpRight } from "lucide-react";
import { group } from "@/data/group";
import { members } from "@/data/members";
import { Photo } from "@/components/shared/Photo";
import { HeroEntrance } from "@/components/shared/HeroEntrance";
import { HeroTerminal } from "@/components/shared/HeroTerminal";
import { HeroAtmosphere } from "@/components/shared/HeroAtmosphere";
import { TechnicalTicker } from "@/components/shared/TechnicalTicker";
import { HeroIdentity } from "@/components/shared/HeroIdentity";

export function HeroSection() {
  return (
    <section id="home" className="container hero">
      <HeroAtmosphere />
      <HeroEntrance>
        <div className="hero-heading">
          <p className="eyebrow" data-enter>
            <span>01 /</span> {group.name}
            <span className="hero-edition">A STUDENT COLLECTIVE</span>
          </p>
          <h1 aria-label={`We are ${group.name}`}>
            <span className="hero-mask">
              <span className="hero-kicker" data-enter="line">
                WE ARE
              </span>
            </span>
            <span className="hero-mask" data-enter="line">
              <HeroIdentity />
            </span>
          </h1>
        </div>
        <div className="hero-aside">
          <div className="hero-intro" data-enter>
            <span className="technical-label">{"// MORE THAN A LANGUAGE"}</span>
            <p className="hero-statement">
              Not just a programming language.
              <br />
              <em>This is our story.</em>
            </p>
            <p className="hero-description">{group.description}</p>
          </div>
          <div data-enter>
            <a className="primary-link" href="#members">
              <span>MEET THE TEAM</span>
              <ArrowDownRight size={20} />
            </a>
          </div>
          <div data-enter>
            <HeroTerminal count={members.length} name={group.name} />
          </div>
          <p className="hero-university" data-enter>
            {group.university}
            <ArrowUpRight size={14} />
          </p>
        </div>
      </HeroEntrance>
      {group.heroImage && (
        <Photo
          src={group.heroImage}
          alt={`${group.name} together`}
          label="12"
          className="hero-group-photo"
          sizes="100vw"
        />
      )}
      <div className="hero-bottom">
        <span>{group.tagline}</span>
        <a href="#about">
          SCROLL TO EXPLORE <ArrowDownRight size={16} />
        </a>
        <span>12 PEOPLE / ONE STORY</span>
      </div>
      <TechnicalTicker />
    </section>
  );
}
