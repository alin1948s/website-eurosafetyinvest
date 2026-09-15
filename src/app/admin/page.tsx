import { Metadata } from "next";
import { getStoredQuotes, getStoredContacts } from "@/lib/storage";
import { AdminDashboard } from "@/components/admin/AdminDashboard";

export const metadata: Metadata = {
  title: "Panou Administrare Oferte & Mesaje | Euro Safety Invest",
  description: "Panou intern de administrare și vizualizare cereri de ofertă B2B și mesaje contact.",
  robots: {
    index: false,
    follow: false,
  },
};

export const dynamic = "force-dynamic";

export default async function AdminPage() {
  const quotes = await getStoredQuotes();
  const contacts = await getStoredContacts();

  return <AdminDashboard initialQuotes={quotes} initialContacts={contacts} />;
}
