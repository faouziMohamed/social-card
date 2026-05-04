// Base validators
import {SocialCardClient} from '../client';
import {
  ArticleParams,
  BlogParams,
  ChangelogParams,
  EventParams,
  GeneralParams,
  GradientParams,
  LaunchParams,
  MinimalParams,
  OgTemplateName,
  PortfolioParams,
  ProductParams,
  QuoteParams,
} from '../types/og.types';
import {
  enumValidator,
  hexColorValidator,
  numberValidator,
  stringValidator,
  validate,
} from '../validator';

const base: Record<string, (v: unknown, f: string) => unknown> = {
  theme: enumValidator(['dark', 'light', 'auto'], true),
  target: enumValidator(
    ['og', 'twitter-large', 'twitter-small', 'linkedin'],
    true,
  ),
  fontFamily: stringValidator(true),
  bgTone: enumValidator(['dark', 'light', 'custom'], true),
  bgCustomColor: hexColorValidator(true),
  bgGradientFrom: hexColorValidator(true),
  bgGradientTo: hexColorValidator(true),
  bgStyle: stringValidator(true),
  logo: stringValidator(true),
  logoWidth: numberValidator({optional: true, min: 10, max: 400}),
  logoHeight: numberValidator({optional: true, min: 10, max: 400}),
};

// Template validators
const general: Record<string, (v: unknown, f: string) => unknown> = {
  ...base,
  siteName: stringValidator(true),
  title: stringValidator(true),
  description: stringValidator(true),
  accentColor: hexColorValidator(true),
};

/**
 * Module for generating OG (Open Graph) images.
 * Supports all 11 templates via URL builder and binary fetch methods.
 */
export class OgModule {
  constructor(private client: SocialCardClient) {}

  // ── URL builders ────────────────────────────────────────────────────────

  general(p: GeneralParams): string {
    return this.tplUrl('general', p, general);
  }
  gradient(p: GradientParams): string {
    return this.tplUrl('gradient', p);
  }
  blog(p: BlogParams): string {
    return this.tplUrl('blog', p);
  }
  minimal(p: MinimalParams): string {
    return this.tplUrl('minimal', p);
  }
  article(p: ArticleParams): string {
    return this.tplUrl('article', p);
  }
  product(p: ProductParams): string {
    return this.tplUrl('product', p);
  }
  portfolio(p: PortfolioParams): string {
    return this.tplUrl('portfolio', p);
  }
  quote(p: QuoteParams): string {
    return this.tplUrl('quote', p);
  }
  changelog(p: ChangelogParams): string {
    return this.tplUrl('changelog', p);
  }
  event(p: EventParams): string {
    return this.tplUrl('event', p);
  }
  launch(p: LaunchParams): string {
    return this.tplUrl('launch', p);
  }

  // ── Buffer fetchers ─────────────────────────────────────────────────────

  async generalBuffer(p: GeneralParams): Promise<ArrayBuffer> {
    return this.tplBuffer('general', p, general);
  }
  async gradientBuffer(p: GradientParams): Promise<ArrayBuffer> {
    return this.tplBuffer('gradient', p);
  }
  async blogBuffer(p: BlogParams): Promise<ArrayBuffer> {
    return this.tplBuffer('blog', p);
  }
  async minimalBuffer(p: MinimalParams): Promise<ArrayBuffer> {
    return this.tplBuffer('minimal', p);
  }
  async articleBuffer(p: ArticleParams): Promise<ArrayBuffer> {
    return this.tplBuffer('article', p);
  }
  async productBuffer(p: ProductParams): Promise<ArrayBuffer> {
    return this.tplBuffer('product', p);
  }
  async portfolioBuffer(p: PortfolioParams): Promise<ArrayBuffer> {
    return this.tplBuffer('portfolio', p);
  }
  async quoteBuffer(p: QuoteParams): Promise<ArrayBuffer> {
    return this.tplBuffer('quote', p);
  }
  async changelogBuffer(p: ChangelogParams): Promise<ArrayBuffer> {
    return this.tplBuffer('changelog', p);
  }
  async eventBuffer(p: EventParams): Promise<ArrayBuffer> {
    return this.tplBuffer('event', p);
  }
  async launchBuffer(p: LaunchParams): Promise<ArrayBuffer> {
    return this.tplBuffer('launch', p);
  }

  // ── Private helpers ─────────────────────────────────────────────────────

  private tplUrl<T>(t: OgTemplateName, p: T, validators = base): string {
    validate(p as Record<string, unknown>, validators);
    return this.client.buildUrl(`/api/og/${t}`, p as Record<string, unknown>);
  }

  private tplBuffer<T>(
    t: OgTemplateName,
    p: T,
    validators = base,
  ): Promise<ArrayBuffer> {
    validate(p as Record<string, unknown>, validators);
    return this.client.fetchBuffer(
      `/api/og/${t}`,
      p as Record<string, unknown>,
    );
  }
}
