import type { Metadata } from "next";
import { Syne, Plus_Jakarta_Sans, JetBrains_Mono } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/layout/Navbar";

const syne = Syne({
  subsets: ["latin"],
  variable: "--font-display",
});

const plusJakarta = Plus_Jakarta_Sans({
  subsets: ["latin"],
  variable: "--font-body",
});

const jetBrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-mono",
});

export const metadata: Metadata = {
  title: "Abelink | Student. Builder. Learner.",
  description: "Portfolio pribadi Ihsanuddin Salav (Abelion) - Mahasiswa, Pengembang AI & Web di Surabaya.",
  keywords: ["Abelink", "Abelion", "Ihsanuddin Salav", "Portfolio", "Next.js", "AI Developer"],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${syne.variable} ${plusJakarta.variable} ${jetBrainsMono.variable}`}>
      <body className="antialiased bg-base text-text-primary font-body">
        <Navbar />
        <main className="min-h-screen pt-16">
          {children}
        </main>
      </body>
    </html>
  );
}
