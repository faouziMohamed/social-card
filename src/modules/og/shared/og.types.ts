// Central type exports for the OG module.
// All consumers import from here, never from og-schemas directly.

export type {OgFontKey} from '@/modules/og/shared/og-font-catalog';
export type {
  ArticleParams,
  BlogParams,
  ChangelogParams,
  EventParams,
  // OG font keys stay defined by the shared catalog
  GeneralParams,
  GradientParams,
  LaunchParams,
  MinimalParams,
  PortfolioParams,
  ProductParams,
  QuoteParams,
  TargetPlatform,
} from '@/modules/og/shared/og-schemas';

export type {
  ThemeName,
  ThemePalette,
} from '@/modules/og/server/og-themes.server';

/** Union of all template identifiers */
export type TemplateName =
  | 'general'
  | 'gradient'
  | 'blog'
  | 'minimal'
  | 'article'
  | 'product'
  | 'portfolio'
  | 'quote'
  | 'changelog'
  | 'event'
  | 'launch';
