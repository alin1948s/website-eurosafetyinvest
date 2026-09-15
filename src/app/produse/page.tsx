import React from "react";
import Link from "next/link";
import { Metadata } from "next";
import { CATEGORIES } from "@/data/taxonomy";
import { catalog } from "@/data/catalog";
import { ProductGrid } from "@/components/catalog/ProductGrid";
import { CategoryCard } from "@/components/catalog/CategoryCard";
import { ArrowRight, Shield } from "lucide-react";

export const metadata: Metadata = {
  title: "Catalog Echipamente de Protecție & E.I.P.",
  description:
    "Explorează catalogul complet Euro Safety Invest: peste 200 de echipamente de protecție individuală (EIP) organizate în 5 mari categorii industriale.",
};

export default function CatalogOverviewPage() {
  return (
    <div className="w-full bg-[#FAF9F5] min-h-screen py-10">
      <div className="max-w-[1360px] mx-auto px-4 sm:px-6 space-y-12">
        {/* Breadcrumb & Header */}
        <div className="space-y-2 border-b border-[#E2E5E8] pb-6">
          <div className="flex items-center gap-2 text-xs font-mono text-neutral-500 uppercase">
            <Link href="/" className="hover:text-black">
              ACASĂ
            </Link>
            <span>/</span>
            <span className="text-[#F26A21] font-bold">CATALOG GENERAL</span>
          </div>

          <h1 className="text-3xl sm:text-5xl font-extrabold text-[#111416] tracking-tight">
            Catalog Echipamente de Protecție
          </h1>
          <p className="text-sm text-neutral-600 max-w-2xl">
            Descoperă gama completă de produse pentru securitate industrială, protecție craniană, corporală, a mâinilor, încălțăminte tehnică și sisteme de salvare la înălțime.
          </p>
        </div>

        {/* 5 Major Categories Visual Grid */}
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <span className="text-xs font-mono font-bold uppercase text-neutral-500 tracking-wider">
              CELE 5 CATEGORII PRINCIPALE
            </span>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-5">
            {CATEGORIES.map((cat) => (
              <CategoryCard key={cat.slug} category={cat} />
            ))}
          </div>
        </div>

        {/* All Products Grid with Filters */}
        <div className="space-y-6 pt-6 border-t border-[#E2E5E8]">
          <div className="space-y-1">
            <span className="text-xs font-mono font-bold text-[#F26A21] uppercase tracking-wider block">
              TOATE PRODUSELE DIN CATALOG
            </span>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-[#111416] tracking-tight">
              Filtrează și explorează întregul catalog (210 articole)
            </h2>
          </div>

          <ProductGrid products={catalog} />
        </div>
      </div>
    </div>
  );
}
