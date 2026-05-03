import {env} from '@/lib/env';
import type {MetadataRoute} from 'next';

export default function robots(): MetadataRoute.Robots {
  const base = env.deploymentURL;

  return {
    rules: [
      {
        userAgent: '*',
        allow: ['/', '/builder', '/docs', '/seo-inspector'],
        // API routes are dynamic image generators — nothing useful for crawlers
        disallow: ['/api/'],
      },
    ],
    sitemap: `${base}/sitemap.xml`,
  };
}
