import React from "react";
import { Specification } from "@/lib/types";

interface SpecificationTableProps {
  specifications: Specification[];
  standards: string[];
  materials: string[];
  sizes: string[];
  code: string;
}

export function SpecificationTable({
  specifications,
  standards,
  materials,
  sizes,
  code,
}: SpecificationTableProps) {
  // Consolidate non-empty specifications
  const rows: { label: string; value: string }[] = [];

  // Always show product code
  rows.push({ label: "COD PRODUS", value: code });

  // Add standards if present
  if (standards.length > 0) {
    rows.push({ label: "STANDARDE / CERTIFICĂRI", value: standards.join(" • ") });
  }

  // Add specifications extracted from catalog
  specifications.forEach((s) => {
    if (s.value && s.value.trim() && !rows.some((r) => r.label.toLowerCase() === s.label.toLowerCase())) {
      rows.push({ label: s.label.toUpperCase(), value: s.value.trim() });
    }
  });

  // Add sizes if not already in specifications
  if (sizes.length > 0 && !rows.some((r) => r.label.includes("MĂRIMI") || r.label.includes("MARIMI"))) {
    rows.push({ label: "MĂRIMI DISPONIBILE", value: sizes.join(", ") });
  }

  // Add materials if not already present
  if (materials.length > 0 && !rows.some((r) => r.label.includes("MATERIAL"))) {
    rows.push({ label: "MATERIAL", value: materials.join(", ") });
  }

  if (rows.length === 0) return null;

  return (
    <div className="border border-[#E2E5E8] overflow-hidden bg-white">
      <div className="px-4 py-3 bg-[#FAF9F5] border-b border-[#E2E5E8] flex items-center justify-between">
        <span className="font-mono text-xs font-bold uppercase tracking-wider text-[#111416]">
          FIȘĂ TEHNICĂ &bull; SPECIFICAȚII
        </span>
        <span className="text-[10px] font-mono text-neutral-500">
          CONFORMITATE E.I.P.
        </span>
      </div>

      <div className="divide-y divide-[#EAECE8]">
        {rows.map((row, idx) => (
          <div
            key={idx}
            className="grid grid-cols-1 sm:grid-cols-3 p-3 text-xs hover:bg-[#FAF9F5] transition-colors"
          >
            <div className="font-mono text-[11px] font-semibold text-neutral-500 uppercase tracking-wide sm:col-span-1">
              {row.label}
            </div>
            <div className="font-medium text-[#111416] sm:col-span-2 mt-0.5 sm:mt-0 leading-relaxed">
              {row.value}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
