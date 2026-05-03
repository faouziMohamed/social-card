import type {
  Article,
  FAQPage,
  LocalBusiness,
  Organization,
  Product,
  SoftwareApplication,
  Thing,
  WithContext,
} from 'schema-dts';
import type {JsonLdParams, JsonLdType, SeoTemplateName} from './seo-schemas';

export const IMAGE_SEO_TEMPLATES = [
  'favicon',
  'apple-touch-icon',
  'manifest-icon',
  'twitter-card',
] as const satisfies readonly SeoTemplateName[];

export const TEXT_SEO_TEMPLATES = [
  'json-ld',
  'robots-txt',
  'meta-pack',
] as const satisfies readonly SeoTemplateName[];

export function isImageSeoTemplate(template: SeoTemplateName): boolean {
  return IMAGE_SEO_TEMPLATES.includes(
    template as (typeof IMAGE_SEO_TEMPLATES)[number],
  );
}

export function buildSeoSnippet(
  template: SeoTemplateName,
  seoUrl: string,
  params: Record<string, string>,
): string {
  if (template === 'json-ld') return buildJsonLdScript(params);
  if (template === 'robots-txt') return buildRobotsTxt(params);
  if (template === 'meta-pack') return buildMetaPackSnippet(params);
  return buildSeoImageSnippet(template, seoUrl);
}

export function buildJsonLdScript(params: Record<string, string>): string {
  const jsonLdObject = buildJsonLdObject(params);
  const payload = JSON.stringify(jsonLdObject, null, 2);
  return `<script type="application/ld+json">\n${payload}\n</script>`;
}

export function buildJsonLdObject(
  params: Record<string, string>,
): WithContext<Thing> {
  const typed = params as Partial<JsonLdParams>;
  const fromRaw = parseJsonRaw(typed.jsonRaw);
  if (fromRaw) return fromRaw;
  const rawSchemaType = typed.schemaType?.trim() || 'Article';
  const schemaType = toKnownJsonLdType(rawSchemaType);
  const base = {
    '@context': 'https://schema.org',
  } as const;
  const sameAs = [typed.sameAs1, typed.sameAs2, typed.sameAs3].filter(
    (url): url is string => typeof url === 'string' && url.length > 0,
  );

  if (schemaType === 'Product') {
    const obj: WithContext<Product> = {
      ...base,
      '@type': 'Product',
      name: typed.name || 'OG Graph Pro',
      description: typed.description,
      image: typed.image,
      url: typed.url,
      offers: typed.price
        ? {
            '@type': 'Offer',
            price: typed.price,
            priceCurrency: typed.priceCurrency || 'USD',
            availability: 'https://schema.org/InStock',
          }
        : undefined,
    };
    return cleanUndefined(obj) as WithContext<Thing>;
  }

  if (schemaType === 'FAQPage') {
    const faqPairs = readFaqPairs(params);
    const pairs =
      faqPairs.length > 0
        ? faqPairs
        : [
            {
              question: 'What does this tool do?',
              answer:
                'It generates OG images, badges, and SEO assets with sharable URLs.',
            },
            {
              question: 'Can I self-host it?',
              answer: 'Yes, deploy it in minutes on your own stack.',
            },
          ];

    const obj: WithContext<FAQPage> = {
      ...base,
      '@type': 'FAQPage',
      mainEntity: pairs.map(item => ({
        '@type': 'Question',
        name: item.question,
        acceptedAnswer: {
          '@type': 'Answer',
          text: item.answer,
        },
      })),
    };
    return cleanUndefined(obj) as WithContext<Thing>;
  }

  if (schemaType === 'Organization') {
    const obj: WithContext<Organization> = {
      ...base,
      '@type': 'Organization',
      name: typed.name || 'OG Graph',
      url: typed.url,
      logo: typed.image,
      description: typed.description,
      sameAs: sameAs.length > 0 ? sameAs : undefined,
    };
    return cleanUndefined(obj) as WithContext<Thing>;
  }

  if (schemaType === 'LocalBusiness') {
    const obj: WithContext<LocalBusiness> = {
      ...base,
      '@type': 'LocalBusiness',
      name: typed.name || 'OG Graph Studio',
      url: typed.url,
      image: typed.image,
      description: typed.description,
      sameAs: sameAs.length > 0 ? sameAs : undefined,
    };
    return cleanUndefined(obj) as WithContext<Thing>;
  }

  if (schemaType === 'SoftwareApplication') {
    const obj: WithContext<SoftwareApplication> = {
      ...base,
      '@type': 'SoftwareApplication',
      name: typed.name || 'OG Graph',
      applicationCategory: typed.applicationCategory || 'DeveloperApplication',
      operatingSystem: typed.operatingSystem || 'Web',
      offers: typed.price
        ? {
            '@type': 'Offer',
            price: typed.price,
            priceCurrency: typed.priceCurrency || 'USD',
          }
        : {
            '@type': 'Offer',
            price: '0',
            priceCurrency: typed.priceCurrency || 'USD',
          },
      description: typed.description,
      url: typed.url,
    };
    return cleanUndefined(obj) as WithContext<Thing>;
  }

  const obj = schemaType
    ? ({
        ...base,
        '@type': 'Article',
        headline:
          typed.headline || typed.name || 'How to ship social previews fast',
        name: typed.name || typed.headline || 'OG Graph Guide',
        description: typed.description,
        image: typed.image,
        url: typed.url,
        datePublished: typed.datePublished,
        dateModified: typed.dateModified,
        author: typed.authorName
          ? {
              '@type': 'Person',
              name: typed.authorName,
            }
          : undefined,
        publisher: typed.publisherName
          ? {
              '@type': 'Organization',
              name: typed.publisherName,
            }
          : undefined,
      } as WithContext<Article>)
    : ({
        ...base,
        '@type': rawSchemaType,
        name: typed.name || typed.headline || 'OG Graph',
        description: typed.description,
        image: typed.image,
        url: typed.url,
      } as unknown as WithContext<Thing>);
  return cleanUndefined(obj);
}

