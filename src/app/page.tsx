import React from "react";
import Link from "next/link";
import Image from "next/image";
import { CATEGORIES } from "@/data/taxonomy";
import { getFeaturedProducts } from "@/data/catalog";
import { ProductCard } from "@/components/catalog/ProductCard";
import { CategoryCard } from "@/components/catalog/CategoryCard";
import { ClientPortfolio } from "@/components/sections/ClientPortfolio";
import {
  ArrowRight,
  ShieldCheck,
  Award,
  Truck,
  CheckCircle2,
  Phone,
  Mail,
  Printer,
  Sparkles,
  ChevronRight,
  Shield,
  Layers,
} from "lucide-react";

export default function HomePage() {
  const featuredProducts = getFeaturedProducts().slice(0, 8);

  const heroFeaturedItems = [
    {
      title: "Căști Protecție",
      model: "Guamo Dielectrică",
      code: "111-1-G1",
      standard: "EN 397",
      image: "/poze/casti/guamo.jpg",
      href: "/produse/protectia-capului/casti",
      categoryIndex: "01 / CAP",
    },
    {
      title: "Pantofi Siguranță",
      model: "Bari Bombeu Metalic",
      code: "BARI S1",
      standard: "EN 345 S1",
      image: "/poze/pantofi/bari.jpg",
      href: "/produse/protectia-picioarelor/pantofi",
      categoryIndex: "04 / PICIOARE",
    },
    {
      title: "Mănuși Nitril",
      model: "Nitex Rezistență Chimică",
      code: "331-1",
      standard: "EN 388",
      image: "/poze/manusi cauciuc/Nitex.jpg",
      href: "/produse/protectia-mainilor/manusi-cauciuc",
      categoryIndex: "03 / MÂINI",
    },
    {
      title: "Costume Salopetă",
      model: "Doc Rotar / Tercot",
      code: "CSS-01",
      standard: "Personalizabil",
      image: "/poze/imbracaminte/css.jpg",
      href: "/produse/protectia-corpului/costume-salopeta",
      categoryIndex: "02 / CORP",
    },
  ];

  return (
    <div className="flex flex-col w-full bg-white">
      {/* ===================================================
          01. HERO SECTION — COMPACT, PROPORTIONATE & IMPACTFUL
          =================================================== */}
      <section className="relative bg-[#111416] text-white border-b border-[#22292E] overflow-hidden">
        {/* Subtle background glow & grid */}
        <div className="absolute inset-0 tech-grid-dark opacity-20 pointer-events-none" />
        <div className="absolute top-0 right-1/4 w-80 h-80 bg-[#F26A21]/10 blur-3xl pointer-events-none rounded-full" />

        <div className="max-w-[1360px] mx-auto px-4 sm:px-6 py-8 sm:py-14 lg:py-16 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-10 items-center">
            {/* Left 55%: Value Proposition */}
            <div className="lg:col-span-7 space-y-4 sm:space-y-5">
              <div className="inline-flex items-center gap-2 px-2.5 py-1 bg-[#1B2024] border border-[#2B343B] text-[10px] sm:text-[11px] font-mono tracking-wider text-[#E9CF38] uppercase">
                <span className="w-2 h-2 rounded-full bg-[#F26A21] animate-pulse" />
                <span>DISTRIBUITOR ECHIPAMENTE PROTECȚIE &bull; CONSTANȚA & NAȚIONAL</span>
              </div>

              <h1 className="text-2xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-white leading-tight">
                Protecție completă <br className="hidden sm:inline" />
                pentru <span className="text-[#F26A21]">fiecare echipă</span> de lucru.
              </h1>

              <p className="text-xs sm:text-sm text-neutral-300 max-w-xl font-normal leading-relaxed font-sans">
                Catalog profesional cu peste <strong>210 echipamente de protecție individuală</strong> conforme cu standardele europene EN/CE și avizate M.M.S.S. Echipăm companii din industrie, domeniul portuar, construcții și utilități. Fără cont necesar — cotație directă de preț.
              </p>

              {/* CTAs */}
              <div className="pt-1 flex flex-wrap items-center gap-2.5 sm:gap-3.5">
                <Link
                  href="/produse"
                  className="h-10 sm:h-12 px-5 sm:px-6 bg-[#F26A21] hover:bg-[#ff7b36] text-black font-mono font-bold text-xs uppercase tracking-wider flex items-center justify-center gap-2 transition-all shadow-md"
                >
                  <span>VEZI CATALOGUL (210 ARTICOLE)</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </Link>

                <Link
                  href="/solicita-oferta"
                  className="h-10 sm:h-12 px-4 sm:px-5 bg-[#1B2024] hover:bg-[#252D34] text-white border border-[#2B343B] hover:border-neutral-400 font-mono font-bold text-xs uppercase tracking-wider flex items-center justify-center gap-2 transition-all"
                >
                  <span>SOLICITĂ OFERTĂ RAPIDĂ</span>
                </Link>

                <a
                  href="tel:0720300211"
                  className="h-10 sm:h-12 px-3 bg-transparent hover:bg-white/5 text-neutral-300 hover:text-white font-mono text-xs flex items-center gap-1.5 transition-colors border border-transparent hover:border-neutral-700"
                >
                  <Phone className="w-3.5 h-3.5 text-[#E9CF38]" />
                  <span>0720 300 211</span>
                </a>
              </div>

              {/* Verified Trust Badges */}
              <div className="pt-4 border-t border-[#22292E] grid grid-cols-3 gap-2 sm:gap-3 font-mono text-[10px] sm:text-[11px] text-neutral-400">
                <div className="space-y-0.5">
                  <div className="font-bold text-white text-xs">210+ ARTICOLE</div>
                  <div className="text-[10px] text-neutral-400">Catalog verificat</div>
                </div>
                <div className="space-y-0.5 border-l border-[#22292E] pl-2.5">
                  <div className="font-bold text-white text-xs">CE &bull; M.M.S.S.</div>
                  <div className="text-[10px] text-neutral-400">Conformitate ITM</div>
                </div>
                <div className="space-y-0.5 border-l border-[#22292E] pl-2.5">
                  <div className="font-bold text-white text-xs">PERSONALIZARE</div>
                  <div className="text-[10px] text-neutral-400">Serigrafie & broderie</div>
                </div>
              </div>
            </div>

            {/* Right 45%: Compact, High-Impact Product Showcase Stage */}
            <div className="lg:col-span-5">
              <div className="bg-[#171B1F] border border-[#2B343B] p-3 sm:p-4 shadow-xl">
                {/* Header bar of the showcase */}
                <div className="flex items-center justify-between text-[10px] font-mono text-neutral-400 border-b border-[#262E35] pb-2 mb-3">
                  <div className="flex items-center gap-1.5">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#E9CF38]" />
                    <span className="font-bold text-white uppercase text-[10px]">ECHIPAMENTE DE VÂRF</span>
                  </div>
                  <Link
                    href="/produse"
                    className="text-[#F26A21] hover:underline flex items-center gap-0.5 font-bold text-[10px]"
                  >
                    <span>CATALOG</span>
                    <ChevronRight className="w-3 h-3" />
                  </Link>
                </div>

                {/* 4 Compact Product Cards with PROMINENT, LARGE imagery */}
                <div className="grid grid-cols-2 gap-2 sm:gap-2.5">
                  {heroFeaturedItems.map((item) => (
                    <Link
                      key={item.code}
                      href={item.href}
                      className="bg-white border border-[#E2E5E8] hover:border-[#111416] p-2 sm:p-2.5 flex flex-col justify-between group transition-all"
                    >
                      {/* Top micro metadata */}
                      <div className="flex items-center justify-between text-[8px] sm:text-[9px] font-mono mb-1 text-neutral-500">
                        <span className="font-bold text-neutral-700">{item.categoryIndex}</span>
                        <span className="px-1 py-0.2 bg-[#FAF9F5] border border-neutral-200 text-[#111416] font-semibold">
                          {item.standard}
                        </span>
                      </div>

                      {/* Large Product Photo Stage */}
                      <div className="w-full h-24 sm:h-28 bg-[#FAF9F5] group-hover:bg-white flex items-center justify-center p-1.5 my-1 transition-colors">
                        <img
                          src={item.image}
                          alt={item.title}
                          className="max-h-20 sm:max-h-24 w-auto object-contain transition-transform duration-200 group-hover:scale-105 drop-shadow-sm"
                        />
                      </div>

                      {/* Product Name & Code */}
                      <div className="pt-1.5 border-t border-[#F0F2F4] mt-1 space-y-0.5">
                        <div className="text-[11px] sm:text-xs font-bold text-[#111416] group-hover:text-[#F26A21] transition-colors truncate">
                          {item.title}
                        </div>
                        <div className="text-[9px] sm:text-[10px] font-mono text-neutral-500 flex items-center justify-between">
                          <span className="truncate">{item.model.split(" ")[0]}</span>
                          <span className="font-bold text-neutral-700 ml-1">{item.code}</span>
                        </div>
                      </div>
                    </Link>
                  ))}
                </div>

                {/* Bottom ticker banner */}
                <div className="mt-3 pt-2 border-t border-[#262E35] flex items-center justify-between text-[10px] font-mono text-neutral-400">
                  <div className="flex items-center gap-1.5">
                    <CheckCircle2 className="w-3 h-3 text-emerald-400 shrink-0" />
                    <span className="truncate">Livrare directă în Constanța & la nivel național</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ===================================================
          02. TRUST & ADVANTAGES STRIP — COMPACT 2x2 ON MOBILE
          =================================================== */}
      <section className="bg-[#FAF9F5] border-b border-[#E2E5E8] py-4 sm:py-6">
        <div className="max-w-[1360px] mx-auto px-4 sm:px-6">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-2.5 sm:gap-4">
            <div className="flex items-center gap-2.5 p-2 sm:p-3 bg-white border border-[#E2E5E8]">
              <div className="w-8 h-8 bg-[#FAF9F5] border border-[#D8DCE0] flex items-center justify-center text-[#F26A21] shrink-0">
                <ShieldCheck className="w-4 h-4" />
              </div>
              <div className="space-y-0.5">
                <h4 className="text-[11px] sm:text-xs font-mono font-bold text-[#111416] uppercase leading-tight">
                  Conformitate CE / M.M.S.S.
                </h4>
                <p className="text-[10px] text-neutral-500 hidden sm:block">
                  Avize legale complete pentru control ITM.
                </p>
              </div>
            </div>

            <div className="flex items-center gap-2.5 p-2 sm:p-3 bg-white border border-[#E2E5E8]">
              <div className="w-8 h-8 bg-[#FAF9F5] border border-[#D8DCE0] flex items-center justify-center text-[#F26A21] shrink-0">
                <Printer className="w-4 h-4" />
              </div>
              <div className="space-y-0.5">
                <h4 className="text-[11px] sm:text-xs font-mono font-bold text-[#111416] uppercase leading-tight">
                  Atelier Personalizare
                </h4>
                <p className="text-[10px] text-neutral-500 hidden sm:block">
                  Serigrafie, transfer termic și broderie.
                </p>
              </div>
            </div>

            <div className="flex items-center gap-2.5 p-2 sm:p-3 bg-white border border-[#E2E5E8]">
              <div className="w-8 h-8 bg-[#FAF9F5] border border-[#D8DCE0] flex items-center justify-center text-[#F26A21] shrink-0">
                <Truck className="w-4 h-4" />
              </div>
              <div className="space-y-0.5">
                <h4 className="text-[11px] sm:text-xs font-mono font-bold text-[#111416] uppercase leading-tight">
                  Distribuție Rapidă
                </h4>
                <p className="text-[10px] text-neutral-500 hidden sm:block">
                  Livrare la sediu sau șantier în România.
                </p>
              </div>
            </div>

            <div className="flex items-center gap-2.5 p-2 sm:p-3 bg-white border border-[#E2E5E8]">
              <div className="w-8 h-8 bg-[#FAF9F5] border border-[#D8DCE0] flex items-center justify-center text-[#F26A21] shrink-0">
                <Award className="w-4 h-4" />
              </div>
              <div className="space-y-0.5">
                <h4 className="text-[11px] sm:text-xs font-mono font-bold text-[#111416] uppercase leading-tight">
                  Ofertare B2B Fără Cont
                </h4>
                <p className="text-[10px] text-neutral-500 hidden sm:block">
                  Selectezi produsele și soliciți direct oferta.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ===================================================
          03. MAIN CATEGORIES — COMPACT 2-COL ON MOBILE, 5-COL DESKTOP
          =================================================== */}
      <section className="py-8 sm:py-14 bg-white border-b border-[#E2E5E8]">
        <div className="max-w-[1360px] mx-auto px-4 sm:px-6 space-y-6 sm:space-y-8">
          {/* Section Header */}
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-3 border-b border-[#E2E5E8] pb-4">
            <div className="space-y-1">
              <div className="flex items-center gap-1.5">
                <span className="w-2 h-2 bg-[#F26A21]" />
                <span className="text-[10px] sm:text-xs font-mono font-bold text-[#F26A21] uppercase tracking-wider">
                  01 / CATALOG PE CATEGORII
                </span>
              </div>
              <h2 className="text-xl sm:text-2xl lg:text-3xl font-extrabold text-[#111416] tracking-tight">
                Echipamente structurate pe domenii de protecție.
              </h2>
            </div>

            <Link
              href="/produse"
              className="text-xs font-mono font-bold text-[#111416] hover:text-[#F26A21] flex items-center gap-1 shrink-0 transition-colors"
            >
              <span>TOATE CATEGORIILE</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>

          {/* 2-Column Mobile, 5-Column Desktop Grid */}
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-2.5 sm:gap-4">
            {CATEGORIES.map((cat) => (
              <CategoryCard key={cat.slug} category={cat} />
            ))}
          </div>
        </div>
      </section>

      {/* ===================================================
          04. FEATURED PRODUCTS (REPRESENTATIVE ITEMS)
          =================================================== */}
      <section className="py-8 sm:py-14 bg-[#FAF9F5] border-b border-[#E2E5E8]">
        <div className="max-w-[1360px] mx-auto px-4 sm:px-6 space-y-6 sm:space-y-8">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-3 border-b border-[#E2E5E8] pb-4">
            <div className="space-y-1">
              <div className="flex items-center gap-1.5">
                <span className="w-2 h-2 bg-[#E9CF38]" />
                <span className="text-[10px] sm:text-xs font-mono font-bold text-[#111416] uppercase tracking-wider">
                  02 / ARTICOLE REPREZENTATIVE
                </span>
              </div>
              <h2 className="text-xl sm:text-2xl lg:text-3xl font-extrabold text-[#111416] tracking-tight">
                Cele mai solicitate echipamente industriale.
              </h2>
            </div>

            <Link
              href="/produse"
              className="text-xs font-mono font-bold text-[#111416] hover:text-[#F26A21] flex items-center gap-1 transition-colors shrink-0"
            >
              <span>TOATE CELE 210 PRODUSE</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>

          {/* Product Grid — 2-col on mobile, 4-col on desktop */}
          <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 gap-2.5 sm:gap-4">
            {featuredProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </div>
      </section>

      {/* ===================================================
          05. WORKWEAR CUSTOMIZATION WORKSHOP
          =================================================== */}
      <section className="py-8 sm:py-14 bg-[#111416] text-white border-b border-[#22292E] relative overflow-hidden">
        <div className="max-w-[1360px] mx-auto px-4 sm:px-6 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 sm:gap-10 items-center">
            {/* Left Column */}
            <div className="lg:col-span-5 space-y-4">
              <div className="inline-flex items-center gap-1.5 text-[11px] font-mono text-[#E9CF38] uppercase tracking-wider">
                <Printer className="w-3.5 h-3.5 text-[#F26A21]" />
                <span>03 / ATELIER PROPRIU DE PERSONALIZARE TEXTILĂ</span>
              </div>

              <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold tracking-tight leading-tight text-white">
                Identitate vizuală pe <br />
                <span className="text-[#F26A21]">echipamentul echipei tale</span>.
              </h2>

              <p className="text-neutral-300 text-xs sm:text-sm leading-relaxed font-sans">
                Inscripționăm costumele de salopetă, vestele reflectorizante, tricourile și halatele cu numele și sigla companiei tale, prin <strong>serigrafie de înaltă densitate, transfer termic industrial sau broderie computerizată</strong>.
              </p>

              <div className="space-y-1.5 pt-1 font-mono text-[11px] sm:text-xs text-neutral-300">
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-3.5 h-3.5 text-[#E9CF38] shrink-0" />
                  <span>Rezistență ridicată la spălări industriale (60°C - 90°C)</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-3.5 h-3.5 text-[#E9CF38] shrink-0" />
                  <span>Machetare grafică vectorială realizată de specialiști</span>
                </div>
              </div>

              <div className="pt-2">
                <Link
                  href="/personalizare"
                  className="h-10 sm:h-11 px-5 sm:px-6 bg-[#F26A21] hover:bg-[#ff7b36] text-black font-mono font-bold text-xs uppercase tracking-wider inline-flex items-center gap-2 transition-colors shadow-md"
                >
                  <span>DETALII ATELIER & PERSONALIZARE</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </Link>
              </div>
            </div>

            {/* Right Column: 4-Step Process - 2-col on mobile */}
            <div className="lg:col-span-7 grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 gap-2 sm:gap-3">
              {[
                {
                  step: "01",
                  title: "Alegi echipamentul",
                  desc: "Selectezi salopetele, vestele sau tricourile din catalog.",
                },
                {
                  step: "02",
                  title: "Trimiți sigla",
                  desc: "Ne transmiți fișierul vectorial sau imaginea dorită.",
                },
                {
                  step: "03",
                  title: "Aprobăm macheta",
                  desc: "Recomandăm tehnica optimă: serigrafie sau broderie.",
                },
                {
                  step: "04",
                  title: "Livrare rapidă",
                  desc: "Executăm comanda și livrăm echipamentele gata de lucru.",
                },
              ].map((item) => (
                <div
                  key={item.step}
                  className="bg-[#171B1F] border border-[#2B343B] p-3 sm:p-4 space-y-1 hover:border-[#F26A21] transition-colors"
                >
                  <span className="text-lg font-mono font-bold text-[#E9CF38]">
                    {item.step}
                  </span>
                  <h3 className="text-xs font-bold text-white uppercase tracking-tight">
                    {item.title}
                  </h3>
                  <p className="text-[11px] text-neutral-400 leading-snug font-sans hidden sm:block">
                    {item.desc}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ===================================================
          06. VERIFIED CLIENT PORTFOLIO
          =================================================== */}
      <ClientPortfolio />

      {/* ===================================================
          07. DIRECT QUOTATION CTA
          =================================================== */}
      <section className="py-10 sm:py-14 bg-[#F26A21] text-black">
        <div className="max-w-[1360px] mx-auto px-4 sm:px-6 flex flex-col md:flex-row items-center justify-between gap-5">
          <div className="space-y-1 text-center md:text-left">
            <span className="text-[10px] sm:text-xs font-mono font-extrabold uppercase tracking-widest text-black/80">
              CERERI DE OFERTĂ B2B &bull; FĂRĂ BĂTĂI DE CAP
            </span>
            <h2 className="text-xl sm:text-2xl lg:text-3xl font-extrabold tracking-tight">
              Ai nevoie de o cotație pentru compania ta?
            </h2>
            <p className="text-xs sm:text-sm text-black/80 max-w-xl font-sans">
              Adaugă produsele dorite în coșul de ofertă sau contactează-ne direct pentru o ofertă personalizată.
            </p>
          </div>

          <div className="flex flex-wrap items-center justify-center gap-2.5 sm:gap-3 shrink-0">
            <Link
              href="/solicita-oferta"
              className="px-6 sm:px-7 py-3 sm:py-3.5 bg-[#111416] hover:bg-black text-white font-mono font-bold text-xs uppercase tracking-wider flex items-center gap-2 transition-colors shadow-md"
            >
              <span>SOLICITĂ OFERTĂ</span>
              <ArrowRight className="w-3.5 h-3.5 text-[#F26A21]" />
            </Link>

            <a
              href="tel:0720300211"
              className="px-5 sm:px-6 py-3 sm:py-3.5 bg-white hover:bg-neutral-100 text-black font-mono font-bold text-xs uppercase tracking-wider flex items-center gap-2 transition-colors shadow-xs"
            >
              <Phone className="w-3.5 h-3.5 text-[#F26A21]" />
              <span>0720 300 211</span>
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}
