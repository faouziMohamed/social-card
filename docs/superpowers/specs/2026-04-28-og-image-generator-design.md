# OG Image Generator — Design Specification

## Problem Statement

Build a self-hostable, API-first Open Graph & Social Meta Image Generator deployed on Vercel Edge Network. The service exposes HTTP endpoints returning rendered PNG images (1200×630 OG, 800×800 Twitter-small, etc.) via URL query parameters. An interactive Builder UI lets operators preview and copy the final URL without writing code.

External apps embed URLs like:

```
https://og.yourdomain.com/api/og/general?title=Hello+World&description=...&theme=dark
```

directly into `<meta property="og:image">` tags.

---

## Architecture

### Runtime Split

- **API image routes** (`src/app/api/og/*/route.tsx`): Edge Runtime (`export const runtime = 'edge'`), `@vercel/og` / Satori, font `ArrayBuffer` loaders
- **App UI** (landing, builder, docs): Node.js runtime, React Server Components + client islands

### Module Structure (AGENTS.md — non-negotiable)

```
src/
├── app/
│   ├── layout.tsx          # Root layout: fonts, ThemeProvider, metadata
│   ├── page.tsx            # Landing page
│   ├── globals.css         # Tailwind v4 imports + CSS variables
│   ├── builder/page.tsx    # Interactive Builder (Suspense-wrapped client island)
│   ├── docs/page.tsx       # Auto-generated docs from Zod schemas
│   └── api/og/
│       ├── general/route.tsx
│       ├── blog/route.tsx
│       ├── gradient/route.tsx
│       ├── minimal/route.tsx
│       ├── article/route.tsx
│       ├── product/route.tsx
│       └── portfolio/route.tsx
├── components/
│   ├── ui/                 # shadcn/ui components
│   ├── shared/             # cross-module reusables (ThemeToggle, OgPreview)
│   ├── builder/            # BuilderForm, PreviewPanel, TemplateSelector, CopyButton
│   ├── docs/               # EndpointCard, ExamplePreview
│   └── layout/             # Navbar, Footer
├── lib/
│   ├── env.ts              # Deployment URL resolver
│   ├── fonts.ts            # next/font/google (Inter, Syne, JetBrains Mono)
│   ├── og-fonts.ts         # ArrayBuffer loaders for Satori
│   ├── og-helpers.ts       # buildOgUrl() — used in generateMetadata()
│   ├── schemas.ts          # Zod schemas for all 7 templates
│   ├── themes.ts           # ThemePalette definitions
│   ├── utils/
│   │   ├── cn.ts           # clsx + tailwind-merge
│   │   └── routes.ts       # ROUTES constant
│   └── logger/
│       ├── logger.ts       # Server logger (pino) — already exists
│       ├── client-logger.ts # Client logger (console-based, forwards to server)
│       └── index.ts        # Re-exports
└── modules/
    └── http/
        ├── client/api-client.repository.ts
        └── server/backend-client.ts
```

---

## Logger Architecture (src/lib/logger/)

Three-file split:

### `logger.ts` (server only — Node.js + Edge compatible)

- **Already exists** with pino + pino-pretty
- Used in API route handlers for request logging, validation errors, font failures
- Log structure: `{ template, params, error?, durationMs }`

### `client-logger.ts` (browser safe)

- Wraps `console.*` with structured log levels (debug/info/warn/error)
- In production, batches logs and forwards to `/api/logs` server action
- Never imports pino (browser-incompatible)

### `index.ts`

- Re-exports `logger` from `logger.ts` under a server-only guard
- Provides a `getLogger(context)` child logger factory

---

## Dark Mode

- **ThemeProvider** wraps the root layout using `next-themes`
- HTML attribute strategy: `class` (Tailwind `darkMode: 'class'`)
- Default: `dark` (developer-facing tool; most users in dim environments)
- **ThemeToggle** button in Navbar: Sun/Moon icon (lucide-react), shadcn `Button` variant="ghost"
- Toggle switches between `dark` and `light` classes on `<html>`
- OG image theme param (`?theme=dark|light`) is independent of app UI theme

---

## 7 API Templates

All routes:

- `export const runtime = 'edge'`
- `GET` → `ImageResponse` (PNG)
- Validate via Zod `baseSchema` + template-specific schema
- Invalid params → `400 JSON` (`z.flatten()`)
- Internal errors → `500 JSON`
- Cache-Control: `public, max-age=86400, stale-while-revalidate=604800`

| Template    | Key Params                                             | Unique Feature                   |
| ----------- | ------------------------------------------------------ | -------------------------------- |
| `general`   | title, siteName, description, accentColor              | Logo circle + accent underline   |
| `gradient`  | title, gradientFrom, gradientTo, gradientAngle         | Gradient text via backgroundClip |
| `blog`      | title, banner, tags, authorName, authorPhoto           | Two-column with banner fade      |
| `minimal`   | title, eyebrow, fontFamily, bgColor, textColor         | Clean typography-only            |
| `article`   | title, excerpt, authorName, publicationName            | 8px left accent bar              |
| `product`   | productName, tagline, features, badge, cta, screenshot | Diagonal clip screenshot         |
| `portfolio` | name, role, skills, social handles, bgStyle            | Avatar glow + skills chips       |

### Platform Dimensions

| target          | Width | Height |
| --------------- | ----- | ------ |
| `og` (default)  | 1200  | 630    |
| `twitter-large` | 1200  | 628    |
| `twitter-small` | 800   | 800    |
| `linkedin`      | 1200  | 627    |

---

## Zod Validation Layer

`src/lib/schemas.ts` exports:

