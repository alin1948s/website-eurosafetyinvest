"use server";

import { revalidatePath } from "next/cache";
import { quoteSubmissionSchema, QuoteSubmissionInput } from "@/lib/validation";
import {
  saveStoredQuote,
  updateStoredQuoteStatus,
  deleteStoredQuote,
  QuoteStatus,
  SavedQuote,
} from "@/lib/storage";

export interface QuoteSubmissionResult {
  success: boolean;
  referenceNumber?: string;
  message: string;
  errors?: Record<string, string[]>;
}

export async function submitQuoteAction(
  data: QuoteSubmissionInput
): Promise<QuoteSubmissionResult> {
  const result = quoteSubmissionSchema.safeParse(data);

  if (!result.success) {
    const formattedErrors: Record<string, string[]> = {};
    result.error.issues.forEach((issue) => {
      const path = issue.path.join(".");
      if (!formattedErrors[path]) formattedErrors[path] = [];
      formattedErrors[path].push(issue.message);
    });
    return {
      success: false,
      message: "Vă rugăm să corectați erorile din formular.",
      errors: formattedErrors,
    };
  }

  const validData = result.data;

  // Generate reference number ESI-YYMM-XXXX
  const datePart = new Date().toISOString().slice(2, 7).replace("-", "");
  const randomSuffix = Math.floor(1000 + Math.random() * 9000);
  const referenceNumber = `ESI-${datePart}-${randomSuffix}`;

  try {
    await saveStoredQuote({
      id: referenceNumber,
      referenceNumber,
      companyName: validData.companyName,
      cui: validData.cui,
      contactName: validData.contactName,
      phone: validData.phone,
      email: validData.email,
      city: validData.city,
      county: validData.county,
      notes: validData.notes,
      wantCustomization: validData.wantCustomization,
      customizationNotes: validData.customizationNotes,
      items: validData.items,
    });

    revalidatePath("/admin");

    console.log(`[QUOTE SAVED & REGISTERED] Ref: ${referenceNumber}`, {
      company: validData.companyName,
      contact: validData.contactName,
      phone: validData.phone,
      email: validData.email,
      itemsCount: validData.items.length,
    });

    return {
      success: true,
      referenceNumber,
      message: "Cererea de ofertă a fost recepționată și înregistrată cu succes.",
    };
  } catch (error) {
    console.error("Failed to save quote:", error);
    return {
      success: false,
      message: "A apărut o eroare tehnică la înregistrarea cererii de ofertă.",
    };
  }
}

export async function updateQuoteStatusAction(id: string, status: QuoteStatus) {
  const ok = await updateStoredQuoteStatus(id, status);
  if (ok) {
    revalidatePath("/admin");
  }
  return { success: ok };
}

export async function deleteQuoteAction(id: string) {
  const ok = await deleteStoredQuote(id);
  if (ok) {
    revalidatePath("/admin");
  }
  return { success: ok };
}
