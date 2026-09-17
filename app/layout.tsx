import type { Metadata, Viewport } from "next";
import Script from "next/script";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { Providers } from "@/components/shared/Providers";
import { group } from "@/data/group";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: `${group.name} — Our shared story`,
  description: group.description,
};

export const viewport: Viewport = {
  colorScheme: "dark",
  themeColor: "#191a1e",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} dark h-full antialiased`}
      suppressHydrationWarning
    >
      <head>
        <Script id="proxy-intro-state" strategy="beforeInteractive">
          {`try{var seen=sessionStorage.getItem('proxy-perl-intro-seen')==='1';var skip=seen||location.hash||matchMedia('(prefers-reduced-motion: reduce)').matches||scrollY>80;document.documentElement.dataset.intro=skip?'skip':'show'}catch(e){document.documentElement.dataset.intro='show'}`}
        </Script>
      </head>
      <body className="min-h-full flex flex-col">
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
