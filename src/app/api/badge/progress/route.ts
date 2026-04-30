import { createBadgeHandler } from '@/modules/badge/server/badge-handler.server';
import {
  clamp,
  hexToRgba,
  premiumDefs,
  premiumPanel,
  rect,
  resolvePalette,
  svgRoot,
  text,
} from '@/modules/badge/server/badge-render.server';
import { progressSchema, type ProgressParams } from '@/modules/badge/shared/badge-schemas';

export function progressRenderer(p: ProgressParams): string {
  const accent = p.color ?? '#22c55e';
  const palette = resolvePalette(p.theme);
  const width = p.width ?? 220;
  const height = 46;
  const pad = 12;
  const barHeight = 8;
  const barY = 30;
  const pct = Math.round(clamp(p.value, 0, 100));
  const trackWidth = width - pad * 2;
  const fillWidth = Math.round((trackWidth * pct) / 100);

  const defs = [
    premiumDefs(p.theme, accent, 'progress'),
    `<clipPath id="barclip"><rect x="${pad}" y="${barY}" width="${trackWidth}" height="${barHeight}" rx="4"/></clipPath>`,
  ].join('');

  const content = [
    premiumPanel(width, height, 12, p.theme, accent, 'progress'),
    text(p.label, pad, 16, palette.fg, 11, 'bold'),
    text(`${pct}%`, width - pad, 16, hexToRgba(accent, 0.96), 11, 'bold', 'end'),
    `<g clip-path="url(#barclip)">`,
    rect(pad, barY, trackWidth, barHeight, hexToRgba(palette.fg, p.theme === 'dark' ? 0.12 : 0.1), 0),
    fillWidth > 0 ? rect(pad, barY, fillWidth, barHeight, 'url(#progress-accent)', 0) : '',
    fillWidth > 8 ? `<path d="M${pad + 2} ${barY + 2}H${pad + fillWidth - 2}" stroke="${hexToRgba('#ffffff', 0.45)}" stroke-linecap="round"/>` : '',
    '</g>',
    `<circle cx="${pad + fillWidth}" cy="${barY + barHeight / 2}" r="${fillWidth > 0 ? 5 : 0}" fill="${hexToRgba(accent, 0.38)}"/>`,
  ].join('');

  return svgRoot(width, height, content, defs);
}

export const GET = createBadgeHandler(progressSchema, progressRenderer);
