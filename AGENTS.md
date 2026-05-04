<!-- BEGIN:nextjs-agent-rules -->

# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read
the relevant guide in `node_modules/next/dist/docs/` before writing any code. Heed deprecation notices.

## Project structure

| Path                      | What it is                                                                                          |
| ------------------------- | --------------------------------------------------------------------------------------------------- |
| `src/app/`                | App Router entry points and global UI shell: `layout.tsx`, `page.tsx`, `globals.css`, `favicon.ico` |
| `src/app/api/`            | API route handlers (`og/`, `badge/`, `seo/`)                                                        |
| `src/app/builder/`        | Interactive OG/badge/SEO builder UI (`/builder` page)                                               |
| `src/app/docs/`           | API reference docs page (`/docs`)                                                                   |
| `src/assets/fonts/`       | Local font files (`.woff2`, `.ttf`, `.otf`) loaded by `og-fonts.server.ts` for Satori rendering     |
| `src/proxy.ts`            | Request-path header shim that sets `x-current-path`                                                 |
| `src/lib/env.ts`          | Deployment URL resolution (`NEXT_PUBLIC_DEPLOYMENT_URL` → Vercel → `localhost:3000`)                |
| `src/lib/logger/`         | Server logger, client logger, and client-log server action forwarding                               |
| `src/lib/utils/routes.ts` | `ROUTES` (raw paths) — always use these, never hardcode paths                                       |
| `src/modules/`            | Feature modules; each follows `client/` · `server/` · `shared/` layout                              |
| `src/components/ui/`      | shadcn/ui component library — add/modify components here                                            |
| `src/components/shared/`  | Cross-module reusable React components                                                              |
| `public/`                 | Static assets used by the app                                                                       |
| `ops/scripts/`            | Repo automation scripts (`bootstrap.sh`, `download-fonts.py`)                                       |
| `package.json`            | Project scripts and dependency manifest                                                             |
| `next.config.ts`          | Next.js config; currently only `reactCompiler: true`                                                |
| `eslint.config.mts`       | Flat ESLint config for Next.js, TypeScript, and repo rules                                          |
| `Makefile`                | Convenience targets like `help`, `bootstrap`, `test`, `typecheck`                                   |

- Use the App Router files in `src/app/`: `layout.tsx` owns the root `Metadata`
  and `next/font/google` setup, and `page.tsx` is the current landing page.
- The request-path header shim lives in `src/proxy.ts` (not `middleware.ts`); it
  sets `x-current-path` and excludes `/api`, `/_next/static`, `/_next/image`,
  and `favicon.ico`.
- `src/lib/env.ts` resolves the deployment base URL: `NEXT_PUBLIC_DEPLOYMENT_URL`
  (explicit) → `NEXT_PUBLIC_VERCEL_URL` (auto-set by Vercel) → `http://localhost:3000`.
  Import `env.deploymentURL` or `getDeploymentUrl()` — never hardcode domains.
  There are no other required env vars; the app runs without a `.env` file locally.
- Logging is split between `src/lib/logger/logger.ts` for server code and
  `src/lib/logger/client-logger.ts` for client code; do not import the server
  logger into client components.
- This project uses **pnpm**. Use `pnpm run dev`, `pnpm run build`,
  `pnpm run start`, `pnpm run lint`, `pnpm run lint:fix`, `pnpm run format`,
  and `pnpm run test` (runs `node --test --import tsx`).
  `make bootstrap` runs `ops/scripts/bootstrap.sh`.
- `next.config.ts` currently only enables `reactCompiler: true`; keep that in
  mind when editing Next config.

## Module Architecture

All feature code lives in `src/modules/<domain>/` with a strict three-layer
split (no `server-actions/` layer in this project):

| Sub-folder | Runs in | Contents                                                                       |
| ---------- | ------- | ------------------------------------------------------------------------------ |
| `client/`  | Browser | React Query hooks (`use-*.queries.ts`), client components, client repos        |
| `server/`  | Server  | Server-side renderers, handler factories, API repositories                     |
| `shared/`  | Both    | Types, schemas (Zod), routes, registries — no runtime imports from either side |

