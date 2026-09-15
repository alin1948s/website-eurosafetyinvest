"use client";

import React, { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { Product } from "@/lib/types";
import { useQuote } from "@/context/QuoteContext";
import { ArrowRight, Check, Plus, Shield } from "lucide-react";

interface ProductCardProps {
  product: Product;
}

export function ProductCard({ product }: ProductCardProps) {
  const { addItem } = useQuote();
  const [selectedColor, setSelectedColor] = useState<string | undefined>(
    product.colors[0]?.name
  );
  const [addedAnimation, setAddedAnimation] = useState(false);

  const handleQuickAdd = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    addItem(product, 1, selectedColor);
    setAddedAnimation(true);
    setTimeout(() => setAddedAnimation(false), 1500);
  };

  return (
    <div className="group relative flex flex-col bg-white border border-[#E2E5E8] hover:border-[#111416] transition-all duration-200 overflow-hidden">
      {/* Top Technical Micro-Bar */}
      <div className="px-3.5 py-2 bg-[#FAF9F5] border-b border-[#EAECE8] flex items-center justify-between text-[10px] font-mono text-neutral-500">
        <span className="uppercase tracking-wider font-semibold text-neutral-700">
          {product.subcategory}
        </span>
        <span className="text-[#111416] font-bold">
          COD: {product.code}
        </span>
      </div>

      {/* Image Stage */}
      <Link
        href={`/produs/${product.slug}`}
        className="relative block w-full aspect-square bg-[#F6F5F1] p-3 sm:p-5 overflow-hidden flex items-center justify-center group-hover:bg-[#F2F1EC] transition-colors"
      >
        {product.images[0] ? (
          <Image
            src={product.images[0]}
            alt={product.name}
            width={280}
            height={280}
            className="object-contain w-full h-full max-h-[160px] sm:max-h-[220px] transition-transform duration-300 ease-out group-hover:scale-105"
            sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
          />
        ) : (
          <div className="w-full h-full flex flex-col items-center justify-center text-neutral-400">
            <Shield className="w-8 sm:w-12 h-8 sm:h-12 stroke-1 text-neutral-300 mb-1" />
            <span className="text-[10px] sm:text-xs font-mono">FOTO ÎN CATALOG</span>
          </div>
        )}

        {/* Technical Standard Badges */}
        {product.standards.length > 0 && (
          <div className="absolute top-2 left-2 flex flex-wrap gap-1">
            {product.standards.slice(0, 2).map((std) => (
              <span
                key={std}
                className="px-1.5 py-0.2 text-[8px] sm:text-[9px] font-mono font-bold bg-[#111416] text-white tracking-wider"
              >
                {std}
              </span>
            ))}
          </div>
        )}

        {product.customizationAvailable && (
          <div className="absolute bottom-2 left-2">
            <span className="px-1.5 py-0.2 text-[8px] sm:text-[9px] font-mono font-medium bg-[#E9CF38] text-black tracking-wider">
              PERSONALIZABIL
            </span>
          </div>
        )}
      </Link>

      {/* Content */}
      <div className="p-2.5 sm:p-4 flex-1 flex flex-col justify-between space-y-2.5 sm:space-y-3">
        <div>
          <Link
            href={`/produs/${product.slug}`}
            className="block text-xs sm:text-sm font-bold text-[#111416] group-hover:text-[#F26A21] transition-colors line-clamp-2 leading-snug"
          >
            {product.name}
          </Link>

          {/* Color swatches with names */}
          {product.colors.length > 0 && (
            <div className="mt-1.5 sm:mt-2.5 pt-1.5 sm:pt-2 border-t border-[#F0F1EE]">
              <div className="text-[9px] sm:text-[10px] font-mono text-neutral-500 mb-1 flex items-center justify-between">
                <span className="hidden sm:inline">CULORI:</span>
                {selectedColor && (
                  <span className="font-semibold text-neutral-800 truncate max-w-[100px]">{selectedColor}</span>
                )}
              </div>
              <div className="flex flex-wrap items-center gap-1 sm:gap-1.5">
                {product.colors.slice(0, 5).map((col) => {
                  const isSelected = selectedColor === col.name;
                  return (
                    <button
                      key={col.name}
                      type="button"
                      onClick={(e) => {
                        e.preventDefault();
                        e.stopPropagation();
                        setSelectedColor(col.name);
                      }}
                      title={col.name}
                      className={`w-3.5 h-3.5 sm:w-4 sm:h-4 rounded-none border transition-all ${
                        isSelected
                          ? "ring-2 ring-[#111416] ring-offset-1 border-[#111416]"
                          : "border-neutral-300 hover:scale-110"
                      }`}
                      style={{ backgroundColor: col.displayColor || "#888888" }}
                    />
                  );
                })}
                {product.colors.length > 5 && (
                  <span className="text-[9px] sm:text-[10px] font-mono text-neutral-500 pl-0.5">
                    +{product.colors.length - 5}
                  </span>
                )}
              </div>
            </div>
          )}
        </div>

        {/* Card Footer Actions */}
        <div className="pt-2 border-t border-[#EAECE8] flex items-center justify-between gap-1.5">
          <button
            type="button"
            onClick={handleQuickAdd}
            className={`flex-1 py-1.5 sm:py-2 px-2 text-[10px] sm:text-xs font-mono font-bold uppercase tracking-wider flex items-center justify-center gap-1 transition-all ${
              addedAnimation
                ? "bg-[#2E7D32] text-white"
                : "bg-[#111416] hover:bg-[#F26A21] text-white"
            }`}
          >
            {addedAnimation ? (
              <>
                <Check className="w-3 h-3" />
                <span>ADĂUGAT</span>
              </>
            ) : (
              <>
                <Plus className="w-3 h-3 text-[#E9CF38]" />
                <span className="hidden sm:inline">ADAUGĂ LA OFERTĂ</span>
                <span className="sm:hidden">OFERTĂ</span>
              </>
            )}
          </button>

          <Link
            href={`/produs/${product.slug}`}
            className="p-1.5 sm:p-2 text-neutral-400 hover:text-[#111416] hover:bg-neutral-100 transition-colors shrink-0"
            title="Vezi detalii complete"
          >
            <ArrowRight className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
          </Link>
        </div>
      </div>
    </div>
  );
}
