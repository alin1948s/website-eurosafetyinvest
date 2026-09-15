"use client";

import React, { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useQuote } from "@/context/QuoteContext";
import { submitQuoteAction } from "@/actions/quote";
import {
  quoteContactFormSchema,
  QuoteContactFormInput,
  QuoteSubmissionInput,
} from "@/lib/validation";
import {
  ShieldCheck,
  Plus,
  Minus,
  Trash2,
  CheckCircle2,
  ArrowRight,
  AlertCircle,
  ShoppingBag,
} from "lucide-react";

export function QuoteForm() {
  const { items, itemCount, updateQuantity, removeItem, clearQuote } = useQuote();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submittedRef, setSubmittedRef] = useState<string | null>(null);
  const [serverError, setServerError] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<QuoteContactFormInput>({
    resolver: zodResolver(quoteContactFormSchema),
    defaultValues: {
      companyName: "",
      cui: "",
      contactName: "",
      phone: "",
      email: "",
      city: "",
      county: "",
      notes: "",
      wantCustomization: false,
      customizationNotes: "",
    },
  });

  const wantCustomization = watch("wantCustomization");

  const onSubmit = async (formData: QuoteContactFormInput) => {
    if (items.length === 0) {
      setServerError("Vă rugăm să adăugați cel puțin un produs în lista de ofertă.");
      return;
    }

    setIsSubmitting(true);
    setServerError(null);

    const payload: QuoteSubmissionInput = {
      ...formData,
      items: items.map((it) => ({
        id: it.product.id,
        name: it.product.name,
        code: it.product.code,
        quantity: it.quantity,
        selectedColor: it.selectedColor,
        selectedSize: it.selectedSize,
      })),
    };

    try {
      const res = await submitQuoteAction(payload);
      if (res.success && res.referenceNumber) {
        setSubmittedRef(res.referenceNumber);
        clearQuote();
      } else {
        setServerError(res.message || "A apărut o eroare la transmiterea cererii.");
      }
    } catch (e) {
      setServerError("A apărut o eroare de conexiune. Vă rugăm să încercați din nou.");
    } finally {
      setIsSubmitting(false);
    }
  };

  // Success screen
  if (submittedRef) {
    return (
      <div className="bg-white border border-[#E2E5E8] p-8 sm:p-14 text-center max-w-2xl mx-auto space-y-6 shadow-sm">
        <div className="w-16 h-16 bg-[#2E7D32]/10 border border-[#2E7D32] text-[#2E7D32] flex items-center justify-center mx-auto">
          <CheckCircle2 className="w-8 h-8" />
        </div>

        <div className="space-y-2">
          <span className="text-xs font-mono font-bold text-[#F26A21] uppercase tracking-wider block">
            CERERE TRIMISĂ CU SUCCES
          </span>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-[#111416]">
            Am primit solicitarea ta de ofertă.
          </h2>
          <p className="text-xs sm:text-sm text-neutral-600 max-w-md mx-auto leading-relaxed">
            Echipa tehnică și comercială Euro Safety Invest analizează necesarul transmis și te va contacta în cel mai scurt timp cu cotația personalizată de preț.
          </p>
        </div>

        <div className="bg-[#FAF9F5] border border-[#E2E5E8] p-4 font-mono text-xs max-w-sm mx-auto">
          <span className="text-neutral-500 block">NUMĂR DE ÎNREGISTRARE CERERE:</span>
          <span className="text-lg font-bold text-[#111416] tracking-wider block mt-1">
            {submittedRef}
          </span>
          <span className="text-[10px] text-neutral-400 block mt-1">
            Salvați acest cod pentru referință în comunicarea cu operatorii noștri.
          </span>
        </div>

        <div className="pt-2 flex flex-col sm:flex-row items-center justify-center gap-3">
          <button
            type="button"
            onClick={() => window.print()}
            className="px-5 py-2.5 bg-white border border-[#CBD5E1] hover:border-[#111416] text-[#111416] font-mono font-bold text-xs uppercase tracking-wider transition-colors inline-flex items-center gap-2"
          >
            <span>IMPRIMĂ / SALVEAZĂ CONFIRMAREA</span>
          </button>
        </div>

        <div className="pt-4 border-t border-[#EAECE8] flex flex-col sm:flex-row items-center justify-center gap-4">
          <Link
            href="/produse"
            className="px-6 py-3 bg-[#111416] hover:bg-[#F26A21] text-white font-mono font-bold text-xs uppercase tracking-wider transition-colors inline-flex items-center gap-2"
          >
            <span>ÎNAPOI LA CATALOGUL DE PRODUSE</span>
            <ArrowRight className="w-4 h-4" />
          </Link>

          <Link
            href="/contact"
            className="px-6 py-3 bg-white border border-neutral-300 text-[#111416] font-mono font-bold text-xs uppercase tracking-wider hover:bg-neutral-50 transition-colors"
          >
            DATE DE CONTACT
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
      {/* Left Column (5/12): Items Review Table */}
      <div className="lg:col-span-5 space-y-6">
        <div className="bg-white border border-[#E2E5E8] p-6 space-y-4">
          <div className="flex items-center justify-between border-b border-[#EAECE8] pb-3">
            <div>
              <h3 className="text-sm font-mono font-bold text-[#111416] uppercase tracking-wider">
                01 / PRODUSE SELECTATE
              </h3>
              <p className="text-[11px] font-mono text-neutral-500">
                {items.length} {items.length === 1 ? "ARTICOL" : "ARTICOLE"} ({itemCount} BUCĂȚI)
              </p>
            </div>

            {items.length > 0 && (
              <button
                type="button"
                onClick={clearQuote}
                className="text-[10px] font-mono text-neutral-400 hover:text-red-600 transition-colors"
              >
                Golește tot
              </button>
            )}
          </div>

          {items.length === 0 ? (
            <div className="py-10 text-center space-y-3">
              <ShoppingBag className="w-10 h-10 text-neutral-300 mx-auto" />
              <p className="text-sm font-medium text-neutral-600">
                Nu ai selectat încă niciun produs.
              </p>
              <Link
                href="/produse"
                className="inline-flex items-center gap-1.5 text-xs font-mono font-bold text-[#F26A21] hover:underline"
              >
                <span>Alege produse din catalog</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>
          ) : (
            <div className="divide-y divide-[#EAECE8] max-h-[500px] overflow-y-auto pr-1">
              {items.map((it, idx) => (
                <div key={idx} className="py-3 flex gap-3 items-center">
                  <div className="w-12 h-12 bg-[#FAF9F5] border border-neutral-200 p-1 shrink-0 flex items-center justify-center">
                    {it.product.images[0] ? (
                      <Image
                        src={it.product.images[0]}
                        alt={it.product.name}
                        width={44}
                        height={44}
                        className="object-contain w-full h-full"
                      />
                    ) : (
                      <div className="w-4 h-4 bg-neutral-300" />
                    )}
                  </div>

                  <div className="flex-1 min-w-0 text-xs">
                    <div className="text-[10px] font-mono font-bold text-[#F26A21]">
                      COD: {it.product.code}
                    </div>
                    <div className="font-semibold text-[#111416] truncate">
                      {it.product.name}
                    </div>
                    <div className="text-[10px] text-neutral-500 flex gap-2 font-mono">
                      {it.selectedColor && <span>Culoare: {it.selectedColor}</span>}
                      {it.selectedSize && <span>Mărime: {it.selectedSize}</span>}
                    </div>
                  </div>

                  {/* Quantity & Remove */}
                  <div className="flex items-center gap-2 shrink-0">
                    <div className="flex items-center border border-neutral-300 bg-[#FAF9F5] text-xs font-mono">
                      <button
                        type="button"
                        onClick={() =>
                          updateQuantity(
                            it.product.id,
                            it.quantity - 1,
                            it.selectedColor,
                            it.selectedSize
                          )
                        }
                        className="p-1 hover:bg-neutral-200 text-neutral-600"
                      >
                        <Minus className="w-3 h-3" />
                      </button>
                      <span className="px-2 font-bold min-w-[24px] text-center">
                        {it.quantity}
                      </span>
                      <button
                        type="button"
                        onClick={() =>
                          updateQuantity(
                            it.product.id,
                            it.quantity + 1,
                            it.selectedColor,
                            it.selectedSize
                          )
                        }
                        className="p-1 hover:bg-neutral-200 text-neutral-600"
                      >
                        <Plus className="w-3 h-3" />
                      </button>
                    </div>

                    <button
                      type="button"
                      onClick={() =>
                        removeItem(
                          it.product.id,
                          it.selectedColor,
                          it.selectedSize
                        )
                      }
                      className="text-neutral-400 hover:text-red-500 p-1"
                      title="Șterge"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}

          {items.length > 0 && (
            <div className="pt-3 border-t border-[#EAECE8] flex items-center justify-between text-xs font-mono">
              <Link
                href="/produse"
                className="text-[#F26A21] hover:underline flex items-center gap-1 font-semibold"
              >
                <span>+ Adaugă și alte echipamente</span>
              </Link>
              <span className="text-neutral-500">B2B OFERTĂ RAPIDĂ</span>
            </div>
          )}
        </div>

        {/* Info Box */}
        <div className="bg-[#FAF9F5] border border-[#E2E5E8] p-4 text-xs font-mono text-neutral-600 space-y-2">
          <div className="flex items-center gap-2 font-bold text-[#111416]">
            <ShieldCheck className="w-4 h-4 text-[#F26A21]" />
            <span>CONFIDENȚIALITATE ȘI FACTURARE B2B</span>
          </div>
          <p className="leading-relaxed text-[11px]">
            Ofertele noastre sunt calculate în funcție de cantitățile solicitate, personalizarea dorită și termenele de livrare. Datele transmise sunt utilizate exclusiv pentru elaborarea ofertei comerciale.
          </p>
        </div>
      </div>

      {/* Right Column (7/12): Customer Details Form */}
      <div className="lg:col-span-7">
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="bg-white border border-[#E2E5E8] p-6 sm:p-8 space-y-6 shadow-sm"
        >
          <div className="border-b border-[#EAECE8] pb-3">
            <h3 className="text-sm font-mono font-bold text-[#111416] uppercase tracking-wider">
              02 / DATE DE CONTACT ȘI IDENTIFICARE
            </h3>
            <p className="text-xs text-neutral-500">
              Vă rugăm să completați datele pentru a vă putea transmite oferta de preț.
            </p>
          </div>

          {serverError && (
            <div className="p-3 bg-red-50 border border-red-200 text-red-700 text-xs flex items-center gap-2 font-medium">
              <AlertCircle className="w-4 h-4 shrink-0" />
              <span>{serverError}</span>
            </div>
          )}

          {/* Section 1: Companie */}
          <div className="space-y-4">
            <div className="text-xs font-mono font-bold text-[#111416] uppercase">
              COMPANIE / ORGANIZAȚIE
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-medium text-neutral-700 mb-1">
                  Denumire companie *
                </label>
                <input
                  type="text"
                  {...register("companyName")}
                  placeholder="ex: SC Alfa Construct SRL"
                  className={`w-full px-3 py-2 text-xs border bg-[#FAF9F5] focus:bg-white focus:outline-none ${
                    errors.companyName ? "border-red-500" : "border-neutral-300 focus:border-black"
                  }`}
                />
                {errors.companyName && (
                  <span className="text-[10px] text-red-500 block mt-0.5">
                    {errors.companyName.message}
                  </span>
                )}
              </div>

              <div>
                <label className="block text-xs font-medium text-neutral-700 mb-1">
                  CUI / Cod Fiscal (opțional)
                </label>
                <input
                  type="text"
                  {...register("cui")}
                  placeholder="ex: RO12345678"
                  className="w-full px-3 py-2 text-xs border border-neutral-300 bg-[#FAF9F5] focus:bg-white focus:outline-none focus:border-black"
                />
              </div>
            </div>
          </div>

          {/* Section 2: Persoană de contact */}
          <div className="space-y-4 pt-2 border-t border-[#EAECE8]">
            <div className="text-xs font-mono font-bold text-[#111416] uppercase">
              PERSOANĂ DE CONTACT
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div>
                <label className="block text-xs font-medium text-neutral-700 mb-1">
                  Nume și prenume *
                </label>
                <input
                  type="text"
                  {...register("contactName")}
                  placeholder="ex: Ion Popescu"
                  className={`w-full px-3 py-2 text-xs border bg-[#FAF9F5] focus:bg-white focus:outline-none ${
                    errors.contactName ? "border-red-500" : "border-neutral-300 focus:border-black"
                  }`}
                />
                {errors.contactName && (
                  <span className="text-[10px] text-red-500 block mt-0.5">
                    {errors.contactName.message}
                  </span>
                )}
              </div>

              <div>
                <label className="block text-xs font-medium text-neutral-700 mb-1">
                  Telefon *
                </label>
                <input
                  type="tel"
                  {...register("phone")}
                  placeholder="ex: 0720 000 000"
                  className={`w-full px-3 py-2 text-xs border bg-[#FAF9F5] focus:bg-white focus:outline-none ${
                    errors.phone ? "border-red-500" : "border-neutral-300 focus:border-black"
                  }`}
                />
                {errors.phone && (
                  <span className="text-[10px] text-red-500 block mt-0.5">
                    {errors.phone.message}
                  </span>
                )}
              </div>

              <div>
                <label className="block text-xs font-medium text-neutral-700 mb-1">
                  Email *
                </label>
                <input
                  type="email"
                  {...register("email")}
                  placeholder="ex: contact@companie.ro"
                  className={`w-full px-3 py-2 text-xs border bg-[#FAF9F5] focus:bg-white focus:outline-none ${
                    errors.email ? "border-red-500" : "border-neutral-300 focus:border-black"
                  }`}
                />
                {errors.email && (
                  <span className="text-[10px] text-red-500 block mt-0.5">
                    {errors.email.message}
                  </span>
                )}
              </div>
            </div>
          </div>

          {/* Section 3: Locație livrare */}
          <div className="space-y-4 pt-2 border-t border-[#EAECE8]">
            <div className="text-xs font-mono font-bold text-[#111416] uppercase">
              LOCAȚIE LIVRARE
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-medium text-neutral-700 mb-1">
                  Localitate *
                </label>
                <input
                  type="text"
                  {...register("city")}
                  placeholder="ex: Constanța"
                  className={`w-full px-3 py-2 text-xs border bg-[#FAF9F5] focus:bg-white focus:outline-none ${
                    errors.city ? "border-red-500" : "border-neutral-300 focus:border-black"
                  }`}
                />
                {errors.city && (
                  <span className="text-[10px] text-red-500 block mt-0.5">
                    {errors.city.message}
                  </span>
                )}
              </div>

              <div>
                <label className="block text-xs font-medium text-neutral-700 mb-1">
                  Județ *
                </label>
                <input
                  type="text"
                  {...register("county")}
                  placeholder="ex: Constanța / București"
                  className={`w-full px-3 py-2 text-xs border bg-[#FAF9F5] focus:bg-white focus:outline-none ${
                    errors.county ? "border-red-500" : "border-neutral-300 focus:border-black"
                  }`}
                />
                {errors.county && (
                  <span className="text-[10px] text-red-500 block mt-0.5">
                    {errors.county.message}
                  </span>
                )}
              </div>
            </div>
          </div>

          {/* Section 4: Personalizare & Observații */}
          <div className="space-y-4 pt-2 border-t border-[#EAECE8]">
            <div className="flex items-center gap-2">
              <input
                type="checkbox"
                id="wantCustomization"
                {...register("wantCustomization")}
                className="w-4 h-4 rounded-none border-neutral-400 text-[#111416] focus:ring-0"
              />
              <label
                htmlFor="wantCustomization"
                className="text-xs font-semibold text-[#111416] cursor-pointer"
              >
                Doresc personalizarea echipamentelor textile (serigrafie / broderie)
              </label>
            </div>

            {wantCustomization && (
              <div className="p-3 bg-[#FAF9F5] border border-[#E2E5E8] space-y-2">
                <label className="block text-xs font-medium text-neutral-700">
                  Detalii personalizare (număr poziții logo, culori dorite):
                </label>
                <textarea
                  {...register("customizationNotes")}
                  rows={2}
                  placeholder="ex: Siglă piept stânga + spate, serigrafie 2 culori pe salopete"
                  className="w-full px-3 py-2 text-xs border border-neutral-300 bg-white focus:outline-none focus:border-black"
                />
              </div>
            )}

            <div>
              <label className="block text-xs font-medium text-neutral-700 mb-1">
                Mesaj / Observații suplimentare
              </label>
              <textarea
                {...register("notes")}
                rows={3}
                placeholder="ex: Termen de livrare dorit, condiții particulare de șantier sau cerințe speciale..."
                className="w-full px-3 py-2 text-xs border border-neutral-300 bg-[#FAF9F5] focus:bg-white focus:outline-none focus:border-black"
              />
            </div>
          </div>

          {/* Submit CTA */}
          <div className="pt-4 border-t border-[#EAECE8] space-y-3">
            <button
              type="submit"
              disabled={isSubmitting || items.length === 0}
              className={`w-full py-4 px-6 font-mono font-bold text-xs uppercase tracking-wider flex items-center justify-center gap-2 transition-all ${
                isSubmitting || items.length === 0
                  ? "bg-neutral-300 text-neutral-500 cursor-not-allowed"
                  : "bg-[#F26A21] hover:bg-[#ff7b36] text-black shadow-md"
              }`}
            >
              {isSubmitting ? (
                <span>SE TRANSMITE CEREREA...</span>
              ) : (
                <>
                  <span>TRIMITE CEREREA DE OFERTĂ</span>
                  <ArrowRight className="w-4 h-4" />
                </>
              )}
            </button>

            <p className="text-[11px] text-neutral-500 text-center font-mono">
              Prin trimiterea acestui formular confirmați că sunteți de acord cu prelucrarea datelor în scopul transmiterii ofertei de preț. Fără plăți online.
            </p>
          </div>
        </form>
      </div>
    </div>
  );
}
