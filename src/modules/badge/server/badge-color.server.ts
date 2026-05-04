// Color utilities for badge rendering.

/** Convert 3 or 6-digit hex to rgba(). */
export function hexToRgba(hex: string, alpha = 1): string {
  const h = hex.replace('#', '');
  const full =
    h.length === 3
      ? h
          .split('')
          .map(c => c + c)
          .join('')
      : h;
  const r = Number.parseInt(full.slice(0, 2), 16);
  const g = Number.parseInt(full.slice(2, 4), 16);
  const b = Number.parseInt(full.slice(4, 6), 16);
  return `rgba(${r},${g},${b},${alpha})`;
}

// Linearise an sRGB channel value for WCAG luminance calculation
const toLinear = (c: number) =>
  c <= 0.039_28 ? c / 12.92 : ((c + 0.055) / 1.055) ** 2.4;

/** WCAG relative luminance → black or white foreground. */
export function getContrastColor(hex: string): '#111111' | '#ffffff' {
  const h = hex.replace('#', '');
  const full =
    h.length === 3
      ? h
          .split('')
          .map(c => c + c)
          .join('')
      : h;
  const r = Number.parseInt(full.slice(0, 2), 16) / 255;
  const g = Number.parseInt(full.slice(2, 4), 16) / 255;
  const b = Number.parseInt(full.slice(4, 6), 16) / 255;
  const L = 0.2126 * toLinear(r) + 0.7152 * toLinear(g) + 0.0722 * toLinear(b);
  return L > 0.179 ? '#111111' : '#ffffff';
}

/** Lighten a hex color by mixing with white. ratio 0 = unchanged, 1 = white. */
export function lighten(hex: string, ratio: number): string {
  return mixHex(hex, '#ffffff', ratio);
}

export function darken(hex: string, ratio: number): string {
  return mixHex(hex, '#000000', ratio);
}

export function mixHex(from: string, to: string, ratio: number): string {
  const start = hexToRgb(from);
  const end = hexToRgb(to);
  const amount = clamp(ratio, 0, 1);
  const blend = (a: number, b: number) =>
    Math.round(a + (b - a) * amount)
      .toString(16)
      .padStart(2, '0');

  return `#${blend(start.r, end.r)}${blend(start.g, end.g)}${blend(start.b, end.b)}`;
}

export function clamp(value: number, min: number, max: number): number {
  return Math.min(max, Math.max(min, value));
}

export function percentage(value: number, max = 100): number {
  if (max <= 0) return 0;
  return clamp(value / max, 0, 1);
}

function hexToRgb(hex: string): {r: number; g: number; b: number} {
  const h = hex.replace('#', '');
  const full =
    h.length === 3
      ? h
          .split('')
          .map(c => c + c)
          .join('')
      : h;

  return {
    r: Number.parseInt(full.slice(0, 2), 16),
    g: Number.parseInt(full.slice(2, 4), 16),
    b: Number.parseInt(full.slice(4, 6), 16),
  };
}
