// OG Image Types

export type OgTemplateName =
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

export type TargetPlatform =
  | 'og'
  | 'twitter-large'
  | 'twitter-small'
  | 'linkedin';

export interface OgBaseParams {
  theme?: 'dark' | 'light' | 'auto';
  target?: TargetPlatform;
  fontFamily?: string;
  bgTone?: 'dark' | 'light' | 'custom';
  bgCustomColor?: string;
  bgGradientFrom?: string;
  bgGradientTo?: string;
  bgStyle?: string;
  logo?: string;
  logoWidth?: number;
  logoHeight?: number;
}

export interface GeneralParams extends OgBaseParams {
  siteName?: string;
  title?: string;
  description?: string;
  accentColor?: string;
}

export interface GradientParams extends OgBaseParams {
  siteName?: string;
  title?: string;
  description?: string;
  gradientFrom?: string;
  gradientTo?: string;
  gradientAngle?: number;
}

export interface BlogParams extends OgBaseParams {
  title?: string;
  banner?: string;
  tags?: string;
  authorName?: string;
  authorPhoto?: string;
  authorHandle?: string;
  readingTime?: string;
  publishDate?: string;
  dateLocale?: string;
  siteDomain?: string;
  accentColor?: string;
}

export interface MinimalParams extends OgBaseParams {
  title?: string;
  description?: string;
  eyebrow?: string;
  bgColor?: string;
  textColor?: string;
  accentColor?: string;
}

export interface ArticleParams extends OgBaseParams {
  title?: string;
  excerpt?: string;
  authorName?: string;
  authorPhoto?: string;
  publicationName?: string;
  publicationLogo?: string;
  readingTime?: string;
  publishDate?: string;
  dateLocale?: string;
  accentColor?: string;
}

export interface ProductParams extends OgBaseParams {
  productName?: string;
  tagline?: string;
  feature1?: string;
  feature2?: string;
  feature3?: string;
  badge?: string;
  cta?: string;
  screenshot?: string;
  accentColor?: string;
}

export interface PortfolioParams extends OgBaseParams {
  name?: string;
  role?: string;
  bio?: string;
  avatar?: string;
  skills?: string;
  githubHandle?: string;
  twitterHandle?: string;
  websiteUrl?: string;
  location?: string;
  available?: 'true' | 'false';
  accentColor?: string;
}

export interface QuoteParams extends OgBaseParams {
  quote?: string;
  author?: string;
  kicker?: string;
  accentColor?: string;
}

export interface ChangelogParams extends OgBaseParams {
  productName?: string;
  version?: string;
  headline?: string;
  change1?: string;
  change2?: string;
  change3?: string;
  accentColor?: string;
}

export interface EventParams extends OgBaseParams {
  eventName?: string;
  tagline?: string;
  eventDate?: string;
  dateLocale?: string;
  location?: string;
  host?: string;
  accentColor?: string;
}

export interface LaunchParams extends OgBaseParams {
  productName?: string;
  punchline?: string;
  launchDate?: string;
  highlight1?: string;
  highlight2?: string;
  highlight3?: string;
  badge?: string;
  accentColor?: string;
}