Current domains: `og` · `badge` · `seo` · `http`

**Naming conventions:**

- React Query hooks: `use-<resource>[-<verb>].queries.ts` (e.g.
  `use-study-mutations.queries.ts`)
- Server actions: `<resource>-mutations.action.ts`
- Server-side API repos: `<resource>-api.repository.ts`
- Type files: `<domain>.types.ts`
- Tests: co-located as `<file>.test.ts` alongside the source file

**HTTP layer:**

- Client components call the Axios client from
  `src/modules/http/client/api-client.repository.ts`
- Server code uses `src/modules/http/server/backend-client.ts`
- Never import `api-client.repository.ts` in server code or
  `backend-client.ts` in client components.

## Domain Architecture

### OG Image Module (`src/modules/og/`)

Every OG API route (`src/app/api/og/<template>/route.tsx`) is one line:

```typescript
export const GET = createOgHandler(generalSchema, generalRenderer);
```

- **`createOgHandler`** (`og-handler.server.ts`) — factory that parses query params
  with Zod, resolves theme/fonts/target-size, pre-fetches image URLs to base64,
  then renders via `next/og`'s `ImageResponse` (Satori). Never use `export const runtime = 'edge'`.
- **Renderers** (`server/renderers/<name>.renderer.tsx`) — pure functions:
  `(params: TParams, ctx: OgRendererContext) => React.ReactElement`. Satori only
  supports a subset of CSS; use inline styles, no Tailwind classes in renderers.
- **Schemas** (`shared/og-schemas.ts`) — one `z.object().merge(baseSchema)` per
  template. `baseSchema` provides `theme`, `target`, `fontFamily`, `bgStyle`, `logo`, etc.
- **`bgStyle`** (`shared/og-schemas.ts`, `server/og-visuals.server.ts`) — composable
  `+`-separated tokens. Base layers: `solid | gradient | aurora | mesh`.
  Overlay layers: `grid | dots | diagonal | noise | spotlight | vignette`.
  Example: `bgStyle=aurora+grid+vignette`. Parsed by `composeBackgroundStyleWithTone`.
- **Routes** — use `OG_ROUTES` from `shared/og-routes.ts` or `ROUTES.api.og` from
  `src/lib/utils/routes.ts`; never hardcode paths.
- **URL builder** — `buildOgUrl(deploymentURL, { template, ...params })` from
  `shared/og-query.ts` — safe for both client and server.
- **Templates**: `general` · `gradient` · `blog` · `minimal` · `article` · `product`
  · `portfolio` · `quote` · `changelog` · `event` · `launch`
- **Target sizes** (`shared/og-schemas.ts`): `og` (1200×630) · `twitter-large` (1200×628)
  · `twitter-small` (800×800) · `linkedin` (1200×627)
- **Fonts** — local `.woff2`/`.ttf`/`.otf` files in `src/assets/fonts/`, catalogued
  in `shared/og-font-catalog.ts`. Run `python ops/scripts/download-fonts.py` to
  fetch new font files.
- **Theme palette** — `resolveTheme(theme)` from `server/og-themes.server.ts` returns
  a `ThemePalette` with `bg`, `text`, `textMuted`, `border`, `tagBg`, `tagText`.

**Render utilities** (`server/og-render.server.ts`):

- `clampStyle(n)` — webkit line-clamp CSS for Satori
- `hexToRgba(hex, alpha)` — hex to rgba string
- `getContrastColor(hex)` — WCAG luminance → `'#111111'` or `'#ffffff'`

**To add a new OG template:**

1. Add `TemplateName` union in `shared/og.types.ts`
2. Add schema in `shared/og-schemas.ts` (extend `baseSchema`)
3. Add renderer in `server/renderers/<name>.renderer.tsx`
4. Add route `src/app/api/og/<name>/route.tsx` with one-liner
5. Add entry to `OG_ROUTES`, `TEMPLATE_META`, `TEMPLATE_SECTIONS`, `EXAMPLE_PARAMS` in shared files

