import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactStrictMode: true,
  images: {
    formats: ["image/avif", "image/webp"],
    remotePatterns: [],
    unoptimized: true,
  },
  async redirects() {
    return [
      { source: "/index.html", destination: "/", permanent: true },
      { source: "/despre.html", destination: "/despre-noi", permanent: true },
      { source: "/comenzi.html", destination: "/solicita-oferta", permanent: true },
      { source: "/contact.html", destination: "/contact", permanent: true },

      // Protectia Capului
      { source: "/cap.html", destination: "/produse/protectia-capului", permanent: true },
      { source: "/casti.html", destination: "/produse/protectia-capului/casti", permanent: true },
      { source: "/antifoane.html", destination: "/produse/protectia-capului/antifoane", permanent: true },
      { source: "/viziere.html", destination: "/produse/protectia-capului/viziere", permanent: true },
      { source: "/ochelari.html", destination: "/produse/protectia-capului/ochelari", permanent: true },
      { source: "/masti.html", destination: "/produse/protectia-capului/masti-si-filtre", permanent: true },
      { source: "/sisteme.html", destination: "/produse/protectia-capului/sisteme-de-respirat", permanent: true },
      { source: "/sepci.html", destination: "/produse/protectia-capului/sepci", permanent: true },
      { source: "/caciuli.html", destination: "/produse/protectia-capului/caciuli", permanent: true },

      // Protectia Corpului
      { source: "/corp.html", destination: "/produse/protectia-corpului", permanent: true },
      { source: "/costume.html", destination: "/produse/protectia-corpului/costume-salopeta", permanent: true },
      { source: "/halate.html", destination: "/produse/protectia-corpului/halate", permanent: true },
      { source: "/combinezoane.html", destination: "/produse/protectia-corpului/combinezoane", permanent: true },
      { source: "/tricouri.html", destination: "/produse/protectia-corpului/tricouri", permanent: true },
      { source: "/veste.html", destination: "/produse/protectia-corpului/veste", permanent: true },
      { source: "/pelerine.html", destination: "/produse/protectia-corpului/pelerine", permanent: true },
      { source: "/haine.html", destination: "/produse/protectia-corpului/haine-vatuite", permanent: true },
      { source: "/geci.html", destination: "/produse/protectia-corpului/hanorace-si-geci", permanent: true },

      // Protectia Mainilor
      { source: "/maini.html", destination: "/produse/protectia-mainilor", permanent: true },
      { source: "/manusicauciuc.html", destination: "/produse/protectia-mainilor/manusi-cauciuc", permanent: true },
      { source: "/manusitextile.html", destination: "/produse/protectia-mainilor/manusi-textile", permanent: true },
      { source: "/manusipiele.html", destination: "/produse/protectia-mainilor/manusi-piele", permanent: true },
      { source: "/manusielectroizolante.html", destination: "/produse/protectia-mainilor/manusi-electroizolante", permanent: true },

      // Protectia Picioarelor
      { source: "/picioare.html", destination: "/produse/protectia-picioarelor", permanent: true },
      { source: "/pantofi.html", destination: "/produse/protectia-picioarelor/pantofi", permanent: true },
      { source: "/bocanci.html", destination: "/produse/protectia-picioarelor/bocanci", permanent: true },
      { source: "/cizme.html", destination: "/produse/protectia-picioarelor/cizme", permanent: true },
      { source: "/paslari.html", destination: "/produse/protectia-picioarelor/paslari", permanent: true },

      // Siguranta Muncii
      { source: "/siguranta.html", destination: "/produse/siguranta-muncii", permanent: true },
      { source: "/detectoare.html", destination: "/produse/siguranta-muncii/detectoare", permanent: true },
      { source: "/sudura.html", destination: "/produse/siguranta-muncii/echipamente-sudura", permanent: true },
      { source: "/echipamente.html", destination: "/produse/siguranta-muncii/protectie-termoizolanta", permanent: true },
      { source: "/inaltime.html", destination: "/produse/siguranta-muncii/lucru-la-inaltime", permanent: true },
      { source: "/primajutor.html", destination: "/produse/siguranta-muncii/prim-ajutor", permanent: true },
      { source: "/indicatoare.html", destination: "/produse/siguranta-muncii/indicatoare", permanent: true },
      { source: "/instingtoare.html", destination: "/produse/siguranta-muncii/stingatoare", permanent: true },
      { source: "/diverse.html", destination: "/produse/siguranta-muncii/diverse", permanent: true },
    ];
  },
};

export default nextConfig;
