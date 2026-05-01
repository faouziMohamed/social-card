import {createBadgeHandler} from '@/modules/badge/server/badge-handler.server';
import {
  circle,
  estimateTextWidth,
  hexToRgba,
  icon,
  monoText,
  premiumDefs,
  premiumPanel,
  resolvePalette,
  svgRoot,
  text,
} from '@/modules/badge/server/badge-render.server';
import {
  statSchema,
  type StatParams,
} from '@/modules/badge/shared/badge-schemas';

export function statRenderer(p: StatParams): string {
  const accent = p.color ?? '#6366f1';
  const palette = resolvePalette(p.theme);
  const value = p.unit ? `${p.value}${p.unit}` : p.value;
  const hasIcon = Boolean(p.icon);
  const width = Math.max(
    150,
    estimateTextWidth(value, 18) + estimateTextWidth(p.label, 10) + 58,
  );
  const height = 58;
  const orbX = 25;
  const orbY = height / 2;

  const defs = premiumDefs(p.theme, accent, 'stat');
  const content = [
    premiumPanel(width, height, 12, p.theme, accent, 'stat'),
    circle(orbX, orbY, 17, hexToRgba(accent, 0.18)),
    circle(orbX, orbY, 13, 'url(#stat-accent)'),
    hasIcon
      ? icon(p.icon!, orbX, orbY, 14, 'none', '#ffffff')
      : `<path d="M${orbX} ${orbY - 7}l6 7-6 7-6-7z" fill="#ffffff" opacity="0.92"/>`,
    monoText(value, 48, 24, palette.fg, 18, 'bold'),
    text(p.label, 48, 41, palette.muted, 10, 'normal'),
    `<path d="M${width - 54} 11C${width - 31} 9 ${width - 18} 22 ${width - 16} 47" stroke="${hexToRgba(accent, 0.34)}" stroke-width="1.2" fill="none" stroke-linecap="round"/>`,
  ].join('');

  return svgRoot(width, height, content, defs);
}

export const GET = createBadgeHandler(statSchema, statRenderer);
