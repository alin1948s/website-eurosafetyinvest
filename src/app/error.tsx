"use client";

import React, { useEffect } from "react";
import Link from "next/link";
import { AlertCircle, RotateCcw } from "lucide-react";

export default function ErrorBoundary({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error("Application error:", error);
  }, [error]);

  return (
    <div className="w-full min-h-[70vh] bg-[#FAF9F5] flex items-center justify-center py-16 px-4">
      <div className="max-w-md w-full bg-white border border-[#E2E5E8] p-8 text-center space-y-5 shadow-sm">
        <div className="w-14 h-14 bg-red-100 text-red-600 flex items-center justify-center mx-auto">
          <AlertCircle className="w-7 h-7" />
        </div>

        <div className="space-y-1">
          <span className="text-xs font-mono font-bold text-red-600 uppercase tracking-widest block">
            EROARE DE SISTEM
          </span>
          <h2 className="text-2xl font-extrabold text-[#111416]">
            A apărut o problemă neașteptată.
          </h2>
          <p className="text-xs text-neutral-600 leading-relaxed">
            Vă rugăm să reîncărcați pagina sau să reveniți la catalogul principal. Dacă problema persistă, vă rugăm să ne contactați.
          </p>
        </div>

        <div className="pt-2 flex flex-col gap-2 font-mono text-xs">
          <button
            onClick={() => reset()}
            className="w-full py-3 bg-[#111416] hover:bg-[#F26A21] text-white font-bold uppercase tracking-wider flex items-center justify-center gap-2 transition-colors"
          >
            <RotateCcw className="w-4 h-4" />
            <span>REÎNCEARCĂ</span>
          </button>

          <Link
            href="/"
            className="w-full py-2.5 bg-white border border-neutral-300 text-neutral-700 hover:bg-neutral-50 uppercase font-semibold transition-colors"
          >
            ÎNAPOI LA PRIMA PAGINĂ
          </Link>
        </div>
      </div>
    </div>
  );
}
