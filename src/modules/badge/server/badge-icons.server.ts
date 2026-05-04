// Inline SVG icon paths and renderer for badges.

const ICON_PATHS: Record<string, string> = {
  star: 'M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z',
  download: 'M21 15v4a2 2 0 01-2 2H5a2 2 0 01-2-2v-4M7 10l5 5 5-5M12 15V3',
  eye: 'M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8zM12 9a3 3 0 100 6 3 3 0 000-6z',
  fork: 'M6 3a3 3 0 110 6 3 3 0 010-6zM18 3a3 3 0 110 6 3 3 0 010-6zM6 21a3 3 0 110-6 3 3 0 010 6zM6 9v3a6 6 0 006 6h.5m5.5-9.5V12a6 6 0 01-5 5.9',
  heart:
    'M20.84 4.61a5.5 5.5 0 00-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 00-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 000-7.78z',
  zap: 'M13 2L3 14h9l-1 8 10-12h-9l1-8z',
  check: 'M20 6L9 17l-5-5',
  clock: 'M12 2a10 10 0 100 20A10 10 0 0012 2zM12 6v6l4 2',
};

/** Render an inline SVG icon at position (cx,cy) with the given size. */
export function icon(
  name: string,
  cx: number,
  cy: number,
  size: number,
  fill = 'none',
  stroke = '#ffffff',
): string {
  const path = ICON_PATHS[name];
  if (!path) return '';
  const s = size / 24; // scale from 24px viewbox
  return `<g transform="translate(${cx - size / 2},${cy - size / 2}) scale(${s})"><path d="${path}" fill="${fill}" stroke="${stroke}" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/></g>`;
}
