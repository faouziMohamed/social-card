type BadgeName = 'label' | 'stat' | 'status' | 'progress' | 'score' | 'socials' | 'tech-stack' | 'availability';
interface BadgeBaseParams {
    theme?: 'dark' | 'light';
}
interface LabelParams extends BadgeBaseParams {
    label?: string;
    message?: string;
    color?: string;
    labelColor?: string;
    style?: 'flat' | 'pill';
}
interface StatParams extends BadgeBaseParams {
    label?: string;
    value?: string;
    unit?: string;
    color?: string;
    icon?: 'star' | 'download' | 'eye' | 'fork' | 'heart' | 'zap' | 'check' | 'clock';
}
interface StatusParams extends BadgeBaseParams {
    label?: string;
    status?: 'online' | 'offline' | 'degraded' | 'maintenance';
    color?: string;
}
interface ProgressParams extends BadgeBaseParams {
    label?: string;
    value?: number;
    color?: string;
    width?: number;
}
interface ScoreParams extends BadgeBaseParams {
    label?: string;
    value?: number;
    max?: number;
    color?: string;
}
interface SocialsParams extends BadgeBaseParams {
    platform?: 'github' | 'x' | 'bluesky' | 'linkedin' | 'youtube' | 'twitch' | 'discord' | 'npm' | 'pypi';
    handle?: string;
    followers?: string;
    color?: string;
}
interface TechStackParams extends BadgeBaseParams {
    stack?: string;
    color?: string;
    style?: 'tags' | 'row';
}
interface AvailabilityParams extends BadgeBaseParams {
    label?: string;
    available?: 'true' | 'false';
    hireText?: string;
    color?: string;
}

/**
 * Module for generating SVG badges.
 * Supports all 8 badge types via URL builder and SVG fetch methods.
 */
declare class BadgeModule {
    private client;
    constructor(client: SocialCardClient);
    label(p: LabelParams): string;
    stat(p: StatParams): string;
    status(p: StatusParams): string;
    progress(p: ProgressParams): string;
    score(p: ScoreParams): string;
    socials(p: SocialsParams): string;
    techStack(p: TechStackParams): string;
    availability(p: AvailabilityParams): string;
    labelSvg(p: LabelParams): Promise<string>;
    statSvg(p: StatParams): Promise<string>;
    statusSvg(p: StatusParams): Promise<string>;
    progressSvg(p: ProgressParams): Promise<string>;
    scoreSvg(p: ScoreParams): Promise<string>;
    socialsSvg(p: SocialsParams): Promise<string>;
    techStackSvg(p: TechStackParams): Promise<string>;
    availabilitySvg(p: AvailabilityParams): Promise<string>;
    private badgeUrl;
    private badgeSvg;
}

