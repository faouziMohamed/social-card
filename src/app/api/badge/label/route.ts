import { createBadgeHandler } from '@/modules/badge/server/badge-handler.server';
import {
  clipPath, estimateTextWidth, getContrastColor,
  rect, svgRoot, text,
} from '@/modules/badge/server/badge-render.server';
import { labelSchema, type LabelParams } from '@/modules/badge/shared/badge-schemas';

export function labelRenderer(p: LabelParams): string {
  const isPill = p.style === 'pill';
  const rx = isPill ? 14 : 4;
  const h = 20;
  const pad = 8;
  const fs = 11;

  const lw = estimateTextWidth(p.label, fs) + pad * 2;
  const mw = estimateTextWidth(p.message, fs) + pad * 2;
  const w = lw + mw;

  const labelFg  = getContrastColor(p.labelColor ?? '#555555');
  const messageFg = getContrastColor(p.color ?? '#6366f1');

  const defs = clipPath('clip', w, h, rx);

  const content = [
    `<g clip-path="url(#clip)">`,
    rect(0,  0, lw, h, p.labelColor  ?? '#555555', 0),
    rect(lw, 0, mw, h, p.color ?? '#6366f1', 0),
    `</g>`,
    // subtle inner shadow line between segments
    `<line x1="${lw}" y1="0" x2="${lw}" y2="${h}" stroke="rgba(0,0,0,0.15)" stroke-width="1"/>`,
    text(p.label,   pad,      h / 2, labelFg,   fs, 'normal'),
    text(p.message, lw + pad, h / 2, messageFg, fs, 'bold'),
  ].join('');

  return svgRoot(w, h, content, defs);
}

export const GET = createBadgeHandler(labelSchema, labelRenderer);
