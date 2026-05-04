// src/validator.ts
function stringValidator(optional = false) {
  return (value, fieldName) => {
    if (value == null) {
      if (optional) return;
      throw new Error(
        `Social Card SDK: ${fieldName} is required and must be a non-empty string`
      );
    }
    if (typeof value !== "string" || value.trim() === "") {
      throw new Error(
        `Social Card SDK: ${fieldName} must be a non-empty string`
      );
    }
    return value;
  };
}
function numberValidator(options = {}) {
  return (value, fieldName) => {
    if (value == null) {
      if (options.optional) return;
      throw new Error(
        `Social Card SDK: ${fieldName} is required and must be a number`
      );
    }
    const num = Number(value);
    if (Number.isNaN(num))
      throw new Error(`Social Card SDK: ${fieldName} must be a number`);
    if (options.min !== void 0 && num < options.min)
      throw new Error(
        `Social Card SDK: ${fieldName} must be >= ${options.min}`
      );
    if (options.max !== void 0 && num > options.max)
      throw new Error(
        `Social Card SDK: ${fieldName} must be <= ${options.max}`
      );
    return num;
  };
}
function enumValidator(allowed, optional = false) {
  return (value, fieldName) => {
    if (value == null) {
      if (optional) return;
      throw new Error(
        `Social Card SDK: ${fieldName} must be one of: ${allowed.join(", ")}`
      );
    }
    if (typeof value !== "string" || !allowed.includes(value)) {
      throw new Error(
        `Social Card SDK: ${fieldName} must be one of: ${allowed.join(", ")}`
      );
    }
    return value;
  };
}
function hexColorValidator(optional = false) {
  const regex = /^#([\dA-Fa-f]{3}){1,2}$/;
  return (value, fieldName) => {
    if (value == null) {
      if (optional) return;
      throw new Error(
        `Social Card SDK: ${fieldName} must be a hex color (e.g. '#6366f1')`
      );
    }
    if (typeof value !== "string" || !regex.test(value)) {
      throw new Error(
        `Social Card SDK: ${fieldName} must be a valid hex color, got: ${JSON.stringify(value)}`
      );
    }
    return value;
  };
}
function validate(params, validators) {
  const result = { ...params };
  for (const [key, validator] of Object.entries(validators)) {
    if (typeof validator === "function") {
      result[key] = validator(params[key], key);
    }
  }
  return result;
}

// src/modules/badge.module.ts
var base = {
  color: hexColorValidator(true)
};
var labelValidators = {
  ...base,
  label: stringValidator(true),
  message: stringValidator(true),
  labelColor: hexColorValidator(true)
};
var BadgeModule = class {
  constructor(client) {
    this.client = client;
  }
  // ── URL builders ────────────────────────────────────────────────────────
  label(p) {
    return this.badgeUrl("label", p, labelValidators);
  }
  stat(p) {
    return this.badgeUrl("stat", p);
  }
  status(p) {
    return this.badgeUrl("status", p);
  }
  progress(p) {
    return this.badgeUrl("progress", p);
  }
  score(p) {
    return this.badgeUrl("score", p);
  }
  socials(p) {
    return this.badgeUrl("socials", p);
  }
  techStack(p) {
    return this.badgeUrl("tech-stack", p);
  }
  availability(p) {
    return this.badgeUrl("availability", p);
  }
  // ── SVG fetchers ─────────────────────────────────────────────────────────
  async labelSvg(p) {
    return this.badgeSvg("label", p, labelValidators);
  }
  async statSvg(p) {
    return this.badgeSvg("stat", p);
  }
  async statusSvg(p) {
    return this.badgeSvg("status", p);
  }
  async progressSvg(p) {
    return this.badgeSvg("progress", p);
  }
  async scoreSvg(p) {
    return this.badgeSvg("score", p);
  }
  async socialsSvg(p) {
    return this.badgeSvg("socials", p);
  }
  async techStackSvg(p) {
    return this.badgeSvg("tech-stack", p);
  }
  async availabilitySvg(p) {
    return this.badgeSvg("availability", p);
  }
  // ── Private helpers ───────────────────────────────────────────────────────
  badgeUrl(t, p, validators = base) {
    validate(p, validators);
    return this.client.buildUrl(
      `/api/badge/${t}`,
      p
    );
  }
  badgeSvg(t, p, validators = base) {
    validate(p, validators);
    return this.client.fetchText(
      `/api/badge/${t}`,
      p
    );
  }
};

