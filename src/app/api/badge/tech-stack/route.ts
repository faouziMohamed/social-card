import { createBadgeHandler } from '@/modules/badge/server/badge-handler.server';
import {
  estimateTextWidth,
  hexToRgba,
  premiumChip,
  premiumDefs,
  premiumPanel,
  resolvePalette,
  svgRoot,
  text,
} from '@/modules/badge/server/badge-render.server';
import { techStackSchema, type TechStackParams } from '@/modules/badge/shared/badge-schemas';

export function techStackRenderer(p: TechStackParams): string {
  const accent = p.color ?? '#6366f1';
  const palette = resolvePalette(p.theme);
  const tags = p.stack
    .split(',')
    .map((s) => s.trim())
    .filter(Boolean)
    .slice(0, 8);
  const safeTags = tags.length > 0 ? tags : ['Stack'];
  const isRow = p.style === 'row';
  const fontSize = 11;
  const tagHeight = 22;
  const tagPadding = isRow ? 9 : 10;
  const gap = 6;
  const outerPad = 7;
  const widths = safeTags.map((tag) => estimateTextWidth(tag, fontSize) + tagPadding * 2);

  if (isRow) {
    const tagsWidth = widths.reduce((sum, current) => sum + current, 0) + gap * Math.max(safeTags.length - 1, 0);
    const width = tagsWidth + outerPad * 2;
    const height = 36;
    const defs = premiumDefs(p.theme, accent, 'stack');
    let cursorX = outerPad;

    const tagElements = safeTags.map((tag, index) => {
      const tagWidth = widths[index];
      const x = cursorX;
      cursorX += tagWidth + gap;
      return [
        premiumChip(x, outerPad, tagWidth, tagHeight, 11, accent, 0.14),
        text(tag, x + tagPadding, height / 2, palette.fg, fontSize, 'bold'),
      ].join('');
    });

    return svgRoot(width, height, [
      premiumPanel(width, height, 12, p.theme, accent, 'stack'),
      ...tagElements,
    ].join(''), defs);
  }

  const maxWidth = 340;
  const usableWidth = maxWidth - outerPad * 2;
  const rows: { tag: string; width: number; x: number; row: number }[] = [];
  let rowX = 0;
  let rowIndex = 0;

  safeTags.forEach((tag, index) => {
    const tagWidth = widths[index];
    if (rowX > 0 && rowX + tagWidth > usableWidth) {
      rowX = 0;
      rowIndex += 1;
    }

    rows.push({ tag, width: tagWidth, x: rowX, row: rowIndex });
    rowX += tagWidth + gap;
  });

  const rowCount = rowIndex + 1;
  const height = rowCount * (tagHeight + gap) - gap + outerPad * 2;
  const defs = premiumDefs(p.theme, accent, 'stack');
  const tagElements = rows.map(({ tag, width, x, row }, index) => {
    const y = outerPad + row * (tagHeight + gap);
    const opacity = 0.15 + (index % 3) * 0.04;
    return [
      premiumChip(outerPad + x, y, width, tagHeight, 11, accent, opacity),
      text(tag, outerPad + x + tagPadding, y + tagHeight / 2, hexToRgba(accent, p.theme === 'dark' ? 0.96 : 0.9), fontSize, 'bold'),
    ].join('');
  });

  return svgRoot(maxWidth, height, [
    premiumPanel(maxWidth, height, 12, p.theme, accent, 'stack'),
    ...tagElements,
  ].join(''), defs);
}

export const GET = createBadgeHandler(techStackSchema, techStackRenderer);
