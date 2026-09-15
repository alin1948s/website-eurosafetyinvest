import React from "react";
import Link from "next/link";
import { CategoryMeta } from "@/lib/types";
import { ArrowRight } from "lucide-react";

interface CategoryCardProps {
  category: CategoryMeta;
  itemCount?: number;
  featured?: boolean;
}

export function CategoryCard({ category, itemCount }: CategoryCardProps) {
  const countsMap: Record<string, number> = {
    "protectia-capului": 28,
    "protectia-corpului": 64,
    "protectia-mainilor": 52,
    "protectia-picioarelor": 46,
    "siguranta-muncii": 20,
    "lucru-la-inaltime": 20,
  };

  const count = itemCount ?? countsMap[category.slug] ?? 25;

  return (
    <Link
      href={`/produse/${category.slug}`}
      className="group bg-white border border-[#E2E5E8] hover:border-[#111416] hover:shadow-md transition-all duration-200 flex flex-col justify-between h-full relative overflow-hidden"
    >
      {/* Top Image Showcase Stage - Compact & High-Contrast */}
      <div className="h-32 sm:h-40 w-full bg-[#FAF9F5] group-hover:bg-[#F3F1EB] flex items-center justify-center p-2.5 sm:p-4 relative border-b border-[#EAECE8] transition-colors overflow-hidden">
        {/* Top left category index */}
        <div className="absolute top-2 left-2 z-10">
          <span className="px-1.5 py-0.2 text-[9px] font-mono font-bold uppercase tracking-wider bg-[#111416] text-[#E9CF38]">
            {category.index}
          </span>
        </div>

        {/* Top right product count */}
        <div className="absolute top-2 right-2 z-10">
          <span className="px-1.5 py-0.2 text-[9px] font-mono font-semibold bg-white border border-[#D8DCE0] text-neutral-600 shadow-xs">
            {count} art.
          </span>
        </div>

        {/* Clean product photo - Prominent and centered */}
        <img
          src={category.image}
          alt={category.name}
          className="max-h-[95px] sm:max-h-[125px] w-auto object-contain transition-transform duration-300 group-hover:scale-105 drop-shadow-sm"
          loading="lazy"
        />
      </div>

      {/* Card Content - Compact & Scannable */}
      <div className="p-3 sm:p-4 flex-1 flex flex-col justify-between space-y-2 sm:space-y-3">
        <div className="space-y-1">
          <h3 className="text-xs sm:text-sm font-extrabold text-[#111416] group-hover:text-[#F26A21] transition-colors leading-snug">
            {category.name}
          </h3>
          <p className="text-[11px] text-neutral-500 line-clamp-1 sm:line-clamp-2 leading-relaxed font-sans">
            {category.tagline}
          </p>
        </div>

        {/* Subcategories tags - compact preview */}
        <div className="hidden sm:block space-y-1">
          <div className="flex flex-wrap gap-1">
            {category.subcategories.slice(0, 3).map((sub) => (
              <span
                key={sub.slug}
                className="text-[9px] font-mono px-1.5 py-0.2 bg-[#FAF9F5] text-neutral-600 border border-[#EAECE8]"
              >
                {sub.name}
              </span>
            ))}
          </div>
        </div>

        {/* Bottom Explore Link */}
        <div className="pt-2 border-t border-[#F0F2F4] flex items-center justify-between text-[11px] sm:text-xs font-mono font-bold text-[#111416] group-hover:text-[#F26A21] transition-colors">
          <span>CATALOG</span>
          <ArrowRight className="w-3 h-3 group-hover:translate-x-1 transition-transform text-[#F26A21]" />
        </div>
      </div>
    </Link>
  );
}
