export function getTagContent(html: string, tag: string): string {
  const match = html.match(
    new RegExp(String.raw`<${tag}[^>]*>([\s\S]*?)<\/${tag}>`, 'i'),
  );
  return match?.[1]?.trim() ?? '';
}

export function getMetaContent(html: string, name: string): string {
  return getMetaByAttr(html, 'name', name);
}

export function getMetaName(html: string, name: string): string {
  return getMetaByAttr(html, 'name', name);
}

export function getMetaProperty(html: string, prop: string): string {
  return getMetaByAttr(html, 'property', prop);
}

function getMetaByAttr(
  html: string,
  attr: 'name' | 'property',
  value: string,
): string {
  const regex = new RegExp(
    String.raw`<meta\b[^>]*${attr}\s*=\s*["']${escapeRegExp(value)}["'][^>]*>`,
    'i',
  );
  const tag = html.match(regex)?.[0] ?? '';
  return getAttr(tag, 'content');
}

export function getLinkHref(html: string, relValue: string): string {
  return getLinkHrefByRel(html, [relValue]);
}

export function getLinkHrefByRel(html: string, relValues: string[]): string {
  for (const relValue of relValues) {
    const regex = new RegExp(
      String.raw`<link\b[^>]*rel\s*=\s*["'][^"']*${escapeRegExp(relValue)}[^"']*["'][^>]*>`,
      'i',
    );
    const tag = html.match(regex)?.[0] ?? '';
    const href = getAttr(tag, 'href');
    if (href) return href;
  }
  return '';
}

function getAttr(tag: string, attr: string): string {
  const match = tag.match(
    new RegExp(String.raw`${attr}\s*=\s*["']([^"']+)["']`, 'i'),
  );
  return match?.[1]?.trim() ?? '';
}

export function stripHtml(input: string): string {
  return input.replaceAll(/<[^>]*>/g, ' ');
}

export function decodeHtml(input: string): string {
  return input
    .replaceAll('&amp;', '&')
    .replaceAll('&lt;', '<')
    .replaceAll('&gt;', '>')
    .replaceAll('&quot;', '"')
    .replaceAll('&#39;', "'");
}

function escapeRegExp(input: string): string {
  return input.replaceAll(/[$()*+.?[\\\]^{|}]/g, String.raw`\$&`);
}
