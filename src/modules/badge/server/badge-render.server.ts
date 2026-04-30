// SVG primitive helpers for building badge markup.

// ─── Color utilities ──────────────────────────────────────────────────────────

/** Convert 3 or 6-digit hex to rgba(). */
export function hexToRgba(hex: string, alpha = 1): string {
  const h = hex.replace('#', '');
  const full = h.length === 3 ? h.split('').map((c) => c + c).join('') : h;
  const r = parseInt(full.slice(0, 2), 16);
  const g = parseInt(full.slice(2, 4), 16);
  const b = parseInt(full.slice(4, 6), 16);
  return `rgba(${r},${g},${b},${alpha})`;
}

/** WCAG relative luminance → black or white foreground. */
export function getContrastColor(hex: string): '#111111' | '#ffffff' {
  const h = hex.replace('#', '');
  const full = h.length === 3 ? h.split('').map((c) => c + c).join('') : h;
  const r = parseInt(full.slice(0, 2), 16) / 255;
  const g = parseInt(full.slice(2, 4), 16) / 255;
  const b = parseInt(full.slice(4, 6), 16) / 255;
  const toLinear = (c: number) => (c <= 0.03928 ? c / 12.92 : ((c + 0.055) / 1.055) ** 2.4);
  const L = 0.2126 * toLinear(r) + 0.7152 * toLinear(g) + 0.0722 * toLinear(b);
  return L > 0.179 ? '#111111' : '#ffffff';
}

/** Lighten a hex color by mixing with white. ratio 0 = unchanged, 1 = white. */
export function lighten(hex: string, ratio: number): string {
  const h = hex.replace('#', '');
  const full = h.length === 3 ? h.split('').map((c) => c + c).join('') : h;
  const blend = (channel: string) => {
    const v = parseInt(channel, 16);
    return Math.round(v + (255 - v) * ratio).toString(16).padStart(2, '0');
  };
  return `#${blend(full.slice(0, 2))}${blend(full.slice(2, 4))}${blend(full.slice(4, 6))}`;
}

// ─── SVG element builders ─────────────────────────────────────────────────────

/** Wrap arbitrary SVG content in a root <svg> element. */
export function svgRoot(
  width: number,
  height: number,
  content: string,
  defs = '',
): string {
  return [
    `<svg xmlns="http://www.w3.org/2000/svg" width="${width}" height="${height}" viewBox="0 0 ${width} ${height}" role="img">`,
    defs ? `<defs>${defs}</defs>` : '',
    content,
    '</svg>',
  ].filter(Boolean).join('\n');
}

/** Rounded rectangle. */
export function rect(
  x: number,
  y: number,
  w: number,
  h: number,
  fill: string,
  rx = 4,
  attrs = '',
): string {
  return `<rect x="${x}" y="${y}" width="${w}" height="${h}" rx="${rx}" fill="${fill}" ${attrs}/>`;
}

/** Full-width clip path for pill/flat badges. */
export function clipPath(id: string, w: number, h: number, rx = 4): string {
  return `<clipPath id="${id}"><rect width="${w}" height="${h}" rx="${rx}"/></clipPath>`;
}

/** SVG text element. */
export function text(
  content: string,
  x: number,
  y: number,
  fill: string,
  fontSize = 11,
  fontWeight: 'normal' | 'bold' = 'normal',
  anchor: 'start' | 'middle' | 'end' = 'start',
  fontFamily = 'system-ui,-apple-system,sans-serif',
): string {
  return `<text x="${x}" y="${y}" font-family="${fontFamily}" font-size="${fontSize}" font-weight="${fontWeight}" fill="${fill}" text-anchor="${anchor}" dominant-baseline="central">${escapeXml(content)}</text>`;
}

/** Monospace text (for values). */
export function monoText(
  content: string,
  x: number,
  y: number,
  fill: string,
  fontSize = 11,
  fontWeight: 'normal' | 'bold' = 'bold',
  anchor: 'start' | 'middle' | 'end' = 'start',
): string {
  return text(content, x, y, fill, fontSize, fontWeight, anchor, '"JetBrains Mono","Cascadia Code","Fira Code",monospace');
}

