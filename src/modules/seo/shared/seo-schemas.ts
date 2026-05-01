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

// ─── Schema registry ─────────────────────────────────────────────────────────

export const SEO_SCHEMAS = {
  favicon: faviconSchema,
  'apple-touch-icon': appleTouchIconSchema,
  'manifest-icon': manifestIconSchema,
  'twitter-card': twitterCardSchema,
} as const;

export type SeoTemplateName = keyof typeof SEO_SCHEMAS;

export type FaviconParams = z.infer<typeof faviconSchema>;
export type AppleTouchIconParams = z.infer<typeof appleTouchIconSchema>;
export type ManifestIconParams = z.infer<typeof manifestIconSchema>;
export type TwitterCardParams = z.infer<typeof twitterCardSchema>;
