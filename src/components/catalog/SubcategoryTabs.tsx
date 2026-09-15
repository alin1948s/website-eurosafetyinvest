"use client";

import React from "react";
import Link from "next/link";
import { SubcategoryMeta } from "@/lib/types";

interface SubcategoryTabsProps {
  categorySlug: string;
  subcategories: SubcategoryMeta[];
  activeSubcategorySlug?: string;
  totalProductsCount?: number;
}

export function SubcategoryTabs({
  categorySlug,
  subcategories,
  activeSubcategorySlug,
  totalProductsCount,
}: SubcategoryTabsProps) {
  return (
    <div className="w-full border-b border-[#E2E5E8] pb-4 mb-6">
      <div className="flex items-center gap-2 overflow-x-auto pb-1 scrollbar-none">
        {/* "Toate" link */}
        <Link
          href={`/produse/${categorySlug}`}
          className={`px-3.5 py-2 text-xs font-mono font-semibold uppercase tracking-wider shrink-0 border transition-all ${
            !activeSubcategorySlug
              ? "bg-[#111416] text-white border-[#111416]"
              : "bg-white text-neutral-600 border-[#D7DAD8] hover:border-[#111416] hover:text-[#111416]"
          }`}
        >
          <span>TOATE SUBCATEGORIILE</span>
          {totalProductsCount !== undefined && (
            <span className="ml-1.5 opacity-70 font-normal">({totalProductsCount})</span>
          )}
        </Link>

        {/* Subcategories list */}
        {subcategories.map((sub) => {
          const isActive = activeSubcategorySlug === sub.slug;
          return (
            <Link
              key={sub.slug}
              href={`/produse/${categorySlug}/${sub.slug}`}
              className={`px-3.5 py-2 text-xs font-mono font-medium uppercase tracking-wider shrink-0 border transition-all ${
                isActive
                  ? "bg-[#111416] text-white border-[#111416]"
                  : "bg-white text-neutral-600 border-[#D7DAD8] hover:border-[#111416] hover:text-[#111416]"
              }`}
            >
              <span>{sub.name}</span>
            </Link>
          );
        })}
      </div>
    </div>
  );
}
