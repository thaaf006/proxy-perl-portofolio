export interface GalleryItem {
  id: string;
  src?: string;
  alt: string;
  caption?: string;
}

// Add src: "/gallery/gallery-01.jpg" and describe the actual photo in alt.
export const gallery: GalleryItem[] = [
  { id: "gallery-01", alt: "Group photograph placeholder", caption: "Our group, together" },
  { id: "gallery-02", alt: "Campus moment placeholder", caption: "Between classes" },
  { id: "gallery-03", alt: "Shared activity placeholder", caption: "A little collaboration" },
  { id: "gallery-04", alt: "Group memory placeholder", caption: "One for the memories" },
];
