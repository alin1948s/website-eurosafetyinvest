import React from "react";
import Link from "next/link";
import { ArrowRight, AlertTriangle } from "lucide-react";

export default function NotFound() {
  return (
    <div className="w-full min-h-[70vh] bg-[#FAF9F5] flex items-center justify-center py-16 px-4">
      <div className="max-w-md w-full bg-white border border-[#E2E5E8] p-8 sm:p-10 text-center space-y-5 shadow-sm">
        <div className="w-14 h-14 bg-[#111416] text-[#E9CF38] flex items-center justify-center mx-auto">
          <AlertTriangle className="w-7 h-7" />
        </div>

        <div className="space-y-1">
          <span className="text-xs font-mono font-bold text-[#F26A21] uppercase tracking-widest block">
            EROARE 404 &bull; PAGINĂ NEGĂSITĂ
          </span>
          <h1 className="text-2xl font-extrabold text-[#111416]">
            Resursa solicitată nu există.
          </h1>
          <p className="text-xs text-neutral-600 leading-relaxed">
            Pagina căutată a fost mutată sau nu mai este disponibilă. Puteți căuta produsul dorit direct în catalogul nostru online.
          </p>
        </div>

        <div className="pt-2 flex flex-col gap-2 font-mono text-xs">
          <Link
            href="/produse"
            className="w-full py-3 bg-[#111416] hover:bg-[#F26A21] text-white font-bold uppercase tracking-wider flex items-center justify-center gap-2 transition-colors"
          >
            <span>DESCHIDE CATALOGUL DE PRODUSE</span>
            <ArrowRight className="w-4 h-4" />
          </Link>

          <Link
            href="/"
            className="w-full py-2.5 bg-white border border-neutral-300 text-neutral-700 hover:bg-neutral-50 uppercase font-semibold transition-colors"
          >
            PAGINA PRINCIPALĂ
          </Link>
        </div>
      </div>
    </div>
  );
}
