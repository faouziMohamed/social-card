import type {SeoTemplateName} from './seo-schemas';

export const SEO_ROUTES: Record<SeoTemplateName, string> = {
  favicon: '/api/seo/favicon',
  'apple-touch-icon': '/api/seo/apple-touch-icon',
  'manifest-icon': '/api/seo/manifest-icon',
  'twitter-card': '/api/seo/twitter-card',
  'json-ld': '/api/seo/json-ld',
  'robots-txt': '/api/seo/robots-txt',
  'meta-pack': '/api/seo/meta-pack',
};
