import React from "react";
import Link from "next/link";
import { Metadata } from "next";
import { QuoteForm } from "@/components/quote/QuoteForm";

export const metadata: Metadata = {
  title: "Solicită Ofertă de Preț | Euro Safety Invest",
  description:
    "Transmite lista de echipamente de protecție necesare pentru compania ta. Cotații personalizate de preț, fără cont necesar și fără plăți online.",
};

export default function SolicitaOfertaPage() {
  return (
    <div className="w-full bg-[#FAF9F5] min-h-screen py-10">
      <div className="max-w-[1360px] mx-auto px-4 sm:px-6 space-y-8">
        {/* Breadcrumb & Title */}
        <div className="space-y-2 border-b border-[#E2E5E8] pb-6">
          <div className="flex items-center gap-2 text-xs font-mono text-neutral-500 uppercase">
            <Link href="/" className="hover:text-black">
              ACASĂ
            </Link>
            <span>/</span>
            <span className="text-[#F26A21] font-bold">SOLICITĂ OFERTĂ</span>
          </div>

          <h1 className="text-3xl sm:text-5xl font-extrabold text-[#111416] tracking-tight">
            Solicită o ofertă.
          </h1>
          <p className="text-sm text-neutral-600 max-w-xl leading-relaxed">
            Trimite produsele și cantitățile necesare, iar echipa Euro Safety Invest te va contacta în cel mai scurt timp cu cotația detaliată.
          </p>
        </div>

        {/* Form & Items Component */}
        <QuoteForm />
      </div>
    </div>
  );
}
