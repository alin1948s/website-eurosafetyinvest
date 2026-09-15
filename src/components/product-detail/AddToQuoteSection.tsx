"use client";

import React, { useState } from "react";
import Link from "next/link";
import { Product } from "@/lib/types";
import { useQuote } from "@/context/QuoteContext";
import { Plus, Minus, Check, ArrowRight, ShieldCheck } from "lucide-react";

interface AddToQuoteSectionProps {
  product: Product;
  selectedColor?: string;
  selectedSize?: string;
}

export function AddToQuoteSection({
  product,
  selectedColor,
  selectedSize,
}: AddToQuoteSectionProps) {
  const { addItem, setIsDrawerOpen } = useQuote();
  const [quantity, setQuantity] = useState(1);
  const [justAdded, setJustAdded] = useState(false);

  const handleAdd = () => {
    addItem(product, quantity, selectedColor, selectedSize);
    setJustAdded(true);
    setTimeout(() => setJustAdded(false), 2000);
  };

  return (
    <div className="space-y-4 pt-4 border-t border-[#EAECE8]">
      {/* Quantity & Add Action */}
      <div className="flex flex-col sm:flex-row items-stretch gap-3">
        {/* Quantity selector */}
        <div className="flex items-center border border-[#111416] bg-white h-12 shrink-0">
          <button
            type="button"
            onClick={() => setQuantity(Math.max(1, quantity - 1))}
            className="px-3.5 h-full hover:bg-neutral-100 text-neutral-600 hover:text-black transition-colors"
            aria-label="Scade cantitatea"
          >
            <Minus className="w-4 h-4" />
          </button>
          <span className="px-4 font-mono font-bold text-sm text-[#111416] min-w-[40px] text-center">
            {quantity}
          </span>
          <button
            type="button"
            onClick={() => setQuantity(quantity + 1)}
            className="px-3.5 h-full hover:bg-neutral-100 text-neutral-600 hover:text-black transition-colors"
            aria-label="Crește cantitatea"
          >
            <Plus className="w-4 h-4" />
          </button>
        </div>

        {/* Primary CTA */}
        <button
          type="button"
          onClick={handleAdd}
          className={`flex-1 h-12 px-6 font-mono font-bold text-xs uppercase tracking-wider flex items-center justify-center gap-2 transition-all ${
            justAdded
              ? "bg-[#2E7D32] text-white"
              : "bg-[#F26A21] hover:bg-[#ff7b36] text-black shadow-sm"
          }`}
        >
          {justAdded ? (
            <>
              <Check className="w-4 h-4" />
              <span>ADĂUGAT ÎN LISTĂ</span>
            </>
          ) : (
            <>
              <span>ADAUGĂ LA CEREREA DE OFERTĂ</span>
              <ArrowRight className="w-4 h-4" />
            </>
          )}
        </button>
      </div>

      {/* View current list or proceed to form */}
      <div className="flex items-center justify-between text-xs font-mono text-neutral-500 pt-1">
        <button
          type="button"
          onClick={() => setIsDrawerOpen(true)}
          className="hover:text-[#111416] underline underline-offset-4 transition-colors"
        >
          Vezi lista curentă de ofertă &rarr;
        </button>

        <Link
          href="/solicita-oferta"
          className="text-[#F26A21] hover:underline font-semibold"
        >
          Finalizează cererea acum
        </Link>
      </div>

      <div className="pt-2 flex items-center gap-2 text-[11px] font-mono text-neutral-500">
        <ShieldCheck className="w-4 h-4 text-[#E9CF38] shrink-0" />
        <span>Fără cont necesar. Oferta personalizată se transmite pe e-mail sau telefon.</span>
      </div>
    </div>
  );
}