### Badge Module (`src/modules/badge/`)

```typescript
export const GET = createBadgeHandler(labelSchema, labelRenderer);
```

- **`createBadgeHandler`** (`server/badge-handler.server.ts`) — Zod parsing + SVG
  response (`Content-Type: image/svg+xml`). No Satori dependency — badges are
  pure SVG string generation.
- **Badge types**: `label` · `stat` · `status` · `progress` · `score` · `socials`
  · `tech-stack` · `availability`
- **Routes** — use `BADGE_ROUTES` from `shared/badge-routes.ts`

### SEO Assets Module (`src/modules/seo/`)

- Generates favicons, Apple touch icons, PWA manifest icons, Twitter cards.
- **SEO types**: `favicon` · `apple-touch-icon` · `manifest-icon` · `twitter-card`
- **Routes** — use `SEO_ROUTES` from `shared/seo-routes.ts`

## Code Organization Rule (Non-Negotiable)

**Exported declarations must be placed at the TOP of files whenever possible.**

When reading a file, developers should see the actual exported code first, not
scroll to the bottom. Place exported functions, classes, types, and constants at
the top of the file. Dependencies and helper functions that cannot be hoisted
should be placed below.

**Good:**

```typescript
export function MainFeature() {
  return helperFunction();
}

function helperFunction() {
  // ...
}
```

**Bad:**

```typescript
function helperFunction() {
  // ...
}

export function MainFeature() {
  return helperFunction();
}
```

**Exception:** Some things cannot be hoisted due to initialization order (e.g.,
classes that extend other classes, functions that use variables). That's
acceptable. The rule is: **place exports as high as possible in the file**.

## Non-Negotiable Rules for Development

### 1. Plan Before Coding

Describe your approach and wait for approval before writing code. This ensures
alignment and prevents rework.

### 2. Clarify Ambiguity

Ask before writing code when requirements are unclear. Don't assume or guess
implementation details.

### 3. No `router.refresh()` in Client Components

Use optimistic updates combined with `invalidateQueries` to keep the UI in sync.
`router.refresh()` causes unnecessary server round-trips and defeats optimistic
updates. Let React Query handle state synchronization instead.

### 4. Never Spread DTOs into RHF `defaultValues`

Explicitly map DTO fields to React Hook Form `defaultValues`. This prevents
unexpected field bindings and ensures type safety.

**Good:**

```typescript
const {control} = useForm({
  defaultValues: {
    firstName: user.firstName,
    lastName: user.lastName,
    email: user.email,
  },
});
```

**Bad:**

```typescript
const {control} = useForm({
  defaultValues: {...user}, // spreading DTO directly
});
```

### 5. Never Use HTML Modals/Dialogs/Alerts

Always use shadcn/ui components (`AlertDialog`, `Dialog`, `Sheet`, etc.) for
modals, dialogs, alerts, confirmations, and prompts. Native HTML APIs (
`window.alert`, `window.confirm`, `window.prompt`, `<dialog>`) are forbidden
unless absolutely necessary.

**Good:**

```typescript jsx
<AlertDialog>
  <AlertDialogTrigger>Delete</AlertDialogTrigger>
  <AlertDialogContent>
    <AlertDialogTitle>Are you sure?</AlertDialogTitle>
    <AlertDialogAction>Delete</AlertDialogAction>
  </AlertDialogContent>
</AlertDialog>
```

**Bad:**

```typescript
if (window.confirm('Delete?')) {
  // ...
}
```

### 6. Never Run Git Write Operations Without Explicit Instruction

Do **not** run `git add`, `git commit`, `git stash`, `git push`, `git reset`,
or any other git write operation unless the user explicitly asks you to commit
or save to git. This includes partial commits, "quick saves", or staging
files as part of a task. Read-only git commands (`git log`, `git diff`,
`git status`) are fine at any time.

