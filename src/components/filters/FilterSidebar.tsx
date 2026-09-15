"use client";

import React from "react";
import { Product } from "@/lib/types";
import { RotateCcw, Check } from "lucide-react";

interface FilterSidebarProps {
  products: Product[];
  selectedColors: string[];
  onToggleColor: (color: string) => void;
  selectedStandards: string[];
  onToggleStandard: (standard: string) => void;
  selectedMaterials: string[];
  onToggleMaterial: (material: string) => void;
  onReset: () => void;
  activeCount: number;
}

export function FilterSidebar({
  products,
  selectedColors,
  onToggleColor,
  selectedStandards,
  onToggleStandard,
  selectedMaterials,
  onToggleMaterial,
  onReset,
  activeCount,
}: FilterSidebarProps) {
  // Extract all distinct available colors, standards, and materials from current products list
  const availableColors = React.useMemo(() => {
    const map = new Map<string, string>();
    products.forEach((p) => {
      p.colors.forEach((c) => {
        if (!map.has(c.name)) {
          map.set(c.name, c.displayColor || "#666666");
        }
      });
    });
    return Array.from(map.entries()).map(([name, displayColor]) => ({
      name,
      displayColor,
    }));
  }, [products]);

  const availableStandards = React.useMemo(() => {
    const set = new Set<string>();
    products.forEach((p) => {
      p.standards.forEach((s) => set.add(s));
    });
    return Array.from(set).sort();
  }, [products]);

  const availableMaterials = React.useMemo(() => {
    const set = new Set<string>();
    products.forEach((p) => {
      p.materials.forEach((m) => {
        if (m.length < 30) set.add(m);
      });
    });
    return Array.from(set).sort();
  }, [products]);

  return (
    <div className="space-y-6 w-full text-xs font-sans">
      {/* Top Header with Reset */}
      <div className="flex items-center justify-between pb-3 border-b border-[#E2E5E8]">
        <div className="flex items-center gap-2">
          <span className="font-mono font-bold uppercase text-[#111416] tracking-wider">
            FILTRE ACTIVE
          </span>
          {activeCount > 0 && (
            <span className="px-1.5 py-0.2 bg-[#F26A21] text-white font-mono font-bold text-[10px]">
              {activeCount}
            </span>
          )}
        </div>

        {activeCount > 0 && (
          <button
            onClick={onReset}
            className="flex items-center gap-1 text-[11px] font-mono text-neutral-500 hover:text-[#111416] transition-colors"
          >
            <RotateCcw className="w-3 h-3" />
            <span>RESETEAZĂ</span>
          </button>
        )}
      </div>

      {/* 1. Colors Filter */}
      {availableColors.length > 0 && (
        <div className="space-y-2.5">
          <h4 className="font-mono font-bold text-[#111416] uppercase tracking-wider text-[11px]">
            CULOARE
          </h4>
          <div className="grid grid-cols-2 gap-1.5">
            {availableColors.map((col) => {
              const isChecked = selectedColors.includes(col.name);
              return (
                <button
                  key={col.name}
                  onClick={() => onToggleColor(col.name)}
                  className={`flex items-center gap-2 px-2 py-1.5 text-left border transition-all ${
                    isChecked
                      ? "border-[#111416] bg-[#111416] text-white"
                      : "border-[#E2E5E8] bg-white text-neutral-700 hover:border-neutral-400"
                  }`}
                >
                  <span
                    className="w-3.5 h-3.5 shrink-0 border border-neutral-300"
                    style={{ backgroundColor: col.displayColor }}
                  />
                  <span className="truncate text-[11px] font-medium">{col.name}</span>
                </button>
              );
            })}
          </div>
        </div>
      )}

      {/* 2. Standards Filter */}
      {availableStandards.length > 0 && (
        <div className="space-y-2.5 pt-2 border-t border-[#EAECE8]">
          <h4 className="font-mono font-bold text-[#111416] uppercase tracking-wider text-[11px]">
            STANDARDE ȘI CERTIFICĂRI
          </h4>
          <div className="flex flex-wrap gap-1.5">
            {availableStandards.map((std) => {
              const isChecked = selectedStandards.includes(std);
              return (
                <button
                  key={std}
                  onClick={() => onToggleStandard(std)}
                  className={`px-2.5 py-1 font-mono text-[11px] border transition-all ${
                    isChecked
                      ? "border-[#111416] bg-[#111416] text-white font-bold"
                      : "border-[#E2E5E8] bg-white text-neutral-600 hover:border-neutral-400"
                  }`}
                >
                  {std}
                </button>
              );
            })}
          </div>
        </div>
      )}

      {/* 3. Materials Filter */}
      {availableMaterials.length > 0 && (
        <div className="space-y-2.5 pt-2 border-t border-[#EAECE8]">
          <h4 className="font-mono font-bold text-[#111416] uppercase tracking-wider text-[11px]">
            MATERIAL
          </h4>
          <div className="space-y-1 max-h-48 overflow-y-auto pr-1">
            {availableMaterials.map((mat) => {
              const isChecked = selectedMaterials.includes(mat);
              return (
                <label
                  key={mat}
                  className="flex items-center gap-2 py-1 text-[11px] text-neutral-700 hover:text-[#111416] cursor-pointer"
                >
                  <input
                    type="checkbox"
                    checked={isChecked}
                    onChange={() => onToggleMaterial(mat)}
                    className="rounded-none border-neutral-300 text-[#111416] focus:ring-0 w-3.5 h-3.5"
                  />
                  <span className="truncate capitalize">{mat}</span>
                </label>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
}
