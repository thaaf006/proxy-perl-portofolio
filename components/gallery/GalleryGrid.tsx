"use client";

import { useState } from "react";
import { Dialog } from "@base-ui/react/dialog";
import { ArrowUpRight, X } from "lucide-react";
import { gallery } from "@/data/gallery";
import { Photo } from "@/components/shared/Photo";

function archivePlaceholder(index: number) {
  const number = String(index + 1).padStart(3, "0");
  const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="1600" height="900" viewBox="0 0 1600 900"><rect width="1600" height="900" fill="#17191d"/><path d="M0 180h1600M0 450h1600M0 720h1600M320 0v900M800 0v900M1280 0v900" stroke="#30343b"/><text x="72" y="105" fill="#4388ff" font-family="sans-serif" font-size="28">Proxy Perl — ${number}</text><text x="800" y="470" text-anchor="middle" fill="#e8e8e3" font-family="sans-serif" font-size="54">PHOTO TO COME</text></svg>`;
  return `data:image/svg+xml;charset=utf-8,${encodeURIComponent(svg)}`;
}

export function GalleryGrid() {
  const [activeIndex, setActiveIndex] = useState(0);
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);
  const selected = selectedIndex === null ? null : gallery[selectedIndex];

  return (
    <Dialog.Root
      open={selectedIndex !== null}
      onOpenChange={(open) => !open && setSelectedIndex(null)}
    >
      <div className="elastic-gallery" aria-label="Shared memories gallery">
        <div className="elastic-gallery-track">
          {gallery.map((item, index) => {
            const isActive = index === activeIndex;
            const number = String(index + 1).padStart(2, "0");
            const image = item.src || archivePlaceholder(index);
            return (
              <button
                key={item.id}
                type="button"
                className={"elastic-gallery-card" + (isActive ? " is-active" : "")}
                onMouseEnter={() => setActiveIndex(index)}
                onFocus={() => setActiveIndex(index)}
                onClick={() => setSelectedIndex(index)}
                aria-label={"Open " + (item.caption || item.alt)}
              >
                <Photo
                  src={image}
                  alt={item.alt}
                  label={number}
                  className="elastic-gallery-image"
                  sizes="(max-width: 700px) 88vw, 48vw"
                />
                <span className="elastic-gallery-shade" aria-hidden="true" />
                <span className="elastic-gallery-copy">
                  <span className="elastic-gallery-chip">Memory / {number}</span>
                  <strong>{item.caption || item.alt}</strong>
                  <span className="elastic-gallery-cta">
                    View memory <ArrowUpRight size={15} aria-hidden="true" />
                  </span>
                </span>
              </button>
            );
          })}
        </div>
        <p className="elastic-gallery-hint">Hover or focus a memory · click to expand</p>
      </div>
      {selected && selectedIndex !== null && (
        <Dialog.Portal>
          <Dialog.Backdrop className="dialog-backdrop" />
          <Dialog.Popup className="gallery-dialog">
            <div className="dialog-toolbar">
              <Dialog.Title>{selected.caption || selected.alt}</Dialog.Title>
              <Dialog.Close className="icon-button" aria-label="Close gallery image"><X size={21} /></Dialog.Close>
            </div>
            <Photo
              src={selected.src}
              alt={selected.alt}
              label={String(selectedIndex + 1).padStart(2, "0")}
              className="gallery-expanded"
              sizes="90vw"
            />
          </Dialog.Popup>
        </Dialog.Portal>
      )}
    </Dialog.Root>
  );
}
