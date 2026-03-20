import { Metadata } from "next";
import { supabase } from "@/lib/supabase";
import GuestbookClient from "@/components/features/guestbook/GuestbookClient";

export const metadata: Metadata = {
  title: "Guestbook | Abelink Portfolio",
  description: "Leave a message for Ihsanuddin Salav and see what others have to say.",
};

export const revalidate = 0; // Disable cache for guestbook to see new messages immediately

async function getGuestbookEntries() {
  const { data, error } = await supabase
    .from("guestbook")
    .select("*")
    .order("created_at", { ascending: false });

  if (error) {
    console.error("Error fetching guestbook:", error);
    return [];
  }
  return data || [];
}

export default async function GuestbookPage() {
  const entries = await getGuestbookEntries();

  return (
    <main className="pt-32 px-6 max-w-6xl mx-auto mb-24">
      <div className="mb-10 text-center md:text-left">
        <h1 className="text-5xl md:text-6xl font-display font-bold italic mb-3">
          The <span className="text-gradient">Guestbook</span>
        </h1>
        <p className="text-text-secondary text-lg max-w-2xl">
          Terima kasih telah berkunjung. Silakan tinggalkan pesan, kritik, atau sekadar menyapa!
        </p>
      </div>

      <GuestbookClient initialEntries={entries} />
    </main>
  );
}
