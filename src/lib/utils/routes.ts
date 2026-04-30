export const ROUTES = {
  home: '/',
  builder: '/builder',
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
    },
    logs: '/api/logs',
  },
} as const;

export type TemplateName = keyof typeof ROUTES.api.og;
