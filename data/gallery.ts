export interface GalleryItem {
  id: string;
  src?: string;
  alt: string;
  caption?: string;
}

// Add src: "/gallery/gallery-01.jpg" and describe the actual photo in alt.
export const gallery: GalleryItem[] = [
  {
    id: "gallery-01",
    alt: "Group photograph placeholder",
    caption: "Our group, together",
    src:"/gallery/documentation-01.jpg",
  },
  {
    id: "gallery-02",
    alt: "Campus moment placeholder",
    caption: "Between classes",
    src:"/gallery/documentation-02.jpg",
  },
  {
    id: "gallery-03",
    alt: "Shared activity placeholder",
    caption: "A little collaboration",
    src:"/gallery/documentation-03.jpg",
  },
  {
    id: "gallery-04",
    alt: "Group memory placeholder",
    caption: "One for the memories",
    src:"/gallery/documentation-04.jpg",
  },
  {
    id: "gallery-05",
    alt: "Group memory placeholder",
    caption: "One for the memories",
    src:"/gallery/documentation-05.jpg",
  },
];
