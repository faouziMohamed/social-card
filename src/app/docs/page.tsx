import Link from "next/link";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { EndpointCard } from "@/modules/og/client/components/endpoint-card";
import { ApiEndpointCard } from "@/components/shared/ApiEndpointCard";
import { getParamDescriptors } from "@/modules/og/shared/og-docs";
import { getBadgeParamDescriptors } from "@/modules/badge/shared/badge-docs";
import { getSeoParamDescriptors } from "@/modules/seo/shared/seo-docs";
import { EXAMPLE_PARAMS } from "@/modules/og/shared/og-template-registry";
import { OG_ROUTES } from "@/modules/og/shared/og-routes";
import { BADGE_ROUTES } from "@/modules/badge/shared/badge-routes";
import { SEO_ROUTES } from "@/modules/seo/shared/seo-routes";
import { env } from "@/lib/env";
import { ROUTES } from "@/lib/utils/routes";
import type { TemplateName } from "@/modules/og/shared/og.types";
import type { BadgeName } from "@/modules/badge/shared/badge-schemas";
import type { SeoTemplateName } from "@/modules/seo/shared/seo-schemas";

export const metadata = {
  title: "Docs — OG Graph",
  description: "API documentation for OG images, SVG badges, and SEO assets.",
};

// ─── Badge examples ───────────────────────────────────────────────────────────

const BADGE_EXAMPLES: Record<BadgeName, { qs: string; aspect?: string; description: string }> = {
  label:        { qs: 'label=version&message=2.1.0&color=%236366f1&style=flat', aspect: '130/20', description: 'Two-segment shields.io-style label/value badge.' },
  stat:         { qs: 'label=Stars&value=4.2k&icon=star&color=%23f59e0b', aspect: '120/48', description: 'Single-metric display card with optional icon.' },
  status:       { qs: 'label=API&status=online', aspect: '130/24', description: 'Service health indicator with semantic colors.' },
  progress:     { qs: 'label=Coverage&value=87&color=%2322c55e', aspect: '220/36', description: 'Progress bar for coverage, funding goals, completion.' },
  score:        { qs: 'label=Performance&value=95&color=%236366f1', aspect: '90/90', description: 'Circular score ring — Lighthouse, ratings.' },
  socials:      { qs: 'platform=github&handle=acme&followers=4.2k&color=%236366f1', aspect: '200/28', description: 'Social proof pill with platform icon.' },
  'tech-stack': { qs: 'stack=React%2CTypeScript%2CGo&color=%236366f1&style=tags', aspect: '200/32', description: 'Tech tag row for README or portfolio.' },
  availability: { qs: 'label=Jane+Doe&available=true&hireText=Open+to+work&color=%2322c55e', aspect: '200/40', description: '"Open to work" / availability status banner.' },
};

// ─── SEO examples ─────────────────────────────────────────────────────────────

const SEO_EXAMPLES: Record<SeoTemplateName, { qs: string; aspect: string; description: string }> = {
  favicon:            { qs: 'initial=OG&color=%230f0f0f&accentColor=%236366f1&shape=rounded', aspect: '1/1', description: '32×32 PNG for <link rel="icon">.' },
  'apple-touch-icon': { qs: 'initial=OG&color=%230f0f0f&accentColor=%236366f1&shape=rounded', aspect: '1/1', description: '180×180 PNG for <link rel="apple-touch-icon">.' },
  'manifest-icon':    { qs: 'initial=OG&color=%230f0f0f&accentColor=%236366f1&shape=rounded&size=512', aspect: '1/1', description: '192 or 512 px PNG for PWA manifest.json.' },
  'twitter-card':     { qs: 'title=Open+Graph+Generator&siteName=og-graph&accentColor=%236366f1&bgStyle=gradient%2Bgrid', aspect: '800/418', description: '800×418 PNG Twitter summary card.' },
};

