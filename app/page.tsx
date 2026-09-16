import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { HeroSection } from "@/components/sections/HeroSection";
import { AboutSection } from "@/components/sections/AboutSection";
import { MembersSection } from "@/components/sections/MembersSection";
import { GallerySection } from "@/components/sections/GallerySection";

export default function Home() {
  return (
    <>
      <a className="skip-link" href="#main">
        Skip to content
      </a>
      <Navbar />
      <main id="main">
        <HeroSection />
        <AboutSection />
        <MembersSection />
        <GallerySection />
      </main>
      <Footer />
    </>
  );
}
