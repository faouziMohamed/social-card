import { createBadgeHandler } from '@/modules/badge/server/badge-handler.server';
import {
  circle, estimateTextWidth, getContrastColor, hexToRgba,
  rect, svgRoot, text,
} from '@/modules/badge/server/badge-render.server';
import { availabilitySchema, type AvailabilityParams } from '@/modules/badge/shared/badge-schemas';

export function availabilityRenderer(p: AvailabilityParams): string {
  const isAvailable = p.available === 'true';
  const accent = isAvailable ? (p.color ?? '#22c55e') : '#6b7280';
  const cta    = p.hireText ?? (isAvailable ? 'Open to work' : 'Not available');
  const label  = p.label;

  const fg     = '#ffffff';
  const mutedFg = hexToRgba('#ffffff', 0.55);
  const h      = 40;
  const pad    = 12;
  const fs     = 12;
  const dotR   = 5;
  const dotGap = 8;

  const labelW = estimateTextWidth(label, fs);
  const ctaW   = estimateTextWidth(cta, 10);
  const innerW = Math.max(labelW, ctaW) + dotR * 2 + dotGap + pad * 2;
  const w      = innerW;

  const defs = `
    <linearGradient id="bg" x1="0" y1="0" x2="1" y2="1">
      <stop offset="0%" stop-color="${hexToRgba(accent, 0.2)}"/>
      <stop offset="100%" stop-color="${hexToRgba(accent, 0.08)}"/>
    </linearGradient>
    ${isAvailable ? `
    <radialGradient id="dotglow" cx="50%" cy="50%" r="50%">
      <stop offset="0%" stop-color="${accent}" stop-opacity="0.5"/>
      <stop offset="100%" stop-color="${accent}" stop-opacity="0"/>
    </radialGradient>` : ''}`;

  const dotX = pad + dotR;
  const textX = dotX + dotR + dotGap;

  const content = [
    rect(0, 0, w, h, '#1a1a1a', 8),
    rect(0, 0, w, h, 'url(#bg)', 8),
    rect(0, 0, w, h, 'none', 8, `stroke="${hexToRgba(accent, 0.3)}" stroke-width="1" fill="none"`),
    isAvailable ? circle(dotX, h / 2, dotR + 4, 'url(#dotglow)') : '',
    circle(dotX, h / 2, dotR, accent),
    text(label, textX, h / 2 - 6, fg, fs, 'bold'),
    text(cta, textX, h / 2 + 8, hexToRgba(accent, 0.85), 10),
  ].join('');

  return svgRoot(w, h, content, defs);
}

export const GET = createBadgeHandler(availabilitySchema, availabilityRenderer);
