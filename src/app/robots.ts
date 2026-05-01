import type { MetadataRoute } from "next";
import { env } from "@/lib/env";

export default function robots(): MetadataRoute.Robots {
  const base = env.deploymentURL;

  return {
    rules: [
      {
        userAgent: "*",
        allow: ["/", "/builder", "/docs"],
        // API routes are dynamic image generators — nothing useful for crawlers
        disallow: ["/api/"],
      },
    ],
    sitemap: `${base}/sitemap.xml`,
  };
}

