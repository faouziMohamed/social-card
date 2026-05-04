import type {BadgeName} from '@/modules/badge/shared/badge-schemas';
import type {SeoTemplateName} from '@/modules/seo/shared/seo-schemas';

export const BADGE_EXAMPLES: Record<
  BadgeName,
  {qs: string; aspect?: string; description: string}
> = {
  label: {
    qs: 'label=version&message=2.1.0&color=%236366f1&style=flat',
    aspect: '137/26',
    description: 'Premium two-segment label/value badge.',
  },
  stat: {
    qs: 'label=Stars&value=4.2k&icon=star&color=%23f59e0b',
    aspect: '150/58',
    description: 'Premium single-metric display card with optional icon.',
  },
  status: {
    qs: 'label=API&status=online',
    aspect: '120/30',
    description: 'Glass-style service health indicator with semantic colors.',
  },
  progress: {
    qs: 'label=Coverage&value=87&color=%2322c55e',
    aspect: '220/46',
    description:
      'Premium progress bar for coverage, funding goals, completion.',
  },
  score: {
    qs: 'label=Performance&value=95&color=%236366f1',
    aspect: '104/104',
    description: 'Premium circular score ring — Lighthouse, ratings.',
  },
  socials: {
    qs: 'platform=github&handle=acme&followers=4.2k&color=%236366f1',
    aspect: '185/34',
    description: 'Social proof pill with platform icon and glass body.',
  },
  'tech-stack': {
    qs: 'stack=React%2CTypeScript%2CGo&color=%236366f1&style=tags',
    aspect: '340/36',
    description: 'Premium tech tag row for README or portfolio.',
  },
  availability: {
    qs: 'label=Jane+Doe&available=true&hireText=Open+to+work&color=%2322c55e',
    aspect: '220/52',
    description: 'Premium "Open to work" / availability status banner.',
  },
};

export const SEO_EXAMPLES: Record<
  SeoTemplateName,
  {qs: string; aspect: string; description: string}
> = {
  favicon: {
    qs: 'initial=OG&color=%230f0f0f&accentColor=%236366f1&shape=rounded',
    aspect: '1/1',
    description: '32×32 PNG for <link rel="icon">.',
  },
  'apple-touch-icon': {
    qs: 'initial=OG&color=%230f0f0f&accentColor=%236366f1&shape=rounded',
    aspect: '1/1',
    description: '180×180 PNG for <link rel="apple-touch-icon">.',
  },
  'manifest-icon': {
    qs: 'initial=OG&color=%230f0f0f&accentColor=%236366f1&shape=rounded&size=512',
    aspect: '1/1',
    description: '192 or 512 px PNG for PWA manifest.json.',
  },
  'twitter-card': {
    qs: 'title=Open+Graph+Generator&siteName=social-card&accentColor=%236366f1&bgStyle=gradient%2Bgrid',
    aspect: '800/418',
    description: '800×418 PNG Twitter summary card.',
  },
  'json-ld': {
    qs: 'schemaType=SoftwareApplication&name=OG+Graph&description=Generate+OG+images+and+SEO+assets&url=https%3A%2F%2Fexample.com',
    aspect: '1/1',
    description: 'Structured data script route (application/ld+json).',
  },
  'robots-txt': {
    qs: 'userAgent=*&allow=%2F&disallow=%2Fprivate&sitemap=https%3A%2F%2Fexample.com%2Fsitemap.xml&aiCrawlerPolicy=allow',
    aspect: '1/1',
    description: 'Robots.txt helper route with optional AI crawler policy.',
  },
  'meta-pack': {
    qs: 'title=OG+Graph&description=Generate+OG+images+and+SEO+assets&canonical=https%3A%2F%2Fexample.com&ogType=website',
    aspect: '1/1',
    description:
      'Copy-ready HTML meta snippet route for canonical + OG + Twitter.',
  },
  'image-workflow': {
    qs: 'sourceImage=https%3A%2F%2Fimages.unsplash.com%2Fphoto-1518770660439-4636190af475&siteName=OG+Graph&title=Open+Graph+Generator&description=Generate+SEO+image+variants+from+one+source',
    aspect: '1/1',
    description:
      'Workflow helper that generates OG + favicon + Apple + manifest + Twitter image URLs from one source image.',
  },
};

export const OG_RESPONSE_SPEC = {
  contentType: 'image/png',
  bodyShape:
    'Binary PNG image bytes (1200x630 by default; target override supported).',
};

export const BADGE_RESPONSE_SPEC = {
  contentType: 'image/svg+xml; charset=utf-8',
  bodyShape: 'UTF-8 SVG markup string.',
};

export const SEO_RESPONSE_SPECS: Partial<
  Record<SeoTemplateName, {contentType: string; bodyShape: string}>
> = {
  favicon: {
    contentType: 'image/png',
    bodyShape: 'Binary PNG image bytes (32x32).',
  },
  'apple-touch-icon': {
    contentType: 'image/png',
    bodyShape: 'Binary PNG image bytes (180x180).',
  },
  'manifest-icon': {
    contentType: 'image/png',
    bodyShape: 'Binary PNG image bytes (192x192 or 512x512 via ?size=192|512).',
  },
  'twitter-card': {
    contentType: 'image/png',
    bodyShape: 'Binary PNG image bytes (800x418).',
  },
  'json-ld': {
    contentType: 'application/ld+json; charset=utf-8',
    bodyShape: 'JSON object payload (or script body in raw response).',
  },
  'robots-txt': {
    contentType: 'text/plain; charset=utf-8',
    bodyShape: 'Plain text robots.txt content.',
  },
  'meta-pack': {
    contentType: 'text/plain; charset=utf-8',
    bodyShape: 'Plain text HTML tags snippet (<title>, <meta>, <link>).',
  },
  'image-workflow': {
    contentType: 'text/plain; charset=utf-8',
    bodyShape: 'Plain text snippet containing generated OG/Twitter/icon URLs.',
  },
};
