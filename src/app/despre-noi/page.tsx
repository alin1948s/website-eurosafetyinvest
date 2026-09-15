import React from "react";
import Link from "next/link";
import { Metadata } from "next";
import { Shield, Award, CheckCircle2, MapPin, Phone, Mail, ArrowRight } from "lucide-react";
import { ClientPortfolio } from "@/components/sections/ClientPortfolio";

export const metadata: Metadata = {
  title: "Despre Noi | Euro Safety Invest SRL",
  description:
    "Euro Safety Invest SRL — Distribuitor autorizat de echipamente de protecția muncii, avize legale M.M.S.S. și certificări CE. Sediu în Constanța, România.",
};

export default function DespreNoiPage() {
  return (
    <div className="w-full bg-[#FAF9F5] min-h-screen py-10">
      <div className="max-w-[1360px] mx-auto px-4 sm:px-6 space-y-12">
        {/* Breadcrumb & Title */}
        <div className="space-y-2 border-b border-[#E2E5E8] pb-6">
          <div className="flex items-center gap-2 text-xs font-mono text-neutral-500 uppercase">
            <Link href="/" className="hover:text-black">
              ACASĂ
            </Link>
            <span>/</span>
            <span className="text-[#F26A21] font-bold">DESPRE NOI</span>
          </div>

          <h1 className="text-3xl sm:text-5xl font-extrabold text-[#111416] tracking-tight">
            Euro Safety Invest SRL
          </h1>
          <p className="text-sm text-neutral-600 max-w-2xl">
            Partener industrial pentru echipamente individuale și colective de lucru și protecție a muncii în România.
          </p>
        </div>

        {/* Core Presentation */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
          {/* Main narrative */}
          <div className="lg:col-span-7 space-y-6 bg-white p-8 border border-[#E2E5E8]">
            <div className="space-y-2">
              <span className="text-xs font-mono font-bold text-[#F26A21] uppercase tracking-wider block">
                PREZENTARE GENERALĂ
              </span>
              <h2 className="text-2xl font-bold text-[#111416]">
                Distribuitor național de echipamente E.I.P.
              </h2>
            </div>

            <div className="space-y-4 text-sm text-neutral-700 leading-relaxed">
              <p>
                <strong>S.C. Euro Safety Invest S.R.L.</strong> este distribuitor pe piața românească al unei game largi de echipamente individuale de lucru și protecție: mănuși de protecție (nitril, cauciuc, piele, textile, electroizolante), ochelari și viziere de protecție, căști de protecție industrială, costume de salopetă, încălțăminte de securitate (pantofi, bocanci, cizme), centuri și hamuri pentru lucrul la înălțime, echipamente pentru sudori, măști și sisteme respiratorii, precum și produse P.S.I. și materiale sanitare.
              </p>

              <p>
                Pentru toată gama de produse (produse în țară sau importate), societatea noastră deține <strong>avizele legale de comercializare emise de autoritățile competente M.M.S.S.</strong>, iar pentru produsele importate deținem <strong>certificări și marcaje CE</strong> conform directivelor europene aplicabile fiecărui nivel de risc.
              </p>

              <p>
                De asemenea, oferim servicii complete de <strong>personalizare și inscripționare grafică</strong> cu numele, sigla și logo-ul dorit prin tehnici profesionale de serigrafie, transfer termic sau broderie.
              </p>

              <div className="p-4 bg-[#FAF9F5] border-l-4 border-[#F26A21] space-y-2 text-xs">
                <span className="font-mono font-bold text-[#111416] uppercase block">
                  PORTOFOLIU CLIENȚI ECHIPAȚI & INSCRIPȚIONAȚI:
                </span>
                <p className="text-neutral-700 leading-relaxed italic">
                  &ldquo;Produsele noastre pot fi inscripționate cu numele, sigla și logo dorit pe oricare din ele. Am inscripționat pentru: <strong>S.C. Rompetrol S.A. Constanța</strong>, <strong>RAJA Constanța</strong>, <strong>Administrația Porturilor Maritime Constanța</strong>, <strong>S.C. Comvex S.A.</strong>, <strong>Uzina Termoelectrică Midia Năvodari</strong>, <strong>SICIM Constanța</strong>, <strong>S.C. Dobrogea S.A.</strong>, <strong>S.C. Umex S.A.</strong>, <strong>Socep SA Constanța</strong>, <strong>Autoritatea Navală Română</strong>, <strong>Regia Autonomă de Transport în Comun Constanța</strong>, <strong>RADET Constanța</strong>, <strong>Hidroelectrica SA</strong> (sucursala Hidrocentrale Sebeș, Hidrocentrale Hațeg), <strong>Electrica SA</strong> (Sucursala De Întreținere Și Servicii Energetice Muntenia Nord, filiala Ialomița), <strong>SC Electromontaj SA</strong>, <strong>Apaterm Galați</strong>, <strong>FECNE București</strong>, <strong>Danubiana București</strong>, <strong>Dacia Pitești</strong>, <strong>Deltaconst Tulcea</strong>, <strong>Oltchim Rm. Vâlcea</strong>, asociații sportive, primării, instituții de învățământ etc.&rdquo;
                </p>
              </div>
            </div>

            <div className="pt-4 border-t border-[#EAECE8] flex flex-wrap items-center gap-4">
              <Link
                href="/produse"
                className="px-6 py-3 bg-[#111416] hover:bg-[#F26A21] text-white font-mono font-bold text-xs uppercase tracking-wider flex items-center gap-2 transition-colors"
              >
                <span>EXPLOREAZĂ CATALOGUL</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
              <Link
                href="/solicita-oferta"
                className="px-6 py-3 bg-[#FAF9F5] hover:bg-neutral-200 text-black border border-[#D7DAD8] font-mono font-bold text-xs uppercase tracking-wider transition-colors"
              >
                SOLICITĂ OFERTĂ
              </Link>
            </div>
          </div>

          {/* Right Column: Verified Pillars */}
          <div className="lg:col-span-5 space-y-6">
            <div className="bg-[#111416] text-white p-6 border border-[#2B343B] space-y-4">
              <span className="text-xs font-mono text-[#E9CF38] uppercase tracking-wider block">
                CONFORMITATE CERTIFICATĂ
              </span>

              <div className="space-y-4 text-xs">
                <div className="flex items-start gap-3">
                  <Shield className="w-5 h-5 text-[#F26A21] shrink-0 mt-0.5" />
                  <div>
                    <h4 className="font-bold text-sm text-white mb-0.5">Avize Legale M.M.S.S.</h4>
                    <p className="text-neutral-400 leading-relaxed">
                      Echipamente omologate și avizate conform legislației române privind securitatea și sănătatea în muncă.
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <Award className="w-5 h-5 text-[#F26A21] shrink-0 mt-0.5" />
                  <div>
                    <h4 className="font-bold text-sm text-white mb-0.5">Marcaje și Standarde CE</h4>
                    <p className="text-neutral-400 leading-relaxed">
                      Garanție de conformitate cu normele europene EN 397, EN 388, EN 345, EN 358, EN 166 și EN 149.
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <CheckCircle2 className="w-5 h-5 text-[#F26A21] shrink-0 mt-0.5" />
                  <div>
                    <h4 className="font-bold text-sm text-white mb-0.5">Origine Verificată</h4>
                    <p className="text-neutral-400 leading-relaxed">
                      Produse fabricate în Italia, Germania sau România de către producători consacrați în domeniul securității industriale.
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Verified Location Box */}
            <div className="bg-white border border-[#E2E5E8] p-6 space-y-3">
              <span className="text-xs font-mono font-bold uppercase text-[#111416] tracking-wider block border-b border-[#EAECE8] pb-2">
                DATE DE IDENTIFICARE ȘI SEDIU
              </span>

              <div className="space-y-2 text-xs font-mono text-neutral-700">
                <div className="flex items-start gap-2">
                  <MapPin className="w-4 h-4 text-[#F26A21] shrink-0 mt-0.5" />
                  <div>
                    <div className="font-bold text-[#111416]">S.C. EURO SAFETY INVEST S.R.L.</div>
                    <div>Str. Călărași nr. 14, cod 900590</div>
                    <div>Constanța, România</div>
                  </div>
                </div>

                <div className="flex items-center gap-2 pt-2 border-t border-[#EAECE8]">
                  <Phone className="w-4 h-4 text-[#F26A21] shrink-0" />
                  <span>0720 300 211 &nbsp;/&nbsp; 0743 108 883</span>
                </div>

                <div className="flex items-center gap-2">
                  <Mail className="w-4 h-4 text-[#F26A21] shrink-0" />
                  <span>office@eurosafetyinvest.ro</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Client Portfolio & Verified Organizations */}
        <ClientPortfolio />
      </div>
    </div>
  );
}
