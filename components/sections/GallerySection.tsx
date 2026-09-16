import { GalleryGrid } from "@/components/gallery/GalleryGrid";
import { SectionHeading } from "@/components/shared/SectionHeading";
export function GallerySection() {
  return (
    <section id="gallery" className="section gallery-section">
      <span className="gallery-environment" aria-hidden="true">
        ARCHIVE_
      </span>
      <div className="container">
        <SectionHeading
          number="04"
          label="Archive / shared memory"
          title="The in-between moments."
          description="A place for the days, details, and shared memories that make this chapter ours."
        />
        <GalleryGrid />
      </div>
    </section>
  );
}
