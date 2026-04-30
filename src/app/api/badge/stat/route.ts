import { createBadgeHandler } from '@/modules/badge/server/badge-handler.server';
import {
  circle, estimateTextWidth, getContrastColor, hexToRgba,
  icon, rect, svgRoot, text, monoText,
} from '@/modules/badge/server/badge-render.server';
import { statSchema, type StatParams } from '@/modules/badge/shared/badge-schemas';

export function statRenderer(p: StatParams): string {
  const accent  = p.color ?? '#6366f1';
  const fg      = getContrastColor(accent);
  const hasIcon = Boolean(p.icon);
  const iconSize = 14;
  const iconPad  = hasIcon ? iconSize + 8 : 0;

  const valueTxt = p.unit ? `${p.value}${p.unit}` : p.value;

  const minW   = 120;
  const labelW = Math.max(estimateTextWidth(p.label, 10), estimateTextWidth(valueTxt, 15)) + 24 + iconPad;
  const w      = Math.max(minW, labelW);
  const h      = 48;

  const defs = `<linearGradient id="bg" x1="0" y1="0" x2="1" y2="1">
    <stop offset="0%" stop-color="${accent}" stop-opacity="1"/>
    <stop offset="100%" stop-color="${accent}" stop-opacity="0.75"/>
  </linearGradient>`;

  const content = [
    rect(0, 0, w, h, 'url(#bg)', 6),
    // subtle bottom highlight
    rect(0, h - 3, w, 3, hexToRgba('#ffffff', 0.08), 0),
    hasIcon ? icon(p.icon!, 12 + iconSize / 2, h / 2, iconSize, 'none', hexToRgba(fg, 0.7)) : '',
    monoText(valueTxt, w / 2 + iconPad / 2, h / 2 - 6, fg, 17, 'bold', 'middle'),
    text(p.label, w / 2 + iconPad / 2, h / 2 + 10, hexToRgba(fg, 0.75), 10, 'normal', 'middle'),
  ].join('');

  return svgRoot(w, h, content, defs);
}

export const GET = createBadgeHandler(statSchema, statRenderer);
