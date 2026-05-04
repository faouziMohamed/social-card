import {z} from 'zod';

// ─── SEO sizes ────────────────────────────────────────────────────────────────

export const SEO_SIZES = {
  favicon: {width: 32, height: 32},
  'apple-touch-icon': {width: 180, height: 180},
  'manifest-icon-192': {width: 192, height: 192},
  'manifest-icon-512': {width: 512, height: 512},
  'twitter-card': {width: 800, height: 418},
} as const;

export type SeoSizeKey = keyof typeof SEO_SIZES;
export const JSON_LD_TYPES = [
  'Article',
  'Product',
  'FAQPage',
  'Organization',
  'LocalBusiness',
  'SoftwareApplication',
] as const;
export type JsonLdType = (typeof JSON_LD_TYPES)[number];

// ─── Shared icon schema ───────────────────────────────────────────────────────

const hex = z.string().regex(/^#([\dA-Fa-f]{3}|[\dA-Fa-f]{6})$/);

export const iconBaseSchema = z.object({
  initial: z
    .string()
    .max(2)
    .default('A')
    .describe('1–2 letter monogram shown when no logo is provided'),
  logo: z
    .string()
    .url()
    .optional()
    .describe(
      'Absolute URL of a logo/icon image — renders instead of monogram',
    ),
  color: hex.default('#0f0f0f').describe('Background color (hex)'),
  accentColor: hex
    .default('#6366f1')
    .describe('Foreground / ring accent color (hex)'),
  shape: z
    .enum(['circle', 'square', 'rounded'])
    .default('rounded')
    .describe("Icon shape: 'circle' | 'square' | 'rounded'"),
  theme: z
    .enum(['dark', 'light'])
    .default('dark')
    .describe("Color theme: 'dark' | 'light'"),
});

// ─── Favicon (32×32) ─────────────────────────────────────────────────────────

export const faviconSchema = iconBaseSchema;

// ─── Apple touch icon (180×180) ──────────────────────────────────────────────

export const appleTouchIconSchema = iconBaseSchema;

// ─── Manifest icon (192×192 or 512×512) ──────────────────────────────────────

export const manifestIconSchema = iconBaseSchema.extend({
  size: z
    .enum(['192', '512'])
    .default('512')
    .describe('Icon size: 192 or 512 px'),
});

// ─── Twitter summary card (800×418) ──────────────────────────────────────────

export const twitterCardSchema = z.object({
  title: z.string().default('Title').describe('Card headline'),
  description: z.string().optional().describe('Short description (1–2 lines)'),
  siteName: z.string().optional().describe('Site or brand name'),
  logo: z.string().url().optional().describe('Logo image URL'),
  accentColor: hex.default('#6366f1').describe('Accent color (hex)'),
  theme: z
    .enum(['dark', 'light'])
    .default('dark')
    .describe("Color theme: 'dark' | 'light'"),
  bgStyle: z
    .string()
    .default('gradient+grid')
    .describe("Background style tokens e.g. 'gradient+grid'"),
});

export const jsonLdSchema = z
  .object({
    schemaType: z
      .string()
      .default('Article')
      .describe(
        "Schema.org type, e.g. 'Article', 'Product', 'FAQPage', 'Event', 'JobPosting'",
      ),
    name: z
      .string()
      .default('Social Card')
      .describe('Primary entity or page name'),
    headline: z.string().optional().describe('Headline for article/content'),
    description: z.string().optional().describe('Short summary (1-2 lines)'),
    url: z.string().url().optional().describe('Canonical URL'),
    image: z.string().url().optional().describe('Primary image URL'),
    datePublished: z
      .string()
      .optional()
      .describe('ISO 8601 date e.g. 2026-05-03'),
    dateModified: z
      .string()
      .optional()
      .describe('ISO 8601 date e.g. 2026-05-03'),
    authorName: z.string().optional().describe('Author / creator name'),
    publisherName: z
      .string()
      .optional()
      .describe('Publisher / organization name'),
    sameAs1: z.string().url().optional().describe('Social profile URL 1'),
    sameAs2: z.string().url().optional().describe('Social profile URL 2'),
    sameAs3: z.string().url().optional().describe('Social profile URL 3'),
    price: z.string().optional().describe('Product price e.g. 49.00'),
    priceCurrency: z
      .string()
      .default('USD')
      .describe('ISO currency code e.g. USD'),
    applicationCategory: z
      .string()
      .optional()
      .describe('App category e.g. DeveloperApplication'),
    operatingSystem: z.string().optional().describe('OS target e.g. Web'),
    faqQuestion1: z.string().optional().describe('FAQ first question'),
    faqAnswer1: z.string().optional().describe('FAQ first answer'),
    faqQuestion2: z.string().optional().describe('FAQ second question'),
    faqAnswer2: z.string().optional().describe('FAQ second answer'),
    jsonRaw: z
      .string()
      .optional()
      .describe('Advanced JSON-LD object payload (overrides generated fields)'),
  })
  .catchall(z.string().optional());

export const robotsTxtSchema = z.object({
  userAgent: z.string().default('*').describe('Primary User-agent'),
  allow: z.string().default('/').describe('Allow path'),
  disallow: z.string().optional().describe('Disallow path'),
  sitemap: z.string().url().optional().describe('Absolute sitemap URL'),
  crawlDelay: z
    .string()
    .optional()
    .describe('Crawl delay in seconds (optional)'),
  aiCrawlerPolicy: z
    .enum(['allow', 'disallow'])
    .default('allow')
    .describe('AI crawler policy for GPTBot / Google-Extended / PerplexityBot'),
});

export const metaPackSchema = z.object({
  title: z.string().default('Social Card').describe('Page title'),
  description: z
    .string()
    .default('Generate OG images, badges, and SEO assets in one place.')
    .describe('Meta description'),
  canonical: z.string().url().optional().describe('Canonical page URL'),
  robots: z
    .string()
    .default('index,follow,max-image-preview:large')
    .describe('Meta robots content'),
  ogType: z.string().default('website').describe('Open Graph type'),
  ogImage: z.string().url().optional().describe('Open Graph image URL'),
  siteName: z.string().optional().describe('Open Graph site name'),
  locale: z.string().default('en_US').describe('Open Graph locale'),
  twitterCard: z
    .enum(['summary', 'summary_large_image'])
    .default('summary_large_image')
    .describe('Twitter card type'),
  twitterSite: z.string().optional().describe('Twitter handle e.g. @og_graph'),
  themeColor: z
    .string()
    .regex(/^#([\dA-Fa-f]{3}|[\dA-Fa-f]{6})$/)
    .default('#0f0f0f')
    .describe('Browser UI color'),
  keywords: z.string().optional().describe('Comma-separated keyword list'),
});

export const imageWorkflowSchema = z.object({
  sourceImage: z
    .string()
    .url()
    .describe('Source image URL used to derive SEO assets'),
  siteName: z.string().optional().describe('Brand or site name'),
  title: z.string().optional().describe('OG/Twitter title'),
  description: z.string().optional().describe('OG/Twitter description'),
  accentColor: hex
    .default('#6366f1')
    .describe('Accent color for generated cards'),
  theme: z
    .enum(['dark', 'light'])
    .default('dark')
    .describe("Color theme: 'dark' | 'light'"),
  bgStyle: z
    .string()
    .default('gradient+grid')
    .describe("Background style tokens e.g. 'gradient+grid'"),
});

// ─── Schema registry ─────────────────────────────────────────────────────────

export const SEO_SCHEMAS = {
  favicon: faviconSchema,
  'apple-touch-icon': appleTouchIconSchema,
  'manifest-icon': manifestIconSchema,
  'twitter-card': twitterCardSchema,
  'json-ld': jsonLdSchema,
  'robots-txt': robotsTxtSchema,
  'meta-pack': metaPackSchema,
  'image-workflow': imageWorkflowSchema,
} as const;

export type SeoTemplateName = keyof typeof SEO_SCHEMAS;

export type FaviconParams = z.infer<typeof faviconSchema>;
export type AppleTouchIconParams = z.infer<typeof appleTouchIconSchema>;
export type ManifestIconParams = z.infer<typeof manifestIconSchema>;
export type TwitterCardParams = z.infer<typeof twitterCardSchema>;
export type JsonLdParams = z.infer<typeof jsonLdSchema>;
export type RobotsTxtParams = z.infer<typeof robotsTxtSchema>;
export type MetaPackParams = z.infer<typeof metaPackSchema>;
export type ImageWorkflowParams = z.infer<typeof imageWorkflowSchema>;
