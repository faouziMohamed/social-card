import {z} from 'zod';

const hex = z
  .string()
  .regex(/^#([\dA-Fa-f]{3}|[\dA-Fa-f]{6})$/)
  .optional();

// ─── Shared ──────────────────────────────────────────────────────────────────

const baseSchema = z.object({
  theme: z
    .enum(['dark', 'light'])
    .default('dark')
    .describe("Color theme: 'dark' | 'light'"),
});

// ─── Label badge ─────────────────────────────────────────────────────────────
// Generic two-segment shields.io-style badge: [label | message]

export const labelSchema = z
  .object({
    label: z.string().default('version').describe('Left-side label text'),
    message: z.string().default('1.0.0').describe('Right-side message text'),
    color: hex
      .describe('Right segment background color (hex)')
      .default('#6366f1'),
    labelColor: hex
      .describe('Left segment background color (hex)')
      .default('#555555'),
    style: z
      .enum(['flat', 'pill'])
      .default('flat')
      .describe("Badge style: 'flat' | 'pill'"),
  })
  .merge(baseSchema);

// ─── Stat badge ──────────────────────────────────────────────────────────────
// Single-metric display: label above a big number + unit

export const statSchema = z
  .object({
    label: z.string().default('Stars').describe('Metric label'),
    value: z
      .string()
      .default('1.2k')
      .describe('Metric value (raw string — supports abbreviations like 1.2k)'),
    unit: z.string().optional().describe('Unit suffix e.g. %, ms, MB'),
    color: hex.describe('Accent / background color (hex)').default('#6366f1'),
    icon: z
      .enum([
        'star',
        'download',
        'eye',
        'fork',
        'heart',
        'zap',
        'check',
        'clock',
      ])
      .optional()
      .describe('Optional icon slug'),
  })
  .merge(baseSchema);

// ─── Status badge ─────────────────────────────────────────────────────────────
// Service health indicator

export const statusSchema = z
  .object({
    label: z.string().default('API').describe('Service or component name'),
    status: z
      .enum(['online', 'offline', 'degraded', 'maintenance'])
      .default('online')
      .describe('Current operational status'),
    color: hex
      .optional()
      .describe('Override status color (hex) — defaults to semantic color'),
  })
  .merge(baseSchema);

// ─── Progress badge ───────────────────────────────────────────────────────────

export const progressSchema = z
  .object({
    label: z.string().default('Coverage').describe('Label above the bar'),
    value: z.coerce
      .number()
      .min(0)
      .max(100)
      .default(75)
      .describe('Progress value 0–100'),
    color: hex.describe('Bar fill color (hex)').default('#22c55e'),
    width: z.coerce
      .number()
      .min(80)
      .max(600)
      .default(220)
      .describe('Total badge width in px'),
  })
  .merge(baseSchema);

// ─── Score badge ──────────────────────────────────────────────────────────────

export const scoreSchema = z
  .object({
    label: z.string().default('Performance').describe('Score category label'),
    value: z.coerce.number().min(0).default(95).describe('Achieved score'),
    max: z.coerce
      .number()
      .min(1)
      .default(100)
      .describe('Maximum possible score'),
    color: hex.describe('Score ring / accent color (hex)').default('#6366f1'),
  })
  .merge(baseSchema);

// ─── Socials badge ────────────────────────────────────────────────────────────

export const socialsSchema = z
  .object({
    platform: z
      .enum([
        'github',
        'x',
        'bluesky',
        'linkedin',
        'youtube',
        'twitch',
        'discord',
        'npm',
        'pypi',
      ])
      .default('github')
      .describe('Social platform'),
    handle: z
      .string()
      .default('acme')
      .describe('Username or handle (without @)'),
    followers: z
      .string()
      .optional()
      .describe('Follower / subscriber count (raw string e.g. 4.2k)'),
    color: hex.describe('Accent color (hex)').default('#6366f1'),
  })
  .merge(baseSchema);

// ─── Tech-stack badge ─────────────────────────────────────────────────────────

export const techStackSchema = z
  .object({
    stack: z
      .string()
      .default('React,TypeScript,Go')
      .describe('Comma-separated list of tech names (up to 8)'),
    color: hex.describe('Tag background color (hex)').default('#6366f1'),
    style: z
      .enum(['tags', 'row'])
      .default('tags')
      .describe("Layout: 'tags' (pill chips) | 'row' (compact)"),
  })
  .merge(baseSchema);

// ─── Availability badge ───────────────────────────────────────────────────────

export const availabilitySchema = z
  .object({
    label: z.string().default('Mohamed Faouzi').describe('Name or role label'),
    available: z
      .enum(['true', 'false'])
      .default('true')
      .describe("'true' shows green open-to-work state"),
    hireText: z
      .string()
      .optional()
      .describe("Custom CTA text e.g. 'Available for freelance'"),
    color: hex.describe('Accent color (hex)').default('#6366f1'),
  })
  .merge(baseSchema);

// ─── Schema registry ─────────────────────────────────────────────────────────

export const BADGE_SCHEMAS = {
  label: labelSchema,
  stat: statSchema,
  status: statusSchema,
  progress: progressSchema,
  score: scoreSchema,
  socials: socialsSchema,
  'tech-stack': techStackSchema,
  availability: availabilitySchema,
} as const;

export type BadgeName = keyof typeof BADGE_SCHEMAS;

export type LabelParams = z.infer<typeof labelSchema>;
export type StatParams = z.infer<typeof statSchema>;
export type StatusParams = z.infer<typeof statusSchema>;
export type ProgressParams = z.infer<typeof progressSchema>;
export type ScoreParams = z.infer<typeof scoreSchema>;
export type SocialsParams = z.infer<typeof socialsSchema>;
export type TechStackParams = z.infer<typeof techStackSchema>;
export type AvailabilityParams = z.infer<typeof availabilitySchema>;
