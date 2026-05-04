// Premium badge primitives — palette, defs, panels, chips.

import {darken, lighten} from '@/modules/badge/server/badge-color.server';

export type BadgeTheme = 'dark' | 'light';

export interface PremiumPalette {
  bg: string;
  card: string;
  cardTo: string;
  fg: string;
  muted: string;
  subtle: string;
  line: string;
  shine: string;
  shadow: string;
}

export const PREMIUM_PALETTES: Record<BadgeTheme, PremiumPalette> = {
  dark: {
    bg: '#070812',
    card: '#101425',
    cardTo: '#171b2e',
    fg: '#f8fafc',
    muted: '#a7b0c4',
    subtle: '#64748b',
    line: 'rgba(255,255,255,0.18)',
    shine: 'rgba(255,255,255,0.36)',
    shadow: 'rgba(0,0,0,0.42)',
  },
  light: {
    bg: '#f8fafc',
    card: '#ffffff',
    cardTo: '#eef2ff',
    fg: '#0f172a',
    muted: '#475569',
    subtle: '#94a3b8',
    line: 'rgba(15,23,42,0.14)',
    shine: 'rgba(255,255,255,0.92)',
    shadow: 'rgba(15,23,42,0.18)',
  },
};

export function resolvePalette(theme?: BadgeTheme): PremiumPalette {
  return PREMIUM_PALETTES[theme ?? 'dark'];
}

export function premiumDefs(
  theme: BadgeTheme,
  accent: string,
  id = 'premium',
): string {
  const palette = resolvePalette(theme);
  const accentDeep = darken(accent, theme === 'dark' ? 0.2 : 0.08);
  const accentSoft = lighten(accent, theme === 'dark' ? 0.16 : 0.28);

  return [
    `<linearGradient id="${id}-surface" x1="0" y1="0" x2="1" y2="1">`,
    `  <stop offset="0%" stop-color="${palette.card}"/>`,
    `  <stop offset="100%" stop-color="${palette.cardTo}"/>`,
    '</linearGradient>',
    `<linearGradient id="${id}-accent" x1="0" y1="0" x2="1" y2="1">`,
    `  <stop offset="0%" stop-color="${accentSoft}"/>`,
    `  <stop offset="55%" stop-color="${accent}"/>`,
    `  <stop offset="100%" stop-color="${accentDeep}"/>`,
    '</linearGradient>',
    `<linearGradient id="${id}-shine" x1="0" y1="0" x2="1" y2="0">`,
    `  <stop offset="0%" stop-color="${palette.shine}" stop-opacity="0"/>`,
    `  <stop offset="50%" stop-color="${palette.shine}"/>`,
    `  <stop offset="100%" stop-color="${palette.shine}" stop-opacity="0"/>`,
    '</linearGradient>',
    `<radialGradient id="${id}-glow" cx="50%" cy="50%" r="50%">`,
    `  <stop offset="0%" stop-color="${accent}" stop-opacity="0.38"/>`,
    `  <stop offset="100%" stop-color="${accent}" stop-opacity="0"/>`,
    '</radialGradient>',
    `<filter id="${id}-shadow" x="-20%" y="-30%" width="140%" height="170%" color-interpolation-filters="sRGB">`,
    `  <feDropShadow dx="0" dy="6" stdDeviation="8" flood-color="${palette.shadow}"/>`,
    '</filter>',
  ].join('');
}

export function premiumPanel(
  width: number,
  height: number,
  radius: number,
  theme: BadgeTheme,
  accent: string,
  id = 'premium',
): string {
  const palette = resolvePalette(theme);

  return [
    `<rect x="0" y="0" width="${width}" height="${height}" rx="${radius}" fill="${palette.bg}"/>`,
    `<rect x="1" y="1" width="${width - 2}" height="${height - 2}" rx="${Math.max(0, radius - 1)}" fill="url(#${id}-surface)" filter="url(#${id}-shadow)"/>`,
    `<circle cx="${width * 0.18}" cy="${height * 0.12}" r="${Math.max(width, height) * 0.42}" fill="url(#${id}-glow)"/>`,
    `<path d="M${radius + 2} 2H${width - radius - 2}" stroke="url(#${id}-shine)" stroke-width="1" stroke-linecap="round" opacity="0.72"/>`,
    `<rect x="0.5" y="0.5" width="${width - 1}" height="${height - 1}" rx="${radius - 0.5}" fill="none" stroke="${palette.line}"/>`,
  ].join('');
}

export function premiumChip(
  x: number,
  y: number,
  width: number,
  height: number,
  radius: number,
  accent: string,
  opacity = 0.16,
): string {
  return [
    `<rect x="${x}" y="${y}" width="${width}" height="${height}" rx="${radius}" fill="${accent}" opacity="${opacity}"/>`,
    `<rect x="${x + 0.5}" y="${y + 0.5}" width="${width - 1}" height="${height - 1}" rx="${Math.max(0, radius - 0.5)}" fill="none" stroke="${accent}" stroke-opacity="0.32"/>`,
  ].join('');
}
