import fs from "fs/promises";
import path from "path";
import { catalog } from "@/data/catalog";

export type QuoteStatus = "noua" | "in_lucru" | "ofertata" | "finalizata" | "anulata";

export interface SavedQuoteItem {
  id: string;
  name: string;
  code: string;
  quantity: number;
  selectedColor?: string;
  selectedSize?: string;
  image?: string;
}

export interface SavedQuote {
  id: string; // referenceNumber e.g. "ESI-2609-4821"
  referenceNumber: string;
  createdAt: string; // ISO string
  status: QuoteStatus;
  companyName: string;
  cui?: string;
  contactName: string;
  phone: string;
  email: string;
  city: string;
  county: string;
  notes?: string;
  wantCustomization: boolean;
  customizationNotes?: string;
  items: SavedQuoteItem[];
}

export interface SavedContact {
  id: string;
  createdAt: string;
  name: string;
  email: string;
  phone?: string;
  company?: string;
  subject: string;
  message: string;
  isRead: boolean;
}

const DATA_DIR = path.join(process.cwd(), "data");
const QUOTES_FILE = path.join(DATA_DIR, "quotes.json");
const CONTACTS_FILE = path.join(DATA_DIR, "contacts.json");

async function ensureDataFiles(): Promise<void> {
  try {
    await fs.mkdir(DATA_DIR, { recursive: true });
  } catch (e) {
    // directory exists
  }

  try {
    await fs.access(QUOTES_FILE);
  } catch {
    // Seed initial demo quote so admin view looks ready on first run
    const demoQuote: SavedQuote = {
      id: "ESI-2609-1082",
      referenceNumber: "ESI-2609-1082",
      createdAt: new Date().toISOString(),
      status: "noua",
      companyName: "S.C. Maritime Logistics Services SRL",
      cui: "RO32918274",
      contactName: "Ing. Cristian Popescu",
      phone: "0722 554 433",
      email: "achizitii@maritimelogistics.ro",
      city: "Constanța",
      county: "Constanța",
      notes: "Livrare la Poarta 6 a Portului Constanța. Solicităm fișe tehnice și certificate de conformitate CE pentru fiecare articol.",
      wantCustomization: true,
      customizationNotes: "Serigrafie logo companie pe spatele jachetelor (dimensiune 25x10 cm, 2 culori) și broderie pe piept stânga.",
      items: [
        {
          id: "esi-casca-de-protectie-produs-fabricat-in-italia",
          name: "Cască de protecție Guamo",
          code: "111-1-G1",
          quantity: 25,
          selectedColor: "Alb",
          image: "/poze/casti/guamo.jpg",
        },
        {
          id: "esi-331-1",
          name: "Mănuși Nitex",
          code: "331-1",
          quantity: 100,
          selectedSize: "10 (XL)",
          image: "/poze/manusi cauciuc/Nitex.jpg",
        },
        {
          id: "esi-bari-s1",
          name: "Pantofi Bari S1",
          code: "BARI S1",
          quantity: 20,
          selectedSize: "43",
          image: "/poze/pantofi/bari.jpg",
        },
      ],
    };
    await fs.writeFile(QUOTES_FILE, JSON.stringify([demoQuote], null, 2), "utf-8");
  }

  try {
    await fs.access(CONTACTS_FILE);
  } catch {
    const demoContact: SavedContact = {
      id: "cnt-sample-1",
      createdAt: new Date().toISOString(),
      name: "Radu Munteanu",
      company: "Terminal Portuar Tomis",
      email: "r.munteanu@tomisport.ro",
      phone: "0740 123 987",
      subject: "Consultanță echipamente protecție lucru la înălțime",
      message: "Bună ziua, dorim să stabilim o întâlnire la sediul dumneavoastră din Constanța, str. Călărași nr. 14, pentru a testa mostrele de centuri de siguranță PB-20 și căști de protecție.",
      isRead: false,
    };
    await fs.writeFile(CONTACTS_FILE, JSON.stringify([demoContact], null, 2), "utf-8");
  }
}

