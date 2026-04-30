import { createBadgeHandler } from '@/modules/badge/server/badge-handler.server';
import {
  circle,
  estimateTextWidth,
  hexToRgba,
  premiumChip,
  premiumDefs,
  premiumPanel,
  resolvePalette,
  svgRoot,
  text,
} from '@/modules/badge/server/badge-render.server';
import { availabilitySchema, type AvailabilityParams } from '@/modules/badge/shared/badge-schemas';

export function availabilityRenderer(p: AvailabilityParams): string {
  const isAvailable = p.available === 'true';
  const accent = isAvailable ? (p.color ?? '#22c55e') : '#64748b';
  const palette = resolvePalette(p.theme);
  const cta = p.hireText ?? (isAvailable ? 'Open to work' : 'Not available');
  const height = 52;
  const pad = 13;
  const avatarSize = 28;
  const labelWidth = estimateTextWidth(p.label, 12);
  const ctaWidth = estimateTextWidth(cta, 10);
  const chipWidth = estimateTextWidth(isAvailable ? 'LIVE' : 'PAUSED', 9) + 18;
  const width = Math.max(labelWidth, ctaWidth) + avatarSize + chipWidth + pad * 3 + 10;
  const avatarX = pad + avatarSize / 2;
  const avatarY = height / 2;
  const textX = pad + avatarSize + 10;
  const chipX = width - pad - chipWidth;

  const defs = premiumDefs(p.theme, accent, 'avail');
  const content = [
    premiumPanel(width, height, 16, p.theme, accent, 'avail'),
    circle(avatarX, avatarY, avatarSize / 2, hexToRgba(accent, 0.18)),
    circle(avatarX, avatarY, avatarSize / 2 - 4, 'url(#avail-accent)'),
    `<path d="M${avatarX - 5} ${avatarY + 1}l3.5 3.5L${avatarX + 6} ${avatarY - 6}" fill="none" stroke="#ffffff" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" opacity="${isAvailable ? 1 : 0.45}"/>`,
    text(p.label, textX, avatarY - 7, palette.fg, 12, 'bold'),
    text(cta, textX, avatarY + 9, hexToRgba(accent, 0.92), 10, 'normal'),
    premiumChip(chipX, 16, chipWidth, 20, 10, accent, isAvailable ? 0.16 : 0.11),
    circle(chipX + 10, 26, 3, accent),
    text(isAvailable ? 'LIVE' : 'PAUSED', chipX + 18, 26, hexToRgba(accent, 0.96), 9, 'bold'),
  ].join('');

  return svgRoot(width, height, content, defs);
}

export const GET = createBadgeHandler(availabilitySchema, availabilityRenderer);
