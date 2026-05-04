// Social Card SDK
// TypeScript SDK for generating OG images, badges, and SEO assets.

// Main client
export {SocialCardClient} from './client';
export type {SocialCardClientConfig} from './client';

// Modules
export {BadgeModule} from './modules/badge.module';
export {OgModule} from './modules/og.module';
export {SeoModule} from './modules/seo.module';

// Validation (for advanced users)
export {
  enumValidator,
  hexColorValidator,
  numberValidator,
  stringValidator,
  validate,
} from './validator';

// OG Types
export type {
  ArticleParams,
  BlogParams,
  ChangelogParams,
  EventParams,
  GeneralParams,
  GradientParams,
  LaunchParams,
  MinimalParams,
  OgBaseParams,
  OgTemplateName,
  PortfolioParams,
  ProductParams,
  QuoteParams,
  TargetPlatform,
} from './types/og.types';

// Badge Types
export type {
  AvailabilityParams,
  BadgeBaseParams,
  BadgeName,
  LabelParams,
  ProgressParams,
  ScoreParams,
  SocialsParams,
  StatParams,
  StatusParams,
  TechStackParams,
} from './types/badge.types';

// SEO Types
export type {
  AppleTouchIconParams,
  FaviconParams,
  IconBaseParams,
  JsonLdParams,
  ManifestIconParams,
  MetaPackParams,
  RobotsTxtParams,
  SeoAssetType,
  SeoBaseParams,
  TwitterCardParams,
} from './types/seo.types';
