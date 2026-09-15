import { CategoryMeta, SubcategoryMeta } from "@/lib/types";

export const CATEGORIES: CategoryMeta[] = [
  {
    name: "Protecția Capului",
    slug: "protectia-capului",
    index: "01",
    tagline: "Căști, viziere, ochelari și protecție auditivă",
    description: "Echipamente certificate pentru protecția craniană, facială, oculară și a căilor respiratorii în medii industriale.",
    image: "/poze/casti/guamo.jpg",
    subcategories: [
      { name: "Căști", slug: "casti", description: "Căști de protecție industrială conform EN 397 și rezistență dielectrică." },
      { name: "Antifoane", slug: "antifoane", description: "Antifoane externe cu bandă și dopuri de protecție auditivă EN 352." },
      { name: "Viziere", slug: "viziere", description: "Viziere din policarbonat și plasă pentru protecție împotriva particulelor și stropilor." },
      { name: "Ochelari", slug: "ochelari", description: "Ochelari de protecție împotriva impactului mecanic, chimic și radiațiilor." },
      { name: "Măști și filtre", slug: "masti-si-filtre", description: "Măști de protecție respiratorie FFP1/FFP2/FFP3, semimăști și cartușe filtrante." },
      { name: "Sisteme de respirat", slug: "sisteme-de-respirat", description: "Sisteme autonome și asistate de ventilație pentru spații închise sau toxice." },
      { name: "Șepci", slug: "sepci", description: "Șepci cu calotă internă de protecție împotriva loviturilor conform EN 812." },
      { name: "Căciuli", slug: "caciuli", description: "Căciuli termoizolante pentru activitate în condiții de temperaturi scăzute." },
    ],
  },
  {
    name: "Protecția Corpului",
    slug: "protectia-corpului",
    index: "02",
    tagline: "Îmbrăcăminte și echipamente profesionale",
    description: "Costume de salopetă, combinezoane, halate și îmbrăcăminte tehnică rezistentă, cu posibilitate de personalizare.",
    image: "/poze/imbracaminte/css.jpg",
    subcategories: [
      { name: "Costume salopetă", slug: "costume-salopeta", description: "Costume salopetă cu pieptar sau talie din doc, tercot sau material ignifugat." },
      { name: "Halate", slug: "halate", description: "Halate de lucru pentru personal tehnic, depozit, medical sau mentenanță." },
      { name: "Combinezoane", slug: "combinezoane", description: "Combinezoane de unică folosință și protecție împotriva substanțelor chimice sau particulelor." },
      { name: "Tricouri", slug: "tricouri", description: "Tricouri polo și clasice din bumbac 100%, ideale pentru personalizare cu logo." },
      { name: "Veste", slug: "veste", description: "Veste reflectorizante de înaltă vizibilitate EN 471 și veste matlasate de lucru." },
      { name: "Pelerine", slug: "pelerine", description: "Pelerine impermeabile de protecție împotriva ploii și a umezelii." },
      { name: "Haine vătuite", slug: "haine-vatuite", description: "Scurte și hanorace vătuite pentru lucru exterior pe timp de iarnă." },
      { name: "Hanorace și geci", slug: "hanorace-si-geci", description: "Geci softshell, jachete tehnice rezistente la vânt și frig." },
    ],
  },
  {
    name: "Protecția Mâinilor",
    slug: "protectia-mainilor",
    index: "03",
    tagline: "Mănuși specializate pentru orice risc de lucru",
    description: "Gamă completă de mănuși certificate pentru riscuri mecanice, chimice, termice sau electroizolante.",
    image: "/poze/manusi%20cauciuc/Nitex.jpg",
    subcategories: [
      { name: "Mănuși cauciuc", slug: "manusi-cauciuc", description: "Mănuși din nitril, latex, neopren și vinil pentru protecție chimică și mecanică." },
      { name: "Mănuși textile", slug: "manusi-textile", description: "Mănuși antitermice Kevlar, bumbac frottier și tricot pentru manipulare precisă." },
      { name: "Mănuși piele", slug: "manusi-piele", description: "Mănuși din piele șpalt și box pentru construcții, mecanică grea și manipulare." },
      { name: "Mănuși electroizolante", slug: "manusi-electroizolante", description: "Mănuși pentru lucru sub tensiune, clase de protecție joasă și medie tensiune." },
    ],
  },
  {
    name: "Protecția Picioarelor",
    slug: "protectia-picioarelor",
    index: "04",
    tagline: "Încălțăminte tehnică certificată S1, S2 și S3",
    description: "Pantofi, bocanci și cizme de protecție cu bombeu metalic, lamelă antiperforație și talpă antistatică antiderapantă.",
    image: "/poze/pantofi/bari.jpg",
    subcategories: [
      { name: "Pantofi", slug: "pantofi", description: "Pantofi de protecție cu bombeu metalic și talpă PU injectată, categoria S1." },
      { name: "Bocanci", slug: "bocanci", description: "Bocanci de protecție hidrofobizați, categoria S3, cu talpă rezistentă la hidrocarburi." },
      { name: "Cizme", slug: "cizme", description: "Cizme impermeabile din PVC și cauciuc pentru medii umede și agresive." },
      { name: "Pâslari", slug: "paslari", description: "Pâslari cu talpă din cauciuc pentru protecție termică la temperaturi scăzute." },
    ],
  },
  {
    name: "Siguranța Muncii",
    slug: "siguranta-muncii",
    index: "05",
    tagline: "Echipamente colective și de intervenție specializată",
    description: "Sisteme de salvare și lucru la înălțime, echipamente sudură, protecție termoizolantă, prim ajutor și stingătoare.",
    image: "/poze/centuri/pb-20.jpg",
    subcategories: [
      { name: "Lucru la înălțime", slug: "lucru-la-inaltime", description: "Centuri de poziționare, hamuri complexe, frânghii și carabiniere certificate EN 358/361." },
      { name: "Echipamente de sudură", slug: "echipamente-sudura", description: "Măști de sudură cu filtru rabatabil sau automat, șorțuri și jambiere de piele." },
      { name: "Protecție termoizolantă", slug: "protectie-termoizolanta", description: "Costume aluminizate și ecrane radiante pentru intervenții la temperaturi extreme." },
      { name: "Prim ajutor", slug: "prim-ajutor", description: "Truse sanitare omologate, stații spălare ochi și accesorii de primă urgență." },
      { name: "Indicatoare", slug: "indicatoare", description: "Panouri și indicatoare de semnalizare, interdicție, avertizare și prim ajutor." },
      { name: "Stingătoare", slug: "stingatoare", description: "Stingătoare de incendiu presurizate cu pulbere, spumă și CO2 omologate." },
      { name: "Detectoare", slug: "detectoare", description: "Detectoare portabile pentru gaze toxice, oxigen și substanțe explozive." },
      { name: "Diverse", slug: "diverse", description: "Benzi de avertizare, lanterne antiex, furtunuri și accesorii de șantier." },
    ],
  },
];

export function getCategoryBySlug(slug: string): CategoryMeta | undefined {
  return CATEGORIES.find((c) => c.slug === slug);
}

export function getSubcategoryBySlug(categorySlug: string, subcategorySlug: string): SubcategoryMeta | undefined {
  const cat = getCategoryBySlug(categorySlug);
  return cat?.subcategories.find((s) => s.slug === subcategorySlug);
}
