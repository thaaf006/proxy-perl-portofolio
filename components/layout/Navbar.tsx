"use client";
import { useEffect, useState } from "react";
import { useReducedMotion } from "motion/react";
import { Menu, X, ArrowUpRight } from "lucide-react";
import { Dialog } from "@base-ui/react/dialog";
import { ThemeToggle } from "@/components/shared/ThemeToggle";
import { group } from "@/data/group";
import GooeyNav from "@/components/GooeyNav";
const links = ["About", "Members", "Gallery"];
export function Navbar() {
  const [open, setOpen] = useState(false);
  const [activeIndex, setActiveIndex] = useState(-1);
  const reduced = useReducedMotion();

  useEffect(() => {
    const sections = links
      .map((link, index) => ({ element: document.getElementById(link.toLowerCase()), index }))
      .filter((entry) => entry.element) as { element: HTMLElement; index: number }[];
    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];
        if (visible) {
          const section = sections.find((entry) => entry.element === visible.target);
          if (section) setActiveIndex(section.index);
        }
      },
      { rootMargin: "-24% 0px -58%", threshold: [0, 0.15, 0.4] },
    );
    sections.forEach(({ element }) => observer.observe(element));
    return () => observer.disconnect();
  }, []);
  return (
    <header className="site-header">
      <div className="container nav-inner">
        <a className="brand" href="#home" aria-label={`${group.name} home`}>
          <span className="brand-symbol" aria-hidden="true">
            [p]
          </span>
          {group.name.replace(" ", " / ")}
        </a>
        <nav className="desktop-nav" aria-label="Main navigation">
          <GooeyNav
            items={links.map((link, index) => ({
              href: `#${link.toLowerCase()}`,
              label: <><span className="nav-index">0{index + 2}</span>{link}</>,
            }))}
            activeIndex={activeIndex}
            onActiveIndexChange={setActiveIndex}
            particleCount={reduced ? 0 : 2}
            particleDistances={[12, 3]}
            particleR={18}
            animationTime={360}
            timeVariance={80}
            colors={[1]}
            reducedMotion={Boolean(reduced)}
          />
        </nav>
        <div className="nav-actions">
          <ThemeToggle />
          <Dialog.Root open={open} onOpenChange={setOpen}>
            <Dialog.Trigger
              className="icon-button mobile-trigger"
              aria-label="Open navigation"
            >
              <Menu size={21} />
            </Dialog.Trigger>
            <Dialog.Portal>
              <Dialog.Backdrop className="dialog-backdrop" />
              <Dialog.Popup className="mobile-menu">
                <div className="menu-top">
                  <Dialog.Title>Explore {group.name}</Dialog.Title>
                  <Dialog.Close
                    className="icon-button"
                    aria-label="Close navigation"
                  >
                    <X size={20} />
                  </Dialog.Close>
                </div>
                <nav aria-label="Mobile navigation">
                  {links.map((link, index) => (
                    <a
                      key={link}
                      href={`#${link.toLowerCase()}`}
                      onClick={() => setOpen(false)}
                    >
                      <span className="eyebrow">0{index + 2}</span>
                      {link}
                      <ArrowUpRight size={23} />
                    </a>
                  ))}
                </nav>
              </Dialog.Popup>
            </Dialog.Portal>
          </Dialog.Root>
        </div>
      </div>
    </header>
  );
}
