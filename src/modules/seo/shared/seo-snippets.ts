import type {SeoTemplateName} from './seo-schemas';
import {
  buildImageWorkflowSnippet,
  IMAGE_SEO_TEMPLATES,
} from './seo-snippets-image-workflow';
import {buildJsonLdScript} from './seo-snippets-json-ld';
import {buildMetaPackSnippet, buildRobotsTxt} from './seo-snippets-text';

export {
  buildImageWorkflowSnippet,
  buildImageWorkflowUrls,
  IMAGE_SEO_TEMPLATES,
} from './seo-snippets-image-workflow';
export {buildJsonLdObject, buildJsonLdScript} from './seo-snippets-json-ld';
export {
  buildMetaPackSnippet,
  buildRobotsTxt,
  TEXT_SEO_TEMPLATES,
} from './seo-snippets-text';

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
  if (template === 'image-workflow')
    return buildImageWorkflowSnippet(seoUrl, params);
  return buildSeoImageSnippet(template, seoUrl);
}

function buildSeoImageSnippet(template: SeoTemplateName, url: string): string {
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
