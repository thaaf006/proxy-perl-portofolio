"use client";

import Image from "next/image";

export function HeroAtmosphere() {
  return (
    <div className="hero-atmosphere" aria-hidden="true">
      <Image src="/hero-ascii.webp" alt="" fill priority sizes="100vw" className="hero-ascii-static-image" />
    </div>
  );
}
