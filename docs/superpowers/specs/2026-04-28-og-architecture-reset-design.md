# OG Generator Architecture Reset Design

## Problem

The current OG generator is feature-rich but structurally scattered. Product logic is split across:

- `src/app/` page files
- `src/components/` product-specific components
- `src/lib/` OG-specific schemas, rendering helpers, themes, and route knowledge

That makes the app harder to evolve because the same product knowledge is duplicated across landing, builder, docs, and API routes. The milestone goal is an architecture-first reset that aggressively realigns the codebase with the repo conventions, without preserving backward compatibility.

## Goals

1. Establish a first-class `src/modules/og/` domain with clear `client/`, `server/`, and `shared/` boundaries
2. Make `src/app/` pages and API routes thin entrypoints
3. Create one source of truth for template metadata, schema definitions, defaults, and docs descriptors
4. Remove duplicated OG logic across landing, builder, docs, and API surfaces
5. Leave the codebase ready for subsequent feature-completion and polish work without another structural rewrite

## Non-Goals

1. Preserving existing query parameter shapes, builder behavior, or route contracts for compatibility
2. Forcing unrelated domains into the same refactor if they are not part of the OG generator product surface
3. Adding infrastructure abstractions that do not materially improve clarity or boundaries

## Proposed Architecture

### Module layout

Create a dedicated OG feature domain:

```text
src/modules/og/
  client/
    components/
    hooks/
    builders/
  server/
    renderers/
    repositories/
    services/
  shared/
    og.types.ts
    og-template-registry.ts
    og-schemas.ts
    og-docs.ts
    og-routes.ts
    og-query.ts
```

### Responsibility split

#### `src/modules/og/shared/`

Shared, pure, cross-surface OG definitions:

- template ids and labels
- route slugs / endpoint metadata
- Zod schemas
- default params
- builder field descriptors
- docs descriptors
- query-string parsing and serialization helpers
- shared OG types

This layer becomes the single source of truth for the product contract.

#### `src/modules/og/server/`

Server-only OG behavior:

- font loading
- theme resolution
- render utilities
- per-template renderers
- route handler factories / template dispatch
- normalized error response helpers

Each template should have a consistent server boundary:

1. schema
2. template metadata
3. renderer

#### `src/modules/og/client/`

Client-side OG builder behavior:

- builder state normalization
- template selection logic
- preview URL generation
- field rendering helpers
- builder-specific client components or hooks

This layer may consume shared template metadata, but must not own server rendering logic.

## App-Shell Boundaries

### `src/app/`

App Router files become thin shells only:

- landing page composes product content from OG shared metadata
- builder page renders a builder entry surface from `src/modules/og/client/`
- docs page renders prepared docs content from `src/modules/og/shared/`
- API route files map request entrypoints to OG server handlers

Page files should not inspect raw schemas, own template lists, or implement product logic directly.

### `src/components/`

Keep only:

- generic shadcn/ui primitives in `src/components/ui/`
- truly reusable cross-domain components in `src/components/shared/`

Any OG-specific builder/docs/presentation component should live under `src/modules/og/client/` unless it is demonstrably reusable outside the domain.

### `src/lib/`

Keep only genuine cross-app infrastructure:

- environment loading/validation
- logger
- generic utility helpers like class name merging

Move OG-specific items out of `src/lib/`, including schemas, themes, font loading, OG URL helpers, and OG route metadata.

## Single Source of Truth

Introduce a shared template registry, exported from `src/modules/og/shared/`, containing per-template definitions:

- template id
- marketing label
- endpoint slug
- schema
- default query params
- builder field configuration
- preview/demo metadata
- docs metadata
- renderer binding key

All product surfaces should read from this registry:

1. **Builder** for template options, form fields, defaults, and preview URL construction
2. **Docs** for endpoint cards, param tables, and example URLs
3. **Landing page** for template feature cards and live preview strips
4. **API routes / server renderers** for template dispatch and validation wiring

This removes the current duplication between:

- route constants
- landing page template lists
- builder template definitions
- docs examples
- schema declarations
- route handlers

## Data Flow

### Builder

1. Builder reads the shared template registry
2. Selected template resolves field config and defaults from shared metadata
3. Builder serializes state via shared query helpers
4. Preview URL is built from shared route/query metadata
5. Preview panel renders the selected template response

The builder should no longer hardcode target options, template behavior, or form semantics in page-level or ad hoc component code.

### Docs

1. Docs page imports prepared docs descriptors from shared OG metadata
2. Docs renders endpoint path, parameter definitions, and example URLs from that descriptor
3. Docs avoids raw Zod introspection directly in the page layer

If schema-derived docs are still desired, that derivation should happen in the OG shared layer, not inline in `src/app/docs/page.tsx`.

### API routes

1. Route file receives request
2. Route file delegates to OG server handler or template-specific factory
3. Shared server code validates query params against the template schema
4. Shared server code resolves target size, fonts, theme, and response headers
5. Template renderer returns `ImageResponse`
6. Shared server error handling formats failures consistently

## Error Handling

### API responses

All OG endpoints should use one consistent error shape for:

- validation failures
- runtime rendering failures
- asset/font loading failures

The route layer should not hand-roll per-template JSON error responses.

### Builder preview

The preview UX should distinguish:

1. invalid parameters
2. render/runtime failures
3. network or asset failures

The current generic “preview unavailable” style is acceptable only as a fallback, not the sole error state.

### Docs integrity

Example URLs should be generated from valid defaults in shared metadata so docs cannot silently drift from supported params.

## Migration Rules

This milestone is a replace-in-place reset, not a compatibility-preserving migration.

1. Remove outdated structures instead of aliasing them
2. Rename or reshape routes/params if it materially improves clarity
3. Fix correctness issues discovered during the refactor instead of preserving them
4. Do not introduce compatibility shims solely to protect the current implementation

## Cleanup Rules

### Keep

- generic UI primitives
- cross-app infrastructure
- thin page composition

### Remove or relocate

- OG-specific code in `src/lib/`
- OG-specific product components in top-level `src/components/`
- page-owned schema introspection
- duplicated template definitions across landing, builder, docs, and routes
- mixed client/server concerns in the same product surface

## Expected Outcome

At the end of the architecture-first milestone, the codebase should have:

1. one OG domain in `src/modules/og/`
2. thin `src/app/` entrypoints
3. one source of truth for template definitions
4. clear client/server/shared boundaries
5. no duplicated OG product logic across the main surfaces
6. a stable structural base for later feature completion and polish

## Risks and Trade-offs

### Benefits

- clearer ownership boundaries
- lower duplication
- easier feature iteration
- easier testing and reasoning
- less architectural drift between pages and API handlers

### Costs

- larger up-front refactor scope
- intentional breaking changes to current structure and behavior
- temporary churn while moving components and shared contracts

These trade-offs are acceptable because the requested milestone explicitly prioritizes the cleanest architecture over backward compatibility.
