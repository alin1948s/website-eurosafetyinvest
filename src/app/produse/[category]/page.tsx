import React from "react";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Metadata } from "next";
import { CATEGORIES, getCategoryBySlug } from "@/data/taxonomy";
import { getProductsByCategory } from "@/data/catalog";
import { ProductGrid } from "@/components/catalog/ProductGrid";
import { SubcategoryTabs } from "@/components/catalog/SubcategoryTabs";

interface PageProps {
  params: Promise<{
    category: string;
  }>;
}

export async function generateStaticParams() {
  return CATEGORIES.map((cat) => ({
    category: cat.slug,
  }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { category: categorySlug } = await params;
  const category = getCategoryBySlug(categorySlug);
  if (!category) return { title: "Categorie Negăsită" };

  return {
    title: `${category.name} | Echipamente de Protecție`,
    description: category.description,
  };
}

export default async function CategoryPage({ params }: PageProps) {
  const { category: categorySlug } = await params;
  const category = getCategoryBySlug(categorySlug);

  if (!category) {
    notFound();
  }

  const products = getProductsByCategory(category.slug);

  return (
    <div className="w-full bg-[#FAF9F5] min-h-screen py-8">
      <div className="max-w-[1360px] mx-auto px-4 sm:px-6 space-y-6">
        {/* Breadcrumb */}
        <div className="flex items-center gap-2 text-xs font-mono text-neutral-500 uppercase">
          <Link href="/" className="hover:text-black">
            ACASĂ
          </Link>
          <span>/</span>
          <Link href="/produse" className="hover:text-black">
            PRODUSE
          </Link>
          <span>/</span>
          <span className="text-[#F26A21] font-bold">{category.name}</span>
        </div>

        {/* Heading & Short Intro (Rule 24: Max 1 short intro sentence) */}
        <div className="space-y-1 border-b border-[#E2E5E8] pb-4">
          <div className="flex items-center gap-2 text-xs font-mono text-[#E9CF38] bg-[#111416] px-2.5 py-0.5 inline-block">
            {category.index} / {category.name.toUpperCase()}
          </div>
          <h1 className="text-3xl sm:text-4xl font-extrabold text-[#111416] tracking-tight">
            {category.name}
          </h1>
          <p className="text-xs sm:text-sm text-neutral-600">
            {category.description}
          </p>
        </div>

        {/* Subcategories Horizontal Tabs */}
        <SubcategoryTabs
          categorySlug={category.slug}
          subcategories={category.subcategories}
          totalProductsCount={products.length}
        />

        {/* Products Grid & Filters */}
        <ProductGrid products={products} categoryTitle={category.name} />
      </div>
    </div>
  );
}