// src/modules/og.module.ts
var base2 = {
  theme: enumValidator(["dark", "light", "auto"], true),
  target: enumValidator(
    ["og", "twitter-large", "twitter-small", "linkedin"],
    true
  ),
  fontFamily: stringValidator(true),
  bgTone: enumValidator(["dark", "light", "custom"], true),
  bgCustomColor: hexColorValidator(true),
  bgGradientFrom: hexColorValidator(true),
  bgGradientTo: hexColorValidator(true),
  bgStyle: stringValidator(true),
  logo: stringValidator(true),
  logoWidth: numberValidator({ optional: true, min: 10, max: 400 }),
  logoHeight: numberValidator({ optional: true, min: 10, max: 400 })
};
var general = {
  ...base2,
  siteName: stringValidator(true),
  title: stringValidator(true),
  description: stringValidator(true),
  accentColor: hexColorValidator(true)
};
var OgModule = class {
  constructor(client) {
    this.client = client;
  }
  // ── URL builders ────────────────────────────────────────────────────────
  general(p) {
    return this.tplUrl("general", p, general);
  }
  gradient(p) {
    return this.tplUrl("gradient", p);
  }
  blog(p) {
    return this.tplUrl("blog", p);
  }
  minimal(p) {
    return this.tplUrl("minimal", p);
  }
  article(p) {
    return this.tplUrl("article", p);
  }
  product(p) {
    return this.tplUrl("product", p);
  }
  portfolio(p) {
    return this.tplUrl("portfolio", p);
  }
  quote(p) {
    return this.tplUrl("quote", p);
  }
  changelog(p) {
    return this.tplUrl("changelog", p);
  }
  event(p) {
    return this.tplUrl("event", p);
  }
  launch(p) {
    return this.tplUrl("launch", p);
  }
  // ── Buffer fetchers ─────────────────────────────────────────────────────
  async generalBuffer(p) {
    return this.tplBuffer("general", p, general);
  }
  async gradientBuffer(p) {
    return this.tplBuffer("gradient", p);
  }
  async blogBuffer(p) {
    return this.tplBuffer("blog", p);
  }
  async minimalBuffer(p) {
    return this.tplBuffer("minimal", p);
  }
  async articleBuffer(p) {
    return this.tplBuffer("article", p);
  }
  async productBuffer(p) {
    return this.tplBuffer("product", p);
  }
  async portfolioBuffer(p) {
    return this.tplBuffer("portfolio", p);
  }
  async quoteBuffer(p) {
    return this.tplBuffer("quote", p);
  }
  async changelogBuffer(p) {
    return this.tplBuffer("changelog", p);
  }
  async eventBuffer(p) {
    return this.tplBuffer("event", p);
  }
  async launchBuffer(p) {
    return this.tplBuffer("launch", p);
  }
  // ── Private helpers ─────────────────────────────────────────────────────
  tplUrl(t, p, validators = base2) {
    validate(p, validators);
    return this.client.buildUrl(`/api/og/${t}`, p);
  }
  tplBuffer(t, p, validators = base2) {
    validate(p, validators);
    return this.client.fetchBuffer(
      `/api/og/${t}`,
      p
    );
  }
};

// src/modules/seo.module.ts
var iconValidators = {
  initial: stringValidator(true),
  color: hexColorValidator(true),
  accentColor: hexColorValidator(true)
};
var SeoModule = class {
  constructor(client) {
    this.client = client;
  }
  // ── URL builders ────────────────────────────────────────────────────────
  favicon(p) {
    return this.seoUrl("favicon", p);
  }
  appleTouchIcon(p) {
    return this.seoUrl("apple-touch-icon", p);
  }
  manifestIcon(p) {
    return this.seoUrl("manifest-icon", p);
  }
  // ── Buffer fetchers ──────────────────────────────────────────────────────
  async faviconBuffer(p) {
    return this.seoBuffer("favicon", p);
  }
  async appleTouchIconBuffer(p) {
    return this.seoBuffer("apple-touch-icon", p);
  }
  async manifestIconBuffer(p) {
    return this.seoBuffer("manifest-icon", p);
  }
  // ── Private helpers ──────────────────────────────────────────────────────
  seoUrl(t, p) {
    validate(p, iconValidators);
    return this.client.buildUrl(`/api/seo/${t}`, p);
  }
  seoBuffer(t, p) {
    validate(p, iconValidators);
    return this.client.fetchBuffer(
      `/api/seo/${t}`,
      p
    );
  }
};

// src/client.ts
var configValidators = {
  baseUrl: stringValidator(true),
  defaultTheme: (value, _fieldName) => {
    if (value === void 0 || value === null) return;
    if (value !== "dark" && value !== "light") {
      throw new Error(
        `Social Card SDK: defaultTheme must be 'dark' or 'light', got: ${JSON.stringify(value)}`
      );
    }
    return value;
  },
  defaultAccentColor: hexColorValidator(true)
};
var SocialCardClient = class {
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
  constructor(config = {}) {
    const validated = validate(
      config,
      configValidators
    );
    this.baseUrl = (validated.baseUrl ?? "https://social-card.mfaouzi.com").replace(/\/+$/, "");
    this.defaultTheme = validated.defaultTheme ?? "dark";
    this.defaultAccentColor = validated.defaultAccentColor ?? "#6366f1";
    this.og = new OgModule(this);
    this.badge = new BadgeModule(this);
    this.seo = new SeoModule(this);
  }
  getBaseUrl() {
    return this.baseUrl;
  }
  getDefaultTheme() {
    return this.defaultTheme;
  }
  getDefaultAccentColor() {
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
  buildUrl(path, params = {}) {
    const url = new URL(`${this.baseUrl}${path}`);
    const mergedParams = {
      theme: this.defaultTheme,
      accentColor: this.defaultAccentColor,
      ...params
    };
    for (const [key, value] of Object.entries(mergedParams)) {
      if (value !== void 0 && value !== null) {
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
  async fetchBuffer(path, params = {}) {
    const url = this.buildUrl(path, params);
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error(
        `Social Card API error: ${response.status} ${response.statusText}`
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
  async fetchText(path, params = {}) {
    const url = this.buildUrl(path, params);
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error(
        `Social Card API error: ${response.status} ${response.statusText}`
      );
    }
    return response.text();
  }
};

export { BadgeModule, OgModule, SeoModule, SocialCardClient, enumValidator, hexColorValidator, numberValidator, stringValidator, validate };
//# sourceMappingURL=index.js.map
//# sourceMappingURL=index.js.map