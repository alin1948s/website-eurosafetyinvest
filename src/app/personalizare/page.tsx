import React from "react";
import Link from "next/link";
import Image from "next/image";
import { Metadata } from "next";
import { ArrowRight, Printer, CheckCircle2, ShieldCheck, Sparkles } from "lucide-react";
import { ClientPortfolio } from "@/components/sections/ClientPortfolio";

export const metadata: Metadata = {
  title: "Personalizare Îmbrăcăminte de Lucru | Euro Safety Invest",
  description:
    "Servicii de personalizare pentru echipamente de protecție și haine de lucru prin serigrafie, transfer termic și broderie computerizată în Constanța.",
};

export default function PersonalizarePage() {
  const methods = [
    {
      title: "Serigrafie Textilă",
      subtitle: "Rezistență mecanică & tiraje industriale",
      desc: "Tehnica optimă pentru salopete, halate, tricouri și geci de lucru. Oferă o aderență superioară a vopselei pe țesături dense precum docul rotar, tercotul sau bumbacul, rezistând la spălări industriale la temperaturi ridicate.",
      features: ["Ideală pentru comenzi medii și mari", "Rezistență crescută la frecare și spălare", "Culori vibrante conform codurilor PANTONE"],
      image: "/poze/imbracaminte/css.jpg",
    },
    {
      title: "Broderie Computerizată",
      subtitle: "Finisaj premium de maximă durabilitate",
      desc: "Cea mai elegantă și rezistentă modalitate de personalizare pentru jachete softshell, hanorace, veste și șepci. Firele de broderie de înaltă rezistență nu se degradează în timp și rezistă la cele mai dure condiții de șantier.",
      features: ["Aspect profesional și elegant", "Durabilitate egală cu durata de viață a produsului", "Aplicabilă pe o gamă largă de materiale textile"],
      image: "/poze/imbracaminte/geaca-fas.jpg",
    },
    {
      title: "Transfer Termic",
      subtitle: "Detalii fine & materiale reflectorizante",
      desc: "Recomandat pentru elemente grafice complexe, logouri multicolore sau benzi și marcaje reflectorizante de înaltă vizibilitate conforme cu standardul EN 471.",
      features: ["Precizie maximă pe detalii fine", "Ideal pentru marcaje reflectorizante de securitate", "Potrivit pentru materiale sintetice și impermeabile"],
      image: "/poze/imbracaminte/vesta-reflectorizanta.jpg",
    },
  ];

  return (
    <div className="w-full bg-[#FAF9F5] min-h-screen py-10">
      <div className="max-w-[1360px] mx-auto px-4 sm:px-6 space-y-16">
        {/* Header Banner */}
        <div className="bg-[#111416] text-white p-8 sm:p-14 border border-[#2B343B] relative overflow-hidden">
          <div className="max-w-2xl space-y-4 relative z-10">
            <div className="inline-flex items-center gap-2 text-xs font-mono text-[#E9CF38] uppercase tracking-wider">
              <Printer className="w-4 h-4 text-[#F26A21]" />
              <span>ATELIER DE PERSONALIZARE E.I.P.</span>
            </div>

            <h1 className="text-3xl sm:text-5xl font-extrabold tracking-tight leading-tight">
              Personalizare pentru <br />
              <span className="text-[#F26A21]">echipa companiei tale</span>.
            </h1>

            <p className="text-sm sm:text-base text-neutral-300 leading-relaxed">
              Îmbrăcăminte de lucru personalizată cu identitatea companiei tale. Inscripționăm echipamente textile cu logo, denumire și elemente de semnalizare vizuală.
            </p>

            <div className="pt-2">
              <Link
                href="/solicita-oferta?personalizare=da"
                className="h-12 px-7 bg-[#F26A21] hover:bg-[#ff7b36] text-black font-mono font-bold text-xs uppercase tracking-wider inline-flex items-center gap-2 transition-colors"
              >
                <span>SOLICITĂ OFERTĂ DE PERSONALIZARE</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </div>
        </div>

        {/* 4 Steps Section */}
        <div className="space-y-6">
          <div className="space-y-1 border-b border-[#E2E5E8] pb-4">
            <span className="text-xs font-mono font-bold text-[#F26A21] uppercase tracking-wider block">
              PROCES SIMPLU ȘI RAPID
            </span>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-[#111416] tracking-tight">
              Cum funcționează personalizarea echipamentelor
            </h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              {
                step: "01",
                title: "Alegi produsul",
                desc: "Selectezi costumele de salopetă, tricourile, vestele sau gecile direct din catalogul nostru.",
              },
              {
                step: "02",
                title: "Trimiți logo-ul",
                desc: "Încarci sau ne transmiți logo-ul în format vectorial (PDF, EPS, SVG, AI) sau imagine de înaltă rezoluție.",
              },
              {
                step: "03",
                title: "Stabilim tehnica",
                desc: "Echipa noastră tehnică alege metoda optimă (serigrafie, transfer termic sau broderie) pentru țesătura aleasă.",
              },
              {
                step: "04",
                title: "Primești oferta",
                desc: "Îți trimitem simularea grafică (macheta) și cotația de preț exactă pentru tirajul dorit.",
              },
            ].map((s) => (
              <div
                key={s.step}
                className="bg-white border border-[#E2E5E8] p-6 space-y-2 hover:border-[#111416] transition-colors"
              >
                <div className="text-2xl font-mono font-extrabold text-[#E9CF38]">
                  {s.step}
                </div>
                <h3 className="text-sm font-bold text-[#111416] uppercase tracking-wide">
                  {s.title}
                </h3>
                <p className="text-xs text-neutral-600 leading-relaxed">
                  {s.desc}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* 3 Methods Section */}
        <div className="space-y-8">
          <div className="space-y-1 border-b border-[#E2E5E8] pb-4">
            <span className="text-xs font-mono font-bold text-[#F26A21] uppercase tracking-wider block">
              TEHNOLOGII UTILIZATE
            </span>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-[#111416] tracking-tight">
              Metode de inscripționare adaptate fiecărui tip de material
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {methods.map((m) => (
              <div
                key={m.title}
                className="bg-white border border-[#E2E5E8] flex flex-col justify-between overflow-hidden group"
              >
                <div className="w-full h-48 bg-[#F6F5F1] relative overflow-hidden flex items-center justify-center p-4">
                  <Image
                    src={m.image}
                    alt={m.title}
                    fill
                    className="object-contain p-4 group-hover:scale-105 transition-transform duration-300"
                  />
                </div>

                <div className="p-6 space-y-4 flex-1 flex flex-col justify-between">
                  <div className="space-y-2">
                    <h3 className="text-lg font-bold text-[#111416]">
                      {m.title}
                    </h3>
                    <div className="text-xs font-mono text-[#F26A21] font-semibold">
                      {m.subtitle}
                    </div>
                    <p className="text-xs text-neutral-600 leading-relaxed">
                      {m.desc}
                    </p>
                  </div>

                  <ul className="space-y-1.5 pt-4 border-t border-[#EAECE8] text-xs text-neutral-700">
                    {m.features.map((f, i) => (
                      <li key={i} className="flex items-center gap-2">
                        <CheckCircle2 className="w-3.5 h-3.5 text-[#2E7D32] shrink-0" />
                        <span>{f}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Client Portfolio & Verified Organizations */}
        <ClientPortfolio />

        {/* Bottom CTA Box */}
        <div className="p-8 sm:p-10 bg-[#111416] text-white border border-[#2B343B] flex flex-col sm:flex-row items-center justify-between gap-6">
          <div className="space-y-1 text-center sm:text-left">
            <span className="text-xs font-mono text-[#E9CF38] uppercase">CONSULTANȚĂ GRAFICĂ</span>
            <h3 className="text-xl sm:text-2xl font-bold">
              Pregătit să echipezi echipa ta cu haine inscripționate?
            </h3>
            <p className="text-xs text-neutral-400">
              Completează formularul sau contactează-ne direct pentru asistență la pregătirea machetei.
            </p>
          </div>

          <Link
            href="/solicita-oferta?personalizare=da"
            className="px-7 py-3.5 bg-[#F26A21] hover:bg-[#ff7b36] text-black font-mono font-bold text-xs uppercase tracking-wider shrink-0 flex items-center gap-2 transition-colors"
          >
            <span>SOLICITĂ OFERTĂ</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </div>
    </div>
  );
}
