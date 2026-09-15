import React from "react";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Metadata } from "next";
import { CATEGORIES, getCategoryBySlug, getSubcategoryBySlug } from "@/data/taxonomy";
import { getProductsBySubcategory } from "@/data/catalog";
import { ProductGrid } from "@/components/catalog/ProductGrid";
import { SubcategoryTabs } from "@/components/catalog/SubcategoryTabs";

interface PageProps {
  params: Promise<{
    category: string;
    subcategory: string;
  }>;
}

export async function generateStaticParams() {
  const params: { category: string; subcategory: string }[] = [];
  CATEGORIES.forEach((cat) => {
    cat.subcategories.forEach((sub) => {
      params.push({
        category: cat.slug,
        subcategory: sub.slug,
      });
    });
  });
  return params;
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { category: catSlug, subcategory: subSlug } = await params;
  const category = getCategoryBySlug(catSlug);
  const subcategory = getSubcategoryBySlug(catSlug, subSlug);

  if (!category || !subcategory) return { title: "Subcategorie Negăsită" };

  return {
    title: `${subcategory.name} — ${category.name} | Euro Safety Invest`,
    description: subcategory.description,
  };
}

export default async function SubcategoryPage({ params }: PageProps) {
  const { category: catSlug, subcategory: subSlug } = await params;
  const category = getCategoryBySlug(catSlug);
  const subcategory = getSubcategoryBySlug(catSlug, subSlug);

  if (!category || !subcategory) {
    notFound();
  }

  const products = getProductsBySubcategory(subcategory.slug);

  return (
    <div className="w-full bg-[#FAF9F5] min-h-screen py-8">
      <div className="max-w-[1360px] mx-auto px-4 sm:px-6 space-y-6">
        {/* Breadcrumb */}
        <div className="flex flex-wrap items-center gap-2 text-xs font-mono text-neutral-500 uppercase">
          <Link href="/" className="hover:text-black">
            ACASĂ
          </Link>
          <span>/</span>
          <Link href="/produse" className="hover:text-black">
            PRODUSE
          </Link>
          <span>/</span>
          <Link href={`/produse/${category.slug}`} className="hover:text-black">
            {category.name}
          </Link>
          <span>/</span>
          <span className="text-[#F26A21] font-bold">{subcategory.name}</span>
        </div>

        {/* Heading & Short Intro */}
        <div className="space-y-1 border-b border-[#E2E5E8] pb-4">
          <div className="flex items-center gap-2 text-xs font-mono text-[#E9CF38] bg-[#111416] px-2.5 py-0.5 inline-block">
            {category.name.toUpperCase()} &bull; {subcategory.name.toUpperCase()}
          </div>
          <h1 className="text-3xl sm:text-4xl font-extrabold text-[#111416] tracking-tight">
            {subcategory.name}
          </h1>
          <p className="text-xs sm:text-sm text-neutral-600">
            {subcategory.description}
          </p>
        </div>

        {/* Subcategories Horizontal Tabs */}
        <SubcategoryTabs
          categorySlug={category.slug}
          subcategories={category.subcategories}
          activeSubcategorySlug={subcategory.slug}
          totalProductsCount={products.length}
        />

        {/* Products Grid & Filters */}
        <ProductGrid products={products} categoryTitle={subcategory.name} />
      </div>
    </div>
  );
}
