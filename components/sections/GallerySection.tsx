import { GalleryGrid } from "@/components/gallery/GalleryGrid";
import { SectionHeading } from "@/components/shared/SectionHeading";
export function GallerySection() {
  return (
    <section id="gallery" className="section gallery-section">
      <div className="container">
        <SectionHeading
          number="04"
          label="Shared memories"
          title="The in-between moments."
        />
        <GalleryGrid />
      </div>
    </section>
  );
}
