"use server";

import { revalidatePath } from "next/cache";
import { contactSchema, ContactInput } from "@/lib/validation";
import {
  saveStoredContact,
  markStoredContactRead,
  deleteStoredContact,
} from "@/lib/storage";

export async function submitContactAction(data: ContactInput) {
  const result = contactSchema.safeParse(data);

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

  try {
    await saveStoredContact({
      name: result.data.name,
      email: result.data.email,
      phone: result.data.phone,
      company: result.data.company,
      subject: result.data.subject || "Solicitare Informații / Contact",
      message: result.data.message,
    });

    revalidatePath("/admin");

    console.log("[CONTACT SUBMITTED & SAVED]", result.data);

    return {
      success: true,
      message: "Mesajul a fost transmis și înregistrat cu succes. Vă vom contacta în cel mai scurt timp.",
    };
  } catch (error) {
    console.error("Failed to save contact message:", error);
    return {
      success: false,
      message: "A apărut o eroare tehnică la transmiterea mesajului.",
    };
  }
}

export async function markContactReadAction(id: string) {
  const ok = await markStoredContactRead(id);
  if (ok) revalidatePath("/admin");
  return { success: ok };
}

export async function deleteContactAction(id: string) {
  const ok = await deleteStoredContact(id);
  if (ok) revalidatePath("/admin");
  return { success: ok };
}
