# Social Card SDK

TypeScript SDK for [Social Card](https://social-card.mfaouzi.com) — generate Open Graph images, SVG badges, and SEO assets
programmatically.

[![npm](https://img.shields.io/npm/v/social-card-sdk)](https://www.npmjs.com/package/social-card-sdk)
[![license](https://img.shields.io/npm/l/social-card-sdk)](https://www.npmjs.com/package/social-card-sdk)

## Installation

```bash
npm install social-card-sdk
# or
pnpm add social-card-sdk
# or
yarn add social-card-sdk
```

## Quick Start

```typescript
import {SocialCardClient} from 'social-card-sdk';

const client = new SocialCardClient();
// or point to your own instance:
// const client = new SocialCardClient({ baseUrl: 'https://your-instance.com' });

// Build a URL instantly (no network call)
const url = client.og.general({
  title: 'My Page',
  description: 'Built with Social Card SDK',
});
// => https://social-card.mfaouzi.com/api/og/general?title=My+Page&...
```

---

## Configuration

```typescript
const client = new SocialCardClient({
  // Default: https://social-card.mfaouzi.com
  baseUrl: 'https://your-instance.com',
  // Default: 'dark'
  defaultTheme: 'dark',
  // Default: '#6366f1'
  defaultAccentColor: '#6366f1',
});
```

---

## OG Images

### Templates

| Template  | URL builder              | Fetch binary                   | 
|-----------|--------------------------|--------------------------------|
| General   | `client.og.general(p)`   | `client.og.generalBuffer(p)`   |
| Gradient  | `client.og.gradient(p)`  | `client.og.gradientBuffer(p)`  |
| Blog      | `client.og.blog(p)`      | `client.og.blogBuffer(p)`      |
| Minimal   | `client.og.minimal(p)`   | `client.og.minimalBuffer(p)`   |
| Article   | `client.og.article(p)`   | `client.og.articleBuffer(p)`   |
| Product   | `client.og.product(p)`   | `client.og.productBuffer(p)`   |
| Portfolio | `client.og.portfolio(p)` | `client.og.portfolioBuffer(p)` |
| Quote     | `client.og.quote(p)`     | `client.og.quoteBuffer(p)`     |
| Changelog | `client.og.changelog(p)` | `client.og.changelogBuffer(p)` |
| Event     | `client.og.event(p)`     | `client.og.eventBuffer(p)`     |
| Launch    | `client.og.launch(p)`    | `client.og.launchBuffer(p)`    |

### Common parameters (all templates)

| Parameter        | Type                                                       | Description                                      |
|------------------|------------------------------------------------------------|--------------------------------------------------|
| `theme`          | `'dark' \| 'light' \| 'auto'`                              | Color theme                                      |
| `target`         | `'og' \| 'twitter-large' \| 'twitter-small' \| 'linkedin'` | Output size preset                               |
| `fontFamily`     | `string`                                                   | Typography preset                                |
| `bgStyle`        | `string`                                                   | `+`-separated tokens e.g. `aurora+grid+vignette` |
| `bgTone`         | `'dark' \| 'light' \| 'custom'`                            | Background tone                                  |
| `bgCustomColor`  | `string` (hex)                                             | Custom background color                          |
| `bgGradientFrom` | `string` (hex)                                             | Gradient start override                          |
| `bgGradientTo`   | `string` (hex)                                             | Gradient end override                            |
| `logo`           | `string` (URL)                                             | Absolute URL to logo image                       |
| `logoWidth`      | `number`                                                   | Logo width in px (10–400)                        |
| `logoHeight`     | `number`                                                   | Logo height in px (10–400)                       |

**Target sizes:** `og` 1200×630 · `twitter-large` 1200×628 · `twitter-small` 800×800 · `linkedin` 1200×627

### Template parameters

<details>
<summary><strong>General</strong></summary>

| Parameter     | Type           | Description           |
|---------------|----------------|-----------------------|
| `siteName`    | `string`       | Brand / website name  |
| `title`       | `string`       | Page title            |
| `description` | `string`       | Subtitle              |
| `accentColor` | `string` (hex) | Title underline color |

</details>

<details>
<summary><strong>Gradient</strong></summary>

| Parameter       | Type           | Description          |
|-----------------|----------------|----------------------|
| `siteName`      | `string`       | Subheading           |
| `title`         | `string`       | Main heading         |
| `description`   | `string`       | Paragraph            |
| `gradientFrom`  | `string` (hex) | Gradient start       |
| `gradientTo`    | `string` (hex) | Gradient end         |
| `gradientAngle` | `number`       | Direction in degrees |
| `accentColor`   | `string` (hex) | Accent color         |

</details>

<details>
<summary><strong>Blog</strong></summary>

| Parameter      | Type           | Description                  |
|----------------|----------------|------------------------------|
| `title`        | `string`       | Post title                   |
| `banner`       | `string` (URL) | Banner image                 |
| `tags`         | `string`       | Comma-separated tags (max 4) |
| `authorName`   | `string`       | Author name                  |
| `authorPhoto`  | `string` (URL) | Author photo                 |
| `authorHandle` | `string`       | Social handle                |
| `readingTime`  | `string`       | e.g. `"5 min read"`          |
| `publishDate`  | `string`       | ISO 8601 date                |
| `dateLocale`   | `string`       | BCP 47 locale                |
| `siteDomain`   | `string`       | Breadcrumb domain            |
| `accentColor`  | `string` (hex) | Accent bar color             |

</details>

<details>
<summary><strong>Minimal</strong></summary>

| Parameter     | Type           | Description                |
|---------------|----------------|----------------------------|
| `title`       | `string`       | Large heading              |
| `description` | `string`       | Subtext                    |
| `eyebrow`     | `string`       | ALL-CAPS label above title |
| `bgColor`     | `string` (hex) | Override background        |
| `textColor`   | `string` (hex) | Override text              |
| `accentColor` | `string` (hex) | Eyebrow/border color       |

</details>

<details>
<summary><strong>Article</strong></summary>

| Parameter         | Type           | Description         |
|-------------------|----------------|---------------------|
| `title`           | `string`       | Headline            |
| `excerpt`         | `string`       | Teaser              |
| `authorName`      | `string`       | Author name         |
| `authorPhoto`     | `string` (URL) | Author photo        |
| `publicationName` | `string`       | Publication name    |
| `publicationLogo` | `string` (URL) | Publication logo    |
| `readingTime`     | `string`       | e.g. `"8 min read"` |
| `publishDate`     | `string`       | ISO 8601 date       |
| `dateLocale`      | `string`       | BCP 47 locale       |
| `accentColor`     | `string` (hex) | Accent bar color    |

</details>

<details>
<summary><strong>Product</strong></summary> 

| Parameter                            | Type           | Description                 |
|--------------------------------------|----------------|-----------------------------|
| `productName`                        | `string`       | Product name                |
| `tagline`                            | `string`       | Value proposition           |
| `feature1` · `feature2` · `feature3` | `string`       | Feature bullets             |
| `badge`                              | `string`       | Pill badge e.g. `"v2 Live"` |
| `cta`                                | `string`       | CTA text                    |
| `screenshot`                         | `string` (URL) | Screenshot URL              |
| `accentColor`                        | `string` (hex) | Badge/CTA color             |

</details>

<details>
<summary><strong>Portfolio</strong></summary>

| Parameter       | Type                | Description             |
|-----------------|---------------------|-------------------------|
| `name`          | `string`            | Full name               |
| `role`          | `string`            | Job title               |
| `bio`           | `string`            | One-liner tagline       |
| `avatar`        | `string` (URL)      | Avatar URL              |
| `skills`        | `string`            | Comma-separated (max 6) |
| `githubHandle`  | `string`            | GitHub username         |
| `twitterHandle` | `string`            | Twitter handle          |
| `websiteUrl`    | `string`            | Personal site           |
| `location`      | `string`            | City/country            |
| `available`     | `'true' \| 'false'` | Show "Open to work"     |
| `accentColor`   | `string` (hex)      | Skill chips color       |

</details>

<details>
<summary><strong>Quote</strong></summary>

| Parameter     | Type           | Description     |
|---------------|----------------|-----------------|
| `quote`       | `string`       | Quote text      |
| `author`      | `string`       | Quote author    |
| `kicker`      | `string`       | Category label  |
| `accentColor` | `string` (hex) | Quote bar color |

</details>

<details>
<summary><strong>Changelog</strong></summary>

| Parameter                         | Type           | Description      |
|-----------------------------------|----------------|------------------|
| `productName`                     | `string`       | Product name     |
| `version`                         | `string`       | Release version  |
| `headline`                        | `string`       | Release headline |
| `change1` · `change2` · `change3` | `string`       | Changelog items  |
| `accentColor`                     | `string` (hex) | Accent color     |

</details>

<details>
<summary><strong>Event</strong></summary>

| Parameter     | Type           | Description           |
|---------------|----------------|-----------------------|
| `eventName`   | `string`       | Conference/event name |
| `tagline`     | `string`       | Event tagline         |
| `eventDate`   | `string`       | ISO 8601 date         |
| `dateLocale`  | `string`       | BCP 47 locale         |
| `location`    | `string`       | City/venue            |
| `host`        | `string`       | Organizer             |
| `accentColor` | `string` (hex) | Accent color          |

</details>

<details>
<summary><strong>Launch</strong></summary>

| Parameter                                  | Type           | Description          |
|--------------------------------------------|----------------|----------------------|
| `productName`                              | `string`       | Product name         |
| `punchline`                                | `string`       | Value proposition    |
| `launchDate`                               | `string`       | ISO date or freeform |
| `highlight1` · `highlight2` · `highlight3` | `string`       | Key highlights       |
| `badge`                                    | `string`       | Pill badge           |
| `accentColor`                              | `string` (hex) | Highlight color      |

</details>

---

## Badges

### Types

| Type         | URL builder                    | Fetch SVG                         |
|--------------|--------------------------------|-----------------------------------|
| Label        | `client.badge.label(p)`        | `client.badge.labelSvg(p)`        |
| Stat         | `client.badge.stat(p)`         | `client.badge.statSvg(p)`         |
| Status       | `client.badge.status(p)`       | `client.badge.statusSvg(p)`       |
| Progress     | `client.badge.progress(p)`     | `client.badge.progressSvg(p)`     |
| Score        | `client.badge.score(p)`        | `client.badge.scoreSvg(p)`        |
| Socials      | `client.badge.socials(p)`      | `client.badge.socialsSvg(p)`      |
| Tech Stack   | `client.badge.techStack(p)`    | `client.badge.techStackSvg(p)`    |
| Availability | `client.badge.availability(p)` | `client.badge.availabilitySvg(p)` |

### Badge parameters

<details>
<summary><strong>Label</strong></summary>

| Parameter    | Type               | Description            |
|--------------|--------------------|------------------------|
| `label`      | `string`           | Left text              |
| `message`    | `string`           | Right text             |
| `color`      | `string` (hex)     | Right background color |
| `labelColor` | `string` (hex)     | Left background color  |
| `style`      | `'flat' \| 'pill'` | Badge style            |

</details>

<details>
<summary><strong>Stat</strong></summary>

| Parameter | Type                                                                                | Description  |
|-----------|-------------------------------------------------------------------------------------|--------------|
| `label`   | `string`                                                                            | Metric label |
| `value`   | `string`                                                                            | Metric value |
| `unit`    | `string`                                                                            | Unit suffix  |
| `color`   | `string` (hex)                                                                      | Accent color |
| `icon`    | `'star' \| 'download' \| 'eye' \| 'fork' \| 'heart' \| 'zap' \| 'check' \| 'clock'` | Icon slug    |

</details>

<details>
<summary><strong>Status</strong></summary>

| Parameter | Type                                                   | Description           |
|-----------|--------------------------------------------------------|-----------------------|
| `label`   | `string`                                               | Service name          |
| `status`  | `'online' \| 'offline' \| 'degraded' \| 'maintenance'` | Status value          |
| `color`   | `string` (hex)                                         | Override status color |

</details>

<details>
<summary><strong>Progress</strong></summary>

| Parameter | Type           | Description          |
|-----------|----------------|----------------------|
| `label`   | `string`       | Label                |
| `value`   | `number`       | Progress 0–100       |
| `color`   | `string` (hex) | Bar color            |
| `width`   | `number`       | Width in px (80–600) |

</details>

<details>
<summary><strong>Score</strong></summary>

| Parameter | Type           | Description    |
|-----------|----------------|----------------|
| `label`   | `string`       | Label          |
| `value`   | `number`       | Score achieved |
| `max`     | `number`       | Maximum score  |
| `color`   | `string` (hex) | Ring color     |

</details>

<details>
<summary><strong>Socials</strong></summary>

| Parameter   | Type                                                                                                  | Description    |
|-------------|-------------------------------------------------------------------------------------------------------|----------------|
| `platform`  | `'github' \| 'x' \| 'bluesky' \| 'linkedin' \| 'youtube' \| 'twitch' \| 'discord' \| 'npm' \| 'pypi'` | Platform       |
| `handle`    | `string`                                                                                              | Username       |
| `followers` | `string`                                                                                              | Follower count |
| `color`     | `string` (hex)                                                                                        | Accent color   |

</details>

<details>
<summary><strong>Tech Stack</strong></summary>

| Parameter | Type              | Description                  |
|-----------|-------------------|------------------------------|
| `stack`   | `string`          | Comma-separated tags (max 8) |
| `color`   | `string` (hex)    | Tag color                    |
| `style`   | `'tags' \| 'row'` | Layout style                 |

</details>

<details>
<summary><strong>Availability</strong></summary>

| Parameter   | Type                | Description      |
|-------------|---------------------|------------------|
| `label`     | `string`            | Name or role     |
| `available` | `'true' \| 'false'` | Show green badge |
| `hireText`  | `string`            | Custom CTA text  |
| `color`     | `string` (hex)      | Accent color     |

</details>

---

## SEO Assets

### Types

| Type                       | URL builder                    | Fetch binary                         |
|----------------------------|--------------------------------|--------------------------------------|
| Favicon (32×32)            | `client.seo.favicon(p)`        | `client.seo.faviconBuffer(p)`        |
| Apple Touch Icon (180×180) | `client.seo.appleTouchIcon(p)` | `client.seo.appleTouchIconBuffer(p)` |
| Manifest Icon (192 or 512) | `client.seo.manifestIcon(p)`   | `client.seo.manifestIconBuffer(p)`   |

### Icon parameters (all SEO types)

| Parameter     | Type                                | Description           |
|---------------|-------------------------------------|-----------------------|
| `initial`     | `string`                            | 1–2 letter monogram   |
| `logo`        | `string` (URL)                      | Logo image URL        |
| `color`       | `string` (hex)                      | Background color      |
| `accentColor` | `string` (hex)                      | Foreground/text color |
| `shape`       | `'circle' \| 'square' \| 'rounded'` | Icon shape            |
| `theme`       | `'dark' \| 'light'`                 | Color theme           |

`manifestIcon` also accepts `size: '192' | '512'`.

---

## Save to file (Node.js)

```typescript
import {writeFileSync} from 'fs';
import {SocialCardClient} from 'social-card-sdk';

const client = new SocialCardClient();

// OG image → PNG
const ogBuffer = await client.og.generalBuffer({
  title: 'My Page',
  description: 'Built with Social Card SDK',
});
writeFileSync('og-image.png', Buffer.from(ogBuffer));

// Badge → SVG
const svg = await client.badge.labelSvg({
  label: 'build',
  message: 'passing',
  color: '#22c55e',
});
writeFileSync('badge.svg', svg, 'utf8');

// Favicon → ICO
const faviconBuffer = await client.seo.faviconBuffer({
  initial: 'OG',
  color: '#6366f1',
});
writeFileSync('favicon.ico', Buffer.from(faviconBuffer));

// Apple Touch Icon → PNG
const touchIconBuffer = await client.seo.appleTouchIconBuffer({
  initial: 'OG',
  color: '#6366f1',
  shape: 'rounded',
});
writeFileSync('apple-touch-icon.png', Buffer.from(touchIconBuffer));
```

---

## TypeScript

All parameters are fully typed. Import types as needed:

```typescript
import type {
  // OG
  GeneralParams, BlogParams, ArticleParams, ProductParams,
  PortfolioParams, QuoteParams, ChangelogParams, EventParams, LaunchParams,
  GradientParams, MinimalParams, OgTemplateName, TargetPlatform,
  // Badges
  LabelParams, StatParams, StatusParams, ProgressParams,
  ScoreParams, SocialsParams, TechStackParams, AvailabilityParams, BadgeName,
  // SEO
  FaviconParams, AppleTouchIconParams, ManifestIconParams, SeoAssetType,
} from 'social-card-sdk';
```

---

## Error handling

```typescript
try {
  const buffer = await client.og.generalBuffer({title: 'Test'});
} catch (error) {
  if (error instanceof Error) {
    console.error('Social Card error:', error.message);
  }
}
```

---

## Links

- **Live demo**: https://social-card.mfaouzi.com
- **GitHub**: https://github.com/faouziMohamed/social-card
- **Issues**: https://github.com/faouziMohamed/social-card/issues
- **npm**: https://www.npmjs.com/package/social-card-sdk

## License

MIT © [Mohamed Faouzi](https://github.com/faouziMohamed)
