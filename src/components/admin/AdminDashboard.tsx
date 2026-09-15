"use client";

import React, { useState, useTransition } from "react";
import Link from "next/link";
import Image from "next/image";
import {
  SavedQuote,
  SavedContact,
  QuoteStatus,
} from "@/lib/storage";
import {
  updateQuoteStatusAction,
  deleteQuoteAction,
} from "@/actions/quote";
import {
  markContactReadAction,
  deleteContactAction,
} from "@/actions/contact";
import {
  FileText,
  Phone,
  Mail,
  Building2,
  MapPin,
  Calendar,
  Clock,
  Printer,
  Copy,
  Check,
  Trash2,
  Filter,
  Search,
  Sparkles,
  RefreshCw,
  AlertCircle,
  Eye,
  CheckCircle2,
  MessageSquare,
  Download,
  ExternalLink,
  Shield,
  Layers,
  ArrowRight,
  User,
  Package,
} from "lucide-react";

interface AdminDashboardProps {
  initialQuotes: SavedQuote[];
  initialContacts: SavedContact[];
}

export function AdminDashboard({
  initialQuotes,
  initialContacts,
}: AdminDashboardProps) {
  const [activeTab, setActiveTab] = useState<"quotes" | "contacts">("quotes");
  const [quotes, setQuotes] = useState<SavedQuote[]>(initialQuotes);
  const [contacts, setContacts] = useState<SavedContact[]>(initialContacts);
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState<string>("all");
  const [selectedQuote, setSelectedQuote] = useState<SavedQuote | null>(null);
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const [isPending, startTransition] = useTransition();

  // Status mapping
  const statusConfig: Record<
    QuoteStatus,
    { label: string; bg: string; text: string; border: string }
  > = {
    noua: {
      label: "Nouă / În Așteptare",
      bg: "bg-amber-50",
      text: "text-amber-800",
      border: "border-amber-300",
    },
    in_lucru: {
      label: "În Prelucrare",
      bg: "bg-blue-50",
      text: "text-blue-800",
      border: "border-blue-300",
    },
    ofertata: {
      label: "Ofertată (Trimisă)",
      bg: "bg-emerald-50",
      text: "text-emerald-800",
      border: "border-emerald-300",
    },
    finalizata: {
      label: "Comandată / Finalizată",
      bg: "bg-purple-50",
      text: "text-purple-800",
      border: "border-purple-300",
    },
    anulata: {
      label: "Anulată",
      bg: "bg-neutral-100",
      text: "text-neutral-600",
      border: "border-neutral-300",
    },
  };

  // Stats calculations
  const totalQuotes = quotes.length;
  const newQuotesCount = quotes.filter((q) => q.status === "noua").length;
  const totalItemsRequested = quotes.reduce(
    (acc, q) => acc + q.items.reduce((sum, it) => sum + it.quantity, 0),
    0
  );
  const unreadContactsCount = contacts.filter((c) => !c.isRead).length;

  // Filtered quotes
  const filteredQuotes = quotes.filter((q) => {
    const matchesSearch =
      q.referenceNumber.toLowerCase().includes(searchQuery.toLowerCase()) ||
      q.companyName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      q.contactName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      q.phone.toLowerCase().includes(searchQuery.toLowerCase()) ||
      q.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (q.cui && q.cui.toLowerCase().includes(searchQuery.toLowerCase()));

    const matchesStatus =
      statusFilter === "all" ? true : q.status === statusFilter;

    return matchesSearch && matchesStatus;
  });

  // Handle status update
  const handleStatusChange = async (quoteId: string, newStatus: QuoteStatus) => {
    startTransition(async () => {
      setQuotes((prev) =>
        prev.map((q) => (q.id === quoteId ? { ...q, status: newStatus } : q))
      );
      if (selectedQuote && selectedQuote.id === quoteId) {
        setSelectedQuote((prev) => (prev ? { ...prev, status: newStatus } : null));
      }
      await updateQuoteStatusAction(quoteId, newStatus);
    });
  };

  // Handle delete quote
  const handleDeleteQuote = async (quoteId: string) => {
    if (!confirm(`Confirmați ștergerea cererii de ofertă #${quoteId}?`)) return;
    startTransition(async () => {
      setQuotes((prev) => prev.filter((q) => q.id !== quoteId));
      if (selectedQuote?.id === quoteId) setSelectedQuote(null);
      await deleteQuoteAction(quoteId);
    });
  };

  // Handle mark contact as read
  const handleMarkContactRead = async (contactId: string) => {
    startTransition(async () => {
      setContacts((prev) =>
        prev.map((c) => (c.id === contactId ? { ...c, isRead: true } : c))
      );
      await markContactReadAction(contactId);
    });
  };

  // Handle delete contact
  const handleDeleteContact = async (contactId: string) => {
    if (!confirm("Sigur doriți să ștergeți acest mesaj de contact?")) return;
    startTransition(async () => {
      setContacts((prev) => prev.filter((c) => c.id !== contactId));
      await deleteContactAction(contactId);
    });
  };

  // Copy summary to clipboard
  const handleCopySummary = (q: SavedQuote) => {
    const lines = [
      `=========================================`,
      `CERERE DE OFERTĂ: ${q.referenceNumber}`,
      `DATA: ${new Date(q.createdAt).toLocaleString("ro-RO")}`,
      `-----------------------------------------`,
      `CLIENT: ${q.companyName}`,
      `CUI: ${q.cui || "Nespecificat"}`,
      `CONTACT: ${q.contactName}`,
      `TELEFON: ${q.phone}`,
      `EMAIL: ${q.email}`,
      `LOCALITATE: ${q.city}, ${q.county}`,
      `PERSONALIZARE: ${q.wantCustomization ? "DA - " + (q.customizationNotes || "") : "NU"}`,
      `NOTIȚE: ${q.notes || "Fără instrucțiuni suplimentare"}`,
      `-----------------------------------------`,
      `PRODUSE SOLICITATE:`,
      ...q.items.map(
        (it, idx) =>
          `${idx + 1}. [Cod: ${it.code}] ${it.name} — Cantitate: ${it.quantity} buc. ${
            it.selectedColor ? "• Culoare: " + it.selectedColor : ""
          } ${it.selectedSize ? "• Mărime: " + it.selectedSize : ""}`
      ),
      `=========================================`,
    ];

    navigator.clipboard.writeText(lines.join("\n"));
    setCopiedId(q.id);
    setTimeout(() => setCopiedId(null), 2500);
  };

  const formatDate = (isoString: string) => {
    const d = new Date(isoString);
    return d.toLocaleDateString("ro-RO", {
      day: "2-digit",
      month: "short",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  return (
    <div className="min-h-screen bg-[#F6F5F1] text-[#111416] pb-24 font-sans">
      {/* Top Admin Navigation Bar */}
      <header className="bg-[#111416] text-white border-b border-[#2B343B] sticky top-0 z-30">
        <div className="max-w-[1400px] mx-auto px-4 sm:px-6 h-16 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 bg-[#F26A21] flex items-center justify-center text-black font-mono font-black text-sm">
              ESI
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="font-mono font-bold text-xs uppercase tracking-wider text-white">
                  EURO SAFETY INVEST
                </span>
                <span className="px-1.5 py-0.2 text-[9px] font-mono font-semibold bg-[#E9CF38] text-black uppercase">
                  ADMIN
                </span>
              </div>
              <p className="text-[10px] font-mono text-neutral-400">
                PANOU INTERN DE GESTIUNE CERERI DE OFERTĂ & MESAJE
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <Link
              href="/"
              target="_blank"
              className="px-3 py-1.5 bg-[#1B2024] hover:bg-[#2B343B] text-neutral-300 text-xs font-mono flex items-center gap-1.5 transition-colors border border-neutral-700"
            >
              <span>VEZI SITE-UL</span>
              <ExternalLink className="w-3 h-3 text-[#F26A21]" />
            </Link>

            <button
              onClick={() => window.location.reload()}
              className="p-1.5 bg-[#1B2024] hover:bg-[#2B343B] text-neutral-300 border border-neutral-700 transition-colors"
              title="Reîmprospătează datele"
            >
              <RefreshCw className="w-4 h-4 text-white" />
            </button>
          </div>
        </div>
      </header>

      {/* Main Content Container */}
      <main className="max-w-[1400px] mx-auto px-4 sm:px-6 pt-8 space-y-8">
        {/* KPI Stats Overview */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className="bg-white border border-[#E2E5E8] p-4 sm:p-5 flex flex-col justify-between shadow-sm">
            <div className="flex items-center justify-between text-neutral-500 mb-2">
              <span className="text-xs font-mono uppercase tracking-wider">
                Total Cereri
              </span>
              <FileText className="w-4 h-4 text-[#111416]" />
            </div>
            <div className="flex items-baseline gap-2">
              <span className="text-2xl sm:text-3xl font-mono font-extrabold text-[#111416]">
                {totalQuotes}
              </span>
              <span className="text-[11px] font-mono text-neutral-400">înregistrate</span>
            </div>
          </div>

          <div className="bg-white border border-[#E2E5E8] p-4 sm:p-5 flex flex-col justify-between shadow-sm relative overflow-hidden">
            {newQuotesCount > 0 && (
              <span className="absolute top-0 right-0 w-3 h-3 bg-[#F26A21]" />
            )}
            <div className="flex items-center justify-between text-neutral-500 mb-2">
              <span className="text-xs font-mono uppercase tracking-wider text-[#F26A21] font-bold">
                Cereri Noi / În Așteptare
              </span>
              <AlertCircle className="w-4 h-4 text-[#F26A21]" />
            </div>
            <div className="flex items-baseline gap-2">
              <span className="text-2xl sm:text-3xl font-mono font-extrabold text-[#F26A21]">
                {newQuotesCount}
              </span>
              <span className="text-[11px] font-mono text-neutral-400">necesită cotație</span>
            </div>
          </div>

          <div className="bg-white border border-[#E2E5E8] p-4 sm:p-5 flex flex-col justify-between shadow-sm">
            <div className="flex items-center justify-between text-neutral-500 mb-2">
              <span className="text-xs font-mono uppercase tracking-wider">
                Volum Articole
              </span>
              <Package className="w-4 h-4 text-[#111416]" />
            </div>
            <div className="flex items-baseline gap-2">
              <span className="text-2xl sm:text-3xl font-mono font-extrabold text-[#111416]">
                {totalItemsRequested}
              </span>
              <span className="text-[11px] font-mono text-neutral-400">bucăți cerute</span>
            </div>
          </div>

          <div className="bg-white border border-[#E2E5E8] p-4 sm:p-5 flex flex-col justify-between shadow-sm">
            <div className="flex items-center justify-between text-neutral-500 mb-2">
              <span className="text-xs font-mono uppercase tracking-wider">
                Mesaje Contact
              </span>
              <MessageSquare className="w-4 h-4 text-[#111416]" />
            </div>
            <div className="flex items-baseline gap-2">
              <span className="text-2xl sm:text-3xl font-mono font-extrabold text-[#111416]">
                {contacts.length}
              </span>
              {unreadContactsCount > 0 && (
                <span className="text-[10px] font-mono font-bold px-1.5 py-0.5 bg-amber-100 text-amber-900 border border-amber-300">
                  {unreadContactsCount} NOI
                </span>
              )}
            </div>
          </div>
        </div>

        {/* Tab Selector & Controls */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 border-b border-[#D8DCE0] pb-4">
          <div className="flex items-center gap-2">
            <button
              onClick={() => setActiveTab("quotes")}
              className={`px-4 py-2 font-mono text-xs font-bold uppercase tracking-wider transition-all flex items-center gap-2 border ${
                activeTab === "quotes"
                  ? "bg-[#111416] text-white border-[#111416] shadow-sm"
                  : "bg-white text-neutral-600 border-[#E2E5E8] hover:border-[#111416] hover:text-[#111416]"
              }`}
            >
              <FileText className="w-4 h-4" />
              <span>Cereri de Ofertă ({quotes.length})</span>
              {newQuotesCount > 0 && (
                <span className="w-2 h-2 rounded-full bg-[#F26A21]" />
              )}
            </button>

            <button
              onClick={() => setActiveTab("contacts")}
              className={`px-4 py-2 font-mono text-xs font-bold uppercase tracking-wider transition-all flex items-center gap-2 border ${
                activeTab === "contacts"
                  ? "bg-[#111416] text-white border-[#111416] shadow-sm"
                  : "bg-white text-neutral-600 border-[#E2E5E8] hover:border-[#111416] hover:text-[#111416]"
              }`}
            >
              <MessageSquare className="w-4 h-4" />
              <span>Mesaje Contact ({contacts.length})</span>
              {unreadContactsCount > 0 && (
                <span className="w-2 h-2 rounded-full bg-[#F26A21]" />
              )}
            </button>
          </div>

          {activeTab === "quotes" && (
            <div className="flex flex-wrap items-center gap-2 w-full sm:w-auto">
              <div className="relative flex-1 sm:w-64">
                <Search className="w-3.5 h-3.5 text-neutral-400 absolute left-2.5 top-1/2 -translate-y-1/2" />
                <input
                  type="text"
                  placeholder="Caută ref, firmă, telefon..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-8 pr-3 py-1.5 bg-white border border-[#CBD5E1] text-xs font-sans placeholder-neutral-400 focus:outline-none focus:border-[#111416]"
                />
              </div>

              <select
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
                className="px-2.5 py-1.5 bg-white border border-[#CBD5E1] text-xs font-mono font-medium focus:outline-none focus:border-[#111416]"
              >
                <option value="all">Toate statusurile</option>
                <option value="noua">Nouă / În Așteptare</option>
                <option value="in_lucru">În Prelucrare</option>
                <option value="ofertata">Ofertată</option>
                <option value="finalizata">Comandată / Finalizată</option>
                <option value="anulata">Anulată</option>
              </select>
            </div>
          )}
        </div>

        {/* TAB 1: QUOTES VIEW */}
        {activeTab === "quotes" && (
          <div className="space-y-4">
            {filteredQuotes.length === 0 ? (
              <div className="bg-white border border-[#E2E5E8] p-12 text-center space-y-3">
                <FileText className="w-10 h-10 text-neutral-300 mx-auto" />
                <h3 className="text-base font-bold text-[#111416]">
                  Nicio cerere de ofertă găsită
                </h3>
                <p className="text-xs text-neutral-500 max-w-sm mx-auto">
                  {searchQuery || statusFilter !== "all"
                    ? "Nu există cereri care să corespundă criteriilor de filtrare selectate."
                    : "Nu a fost recepționată încă nicio cerere de ofertă de pe site."}
                </p>
              </div>
            ) : (
              <div className="space-y-4">
                {filteredQuotes.map((quote) => {
                  const cfg = statusConfig[quote.status] || statusConfig.noua;
                  const totalItems = quote.items.reduce(
                    (s, it) => s + it.quantity,
                    0
                  );

                  return (
                    <div
                      key={quote.id}
                      className={`bg-white border ${
                        quote.status === "noua"
                          ? "border-l-4 border-l-[#F26A21] border-[#D8DCE0]"
                          : "border-[#E2E5E8]"
                      } p-5 hover:border-[#111416] transition-all shadow-sm space-y-4`}
                    >
                      {/* Quote Row Header */}
                      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-[#F0F2F4] pb-3">
                        <div className="flex flex-wrap items-center gap-2.5">
                          <span className="font-mono font-extrabold text-sm sm:text-base text-[#111416] tracking-tight">
                            {quote.referenceNumber}
                          </span>

                          <span
                            className={`px-2 py-0.5 text-[10px] font-mono font-bold uppercase border ${cfg.bg} ${cfg.text} ${cfg.border}`}
                          >
                            {cfg.label}
                          </span>

                          {quote.wantCustomization && (
                            <span className="px-2 py-0.5 text-[10px] font-mono font-bold uppercase bg-[#E9CF38]/30 text-amber-900 border border-amber-300 flex items-center gap-1">
                              <Sparkles className="w-3 h-3 text-amber-700" />
                              PERSONALIZARE
                            </span>
                          )}
                        </div>

                        <div className="flex items-center gap-3 text-xs font-mono text-neutral-500">
                          <span className="flex items-center gap-1">
                            <Clock className="w-3.5 h-3.5 text-neutral-400" />
                            {formatDate(quote.createdAt)}
                          </span>
                        </div>
                      </div>

                      {/* Client Info Grid */}
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-xs">
                        {/* Company & Contact */}
                        <div className="space-y-1">
                          <div className="flex items-center gap-1.5 font-bold text-[#111416] text-sm">
                            <Building2 className="w-4 h-4 text-[#F26A21] shrink-0" />
                            <span>{quote.companyName}</span>
                          </div>
                          {quote.cui && (
                            <div className="font-mono text-neutral-500 pl-5 text-[11px]">
                              CUI: <strong>{quote.cui}</strong>
                            </div>
                          )}
                          <div className="flex items-center gap-1.5 text-neutral-600 pl-5">
                            <User className="w-3.5 h-3.5 text-neutral-400 shrink-0" />
                            <span>Persoană contact: {quote.contactName}</span>
                          </div>
                        </div>

                        {/* Contact Direct */}
                        <div className="space-y-1">
                          <div className="flex items-center gap-2">
                            <Phone className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                            <a
                              href={`tel:${quote.phone}`}
                              className="font-mono font-bold text-[#111416] hover:text-[#F26A21] underline decoration-neutral-300"
                            >
                              {quote.phone}
                            </a>
                          </div>
                          <div className="flex items-center gap-2">
                            <Mail className="w-3.5 h-3.5 text-blue-600 shrink-0" />
                            <a
                              href={`mailto:${quote.email}?subject=Oferta Euro Safety Invest - ${quote.referenceNumber}`}
                              className="font-sans text-neutral-700 hover:text-[#F26A21] underline decoration-neutral-300 truncate"
                            >
                              {quote.email}
                            </a>
                          </div>
                          <div className="flex items-center gap-2 text-neutral-500">
                            <MapPin className="w-3.5 h-3.5 text-neutral-400 shrink-0" />
                            <span>
                              {quote.city}, Jud. {quote.county}
                            </span>
                          </div>
                        </div>

                        {/* Items summary & actions */}
                        <div className="flex flex-col justify-between md:items-end gap-3">
                          <div className="text-[11px] font-mono text-neutral-600 md:text-right">
                            <span className="font-bold text-[#111416]">
                              {quote.items.length}
                            </span>{" "}
                            articole diferite &bull;{" "}
                            <span className="font-bold text-[#F26A21]">
                              {totalItems}
                            </span>{" "}
                            bucăți în total
                          </div>

                          <div className="flex flex-wrap items-center gap-2">
                            <button
                              onClick={() => setSelectedQuote(quote)}
                              className="px-3 py-1.5 bg-[#111416] hover:bg-[#F26A21] text-white font-mono font-bold text-xs uppercase tracking-wider flex items-center gap-1.5 transition-colors"
                            >
                              <Eye className="w-3.5 h-3.5" />
                              <span>Vezi Detalii & Produse</span>
                            </button>

                            <button
                              onClick={() => handleCopySummary(quote)}
                              className="px-2.5 py-1.5 bg-[#F4F5F6] hover:bg-[#E2E5E8] text-neutral-700 font-mono text-xs border border-neutral-300 transition-colors"
                              title="Copiază sumarul în clipboard"
                            >
                              {copiedId === quote.id ? (
                                <Check className="w-3.5 h-3.5 text-emerald-600" />
                              ) : (
                                <Copy className="w-3.5 h-3.5" />
                              )}
                            </button>

                            <select
                              value={quote.status}
                              onChange={(e) =>
                                handleStatusChange(
                                  quote.id,
                                  e.target.value as QuoteStatus
                                )
                              }
                              className="px-2 py-1 text-[11px] font-mono bg-white border border-[#CBD5E1] focus:outline-none"
                            >
                              <option value="noua">Nouă</option>
                              <option value="in_lucru">În lucru</option>
                              <option value="ofertata">Ofertată</option>
                              <option value="finalizata">Finalizată</option>
                              <option value="anulata">Anulată</option>
                            </select>

                            <button
                              onClick={() => handleDeleteQuote(quote.id)}
                              className="p-1.5 text-neutral-400 hover:text-red-600 transition-colors"
                              title="Șterge cererea"
                            >
                              <Trash2 className="w-3.5 h-3.5" />
                            </button>
                          </div>
                        </div>
                      </div>

                      {/* Products preview strip */}
                      <div className="bg-[#FAF9F5] border border-[#EAECE8] p-3">
                        <span className="text-[10px] font-mono text-neutral-400 uppercase tracking-wider block mb-2">
                          PRODUSE SOLICITATE:
                        </span>
                        <div className="flex flex-wrap gap-2">
                          {quote.items.map((item, i) => (
                            <div
                              key={i}
                              className="bg-white border border-[#E2E5E8] px-2.5 py-1.5 text-xs flex items-center gap-2"
                            >
                              {item.image && (
                                <img
                                  src={item.image}
                                  alt={item.name}
                                  className="w-7 h-7 object-contain bg-[#F6F5F1] p-0.5 border border-neutral-200"
                                />
                              )}
                              <div>
                                <div className="font-bold text-[#111416] line-clamp-1">
                                  {item.name}
                                </div>
                                <div className="text-[10px] font-mono text-neutral-500">
                                  Cod: <strong>{item.code}</strong> &bull; Cantitate:{" "}
                                  <strong className="text-[#F26A21]">
                                    {item.quantity} buc.
                                  </strong>
                                  {item.selectedColor && (
                                    <span> &bull; Cul: {item.selectedColor}</span>
                                  )}
                                  {item.selectedSize && (
                                    <span> &bull; Mărime: {item.selectedSize}</span>
                                  )}
                                </div>
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </div>
        )}

        {/* TAB 2: CONTACT MESSAGES VIEW */}
        {activeTab === "contacts" && (
          <div className="space-y-4">
            {contacts.length === 0 ? (
              <div className="bg-white border border-[#E2E5E8] p-12 text-center space-y-3">
                <MessageSquare className="w-10 h-10 text-neutral-300 mx-auto" />
                <h3 className="text-base font-bold text-[#111416]">
                  Niciun mesaj de contact
                </h3>
                <p className="text-xs text-neutral-500 max-w-sm mx-auto">
                  Mesajele trimise de clienți prin pagina de contact vor apărea aici.
                </p>
              </div>
            ) : (
              <div className="space-y-3">
                {contacts.map((contact) => (
                  <div
                    key={contact.id}
                    className={`bg-white border ${
                      !contact.isRead
                        ? "border-l-4 border-l-[#F26A21] border-[#D8DCE0]"
                        : "border-[#E2E5E8]"
                    } p-5 space-y-3 transition-all`}
                  >
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-[#F0F2F4] pb-2.5">
                      <div className="flex items-center gap-2">
                        <span className="font-bold text-sm text-[#111416]">
                          {contact.name}
                        </span>
                        {contact.company && (
                          <span className="text-xs font-mono text-neutral-500">
                            ({contact.company})
                          </span>
                        )}
                        {!contact.isRead && (
                          <span className="px-1.5 py-0.5 text-[9px] font-mono font-bold uppercase bg-[#F26A21] text-white">
                            NOU
                          </span>
                        )}
                      </div>

                      <div className="text-xs font-mono text-neutral-400">
                        {formatDate(contact.createdAt)}
                      </div>
                    </div>

                    <div className="text-xs font-bold text-[#111416]">
                      Subiect: {contact.subject}
                    </div>

                    <div className="bg-[#FAF9F5] p-3.5 border border-[#EAECE8] text-xs text-neutral-700 leading-relaxed font-sans whitespace-pre-wrap">
                      {contact.message}
                    </div>

                    <div className="flex flex-wrap items-center justify-between gap-3 pt-2 text-xs">
                      <div className="flex items-center gap-4">
                        {contact.phone && (
                          <a
                            href={`tel:${contact.phone}`}
                            className="flex items-center gap-1.5 font-mono font-bold text-[#111416] hover:text-[#F26A21]"
                          >
                            <Phone className="w-3.5 h-3.5 text-emerald-600" />
                            <span>{contact.phone}</span>
                          </a>
                        )}
                        <a
                          href={`mailto:${contact.email}?subject=Răspuns Euro Safety Invest: ${contact.subject}`}
                          className="flex items-center gap-1.5 text-blue-600 hover:underline"
                        >
                          <Mail className="w-3.5 h-3.5" />
                          <span>{contact.email}</span>
                        </a>
                      </div>

                      <div className="flex items-center gap-2">
                        {!contact.isRead && (
                          <button
                            onClick={() => handleMarkContactRead(contact.id)}
                            className="px-2.5 py-1 bg-white border border-neutral-300 hover:border-[#111416] text-[11px] font-mono text-neutral-700"
                          >
                            Marchează ca citit
                          </button>
                        )}
                        <button
                          onClick={() => handleDeleteContact(contact.id)}
                          className="p-1 text-neutral-400 hover:text-red-600"
                          title="Șterge mesajul"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}
      </main>

      {/* DETAILED QUOTE MODAL */}
      {selectedQuote && (
        <div className="fixed inset-0 z-50 overflow-y-auto bg-black/70 backdrop-blur-sm flex items-center justify-center p-4 sm:p-6 animate-in fade-in duration-150">
          <div className="bg-white border-2 border-[#111416] max-w-3xl w-full max-h-[90vh] flex flex-col shadow-2xl overflow-hidden">
            {/* Modal Header */}
            <div className="p-5 bg-[#111416] text-white border-b border-neutral-800 flex items-center justify-between shrink-0">
              <div className="space-y-0.5">
                <div className="flex items-center gap-2">
                  <span className="text-xs font-mono text-[#E9CF38] uppercase">
                    FIȘĂ OFERTĂ B2B
                  </span>
                  <span className="font-mono font-bold text-sm sm:text-base text-white">
                    #{selectedQuote.referenceNumber}
                  </span>
                </div>
                <p className="text-[11px] font-mono text-neutral-400">
                  Înregistrată la data de {formatDate(selectedQuote.createdAt)}
                </p>
              </div>

              <button
                onClick={() => setSelectedQuote(null)}
                className="px-2.5 py-1 text-xs font-mono text-neutral-400 hover:text-white border border-neutral-700 hover:border-neutral-500"
              >
                ✕ ÎNCHIDE
              </button>
            </div>

            {/* Modal Scrollable Body */}
            <div className="p-6 overflow-y-auto space-y-6 text-xs">
              {/* Client Coordinates Box */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 bg-[#FAF9F5] border border-[#E2E5E8] p-4">
                <div className="space-y-1.5">
                  <span className="text-[10px] font-mono text-neutral-400 uppercase tracking-wider block">
                    DATE CLIENT / COMPANIE
                  </span>
                  <div className="text-sm font-bold text-[#111416]">
                    {selectedQuote.companyName}
                  </div>
                  {selectedQuote.cui && (
                    <div className="font-mono text-neutral-600">
                      Cod Fiscal (CUI): <strong>{selectedQuote.cui}</strong>
                    </div>
                  )}
                  <div className="text-neutral-600">
                    Persoană de contact: <strong>{selectedQuote.contactName}</strong>
                  </div>
                  <div className="text-neutral-600">
                    Livrare: <strong>{selectedQuote.city}, Jud. {selectedQuote.county}</strong>
                  </div>
                </div>

                <div className="space-y-1.5">
                  <span className="text-[10px] font-mono text-neutral-400 uppercase tracking-wider block">
                    CANALE DE CONTACT DIRECT
                  </span>
                  <div className="flex items-center gap-2 pt-1">
                    <Phone className="w-3.5 h-3.5 text-emerald-600" />
                    <a
                      href={`tel:${selectedQuote.phone}`}
                      className="font-mono font-bold text-sm text-[#111416] hover:text-[#F26A21] underline"
                    >
                      {selectedQuote.phone}
                    </a>
                  </div>
                  <div className="flex items-center gap-2">
                    <Mail className="w-3.5 h-3.5 text-blue-600" />
                    <a
                      href={`mailto:${selectedQuote.email}`}
                      className="font-sans text-neutral-700 hover:text-[#F26A21] underline"
                    >
                      {selectedQuote.email}
                    </a>
                  </div>
                </div>
              </div>

              {/* Customization Details if requested */}
              {selectedQuote.wantCustomization && (
                <div className="bg-[#FFFDF5] border border-[#F0D070] p-4 space-y-2">
                  <div className="flex items-center gap-1.5 text-amber-900 font-bold">
                    <Sparkles className="w-4 h-4 text-[#F26A21]" />
                    <span>SOLICITARE SPECIALĂ: PERSONALIZARE TEXTILĂ</span>
                  </div>
                  <p className="text-neutral-700 leading-relaxed font-sans">
                    {selectedQuote.customizationNotes ||
                      "Clientul a bifat opțiunea de personalizare cu siglă/logo, urmând a stabili detaliile tehnice la telefon."}
                  </p>
                </div>
              )}

              {/* Additional notes if present */}
              {selectedQuote.notes && (
                <div className="bg-[#FAF9F5] border border-[#E2E5E8] p-4 space-y-1.5">
                  <span className="text-[10px] font-mono text-neutral-400 uppercase tracking-wider block">
                    INSTRUCȚIUNI / OBSERVAȚII CLIENT:
                  </span>
                  <p className="text-neutral-700 leading-relaxed font-sans">
                    {selectedQuote.notes}
                  </p>
                </div>
              )}

              {/* Products Table */}
              <div className="space-y-2">
                <span className="text-xs font-mono font-bold text-[#111416] uppercase tracking-wider block">
                  PRODUSE SOLICITATE ({selectedQuote.items.length})
                </span>

                <div className="border border-[#E2E5E8] overflow-x-auto">
                  <table className="w-full text-left border-collapse">
                    <thead>
                      <tr className="bg-[#111416] text-white font-mono text-[11px] uppercase tracking-wider">
                        <th className="p-2.5">Nr.</th>
                        <th className="p-2.5">Imagine</th>
                        <th className="p-2.5">Produs & Cod</th>
                        <th className="p-2.5">Culoare</th>
                        <th className="p-2.5">Mărime</th>
                        <th className="p-2.5 text-right">Cantitate</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-[#EAECE8]">
                      {selectedQuote.items.map((item, idx) => (
                        <tr key={idx} className="hover:bg-[#FAF9F5]">
                          <td className="p-2.5 font-mono text-neutral-400">
                            {idx + 1}
                          </td>
                          <td className="p-2.5">
                            {item.image && (
                              <img
                                src={item.image}
                                alt={item.name}
                                className="w-10 h-10 object-contain bg-[#FAF9F5] p-0.5 border border-neutral-200"
                              />
                            )}
                          </td>
                          <td className="p-2.5">
                            <div className="font-bold text-[#111416]">
                              {item.name}
                            </div>
                            <div className="font-mono text-[10px] text-neutral-500">
                              Cod: {item.code}
                            </div>
                          </td>
                          <td className="p-2.5 font-mono">
                            {item.selectedColor || "—"}
                          </td>
                          <td className="p-2.5 font-mono">
                            {item.selectedSize || "—"}
                          </td>
                          <td className="p-2.5 font-mono font-bold text-right text-sm text-[#F26A21]">
                            {item.quantity} buc.
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>

            {/* Modal Footer Actions */}
            <div className="p-4 bg-[#FAF9F5] border-t border-[#E2E5E8] flex flex-wrap items-center justify-between gap-3 shrink-0">
              <div className="flex items-center gap-2">
                <span className="text-xs font-mono text-neutral-500">
                  Status cerere:
                </span>
                <select
                  value={selectedQuote.status}
                  onChange={(e) =>
                    handleStatusChange(
                      selectedQuote.id,
                      e.target.value as QuoteStatus
                    )
                  }
                  className="px-2.5 py-1 text-xs font-mono font-bold bg-white border border-[#CBD5E1] focus:outline-none"
                >
                  <option value="noua">Nouă / În Așteptare</option>
                  <option value="in_lucru">În Prelucrare</option>
                  <option value="ofertata">Ofertată</option>
                  <option value="finalizata">Comandată / Finalizată</option>
                  <option value="anulata">Anulată</option>
                </select>
              </div>

              <div className="flex items-center gap-2">
                <button
                  onClick={() => handleCopySummary(selectedQuote)}
                  className="px-3 py-1.5 bg-white border border-[#CBD5E1] hover:border-[#111416] text-xs font-mono flex items-center gap-1.5 transition-colors"
                >
                  {copiedId === selectedQuote.id ? (
                    <>
                      <Check className="w-3.5 h-3.5 text-emerald-600" />
                      <span>Copiat!</span>
                    </>
                  ) : (
                    <>
                      <Copy className="w-3.5 h-3.5" />
                      <span>Copiază Sumar</span>
                    </>
                  )}
                </button>

                <button
                  onClick={() => window.print()}
                  className="px-3 py-1.5 bg-[#111416] hover:bg-[#F26A21] text-white font-mono font-bold text-xs uppercase tracking-wider flex items-center gap-1.5 transition-colors"
                >
                  <Printer className="w-3.5 h-3.5" />
                  <span>Imprimă / PDF</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
