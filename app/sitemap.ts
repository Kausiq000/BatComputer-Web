import type { MetadataRoute } from "next";
import { cinematicArchives } from "@/lib/movieData";

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = "https://batcomputer-web.vercel.app";

  const staticPages: MetadataRoute.Sitemap = [
    {
      url: `${baseUrl}`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 1.0,
    },
    {
      url: `${baseUrl}/batcomputer`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.9,
    },
    {
      url: `${baseUrl}/login-lamp`,
      lastModified: new Date(),
      changeFrequency: "yearly",
      priority: 0.5,
    },
  ];

  const moviePages: MetadataRoute.Sitemap = cinematicArchives.map((movie) => ({
    url: `${baseUrl}/batcomputer/movie/${movie.id}`,
    lastModified: new Date(),
    changeFrequency: "yearly",
    priority: 0.8,
  }));

  return [...staticPages, ...moviePages];
}
