import {createBadgeHandler} from '@/modules/badge/server/badge-handler.server';
import {
  clipPath,
  estimateTextWidth,
  getContrastColor,
  hexToRgba,
  premiumDefs,
  premiumPanel,
  rect,
  svgRoot,
  text,
} from '@/modules/badge/server/badge-render.server';
import {
  labelSchema,
  type LabelParams,
} from '@/modules/badge/shared/badge-schemas';

export function labelRenderer(p: LabelParams): string {
  const accent = p.color ?? '#6366f1';
  const labelColor = p.labelColor ?? '#555555';
  const isPill = p.style === 'pill';
  const height = 26;
  const inset = 4;
  const fontSize = 11;
  const radius = isPill ? 13 : 7;
  const innerRadius = isPill ? 9 : 4;

  const labelWidth = estimateTextWidth(p.label, fontSize) + 22;
  const messageWidth = estimateTextWidth(p.message, fontSize) + 24;
  const width = labelWidth + messageWidth + inset * 2;

  const defs = [
    premiumDefs(p.theme, accent, 'badge'),
    clipPath('segments', width - inset * 2, height - inset * 2, innerRadius),
  ].join('');

  const content = [
    premiumPanel(width, height, radius, p.theme, accent, 'badge'),
    `<g transform="translate(${inset},${inset})" clip-path="url(#segments)">`,
    rect(0, 0, labelWidth, height - inset * 2, labelColor, 0),
    rect(
      labelWidth,
      0,
      messageWidth,
      height - inset * 2,
      'url(#badge-accent)',
      0,
    ),
    `<path d="M0 1H${labelWidth + messageWidth}" stroke="url(#badge-shine)" stroke-width="1" opacity="0.64"/>`,
    '</g>',
    `<line x1="${inset + labelWidth}" y1="${inset + 2}" x2="${inset + labelWidth}" y2="${height - inset - 2}" stroke="${hexToRgba('#ffffff', 0.2)}"/>`,
    text(
      p.label,
      inset + 11,
      height / 2,
      getContrastColor(labelColor),
      fontSize,
      'normal',
    ),
    text(
      p.message,
      inset + labelWidth + 12,
      height / 2,
      getContrastColor(accent),
      fontSize,
      'bold',
    ),
  ].join('');

  return svgRoot(width, height, content, defs);
}

export const GET = createBadgeHandler(labelSchema, labelRenderer);
