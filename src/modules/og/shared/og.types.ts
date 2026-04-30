// Central type exports for the OG module.
// All consumers import from here, never from og-schemas directly.

export type {
  TargetPlatform,
  // OG font keys stay defined by the shared catalog
  GeneralParams,
  GradientParams,
  BlogParams,
  MinimalParams,
  ArticleParams,
  ProductParams,
  PortfolioParams,
  QuoteParams,
  ChangelogParams,
  EventParams,
  LaunchParams,
} from './og-schemas';
export type { OgFontKey } from './og-font-catalog';

export type { ThemeName, ThemePalette } from '../server/og-themes.server';

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
