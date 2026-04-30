// OG API route paths. Import TemplateName + route helpers from here.
import type { TemplateName } from './og.types';

export const OG_ROUTES: Record<TemplateName, string> = {
  general:   '/api/og/general',
  gradient:  '/api/og/gradient',
  blog:      '/api/og/blog',
  minimal:   '/api/og/minimal',
  article:   '/api/og/article',
  product:   '/api/og/product',
  portfolio: '/api/og/portfolio',
  quote:     '/api/og/quote',
  changelog: '/api/og/changelog',
  event:     '/api/og/event',
  launch:    '/api/og/launch',
};
