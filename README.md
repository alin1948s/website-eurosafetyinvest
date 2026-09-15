# Euro Safety Invest — Modern B2B Occupational Safety Platform

> Producător și furnizor complet de echipamente individuale de protecție (EIP), îmbrăcăminte de lucru și personalizare industrială din Constanța, România.

Redesign și reconstrucție completă de la zero a platformei [eurosafetyinvest.ro](https://eurosafetyinvest.ro/), modernizată într-un catalog industrial B2B de nivel european, performant, accesibil și complet optimizat pentru dispozitive mobile și desktop.

---

## 🚀 Tehnologii & Arhitectură

- **Framework**: [Next.js 16 (App Router)](https://nextjs.org/) cu React 19 & TypeScript în Strict Mode
- **Stilizare**: [Tailwind CSS 4](https://tailwindcss.com/) cu paletă industrială customizată (Navy, Safety Amber/Orange, Slate)
- **Iconografie**: [Lucide React](https://lucide.dev/)
- **Validare**: [Zod](https://zod.dev/) & [React Hook Form](https://react-hook-form.com/)
- **Catalog autentic**: Peste 210 produse migrate 1:1 din sursele originale cu coduri reale, standarde europene (EN 397, EN 388, EN ISO 20345 etc.) și imagini autentice
- **Sistem de Ofertare Fără Înregistrare**: Cerere de ofertă frictionless pentru companii (fără crearea de conturi sau parole), cu persistență locală în coș
- **Panou de Administrare Dedicat (`/admin`)**: Dashboard intern pentru vizualizarea, filtrarea, actualizarea statusului și printarea/exportul cererilor de ofertă B2B și a mesajelor de contact

---

## 📦 Structura Proiectului

```
eurosafetyinvest/
├── data/                    # Persistență locală pentru oferte și contacte
│   ├── contacts.json
│   └── quotes.json
├── public/                  # Imagini produse, logo-uri clienți și asset-uri statice
│   ├── images/
│   │   └── clients/         # Logo-uri oficiale autentice (Dacia, Rompetrol, Portul Constanța etc.)
│   └── poze/                # Fotografiile reale de produse organizate pe categorii
├── src/
│   ├── actions/             # Server Actions Next.js (ofertă, contact, admin)
│   ├── app/                 # Rute Next.js App Router
│   │   ├── admin/           # Panou de administrare cereri oferte
│   │   ├── contact/         # Pagină contact cu date de identificare și hartă
│   │   ├── despre-noi/      # Istoric, acreditări, valori
│   │   ├── personalizare/   # Servicii serigrafie, broderie, termotransfer
│   │   ├── produs/[slug]/   # Pagini de detaliu produs cu fișă tehnică și culori
│   │   ├── produse/         # Catalog complet cu mega-categorii și filtrare
│   │   ├── solicita-oferta/ # Formular B2B cerere ofertă (date firmă, CUI, selecție)
│   │   └── page.tsx         # Pagina principală optimizată desktop & mobile
│   ├── components/          # Componente React modulare
│   │   ├── admin/           # Tabele, modal vizualizare ofertă, status switcher
│   │   ├── catalog/         # CategoryCard, ProductCard, SpecTable, ColorPicker
│   │   ├── layout/          # Header, MegaMenu, Footer, MobileNav, SearchDialog
│   │   ├── quote/           # Coș de ofertă plutitor și sumar comenzi
│   │   └── sections/        # Hero, Portofoliu Clienți, Avantaje, Personalizare
│   ├── data/                # Dataset-ul complet al catalogului (categorii, produse, specificații)
│   └── lib/                 # Utilitare, formatare și storage local
├── next.config.ts           # Configurare Next.js cu redirecturi 301 pentru URL-uri vechi
├── tailwind.config.ts       # Configurare temă Tailwind CSS
└── package.json
```

---

## 🛠️ Instalare & Rulare Locală

### 1. Clonare repozitoriu
```bash
git clone https://github.com/alin1948s/website-eurosafetyinvest.git
cd website-eurosafetyinvest
```

### 2. Instalare dependențe
```bash
npm install
```

### 3. Pornire server de dezvoltare
```bash
npm run dev
```
Aplicația va fi accesibilă la adresa `http://localhost:3000`.

### 4. Build de producție & Testare
```bash
npm run build
npm run start
```

---

## 🛡️ Caracteristici Cheie

1. **Zero Înregistrare Cumpărător**:
   - Companiile adaugă produse în lista de ofertă, specifică mărimi, culori și cantități, introduc datele firmei (Nume, CUI, contact) și transmit cererea într-un singur pas.
2. **Panou Intern de Gestiune (`/admin`)**:
   - Notificări cereri noi, căutare după referință (`ESI-YYMM-XXXX`) sau firmă, schimbare de stare (*Nouă*, *În prelucrare*, *Ofertată*, *Comandată*), copiere sumar pentru facturare/email și export PDF pentru depozit.
3. **Optimizat pentru Mobile**:
   - Layout dens, scroll redus, grid compact de 2 coloane pentru categorii și produse, butoane tactile rapide de adăugare la ofertă.
4. **Portofoliu Clienți Reali**:
   - Logo-uri oficiale vectorizate pentru clienți industriali majori: Automobile Dacia, Rompetrol, Portul Constanța, Hidroelectrica, Electromontaj, RAJA, Comvex, Socep etc.
5. **SEO & Redirecționări 301**:
   - Toate paginile vechi `.html` ale site-ului original au redirecționări permanente 301 configurate în `next.config.ts`.
   - Generare automată de `sitemap.xml` și `robots.txt`.

---

## 📍 Date de Contact EURO SAFETY INVEST SRL

- **Adresă**: Str. Călărași nr. 14, Constanța, România
- **Telefon**: 0720 300 211 / 0743 108 883
- **Website**: [eurosafetyinvest.ro](https://eurosafetyinvest.ro/)