/** Dot / circle. */
export function circle(cx: number, cy: number, r: number, fill: string): string {
  return `<circle cx="${cx}" cy="${cy}" r="${r}" fill="${fill}"/>`;
}

/** Horizontal line. */
export function line(x1: number, y1: number, x2: number, y2: number, stroke: string, strokeWidth = 1): string {
  return `<line x1="${x1}" y1="${y1}" x2="${x2}" y2="${y2}" stroke="${stroke}" stroke-width="${strokeWidth}"/>`;
}

// ─── Icon paths (inline micro icons) ─────────────────────────────────────────

const ICON_PATHS: Record<string, string> = {
  star:     'M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z',
  download: 'M21 15v4a2 2 0 01-2 2H5a2 2 0 01-2-2v-4M7 10l5 5 5-5M12 15V3',
  eye:      'M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8zM12 9a3 3 0 100 6 3 3 0 000-6z',
  fork:     'M6 3a3 3 0 110 6 3 3 0 010-6zM18 3a3 3 0 110 6 3 3 0 010-6zM6 21a3 3 0 110-6 3 3 0 010 6zM6 9v3a6 6 0 006 6h.5m5.5-9.5V12a6 6 0 01-5 5.9',
  heart:    'M20.84 4.61a5.5 5.5 0 00-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 00-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 000-7.78z',
  zap:      'M13 2L3 14h9l-1 8 10-12h-9l1-8z',
  check:    'M20 6L9 17l-5-5',
  clock:    'M12 2a10 10 0 100 20A10 10 0 0012 2zM12 6v6l4 2',
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

// ─── Status colors ────────────────────────────────────────────────────────────

export const STATUS_COLORS: Record<string, string> = {
  online:      '#22c55e',
  offline:     '#ef4444',
  degraded:    '#f59e0b',
  maintenance: '#6366f1',
};

// ─── Approximate text width ───────────────────────────────────────────────────

/** Rough character-width estimate for system-ui at a given font size. */
export function estimateTextWidth(text: string, fontSize: number): number {
  // Average char width ≈ 0.6× font-size for system-ui, +padding
  return Math.ceil(text.length * fontSize * 0.62);
}

// ─── XML safety ───────────────────────────────────────────────────────────────

export function escapeXml(s: string): string {
  return s
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&apos;');
}

// ─── Social platform meta ─────────────────────────────────────────────────────

export const PLATFORM_META: Record<string, { label: string; color: string; iconPath: string }> = {
  github: {
    label: 'GitHub',
    color: '#24292e',
    iconPath: 'M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.919.678 1.852 0 1.336-.012 2.415-.012 2.743 0 .267.18.578.688.48A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z',
  },
  x: {
    label: 'X',
    color: '#000000',
    iconPath: 'M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-4.714-6.231-5.401 6.231H2.746l7.73-8.835L1.254 2.25H8.08l4.259 5.63zm-1.161 17.52h1.833L7.084 4.126H5.117z',
  },
  bluesky: {
    label: 'Bluesky',
    color: '#0085ff',
    iconPath: 'M12 2C6.486 2 2 6.486 2 12s4.486 10 10 10 10-4.486 10-10S17.514 2 12 2zm.75 14.348c-.386.221-.75.374-.75.374s-.364-.153-.75-.374c-1.364-.78-4.5-2.918-4.5-6.098 0-2.21 1.567-4 3.5-4 .914 0 1.743.385 2.35 1.01A3.476 3.476 0 0115.5 10.25c1.933 0 3.5 1.79 3.5 4 0 3.18-3.136 5.318-5.25 6.098z',
  },
  linkedin: {
    label: 'LinkedIn',
    color: '#0077b5',
    iconPath: 'M16 8a6 6 0 016 6v7h-4v-7a2 2 0 00-2-2 2 2 0 00-2 2v7h-4v-7a6 6 0 016-6zM2 9h4v12H2z M4 6a2 2 0 100-4 2 2 0 000 4z',
  },
  youtube: {
    label: 'YouTube',
    color: '#ff0000',
    iconPath: 'M22.54 6.42a2.78 2.78 0 00-1.95-1.96C18.88 4 12 4 12 4s-6.88 0-8.59.46a2.78 2.78 0 00-1.95 1.96A29 29 0 001 12a29 29 0 00.46 5.58a2.78 2.78 0 001.95 1.95C5.12 20 12 20 12 20s6.88 0 8.59-.47a2.78 2.78 0 001.95-1.95A29 29 0 0023 12a29 29 0 00-.46-5.58zM9.75 15.02V8.98L15.5 12l-5.75 3.02z',
  },
  twitch: {
    label: 'Twitch',
    color: '#9146ff',
    iconPath: 'M11.571 4.714h1.715v5.143H11.57zm4.715 0H18v5.143h-1.714zM6 0L1.714 4.286v15.428h5.143V24l4.286-4.286h3.428L22.286 12V0zm14.571 11.143l-3.428 3.428h-3.429l-3 3v-3H6.857V1.714h13.714z',
  },
  discord: {
    label: 'Discord',
    color: '#5865f2',
    iconPath: 'M20.317 4.37a19.791 19.791 0 00-4.885-1.515.074.074 0 00-.079.037c-.21.375-.444.864-.608 1.25a18.27 18.27 0 00-5.487 0 12.64 12.64 0 00-.617-1.25.077.077 0 00-.079-.037A19.736 19.736 0 003.677 4.37a.07.07 0 00-.032.027C.533 9.046-.32 13.58.099 18.057a.082.082 0 00.031.057 19.9 19.9 0 005.993 3.03.078.078 0 00.084-.028c.462-.63.874-1.295 1.226-1.994a.076.076 0 00-.041-.106 13.107 13.107 0 01-1.872-.892.077.077 0 01-.008-.128 10.2 10.2 0 00.372-.292.074.074 0 01.077-.01c3.928 1.793 8.18 1.793 12.062 0a.074.074 0 01.078.01c.12.098.246.198.373.292a.077.077 0 01-.006.127 12.299 12.299 0 01-1.873.892.077.077 0 00-.041.107c.36.698.772 1.362 1.225 1.993a.076.076 0 00.084.028 19.839 19.839 0 006.002-3.03.077.077 0 00.032-.054c.5-5.177-.838-9.674-3.549-13.66a.061.061 0 00-.031-.03z',
  },
  npm: {
    label: 'npm',
    color: '#cb3837',
    iconPath: 'M0 7.334v8h6.666v1.332H12v-1.332h12v-8H0zm6.666 6.664H5.334v-4H3.999v4H1.335V8.666h5.331v5.332zm4 0v1.336H8.001V8.666h5.334v5.332h-2.669zm12.001 0h-1.33v-4h-1.336v4h-1.335v-4h-1.33v4h-2.671V8.666h8.002v5.332z',
  },
  pypi: {
    label: 'PyPI',
    color: '#3775a9',
    iconPath: 'M12.2 0C9.9 0 8 .9 8 2v2.4c0 .6.5 1.1 1.2 1.5V8H8c-.6 0-1.1.3-1.4.7L4.8 11c-.4.5-.7 1.1-.7 1.8V16c0 1.5 1.2 2.7 2.7 2.7h.8v3c0 1.2 1.5 2.1 3.4 2.3V24h2v-.1c1.9-.2 3.4-1.1 3.4-2.3v-3h.8c1.5 0 2.7-1.2 2.7-2.7v-3.2c0-.7-.3-1.3-.7-1.8l-1.8-2.3c-.3-.4-.8-.7-1.4-.7h-1.2V5.9c.7-.4 1.2-.9 1.2-1.5V2c0-1.1-1.9-2-4.3-2h-.3zM10 2.3c.6-.2 1.4-.3 2.2-.3s1.6.1 2.2.3V4H10V2.3z',
  },
};
