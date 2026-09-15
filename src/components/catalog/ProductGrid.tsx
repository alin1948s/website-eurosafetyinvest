"use client";

import React, { useState, useMemo } from "react";
import { Product } from "@/lib/types";
import { ProductCard } from "./ProductCard";
import { FilterSidebar } from "../filters/FilterSidebar";
import { SlidersHorizontal, X, RotateCcw } from "lucide-react";

interface ProductGridProps {
  products: Product[];
  categoryTitle?: string;
  showSidebar?: boolean;
}

export function ProductGrid({
  products,
  categoryTitle,
  showSidebar = true,
}: ProductGridProps) {
  const [selectedColors, setSelectedColors] = useState<string[]>([]);
  const [selectedStandards, setSelectedStandards] = useState<string[]>([]);
  const [selectedMaterials, setSelectedMaterials] = useState<string[]>([]);
  const [isMobileFilterOpen, setIsMobileFilterOpen] = useState(false);

  const toggleColor = (color: string) => {
    setSelectedColors((prev) =>
      prev.includes(color) ? prev.filter((c) => c !== color) : [...prev, color]
    );
  };

  const toggleStandard = (standard: string) => {
    setSelectedStandards((prev) =>
      prev.includes(standard) ? prev.filter((s) => s !== standard) : [...prev, standard]
    );
  };

  const toggleMaterial = (material: string) => {
    setSelectedMaterials((prev) =>
      prev.includes(material) ? prev.filter((m) => m !== material) : [...prev, material]
    );
  };

  const handleReset = () => {
    setSelectedColors([]);
    setSelectedStandards([]);
    setSelectedMaterials([]);
  };

  const activeFiltersCount =
    selectedColors.length + selectedStandards.length + selectedMaterials.length;

  // Filter products
  const filteredProducts = useMemo(() => {
    return products.filter((p) => {
      // Color match
      if (
        selectedColors.length > 0 &&
        !p.colors.some((c) => selectedColors.includes(c.name))
      ) {
        return false;
      }
      // Standard match
      if (
        selectedStandards.length > 0 &&
        !p.standards.some((s) => selectedStandards.includes(s))
      ) {
        return false;
      }
      // Material match
      if (
        selectedMaterials.length > 0 &&
        !p.materials.some((m) => selectedMaterials.includes(m))
      ) {
        return false;
      }
      return true;
    });
  }, [products, selectedColors, selectedStandards, selectedMaterials]);

  return (
    <div className="w-full">
      {/* Top Controls Bar */}
      <div className="flex items-center justify-between py-3 mb-6 border-b border-[#E2E5E8]">
        <div className="text-xs font-mono text-neutral-600">
          <span className="font-bold text-[#111416]">{filteredProducts.length}</span> PRODUSE ÎN CATALOG
          {products.length !== filteredProducts.length && (
            <span className="text-neutral-400 ml-1">
              (din totalul de {products.length})
            </span>
          )}
        </div>

        {/* Mobile Filter Trigger */}
        {showSidebar && (
          <button
            onClick={() => setIsMobileFilterOpen(true)}
            className="lg:hidden flex items-center gap-2 px-3 py-1.5 text-xs font-mono bg-[#111416] text-white"
          >
            <SlidersHorizontal className="w-3.5 h-3.5" />
            <span>FILTRE ({activeFiltersCount})</span>
          </button>
        )}
      </div>

      {/* Active Filter Chips */}
      {activeFiltersCount > 0 && (
        <div className="flex flex-wrap items-center gap-2 mb-6">
          <span className="text-[11px] font-mono text-neutral-500">Filtre aplicate:</span>
          {selectedColors.map((col) => (
            <button
              key={col}
              onClick={() => toggleColor(col)}
              className="inline-flex items-center gap-1.5 px-2.5 py-1 text-xs bg-[#111416] text-white font-mono"
            >
              <span>{col}</span>
              <X className="w-3 h-3" />
            </button>
          ))}
          {selectedStandards.map((std) => (
            <button
              key={std}
              onClick={() => toggleStandard(std)}
              className="inline-flex items-center gap-1.5 px-2.5 py-1 text-xs bg-[#111416] text-white font-mono"
            >
              <span>{std}</span>
              <X className="w-3 h-3" />
            </button>
          ))}
          {selectedMaterials.map((mat) => (
            <button
              key={mat}
              onClick={() => toggleMaterial(mat)}
              className="inline-flex items-center gap-1.5 px-2.5 py-1 text-xs bg-[#111416] text-white font-mono capitalize"
            >
              <span>{mat}</span>
              <X className="w-3 h-3" />
            </button>
          ))}
          <button
            onClick={handleReset}
            className="text-xs font-mono text-[#F26A21] hover:underline flex items-center gap-1 ml-2"
          >
            <RotateCcw className="w-3 h-3" />
            <span>Resetează toate</span>
          </button>
        </div>
      )}

      {/* Layout: Sidebar + Grid */}
      <div className="flex items-start gap-8">
        {/* Desktop Sidebar */}
        {showSidebar && (
          <aside className="hidden lg:block w-64 shrink-0 sticky top-24 bg-[#FBFBFA] p-5 border border-[#E2E5E8]">
            <FilterSidebar
              products={products}
              selectedColors={selectedColors}
              onToggleColor={toggleColor}
              selectedStandards={selectedStandards}
              onToggleStandard={toggleStandard}
              selectedMaterials={selectedMaterials}
              onToggleMaterial={toggleMaterial}
              onReset={handleReset}
              activeCount={activeFiltersCount}
            />
          </aside>
        )}

        {/* Main Grid */}
        <div className="flex-1 min-w-0">
          {filteredProducts.length === 0 ? (
            <div className="bg-[#FAF9F5] border border-[#E2E5E8] p-12 text-center space-y-3">
              <p className="text-base font-bold text-[#111416]">
                Niciun produs nu corespunde filtrelor selectate.
              </p>
              <p className="text-xs text-neutral-500 max-w-sm mx-auto">
                Modificați sau resetați filtrele aplicate pentru a vizualiza celelalte echipamente din această categorie.
              </p>
              <button
                onClick={handleReset}
                className="mt-2 px-4 py-2 bg-[#111416] text-white text-xs font-mono uppercase font-bold"
              >
                RESETEAZĂ FILTRELE
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
              {filteredProducts.map((prod) => (
                <ProductCard key={prod.id} product={prod} />
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Mobile Filter Drawer */}
      {isMobileFilterOpen && (
        <div className="fixed inset-0 z-50 lg:hidden bg-black/70 backdrop-blur-sm flex justify-end">
          <div className="w-full max-w-xs bg-white h-full flex flex-col p-6 shadow-2xl overflow-y-auto">
            <div className="flex items-center justify-between pb-4 mb-4 border-b border-[#E2E5E8]">
              <span className="font-bold font-mono text-sm text-[#111416]">FILTRARE PRODUSE</span>
              <button
                onClick={() => setIsMobileFilterOpen(false)}
                className="p-1.5 text-neutral-500 hover:text-black border border-neutral-300"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <FilterSidebar
              products={products}
              selectedColors={selectedColors}
              onToggleColor={toggleColor}
              selectedStandards={selectedStandards}
              onToggleStandard={toggleStandard}
              selectedMaterials={selectedMaterials}
              onToggleMaterial={toggleMaterial}
              onReset={handleReset}
              activeCount={activeFiltersCount}
            />

            <div className="mt-8 pt-4 border-t border-[#E2E5E8]">
              <button
                onClick={() => setIsMobileFilterOpen(false)}
                className="w-full py-3 bg-[#111416] text-white font-mono font-bold text-xs uppercase text-center"
              >
                AFIȘEAZĂ {filteredProducts.length} REZULTATE
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
