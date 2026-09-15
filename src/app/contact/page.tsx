import React from "react";
import Link from "next/link";
import { Metadata } from "next";
import { ContactForm } from "@/components/forms/ContactForm";
import { MapPin, Phone, Mail, Clock, ShieldCheck } from "lucide-react";

export const metadata: Metadata = {
  title: "Contact | Euro Safety Invest SRL Constanța",
  description:
    "Contactează Euro Safety Invest SRL. Telefon: 0720 300 211, Email: office@eurosafetyinvest.ro. Sediu: Str. Călărași nr. 14, Constanța, România.",
};

export default function ContactPage() {
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
            <span className="text-[#F26A21] font-bold">CONTACT</span>
          </div>

          <h1 className="text-3xl sm:text-5xl font-extrabold text-[#111416] tracking-tight">
            Hai să găsim echipamentul potrivit.
          </h1>
          <p className="text-sm sm:text-base text-neutral-700 max-w-2xl font-medium leading-relaxed">
            Este ușor să ne găsiți în Constanța pe strada Călărași nr. 14 sau la telefoanele{" "}
            <strong className="text-[#111416]">0720 300 211</strong>,{" "}
            <strong className="text-[#111416]">0743 108 883</strong>. Pentru orice colaborare sau informații despre produsele noastre nu ezitați să ne contactați!
          </p>
        </div>

        {/* 2-Column Contact Info + Form */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
          {/* Left Column: Verified Contact Information */}
          <div className="lg:col-span-5 space-y-6">
            <div className="bg-[#111416] text-white p-6 sm:p-8 border border-[#2B343B] space-y-6">
              <div className="space-y-1">
                <span className="text-[11px] font-mono text-[#E9CF38] uppercase tracking-wider block">
                  SEDIU CENTRAL
                </span>
                <h2 className="text-xl font-bold text-white">
                  Euro Safety Invest SRL
                </h2>
              </div>

              <div className="space-y-4 text-xs font-mono text-neutral-300">
                <div className="flex items-start gap-3">
                  <MapPin className="w-4 h-4 text-[#F26A21] shrink-0 mt-0.5" />
                  <div>
                    <div className="font-bold text-white">ADRESĂ SEDIU:</div>
                    <div className="text-neutral-400">
                      Str. Călărași nr. 14, cod 900590
                    </div>
                    <div className="text-neutral-400">Constanța, România</div>
                  </div>
                </div>

                <div className="flex items-start gap-3 pt-2 border-t border-[#22292E]">
                  <Phone className="w-4 h-4 text-[#F26A21] shrink-0 mt-0.5" />
                  <div>
                    <div className="font-bold text-white">TELEFOANE DE CONTACT:</div>
                    <a
                      href="tel:0720300211"
                      className="block text-neutral-300 hover:text-white"
                    >
                      (+40) 0720 300 211
                    </a>
                    <a
                      href="tel:0743108883"
                      className="block text-neutral-300 hover:text-white"
                    >
                      (+40) 0743 108 883
                    </a>
                  </div>
                </div>

                <div className="flex items-start gap-3 pt-2 border-t border-[#22292E]">
                  <Mail className="w-4 h-4 text-[#F26A21] shrink-0 mt-0.5" />
                  <div>
                    <div className="font-bold text-white">EMAIL OFICIAL:</div>
                    <a
                      href="mailto:office@eurosafetyinvest.ro"
                      className="text-neutral-300 hover:text-white underline underline-offset-2"
                    >
                      office@eurosafetyinvest.ro
                    </a>
                  </div>
                </div>

                <div className="flex items-start gap-3 pt-2 border-t border-[#22292E]">
                  <Clock className="w-4 h-4 text-[#F26A21] shrink-0 mt-0.5" />
                  <div>
                    <div className="font-bold text-white">PROGRAM DE LUCRU:</div>
                    <div className="text-neutral-400">Luni &ndash; Vineri: 08:30 &ndash; 17:00</div>
                    <div className="text-neutral-400">Sâmbătă &ndash; Duminică: Închis</div>
                  </div>
                </div>
              </div>
            </div>

            {/* Micro Trust Banner */}
            <div className="bg-white border border-[#E2E5E8] p-5 space-y-2 text-xs">
              <div className="flex items-center gap-2 font-mono font-bold text-[#111416]">
                <ShieldCheck className="w-4 h-4 text-[#2E7D32]" />
                <span>AVIZE ȘI CONFORMITATE LEGALĂ</span>
              </div>
              <p className="text-neutral-600 leading-relaxed text-[11px]">
                Compania noastră deține toate avizele legale M.M.S.S. și certificările de conformitate CE necesare furnizării de echipamente individuale de protecție către companii private și instituții publice.
              </p>
            </div>
          </div>

          {/* Right Column: Contact Form */}
          <div className="lg:col-span-7">
            <ContactForm />
          </div>
        </div>
      </div>
    </div>
  );
}
