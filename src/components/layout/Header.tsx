"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Search, ShoppingBag, Menu, X, ChevronDown, ArrowRight, Shield } from "lucide-react";
import { useQuote } from "@/context/QuoteContext";
import { MegaMenu } from "./MegaMenu";

interface HeaderProps {
  onOpenSearch: () => void;
}

export function Header({ onOpenSearch }: HeaderProps) {
  const pathname = usePathname();
  const { itemCount, setIsDrawerOpen } = useQuote();
  const [isMegaMenuOpen, setIsMegaMenuOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Close menus on route change
  useEffect(() => {
    setIsMegaMenuOpen(false);
    setIsMobileMenuOpen(false);
  }, [pathname]);

  const navLinks = [
    { label: "Personalizare", href: "/personalizare" },
    { label: "Despre noi", href: "/despre-noi" },
    { label: "Contact", href: "/contact" },
  ];

  return (
    <header
      className={`sticky top-0 z-40 w-full transition-all duration-200 ${
        isScrolled
          ? "bg-[#111416]/95 backdrop-blur-md border-b border-[#22292E] py-3 shadow-md"
          : "bg-[#111416] border-b border-[#22292E] py-4"
      }`}
    >
      <div className="max-w-[1360px] mx-auto px-4 sm:px-6 flex items-center justify-between">
        {/* Left: Logo */}
        <Link href="/" className="flex items-center gap-3 group focus:outline-none">
          <div className="w-9 h-9 bg-[#F26A21] flex items-center justify-center text-white font-bold text-base tracking-tighter transition-transform group-hover:scale-105">
            <span className="font-mono text-black font-extrabold text-sm">ESI</span>
          </div>
          <div className="flex flex-col">
            <span className="font-bold text-white text-base tracking-wider leading-none">
              EURO SAFETY INVEST
            </span>
            <span className="text-[9px] font-mono tracking-widest text-neutral-400 uppercase mt-1">
              ECHIPAMENTE DE PROTECȚIE &bull; CONSTANȚA
            </span>
          </div>
        </Link>

        {/* Center: Desktop Navigation */}
        <nav className="hidden lg:flex items-center space-x-1">
          <div
            className="relative"
            onMouseEnter={() => setIsMegaMenuOpen(true)}
          >
            <button
              onClick={() => setIsMegaMenuOpen(!isMegaMenuOpen)}
              className={`px-3.5 py-2 text-sm font-medium flex items-center gap-1.5 transition-colors ${
                pathname.startsWith("/produse") || isMegaMenuOpen
                  ? "text-[#F26A21]"
                  : "text-neutral-200 hover:text-white"
              }`}
            >
              <span>Produse</span>
              <ChevronDown
                className={`w-3.5 h-3.5 transition-transform duration-200 ${
                  isMegaMenuOpen ? "rotate-180 text-[#F26A21]" : ""
                }`}
              />
            </button>
          </div>

          {navLinks.map((link) => {
            const isActive = pathname === link.href;
            return (
              <Link
                key={link.href}
                href={link.href}
                className={`px-3.5 py-2 text-sm font-medium transition-colors ${
                  isActive ? "text-[#F26A21]" : "text-neutral-200 hover:text-white"
                }`}
              >
                {link.label}
              </Link>
            );
          })}
        </nav>

        {/* Right: Actions */}
        <div className="flex items-center space-x-3">
          {/* Clean Modern Search Bar Trigger */}
          <button
            onClick={onOpenSearch}
            className="flex items-center bg-[#1B2024] hover:bg-[#22282F] border border-[#2E373F] hover:border-[#F26A21] px-3 py-1.5 sm:px-3.5 sm:py-2 text-left transition-all group"
            title="Caută în catalogul de produse"
          >
            <Search className="w-3.5 h-3.5 text-[#F26A21] mr-2 shrink-0 group-hover:scale-110 transition-transform" />
            <span className="text-xs text-neutral-300 font-sans hidden sm:inline max-w-[140px] lg:max-w-[180px] truncate">
              Caută produse, cod...
            </span>
            <span className="sm:hidden text-xs font-mono text-neutral-300">
              CAUTĂ
            </span>
          </button>

          {/* Quotation Bag Trigger */}
          <button
            onClick={() => setIsDrawerOpen(true)}
            className="relative flex items-center gap-2 px-3 py-1.5 text-xs font-mono font-medium text-white bg-[#1B2024] hover:bg-[#252C32] border border-[#2B343B] transition-colors"
          >
            <ShoppingBag className="w-3.5 h-3.5 text-[#E9CF38]" />
            <span className="hidden sm:inline uppercase">CERERE OFERTĂ</span>
            <span className="inline-flex items-center justify-center px-1.5 py-0.2 text-[11px] font-mono font-bold bg-[#F26A21] text-white">
              {itemCount.toString().padStart(2, "0")}
            </span>
          </button>

          {/* Primary CTA (Direct to form) */}
          <Link
            href="/solicita-oferta"
            className="hidden md:flex items-center gap-1.5 px-4 py-2 text-xs font-bold font-mono uppercase tracking-wider text-black bg-[#F26A21] hover:bg-[#ff7b36] transition-all"
          >
            <span>SOLICITĂ OFERTĂ</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="lg:hidden p-2 text-neutral-300 hover:text-white bg-[#1B2024] border border-[#2B343B]"
            aria-label="Meniu principal"
          >
            {isMobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mega Menu Overlay for Desktop */}
      <MegaMenu isOpen={isMegaMenuOpen} onClose={() => setIsMegaMenuOpen(false)} />

      {/* Mobile Drawer */}
      {isMobileMenuOpen && (
        <div className="lg:hidden bg-[#111416] border-b border-[#22292E] px-4 py-6 space-y-4 animate-in slide-in-from-top-2">
          <div className="space-y-1">
            <Link
              href="/produse"
              onClick={() => setIsMobileMenuOpen(false)}
              className="block px-3 py-2.5 text-sm font-semibold text-[#F26A21] border-b border-neutral-800"
            >
              Toate Categoriile de Produse &rarr;
            </Link>
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setIsMobileMenuOpen(false)}
                className="block px-3 py-2 text-sm text-neutral-200 hover:text-white"
              >
                {link.label}
              </Link>
            ))}
          </div>

          <div className="pt-3 border-t border-[#22292E] flex flex-col gap-2 font-mono text-xs text-neutral-400">
            <div>Str. Călărași nr. 14, Constanța</div>
            <div className="text-white">Tel: 0720 300 211 / 0743 108 883</div>
            <Link
              href="/solicita-oferta"
              onClick={() => setIsMobileMenuOpen(false)}
              className="w-full text-center py-2.5 mt-2 bg-[#F26A21] text-black font-bold uppercase"
            >
              SOLICITĂ OFERTĂ &rarr;
            </Link>
          </div>
        </div>
      )}
    </header>
  );
}