export function buildRobotsTxt(params: Record<string, string>): string {
  const userAgent = params.userAgent || '*';
  const allow = params.allow || '/';
  const disallow = params.disallow;
  const crawlDelay = params.crawlDelay;
  const sitemap = params.sitemap;
  const aiPolicy = params.aiCrawlerPolicy || 'allow';

  const lines = [
    '# robots.txt generated by OG Graph SEO Builder',
    `User-agent: ${userAgent}`,
    `Allow: ${allow}`,
    ...(disallow ? [`Disallow: ${disallow}`] : []),
    ...(crawlDelay ? [`Crawl-delay: ${crawlDelay}`] : []),
    '',
    '# AI crawlers',
    'User-agent: GPTBot',
    aiPolicy === 'disallow' ? 'Disallow: /' : 'Allow: /',
    'User-agent: Google-Extended',
    aiPolicy === 'disallow' ? 'Disallow: /' : 'Allow: /',
    'User-agent: PerplexityBot',
    aiPolicy === 'disallow' ? 'Disallow: /' : 'Allow: /',
    ...(sitemap ? ['', `Sitemap: ${sitemap}`] : []),
  ];

  return lines.join('\n');
}

export function buildMetaPackSnippet(params: Record<string, string>): string {
  const title = params.title || 'OG Graph';
  const description =
    params.description ||
    'Generate OG images, badges, and SEO assets in one place.';
  const canonical = params.canonical;
  const robots = params.robots || 'index,follow,max-image-preview:large';
  const ogType = params.ogType || 'website';
  const ogImage = params.ogImage;
  const siteName = params.siteName;
  const locale = params.locale || 'en_US';
  const twitterCard = params.twitterCard || 'summary_large_image';
  const twitterSite = params.twitterSite;
  const themeColor = params.themeColor || '#0f0f0f';
  const keywords = params.keywords;

  const lines = [
    '<!-- SEO meta pack generated by OG Graph -->',
    `<title>${escapeHtml(title)}</title>`,
    `<meta name="description" content="${escapeHtml(description)}" />`,
    `<meta name="robots" content="${escapeHtml(robots)}" />`,
    ...(keywords
      ? [`<meta name="keywords" content="${escapeHtml(keywords)}" />`]
      : []),
    ...(canonical ? [`<link rel="canonical" href="${canonical}" />`] : []),
    `<meta property="og:type" content="${escapeHtml(ogType)}" />`,
    `<meta property="og:title" content="${escapeHtml(title)}" />`,
    `<meta property="og:description" content="${escapeHtml(description)}" />`,
    `<meta property="og:locale" content="${escapeHtml(locale)}" />`,
    ...(siteName
      ? [`<meta property="og:site_name" content="${escapeHtml(siteName)}" />`]
      : []),
    ...(canonical ? [`<meta property="og:url" content="${canonical}" />`] : []),
    ...(ogImage ? [`<meta property="og:image" content="${ogImage}" />`] : []),
    `<meta name="twitter:card" content="${escapeHtml(twitterCard)}" />`,
    `<meta name="twitter:title" content="${escapeHtml(title)}" />`,
    `<meta name="twitter:description" content="${escapeHtml(description)}" />`,
    ...(twitterSite
      ? [`<meta name="twitter:site" content="${escapeHtml(twitterSite)}" />`]
      : []),
    ...(ogImage ? [`<meta name="twitter:image" content="${ogImage}" />`] : []),
    `<meta name="theme-color" content="${escapeHtml(themeColor)}" />`,
  ];

  return lines.join('\n');
}

