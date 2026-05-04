import {z} from 'zod';

import {FONT_FAMILY_VALUES} from '@/modules/og/shared/og-font-catalog';

export const TARGET_SIZES = {
  og: {width: 1200, height: 630},
  'twitter-large': {width: 1200, height: 628},
  'twitter-small': {width: 800, height: 800},
  linkedin: {width: 1200, height: 627},
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
  theme: z
    .enum(['dark', 'light', 'auto'])
    .default('dark')
    .describe("Color theme: 'dark' | 'light' | 'auto'"),
  target: z
    .enum(['og', 'twitter-large', 'twitter-small', 'linkedin'])
    .default('og')
    .describe('Platform preset — sets output dimensions'),
  fontFamily: z
    .enum(FONT_FAMILIES)
    .default('geist')
    .describe('Typography preset'),
  bgTone: z
    .enum(['dark', 'light', 'custom'])
    .default('dark')
    .describe('Background tone preset'),
  bgCustomColor: z
    .string()
    .regex(/^#([\dA-Fa-f]{3}|[\dA-Fa-f]{6})$/)
    .optional()
    .describe('Custom background base color'),
  bgGradientFrom: z
    .string()
    .regex(/^#([\dA-Fa-f]{3}|[\dA-Fa-f]{6})$/)
    .optional()
    .describe('Gradient start color override (for gradient base)'),
  bgGradientTo: z
    .string()
    .regex(/^#([\dA-Fa-f]{3}|[\dA-Fa-f]{6})$/)
    .optional()
    .describe('Gradient end color override (for gradient base)'),
  bgStyle: z
    .string()
    .default('gradient+grid')
    .refine(
      value => {
        const tokens = value
          .split('+')
          .map(part => part.trim().toLowerCase())
          .filter(Boolean);
        return (
          tokens.length > 0 &&
          tokens.every(token =>
            (BG_STYLE_TOKENS as readonly string[]).includes(token),
          )
        );
      },
      {
        message: `bgStyle must use + separated tokens: ${BG_STYLE_TOKENS.join(', ')}`,
      },
    )
    .describe('Composable background tokens e.g. gradient+grid+noise'),
  logo: imageUrl,
  logoWidth: z.coerce
    .number()
    .min(10)
    .max(400)
    .default(100)
    .describe('Logo width in px'),
  logoHeight: z.coerce
    .number()
    .min(10)
    .max(400)
    .optional()
    .describe('Logo height in px (auto if omitted)'),
});
