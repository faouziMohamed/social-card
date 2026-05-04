import type {CSSProperties} from 'react';

import {
  getContrastColor,
  hexToRgba,
} from '@/modules/og/server/og-render.server';
import {
  resolveFontFamilyName,
  supportsOgLigatures,
} from '@/modules/og/shared/og-font-catalog';

export const BG_BASE_OPTIONS = ['solid', 'gradient', 'aurora', 'mesh'] as const;
export const BG_OVERLAY_OPTIONS = [
  'grid',
  'dots',
  'diagonal',
  'noise',
  'spotlight',
  'vignette',
] as const;

export type BgBase = (typeof BG_BASE_OPTIONS)[number];
export type BgOverlay = (typeof BG_OVERLAY_OPTIONS)[number];

type BgVisualResult = {
  backgroundColor: string;
  backgroundImage: string;
  backgroundSize?: string;
};

type BgTone = 'dark' | 'light' | 'custom';

export function resolveTypographyStyle(fontFamily: string): CSSProperties {
  const family = resolveFontFamilyName(fontFamily);

  if (!supportsOgLigatures(fontFamily)) {
    return {fontFamily: family};
  }

  return {
    fontFamily: family,
    fontFeatureSettings: '"liga" 1, "calt" 1',
    fontVariantLigatures: 'common-ligatures contextual',
  };
}

export function parseBgStyleTokens(value: string): {
  base: BgBase;
  overlays: BgOverlay[];
} {
  const tokens = value
    .split('+')
    .map(part => part.trim().toLowerCase())
    .filter(Boolean);
  const base =
    (tokens.find(token =>
      (BG_BASE_OPTIONS as readonly string[]).includes(token),
    ) as BgBase | undefined) ?? 'gradient';
  const overlays = tokens.filter((token): token is BgOverlay =>
    (BG_OVERLAY_OPTIONS as readonly string[]).includes(token),
  );
  return {base, overlays};
}

export function composeBackgroundStyle(
  style: string,
  accentColor: string,
  fallbackBg: string,
): BgVisualResult {
  return composeBackgroundStyleWithTone(style, accentColor, fallbackBg, 'dark');
}

export function composeBackgroundStyleWithTone(
  style: string,
  accentColor: string,
  fallbackBg: string,
  bgTone: BgTone,
  bgCustomColor?: string,
  bgGradientFrom?: string,
  bgGradientTo?: string,
): BgVisualResult {
  const {base, overlays} = parseBgStyleTokens(style);
  const layers: string[] = [];
  const sizes: string[] = [];
  let backgroundColor = resolveToneBaseColor(bgTone, fallbackBg, bgCustomColor);

  // Determine foreground color for overlays — adaptive when custom bg is set
  const fgColor =
    bgTone === 'custom' && bgCustomColor
      ? getContrastColor(bgCustomColor)
      : bgTone === 'light'
        ? '#111111'
        : '#ffffff';
  const fgOpacityBase = fgColor === '#111111' ? 0.07 : 0.09;

  switch (base) {
    case 'aurora': {
      backgroundColor =
        bgTone === 'light'
          ? '#eef6ff'
          : bgTone === 'custom' && bgCustomColor
            ? bgCustomColor
            : '#030712';
      layers.push(
        `radial-gradient(80% 100% at 10% 15%, ${hexToRgba('#22d3ee', bgTone === 'light' ? 0.14 : 0.2)} 0%, transparent 60%)`,
        `radial-gradient(70% 90% at 90% 85%, ${hexToRgba('#a855f7', bgTone === 'light' ? 0.14 : 0.2)} 0%, transparent 65%)`,
      );
      sizes.push('100% 100%', '100% 100%');
      break;
    }
    case 'mesh': {
      layers.push(
        `radial-gradient(ellipse at 0% 0%, ${hexToRgba(accentColor, 0.16)} 0%, transparent 55%)`,
        `radial-gradient(ellipse at 100% 100%, ${hexToRgba(accentColor, 0.14)} 0%, transparent 55%)`,
      );
      sizes.push('100% 100%', '100% 100%');
      break;
    }
    case 'gradient': {
      const gradFrom = bgGradientFrom ?? accentColor;
      const gradTo =
        bgGradientTo ??
        (bgTone === 'light'
          ? '#ffffff'
          : bgTone === 'custom' && bgCustomColor
            ? bgCustomColor
            : '#0f172a');
      layers.push(
        `linear-gradient(135deg, ${hexToRgba(gradFrom, bgTone === 'light' ? 0.2 : 0.28)} 0%, ${hexToRgba(gradTo, bgTone === 'light' ? 0.35 : 0.25)} 100%)`,
      );
      sizes.push('100% 100%');
      break;
    }
    default: {
      break;
    }
  }

  if (overlays.includes('grid')) {
    layers.push(
      `linear-gradient(${hexToRgba(fgColor, fgOpacityBase)} 1px, transparent 1px)`,
      `linear-gradient(90deg, ${hexToRgba(fgColor, fgOpacityBase)} 1px, transparent 1px)`,
    );
    sizes.push('40px 40px', '40px 40px');
  }
  if (overlays.includes('dots')) {
    layers.push(
      `radial-gradient(circle, ${hexToRgba(fgColor, fgOpacityBase + 0.02)} 1.5px, transparent 1.5px)`,
    );
    sizes.push('20px 20px');
  }
  if (overlays.includes('diagonal')) {
    layers.push(
      `repeating-linear-gradient(135deg, ${hexToRgba(fgColor, fgOpacityBase - 0.02)} 0px, ${hexToRgba(fgColor, fgOpacityBase - 0.02)} 1px, transparent 1px, transparent 14px)`,
    );
    sizes.push('20px 20px');
  }
  if (overlays.includes('noise')) {
    layers.push(
      `repeating-radial-gradient(circle at 0 0, ${hexToRgba(fgColor, fgOpacityBase - 0.04)} 0 1px, transparent 1px 3px)`,
    );
    sizes.push('3px 3px');
  }
  if (overlays.includes('spotlight')) {
    layers.push(
      `radial-gradient(70% 60% at 50% 20%, ${hexToRgba(accentColor, 0.18)} 0%, transparent 70%)`,
    );
    sizes.push('100% 100%');
  }
  if (overlays.includes('vignette')) {
    layers.push(
      bgTone === 'light'
        ? `radial-gradient(120% 120% at 50% 50%, transparent 55%, ${hexToRgba('#111111', 0.12)} 100%)`
        : `radial-gradient(120% 120% at 50% 50%, transparent 55%, ${hexToRgba('#000000', 0.45)} 100%)`,
    );
    sizes.push('100% 100%');
  }

  const result: BgVisualResult = {
    backgroundColor,
    backgroundImage: layers.length > 0 ? layers.join(', ') : 'none',
  };

  if (sizes.length > 0) {
    result.backgroundSize = sizes.join(', ');
  }

  return result;
}

function resolveToneBaseColor(
  bgTone: BgTone,
  fallbackBg: string,
  bgCustomColor?: string,
): string {
  if (bgTone === 'custom' && bgCustomColor) return bgCustomColor;
  if (bgTone === 'light') return '#f8fafc';
  return fallbackBg;
}
