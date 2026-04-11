import type { Metadata } from "next";
import { Geist, Geist_Mono, Syne, Inter } from "next/font/google";
import Navbar from "@/components/layout/Navbar";
import BottomNav from "@/components/layout/BottomNav";
import QueryProvider from "@/components/providers/QueryProvider";
import { Analytics } from "@vercel/analytics/react";
import CommandPalette from "@/components/ui/CommandPalette";
import ChatWidget from "@/components/chat/ChatWidget";
import BackToTop from "@/components/ui/BackToTop";
import "./globals.css";

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
  title: "Abelink Portofolio — Ihsanuddin Salav",
  description:
    "Creative Developer & AI Builder based in Surabaya building things with AI and web technology.",
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
        <QueryProvider>
          <CommandPalette />
          <Navbar />
          {children}
          <ChatWidget />
          <BackToTop />
          <BottomNav />
          <Analytics />
        </QueryProvider>
      </body>
    </html>
  );
}
