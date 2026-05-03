export const ROUTES = {
  home: '/',
  builder: '/builder',
  builderTabs: {
    og: '/builder/og',
    badge: '/builder/badge',
    seo: '/builder/seo',
  },
  docs: '/docs',
  api: {
    og: {
      general: '/api/og/general',
      gradient: '/api/og/gradient',
      blog: '/api/og/blog',
      minimal: '/api/og/minimal',
      article: '/api/og/article',
      product: '/api/og/product',
      portfolio: '/api/og/portfolio',
      quote: '/api/og/quote',
      changelog: '/api/og/changelog',
      event: '/api/og/event',
      launch: '/api/og/launch',
    },
    badge: {
      label: '/api/badge/label',
      stat: '/api/badge/stat',
      status: '/api/badge/status',
      progress: '/api/badge/progress',
      score: '/api/badge/score',
      socials: '/api/badge/socials',
      'tech-stack': '/api/badge/tech-stack',
      availability: '/api/badge/availability',
    },
    seo: {
      favicon: '/api/seo/favicon',
      'apple-touch-icon': '/api/seo/apple-touch-icon',
      'manifest-icon': '/api/seo/manifest-icon',
      'twitter-card': '/api/seo/twitter-card',
      'json-ld': '/api/seo/json-ld',
      'robots-txt': '/api/seo/robots-txt',
      'meta-pack': '/api/seo/meta-pack',
    },
    logs: '/api/logs',
  },
} as const;

export type TemplateName = keyof typeof ROUTES.api.og;
export type BadgeName = keyof typeof ROUTES.api.badge;
export type SeoAssetName = keyof typeof ROUTES.api.seo;
export type BuilderTabName = keyof typeof ROUTES.builderTabs;
