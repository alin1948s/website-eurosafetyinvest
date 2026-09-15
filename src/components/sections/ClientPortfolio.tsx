"use client";

import React, { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { ArrowRight, Phone, MapPin, CheckCircle2, ShieldCheck, Building2, Anchor, Zap, Factory, Sparkles } from "lucide-react";

interface ClientRecord {
  name: string;
  fullName: string;
  location: string;
  sector: string;
  category: "maritim" | "energie" | "utilitati" | "auto";
  isRealLogo: boolean;
  logoUrl?: string;
  badgeCode?: string;
  badgeSubtitle?: string;
}

export function ClientPortfolio() {
  const [activeFilter, setActiveFilter] = useState<"all" | "maritim" | "energie" | "utilitati" | "auto">("all");

  const clients: ClientRecord[] = [
    {
      name: "Rompetrol S.A.",
      fullName: "S.C. Rompetrol S.A. Constanța",
      location: "Constanța / Petromidia",
      sector: "Rafinării & Energie",
      category: "energie",
      isRealLogo: true,
      logoUrl: "/images/clients/rompetrol.svg",
    },
    {
      name: "Dacia Pitești",
      fullName: "Automobile Dacia S.A.",
      location: "Mioveni / Pitești",
      sector: "Industrie Auto Națională",
      category: "auto",
      isRealLogo: true,
      logoUrl: "/images/clients/dacia.svg",
    },
    {
      name: "Hidroelectrica SA",
      fullName: "Hidroelectrica SA — Sebeș & Hațeg",
      location: "Sebeș & Hațeg",
      sector: "Producție Energie Hidro",
      category: "energie",
      isRealLogo: true,
      logoUrl: "/images/clients/hidroelectrica.png",
    },
    {
      name: "Portul Constanța",
      fullName: "C.N. Administrația Porturilor Maritime S.A.",
      location: "Port Constanța (APMC)",
      sector: "Autoritate Portuară Maritimă",
      category: "maritim",
      isRealLogo: true,
      logoUrl: "/images/clients/portul_constanta.svg",
    },
    {
      name: "RAJA Constanța",
      fullName: "RAJA S.A. Constanța",
      location: "Constanța & Litoral",
      sector: "Regie Publică Apă & Canal",
      category: "utilitati",
      isRealLogo: true,
      logoUrl: "/images/clients/raja.svg",
    },
    {
      name: "Electrica SA",
      fullName: "Electrica S.A. (SISE Muntenia Nord & Ialomița)",
      location: "Muntenia Nord / Ialomița",
      sector: "Distribuție & Rețele Energetice",
      category: "energie",
      isRealLogo: true,
      logoUrl: "/images/clients/electrica.svg",
    },
    {
      name: "Electromontaj SA",
      fullName: "S.C. Electromontaj S.A.",
      location: "România",
      sector: "Construcții Linii Energetice",
      category: "energie",
      isRealLogo: true,
      logoUrl: "/images/clients/electromontaj.svg",
    },
    {
      name: "COMVEX S.A.",
      fullName: "S.C. COMVEX S.A.",
      location: "Port Constanța",
      sector: "Terminal Minerale & Cereale",
      category: "maritim",
      isRealLogo: true,
      logoUrl: "/images/clients/comvex.svg",
    },
    {
      name: "SOCEP S.A.",
      fullName: "Socep SA Constanța",
      location: "Port Constanța",
      sector: "Operator Portuar Containere",
      category: "maritim",
      isRealLogo: true,
      logoUrl: "/images/clients/socep.png",
    },
    {
      name: "UMEX S.A.",
      fullName: "S.C. Umex S.A. Constanța",
      location: "Port Constanța",
      sector: "Servicii Portuare & Manipulare",
      category: "maritim",
      isRealLogo: true,
      logoUrl: "/images/clients/umex.png",
    },
    {
      name: "SICIM Constanța",
      fullName: "SICIM S.p.A. Constanța",
      location: "Constanța / Național",
      sector: "Infrastructură Gaz & Petrol",
      category: "maritim",
      isRealLogo: true,
      logoUrl: "/images/clients/sicim.svg",
    },
    {
      name: "Dobrogea S.A.",
      fullName: "S.C. Dobrogea Grup S.A.",
      location: "Constanța",
      sector: "Industrie Alimentară & Morărit",
      category: "auto",
      isRealLogo: true,
      logoUrl: "/images/clients/dobrogea.png",
    },
    {
      name: "Autoritatea Navală Română",
      fullName: "Autoritatea Navală Română (ANR)",
      location: "Constanța / Național",
      sector: "Autoritate Guvernamentală Navală",
      category: "maritim",
      isRealLogo: true,
      logoUrl: "/images/clients/autoritatea_navala_romana.png",
    },
    {
      name: "CT BUS Constanța",
      fullName: "CT BUS S.A. (fost R.A.T.C. Constanța)",
      location: "Constanța",
      sector: "Transport Public Municipal",
      category: "utilitati",
      isRealLogo: true,
      logoUrl: "/images/clients/ctbus.png",
    },
    {
      name: "Oltchim Rm. Vâlcea",
      fullName: "S.C. Oltchim S.A.",
      location: "Râmnicu Vâlcea",
      sector: "Combinat Petrochimic",
      category: "energie",
      isRealLogo: true,
      logoUrl: "/images/clients/oltchim.jpg",
    },
    {
      name: "Uzina Termoelectrică Midia",
      fullName: "Uzina Termoelectrică Midia Năvodari",
      location: "Midia Năvodari",
      sector: "Producție Energie Termică",
      category: "energie",
      isRealLogo: false,
      badgeCode: "UTM",
      badgeSubtitle: "MIDIA NĂVODARI",
    },
    {
      name: "RADET Constanța",
      fullName: "RADET Constanța (Termoficare)",
      location: "Constanța",
      sector: "Regie Autonomă Termoficare",
      category: "utilitati",
      isRealLogo: false,
      badgeCode: "RADET",
      badgeSubtitle: "CONSTANȚA",
    },
    {
      name: "Apaterm Galați",
      fullName: "Apaterm S.A. Galați",
      location: "Galați",
      sector: "Rețele Utilități Publice",
      category: "utilitati",
      isRealLogo: false,
      badgeCode: "APATERM",
      badgeSubtitle: "GALAȚI",
    },
    {
      name: "FECNE București",
      fullName: "FECNE București (Centrale Nucleare)",
      location: "București",
      sector: "Echipamente Energetice Nucleare",
      category: "energie",
      isRealLogo: false,
      badgeCode: "FECNE",
      badgeSubtitle: "BUCUREȘTI",
    },
    {
      name: "Danubiana București",
      fullName: "Danubiana București",
      location: "București",
      sector: "Industrie Cauciuc & Anvelope",
      category: "energie",
      isRealLogo: false,
      badgeCode: "DANUBIANA",
      badgeSubtitle: "BUCUREȘTI",
    },
    {
      name: "Deltaconst Tulcea",
      fullName: "S.C. Deltaconst S.A.",
      location: "Tulcea",
      sector: "Construcții Hidrotehnice & Industriale",
      category: "auto",
      isRealLogo: false,
      badgeCode: "DELTACONST",
      badgeSubtitle: "TULCEA",
    },
    {
      name: "Primării & Instituții Învățământ",
      fullName: "Primării, Instituții & Cluburi Sportive",
      location: "Dobrogea & România",
      sector: "Administrație Publică & Educație",
      category: "utilitati",
      isRealLogo: false,
      badgeCode: "SECTOR PUBLIC",
      badgeSubtitle: "PRIMĂRII & EDUCAȚIE",
    },
  ];

  const filteredClients = clients.filter((c) => {
    if (activeFilter === "all") return true;
    return c.category === activeFilter;
  });

  const clientCategories = [
    {
      title: "Energie, Rafinării & Petrochimie",
      icon: <Zap className="w-4 h-4 text-[#F26A21]" />,
      list: [
        "S.C. Rompetrol S.A. Constanța",
        "Uzina Termoelectrică Midia Năvodari",
        "Hidroelectrica SA — sucursala Hidrocentrale Sebeș & Hațeg",
        "Electrica SA Sucursala De Întreținere Și Servicii Energetice Muntenia Nord",
        "Electrica filiala Ialomița",
        "S.C. Electromontaj S.A.",
        "Oltchim Rm. Vâlcea",
        "FECNE București",
        "Danubiana București",
      ],
    },
    {
      title: "Domeniul Portuar & Maritim",
      icon: <Anchor className="w-4 h-4 text-[#F26A21]" />,
      list: [
        "Compania Națională Administrația Porturilor Maritime Constanța (APMC)",
        "S.C. Comvex S.A. Constanța",
        "S.C. Umex S.A. Constanța",
        "Socep SA Constanța",
        "Autoritatea Navală Română (ANR)",
        "SICIM Constanța",
      ],
    },
    {
      title: "Transport Public & Utilități",
      icon: <Building2 className="w-4 h-4 text-[#F26A21]" />,
      list: [
        "RAJA Constanța (Regia Autonomă Județeană de Apă)",
        "Regia Autonomă de Transport în Comun Constanța (RATC / CT BUS)",
        "RADET Constanța (Termoficare)",
        "Apaterm Galați",
        "Primării și instituții de învățământ",
      ],
    },
    {
      title: "Industrie Auto, Construcții & Sport",
      icon: <Factory className="w-4 h-4 text-[#F26A21]" />,
      list: [
        "Dacia Pitești",
        "S.C. Dobrogea S.A. Constanța",
        "Deltaconst Tulcea",
        "Asociații sportive și cluburi de profil",
      ],
    },
  ];

  return (
    <section className="bg-white border-b border-[#E2E5E8] py-10 sm:py-16">
      <div className="max-w-[1360px] mx-auto px-4 sm:px-6 space-y-8 sm:space-y-12">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 sm:gap-6 border-b border-[#E2E5E8] pb-5 sm:pb-6">
          <div className="space-y-1.5 sm:space-y-2">
            <div className="flex items-center gap-2">
              <span className="inline-block w-2 h-2 bg-[#F26A21]" />
              <span className="text-[11px] sm:text-xs font-mono font-bold text-[#F26A21] uppercase tracking-wider">
                PORTOFOLIU & PARTENERIATE INDUSTRIALE
              </span>
            </div>
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-[#111416] tracking-tight">
              Am inscripționat și echipat echipe pentru lideri din industrie.
            </h2>
            <p className="text-xs sm:text-sm text-neutral-600 max-w-2xl leading-relaxed font-sans">
              De-a lungul anilor, <strong>Euro Safety Invest SRL</strong> a furnizat și inscripționat echipamente profesionale de protecție individuală pentru companii strategice naționale, autorități portuare, regii autonome și mari combinate industriale.
            </p>
          </div>

          <Link
            href="/personalizare"
            className="text-xs font-mono font-bold text-[#111416] hover:text-[#F26A21] flex items-center gap-1.5 shrink-0 transition-colors py-1.5 border-b border-[#111416] hover:border-[#F26A21]"
          >
            <span>SERVICIILE DE PERSONALIZARE</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>

        {/* Filter Toolbar */}
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div className="flex flex-wrap items-center gap-1.5 sm:gap-2">
            {[
              { id: "all", label: `Toți Partenerii (${clients.length})` },
              { id: "maritim", label: "Portuar & Maritim" },
              { id: "energie", label: "Energie & Rafinării" },
              { id: "utilitati", label: "Transport & Utilități" },
              { id: "auto", label: "Auto & Industrie" },
            ].map((btn) => (
              <button
                key={btn.id}
                onClick={() => setActiveFilter(btn.id as any)}
                className={`text-[11px] sm:text-xs font-mono px-2.5 sm:px-3 py-1 sm:py-1.5 transition-all border ${
                  activeFilter === btn.id
                    ? "bg-[#111416] text-white border-[#111416] font-bold"
                    : "bg-[#FAF9F5] text-neutral-600 border-[#E2E5E8] hover:border-[#111416] hover:text-[#111416]"
                }`}
              >
                {btn.label}
              </button>
            ))}
          </div>

          <div className="text-[10px] sm:text-[11px] font-mono text-neutral-400">
            <span>Constanța &bull; Dobrogea &bull; Național</span>
          </div>
        </div>

        {/* Client Cards Grid - Compact & Visual */}
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-2.5 sm:gap-3.5">
          {filteredClients.map((client) => (
            <div
              key={client.name}
              className="bg-white border border-[#E2E5E8] p-3 sm:p-4 flex flex-col justify-between hover:border-[#111416] hover:shadow-sm transition-all group"
            >
              {/* Top metadata */}
              <div className="flex items-center justify-between mb-2 text-[10px] font-mono text-neutral-400">
                <span className="font-semibold text-neutral-600 truncate max-w-[70%]">
                  {client.location.split("/")[0].trim()}
                </span>
                <span className="uppercase text-[8px] sm:text-[9px] text-neutral-400 shrink-0">
                  {client.category}
                </span>
              </div>

              {/* Logo / Badge Area */}
              <div className="h-12 sm:h-14 w-full flex items-center justify-center p-1.5 bg-[#FAF9F5] border border-[#F0F2F4] my-auto">
                {client.isRealLogo && client.logoUrl ? (
                  <img
                    src={client.logoUrl}
                    alt={`Logo ${client.name}`}
                    className="max-h-9 sm:max-h-11 max-w-[85%] w-auto h-auto object-contain transition-transform duration-200 group-hover:scale-105"
                    loading="lazy"
                  />
                ) : (
                  <div className="flex flex-col items-center justify-center text-center px-1">
                    <span className="font-mono text-[10px] sm:text-xs font-black text-[#111416] tracking-wider uppercase">
                      {client.badgeCode}
                    </span>
                    <span className="text-[8px] font-mono text-neutral-500 uppercase tracking-tighter line-clamp-1">
                      {client.badgeSubtitle}
                    </span>
                  </div>
                )}
              </div>

              {/* Bottom Info */}
              <div className="pt-2 border-t border-[#EAECE8] space-y-0.5 mt-2">
                <div className="text-xs font-bold text-[#111416] group-hover:text-[#F26A21] transition-colors line-clamp-1">
                  {client.name}
                </div>
                <div className="text-[9px] sm:text-[10px] font-mono text-neutral-500 line-clamp-1">
                  {client.sector}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Authentic Original Inscription Plate Showcase */}
        <div className="bg-[#111416] text-white p-6 sm:p-8 border border-[#2B343B] space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-[#22292E] pb-4">
            <div className="space-y-1">
              <span className="text-xs font-mono text-[#E9CF38] uppercase tracking-wider flex items-center gap-1.5">
                <Sparkles className="w-3.5 h-3.5 text-[#E9CF38]" />
                DOVADĂ AUTENTICĂ DE PERSONALIZARE TEXTILĂ (ARHIVĂ 2012)
              </span>
              <h3 className="text-lg sm:text-xl font-bold text-white">
                Placă originală de broderie & mostre sigle inscripționate
              </h3>
            </div>
            <span className="text-xs font-mono text-neutral-400">
              SERIGRAFIE &bull; TRANSFER TERMIC &bull; BRODERIE COMPUTERIZATĂ
            </span>
          </div>

          <div className="flex flex-col lg:flex-row items-center gap-8">
            <div className="w-full lg:w-1/2 bg-white p-4 flex items-center justify-center border border-neutral-700 shadow-inner">
              <Image
                src="/images/sigle.gif"
                alt="Sigle inscripționate original Euro Safety Invest SRL"
                width={580}
                height={171}
                className="w-full h-auto object-contain max-h-[170px]"
                unoptimized
              />
            </div>

            <div className="w-full lg:w-1/2 space-y-3 text-xs text-neutral-300 leading-relaxed font-sans">
              <p>
                Imaginea de mai sus reprezintă panoul istoric original de mostre de broderie realizate în atelierul <strong>Euro Safety Invest SRL</strong>. Produsele noastre pot fi inscripționate conform dorinței clientului cu numele, sigla și logo-ul dorit prin <strong>serigrafie textilă de înaltă densitate, transfer termic industrial sau broderie computerizată</strong>, în una sau multiple culori.
              </p>
              <div className="grid grid-cols-2 gap-2.5 pt-2 text-[11px] font-mono text-neutral-400">
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-3.5 h-3.5 text-[#E9CF38] shrink-0" />
                  <span>Rezistență la spălări industriale 60°C - 90°C</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-3.5 h-3.5 text-[#E9CF38] shrink-0" />
                  <span>Machetare grafică & vectorială dedicată</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-3.5 h-3.5 text-[#E9CF38] shrink-0" />
                  <span>Livrare directă în Constanța & la nivel național</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-3.5 h-3.5 text-[#E9CF38] shrink-0" />
                  <span>Conformitate cu normele CE și standardele EN</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Structured Client Breakdown by Industry */}
        <div className="space-y-4">
          <div className="flex items-center justify-between border-b border-[#E2E5E8] pb-3">
            <span className="text-xs font-mono font-bold text-[#111416] uppercase tracking-wider block">
              LISTA COMPLETĂ A ORGANIZAȚIILOR INSCRIPȚIONATE
            </span>
            <span className="text-[11px] font-mono text-neutral-500">
              Conform evidenței istorice oficiale
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5 sm:gap-6">
            {clientCategories.map((cat) => (
              <div
                key={cat.title}
                className="bg-[#FAF9F5] border border-[#E2E5E8] p-5 space-y-3 flex flex-col justify-between"
              >
                <div className="space-y-3">
                  <div className="flex items-center gap-2 pb-2.5 border-b border-[#EAECE8]">
                    {cat.icon}
                    <h4 className="text-xs font-mono font-bold text-[#111416] uppercase">
                      {cat.title}
                    </h4>
                  </div>

                  <ul className="space-y-1.5 text-xs text-neutral-700 font-sans">
                    {cat.list.map((c, i) => (
                      <li key={i} className="flex items-start gap-1.5 text-[11px] leading-snug">
                        <span className="w-1.5 h-1.5 bg-[#F26A21] mt-1 shrink-0" />
                        <span>{c}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="pt-3 border-t border-[#EAECE8] text-[10px] font-mono text-neutral-400">
                  Echipamente de lucru & protecție inscripționate
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Direct Contact & Coordinates Callout — EXACT TEXT FROM ORIGINAL */}
        <div className="bg-[#FAF9F5] border-2 border-[#111416] p-6 sm:p-8 flex flex-col lg:flex-row items-center justify-between gap-6 shadow-sm">
          <div className="space-y-2.5 text-center lg:text-left">
            <div className="inline-flex items-center gap-2 px-2 py-0.5 bg-[#111416] text-[#E9CF38] text-[11px] font-mono font-bold uppercase tracking-wider">
              <MapPin className="w-3.5 h-3.5" />
              <span>SEDIU & CONTACT DIRECT CONSTANȚA</span>
            </div>
            <h3 className="text-xl sm:text-2xl font-extrabold text-[#111416] tracking-tight">
              Este ușor să ne găsiți în Constanța pe strada Călărași nr.14!
            </h3>
            <p className="text-xs sm:text-sm text-neutral-700 max-w-2xl leading-relaxed font-sans">
              Pentru orice colaborare sau informații despre produsele noastre nu ezitați să ne contactați la telefoanele:{" "}
              <a href="tel:0720300211" className="font-bold text-[#111416] hover:text-[#F26A21] underline decoration-[#F26A21]">
                0720 300 211
              </a>
              {", "}
              <a href="tel:0743108883" className="font-bold text-[#111416] hover:text-[#F26A21] underline decoration-[#F26A21]">
                0743 108 883
              </a>{" "}
              sau la adresa de e-mail{" "}
              <a href="mailto:office@eurosafetyinvest.ro" className="font-bold text-[#111416] hover:text-[#F26A21] underline decoration-[#F26A21]">
                office@eurosafetyinvest.ro
              </a>
              .
            </p>
          </div>

          <div className="flex flex-wrap items-center justify-center gap-3 shrink-0">
            <a
              href="tel:0720300211"
              className="px-5 py-3 bg-[#111416] hover:bg-[#F26A21] text-white font-mono font-bold text-xs uppercase tracking-wider flex items-center gap-2 transition-colors shadow-sm"
            >
              <Phone className="w-4 h-4 text-[#E9CF38]" />
              <span>0720 300 211</span>
            </a>

            <a
              href="tel:0743108883"
              className="px-5 py-3 bg-[#111416] hover:bg-[#F26A21] text-white font-mono font-bold text-xs uppercase tracking-wider flex items-center gap-2 transition-colors shadow-sm"
            >
              <Phone className="w-4 h-4 text-[#E9CF38]" />
              <span>0743 108 883</span>
            </a>

            <Link
              href="/contact"
              className="px-5 py-3 bg-[#F26A21] hover:bg-[#ff7b36] text-black font-mono font-bold text-xs uppercase tracking-wider flex items-center gap-2 transition-colors shadow-sm"
            >
              <MapPin className="w-4 h-4" />
              <span>HARTĂ SEDIU & CONTACT</span>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