// ---------------- Quotes Operations ----------------

export async function getStoredQuotes(): Promise<SavedQuote[]> {
  await ensureDataFiles();
  try {
    const raw = await fs.readFile(QUOTES_FILE, "utf-8");
    const parsed: SavedQuote[] = JSON.parse(raw);
    return parsed.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
  } catch (e) {
    console.error("Error reading quotes.json:", e);
    return [];
  }
}

export async function saveStoredQuote(
  newQuoteData: Omit<SavedQuote, "createdAt" | "status">
): Promise<SavedQuote> {
  await ensureDataFiles();
  const quotes = await getStoredQuotes();

  // Enhance items with catalog images if not already present
  const enrichedItems: SavedQuoteItem[] = newQuoteData.items.map((item) => {
    if (item.image) return item;
    const foundProduct = catalog.find(
      (p) => p.id === item.id || p.code.toLowerCase() === item.code.toLowerCase()
    );
    return {
      ...item,
      image: foundProduct?.images?.[0] || "/images/sigle.gif",
    };
  });

  const completeQuote: SavedQuote = {
    ...newQuoteData,
    items: enrichedItems,
    createdAt: new Date().toISOString(),
    status: "noua",
  };

  quotes.unshift(completeQuote);
  await fs.writeFile(QUOTES_FILE, JSON.stringify(quotes, null, 2), "utf-8");
  return completeQuote;
}

export async function updateStoredQuoteStatus(
  id: string,
  status: QuoteStatus
): Promise<boolean> {
  await ensureDataFiles();
  const quotes = await getStoredQuotes();
  const index = quotes.findIndex((q) => q.id === id || q.referenceNumber === id);
  if (index === -1) return false;

  quotes[index].status = status;
  await fs.writeFile(QUOTES_FILE, JSON.stringify(quotes, null, 2), "utf-8");
  return true;
}

export async function deleteStoredQuote(id: string): Promise<boolean> {
  await ensureDataFiles();
  const quotes = await getStoredQuotes();
  const filtered = quotes.filter((q) => q.id !== id && q.referenceNumber !== id);
  if (filtered.length === quotes.length) return false;

  await fs.writeFile(QUOTES_FILE, JSON.stringify(filtered, null, 2), "utf-8");
  return true;
}

// ---------------- Contacts Operations ----------------

export async function getStoredContacts(): Promise<SavedContact[]> {
  await ensureDataFiles();
  try {
    const raw = await fs.readFile(CONTACTS_FILE, "utf-8");
    const parsed: SavedContact[] = JSON.parse(raw);
    return parsed.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
  } catch (e) {
    console.error("Error reading contacts.json:", e);
    return [];
  }
}

export async function saveStoredContact(
  contactData: Omit<SavedContact, "id" | "createdAt" | "isRead">
): Promise<SavedContact> {
  await ensureDataFiles();
  const contacts = await getStoredContacts();

  const completeContact: SavedContact = {
    ...contactData,
    id: `cnt-${Date.now()}-${Math.floor(Math.random() * 1000)}`,
    createdAt: new Date().toISOString(),
    isRead: false,
  };

  contacts.unshift(completeContact);
  await fs.writeFile(CONTACTS_FILE, JSON.stringify(contacts, null, 2), "utf-8");
  return completeContact;
}

export async function markStoredContactRead(id: string): Promise<boolean> {
  await ensureDataFiles();
  const contacts = await getStoredContacts();
  const index = contacts.findIndex((c) => c.id === id);
  if (index === -1) return false;

  contacts[index].isRead = true;
  await fs.writeFile(CONTACTS_FILE, JSON.stringify(contacts, null, 2), "utf-8");
  return true;
}

export async function deleteStoredContact(id: string): Promise<boolean> {
  await ensureDataFiles();
  const contacts = await getStoredContacts();
  const filtered = contacts.filter((c) => c.id !== id);
  if (filtered.length === contacts.length) return false;

  await fs.writeFile(CONTACTS_FILE, JSON.stringify(filtered, null, 2), "utf-8");
  return true;
}
