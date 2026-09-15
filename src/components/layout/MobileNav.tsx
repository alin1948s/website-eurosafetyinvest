"use client";

import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Grid, Search, ShoppingBag, Send } from "lucide-react";
import { useQuote } from "@/context/QuoteContext";

interface MobileNavProps {
  onOpenSearch: () => void;
}

export function MobileNav({ onOpenSearch }: MobileNavProps) {
  const pathname = usePathname();
  const { itemCount, setIsDrawerOpen } = useQuote();

  return (
    <div className="lg:hidden fixed bottom-0 left-0 right-0 z-40 bg-[#111416]/95 backdrop-blur-md border-t border-[#22292E] px-2 py-1.5 flex items-center justify-around text-[10px] font-mono">
      {/* Catalog */}
      <Link
        href="/produse"
        className={`flex flex-col items-center py-1 px-3 transition-colors ${
          pathname.startsWith("/produse") ? "text-[#F26A21]" : "text-neutral-400 hover:text-white"
        }`}
      >
        <Grid className="w-5 h-5 mb-0.5" />
        <span>PRODUSE</span>
      </Link>

      {/* Caută */}
      <button
        onClick={onOpenSearch}
        className="flex flex-col items-center py-1 px-3 text-neutral-400 hover:text-white transition-colors"
      >
        <Search className="w-5 h-5 mb-0.5" />
        <span>CAUTĂ</span>
      </button>

      {/* Cerere Ofertă */}
      <button
        onClick={() => setIsDrawerOpen(true)}
        className="relative flex flex-col items-center py-1 px-3 text-neutral-400 hover:text-white transition-colors"
      >
        <div className="relative">
          <ShoppingBag className="w-5 h-5 mb-0.5" />
          {itemCount > 0 && (
            <span className="absolute -top-1.5 -right-2 w-4 h-4 bg-[#F26A21] text-black font-bold text-[9px] rounded-full flex items-center justify-center">
              {itemCount}
            </span>
          )}
        </div>
        <span>OFERTĂ</span>
      </button>

      {/* Direct Quote Form */}
      <Link
        href="/solicita-oferta"
        className={`flex flex-col items-center py-1 px-3 transition-colors ${
          pathname === "/solicita-oferta" ? "text-[#F26A21]" : "text-neutral-400 hover:text-white"
        }`}
      >
        <Send className="w-5 h-5 mb-0.5" />
        <span>SOLICITĂ</span>
      </Link>
    </div>
  );
}