export default function DocsPage() {
  const base      = env.deploymentURL;
  const templates = Object.keys(OG_ROUTES) as TemplateName[];
  const badges    = Object.keys(BADGE_ROUTES) as BadgeName[];
  const seoAssets = Object.keys(SEO_ROUTES) as SeoTemplateName[];

  return (
    <div className="flex min-h-full flex-col">
      <Navbar />

      <main className="flex-1 py-12">
        <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">

          {/* ── Header ──────────────────────────────────────────────── */}
          <div className="mb-12">
            <h1 className="text-3xl font-bold mb-2">API Reference</h1>
            <p className="text-muted-fg">
              Three services: OG images (PNG), SVG badges, and SEO assets (favicon, PWA icons).
              Base URL:{" "}
              <code className="font-mono text-xs text-primary">{base}</code>
            </p>
          </div>

          {/* ── TOC ─────────────────────────────────────────────────── */}
          <nav className="mb-12 rounded-lg border border-border bg-card p-4 space-y-3">
            <div>
              <p className="mb-2 text-xs font-semibold uppercase tracking-widest text-muted-fg">OG Templates</p>
              <div className="flex flex-wrap gap-2">
                {templates.map((t) => (
                  <a key={t} href={`#${t}`} className="rounded border border-border px-3 py-1 text-sm hover:border-primary/50 hover:text-primary transition-colors capitalize">{t}</a>
                ))}
              </div>
            </div>
            <div>
              <p className="mb-2 text-xs font-semibold uppercase tracking-widest text-muted-fg">SVG Badges</p>
              <div className="flex flex-wrap gap-2">
                {badges.map((b) => (
                  <a key={b} href={`#badge-${b}`} className="rounded border border-border px-3 py-1 text-sm hover:border-primary/50 hover:text-primary transition-colors">{b}</a>
                ))}
              </div>
            </div>
            <div>
              <p className="mb-2 text-xs font-semibold uppercase tracking-widest text-muted-fg">SEO Assets</p>
              <div className="flex flex-wrap gap-2">
                {seoAssets.map((s) => (
                  <a key={s} href={`#seo-${s}`} className="rounded border border-border px-3 py-1 text-sm hover:border-primary/50 hover:text-primary transition-colors">{s}</a>
                ))}
              </div>
            </div>
          </nav>

          {/* ── OG Endpoints ────────────────────────────────────────── */}
          <h2 className="text-xl font-bold mb-6" id="og">OG Image Templates</h2>
          <div className="flex flex-col gap-12 mb-20">
            {templates.map((template) => {
              const params = getParamDescriptors(template);
              const exampleUrl = `${base}${OG_ROUTES[template]}?${EXAMPLE_PARAMS[template]}`;
              return (
                <EndpointCard key={template} template={template} params={params} exampleUrl={exampleUrl} />
              );
            })}
          </div>

          {/* ── Badge Endpoints ─────────────────────────────────────── */}
          <h2 className="text-xl font-bold mb-2" id="badges">SVG Badges</h2>
          <p className="text-sm text-muted-fg mb-6">
            Returns <code className="font-mono text-xs">image/svg+xml</code>.
            Embed with <code className="font-mono text-xs">&lt;img&gt;</code> or directly in Markdown.
            Cache: <code className="font-mono text-xs">max-age=3600</code>.
          </p>
          <div className="flex flex-col gap-12 mb-20">
            {badges.map((badge) => {
              const ex = BADGE_EXAMPLES[badge];
              return (
                <ApiEndpointCard
                  key={badge}
                  id={`badge-${badge}`}
                  path={BADGE_ROUTES[badge]}
                  description={ex.description}
                  params={getBadgeParamDescriptors(badge)}
                  exampleUrl={`${base}${BADGE_ROUTES[badge]}?${ex.qs}`}
                  previewAspect={ex.aspect}
                />
              );
            })}
          </div>

          {/* ── SEO Endpoints ───────────────────────────────────────── */}
          <h2 className="text-xl font-bold mb-2" id="seo">SEO Assets</h2>
          <p className="text-sm text-muted-fg mb-6">
            Returns PNG images sized to platform spec.
            Cache: <code className="font-mono text-xs">max-age=86400</code>.
          </p>
          <div className="flex flex-col gap-12 mb-20">
            {seoAssets.map((asset) => {
              const ex = SEO_EXAMPLES[asset];
              return (
                <ApiEndpointCard
                  key={asset}
                  id={`seo-${asset}`}
                  path={SEO_ROUTES[asset]}
                  description={ex.description}
                  params={getSeoParamDescriptors(asset)}
                  exampleUrl={`${base}${SEO_ROUTES[asset]}?${ex.qs}`}
                  previewAspect={ex.aspect}
                />
              );
            })}
          </div>

          {/* ── Footer note ─────────────────────────────────────────── */}
          <div className="mt-4 rounded-lg border border-border bg-muted/30 p-6 text-sm text-muted-fg">
            <p className="font-semibold mb-1">Responses</p>
            <ul className="space-y-1 list-disc list-inside">
              <li><code className="font-mono text-xs">200</code> — Image (PNG or SVG)</li>
              <li><code className="font-mono text-xs">400</code> — JSON with Zod validation errors</li>
              <li><code className="font-mono text-xs">500</code> — JSON with error message</li>
            </ul>
            <p className="mt-4">
              <Link href={ROUTES.builder} className="text-primary hover:underline">
                Try the OG Builder →
              </Link>
            </p>
          </div>

        </div>
      </main>

      <Footer />
    </div>
  );
}
