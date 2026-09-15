"use client";

import React from "react";
import Link from "next/link";
import Image from "next/image";
import { CATEGORIES } from "@/data/taxonomy";
import { ArrowRight, ShieldCheck } from "lucide-react";

interface MegaMenuProps {
  isOpen: boolean;
  onClose: () => void;
}

export function MegaMenu({ isOpen, onClose }: MegaMenuProps) {
  if (!isOpen) return null;

  return (
    <div
      className="absolute top-full left-0 w-full bg-[#111416] text-white border-b border-[#2A3138] shadow-2xl z-50 transition-all duration-200 animate-in fade-in slide-in-from-top-2"
      onMouseLeave={onClose}
    >
      <div className="max-w-[1360px] mx-auto px-6 py-8">
        {/* Top bar with quick title & all products link */}
        <div className="flex items-center justify-between border-b border-[#22292E] pb-4 mb-6">
          <div className="flex items-center space-x-3">
            <span className="inline-block w-2 h-2 bg-[#F26A21]"></span>
            <span className="text-xs font-mono tracking-widest uppercase text-neutral-400">
              CATALOG GENERAL ECHIPAMENTE DE PROTECȚIE
            </span>
          </div>
          <Link
            href="/produse"
            onClick={onClose}
            className="text-xs font-medium text-[#F26A21] hover:text-white flex items-center gap-1.5 transition-colors group"
          >
            <span>Vezi toate produsele</span>
            <ArrowRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-1" />
          </Link>
        </div>

        {/* 5-column Category Grid */}
        <div className="grid grid-cols-1 md:grid-cols-5 gap-6">
          {CATEGORIES.map((category) => (
            <div key={category.slug} className="space-y-3">
              <div className="border-b border-[#22292E] pb-2">
                <span className="text-[10px] font-mono text-[#E9CF38] block mb-0.5">
                  {category.index} /
                </span>
                <Link
                  href={`/produse/${category.slug}`}
                  onClick={onClose}
                  className="font-semibold text-sm tracking-wide text-white hover:text-[#F26A21] transition-colors block"
                >
                  {category.name}
                </Link>
              </div>

              <ul className="space-y-1.5 pt-1">
                {category.subcategories.map((sub) => (
                  <li key={sub.slug}>
                    <Link
                      href={`/produse/${category.slug}/${sub.slug}`}
                      onClick={onClose}
                      className="text-xs text-neutral-400 hover:text-white hover:translate-x-1 transition-all inline-block py-0.5"
                    >
                      {sub.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Bottom micro-banner */}
        <div className="mt-8 pt-4 border-t border-[#22292E] flex flex-wrap items-center justify-between text-xs text-neutral-400">
          <div className="flex items-center gap-2">
            <ShieldCheck className="w-4 h-4 text-[#F26A21]" />
            <span>Toate produsele respectă standardele europene EN / CE și avizele legale M.M.S.S.</span>
          </div>
          <div className="flex items-center gap-6 mt-2 sm:mt-0 font-mono text-[11px]">
            <span>CONSTANȚA: 0720 300 211</span>
            <span className="text-neutral-600">•</span>
            <span>OFFICE@EUROSAFETYINVEST.RO</span>
          </div>
        </div>
      </div>
    </div>
  );
}
