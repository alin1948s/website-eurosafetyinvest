import { z } from "zod";

export const quoteItemSchema = z.object({
  id: z.string(),
  name: z.string(),
  code: z.string(),
  quantity: z.number().min(1),
  selectedColor: z.string().optional(),
  selectedSize: z.string().optional(),
});

export const quoteContactFormSchema = z.object({
  companyName: z.string().min(2, "Denumirea companiei este obligatorie."),
  cui: z.string().optional(),
  contactName: z.string().min(2, "Numele de contact este obligatoriu."),
  phone: z
    .string()
    .min(9, "Numărul de telefon trebuie să conțină cel puțin 9 cifre.")
    .regex(/^[0-9\+\s\-\(\)]+$/, "Format telefon invalid."),
  email: z.string().email("Adresă de e-mail invalidă."),
  city: z.string().min(2, "Localitatea este obligatorie."),
  county: z.string().min(2, "Județul este obligatoriu."),
  notes: z.string().optional(),
  wantCustomization: z.boolean(),
  customizationNotes: z.string().optional(),
});

export const quoteSubmissionSchema = quoteContactFormSchema.extend({
  items: z.array(quoteItemSchema).min(1, "Selectați cel puțin un produs pentru ofertă."),
});

export type QuoteContactFormInput = z.infer<typeof quoteContactFormSchema>;
export type QuoteSubmissionInput = z.infer<typeof quoteSubmissionSchema>;

export const contactSchema = z.object({
  name: z.string().min(2, "Numele este obligatoriu."),
  company: z.string().optional(),
  phone: z
    .string()
    .min(9, "Numărul de telefon trebuie să conțină cel puțin 9 cifre.")
    .regex(/^[0-9\+\s\-\(\)]+$/, "Format telefon invalid."),
  email: z.string().email("Adresă de e-mail invalidă."),
  subject: z.string().optional(),
  message: z.string().min(10, "Mesajul trebuie să conțină cel puțin 10 caractere."),
});

export type ContactInput = z.infer<typeof contactSchema>;
