import { createBadgeHandler } from '@/modules/badge/server/badge-handler.server';
import {
  estimateTextWidth, getContrastColor, hexToRgba,
  rect, svgRoot, text,
} from '@/modules/badge/server/badge-render.server';
import { techStackSchema, type TechStackParams } from '@/modules/badge/shared/badge-schemas';

export function techStackRenderer(p: TechStackParams): string {
  const accent = p.color ?? '#6366f1';
  const fg     = getContrastColor(accent);
  const tags   = p.stack.split(',').map((s) => s.trim()).filter(Boolean).slice(0, 8);
  const isRow  = p.style === 'row';

  const fs     = 11;
  const tagH   = 20;
  const tagRx  = isRow ? 2 : 10;
  const tagPad = isRow ? 6 : 8;
  const gap    = 4;
  const padV   = 6;
  const padH   = 4;

  // Measure each tag
  const widths = tags.map((t) => estimateTextWidth(t, fs) + tagPad * 2);

  if (isRow) {
    // Single row, all tags side by side
    const totalTagsW = widths.reduce((a, b) => a + b, 0) + gap * (tags.length - 1);
    const w = totalTagsW + padH * 2;
    const h = tagH + padV * 2;

    let x = padH;
    const tagEls = tags.map((tag, i) => {
      const tw = widths[i];
      const el = [
        rect(x, padV, tw, tagH, hexToRgba(accent, 0.15), tagRx),
        text(tag, x + tagPad, padV + tagH / 2, hexToRgba(accent, 0.95), fs),
      ].join('');
      x += tw + gap;
      return el;
    });

    const content = [
      rect(0, 0, w, h, '#1a1a1a', 4),
      rect(0, 0, w, h, 'none', 4, `stroke="${hexToRgba(accent, 0.2)}" stroke-width="1" fill="none"`),
      ...tagEls,
    ].join('');
    return svgRoot(w, h, content);
  }

  // Pill / wrap layout — fixed max width, wrap onto multiple rows
  const maxW   = 320;
  const usableW = maxW - padH * 2;
  const rows: { tag: string; w: number; x: number; row: number }[] = [];
  let rowX = 0;
  let rowNum = 0;

  tags.forEach((tag, i) => {
    const tw = widths[i];
    if (rowX > 0 && rowX + tw > usableW) {
      rowX = 0;
      rowNum++;
    }
    rows.push({ tag, w: tw, x: rowX, row: rowNum });
    rowX += tw + gap;
  });

  const numRows = rowNum + 1;
  const h = numRows * (tagH + gap) - gap + padV * 2;
  const w = maxW;

  const tagEls = rows.map(({ tag, w: tw, x, row }) => [
    rect(padH + x, padV + row * (tagH + gap), tw, tagH, accent, tagRx),
    text(tag, padH + x + tagPad, padV + row * (tagH + gap) + tagH / 2, fg, fs, 'bold'),
  ].join(''));

  const content = [
    rect(0, 0, w, h, '#1a1a1a', 6),
    ...tagEls,
  ].join('');

  return svgRoot(w, h, content);
}

export const GET = createBadgeHandler(techStackSchema, techStackRenderer);
