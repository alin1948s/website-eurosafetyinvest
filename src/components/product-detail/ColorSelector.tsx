"use client";

import React from "react";
import { ColorVariant } from "@/lib/types";

interface ColorSelectorProps {
  colors: ColorVariant[];
  selectedColor?: string;
  onSelectColor: (colorName: string) => void;
}

export function ColorSelector({
  colors,
  selectedColor,
  onSelectColor,
}: ColorSelectorProps) {
  if (!colors || colors.length === 0) return null;

  return (
    <div className="space-y-3 py-3 border-t border-[#EAECE8]">
      <div className="flex items-center justify-between text-xs font-mono">
        <span className="font-bold uppercase tracking-wider text-[#111416]">
          CULORI DISPONIBILE
        </span>
        {selectedColor && (
          <span className="text-[#F26A21] font-semibold">{selectedColor}</span>
        )}
      </div>

      <div className="flex flex-wrap gap-2">
        {colors.map((color) => {
          const isSelected = selectedColor === color.name;
          return (
            <button
              key={color.name}
              type="button"
              onClick={() => onSelectColor(color.name)}
              className={`flex items-center gap-2 px-3 py-1.5 border transition-all text-xs font-medium ${
                isSelected
                  ? "border-[#111416] bg-[#111416] text-white shadow-sm"
                  : "border-[#D7DAD8] bg-white text-neutral-700 hover:border-neutral-500"
              }`}
            >
              <span
                className="w-3.5 h-3.5 shrink-0 border border-neutral-300"
                style={{ backgroundColor: color.displayColor || "#666666" }}
              />
              <span>{color.name}</span>
              {color.ral && (
                <span className="text-[10px] font-mono opacity-60">RAL {color.ral}</span>
              )}
            </button>
          );
        })}
      </div>
    </div>
  );
}
