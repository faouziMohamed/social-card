import { createBadgeHandler } from '@/modules/badge/server/badge-handler.server';
import {
  circle, estimateTextWidth, getContrastColor, hexToRgba,
  rect, svgRoot, text, STATUS_COLORS,
} from '@/modules/badge/server/badge-render.server';
import { statusSchema, type StatusParams } from '@/modules/badge/shared/badge-schemas';

export function statusRenderer(p: StatusParams): string {
  const statusColor = p.color ?? STATUS_COLORS[p.status] ?? '#6b7280';
  const bg = '#1a1a1a';
  const border = '#333333';

  const label   = p.label;
  const statusLabel = p.status.charAt(0).toUpperCase() + p.status.slice(1);

  const dotR  = 4;
  const dotGap = 6;
  const pad   = 10;
  const h     = 24;
  const fs    = 11;

  const labelW  = estimateTextWidth(label, fs);
  const statusW = estimateTextWidth(statusLabel, fs);
  const divider = 1;

  // left: label | right: dot + status text
  const leftW  = labelW + pad * 2;
  const rightW = dotR * 2 + dotGap + statusW + pad * 2;
  const w      = leftW + divider + rightW;

  const defs = `
    <clipPath id="clip"><rect width="${w}" height="${h}" rx="4"/></clipPath>
    <radialGradient id="dotglow" cx="50%" cy="50%" r="50%">
      <stop offset="0%" stop-color="${statusColor}" stop-opacity="0.6"/>
      <stop offset="100%" stop-color="${statusColor}" stop-opacity="0"/>
    </radialGradient>`;

  const labelFg = '#a1a1aa';
  const statusFg = getContrastColor(statusColor) === '#111111' ? statusColor : '#ffffff';

  const content = [
    `<g clip-path="url(#clip)">`,
    rect(0,     0, w, h, bg,      0),
    rect(0,     0, leftW, h, 'rgba(255,255,255,0.03)', 0),
    `</g>`,
    rect(0, 0, w, h, 'none', 4, `stroke="${border}" stroke-width="1" fill="none"`),
    text(label, pad, h / 2, labelFg, fs),
    // dot glow circle + solid dot
    circle(leftW + divider + pad + dotR, h / 2, dotR + 3, 'url(#dotglow)'),
    circle(leftW + divider + pad + dotR, h / 2, dotR, statusColor),
    text(statusLabel, leftW + divider + pad + dotR * 2 + dotGap, h / 2, hexToRgba(statusColor, 0.9), fs, 'bold'),
  ].join('');

  return svgRoot(w, h, content, defs);
}

export const GET = createBadgeHandler(statusSchema, statusRenderer);
