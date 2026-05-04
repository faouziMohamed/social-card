import {BadgeModule} from './modules/badge.module';
import {OgModule} from './modules/og.module';
import {SeoModule} from './modules/seo.module';
import {hexColorValidator, stringValidator, validate} from './validator';

export interface SocialCardClientConfig {
  /** The base URL of your Social Card instance. Defaults to https://social-card.mfaouzi.com */
  baseUrl?: string;
  /** Default theme for all requests. Defaults to 'dark' */
  defaultTheme?: 'dark' | 'light';
  /** Default accent color for all requests. Defaults to '#6366f1' */
  defaultAccentColor?: string;
}

const configValidators = {
  baseUrl: stringValidator(true),
  defaultTheme: (value: unknown, _fieldName: string) => {
    if (value === undefined || value === null) return;
    if (value !== 'dark' && value !== 'light') {
      throw new Error(
        `Social Card SDK: defaultTheme must be 'dark' or 'light', got: ${JSON.stringify(value)}`,
      );
    }
    return value;
  },
  defaultAccentColor: hexColorValidator(true),
};

export class SocialCardClient {
  public readonly og: OgModule;
  public readonly badge: BadgeModule;
  public readonly seo: SeoModule;

  private readonly baseUrl: string;
  private readonly defaultTheme: 'dark' | 'light';
  private readonly defaultAccentColor: string;

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
  constructor(config: SocialCardClientConfig = {}) {
    // Validate config
    const validated = validate(
      config as Record<string, unknown>,
      configValidators,
    ) as SocialCardClientConfig;

    this.baseUrl = (
      validated.baseUrl ?? 'https://social-card.mfaouzi.com'
    ).replace(/\/+$/, '');

    // Set defaults
    this.defaultTheme = validated.defaultTheme ?? 'dark';
    this.defaultAccentColor = validated.defaultAccentColor ?? '#6366f1';

    this.og = new OgModule(this);
    this.badge = new BadgeModule(this);
    this.seo = new SeoModule(this);
  }

  getBaseUrl(): string {
    return this.baseUrl;
  }

  getDefaultTheme(): 'dark' | 'light' {
    return this.defaultTheme;
  }

  getDefaultAccentColor(): string {
    return this.defaultAccentColor;
  }

  /**
   * Builds a full URL for an API endpoint with query parameters.
   *
   * @param path - The API path (e.g., '/api/og/general')
   * @param params - Query parameters to include
   * @returns The full URL with query parameters
   *
   * @internal
   */
  buildUrl(path: string, params: Record<string, unknown> = {}): string {
    const url = new URL(`${this.baseUrl}${path}`);

    const mergedParams = {
      theme: this.defaultTheme,
      accentColor: this.defaultAccentColor,
      ...params,
    };

    for (const [key, value] of Object.entries(mergedParams)) {
      if (value !== undefined && value !== null) {
        url.searchParams.append(key, String(value));
      }
    }

    return url.toString();
  }

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
  async fetchBuffer(
    path: string,
    params: Record<string, unknown> = {},
  ): Promise<ArrayBuffer> {
    const url = this.buildUrl(path, params);

    const response = await fetch(url);

    if (!response.ok) {
      throw new Error(
        `Social Card API error: ${response.status} ${response.statusText}`,
      );
    }

    return response.arrayBuffer();
  }

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
  async fetchText(
    path: string,
    params: Record<string, unknown> = {},
  ): Promise<string> {
    const url = this.buildUrl(path, params);

    const response = await fetch(url);

    if (!response.ok) {
      throw new Error(
        `Social Card API error: ${response.status} ${response.statusText}`,
      );
    }

    return response.text();
  }
}
