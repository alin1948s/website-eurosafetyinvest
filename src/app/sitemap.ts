import { MetadataRoute } from "next";
import { catalog } from "@/data/catalog";
import { CATEGORIES } from "@/data/taxonomy";

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = "https://eurosafetyinvest.ro";

  const staticPages = [
    "",
    "/produse",
    "/personalizare",
    "/despre-noi",
    "/solicita-oferta",
    "/contact",
  ].map((route) => ({
    url: `${baseUrl}${route}`,
    lastModified: new Date(),
    changeFrequency: "weekly" as const,
    priority: route === "" ? 1.0 : 0.8,
  }));

  const categoryPages = CATEGORIES.map((cat) => ({
    url: `${baseUrl}/produse/${cat.slug}`,
    lastModified: new Date(),
    changeFrequency: "weekly" as const,
    priority: 0.9,
  }));

  const subcategoryPages: MetadataRoute.Sitemap = [];
  CATEGORIES.forEach((cat) => {
    cat.subcategories.forEach((sub) => {
      subcategoryPages.push({
        url: `${baseUrl}/produse/${cat.slug}/${sub.slug}`,
        lastModified: new Date(),
        changeFrequency: "weekly" as const,
        priority: 0.85,
      });
    });
  });

  const productPages = catalog.map((p) => ({
    url: `${baseUrl}/produs/${p.slug}`,
    lastModified: new Date(),
    changeFrequency: "monthly" as const,
    priority: 0.7,
  }));

  return [...staticPages, ...categoryPages, ...subcategoryPages, ...productPages];
}
