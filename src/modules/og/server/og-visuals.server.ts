import type { CSSProperties } from 'react';

import {
  resolveFontFamilyName,
  supportsOgLigatures,
} from '../shared/og-font-catalog';
import { hexToRgba } from './og-render.server';

export const BG_BASE_OPTIONS = ['solid', 'gradient', 'aurora', 'mesh'] as const;
export const BG_OVERLAY_OPTIONS = ['grid', 'dots', 'diagonal', 'noise', 'spotlight', 'vignette'] as const;

export type BgBase = (typeof BG_BASE_OPTIONS)[number];
export type BgOverlay = (typeof BG_OVERLAY_OPTIONS)[number];

type BgVisualResult = {
  backgroundColor: string;
  backgroundImage: string;
};

type BgTone = 'dark' | 'light' | 'custom';

export function resolveTypographyStyle(fontFamily: string): CSSProperties {
  const family = resolveFontFamilyName(fontFamily);

  if (!supportsOgLigatures(fontFamily)) {
    return { fontFamily: family };
  }

  return {
    fontFamily: family,
    fontFeatureSettings: '"liga" 1, "calt" 1',
    fontVariantLigatures: 'common-ligatures contextual',
  };
}

export function parseBgStyleTokens(value: string): { base: BgBase; overlays: BgOverlay[] } {
  const tokens = value.split('+').map((part) => part.trim().toLowerCase()).filter(Boolean);
  const base = (tokens.find((token) => (BG_BASE_OPTIONS as readonly string[]).includes(token)) as BgBase | undefined) ?? 'gradient';
  const overlays = tokens.filter((token): token is BgOverlay => (BG_OVERLAY_OPTIONS as readonly string[]).includes(token));
  return { base, overlays };
}

export function composeBackgroundStyle(style: string, accentColor: string, fallbackBg: string): BgVisualResult {
  return composeBackgroundStyleWithTone(style, accentColor, fallbackBg, 'dark');
}

export function composeBackgroundStyleWithTone(
  style: string,
  accentColor: string,
  fallbackBg: string,
  bgTone: BgTone,
  bgCustomColor?: string,
): BgVisualResult {
  const { base, overlays } = parseBgStyleTokens(style);
  const layers: string[] = [];
  let backgroundColor = resolveToneBaseColor(bgTone, fallbackBg, bgCustomColor);

  switch (base) {
    case 'aurora': {
      backgroundColor = bgTone === 'light'
        ? '#eef6ff'
        : bgTone === 'custom' && bgCustomColor
          ? bgCustomColor
          : '#030712';
      layers.push(
        `radial-gradient(80% 100% at 10% 15%, ${hexToRgba('#22d3ee', bgTone === 'light' ? 0.14 : 0.2)} 0%, transparent 60%)`,
        `radial-gradient(70% 90% at 90% 85%, ${hexToRgba('#a855f7', bgTone === 'light' ? 0.14 : 0.2)} 0%, transparent 65%)`,
      );
      break;
    }
    case 'mesh': {
      layers.push(
        `radial-gradient(ellipse at 0% 0%, ${hexToRgba(accentColor, 0.16)} 0%, transparent 55%)`,
        `radial-gradient(ellipse at 100% 100%, ${hexToRgba(accentColor, 0.14)} 0%, transparent 55%)`,
      );
      break;
    }
    case 'gradient': {
      layers.push(
        bgTone === 'light'
          ? `linear-gradient(135deg, ${hexToRgba(accentColor, 0.16)} 0%, ${hexToRgba('#ffffff', 0.3)} 100%)`
          : `linear-gradient(135deg, ${hexToRgba(accentColor, 0.22)} 0%, ${hexToRgba('#0f172a', 0.2)} 100%)`,
      );
      break;
    }
    default: {
      break;
    }
  }

  if (overlays.includes('grid')) {
    layers.push(
      `linear-gradient(${hexToRgba(bgTone === 'light' ? '#111111' : '#ffffff', bgTone === 'light' ? 0.06 : 0.08)} 1px, transparent 1px)`,
      `linear-gradient(90deg, ${hexToRgba(bgTone === 'light' ? '#111111' : '#ffffff', bgTone === 'light' ? 0.06 : 0.08)} 1px, transparent 1px)`,
    );
  }
  if (overlays.includes('dots')) {
    layers.push(`radial-gradient(circle, ${hexToRgba(bgTone === 'light' ? '#111111' : '#ffffff', bgTone === 'light' ? 0.08 : 0.1)} 1px, transparent 1px)`);
  }
  if (overlays.includes('diagonal')) {
    layers.push(`repeating-linear-gradient(135deg, ${hexToRgba(bgTone === 'light' ? '#111111' : '#ffffff', bgTone === 'light' ? 0.04 : 0.05)} 0px, ${hexToRgba(bgTone === 'light' ? '#111111' : '#ffffff', bgTone === 'light' ? 0.04 : 0.05)} 10px, transparent 10px, transparent 24px)`);
  }
  if (overlays.includes('noise')) {
    layers.push(`repeating-radial-gradient(circle at 0 0, ${hexToRgba(bgTone === 'light' ? '#111111' : '#ffffff', bgTone === 'light' ? 0.02 : 0.03)} 0 1px, transparent 1px 3px)`);
  }
  if (overlays.includes('spotlight')) {
    layers.push(`radial-gradient(70% 60% at 50% 20%, ${hexToRgba(accentColor, 0.15)} 0%, transparent 70%)`);
  }
  if (overlays.includes('vignette')) {
    layers.push(
      bgTone === 'light'
        ? `radial-gradient(120% 120% at 50% 50%, transparent 55%, ${hexToRgba('#111111', 0.12)} 100%)`
        : `radial-gradient(120% 120% at 50% 50%, transparent 55%, ${hexToRgba('#000000', 0.45)} 100%)`,
    );
  }

  return {
    backgroundColor,
    backgroundImage: layers.length > 0 ? layers.join(', ') : 'none',
  };
}

function resolveToneBaseColor(bgTone: BgTone, fallbackBg: string, bgCustomColor?: string): string {
  if (bgTone === 'custom' && bgCustomColor) return bgCustomColor;
  if (bgTone === 'light') return '#f8fafc';
  return fallbackBg;
}
