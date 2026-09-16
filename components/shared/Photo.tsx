"use client";

import Image from "next/image";
import { useState } from "react";

export function Photo({ src, alt, label, className = "", sizes = "(max-width: 640px) 50vw, 25vw" }: {
  src?: string; alt: string; label: string; className?: string; sizes?: string;
}) {
  const [failedSource, setFailedSource] = useState<string>();
  const localSource = src?.startsWith("/") && !src.startsWith("//") ? src : undefined;
  return <div className={`photo ${className}`}>
    {localSource && failedSource !== localSource ? <Image src={localSource} alt={alt} fill sizes={sizes} onError={() => setFailedSource(localSource)} /> :
      <div className="photo-placeholder" role="img" aria-label={alt}>
        <span className="placeholder-orbit" aria-hidden="true" />
        <span className="placeholder-number" aria-hidden="true">{label}</span>
        <span className="placeholder-caption">Photo to come <span aria-hidden="true">↗</span></span>
      </div>}
  </div>;
}
