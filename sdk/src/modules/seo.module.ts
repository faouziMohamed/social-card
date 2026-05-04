import {SocialCardClient} from '../client';
import {
  AppleTouchIconParams,
  FaviconParams,
  ManifestIconParams,
} from '../types/seo.types';
import {hexColorValidator, stringValidator, validate} from '../validator';

const iconValidators: Record<string, (v: unknown, f: string) => unknown> = {
  initial: stringValidator(true),
  color: hexColorValidator(true),
  accentColor: hexColorValidator(true),
};

/**
 * Module for generating SEO assets.
 */
export class SeoModule {
  constructor(private client: SocialCardClient) {}

  // ── URL builders ────────────────────────────────────────────────────────

  favicon(p: FaviconParams): string {
    return this.seoUrl('favicon', p);
  }

  appleTouchIcon(p: AppleTouchIconParams): string {
    return this.seoUrl('apple-touch-icon', p);
  }

  manifestIcon(p: ManifestIconParams): string {
    return this.seoUrl('manifest-icon', p);
  }

  // ── Buffer fetchers ──────────────────────────────────────────────────────

  async faviconBuffer(p: FaviconParams): Promise<ArrayBuffer> {
    return this.seoBuffer('favicon', p);
  }

  async appleTouchIconBuffer(p: AppleTouchIconParams): Promise<ArrayBuffer> {
    return this.seoBuffer('apple-touch-icon', p);
  }

  async manifestIconBuffer(p: ManifestIconParams): Promise<ArrayBuffer> {
    return this.seoBuffer('manifest-icon', p);
  }

  // ── Private helpers ──────────────────────────────────────────────────────

  private seoUrl<T>(t: string, p: T): string {
    validate(p as Record<string, unknown>, iconValidators);
    return this.client.buildUrl(`/api/seo/${t}`, p as Record<string, unknown>);
  }

  private seoBuffer<T>(t: string, p: T): Promise<ArrayBuffer> {
    validate(p as Record<string, unknown>, iconValidators);
    return this.client.fetchBuffer(
      `/api/seo/${t}`,
      p as Record<string, unknown>,
    );
  }
}
