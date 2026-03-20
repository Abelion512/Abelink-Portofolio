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
  title: {
    default: "Abelion — Student. Builder. Learner.",
    template: "%s | Abelion"
  },
  description: "Portfolio of Abelion (Ihsanuddin Salav) — second-semester student from Surabaya building things with AI and web technology.",
  keywords: ["Abelion", "Ihsanuddin Salav", "portfolio", "developer", "AI", "Next.js", "Surabaya"],
  authors: [{ name: "Abelion", url: "https://abelink-portofolio.vercel.app" }],
  creator: "Abelion",
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
