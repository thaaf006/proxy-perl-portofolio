import { ArrowDownRight } from "lucide-react";
import { group } from "@/data/group";
import { Photo } from "@/components/shared/Photo";
import { HeroEntrance } from "@/components/shared/HeroEntrance";
import { HeroAtmosphere } from "@/components/shared/HeroAtmosphere";
import { HeroIdentity } from "@/components/shared/HeroIdentity";

export function HeroSection() {
  return (
    <section id="home" className="hero">
      <HeroAtmosphere />
      <div className="container hero-content">
        <HeroEntrance>
          <div className="hero-heading">
            <h1 aria-label={`We are ${group.name}`}>
              <span className="hero-mask">
                <span className="hero-kicker" data-enter="line">
                  WE ARE
                </span>
              </span>
              <span className="hero-mask hero-identity-mask" data-enter="line">
                <HeroIdentity />
              </span>
            </h1>
          </div>
          <div className="hero-aside">
            <div data-enter>
              <a className="primary-link" href="#members">
                <span>MEET THE MEMBERS</span>
                <ArrowDownRight size={18} />
              </a>
            </div>
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
      </div>
    </section>
  );
}
