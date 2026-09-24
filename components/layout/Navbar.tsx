"use client";
import { useEffect, useRef, useState } from "react";
import { Gamepad2, House, Images, Info, Users } from "lucide-react";
import Image from "next/image";
import { group } from "@/data/group";
import { NavBar } from "@/components/ui/tubelight-navbar";

const links = [
  { name: "Home", url: "#home", icon: House },
  { name: "About", url: "#about", icon: Info },
  { name: "Members", url: "#members", icon: Users },
  { name: "Memories", url: "#gallery", icon: Images },
  { name: "Games", url: "#camel-run", icon: Gamepad2 },
];

export function Navbar() {
  const [activeIndex, setActiveIndex] = useState(0);
  const navigationTarget = useRef<number | null>(null);
  const navigationTimer = useRef<number | null>(null);

  useEffect(() => {
    const sections = links
      .map((link, index) => ({ element: document.getElementById(link.url.slice(1)), index }))
      .filter((entry) => entry.element) as { element: HTMLElement; index: number }[];
    let frame = 0;
    const updateActiveSection = () => {
      frame = 0;
      if (navigationTarget.current !== null) return;
      const activationLine = window.innerHeight * 0.35;
      const current = sections
        .filter(({ element }) => element.getBoundingClientRect().top <= activationLine)
        .at(-1);
      setActiveIndex(current?.index ?? 0);
    };
    const finishNavigation = () => {
      navigationTarget.current = null;
      if (navigationTimer.current !== null) {
        window.clearTimeout(navigationTimer.current);
        navigationTimer.current = null;
      }
      updateActiveSection();
    };
    const scheduleUpdate = () => {
      if (!frame) frame = window.requestAnimationFrame(updateActiveSection);
    };
    const syncFromHash = () => {
      const index = links.findIndex((link) => link.url === window.location.hash);
      if (index < 0) return;
      setActiveIndex(index);
      navigationTarget.current = index;
      if (navigationTimer.current !== null) window.clearTimeout(navigationTimer.current);
      navigationTimer.current = window.setTimeout(() => {
        navigationTarget.current = null;
        navigationTimer.current = null;
      }, 1600);
    };

    updateActiveSection();
    window.addEventListener("scroll", scheduleUpdate, { passive: true });
    window.addEventListener("resize", scheduleUpdate);
    window.addEventListener("hashchange", syncFromHash);
    window.addEventListener("scrollend", finishNavigation);
    return () => {
      window.removeEventListener("scroll", scheduleUpdate);
      window.removeEventListener("resize", scheduleUpdate);
      window.removeEventListener("hashchange", syncFromHash);
      window.removeEventListener("scrollend", finishNavigation);
      if (frame) window.cancelAnimationFrame(frame);
      if (navigationTimer.current !== null) window.clearTimeout(navigationTimer.current);
    };
  }, []);
  const handleNavChange = (index: number) => {
    setActiveIndex(index);
    navigationTarget.current = index;
    if (navigationTimer.current !== null) window.clearTimeout(navigationTimer.current);
    navigationTimer.current = window.setTimeout(() => {
      navigationTarget.current = null;
      navigationTimer.current = null;
    }, 1200);
  };
  return (
    <header className="site-header">
      <div className="container nav-inner">
        <a className="brand" href="#home" aria-label={`${group.name} home`}>
          <Image
            className="brand-symbol"
            src="/perl-logo.svg"
            alt="Perl logo"
            width={28}
            height={28}
          />
          {group.name}
        </a>
        <NavBar
          items={links}
          activeIndex={activeIndex}
          onActiveIndexChange={handleNavChange}
        />
      </div>
    </header>
  );
}
