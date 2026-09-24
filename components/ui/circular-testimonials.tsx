"use client";

import { useEffect, useMemo, useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { AnimatePresence, motion } from "motion/react";
import Image from "next/image";

export interface CircularTestimonial {
  quote: string;
  name: string;
  designation: string;
  src?: string;
  fallbackLabel: string;
}

interface CircularTestimonialsProps {
  testimonials: CircularTestimonial[];
  initialIndex?: number;
  onActiveIndexChange?: (index: number) => void;
}

function getOffset(index: number, activeIndex: number, length: number) {
  return (index - activeIndex + length) % length;
}

export function CircularTestimonials({
  testimonials,
  initialIndex = 0,
  onActiveIndexChange,
}: CircularTestimonialsProps) {
  const [activeIndex, setActiveIndex] = useState(
    Math.min(Math.max(initialIndex, 0), Math.max(testimonials.length - 1, 0)),
  );
  const active = testimonials[activeIndex];
  const length = testimonials.length;

  useEffect(() => {
    onActiveIndexChange?.(activeIndex);
  }, [activeIndex, onActiveIndexChange]);

  const goTo = (index: number) => {
    if (!length) return;
    setActiveIndex((index + length) % length);
  };

  const imageStyles = useMemo(
    () =>
      testimonials.map((_, index) => {
        const offset = getOffset(index, activeIndex, length);
        const isActive = offset === 0;
        const isLeft = offset === length - 1;
        const isRight = offset === 1;

        if (isActive) {
          return {
            left: 0,
            right: 0,
            width: "100%",
            opacity: 1,
            transform: "translateX(0) translateY(0) scale(1) rotateY(0deg)",
            zIndex: 3,
          };
        }
        if (isLeft) {
          return {
            left: "36px",
            right: "auto",
            width: "calc(100% - 72px)",
            opacity: 0.72,
            transform: "translateX(-28px) translateY(-24px) scale(.84) rotateY(15deg)",
            zIndex: 2,
          };
        }
        if (isRight) {
          return {
            left: "auto",
            right: "36px",
            width: "calc(100% - 72px)",
            opacity: 0.72,
            transform: "translateX(28px) translateY(-24px) scale(.84) rotateY(-15deg)",
            zIndex: 2,
          };
        }
        return {
          left: 0,
          right: 0,
          width: "100%",
          opacity: 0,
          transform: "translateX(0) translateY(0) scale(.72)",
          zIndex: 1,
        };
      }),
    [activeIndex, length, testimonials],
  );

  if (!active) return null;

  return (
    <div className="profile-circular-testimonials">
      <div className="profile-testimonial-images" aria-label="Browse member profiles">
        {testimonials.map((testimonial, index) => (
          <button
            key={`${testimonial.name}-${index}`}
            type="button"
            className="profile-testimonial-image-button"
            style={imageStyles[index]}
            onClick={() => goTo(index)}
            aria-label={`View ${testimonial.name}`}
            tabIndex={index === activeIndex ? 0 : -1}
          >
            {testimonial.src ? (
              <Image
                src={testimonial.src}
                alt={testimonial.name}
                fill
                sizes="(max-width: 767px) 90vw, 360px"
              />
            ) : (
              <span className="profile-testimonial-placeholder" aria-hidden="true">
                {testimonial.fallbackLabel}
              </span>
            )}
          </button>
        ))}
      </div>
      <div className="profile-testimonial-copy">
        <AnimatePresence mode="wait">
          <motion.div
            key={activeIndex}
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -16 }}
            transition={{ duration: 0.28, ease: "easeOut" }}
          >
            <p className="profile-testimonial-kicker">{active.designation}</p>
            <h3>{active.name}</h3>
          </motion.div>
        </AnimatePresence>
        <div className="profile-testimonial-controls">
          <button type="button" onClick={() => goTo(activeIndex - 1)} aria-label="Previous profile">
            <ChevronLeft size={18} />
          </button>
          <span>{String(activeIndex + 1).padStart(2, "0")} / {String(length).padStart(2, "0")}</span>
          <button type="button" onClick={() => goTo(activeIndex + 1)} aria-label="Next profile">
            <ChevronRight size={18} />
          </button>
        </div>
      </div>
    </div>
  );
}
