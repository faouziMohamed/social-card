// SVG element builders and helpers for badge rendering.

/** Wrap arbitrary SVG content in a root <svg> element. */
export function svgRoot(
  width: number,
  height: number,
  content: string,
  defs = '',
): string {
  return [
    `<svg xmlns="http://www.w3.org/2000/svg" width="${width}" height="${height}" viewBox="0 0 ${width} ${height}" role="img">`,
    defs ? `<defs>${defs}</defs>` : '',
    content,
    '</svg>',
  ]
    .filter(Boolean)
    .join('\n');
}

/** Rounded rectangle. */
export function rect(
  x: number,
  y: number,
  w: number,
  h: number,
  fill: string,
  rx = 4,
  attrs = '',
): string {
  const extra = attrs ? ` ${attrs}` : '';
  return `<rect x="${x}" y="${y}" width="${w}" height="${h}" rx="${rx}" fill="${fill}"${extra}/>`;
}

/** Full-width clip path for pill/flat badges. */
export function clipPath(id: string, w: number, h: number, rx = 4): string {
  return `<clipPath id="${id}"><rect width="${w}" height="${h}" rx="${rx}"/></clipPath>`;
}

/** SVG text element. */
export function text(
  content: string,
  x: number,
  y: number,
  fill: string,
  fontSize = 11,
  fontWeight: 'normal' | 'bold' = 'normal',
  anchor: 'start' | 'middle' | 'end' = 'start',
  fontFamily = 'system-ui,-apple-system,sans-serif',
): string {
  return `<text x="${x}" y="${y}" font-family="${fontFamily}" font-size="${fontSize}" font-weight="${fontWeight}" fill="${fill}" text-anchor="${anchor}" dominant-baseline="central">${escapeXml(content)}</text>`;
}

/** Monospace text (for values). */
export function monoText(
  content: string,
  x: number,
  y: number,
  fill: string,
  fontSize = 11,
  fontWeight: 'normal' | 'bold' = 'bold',
  anchor: 'start' | 'middle' | 'end' = 'start',
): string {
  return text(
    content,
    x,
    y,
    fill,
    fontSize,
    fontWeight,
    anchor,
    "'JetBrains Mono','Cascadia Code','Fira Code',monospace",
  );
}

/** Dot / circle. */
export function circle(
  cx: number,
  cy: number,
  r: number,
  fill: string,
): string {
  return `<circle cx="${cx}" cy="${cy}" r="${r}" fill="${fill}"/>`;
}

/** Horizontal line. */
export function line(
  x1: number,
  y1: number,
  x2: number,
  y2: number,
  stroke: string,
  strokeWidth = 1,
): string {
  return `<line x1="${x1}" y1="${y1}" x2="${x2}" y2="${y2}" stroke="${stroke}" stroke-width="${strokeWidth}"/>`;
}

// ─── Approximate text width ───────────────────────────────────────────

/** Rough character-width estimate for system-ui at a given font size. */
export function estimateTextWidth(text: string, fontSize: number): number {
  // Average char width ≈ 0.6× font-size for system-ui, +padding
  return Math.ceil(text.length * fontSize * 0.62);
}

// ─── XML safety ───────────────────────────────────────────────────────

export function escapeXml(s: string): string {
  return s
    .replaceAll('&', '&amp;')
    .replaceAll('<', '&lt;')
    .replaceAll('>', '&gt;')
    .replaceAll('"', '&quot;')
    .replaceAll("'", '&apos;');
}
