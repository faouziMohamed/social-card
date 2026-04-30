import { createBadgeHandler } from '@/modules/badge/server/badge-handler.server';
import {
  hexToRgba,
  monoText,
  percentage,
  premiumDefs,
  premiumPanel,
  resolvePalette,
  svgRoot,
  text,
} from '@/modules/badge/server/badge-render.server';
import { scoreSchema, type ScoreParams } from '@/modules/badge/shared/badge-schemas';

export function scoreRenderer(p: ScoreParams): string {
  const accent = p.color ?? '#6366f1';
  const palette = resolvePalette(p.theme);
  const width = 104;
  const height = 104;
  const center = width / 2;
  const radius = 38;
  const strokeWidth = 7;
  const circumference = 2 * Math.PI * radius;
  const pct = percentage(p.value, p.max);
  const dash = circumference * pct;
  const gap = circumference - dash;

  const defs = premiumDefs(p.theme, accent, 'score');
  const content = [
    premiumPanel(width, height, 18, p.theme, accent, 'score'),
    `<circle cx="${center}" cy="${center}" r="${radius}" fill="none" stroke="${hexToRgba(palette.fg, p.theme === 'dark' ? 0.12 : 0.1)}" stroke-width="${strokeWidth}"/>`,
    `<circle cx="${center}" cy="${center}" r="${radius}" fill="none" stroke="url(#score-accent)" stroke-width="${strokeWidth}" stroke-dasharray="${dash.toFixed(2)} ${gap.toFixed(2)}" stroke-linecap="round" transform="rotate(-90 ${center} ${center})"/>`,
    `<circle cx="${center}" cy="${center}" r="${radius - 11}" fill="${hexToRgba(palette.bg, 0.42)}" stroke="${hexToRgba(accent, 0.16)}"/>`,
    monoText(String(p.value), center, center - 5, palette.fg, 21, 'bold', 'middle'),
    text(p.label, center, center + 17, palette.muted, 9, 'normal', 'middle'),
  ].join('');

  return svgRoot(width, height, content, defs);
}

export const GET = createBadgeHandler(scoreSchema, scoreRenderer);
