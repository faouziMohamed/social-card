import { createBadgeHandler } from '@/modules/badge/server/badge-handler.server';
import {
  getContrastColor, hexToRgba, svgRoot, text, monoText,
} from '@/modules/badge/server/badge-render.server';
import { scoreSchema, type ScoreParams } from '@/modules/badge/shared/badge-schemas';

export function scoreRenderer(p: ScoreParams): string {
  const accent = p.color ?? '#6366f1';
  const w = 90;
  const h = 90;
  const cx = w / 2;
  const cy = h / 2;
  const r  = 34;
  const strokeW = 6;
  const circumference = 2 * Math.PI * r;
  const pct  = Math.min(1, p.value / p.max);
  const dash = circumference * pct;
  const gap  = circumference - dash;

  const bg    = '#1a1a1a';
  const track = '#333333';

  const defs = `
    <linearGradient id="arc" x1="0" y1="0" x2="1" y2="1">
      <stop offset="0%" stop-color="${accent}"/>
      <stop offset="100%" stop-color="${hexToRgba(accent, 0.6)}"/>
    </linearGradient>`;

  const content = [
    `<rect width="${w}" height="${h}" rx="8" fill="${bg}" stroke="#333" stroke-width="1"/>`,
    // track circle
    `<circle cx="${cx}" cy="${cy}" r="${r}" fill="none" stroke="${track}" stroke-width="${strokeW}"/>`,
    // arc — starts at 12 o'clock (−90°)
    `<circle cx="${cx}" cy="${cy}" r="${r}" fill="none" stroke="url(#arc)" stroke-width="${strokeW}"`,
    ` stroke-dasharray="${dash.toFixed(2)} ${gap.toFixed(2)}"`,
    ` stroke-linecap="round" transform="rotate(-90 ${cx} ${cy})"/>`,
    monoText(String(p.value), cx, cy - 5, '#ffffff', 18, 'bold', 'middle'),
    text(p.label, cx, cy + 16, hexToRgba('#ffffff', 0.5), 9, 'normal', 'middle'),
  ].join('');

  return svgRoot(w, h, content, defs);
}

export const GET = createBadgeHandler(scoreSchema, scoreRenderer);