### 7. Announce Skills Before Using Them on Long-Running Tasks

Before invoking any skill for a long-running or multi-step task, explicitly
tell the user which skill you are about to use and why. Do not silently invoke
skills. This allows the user to intervene before a skill takes over.

**Good:**

> "I'm going to use the `writing-plans` skill to turn the approved spec into
> a detailed implementation plan."

**Bad:** Invoking a skill without any prior announcement.

This rule applies to: `writing-plans`, `executing-plans`, `subagent-driven-development`,
`dispatching-parallel-agents`, `test-driven-development`, and any other skill that
drives implementation work.

### 8. Skip Heavy Plan Docs — Code Directly

Do **not** write full implementation code inside markdown plan files. Plans
should be brief outlines (approach + file list), then code immediately.
Put details in code comments, not in plan files. Writing code twice
(once in a plan, once in the codebase) wastes tokens and introduces drift.

**Good:** Brief plan outline → code with inline comments
**Bad:** Full code blocks in a `.md` plan file → copy-paste into source

### 9. Never Use Edge Runtime

Do **not** add `export const runtime = 'edge'` to any route. Use the default
Node.js runtime. Edge strips Node.js APIs (`Buffer`, `fs`, crypto, etc.) which
breaks image processing, font loading, and any server utility. The performance
gains are marginal and the compatibility cost is high.

### 10. Never Use Native HTML Interactive Elements

**All interactive UI must use library components — never raw HTML elements.**

| Element                                      | Use instead                                                |
| -------------------------------------------- | ---------------------------------------------------------- |
| `<input>`, `<textarea>`                      | `Input`, `Textarea` from `src/components/ui/`              |
| `<select>`, `<option>`                       | `Select` / `SelectContent` / `SelectItem` from shadcn/ui   |
| `<input type="date">`                        | `Calendar` + `Popover` from shadcn/ui (`react-day-picker`) |
| `<button>`                                   | `Button` from `src/components/ui/button.tsx`               |
| `<dialog>`, `window.alert`, `window.confirm` | `Dialog`, `AlertDialog`, `Sheet` from shadcn/ui            |
| `<label>`                                    | `Label` from `src/components/ui/label.tsx`                 |

**Icons:** use `lucide-react` (already installed) or `react-icons` — never inline SVG or emoji substitutes for interactive icons.

**When a needed component does not exist** in `src/components/ui/`, scaffold it from [@radix-ui](https://www.radix-ui.com/) primitives or react-day-picker following the existing shadcn pattern, then import it.

**Good:**

```typescript jsx
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { CalendarIcon } from "lucide-react";

<Popover>
  <PopoverTrigger asChild>
    <Button variant="outline"><CalendarIcon className="h-4 w-4" /> Pick date</Button>
  </PopoverTrigger>
  <PopoverContent><Calendar mode="single" /></PopoverContent>
</Popover>
```

**Bad:**

```typescript jsx
<input type="date" onChange={...} />
<select onChange={...}><option>...</option></select>
<button onClick={...}>Click</button>
```

<!-- END:nextjs-agent-rules -->

### 11. Max File Size — 300 Lines

**No `.ts` or `.tsx` file may exceed 300 lines.** When a file grows beyond 300 lines, split it immediately.

**Strategy:**

- Extract logical groups (types, constants, helpers, sections) into separate files
- Keep the original as a barrel file with re-exports if needed for backwards compatibility
- Name split files descriptively: `*-types.ts`, `*-sections.ts`, `*-constants.ts`, `*-helpers.ts`, `*-utils.ts`
- For large data/constants, split by category: `*-sans.ts`, `*-serif.ts`, etc.

**Exceptions (up to 400 lines):**

- Satori renderers (`*.renderer.tsx`) — visual markup is inherently verbose
- shadcn/ui component files — auto-generated from Radix primitives

**Do NOT use token-intensive skills** for refactoring — just split the code directly. You can use sub-agents for parallel work on independent files.
