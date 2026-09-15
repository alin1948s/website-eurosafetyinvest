"use client";

import React from "react";
import Link from "next/link";
import Image from "next/image";
import { useQuote } from "@/context/QuoteContext";
import { X, Plus, Minus, Trash2, ArrowRight, ShoppingBag, ShieldCheck } from "lucide-react";

export function QuoteDrawer() {
  const { items, itemCount, isDrawerOpen, setIsDrawerOpen, updateQuantity, removeItem, clearQuote } =
    useQuote();

  if (!isDrawerOpen) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-hidden bg-black/70 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="absolute inset-0" onClick={() => setIsDrawerOpen(false)} />

      <div className="fixed inset-y-0 right-0 max-w-full flex pl-10">
        <div className="w-screen max-w-md bg-[#161A1E] text-white border-l border-[#2B343B] flex flex-col shadow-2xl animate-in slide-in-from-right duration-300">
          {/* Header */}
          <div className="p-5 border-b border-[#2B343B] bg-[#111416] flex items-center justify-between">
            <div className="flex items-center gap-2.5">
              <span className="w-2.5 h-2.5 bg-[#E9CF38]"></span>
              <div>
                <h2 className="text-sm font-bold font-mono tracking-wider uppercase text-white">
                  CERERE DE OFERTĂ
                </h2>
                <p className="text-[11px] font-mono text-neutral-400">
                  {itemCount} {itemCount === 1 ? "ARTICOL" : "ARTICOLE"} SELECTATE
                </p>
              </div>
            </div>

            <button
              onClick={() => setIsDrawerOpen(false)}
              className="p-1.5 text-neutral-400 hover:text-white border border-neutral-700 hover:border-neutral-500 transition-colors"
              aria-label="Închide panoul de ofertă"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Items list */}
          <div className="flex-1 overflow-y-auto p-4 space-y-3">
            {items.length === 0 ? (
              <div className="h-full flex flex-col items-center justify-center text-center p-6 text-neutral-400 space-y-4">
                <div className="w-14 h-14 bg-[#1B2024] border border-[#2B343B] flex items-center justify-center text-neutral-500">
                  <ShoppingBag className="w-7 h-7" />
                </div>
                <div>
                  <h3 className="text-base font-semibold text-white mb-1">
                    Cererea ta este goală.
                  </h3>
                  <p className="text-xs text-neutral-400 max-w-xs leading-relaxed">
                    Explorează catalogul de produse și adaugă articolele pentru care dorești o cotație de preț personalizată.
                  </p>
                </div>
                <Link
                  href="/produse"
                  onClick={() => setIsDrawerOpen(false)}
                  className="px-5 py-2.5 bg-[#F26A21] hover:bg-[#ff7b36] text-black font-mono font-bold text-xs uppercase tracking-wider transition-colors inline-flex items-center gap-2"
                >
                  <span>VEZI PRODUSELE</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </Link>
              </div>
            ) : (
              items.map((item, idx) => (
                <div
                  key={`${item.product.id}-${item.selectedColor}-${item.selectedSize}-${idx}`}
                  className="bg-[#1B2024] border border-[#2B343B] p-3 flex gap-3 relative group"
                >
                  {/* Thumbnail */}
                  <div className="w-16 h-16 bg-white p-1 shrink-0 flex items-center justify-center relative overflow-hidden">
                    {item.product.images[0] ? (
                      <Image
                        src={item.product.images[0]}
                        alt={item.product.name}
                        width={60}
                        height={60}
                        className="object-contain w-full h-full"
                      />
                    ) : (
                      <div className="w-full h-full bg-neutral-200" />
                    )}
                  </div>

                  {/* Info */}
                  <div className="flex-1 min-w-0 space-y-1">
                    <div className="text-[10px] font-mono text-[#E9CF38] uppercase truncate">
                      COD: {item.product.code}
                    </div>
                    <Link
                      href={`/produs/${item.product.slug}`}
                      onClick={() => setIsDrawerOpen(false)}
                      className="text-xs font-semibold text-white hover:text-[#F26A21] transition-colors line-clamp-1 block"
                    >
                      {item.product.name}
                    </Link>

                    {/* Variant badges */}
                    <div className="flex flex-wrap gap-1.5 text-[11px] text-neutral-300 font-mono">
                      {item.selectedColor && (
                        <span className="inline-flex items-center gap-1 bg-[#111416] px-1.5 py-0.5 border border-neutral-700">
                          <span className="w-2 h-2 rounded-full bg-[#F26A21]" />
                          <span>{item.selectedColor}</span>
                        </span>
                      )}
                      {item.selectedSize && (
                        <span className="bg-[#111416] px-1.5 py-0.5 border border-neutral-700">
                          Mărime: {item.selectedSize}
                        </span>
                      )}
                    </div>

                    {/* Quantity controls */}
                    <div className="flex items-center justify-between pt-1">
                      <div className="flex items-center border border-neutral-700 bg-[#111416]">
                        <button
                          onClick={() =>
                            updateQuantity(
                              item.product.id,
                              item.quantity - 1,
                              item.selectedColor,
                              item.selectedSize
                            )
                          }
                          className="p-1 hover:bg-neutral-800 text-neutral-400 hover:text-white transition-colors"
                          aria-label="Scade cantitatea"
                        >
                          <Minus className="w-3.5 h-3.5" />
                        </button>
                        <span className="px-3 text-xs font-mono font-bold text-white min-w-[28px] text-center">
                          {item.quantity}
                        </span>
                        <button
                          onClick={() =>
                            updateQuantity(
                              item.product.id,
                              item.quantity + 1,
                              item.selectedColor,
                              item.selectedSize
                            )
                          }
                          className="p-1 hover:bg-neutral-800 text-neutral-400 hover:text-white transition-colors"
                          aria-label="Crește cantitatea"
                        >
                          <Plus className="w-3.5 h-3.5" />
                        </button>
                      </div>

                      <button
                        onClick={() =>
                          removeItem(
                            item.product.id,
                            item.selectedColor,
                            item.selectedSize
                          )
                        }
                        className="text-neutral-500 hover:text-red-400 p-1 transition-colors"
                        title="Șterge articolul"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>

          {/* Footer Actions */}
          {items.length > 0 && (
            <div className="p-4 border-t border-[#2B343B] bg-[#111416] space-y-3">
              <div className="flex items-center justify-between text-xs font-mono text-neutral-400">
                <span>TOTAL PRODUSE DISTINCTE:</span>
                <span className="text-white font-bold">{items.length}</span>
              </div>
              <div className="flex items-center justify-between text-xs font-mono text-neutral-400">
                <span>CANTITATE TOTALĂ ARTICOLE:</span>
                <span className="text-white font-bold">{itemCount} BUC</span>
              </div>

              <div className="pt-2 flex flex-col gap-2">
                <Link
                  href="/solicita-oferta"
                  onClick={() => setIsDrawerOpen(false)}
                  className="w-full py-3 bg-[#F26A21] hover:bg-[#ff7b36] text-black font-mono font-bold text-xs uppercase tracking-wider text-center flex items-center justify-center gap-2 transition-colors"
                >
                  <span>CONTINUĂ CU FORMULARUL DE OFERTĂ</span>
                  <ArrowRight className="w-4 h-4" />
                </Link>

                <button
                  onClick={clearQuote}
                  className="text-[11px] font-mono text-neutral-500 hover:text-neutral-300 text-center py-1 transition-colors"
                >
                  Golește întreaga cerere
                </button>
              </div>

              <div className="pt-2 flex items-center gap-2 text-[11px] text-neutral-500 font-mono">
                <ShieldCheck className="w-3.5 h-3.5 text-[#E9CF38]" />
                <span>Trimiterea nu implică nicio obligație financiară.</span>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
