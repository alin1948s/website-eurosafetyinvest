import React from "react";
import Link from "next/link";
import { CATEGORIES } from "@/data/taxonomy";
import { Shield, Phone, Mail, MapPin, ExternalLink } from "lucide-react";

export function Footer() {
  return (
    <footer className="bg-[#111416] text-white border-t border-[#22292E] pt-16 pb-12">
      <div className="max-w-[1360px] mx-auto px-4 sm:px-6">
        {/* Top grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 pb-12 border-b border-[#22292E]">
          {/* Col 1 & 2: Company info */}
          <div className="lg:col-span-2 space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 bg-[#F26A21] flex items-center justify-center text-black font-bold font-mono text-sm">
                ESI
              </div>
              <span className="font-bold text-lg tracking-wider">EURO SAFETY INVEST</span>
            </div>

            <p className="text-sm text-neutral-400 max-w-md leading-relaxed">
              Distribuitor național de echipamente profesionale individuale de lucru și protecție (EIP). 
              Produse conforme cu standardele europene EN/CE și avize M.M.S.S., cu opțiuni complete de personalizare prin serigrafie și broderie.
            </p>

            <div className="space-y-2 pt-2 text-xs text-neutral-300 font-mono">
              <div className="flex items-start gap-2.5">
                <MapPin className="w-4 h-4 text-[#F26A21] shrink-0 mt-0.5" />
                <span>Str. Călărași nr. 14, cod 900590, Constanța, România</span>
              </div>
              <div className="flex items-center gap-2.5">
                <Phone className="w-4 h-4 text-[#F26A21] shrink-0" />
                <span>(+40) 0720 300 211 &nbsp;|&nbsp; (+40) 0743 108 883</span>
              </div>
              <div className="flex items-center gap-2.5">
                <Mail className="w-4 h-4 text-[#F26A21] shrink-0" />
                <span>office@eurosafetyinvest.ro</span>
              </div>
            </div>
          </div>

          {/* Col 3: Categorii Produse */}
          <div className="space-y-3">
            <h4 className="text-xs font-mono tracking-widest text-[#E9CF38] uppercase">
              CATEGORII PRODUSE
            </h4>
            <ul className="space-y-2 text-xs text-neutral-400">
              {CATEGORIES.map((cat) => (
                <li key={cat.slug}>
                  <Link
                    href={`/produse/${cat.slug}`}
                    className="hover:text-white transition-colors block"
                  >
                    {cat.name}
                  </Link>
                </li>
              ))}
              <li className="pt-1">
                <Link
                  href="/produse"
                  className="text-[#F26A21] hover:underline font-medium inline-block"
                >
                  Toate produsele &rarr;
                </Link>
              </li>
            </ul>
          </div>

          {/* Col 4: Companie */}
          <div className="space-y-3">
            <h4 className="text-xs font-mono tracking-widest text-[#E9CF38] uppercase">
              COMPANIE
            </h4>
            <ul className="space-y-2 text-xs text-neutral-400">
              <li>
                <Link href="/despre-noi" className="hover:text-white transition-colors">
                  Despre noi
                </Link>
              </li>
              <li>
                <Link href="/personalizare" className="hover:text-white transition-colors">
                  Personalizare echipamente
                </Link>
              </li>
              <li>
                <Link href="/solicita-oferta" className="hover:text-white transition-colors">
                  Solicită ofertă de preț
                </Link>
              </li>
              <li>
                <Link href="/contact" className="hover:text-white transition-colors">
                  Contact și comenzi
                </Link>
              </li>
            </ul>
          </div>

          {/* Col 5: Legal & Standarde */}
          <div className="space-y-3">
            <h4 className="text-xs font-mono tracking-widest text-[#E9CF38] uppercase">
              CONFORMITATE & LEGAL
            </h4>
            <div className="space-y-2 text-xs text-neutral-400">
              <div className="flex items-center gap-1.5 text-neutral-300">
                <Shield className="w-3.5 h-3.5 text-[#F26A21]" />
                <span>Certificări CE & Avize M.M.S.S.</span>
              </div>
              <p className="text-[11px] text-neutral-500">
                Societate comercială înregistrată în România. Catalog destinat persoanelor juridice și profesioniștilor (B2B).
              </p>
              <div className="pt-2 flex flex-col gap-1 text-[11px]">
                <a
                  href="https://anpc.ro/ce-este-sal/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-white transition-colors flex items-center gap-1"
                >
                  <span>ANPC - SAL</span>
                  <ExternalLink className="w-2.5 h-2.5" />
                </a>
                <a
                  href="https://ec.europa.eu/consumers/odr"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-white transition-colors flex items-center gap-1"
                >
                  <span>ANPC - SOL (Online Dispute)</span>
                  <ExternalLink className="w-2.5 h-2.5" />
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="mt-8 flex flex-col sm:flex-row items-center justify-between text-xs text-neutral-500 font-mono gap-4">
          <div>
            &copy; {new Date().getFullYear()} EURO SAFETY INVEST SRL. Toate drepturile rezervate.
          </div>
          <div className="flex items-center gap-4 text-[11px]">
            <span>RO CATALOG B2B</span>
            <span>&bull;</span>
            <Link
              href="/admin"
              className="hover:text-[#F26A21] transition-colors flex items-center gap-1 text-[11px] text-neutral-400"
              title="Panou intern administrare oferte & mesaje"
            >
              <Shield className="w-3 h-3 text-[#E9CF38]" />
              <span>ADMIN OFERTE</span>
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
