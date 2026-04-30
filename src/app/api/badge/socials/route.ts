import { createBadgeHandler } from '@/modules/badge/server/badge-handler.server';
import {
  estimateTextWidth, getContrastColor, hexToRgba,
  rect, svgRoot, text, PLATFORM_META,
} from '@/modules/badge/server/badge-render.server';
import { socialsSchema, type SocialsParams } from '@/modules/badge/shared/badge-schemas';

export function socialsRenderer(p: SocialsParams): string {
  const meta    = PLATFORM_META[p.platform];
  const accent  = p.color ?? meta?.color ?? '#6366f1';
  const fg      = getContrastColor(accent);

  const platformLabel = meta?.label ?? p.platform;
  const handleTxt     = `@${p.handle}`;
  const followerTxt   = p.followers ?? '';

  const h   = 28;
  const pad = 10;
  const fs  = 11;
  const iconSize = 16;

  // icon (16px) + gap + platform + separator + handle + optional followers
  const iconGap   = 6;
  const sepW      = 1;
  const sepPad    = 8;
  const platformW = estimateTextWidth(platformLabel, fs);
  const handleW   = estimateTextWidth(handleTxt, fs);
  const followW   = followerTxt ? estimateTextWidth(followerTxt, fs) + sepPad * 2 + sepW : 0;

  const leftW = pad + iconSize + iconGap + platformW + pad;
  const midW  = pad + handleW + pad;
  const w     = leftW + sepW + midW + followW;

  const iconPath = meta?.iconPath ?? '';

  const defs = `
    <clipPath id="clip"><rect width="${w}" height="${h}" rx="14"/></clipPath>`;

  const iconScale = iconSize / 24;

  const content = [
    `<g clip-path="url(#clip)">`,
    rect(0,     0, leftW, h, accent, 0),
    rect(leftW, 0, midW + followW + sepW, h, '#1a1a1a', 0),
    `</g>`,
    // Platform icon (inline path)
    iconPath
      ? `<g transform="translate(${pad},${(h - iconSize) / 2}) scale(${iconScale})"><path d="${iconPath}" fill="${fg}"/></g>`
      : '',
    text(platformLabel, pad + iconSize + iconGap, h / 2, fg, fs, 'bold'),
    // separator
    `<line x1="${leftW}" y1="4" x2="${leftW}" y2="${h - 4}" stroke="${hexToRgba('#ffffff', 0.15)}" stroke-width="1"/>`,
    text(handleTxt, leftW + pad, h / 2, '#e4e4e7', fs),
    followerTxt
      ? [
          `<line x1="${leftW + midW}" y1="4" x2="${leftW + midW}" y2="${h - 4}" stroke="${hexToRgba('#ffffff', 0.1)}" stroke-width="1"/>`,
          text(followerTxt, leftW + midW + sepPad, h / 2, hexToRgba(accent, 0.9), fs, 'bold'),
        ].join('')
      : '',
  ].join('');

  return svgRoot(w, h, content, defs);
}

export const GET = createBadgeHandler(socialsSchema, socialsRenderer);
