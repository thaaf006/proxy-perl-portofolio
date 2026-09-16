import { GalleryGrid } from "@/components/gallery/GalleryGrid";
import { SectionHeading } from "@/components/shared/SectionHeading";
export function GallerySection() {
  return (
    <section id="gallery" className="section gallery-section">
      <div className="container">
        <SectionHeading
          number="04"
          label="Gallery / shared memory"
          title="The in-between moments."
          description="A place for the days, details, and shared memories that make this chapter ours."
        />
        <GalleryGrid />
      </div>
    </section>
  );
}
