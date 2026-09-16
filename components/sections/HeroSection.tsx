import { ArrowDownRight, ArrowUpRight } from "lucide-react";
import { group } from "@/data/group";
import { members } from "@/data/members";
import { Photo } from "@/components/shared/Photo";
import { HeroEntrance } from "@/components/shared/HeroEntrance";
import { HeroTerminal } from "@/components/shared/HeroTerminal";

export function HeroSection() {
  return (
    <section id="home" className="container hero">
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
            {group.name.split(" ").map((word, index, words) => (
              <span className="hero-mask" key={`${word}-${index}`}>
                <span
                  className={`hero-word ${index === words.length - 1 ? "hero-word-last" : ""}`}
                  data-enter="line"
                >
                  {word}
                  {index === words.length - 1 && (
                    <span className="code-caret" aria-hidden="true">
                      _
                    </span>
                  )}
                </span>
              </span>
            ))}
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
    </section>
  );
}