type OgTemplateName = 'general' | 'gradient' | 'blog' | 'minimal' | 'article' | 'product' | 'portfolio' | 'quote' | 'changelog' | 'event' | 'launch';
type TargetPlatform = 'og' | 'twitter-large' | 'twitter-small' | 'linkedin';
interface OgBaseParams {
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
interface GeneralParams extends OgBaseParams {
    siteName?: string;
    title?: string;
    description?: string;
    accentColor?: string;
}
interface GradientParams extends OgBaseParams {
    siteName?: string;
    title?: string;
    description?: string;
    gradientFrom?: string;
    gradientTo?: string;
    gradientAngle?: number;
}
interface BlogParams extends OgBaseParams {
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
interface MinimalParams extends OgBaseParams {
    title?: string;
    description?: string;
    eyebrow?: string;
    bgColor?: string;
    textColor?: string;
    accentColor?: string;
}
interface ArticleParams extends OgBaseParams {
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
interface ProductParams extends OgBaseParams {
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
interface PortfolioParams extends OgBaseParams {
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
interface QuoteParams extends OgBaseParams {
    quote?: string;
    author?: string;
    kicker?: string;
    accentColor?: string;
}
interface ChangelogParams extends OgBaseParams {
    productName?: string;
    version?: string;
    headline?: string;
    change1?: string;
    change2?: string;
    change3?: string;
    accentColor?: string;
}
interface EventParams extends OgBaseParams {
    eventName?: string;
    tagline?: string;
    eventDate?: string;
    dateLocale?: string;
    location?: string;
    host?: string;
    accentColor?: string;
}
interface LaunchParams extends OgBaseParams {
    productName?: string;
    punchline?: string;
    launchDate?: string;
    highlight1?: string;
    highlight2?: string;
    highlight3?: string;
    badge?: string;
    accentColor?: string;
}

/**
 * Module for generating OG (Open Graph) images.
 * Supports all 11 templates via URL builder and binary fetch methods.
 */
declare class OgModule {
    private client;
    constructor(client: SocialCardClient);
    general(p: GeneralParams): string;
    gradient(p: GradientParams): string;
    blog(p: BlogParams): string;
    minimal(p: MinimalParams): string;
    article(p: ArticleParams): string;
    product(p: ProductParams): string;
    portfolio(p: PortfolioParams): string;
    quote(p: QuoteParams): string;
    changelog(p: ChangelogParams): string;
    event(p: EventParams): string;
    launch(p: LaunchParams): string;
    generalBuffer(p: GeneralParams): Promise<ArrayBuffer>;
    gradientBuffer(p: GradientParams): Promise<ArrayBuffer>;
    blogBuffer(p: BlogParams): Promise<ArrayBuffer>;
    minimalBuffer(p: MinimalParams): Promise<ArrayBuffer>;
    articleBuffer(p: ArticleParams): Promise<ArrayBuffer>;
    productBuffer(p: ProductParams): Promise<ArrayBuffer>;
    portfolioBuffer(p: PortfolioParams): Promise<ArrayBuffer>;
    quoteBuffer(p: QuoteParams): Promise<ArrayBuffer>;
    changelogBuffer(p: ChangelogParams): Promise<ArrayBuffer>;
    eventBuffer(p: EventParams): Promise<ArrayBuffer>;
    launchBuffer(p: LaunchParams): Promise<ArrayBuffer>;
    private tplUrl;
    private tplBuffer;
}

type SeoAssetType = 'favicon' | 'apple-touch-icon' | 'manifest-icon' | 'twitter-card' | 'json-ld' | 'robots-txt' | 'meta-pack';
interface SeoBaseParams {
    theme?: 'dark' | 'light';
    accentColor?: string;
}
interface IconBaseParams extends SeoBaseParams {
    initial?: string;
    logo?: string;
    color?: string;
    shape?: 'circle' | 'square' | 'rounded';
}
type FaviconParams = IconBaseParams;
type AppleTouchIconParams = IconBaseParams;
interface ManifestIconParams extends IconBaseParams {
    size?: '192' | '512';
}
interface TwitterCardParams extends SeoBaseParams {
    title?: string;
    description?: string;
    siteName?: string;
    logo?: string;
    bgStyle?: string;
}
interface JsonLdParams extends SeoBaseParams {
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
interface RobotsTxtParams extends SeoBaseParams {
    userAgent?: string;
    allow?: string;
    disallow?: string;
    sitemap?: string;
    crawlDelay?: string;
    aiCrawlerPolicy?: 'allow' | 'disallow';
}
interface MetaPackParams extends SeoBaseParams {
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

/**
 * Module for generating SEO assets.
 */
declare class SeoModule {
    private client;
    constructor(client: SocialCardClient);
    favicon(p: FaviconParams): string;
    appleTouchIcon(p: AppleTouchIconParams): string;
    manifestIcon(p: ManifestIconParams): string;
    faviconBuffer(p: FaviconParams): Promise<ArrayBuffer>;
    appleTouchIconBuffer(p: AppleTouchIconParams): Promise<ArrayBuffer>;
    manifestIconBuffer(p: ManifestIconParams): Promise<ArrayBuffer>;
    private seoUrl;
    private seoBuffer;
}

interface SocialCardClientConfig {
    /** The base URL of your Social Card instance. Defaults to https://social-card.mfaouzi.com */
    baseUrl?: string;
    /** Default theme for all requests. Defaults to 'dark' */
    defaultTheme?: 'dark' | 'light';
    /** Default accent color for all requests. Defaults to '#6366f1' */
    defaultAccentColor?: string;
}
declare class SocialCardClient {
    readonly og: OgModule;
    readonly badge: BadgeModule;
    readonly seo: SeoModule;
    private readonly baseUrl;
    private readonly defaultTheme;
    private readonly defaultAccentColor;
    /**
     * Creates a new Social Card SDK client.
     *
     * @param config - Configuration object
     * @param config.baseUrl - The base URL of your Social Card instance.
     *                               Defaults to https://social-card.mfaouzi.com
     * @param config.defaultTheme - Default theme for all requests ('dark' or 'light').
     *                                  Defaults to 'dark'
     * @param config.defaultAccentColor - Default accent color for all requests.
     *                                 Defaults to '#6366f1'
     *
     * @example
     * ```typescript
     * // Use default production URL
     * const client = new SocialCardClient();
     *
     * // Or specify your own instance
     * const client = new SocialCardClient({
     *   baseUrl: 'https://your-instance.com',
     *   defaultTheme: 'light',
     *   defaultAccentColor: '#3b82f6',
     * });
     * ```
     */
    constructor(config?: SocialCardClientConfig);
    getBaseUrl(): string;
    getDefaultTheme(): 'dark' | 'light';
    getDefaultAccentColor(): string;
    /**
     * Builds a full URL for an API endpoint with query parameters.
     *
     * @param path - The API path (e.g., '/api/og/general')
     * @param params - Query parameters to include
     * @returns The full URL with query parameters
     *
     * @internal
     */
    buildUrl(path: string, params?: Record<string, unknown>): string;
    /**
     * Fetches an API endpoint and returns the response as a Buffer.
     * Useful for getting images and binary assets in Node.js environments.
     *
     * @param path - The API path
     * @param params - Query parameters
     * @returns Promise<ArrayBuffer> - The response as an ArrayBuffer (works in browser, Node, and edge)
     * @throws Error if the API request fails
     *
     * @example
     * ```typescript
     * const buffer = await client.fetchBuffer('/api/og/general', { title: 'My Page' });
     * // Node.js: Buffer.from(buffer)
     * // Browser: new Blob([buffer])
     * ```
     */
    fetchBuffer(path: string, params?: Record<string, unknown>): Promise<ArrayBuffer>;
    /**
     * Fetches an API endpoint and returns the response as a string.
     * Useful for getting SVG badges and text-based assets.
     *
     * @param path - The API path
     * @param params - Query parameters
     * @returns Promise<string> - The response as a string
     * @throws Error if the API request fails
     *
     * @example
     * ```typescript
     * const svgString = await client.fetchText('/api/badge/label', {
     *   label: 'version',
     *   message: '1.0.0',
     * });
     * ```
     */
    fetchText(path: string, params?: Record<string, unknown>): Promise<string>;
}

/**
 * Lightweight runtime validation — no dependencies.
 */
type Validator = (value: unknown, fieldName: string) => unknown;
declare function stringValidator(optional?: boolean): Validator;
declare function numberValidator(options?: {
    optional?: boolean;
    min?: number;
    max?: number;
}): Validator;
declare function enumValidator(allowed: string[], optional?: boolean): Validator;
declare function hexColorValidator(optional?: boolean): Validator;
declare function validate<T extends Record<string, unknown>>(params: T, validators: Partial<Record<keyof T, Validator>>): T;

export { type AppleTouchIconParams, type ArticleParams, type AvailabilityParams, type BadgeBaseParams, BadgeModule, type BadgeName, type BlogParams, type ChangelogParams, type EventParams, type FaviconParams, type GeneralParams, type GradientParams, type IconBaseParams, type JsonLdParams, type LabelParams, type LaunchParams, type ManifestIconParams, type MetaPackParams, type MinimalParams, type OgBaseParams, OgModule, type OgTemplateName, type PortfolioParams, type ProductParams, type ProgressParams, type QuoteParams, type RobotsTxtParams, type ScoreParams, type SeoAssetType, type SeoBaseParams, SeoModule, SocialCardClient, type SocialCardClientConfig, type SocialsParams, type StatParams, type StatusParams, type TargetPlatform, type TechStackParams, type TwitterCardParams, enumValidator, hexColorValidator, numberValidator, stringValidator, validate };
