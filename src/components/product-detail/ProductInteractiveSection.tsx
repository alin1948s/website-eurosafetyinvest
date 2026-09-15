"use client";

import React, { useState } from "react";
import { Product } from "@/lib/types";
import { ColorSelector } from "./ColorSelector";
import { AddToQuoteSection } from "./AddToQuoteSection";

interface ProductInteractiveSectionProps {
  product: Product;
}

export function ProductInteractiveSection({ product }: ProductInteractiveSectionProps) {
  const [selectedColor, setSelectedColor] = useState<string | undefined>(
    product.colors[0]?.name
  );
  const [selectedSize, setSelectedSize] = useState<string | undefined>(
    product.sizes[0]
  );

  return (
    <div className="space-y-6">
      {/* Colors Section */}
      {product.colors.length > 0 && (
        <ColorSelector
          colors={product.colors}
          selectedColor={selectedColor}
          onSelectColor={setSelectedColor}
        />
      )}

      {/* Sizes Selection */}
      {product.sizes.length > 0 && (
        <div className="space-y-2 py-3 border-t border-[#EAECE8]">
          <div className="flex items-center justify-between text-xs font-mono">
            <span className="font-bold uppercase tracking-wider text-[#111416]">
              MĂRIMI DISPONIBILE
            </span>
            {selectedSize && (
              <span className="text-neutral-600 font-semibold">Selectat: {selectedSize}</span>
            )}
          </div>
          <div className="flex flex-wrap gap-1.5">
            {product.sizes.map((sz) => {
              const isSelected = selectedSize === sz;
              return (
                <button
                  key={sz}
                  type="button"
                  onClick={() => setSelectedSize(sz)}
                  className={`px-3 py-1.5 text-xs font-mono border transition-all ${
                    isSelected
                      ? "bg-[#111416] text-white border-[#111416] font-bold shadow-sm"
                      : "bg-[#FAF9F5] border-neutral-300 text-neutral-800 hover:border-black font-semibold"
                  }`}
                >
                  {sz}
                </button>
              );
            })}
          </div>
        </div>
      )}

      {/* Add To Quote Action */}
      <AddToQuoteSection
        product={product}
        selectedColor={selectedColor}
        selectedSize={selectedSize}
      />
    </div>
  );
}
