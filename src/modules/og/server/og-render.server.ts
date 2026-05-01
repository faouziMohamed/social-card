import React from 'react';

// Shared cache-control value for all OG image responses
export const CACHE_CONTROL =
  'public, max-age=86400, stale-while-revalidate=604800';

// CSS webkit line-clamp helper for Satori JSX
export function clampStyle(lines: number): React.CSSProperties {
  return {
    display: '-webkit-box',
    WebkitLineClamp: lines,
    WebkitBoxOrient: 'vertical',
    overflow: 'hidden',
  };
}

// Hex color → rgba(r,g,b,alpha) string (supports 3 and 6 digit hex)
export function hexToRgba(hex: string, alpha: number): string {
  const h = hex.replace('#', '');
  const r = Number.parseInt(h.length === 3 ? h[0] + h[0] : h.slice(0, 2), 16);
  const g = Number.parseInt(h.length === 3 ? h[1] + h[1] : h.slice(2, 4), 16);
  const b = Number.parseInt(h.length === 3 ? h[2] + h[2] : h.slice(4, 6), 16);
  return `rgba(${r},${g},${b},${alpha})`;
}

// WCAG relative luminance → returns '#111111' for light backgrounds, '#ffffff' for dark
export function getContrastColor(hex: string): '#111111' | '#ffffff' {
  const h = hex.replace('#', '');
  const toLinear = (c: number) =>
    c <= 0.04045 ? c / 12.92 : Math.pow((c + 0.055) / 1.055, 2.4);
  const r = toLinear(
    Number.parseInt(h.length === 3 ? h[0] + h[0] : h.slice(0, 2), 16) / 255,
  );
  const g = toLinear(
    Number.parseInt(h.length === 3 ? h[1] + h[1] : h.slice(2, 4), 16) / 255,
  );
  const b = toLinear(
    Number.parseInt(h.length === 3 ? h[2] + h[2] : h.slice(4, 6), 16) / 255,
  );
  const L = 0.2126 * r + 0.7152 * g + 0.0722 * b;
  return L > 0.35 ? '#111111' : '#ffffff';
}
