// SEO Types

export type SeoAssetType =
  | 'favicon'
  | 'apple-touch-icon'
  | 'manifest-icon'
  | 'twitter-card'
  | 'json-ld'
  | 'robots-txt'
  | 'meta-pack';

export interface SeoBaseParams {
  theme?: 'dark' | 'light';
  accentColor?: string;
}

export interface IconBaseParams extends SeoBaseParams {
  initial?: string;
  logo?: string;
  color?: string;
  shape?: 'circle' | 'square' | 'rounded';
}

export type FaviconParams = IconBaseParams;

export type AppleTouchIconParams = IconBaseParams;

export interface ManifestIconParams extends IconBaseParams {
  size?: '192' | '512';
}

export interface TwitterCardParams extends SeoBaseParams {
  title?: string;
  description?: string;
  siteName?: string;
  logo?: string;
  bgStyle?: string;
}

export interface JsonLdParams extends SeoBaseParams {
  schemaType?: string;
  name?: string;
  headline?: string;
  description?: string;
  url?: string;
  image?: string;
  datePublished?: string;
  dateModified?: string;
  authorName?: string;
  publisherName?: string;
  sameAs1?: string;
  sameAs2?: string;
  sameAs3?: string;
  price?: string;
  priceCurrency?: string;
  applicationCategory?: string;
  operatingSystem?: string;
  faqQuestion1?: string;
  faqAnswer1?: string;
  faqQuestion2?: string;
  faqAnswer2?: string;
  jsonRaw?: string;
}

export interface RobotsTxtParams extends SeoBaseParams {
  userAgent?: string;
  allow?: string;
  disallow?: string;
  sitemap?: string;
  crawlDelay?: string;
  aiCrawlerPolicy?: 'allow' | 'disallow';
}

export interface MetaPackParams extends SeoBaseParams {
  title?: string;
  description?: string;
  canonical?: string;
  robots?: string;
  ogType?: string;
  ogImage?: string;
  siteName?: string;
  locale?: string;
  twitterCard?: 'summary' | 'summary_large_image';
  twitterSite?: string;
  themeColor?: string;
  keywords?: string;
}
