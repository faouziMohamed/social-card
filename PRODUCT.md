# Product

## Register

product

## Users

Developers building web apps, SaaS tools, or blogs who need beautiful social preview images without a design workflow. They work in terminals and code editors, integrate URLs directly into `<meta>` tags or `generateMetadata()` calls, and care about correctness and speed over polish.

## Product Purpose

Social Card is a self-hostable OG image generator that exposes 7 template variants as a REST API (edge-runtime, zero cold start). Developers drop a URL into their meta tags and get a 1200×630 PNG instantly. The builder UI lets them visually configure parameters and copy the final URL. Success = developer pastes one URL and ships.

## Brand Personality

Technical, precise, no-fluff. Like a great CLI tool: does exactly what it says, instantly, with zero ceremony.

## Anti-references

- Canva / generic design tools (too visual, too much UI chrome)
- Figma-style drag-and-drop (wrong paradigm — developers want params, not handles)
- Dark neon dashboards with glowing everything (looks cool, communicates nothing)

## Design Principles

1. **The form IS the product.** Form fields must feel instant and trustworthy — any lag breaks confidence.
2. **Show before configure.** Preview is primary; parameters are secondary.
3. **No dead ends.** Every state (loading, error, empty) should feel intentional.
4. **Developer defaults.** Monospace where precision matters, terse labels, no marketing copy inside tools.

## Accessibility & Inclusion

WCAG AA as baseline. Keyboard navigable. Reduced-motion respected via `prefers-reduced-motion`.
