import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Dashboard",
  description: "Abelink Internal CMS Dashboard",
};

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen bg-base flex flex-col pt-20">
      <div className="flex-1 max-w-7xl w-full mx-auto p-6">
        {children}
      </div>
    </div>
  );
}
