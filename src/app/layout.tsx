import type { Metadata } from "next";
import { Geist, Geist_Mono, Syne, Inter } from "next/font/google";
import Navbar from "@/components/layout/Navbar";
import BottomNav from "@/components/layout/BottomNav";
import QueryProvider from "@/components/providers/QueryProvider";
import { Analytics } from "@vercel/analytics/react";
import PageTransition from "@/components/ui/PageTransition";
import BackToTop from "@/components/ui/BackToTop";
import LazyCommandPalette from "@/components/ui/LazyCommandPalette";
import LazyChatWidget from "@/components/chat/LazyChatWidget";
import "./globals.css";
import { site } from "@/config/site";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const syne = Syne({
  variable: "--font-syne",
  subsets: ["latin"],
});

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: site.title,
  description: site.description,
  keywords: [
    "Ihsanuddin Salav",
    "Abelion",
    "Creative Developer",
    "AI Builder",
    "Portfolio",
    "Surabaya",
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="id"
      className={`${geistSans.variable} ${geistMono.variable} ${syne.variable} ${inter.variable}`}
    >
      <body className="antialiased bg-base text-white font-geist-sans selection:bg-blue-500/30">
        <a
          href="#main-content"
          className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-9999 focus:px-6 focus:py-3 focus:bg-primary focus:text-white focus:rounded-xl focus:font-bold focus:outline-none"
        >
          Skip to content
        </a>
        <noscript>
          <div className="min-h-screen flex items-center justify-center p-6 text-center bg-base">
            <div className="max-w-lg">
              <h1 className="text-4xl md:text-6xl font-bold text-text-primary mb-6">
                JavaScript Required
              </h1>
              <p className="text-lg text-text-secondary mb-8">
                This portfolio requires JavaScript to provide the best
                experience. Please enable JavaScript in your browser and refresh
                the page.
              </p>
              <p className="text-sm text-text-muted">
                Built with Next.js 16, React 19, and Tailwind CSS v4.
              </p>
            </div>
          </div>
        </noscript>
        <div className="noise-overlay" />
        <QueryProvider>
          <LazyCommandPalette />
          <Navbar />
          <div id="main-content">
            <PageTransition>{children}</PageTransition>
          </div>
          <LazyChatWidget />
          <BackToTop />
          <BottomNav />
          <Analytics />
        </QueryProvider>
      </body>
    </html>
  );
}
