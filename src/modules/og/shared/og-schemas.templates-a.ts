import {z} from 'zod';

import {baseSchema} from '@/modules/og/shared/og-schemas.base';

const imageUrl = z.string().url().describe('Absolute URL of image').optional();

export const generalSchema = z
  .object({
    siteName: z.string().default('Site Name').describe('Brand / website name'),
    title: z
      .string()
      .optional()
      .describe('Page title — replaces siteName in hero if provided'),
    description: z.string().optional().describe('Subtitle text (max 2 lines)'),
    accentColor: z
      .string()
      .regex(/^#([\dA-Fa-f]{3}|[\dA-Fa-f]{6})$/)
      .default('#6366f1')
      .describe('Used for title underline / logo border ring'),
  })
  .merge(baseSchema);

export const gradientSchema = z
  .object({
    siteName: z.string().default('Site Name').describe('Lower subheading'),
    title: z.string().optional().describe('Main heading with gradient applied'),
    description: z.string().optional().describe('Paragraph below heading'),
    gradientFrom: z
      .string()
      .default('#00e887')
      .describe('CSS gradient start color (hex)'),
    gradientTo: z
      .string()
      .default('#00e0f3')
      .describe('CSS gradient end color (hex)'),
    gradientAngle: z.coerce
      .number()
      .default(90)
      .describe('Gradient direction in degrees'),
  })
  .merge(baseSchema);

export const blogSchema = z
  .object({
    title: z
      .string()
      .default('Blog Title')
      .describe('Post title (max 3 lines)'),
    banner: imageUrl,
    tags: z
      .string()
      .optional()
      .describe('Comma-separated category tags (up to 4)'),
    authorName: z.string().optional().describe('Author display name'),
    authorPhoto: imageUrl,
    authorHandle: z.string().optional().describe('Social handle e.g. @johndoe'),
    readingTime: z.string().optional().describe('e.g. "5 min read"'),
    publishDate: z
      .string()
      .optional()
      .describe('ISO 8601 date e.g. 2026-04-28'),
    dateLocale: z
      .string()
      .optional()
      .describe(
        'BCP 47 locale for date formatting e.g. fr-FR (defaults to en-US)',
      ),
    siteDomain: z
      .string()
      .optional()
      .describe('Breadcrumb domain shown above date'),
    accentColor: z
      .string()
      .regex(/^#([\dA-Fa-f]{3}|[\dA-Fa-f]{6})$/)
      .default('#6366f1')
      .describe('Accent bar color'),
  })
  .merge(baseSchema);

export const minimalSchema = z
  .object({
    title: z
      .string()
      .default('Title')
      .describe('Large centered heading (max 3 lines)'),
    description: z
      .string()
      .optional()
      .describe('Subtext below title (max 2 lines)'),
    eyebrow: z
      .string()
      .optional()
      .describe('ALL-CAPS small label above title e.g. TUTORIAL'),
    bgColor: z.string().optional().describe('Override background color (hex)'),
    textColor: z
      .string()
      .optional()
      .describe('Override primary text color (hex)'),
    accentColor: z
      .string()
      .default('#6366f1')
      .describe('Color for eyebrow and bottom border accent'),
  })
  .merge(baseSchema);

export const articleSchema = z
  .object({
    title: z
      .string()
      .default('Article Title')
      .describe('Headline (max 3 lines)'),
    excerpt: z
      .string()
      .optional()
      .describe('1-2 sentence teaser (max 2 lines)'),
    authorName: z.string().optional().describe('Author name'),
    authorPhoto: imageUrl,
    publicationName: z
      .string()
      .optional()
      .describe('Newsletter / publication brand name'),
    publicationLogo: imageUrl,
    readingTime: z.string().optional().describe('e.g. "8 min read"'),
    publishDate: z
      .string()
      .optional()
      .describe('ISO 8601 date e.g. 2026-04-28'),
    dateLocale: z
      .string()
      .optional()
      .describe(
        'BCP 47 locale for date formatting e.g. fr-FR (defaults to en-US)',
      ),
    accentColor: z
      .string()
      .default('#f59e0b')
      .describe('Left edge accent bar + publication name color'),
  })
  .merge(baseSchema);

export const productSchema = z
  .object({
    productName: z.string().default('Product').describe('Large product name'),
    tagline: z.string().optional().describe('One-liner value proposition'),
    feature1: z.string().optional().describe('First feature bullet'),
    feature2: z.string().optional().describe('Second feature bullet'),
    feature3: z.string().optional().describe('Third feature bullet'),
    badge: z.string().optional().describe('Small pill badge e.g. "v2 Live"'),
    cta: z.string().optional().describe('CTA text e.g. "Get Started Free"'),
    screenshot: imageUrl,
    accentColor: z
      .string()
      .default('#8b5cf6')
      .describe('Badge, CTA pill, feature dots, glow color'),
  })
  .merge(baseSchema);

export type GeneralParams = z.infer<typeof generalSchema>;
export type GradientParams = z.infer<typeof gradientSchema>;
export type BlogParams = z.infer<typeof blogSchema>;
export type MinimalParams = z.infer<typeof minimalSchema>;
export type ArticleParams = z.infer<typeof articleSchema>;
export type ProductParams = z.infer<typeof productSchema>;
