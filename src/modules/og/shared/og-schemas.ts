import { z } from 'zod';

import { FONT_FAMILY_VALUES } from './og-font-catalog';

export const TARGET_SIZES = {
  'og':            { width: 1200, height: 630 },
  'twitter-large': { width: 1200, height: 628 },
  'twitter-small': { width: 800,  height: 800  },
  'linkedin':      { width: 1200, height: 627 },
} as const;

export type TargetPlatform = keyof typeof TARGET_SIZES;
export const BG_STYLE_TOKENS = [
  'solid',
  'aurora',
  'gradient',
  'mesh',
  'grid',
  'dots',
  'diagonal',
  'noise',
  'vignette',
  'spotlight',
] as const;
export const FONT_FAMILIES = FONT_FAMILY_VALUES;

const imageUrl = z.string().url().describe('Absolute URL of image').optional();

export const baseSchema = z.object({
  theme:      z.enum(['dark', 'light', 'auto']).default('dark').describe("Color theme: 'dark' | 'light' | 'auto'"),
  target:     z.enum(['og', 'twitter-large', 'twitter-small', 'linkedin']).default('og').describe('Platform preset — sets output dimensions'),
  fontFamily: z.enum(FONT_FAMILIES).default('geist').describe('Typography preset'),
  bgTone:     z.enum(['dark', 'light', 'custom']).default('dark').describe('Background tone preset'),
  bgCustomColor: z.string().regex(/^#([\dA-Fa-f]{3}|[\dA-Fa-f]{6})$/).optional().describe('Custom background base color'),
  bgStyle:    z
    .string()
    .default('gradient+grid')
    .refine((value) => {
      const tokens = value.split('+').map((part) => part.trim().toLowerCase()).filter(Boolean);
      return tokens.length > 0 && tokens.every((token) => (BG_STYLE_TOKENS as readonly string[]).includes(token));
    }, { message: `bgStyle must use + separated tokens: ${BG_STYLE_TOKENS.join(', ')}` })
    .describe('Composable background tokens e.g. gradient+grid+noise'),
  logo:       imageUrl,
  logoWidth:  z.coerce.number().min(10).max(400).default(100).describe('Logo width in px'),
  logoHeight: z.coerce.number().min(10).max(400).optional().describe('Logo height in px (auto if omitted)'),
});

export const generalSchema = z.object({
  siteName:    z.string().default('Site Name').describe('Brand / website name'),
  title:       z.string().optional().describe('Page title — replaces siteName in hero if provided'),
  description: z.string().optional().describe('Subtitle text (max 2 lines)'),
  accentColor: z.string().regex(/^#([\dA-Fa-f]{3}|[\dA-Fa-f]{6})$/).default('#6366f1').describe('Used for title underline / logo border ring'),
}).merge(baseSchema);

export const gradientSchema = z.object({
  siteName:      z.string().default('Site Name').describe('Lower subheading'),
  title:         z.string().optional().describe('Main heading with gradient applied'),
  description:   z.string().optional().describe('Paragraph below heading'),
  gradientFrom:  z.string().default('#00e887').describe('CSS gradient start color (hex)'),
  gradientTo:    z.string().default('#00e0f3').describe('CSS gradient end color (hex)'),
  gradientAngle: z.coerce.number().default(90).describe('Gradient direction in degrees'),
}).merge(baseSchema);

export const blogSchema = z.object({
  title:        z.string().default('Blog Title').describe('Post title (max 3 lines)'),
  banner:       imageUrl,
  tags:         z.string().optional().describe('Comma-separated category tags (up to 4)'),
  authorName:   z.string().optional().describe('Author display name'),
  authorPhoto:  imageUrl,
  authorHandle: z.string().optional().describe('Social handle e.g. @johndoe'),
  readingTime:  z.string().optional().describe('e.g. "5 min read"'),
  publishDate:  z.string().optional().describe('ISO 8601 date e.g. 2026-04-28'),
  siteDomain:   z.string().optional().describe('Breadcrumb domain shown above date'),
  accentColor:  z.string().regex(/^#([\dA-Fa-f]{3}|[\dA-Fa-f]{6})$/).default('#6366f1').describe('Accent bar color'),
}).merge(baseSchema);

export const minimalSchema = z.object({
  title:       z.string().default('Title').describe('Large centered heading (max 3 lines)'),
  description: z.string().optional().describe('Subtext below title (max 2 lines)'),
  eyebrow:     z.string().optional().describe('ALL-CAPS small label above title e.g. TUTORIAL'),
  bgColor:     z.string().optional().describe('Override background color (hex)'),
  textColor:   z.string().optional().describe('Override primary text color (hex)'),
  accentColor: z.string().default('#6366f1').describe('Color for eyebrow and bottom border accent'),
}).merge(baseSchema);

export const articleSchema = z.object({
  title:           z.string().default('Article Title').describe('Headline (max 3 lines)'),
  excerpt:         z.string().optional().describe('1-2 sentence teaser (max 2 lines)'),
  authorName:      z.string().optional().describe('Author name'),
  authorPhoto:     imageUrl,
  publicationName: z.string().optional().describe('Newsletter / publication brand name'),
  publicationLogo: imageUrl,
  readingTime:     z.string().optional().describe('e.g. "8 min read"'),
  publishDate:     z.string().optional().describe('Human-readable date'),
  accentColor:     z.string().default('#f59e0b').describe('Left edge accent bar + publication name color'),
}).merge(baseSchema);

export const productSchema = z.object({
  productName: z.string().default('Product').describe('Large product name'),
  tagline:     z.string().optional().describe('One-liner value proposition'),
  feature1:    z.string().optional().describe('First feature bullet'),
  feature2:    z.string().optional().describe('Second feature bullet'),
  feature3:    z.string().optional().describe('Third feature bullet'),
  badge:       z.string().optional().describe('Small pill badge e.g. "v2 Live"'),
  cta:         z.string().optional().describe('CTA text e.g. "Get Started Free"'),
  screenshot:  imageUrl,
  accentColor: z.string().default('#8b5cf6').describe('Badge, CTA pill, feature dots, glow color'),
}).merge(baseSchema);

export const portfolioSchema = z.object({
  name:          z.string().default('Your Name').describe('Full name — largest text element'),
  role:          z.string().optional().describe('Job title e.g. "Full-Stack Developer"'),
  bio:           z.string().optional().describe('One-liner personal tagline'),
  avatar:        imageUrl,
  skills:        z.string().optional().describe('Comma-separated tech tags (up to 6)'),
  githubHandle:  z.string().optional().describe('GitHub username'),
  twitterHandle: z.string().optional().describe('Twitter/X handle'),
  websiteUrl:    z.string().optional().describe('Personal site URL'),
  location:      z.string().optional().describe('City / country'),
  available:     z.enum(['true', 'false']).default('false').describe('Shows green Open to work badge when true'),
  accentColor:   z.string().default('#3b82f6').describe('Skill chips, social handles, avatar ring'),
}).merge(baseSchema);

export const quoteSchema = z.object({
  quote:      z.string().default('Build fast. Ship often.').describe('Primary quote text'),
  author:     z.string().optional().describe('Quote author'),
  kicker:     z.string().optional().describe('Small category label'),
  accentColor:z.string().default('#14b8a6').describe('Accent color for quote bar and author'),
}).merge(baseSchema);

export const changelogSchema = z.object({
  productName: z.string().default('OG Graph').describe('Product name'),
  version:     z.string().default('v2.0.0').describe('Release version'),
  headline:    z.string().default('Major upgrade').describe('Release headline'),
  change1:     z.string().optional().describe('First changelog item'),
  change2:     z.string().optional().describe('Second changelog item'),
  change3:     z.string().optional().describe('Third changelog item'),
  accentColor: z.string().default('#38bdf8').describe('Accent color'),
}).merge(baseSchema);

export const TEMPLATE_SCHEMAS = {
  general:   generalSchema,
  gradient:  gradientSchema,
  blog:      blogSchema,
  minimal:   minimalSchema,
  article:   articleSchema,
  product:   productSchema,
  portfolio: portfolioSchema,
  quote:     quoteSchema,
  changelog: changelogSchema,
} as const;

export type GeneralParams   = z.infer<typeof generalSchema>;
export type GradientParams  = z.infer<typeof gradientSchema>;
export type BlogParams      = z.infer<typeof blogSchema>;
export type MinimalParams   = z.infer<typeof minimalSchema>;
export type ArticleParams   = z.infer<typeof articleSchema>;
export type ProductParams   = z.infer<typeof productSchema>;
export type PortfolioParams = z.infer<typeof portfolioSchema>;
export type QuoteParams = z.infer<typeof quoteSchema>;
export type ChangelogParams = z.infer<typeof changelogSchema>;
