import { createBadgeHandler } from '@/modules/badge/server/badge-handler.server';
import {
  STATUS_COLORS,
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
import { statusSchema, type StatusParams } from '@/modules/badge/shared/badge-schemas';

export function statusRenderer(p: StatusParams): string {
  const accent = p.color ?? STATUS_COLORS[p.status] ?? '#6b7280';
  const palette = resolvePalette(p.theme);
  const statusLabel = p.status.charAt(0).toUpperCase() + p.status.slice(1);
  const fontSize = 11;
  const height = 30;
  const pad = 10;
  const labelWidth = estimateTextWidth(p.label, fontSize) + pad * 2;
  const chipWidth = estimateTextWidth(statusLabel, fontSize) + 28;
  const width = labelWidth + chipWidth + pad;
  const chipX = width - chipWidth - 6;
  const dotX = chipX + 11;

  const defs = premiumDefs(p.theme, accent, 'status');
  const content = [
    premiumPanel(width, height, 15, p.theme, accent, 'status'),
    text(p.label, pad, height / 2, palette.muted, fontSize, 'bold'),
    premiumChip(chipX, 6, chipWidth, 18, 9, accent, 0.16),
    circle(dotX, height / 2, 6, 'url(#status-glow)'),
    circle(dotX, height / 2, 3.5, accent),
    text(statusLabel, dotX + 9, height / 2, hexToRgba(accent, 0.96), fontSize, 'bold'),
  ].join('');

  return svgRoot(width, height, content, defs);
}

export const GET = createBadgeHandler(statusSchema, statusRenderer);
