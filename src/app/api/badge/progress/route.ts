import { createBadgeHandler } from '@/modules/badge/server/badge-handler.server';
import {
  estimateTextWidth, hexToRgba, rect, svgRoot, text,
} from '@/modules/badge/server/badge-render.server';
import { progressSchema, type ProgressParams } from '@/modules/badge/shared/badge-schemas';

export function progressRenderer(p: ProgressParams): string {
  const accent = p.color ?? '#22c55e';
  const w      = p.width ?? 220;
  const h      = 36;
  const barH   = 6;
  const pad    = 10;
  const fs     = 10;

  const pct    = Math.min(100, Math.max(0, p.value));
  const label  = p.label;
  const valTxt = `${pct}%`;

  // Gradient from accent to lighter
  const defs = `
    <linearGradient id="bar" x1="0" y1="0" x2="1" y2="0">
      <stop offset="0%" stop-color="${accent}"/>
      <stop offset="100%" stop-color="${hexToRgba(accent, 0.7)}"/>
    </linearGradient>
    <clipPath id="barclip"><rect x="${pad}" y="${h - barH - 4}" width="${w - pad * 2}" height="${barH}" rx="3"/></clipPath>`;

  const barW   = w - pad * 2;
  const fillW  = Math.round((barW * pct) / 100);
  const labelFg = '#e4e4e7';
  const mutedFg = '#71717a';

  const content = [
    rect(0, 0, w, h, '#1a1a1a', 6),
    rect(0, 0, w, h, 'none', 6, `stroke="#333333" stroke-width="1" fill="none"`),
    text(label,  pad, 12, labelFg, fs),
    text(valTxt, w - pad, 12, hexToRgba(accent, 0.9), fs, 'bold', 'end'),
    // track
    `<g clip-path="url(#barclip)">`,
    rect(pad, h - barH - 4, barW, barH, '#333333', 0),
    fillW > 0 ? rect(pad, h - barH - 4, fillW, barH, `url(#bar)`, 0) : '',
    `</g>`,
  ].join('');

  return svgRoot(w, h, content, defs);
}

export const GET = createBadgeHandler(progressSchema, progressRenderer);
