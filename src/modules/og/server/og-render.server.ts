import React from 'react';

// Shared cache-control value for all OG image responses
export const CACHE_CONTROL =
  'public, max-age=86400, stale-while-revalidate=604800';

// Cache-control value used when the caller passes ?bust=<any>
export const NO_CACHE = 'no-store, no-cache, must-revalidate, proxy-revalidate';

/**
 * Resolve the Cache-Control header value for a response.
 *
 * When the caller passes the `bust` query param (any value), the response is
 * not cached — useful for forcing a fresh render during development or after
 * content changes.  The param value is irrelevant; even `?bust=1` works.
 * Changing the value (e.g. a timestamp) also causes CDN/browser cache misses
 * because the URL itself changes.
 *
 * Examples:
 *   /api/og/general?title=Hello              → cached for 24 h
 *   /api/og/general?title=Hello&bust=1       → no-store
 *   /api/og/general?title=Hello&bust=1714500 → no-store (timestamp variant)
 */
export function resolveCacheControl(rawParams: Record<string, string>): string {
  return 'bust' in rawParams ? NO_CACHE : CACHE_CONTROL;
}

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
  if (!/^([\da-f]{3}|[\da-f]{6})$/i.test(h)) {
    throw new Error(`Invalid hex color: ${hex}`);
  }
  const r = Number.parseInt(h.length === 3 ? h[0] + h[0] : h.slice(0, 2), 16);
  const g = Number.parseInt(h.length === 3 ? h[1] + h[1] : h.slice(2, 4), 16);
  const b = Number.parseInt(h.length === 3 ? h[2] + h[2] : h.slice(4, 6), 16);
  return `rgba(${r},${g},${b},${alpha})`;
}

// Linearise an sRGB channel value for WCAG luminance calculation
const toLinear = (c: number) =>
  c <= 0.040_45 ? c / 12.92 : Math.pow((c + 0.055) / 1.055, 2.4);

// WCAG relative luminance → returns '#111111' for light backgrounds, '#ffffff' for dark
export function getContrastColor(hex: string): '#111111' | '#ffffff' {
  const h = hex.replace('#', '');
  if (!/^([\da-f]{3}|[\da-f]{6})$/i.test(h)) {
    throw new Error(`Invalid hex color: ${hex}`);
  }
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
