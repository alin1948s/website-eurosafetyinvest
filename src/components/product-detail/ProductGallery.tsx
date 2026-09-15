"use client";

import React, { useState } from "react";
import Image from "next/image";
import { Shield, Maximize2, X } from "lucide-react";

interface ProductGalleryProps {
  images: string[];
  productName: string;
}

export function ProductGallery({ images, productName }: ProductGalleryProps) {
  const [activeIdx, setActiveIdx] = useState(0);
  const [isFullscreen, setIsFullscreen] = useState(false);

  const activeImage = images[activeIdx] || images[0];

  return (
    <div className="space-y-4">
      {/* Main Image Stage */}
      <div className="relative w-full aspect-square bg-[#F6F5F1] border border-[#E2E5E8] flex items-center justify-center p-8 overflow-hidden group">
        {activeImage ? (
          <Image
            src={activeImage}
            alt={`${productName} - vedere detaliată`}
            width={520}
            height={520}
            priority
            className="object-contain w-full h-full max-h-[460px] transition-transform duration-300 group-hover:scale-105"
            sizes="(max-width: 768px) 100vw, 55vw"
          />
        ) : (
          <div className="flex flex-col items-center justify-center text-neutral-400 space-y-2">
            <Shield className="w-16 h-16 stroke-1 text-neutral-300" />
            <span className="text-xs font-mono">ECHIPAMENT VERIFICAT</span>
          </div>
        )}

        {/* Fullscreen Button */}
        {activeImage && (
          <button
            onClick={() => setIsFullscreen(true)}
            className="absolute top-4 right-4 p-2.5 bg-white/90 hover:bg-white text-[#111416] border border-[#D7DAD8] shadow-sm transition-all"
            title="Mărește imaginea"
          >
            <Maximize2 className="w-4 h-4" />
          </button>
        )}

        {/* Technical crosshair ticks in corners */}
        <div className="absolute top-2 left-2 w-2.5 h-2.5 border-t border-l border-neutral-400 pointer-events-none" />
        <div className="absolute top-2 right-2 w-2.5 h-2.5 border-t border-r border-neutral-400 pointer-events-none" />
        <div className="absolute bottom-2 left-2 w-2.5 h-2.5 border-b border-l border-neutral-400 pointer-events-none" />
        <div className="absolute bottom-2 right-2 w-2.5 h-2.5 border-b border-r border-neutral-400 pointer-events-none" />
      </div>

      {/* Thumbnail Rail (if multiple images) */}
      {images.length > 1 && (
        <div className="flex items-center gap-3 overflow-x-auto pb-1">
          {images.map((img, i) => (
            <button
              key={img}
              onClick={() => setActiveIdx(i)}
              className={`relative w-20 h-20 bg-[#F6F5F1] border p-1 shrink-0 transition-all ${
                activeIdx === i
                  ? "border-[#111416] ring-2 ring-[#111416]"
                  : "border-[#E2E5E8] hover:border-neutral-400"
              }`}
            >
              <Image
                src={img}
                alt={`${productName} thumbnail ${i + 1}`}
                width={70}
                height={70}
                className="object-contain w-full h-full"
              />
            </button>
          ))}
        </div>
      )}

      {/* Fullscreen Modal Viewer */}
      {isFullscreen && (
        <div className="fixed inset-0 z-50 bg-black/90 flex items-center justify-center p-4 animate-in fade-in">
          <button
            onClick={() => setIsFullscreen(false)}
            className="absolute top-6 right-6 p-2 text-white bg-neutral-900 border border-neutral-700 hover:bg-neutral-800"
          >
            <X className="w-6 h-6" />
          </button>
          <div className="relative max-w-4xl max-h-[85vh] w-full h-full flex items-center justify-center">
            {activeImage && (
              <Image
                src={activeImage}
                alt={productName}
                width={900}
                height={900}
                className="object-contain max-h-full max-w-full"
              />
            )}
          </div>
        </div>
      )}
    </div>
  );
}
