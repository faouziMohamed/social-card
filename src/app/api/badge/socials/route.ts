import {createBadgeHandler} from '@/modules/badge/server/badge-handler.server';
import {
  PLATFORM_META,
  estimateTextWidth,
  getContrastColor,
  hexToRgba,
  premiumDefs,
  premiumPanel,
  rect,
  resolvePalette,
  svgRoot,
  text,
} from '@/modules/badge/server/badge-render.server';
import {
  socialsSchema,
  type SocialsParams,
} from '@/modules/badge/shared/badge-schemas';

export function socialsRenderer(p: SocialsParams): string {
  const meta = PLATFORM_META[p.platform];
  const accent = p.color ?? meta?.color ?? '#6366f1';
  const palette = resolvePalette(p.theme);
  const platformLabel = meta?.label ?? p.platform;
  const handle = `@${p.handle}`;
  const followers = p.followers ?? '';
  const height = 34;
  const pad = 10;
  const iconSize = 15;
  const fontSize = 11;
  const iconGap = 7;
  const platformWidth = estimateTextWidth(platformLabel, fontSize);
  const handleWidth = estimateTextWidth(handle, fontSize);
  const followersWidth = followers
    ? estimateTextWidth(followers, fontSize) + 18
    : 0;
  const leftWidth = pad + iconSize + iconGap + platformWidth + pad;
  const bodyWidth = pad + handleWidth + followersWidth + pad;
  const width = leftWidth + bodyWidth + 2;
  const iconPath = meta?.iconPath ?? '';
  const iconScale = iconSize / 24;

  const defs = [
    premiumDefs(p.theme, accent, 'social'),
    `<clipPath id="social-clip"><rect x="3" y="3" width="${width - 6}" height="${height - 6}" rx="14"/></clipPath>`,
  ].join('');

  const content = [
    premiumPanel(width, height, 17, p.theme, accent, 'social'),
    `<g clip-path="url(#social-clip)">`,
    rect(3, 3, leftWidth, height - 6, 'url(#social-accent)', 0),
    rect(
      3 + leftWidth,
      3,
      bodyWidth,
      height - 6,
      hexToRgba(palette.bg, p.theme === 'dark' ? 0.28 : 0.18),
      0,
    ),
    '</g>',
    iconPath
      ? `<g transform="translate(${pad + 1},${(height - iconSize) / 2}) scale(${iconScale})"><path d="${iconPath}" fill="${getContrastColor(accent)}"/></g>`
      : '',
    text(
      platformLabel,
      pad + iconSize + iconGap + 1,
      height / 2,
      getContrastColor(accent),
      fontSize,
      'bold',
    ),
    `<line x1="${leftWidth + 3}" y1="8" x2="${leftWidth + 3}" y2="${height - 8}" stroke="${hexToRgba('#ffffff', 0.22)}"/>`,
    text(handle, leftWidth + pad + 3, height / 2, palette.fg, fontSize, 'bold'),
    followers
      ? [
          `<line x1="${leftWidth + pad + handleWidth + 12}" y1="10" x2="${leftWidth + pad + handleWidth + 12}" y2="${height - 10}" stroke="${hexToRgba(palette.fg, 0.12)}"/>`,
          text(
            followers,
            leftWidth + pad + handleWidth + 20,
            height / 2,
            hexToRgba(accent, 0.96),
            fontSize,
            'bold',
          ),
        ].join('')
      : '',
  ].join('');

  return svgRoot(width, height, content, defs);
}

export const GET = createBadgeHandler(socialsSchema, socialsRenderer);
