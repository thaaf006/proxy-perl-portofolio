"use client";
import { useState } from "react";
import { Menu, X, ArrowUpRight } from "lucide-react";
import { Dialog } from "@base-ui/react/dialog";
import { ThemeToggle } from "@/components/shared/ThemeToggle";
import { group } from "@/data/group";
const links = ["About", "Members", "Gallery"];
export function Navbar() {
  const [open, setOpen] = useState(false);
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
          {links.map((link, index) => (
            <a key={link} href={`#${link.toLowerCase()}`}>
              <span className="nav-index">0{index + 2}</span>
              {link}
            </a>
          ))}
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
