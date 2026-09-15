import type { Metadata } from "next";
import "./globals.css";
import { QuoteProvider } from "@/context/QuoteContext";
import { AppShell } from "@/components/layout/AppShell";

export const metadata: Metadata = {
  metadataBase: new URL("https://eurosafetyinvest.ro"),
  title: {
    default: "Euro Safety Invest | Echipamente de Protecția Muncii & E.I.P.",
    template: "%s | Euro Safety Invest",
  },
  description:
    "Catalog industrial și distribuitor de echipamente individuale de protecție (EIP): căști de protecție, mănuși tehnice, încălțăminte de securitate S1-S3, îmbrăcăminte de lucru personalizată, măști respiratorii și echipamente de lucru la înălțime. Certificări CE și avize M.M.S.S.",
  keywords: [
    "echipamente protectia muncii",
    "echipamente individuale de protectie",
    "salopete lucru",
    "bocanci protectie S3",
    "manusi nitril",
    "casti protectie EN 397",
    "centuri siguranta inaltime",
    "echipamente sudura",
    "Euro Safety Invest Constanta",
  ],
  authors: [{ name: "Euro Safety Invest SRL" }],
  creator: "Euro Safety Invest SRL",
  openGraph: {
    type: "website",
    locale: "ro_RO",
    url: "https://eurosafetyinvest.ro",
    siteName: "Euro Safety Invest",
    title: "Euro Safety Invest — Catalog Echipamente de Protecție Industrială",
    description:
      "Protecție profesională pentru companii și specialiști. Catalog complet de echipamente de protecție a muncii conform standardelor europene.",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    name: "EURO SAFETY INVEST SRL",
    image: "https://eurosafetyinvest.ro/images/sigla.gif",
    telephone: "+40720300211",
    email: "office@eurosafetyinvest.ro",
    address: {
      "@type": "PostalAddress",
      streetAddress: "Str. Călărași nr. 14",
      addressLocality: "Constanța",
      postalCode: "900590",
      addressCountry: "RO",
    },
    url: "https://eurosafetyinvest.ro",
    openingHours: "Mo-Fr 08:30-17:00",
    description:
      "Distribuitor național de echipamente individuale de lucru și protecție (EIP). Căști, încălțăminte tehnică, mănuși, îmbrăcăminte personalizată.",
  };

  return (
    <html lang="ro" className="scroll-smooth">
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body className="antialiased bg-white text-[#111416] selection:bg-[#F26A21] selection:text-white">
        <QuoteProvider>
          <AppShell>{children}</AppShell>
        </QuoteProvider>
      </body>
    </html>
  );
}