- `baseSchema` — theme, target, logo, logoWidth, logoHeight
- `generalSchema`, `gradientSchema`, `blogSchema`, `minimalSchema`, `articleSchema`, `productSchema`, `portfolioSchema`
- Each template schema = `z.object({ ...specific }).merge(baseSchema)`
- All schemas use `.describe()` on fields for auto-generated docs

---

## Builder UI

Client component island (`'use client'`), wrapped in `<Suspense>` from server layout.

Features:

1. **Template Selector** — scrollable card grid, 7 templates with thumbnails
2. **Dynamic Form** — fields change per template (RHF + Zod resolver)
3. **Live Preview** — `<img src="/api/og/[template]?...">`, debounced 300ms
4. **URL Display** — readonly input + Copy button
5. **Platform Target Toggle** — OG / Twitter Large / Twitter Square / LinkedIn segmented control
6. **Theme Toggle** — dark/light for app UI (shadcn ThemeToggle in Navbar)
7. **Preset Themes** — curated param presets per template ("Neon", "Editorial", "Minimal")
8. **Share Button** — copies Builder URL (nuqs-encoded state)

State lives in URL via `nuqs` — shareable Builder URLs.

---

## App UI Design System — DevOps/Mechanical Theme

Ported from `dev.mfaouzi.com`. All CSS tokens, utility classes, and component patterns follow this project exactly.

### Color Tokens (OKLCH)

**Dark mode "Night Vision":**

- `--background: oklch(0.09 0.015 250)` — very dark navy
- `--primary: oklch(0.75 0.15 195)` — neon cyan
- `--secondary: oklch(0.7 0.18 35)` — vibrant orange
- `--terminal-green`, `--terminal-amber` — status colors

**Light mode "High Visibility":**

- `--background: oklch(0.98 0.005 250)` — cool white
- `--primary: oklch(0.55 0.15 200)` — professional teal-cyan

### Fonts

- **Body/UI**: Geist + Geist Mono (matching reference project, already used in layout)

### Custom CSS Utilities (copied from reference)

- `.mechanical-corners` — circuit-board corner accents on cards and buttons
- `.experience-card` — left cyan bar + `translateY(-4px)` lift on hover
- `.status-indicator` + `.status-success/warning/error/info` — animated pulsing dots
- `.circuit-pattern` — 40px grid overlay for hero backgrounds
- `.terminal-prompt` / `.terminal-error` — mono-styled terminal text
- `.glow-primary` / `.glow-secondary` — box-shadow glow effects

### Theme Switcher

- Three options: **Night Vision** (dark), **High Visibility** (light), **Auto Detect** (system)
- Dropdown with `mechanical-corners` class and primary-tinted border
- `next-themes` with `attribute="class"`, `defaultTheme="system"`, `storageKey="theme"`

### Landing Sections

1. Hero: Geist Bold heading, `.circuit-pattern` background overlay, "Open Builder" + "View Docs" CTAs
2. Demo strip: 3 live `<img>` previews using actual API URLs, `.experience-card` styling
3. Feature grid: 7 template cards with `.mechanical-corners`, `.status-indicator` active dot
4. Quick-start: terminal-styled code block (`.terminal-prompt`) per language (HTML, Next.js, cURL, Node.js, Python, PHP, Go, Ruby)
5. Footer: GitHub link

---

## Docs Page

Auto-generated from Zod schemas + `.describe()` metadata:

- Per-template: endpoint URL, parameter table (name/type/default/description), live preview image, copyable example URL
- Multi-language examples: HTML, Next.js App Router, Next.js Pages Router, cURL, Node.js fetch, Python requests, PHP

---

## next.config.ts

```typescript
{
  images: { unoptimized: true },
  headers: [{ source: '/api/og/:path*', headers: [CORS + Cache-Control] }]
}
```

---

## Key Constraints

- **No `router.refresh()`** in client components
- **Never spread DTOs** into RHF `defaultValues`
- **Never use HTML modals** — shadcn/ui only
- **Exports at top of files** always
- **No CSS variables in Satori JSX** — inline hex only
- **`display: flex`** on every Satori container
- **No `gap` shorthand** in Satori — use `columnGap`/`rowGap`
- **No `border-radius` on `<img>`** in Satori — wrap in `<div>` with overflow hidden
- All text ≥ 16px in OG templates (legibility at thumbnail size)
- Minimum 60px outer padding in all OG templates

---

## Multi-Language Integration Examples (Docs + UI)

Show in the docs page and landing quick-start:

| Language      | Approach                            |
| ------------- | ----------------------------------- |
| HTML          | Static `<meta>` tags                |
| Next.js App   | `generateMetadata()` with URL class |
| Next.js Pages | `getStaticProps` + `<Head>`         |
| cURL          | `-G --data-urlencode` flags         |
| Node.js       | `fetch()` + Buffer                  |
| Python        | `requests.get()` with `params=`     |
| PHP           | `http_build_query()` + meta echo    |
| Go            | `url.Values{}` + `net/http`         |
| Ruby          | `URI::HTTP.build` + meta tag        |

---

## Environment Variables

```env
NEXT_PUBLIC_DEPLOYMENT_URL=https://og.yourdomain.com
```

Fallback chain: explicit URL → Vercel auto-URL → `http://localhost:3000`

---

## Implementation Order

1. Logger: client-logger.ts + index.ts
2. routes.ts (ROUTES constant)
3. themes.ts
4. schemas.ts (Zod, all 7 templates)
5. og-helpers.ts
6. All 7 API route handlers
7. shadcn components init + add
8. ThemeProvider + ThemeToggle component
9. Root layout.tsx (fonts, ThemeProvider, metadata)
10. globals.css (Tailwind v4 + dark mode CSS vars)
11. Navbar + Footer
12. Landing page (page.tsx)
13. Builder components
14. Builder page (builder/page.tsx)
15. Docs page (docs/page.tsx)
16. next.config.ts
17. vercel.json
