import {z} from 'zod';

import {baseSchema} from '@/modules/og/shared/og-schemas.base';
import {
  articleSchema,
  blogSchema,
  generalSchema,
  gradientSchema,
  minimalSchema,
  productSchema,
} from '@/modules/og/shared/og-schemas.templates-a';

const imageUrl = z.string().url().describe('Absolute URL of image').optional();

export const portfolioSchema = z
  .object({
    name: z
      .string()
      .default('Your Name')
      .describe('Full name — largest text element'),
    role: z
      .string()
      .optional()
      .describe('Job title e.g. "Full-Stack Developer"'),
    bio: z.string().optional().describe('One-liner personal tagline'),
    avatar: imageUrl,
    skills: z
      .string()
      .optional()
      .describe('Comma-separated tech tags (up to 6)'),
    githubHandle: z.string().optional().describe('GitHub username'),
    twitterHandle: z.string().optional().describe('Twitter/X handle'),
    websiteUrl: z.string().optional().describe('Personal site URL'),
    location: z.string().optional().describe('City / country'),
    available: z
      .enum(['true', 'false'])
      .default('false')
      .describe('Shows green Open to work badge when true'),
    accentColor: z
      .string()
      .default('#3b82f6')
      .describe('Skill chips, social handles, avatar ring'),
  })
  .merge(baseSchema);

export const quoteSchema = z
  .object({
    quote: z
      .string()
      .default('Build fast. Ship often.')
      .describe('Primary quote text'),
    author: z.string().optional().describe('Quote author'),
    kicker: z.string().optional().describe('Small category label'),
    accentColor: z
      .string()
      .default('#14b8a6')
      .describe('Accent color for quote bar and author'),
  })
  .merge(baseSchema);

export const changelogSchema = z
  .object({
    productName: z.string().default('OG Graph').describe('Product name'),
    version: z.string().default('v2.0.0').describe('Release version'),
    headline: z.string().default('Major upgrade').describe('Release headline'),
    change1: z.string().optional().describe('First changelog item'),
    change2: z.string().optional().describe('Second changelog item'),
    change3: z.string().optional().describe('Third changelog item'),
    accentColor: z.string().default('#38bdf8').describe('Accent color'),
  })
  .merge(baseSchema)
  .catchall(z.string().optional());

export const eventSchema = z
  .object({
    eventName: z
      .string()
      .default('Event Name')
      .describe('Conference or event name'),
    tagline: z.string().optional().describe('Short event tagline or theme'),
    eventDate: z.string().optional().describe('ISO 8601 date e.g. 2026-09-15'),
    dateLocale: z
      .string()
      .optional()
      .describe('BCP 47 locale for date formatting e.g. fr-FR'),
    location: z.string().optional().describe('City and country or venue name'),
    host: z.string().optional().describe('Organizer or host name'),
    accentColor: z
      .string()
      .default('#f97316')
      .describe('Accent color for date, dividers'),
  })
  .merge(baseSchema);

export const launchSchema = z
  .object({
    productName: z
      .string()
      .default('My Product')
      .describe('Product or project name'),
    punchline: z
      .string()
      .optional()
      .describe('One-line bold value proposition'),
    launchDate: z
      .string()
      .optional()
      .describe('ISO 8601 date or freeform text e.g. "Coming soon"'),
    highlight1: z.string().optional().describe('First key highlight'),
    highlight2: z.string().optional().describe('Second key highlight'),
    highlight3: z.string().optional().describe('Third key highlight'),
    badge: z.string().optional().describe('Pill badge text e.g. "Now live"'),
    accentColor: z
      .string()
      .default('#ec4899')
      .describe('Accent color for highlights and badge'),
  })
  .merge(baseSchema);

export const TEMPLATE_SCHEMAS = {
  general: generalSchema,
  gradient: gradientSchema,
  blog: blogSchema,
  minimal: minimalSchema,
  article: articleSchema,
  product: productSchema,
  portfolio: portfolioSchema,
  quote: quoteSchema,
  changelog: changelogSchema,
  event: eventSchema,
  launch: launchSchema,
} as const;

export type GeneralParams = z.infer<typeof generalSchema>;
export type GradientParams = z.infer<typeof gradientSchema>;
export type BlogParams = z.infer<typeof blogSchema>;
export type MinimalParams = z.infer<typeof minimalSchema>;
export type ArticleParams = z.infer<typeof articleSchema>;
export type ProductParams = z.infer<typeof productSchema>;
export type PortfolioParams = z.infer<typeof portfolioSchema>;
export type QuoteParams = z.infer<typeof quoteSchema>;
export type ChangelogParams = z.infer<typeof changelogSchema>;
export type EventParams = z.infer<typeof eventSchema>;
export type LaunchParams = z.infer<typeof launchSchema>;
