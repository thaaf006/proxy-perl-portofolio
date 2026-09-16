"use client";
import { Dialog } from "@base-ui/react/dialog";
import { ArrowUpRight, X } from "lucide-react";
import { gallery } from "@/data/gallery";
import { Photo } from "@/components/shared/Photo";
import { Reveal } from "@/components/shared/Reveal";
import { motion, useReducedMotion } from "motion/react";
import { easeOut } from "@/lib/motion";
export function GalleryGrid() {
  const reduced = useReducedMotion();
  return (
    <div className="gallery-grid">
      {gallery.map((item, index) => (
        <Reveal
          key={item.id}
          className={`gallery-entry gallery-card-${index % 4}`}
          delay={(index % 2) * 0.08}
        >
          <Dialog.Root>
            <Dialog.Trigger
              render={
                <motion.button
                  initial="rest"
                  whileHover="active"
                  whileFocus="active"
                />
              }
              data-cursor="view"
              className="gallery-card"
              aria-label={`View ${item.caption || item.alt}`}
            >
              <span className="gallery-index">
                MEMORY / {String(index + 1).padStart(2, "0")}
              </span>
              <div className="gallery-media">
                <motion.div
                  variants={{
                    rest: { scale: 1 },
                    active: { scale: reduced ? 1 : 1.035 },
                  }}
                  transition={{ duration: 0.65, ease: easeOut }}
                >
                  <Photo
                    src={item.src}
                    alt={item.alt}
                    label={String(index + 1).padStart(2, "0")}
                    className="gallery-photo"
                    sizes="(max-width: 640px) 100vw, 60vw"
                  />
                </motion.div>
                <motion.span
                  className="gallery-overlay"
                  variants={{ rest: { opacity: 0 }, active: { opacity: 1 } }}
                  transition={{ duration: reduced ? 0 : 0.3 }}
                  aria-hidden="true"
                >
                  OPEN MEMORY <ArrowUpRight size={18} />
                </motion.span>
              </div>
              <div className="gallery-caption">
                <span>
                  <small>[{String(index + 1).padStart(2, "0")}]</small>
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
        </Reveal>
      ))}
    </div>
  );
}
