import React from "react";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Metadata } from "next";
import { catalog, getProductBySlug } from "@/data/catalog";
import { ProductGallery } from "@/components/product-detail/ProductGallery";
import { SpecificationTable } from "@/components/product-detail/SpecificationTable";
import { ProductInteractiveSection } from "@/components/product-detail/ProductInteractiveSection";
import { ProductCard } from "@/components/catalog/ProductCard";
import { ShieldCheck, ArrowLeft, ArrowRight, Shield } from "lucide-react";

interface ProductPageProps {
  params: Promise<{
    slug: string;
  }>;
}

export async function generateStaticParams() {
  return catalog.map((p) => ({
    slug: p.slug,
  }));
}

export async function generateMetadata({
  params,
}: ProductPageProps): Promise<Metadata> {
  const { slug } = await params;
  const product = getProductBySlug(slug);

  if (!product) {
    return { title: "Produs Negăsit" };
  }

  return {
    title: `${product.name} (Cod ${product.code}) | Euro Safety Invest`,
    description: product.shortDescription || `${product.name} conform standardelor europene. Solicită ofertă de preț.`,
    openGraph: {
      title: `${product.name} — Echipament de Protecție`,
      description: product.shortDescription,
      images: product.images[0] ? [{ url: product.images[0] }] : [],
    },
  };
}

export default async function ProductDetailPage({ params }: ProductPageProps) {
  const { slug } = await params;
  const product = getProductBySlug(slug);

  if (!product) {
    notFound();
  }

  // Related products from same subcategory
  const relatedProducts = catalog
    .filter((p) => p.subcategorySlug === product.subcategorySlug && p.id !== product.id)
    .slice(0, 4);

  // JSON-LD Product Schema
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Product",
    name: product.name,
    image: product.images[0]
      ? `https://eurosafetyinvest.ro${product.images[0]}`
      : undefined,
    description: product.shortDescription,
    sku: product.code,
    category: `${product.category} > ${product.subcategory}`,
    offers: {
      "@type": "AggregateOffer",
      priceCurrency: "RON",
      availability: "https://schema.org/InStock",
      price: "0",
      description: "Preț la cerere de ofertă",
    },
  };

  return (
    <div className="w-full bg-[#FAF9F5] min-h-screen py-8">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <div className="max-w-[1360px] mx-auto px-4 sm:px-6 space-y-10">
        {/* Breadcrumb Bar */}
        <div className="flex flex-wrap items-center gap-2 text-xs font-mono text-neutral-500 uppercase border-b border-[#E2E5E8] pb-3">
          <Link href="/" className="hover:text-black">
            ACASĂ
          </Link>
          <span>/</span>
          <Link href="/produse" className="hover:text-black">
            PRODUSE
          </Link>
          <span>/</span>
          <Link href={`/produse/${product.categorySlug}`} className="hover:text-black">
            {product.category}
          </Link>
          <span>/</span>
          <Link
            href={`/produse/${product.categorySlug}/${product.subcategorySlug}`}
            className="hover:text-black"
          >
            {product.subcategory}
          </Link>
          <span>/</span>
          <span className="text-[#F26A21] font-bold truncate max-w-[220px]">
            {product.code}
          </span>
        </div>

        {/* Two-Column Split Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-start">
          {/* Left Column (55%): Gallery */}
          <div className="lg:col-span-7">
            <ProductGallery images={product.images} productName={product.name} />
          </div>

          {/* Right Column (45%): Technical Details & Quote Action */}
          <div className="lg:col-span-5 space-y-6 bg-white p-6 sm:p-8 border border-[#E2E5E8] shadow-sm">
            {/* Top Micro-Label & Code */}
            <div className="flex items-center justify-between border-b border-[#EAECE8] pb-3">
              <span className="text-[11px] font-mono font-bold text-[#E9CF38] bg-[#111416] px-2 py-0.5 uppercase tracking-wider">
                {product.subcategory}
              </span>
              <div className="text-right">
                <span className="text-[10px] font-mono text-neutral-400 block">COD PRODUS</span>
                <span className="text-sm font-mono font-bold text-[#111416]">
                  {product.code}
                </span>
              </div>
            </div>

            {/* Product Name */}
            <div>
              <h1 className="text-2xl sm:text-3xl font-extrabold text-[#111416] tracking-tight leading-snug">
                {product.name}
              </h1>
              {product.standards.length > 0 && (
                <div className="flex flex-wrap gap-1.5 mt-2.5">
                  {product.standards.map((std) => (
                    <span
                      key={std}
                      className="px-2 py-0.5 text-xs font-mono font-bold bg-[#111416] text-white tracking-wider"
                    >
                      {std}
                    </span>
                  ))}
                </div>
              )}
            </div>

            {/* Short Technical Description */}
            <p className="text-xs sm:text-sm text-neutral-600 leading-relaxed">
              {product.shortDescription}
            </p>

            {/* Interactive Color, Size, and Quote Section */}
            <ProductInteractiveSection product={product} />
          </div>
        </div>

        {/* Bottom Technical Specifications & Features */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 pt-4">
          {/* Left: Detailed Specs Table */}
          <div className="lg:col-span-7 space-y-4">
            <SpecificationTable
              specifications={product.specifications}
              standards={product.standards}
              materials={product.materials}
              sizes={product.sizes}
              code={product.code}
            />
          </div>

          {/* Right: Verified Technical Features */}
          <div className="lg:col-span-5 space-y-4">
            <div className="bg-white border border-[#E2E5E8] p-6 space-y-3">
              <span className="text-xs font-mono font-bold uppercase text-[#111416] tracking-wider block border-b border-[#EAECE8] pb-2">
                CARACTERISTICI PRINCIPALE
              </span>

              {product.features.length > 0 ? (
                <ul className="space-y-2 text-xs text-neutral-700">
                  {product.features.map((feat, idx) => (
                    <li key={idx} className="flex items-start gap-2">
                      <span className="w-1.5 h-1.5 bg-[#F26A21] mt-1.5 shrink-0" />
                      <span className="leading-relaxed">{feat}</span>
                    </li>
                  ))}
                </ul>
              ) : (
                <p className="text-xs text-neutral-600 leading-relaxed">
                  Produs profesional omologat pentru protecția muncii conform fișei tehnice oficiale a producătorului.
                </p>
              )}

              {product.customizationAvailable && (
                <div className="mt-4 p-3 bg-[#FAF9F5] border border-[#E9CF38] flex items-start gap-2 text-xs text-neutral-800">
                  <ShieldCheck className="w-4 h-4 text-[#F26A21] shrink-0 mt-0.5" />
                  <div>
                    <span className="font-bold">Opțiune personalizare:</span> Acest produs poate fi inscripționat cu logo-ul sau denumirea companiei prin serigrafie sau broderie.
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Related Products from same subcategory */}
        {relatedProducts.length > 0 && (
          <div className="space-y-6 pt-10 border-t border-[#E2E5E8]">
            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <span className="text-xs font-mono font-bold text-[#F26A21] uppercase tracking-wider block">
                  ECHIPAMENTE SIMILARE
                </span>
                <h3 className="text-xl sm:text-2xl font-bold text-[#111416]">
                  Alte produse din categoria {product.subcategory}
                </h3>
              </div>

              <Link
                href={`/produse/${product.categorySlug}/${product.subcategorySlug}`}
                className="text-xs font-mono font-bold text-[#111416] hover:text-[#F26A21] flex items-center gap-1"
              >
                <span>Vezi toate</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {relatedProducts.map((p) => (
                <ProductCard key={p.id} product={p} />
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
