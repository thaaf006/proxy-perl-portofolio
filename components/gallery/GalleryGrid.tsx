"use client";
import { Dialog } from "@base-ui/react/dialog";
import { ArrowUpRight, X } from "lucide-react";
import { gallery } from "@/data/gallery";
import { Photo } from "@/components/shared/Photo";
export function GalleryGrid() {
  return (
    <div className="gallery-grid">
      {gallery.map((item, index) => (
        <Dialog.Root key={item.id}>
          <Dialog.Trigger
            className={`gallery-card gallery-card-${index % 4}`}
            aria-label={`View ${item.caption || item.alt}`}
          >
            <Photo
              src={item.src}
              alt={item.alt}
              label={String(index + 1).padStart(2, "0")}
              className="gallery-photo"
              sizes="(max-width: 640px) 100vw, 60vw"
            />
            <div className="gallery-caption">
              <span>
                <small>0{index + 1} /</small>
                {item.caption}
              </span>
              <ArrowUpRight size={19} />
            </div>
          </Dialog.Trigger>
          <Dialog.Portal>
            <Dialog.Backdrop className="dialog-backdrop" />
            <Dialog.Popup className="gallery-dialog">
              <div className="dialog-toolbar">
                <Dialog.Title>{item.caption || item.alt}</Dialog.Title>
                <Dialog.Close
                  className="icon-button"
                  aria-label="Close gallery image"
                >
                  <X size={21} />
                </Dialog.Close>
              </div>
              <Photo
                src={item.src}
                alt={item.alt}
                label={String(index + 1).padStart(2, "0")}
                className="gallery-expanded"
                sizes="90vw"
              />
            </Dialog.Popup>
          </Dialog.Portal>
        </Dialog.Root>
      ))}
    </div>
  );
}
