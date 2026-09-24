export interface GalleryItem {
  id: string;
  src?: string;
  alt: string;
  caption?: string;
}

// Add src: "/gallery/gallery-01.jpg" and describe the actual photo in alt.
export const gallery: GalleryItem[] = [
  {
    id: "gallery-03",
    alt: "Shared activity photograph",
    caption: "First Meet",
    src: "/gallery/documentation-03.jpg",
  },
  {
    id: "gallery-05",
    alt: "Group memory photograph",
    caption: "Pekan Ilkomrez Day 1",
    src: "/gallery/documentation-05.jpg",
  },
  {
    id: "gallery-02",
    alt: "Campus moment photograph",
    caption: "Pekan Ilkomrez Day 2",
    src: "/gallery/documentation-02.jpg",
  },
  {
    id: "gallery-01",
    alt: "Group photograph",
    caption: "Pekan Ilkomrez Day 3",
    src: "/gallery/documentation-01.jpg",
  },
  {
    id: "gallery-04",
    alt: "Group memory photograph",
    caption: "Latihan Komtroopers",
    src: "/gallery/documentation-04.jpg",
  },
];
