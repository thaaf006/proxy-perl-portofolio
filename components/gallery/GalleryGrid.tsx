"use client";

import { useCallback, useMemo, useState } from "react";
import { Dialog } from "@base-ui/react/dialog";
import { ArrowUpRight, X } from "lucide-react";
import { useReducedMotion } from "motion/react";
import CircularGallery from "@/components/CircularGallery";
import { gallery } from "@/data/gallery";
import { Photo } from "@/components/shared/Photo";

function archivePlaceholder(index: number) {
  const number = String(index + 1).padStart(3, "0");
  const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="1600" height="900" viewBox="0 0 1600 900"><rect width="1600" height="900" fill="#17191d"/><path d="M0 180h1600M0 450h1600M0 720h1600M320 0v900M800 0v900M1280 0v900" stroke="#30343b"/><text x="72" y="105" fill="#4388ff" font-family="monospace" font-size="28">PROXY / PERL — ${number}</text><text x="800" y="470" text-anchor="middle" fill="#e8e8e3" font-family="monospace" font-size="54">PHOTO TO COME</text></svg>`;
  return `data:image/svg+xml;charset=utf-8,${encodeURIComponent(svg)}`;
}

export function GalleryGrid() {
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);
  const reduced = useReducedMotion();
  const items = useMemo(
    () => gallery.map((item, index) => ({
      image: item.src || archivePlaceholder(index),
      text: `${String(index + 1).padStart(3, "0")}  ${item.caption || item.alt}`,
    })),
    [],
  );
  const selectItem = useCallback((index: number) => setSelectedIndex(index), []);
  const selected = selectedIndex === null ? null : gallery[selectedIndex];

  return (
    <Dialog.Root open={selectedIndex !== null} onOpenChange={(open) => !open && setSelectedIndex(null)}>
      <div className="archive-gallery">
        <div className="circular-gallery-stage" data-cursor="view">
          <CircularGallery
            items={items}
            bend={reduced ? 0 : 1.15}
            borderRadius={0.008}
            textColor="#d8d8d2"
            font='500 16px "Geist Mono", monospace'
            scrollSpeed={1.55}
            scrollEase={0.075}
            onItemClick={selectItem}
            reducedMotion={Boolean(reduced)}
          />
          <span className="gallery-drag-hint" aria-hidden="true">DRAG / SHIFT + SCROLL</span>
        </div>
        <div className="gallery-access-list" aria-label="Gallery items">
          {gallery.map((item, index) => (
            <button key={item.id} type="button" onClick={() => selectItem(index)}>
              <span>{String(index + 1).padStart(3, "0")}</span>
              {item.caption || item.alt}
              <ArrowUpRight size={15} aria-hidden="true" />
            </button>
          ))}
        </div>
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
