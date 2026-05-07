import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Uses",
  description: "A digital garden of the tools, gear, and software I use daily.",
};

export default function UsesLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