function buildSeoImageSnippet(
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

function cleanUndefined<T extends object>(obj: T): T {
  return stripUndefined(structuredClone(obj)) as T;
}

function toKnownJsonLdType(value?: string): JsonLdType | null {
  if (
    value === 'Article' ||
    value === 'Product' ||
    value === 'FAQPage' ||
    value === 'Organization' ||
    value === 'LocalBusiness' ||
    value === 'SoftwareApplication'
  ) {
    return value;
  }
  return null;
}

function readFaqPairs(params: Record<string, string>) {
  const indices = new Set<number>();
  for (const key of Object.keys(params)) {
    const questionMatch = key.match(/^faqQuestion(\d+)$/);
    if (questionMatch) indices.add(Number(questionMatch[1]));
    const answerMatch = key.match(/^faqAnswer(\d+)$/);
    if (answerMatch) indices.add(Number(answerMatch[1]));
  }

  return [...indices]
    .filter(index => Number.isFinite(index) && index > 0)
    .toSorted((a, b) => a - b)
    .map(index => ({
      question: (params[`faqQuestion${index}`] ?? '').trim(),
      answer: (params[`faqAnswer${index}`] ?? '').trim(),
    }))
    .filter(item => item.question.length > 0 || item.answer.length > 0);
}

function escapeHtml(input: string): string {
  return input
    .replaceAll('&', '&amp;')
    .replaceAll('<', '&lt;')
    .replaceAll('>', '&gt;')
    .replaceAll('"', '&quot;');
}

function stripUndefined(value: unknown): unknown {
  if (Array.isArray(value)) {
    return value
      .map(item => stripUndefined(item))
      .filter(item => item !== undefined);
  }
  if (value && typeof value === 'object') {
    const out: Record<string, unknown> = {};
    for (const [key, nested] of Object.entries(value)) {
      const cleaned = stripUndefined(nested);
      if (cleaned !== undefined) out[key] = cleaned;
    }
    return out;
  }
  return value;
}

function parseJsonRaw(raw?: string): WithContext<Thing> | null {
  if (!raw || raw.trim().length === 0) return null;
  try {
    const parsed = JSON.parse(raw) as unknown;
    if (!parsed || typeof parsed !== 'object' || Array.isArray(parsed)) {
      return null;
    }
    const obj = parsed as Record<string, unknown>;
    if (typeof obj['@context'] !== 'string') {
      obj['@context'] = 'https://schema.org';
    }
    return obj as WithContext<Thing>;
  } catch {
    return null;
  }
}
