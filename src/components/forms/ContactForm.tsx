"use client";

import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { submitContactAction } from "@/actions/contact";
import { contactSchema, ContactInput } from "@/lib/validation";
import { CheckCircle2, AlertCircle, ArrowRight } from "lucide-react";

export function ContactForm() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [serverError, setServerError] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<ContactInput>({
    resolver: zodResolver(contactSchema),
    defaultValues: {
      name: "",
      company: "",
      phone: "",
      email: "",
      message: "",
    },
  });

  const onSubmit = async (data: ContactInput) => {
    setIsSubmitting(true);
    setServerError(null);

    try {
      const res = await submitContactAction(data);
      if (res.success) {
        setIsSuccess(true);
        reset();
      } else {
        setServerError(res.message || "A apărut o eroare.");
      }
    } catch (e) {
      setServerError("A apărut o eroare la conexiune. Vă rugăm să reîncercați.");
    } finally {
      setIsSubmitting(false);
    }
  };

  if (isSuccess) {
    return (
      <div className="bg-white border border-[#E2E5E8] p-8 text-center space-y-4">
        <div className="w-12 h-12 bg-[#2E7D32]/10 border border-[#2E7D32] text-[#2E7D32] flex items-center justify-center mx-auto">
          <CheckCircle2 className="w-6 h-6" />
        </div>
        <h3 className="text-xl font-bold text-[#111416]">
          Mesajul a fost trimis cu succes!
        </h3>
        <p className="text-xs text-neutral-600 max-w-sm mx-auto">
          Vă mulțumim pentru interesul acordat. Un reprezentant Euro Safety Invest vă va contacta în cel mai scurt timp.
        </p>
        <button
          onClick={() => setIsSuccess(false)}
          className="mt-2 text-xs font-mono font-bold text-[#F26A21] underline"
        >
          Trimite un alt mesaj
        </button>
      </div>
    );
  }

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="bg-white border border-[#E2E5E8] p-6 sm:p-8 space-y-5 shadow-sm"
    >
      <div className="border-b border-[#EAECE8] pb-3">
        <h3 className="text-sm font-mono font-bold uppercase tracking-wider text-[#111416]">
          FORMULAR DE CONTACT RAPID
        </h3>
        <p className="text-xs text-neutral-500">
          Răspundem prompt la toate solicitările primite din partea companiilor.
        </p>
      </div>

      {serverError && (
        <div className="p-3 bg-red-50 border border-red-200 text-red-700 text-xs flex items-center gap-2">
          <AlertCircle className="w-4 h-4 shrink-0" />
          <span>{serverError}</span>
        </div>
      )}

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <label className="block text-xs font-medium text-neutral-700 mb-1">
            Nume și prenume *
          </label>
          <input
            type="text"
            {...register("name")}
            placeholder="ex: Mihai Popa"
            className={`w-full px-3 py-2 text-xs border bg-[#FAF9F5] focus:bg-white focus:outline-none ${
              errors.name ? "border-red-500" : "border-neutral-300 focus:border-black"
            }`}
          />
          {errors.name && (
            <span className="text-[10px] text-red-500 block mt-0.5">
              {errors.name.message}
            </span>
          )}
        </div>

        <div>
          <label className="block text-xs font-medium text-neutral-700 mb-1">
            Companie (opțional)
          </label>
          <input
            type="text"
            {...register("company")}
            placeholder="ex: SC Eurotrans SRL"
            className="w-full px-3 py-2 text-xs border border-neutral-300 bg-[#FAF9F5] focus:bg-white focus:outline-none focus:border-black"
          />
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
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
            placeholder="ex: office@eurotrans.ro"
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

      <div>
        <label className="block text-xs font-medium text-neutral-700 mb-1">
          Mesaj *
        </label>
        <textarea
          {...register("message")}
          rows={4}
          placeholder="Descrieți produsele dorite, cantitățile estimate sau cerințele de securitate..."
          className={`w-full px-3 py-2 text-xs border bg-[#FAF9F5] focus:bg-white focus:outline-none ${
            errors.message ? "border-red-500" : "border-neutral-300 focus:border-black"
          }`}
        />
        {errors.message && (
          <span className="text-[10px] text-red-500 block mt-0.5">
            {errors.message.message}
          </span>
        )}
      </div>

      <button
        type="submit"
        disabled={isSubmitting}
        className="w-full py-3.5 bg-[#F26A21] hover:bg-[#ff7b36] text-black font-mono font-bold text-xs uppercase tracking-wider flex items-center justify-center gap-2 transition-colors disabled:opacity-50 shadow-sm"
      >
        {isSubmitting ? (
          <span>SE TRIMITE...</span>
        ) : (
          <>
            <span>TRIMITE MESAJUL</span>
            <ArrowRight className="w-4 h-4" />
          </>
        )}
      </button>
    </form>
  );
}
