import type { Metadata } from "next";
import { Geist, Geist_Mono, Syne, Inter } from "next/font/google";
import Navbar from "@/components/layout/Navbar";
import BottomNav from "@/components/layout/BottomNav";
import QueryProvider from "@/components/providers/QueryProvider";
import { Analytics } from "@vercel/analytics/react";
import CommandPalette from "@/components/ui/CommandPalette";
import ChatWidget from "@/components/chat/ChatWidget";
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
  description: "Creative Developer & AI Builder based in Surabaya building things with AI and web technology.",
  keywords: ["Ihsanuddin Salav", "Abelion", "Creative Developer", "AI Builder", "Portfolio", "Surabaya"],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="id" className={`${geistSans.variable} ${geistMono.variable} ${syne.variable} ${inter.variable}`}>
      <body className="antialiased bg-[#0a0a0f] text-white font-geist-sans selection:bg-blue-500/30">
        <QueryProvider>
          <CommandPalette />
          <Navbar />
          {children}
          <ChatWidget />
          <BottomNav />
          <Analytics />
        </QueryProvider>
      </body>
    </html>
  );
}
