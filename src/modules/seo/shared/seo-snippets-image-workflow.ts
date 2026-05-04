import {OG_ROUTES} from '@/modules/og/shared/og-routes';
import type {SeoTemplateName} from './seo-schemas';

export const IMAGE_SEO_TEMPLATES = [
  'favicon',
  'apple-touch-icon',
  'manifest-icon',
  'twitter-card',
] as const satisfies readonly SeoTemplateName[];

export function buildImageWorkflowSnippet(
  seoUrl: string,
  params: Record<string, string>,
): string {
  const urls = buildImageWorkflowUrls(seoUrl, params);
  return [
    '<!-- Image SEO workflow output -->',
    `<meta property="og:image" content="${urls.og}" />`,
    `<meta name="twitter:image" content="${urls.twitterCard}" />`,
    `<link rel="icon" type="image/png" href="${urls.favicon}" />`,
    `<link rel="apple-touch-icon" href="${urls.appleTouchIcon}" />`,
    '',
    '"icons": [',
    `  { "src": "${urls.manifest192}", "sizes": "192x192", "type": "image/png" },`,
    `  { "src": "${urls.manifest512}", "sizes": "512x512", "type": "image/png" }`,
    ']',
  ].join('\n');
}

export function buildImageWorkflowUrls(
  seoUrl: string,
  params: Record<string, string>,
): {
  og: string;
  twitterCard: string;
  favicon: string;
  appleTouchIcon: string;
  manifest192: string;
  manifest512: string;
} {
  const sourceImage = params.sourceImage || '';
  const base = getBaseFromUrl(seoUrl);
  const title = params.title || 'Open Graph Generator';
  const description =
    params.description || 'Generate SEO image variants from one source image.';
  const siteName = params.siteName || 'OG Graph';
  const accentColor = params.accentColor || '#6366f1';
  const theme = params.theme || 'dark';
  const bgStyle = params.bgStyle || 'gradient+grid';

  const favicon = buildUrl(base, '/api/seo/favicon', {
    logo: sourceImage,
    initial: siteName.slice(0, 2).toUpperCase(),
  });
  const appleTouchIcon = buildUrl(base, '/api/seo/apple-touch-icon', {
    logo: sourceImage,
    initial: siteName.slice(0, 2).toUpperCase(),
  });
  const manifest192 = buildUrl(base, '/api/seo/manifest-icon', {
    logo: sourceImage,
    size: '192',
  });
  const manifest512 = buildUrl(base, '/api/seo/manifest-icon', {
    logo: sourceImage,
    size: '512',
  });
  const twitterCard = buildUrl(base, '/api/seo/twitter-card', {
    logo: sourceImage,
    title,
    description,
    siteName,
    accentColor,
    theme,
    bgStyle,
  });
  const og = buildUrl(base, OG_ROUTES.general, {
    logo: sourceImage,
    title,
    description,
    siteName,
    accentColor,
    theme,
    bgStyle,
  });

  return {
    og,
    twitterCard,
    favicon,
    appleTouchIcon,
    manifest192,
    manifest512,
  };
}

export function buildSeoImageSnippet(
  template: Extract<(typeof IMAGE_SEO_TEMPLATES)[number], SeoTemplateName>,
  url: string,
): string {
  if (template === 'favicon') {
    return `<link rel="icon" type="image/png" href="${url}" />`;
  }
  if (template === 'apple-touch-icon') {
    return `<link rel="apple-touch-icon" href="${url}" />`;
  }
  if (template === 'manifest-icon') {
    return `{ "src": "${url}", "sizes": "192x192", "type": "image/png" }`;
  }
  return `<meta property="og:image" content="${url}" />\n<meta name="twitter:image" content="${url}" />`;
}

function buildUrl(
  base: string,
  path: string,
  params: Record<string, string>,
): string {
  const entries = Object.entries(params).filter(([, value]) => value !== '');
  const query = new URLSearchParams(entries);
  return `${base}${path}${query.size > 0 ? `?${query.toString()}` : ''}`;
}

function getBaseFromUrl(url: string): string {
  if (url) {
    try {
      return new URL(url).origin;
    } catch {
      // fall through
    }
  }
  return 'http://localhost:3000';
}
