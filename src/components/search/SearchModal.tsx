"use client";

import React, { useState, useEffect, useRef } from "react";
import Link from "next/link";
import Image from "next/image";
import { catalog } from "@/data/catalog";
import { Product } from "@/lib/types";
import { Search, X, ArrowRight, Shield } from "lucide-react";

interface SearchModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function SearchModal({ isOpen, onClose }: SearchModalProps) {
  const [query, setQuery] = useState("");
  const inputRef = useRef<HTMLInputElement>(null);

  // Focus on mount
  useEffect(() => {
    if (isOpen) {
      setTimeout(() => inputRef.current?.focus(), 50);
    } else {
      setQuery("");
    }
  }, [isOpen]);

  // Keyboard shortcut listener
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        onClose();
      }
    };
    if (isOpen) {
      window.addEventListener("keydown", handleKeyDown);
      return () => window.removeEventListener("keydown", handleKeyDown);
    }
  }, [isOpen, onClose]);

  // Search logic
  const filteredProducts = React.useMemo(() => {
    if (!query.trim()) return [];
    const q = query.toLowerCase().trim();

    return catalog
      .filter((p) => {
        return (
          p.name.toLowerCase().includes(q) ||
          p.code.toLowerCase().includes(q) ||
          p.category.toLowerCase().includes(q) ||
          p.subcategory.toLowerCase().includes(q) ||
          p.standards.some((s) => s.toLowerCase().includes(q)) ||
          p.materials.some((m) => m.toLowerCase().includes(q)) ||
          p.description.toLowerCase().includes(q)
        );
      })
      .slice(0, 12);
  }, [query]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-start justify-center pt-8 sm:pt-20 px-4 bg-black/80 backdrop-blur-sm animate-in fade-in duration-150">
      <div
        className="w-full max-w-2xl bg-[#171B1F] border border-[#2B343B] shadow-2xl overflow-hidden flex flex-col max-h-[80vh]"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Input Bar */}
        <div className="flex items-center px-4 py-3.5 border-b border-[#2B343B] bg-[#111416]">
          <Search className="w-5 h-5 text-[#F26A21] shrink-0 mr-3" />
          <input
            ref={inputRef}
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Caută produs sau cod... (ex: 331-1, BARI, Cască, Sudură)"
            className="w-full bg-transparent text-white placeholder-neutral-500 text-sm focus:outline-none font-sans"
          />
          {query && (
            <button
              onClick={() => setQuery("")}
              className="p-1 text-neutral-400 hover:text-white mr-1"
            >
              <X className="w-4 h-4" />
            </button>
          )}
          <button
            onClick={onClose}
            className="px-2 py-1 text-xs font-mono text-neutral-400 hover:text-white border border-neutral-700 hover:border-neutral-500"
          >
            ESC
          </button>
        </div>

        {/* Results List */}
        <div className="overflow-y-auto p-3 space-y-2 flex-1">
          {query.trim() === "" ? (
            <div className="p-8 text-center text-neutral-400 space-y-2">
              <p className="text-xs font-mono tracking-wide text-neutral-500">
                SISTEM DE CĂUTARE CATALOG INDUSTRIAL
              </p>
              <p className="text-sm">
                Introduceți denumirea produsului, codul de identificare, categoria sau standardul EN.
              </p>
              <div className="flex flex-wrap items-center justify-center gap-2 pt-2">
                {["331-1", "BARI S1", "Guamo", "EN 397", "Sudură", "Kevlar"].map((tag) => (
                  <button
                    key={tag}
                    onClick={() => setQuery(tag)}
                    className="px-2.5 py-1 text-xs font-mono bg-[#1B2024] hover:bg-[#252C32] text-neutral-300 border border-neutral-700"
                  >
                    {tag}
                  </button>
                ))}
              </div>
            </div>
          ) : filteredProducts.length === 0 ? (
            <div className="p-8 text-center text-neutral-400">
              <p className="text-sm font-medium text-white mb-1">
                Niciun produs găsit pentru &ldquo;{query}&rdquo;
              </p>
              <p className="text-xs text-neutral-500">
                Verificați codul sau căutați direct în categoriile principale.
              </p>
            </div>
          ) : (
            filteredProducts.map((product) => (
              <Link
                key={product.id}
                href={`/produs/${product.slug}`}
                onClick={onClose}
                className="group flex items-center justify-between p-2.5 bg-[#1B2024] hover:bg-[#252D34] border border-transparent hover:border-[#F26A21]/40 transition-all"
              >
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 bg-white p-1 shrink-0 flex items-center justify-center relative overflow-hidden">
                    {product.images[0] ? (
                      <Image
                        src={product.images[0]}
                        alt={product.name}
                        width={44}
                        height={44}
                        className="object-contain w-full h-full"
                      />
                    ) : (
                      <Shield className="w-6 h-6 text-neutral-400" />
                    )}
                  </div>

                  <div className="space-y-0.5">
                    <div className="flex items-center gap-2">
                      <span className="text-[10px] font-mono uppercase text-[#E9CF38]">
                        {product.subcategory}
                      </span>
                      <span className="text-[11px] font-mono font-bold text-neutral-400">
                        COD: {product.code}
                      </span>
                    </div>
                    <div className="text-sm font-semibold text-white group-hover:text-[#F26A21] transition-colors line-clamp-1">
                      {product.name}
                    </div>
                  </div>
                </div>

                <div className="flex items-center gap-2 text-xs font-mono text-neutral-400 group-hover:text-white shrink-0">
                  <span className="hidden sm:inline">VEZI</span>
                  <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                </div>
              </Link>
            ))
          )}
        </div>

        {/* Footer info */}
        <div className="px-4 py-2 border-t border-[#2B343B] bg-[#111416] flex items-center justify-between text-[11px] font-mono text-neutral-500">
          <span>{filteredProducts.length} REZULTATE PENTRU CĂUTARE</span>
          <span>ENTER PENTRU SELECTARE</span>
        </div>
      </div>
    </div>
  );
}
