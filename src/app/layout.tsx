import type { Metadata, Viewport } from "next";
import { Syne, Plus_Jakarta_Sans, JetBrains_Mono } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/layout/Navbar";
import BottomNav from "@/components/layout/BottomNav";
import CommandPalette from "@/components/ui/CommandPalette";
import { Analytics } from "@vercel/analytics/react";

const syne = Syne({
  subsets: ["latin"],
  variable: "--font-display",
  display: 'swap',
});

const plusJakarta = Plus_Jakarta_Sans({
  subsets: ["latin"],
  variable: "--font-body",
  display: 'swap',
});

const jetBrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-mono",
  display: 'swap',
});

export const metadata: Metadata = {
  title: {
    default: "Ihsanuddin Salav — Creative Developer & AI Builder",
    template: "%s | Ihsanuddin Salav"
  },
  description: "Ihsanuddin Salav (Abelion) — A second-semester student building the future with AI, Web, and Minimalist Design. Based in Surabaya.",
  keywords: ["Ihsanuddin Salav", "Abelion", "Creative Developer", "AI Builder", "Portfolio", "Surabaya"],
  authors: [{ name: "Ihsanuddin Salav", url: "https://ihsanuddinsalav.my.id" }],
  creator: "Ihsanuddin Salav",
  icons: {
    icon: '/favicon.ico',
    apple: '/apple-touch-icon.png',
  },
  manifest: '/site.webmanifest',
};

export const viewport: Viewport = {
  themeColor: "#0a0a0f",
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${syne.variable} ${plusJakarta.variable} ${jetBrainsMono.variable}`}>
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Person",
              "name": "Ihsanuddin Salav",
              "url": "https://ihsanuddinsalav.my.id",
              "jobTitle": "Creative Developer",
              "alumniOf": "Universitas Brawijaya",
              "sameAs": [
                "https://github.com/Abelion512",
                "https://instagram.com/ihsanovid"
              ]
            })
          }}
        />
      </head>
      <body className="antialiased bg-base text-text-primary font-body overflow-x-hidden">
        <Navbar />
        <CommandPalette />
        <main className="min-h-screen pt-16 pb-24 lg:pb-0">
          {children}
        </main>
        <BottomNav />
        <Analytics />
      </body>
    </html>
  );
}
