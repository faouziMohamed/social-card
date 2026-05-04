import {
  decodeHtml,
  getLinkHref,
  getLinkHrefByRel,
  getMetaContent,
  getMetaName,
  getMetaProperty,
  getTagContent,
  stripHtml,
} from '@/modules/seo/server/seo-inspector-html-parser.server';
import type {
  SeoInspectorApiResponse,
  SeoInspectorFinding,
  SeoInspectorResult,
} from '@/modules/seo/server/seo-inspector.types';
import {z} from 'zod';

export {
  decodeHtml,
  getLinkHref,
  getLinkHrefByRel,
  getMetaContent,
  getMetaName,
  getMetaProperty,
  getTagContent,
  stripHtml,
} from '@/modules/seo/server/seo-inspector-html-parser.server';
export {
  type SeoInspectorApiResponse,
  type SeoInspectorFinding,
  type SeoInspectorResult,
} from '@/modules/seo/server/seo-inspector.types';

export const seoInspectRequestSchema = z.object({
  url: z.string().url(),
});

export async function inspectSeo(url: string): Promise<SeoInspectorResult> {
  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), 10_000);

  let response: Response;
  try {
    response = await fetch(url, {
      headers: {
        'user-agent': 'OG-Graph-SEO-Inspector/1.0',
        accept: 'text/html,application/xhtml+xml',
      },
      redirect: 'follow',
      signal: controller.signal,
      cache: 'no-store',
    });
  } finally {
    clearTimeout(timeout);
  }

  const html = await response.text();
  const title = decodeHtml(getTagContent(html, 'title'));
  const metaDescription = getMetaContent(html, 'description');
  const canonical = getLinkHref(html, 'canonical');
  const robots = getMetaContent(html, 'robots');
  const og = {
    title: getMetaProperty(html, 'og:title'),
    description: getMetaProperty(html, 'og:description'),
    image: getMetaProperty(html, 'og:image'),
    url: getMetaProperty(html, 'og:url'),
    type: getMetaProperty(html, 'og:type'),
  };
  const twitter = {
    card: getMetaName(html, 'twitter:card'),
    title: getMetaName(html, 'twitter:title'),
    description: getMetaName(html, 'twitter:description'),
    image: getMetaName(html, 'twitter:image'),
    site: getMetaName(html, 'twitter:site'),
  };
  const icons = {
    favicon: getLinkHrefByRel(html, ['icon', 'shortcut icon']),
    appleTouchIcon: getLinkHrefByRel(html, ['apple-touch-icon']),
    manifest: getLinkHrefByRel(html, ['manifest']),
  };
  const h1Matches = [...html.matchAll(/<h1\b[^>]*>([\S\s]*?)<\/h1>/gi)].map(m =>
    stripHtml(m[1]).trim(),
  );
  const imageMatches = [...html.matchAll(/<img\b[^>]*>/gi)];
  const missingAlt = imageMatches.filter(
    tag => !/\salt\s*=/i.test(tag[0]),
  ).length;
  const jsonLdScripts = [
    ...html.matchAll(
      /<script\b[^>]*type\s*=\s*["']application\/ld\+json["'][^>]*>([\S\s]*?)<\/script>/gi,
    ),
  ];
  const jsonLdTypes: string[] = [];
  let invalidJsonLd = 0;
  for (const script of jsonLdScripts) {
    try {
      const parsed = JSON.parse(script[1]) as Record<string, unknown>;
      const typeValue = parsed['@type'];
      if (typeof typeValue === 'string') jsonLdTypes.push(typeValue);
    } catch {
      invalidJsonLd += 1;
    }
  }

  const result: SeoInspectorResult = {
    url,
    finalUrl: response.url,
    statusCode: response.status,
    title,
    metaDescription,
    canonical,
    robots,
    og,
    twitter,
    icons,
    headings: {
      h1Count: h1Matches.length,
      h1: h1Matches,
    },
    images: {
      total: imageMatches.length,
      missingAlt,
    },
    jsonLd: {
      count: jsonLdScripts.length,
      invalidCount: invalidJsonLd,
      types: jsonLdTypes,
    },
    findings: [],
  };

  result.findings = buildFindings(result);
  return result;
}

export function toSeoInspectorApiResponse(
  result: SeoInspectorResult,
): SeoInspectorApiResponse {
  const grouped = {
    error: result.findings.filter(finding => finding.severity === 'error'),
    warning: result.findings.filter(finding => finding.severity === 'warning'),
    info: result.findings.filter(finding => finding.severity === 'info'),
  };
  const penalty = grouped.error.length * 20 + grouped.warning.length * 8;
  const score = Math.max(0, 100 - penalty);

  return {
    success: true,
    inspectedAt: new Date().toISOString(),
    summary: {
      score,
      totalFindings: result.findings.length,
      errors: grouped.error.length,
      warnings: grouped.warning.length,
      infos: grouped.info.length,
    },
    findingsBySeverity: grouped,
    data: result,
  };
}

function buildFindings(result: SeoInspectorResult): SeoInspectorFinding[] {
  const findings: SeoInspectorFinding[] = [];
  if (!result.title) {
    findings.push({
      id: 'missing-title',
      severity: 'error',
      title: 'Missing <title>',
      detail: 'No page title found.',
      recommendation: 'Add a unique, descriptive title tag (50-60 chars).',
    });
  } else if (result.title.length < 20 || result.title.length > 65) {
    findings.push({
      id: 'title-length',
      severity: 'warning',
      title: 'Title length is suboptimal',
      detail: `Current length is ${result.title.length} chars.`,
      recommendation: 'Keep title between 50 and 60 characters.',
    });
  }
  if (!result.metaDescription) {
    findings.push({
      id: 'missing-description',
      severity: 'error',
      title: 'Missing meta description',
      detail: 'No meta description tag found.',
      recommendation: 'Add a concise meta description (140-160 chars).',
    });
  }
  if (!result.og.image) {
    findings.push({
      id: 'missing-og-image',
      severity: 'warning',
      title: 'Missing og:image',
      detail: 'Open Graph image is missing.',
      recommendation: 'Set og:image to a 1200x630 image URL.',
    });
  }
  if (!result.twitter.card) {
    findings.push({
      id: 'missing-twitter-card',
      severity: 'warning',
      title: 'Missing twitter:card',
      detail: 'Twitter Card type is not declared.',
      recommendation: 'Add twitter:card=summary_large_image.',
    });
  }
  if (result.headings.h1Count !== 1) {
    findings.push({
      id: 'h1-count',
      severity: 'warning',
      title: 'H1 structure issue',
      detail: `Found ${result.headings.h1Count} <h1> elements.`,
      recommendation: 'Use exactly one clear H1 per page.',
    });
  }
  if (result.images.total > 0 && result.images.missingAlt > 0) {
    findings.push({
      id: 'missing-alt',
      severity: 'warning',
      title: 'Images missing alt text',
      detail: `${result.images.missingAlt}/${result.images.total} images miss alt.`,
      recommendation: 'Add meaningful alt text to content images.',
    });
  }
  if (!result.icons.favicon) {
    findings.push({
      id: 'missing-favicon',
      severity: 'info',
      title: 'Missing favicon link',
      detail: 'No favicon link relation found.',
      recommendation: 'Add <link rel="icon" ...> in head.',
    });
  }
  if (!result.canonical) {
    findings.push({
      id: 'missing-canonical',
      severity: 'warning',
      title: 'Missing canonical URL',
      detail: 'No canonical link tag found.',
      recommendation: 'Add <link rel="canonical" href="...">.',
    });
  }
  return findings;
}
