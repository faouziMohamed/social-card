"use client";

import Link from "next/link";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { TEMPLATE_META as OG_TEMPLATE_META, DEMO_PARAMS as OG_DEMO_PARAMS } from "@/modules/og/shared/og-template-registry";
import { TEMPLATE_META as BADGE_TEMPLATE_META, DEMO_PARAMS as BADGE_DEMO_PARAMS } from "@/modules/badge/shared/badge-template-registry";
import { TEMPLATE_META as SEO_TEMPLATE_META, DEMO_PARAMS as SEO_DEMO_PARAMS } from "@/modules/seo/shared/seo-template-registry";
import { OG_ROUTES } from "@/modules/og/shared/og-routes";
import { BADGE_ROUTES } from "@/modules/badge/shared/badge-routes";
import { SEO_ROUTES } from "@/modules/seo/shared/seo-routes";
import { ROUTES } from "@/lib/utils/routes";

// Badge aspect ratios keyed by template name
const BADGE_ASPECT: Record<string, string> = {
  label:        "137/26",
  stat:         "150/58",
  status:       "120/30",
  progress:     "220/46",
  score:        "104/104",
  socials:      "185/34",
  "tech-stack": "340/36",
  availability: "220/52",
};

// SEO aspect ratios keyed by template name
const SEO_ASPECT: Record<string, string> = {
  favicon:            "1/1",
  "apple-touch-icon": "1/1",
  "manifest-icon":    "1/1",
  "twitter-card":     "800/418",
};

// HTML usage snippet for each SEO asset
const SEO_USAGE: Record<string, string> = {
  favicon:            '<link rel="icon" href="/api/seo/favicon?initial=A" />',
  "apple-touch-icon": '<link rel="apple-touch-icon" href="/api/seo/apple-touch-icon?initial=A" />',
  "manifest-icon":    '{ "src": "/api/seo/manifest-icon?initial=A&size=192", "sizes": "192x192" }',
  "twitter-card":     '<meta name="twitter:image" content="/api/seo/twitter-card?title=Hello" />',
};

interface HomepageTabsProps {
  base: string;
}

export function HomepageTabs({ base }: HomepageTabsProps) {
  return (
    <Tabs defaultValue="og" className="w-full">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <TabsList className="mb-8 grid w-full max-w-md mx-auto grid-cols-3">
          <TabsTrigger value="og">OG Images</TabsTrigger>
          <TabsTrigger value="badges">Badges</TabsTrigger>
          <TabsTrigger value="seo">SEO Assets</TabsTrigger>
        </TabsList>
      </div>

      {/* ── OG Images Tab ─────────────────────────────────────────────── */}
      <TabsContent value="og">
        {/* Live previews */}
        <section className="py-8 bg-muted/30">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <p className="mb-8 text-center text-sm font-mono text-muted-fg uppercase tracking-widest">
              Live previews — actual API output
            </p>
            <div className="grid gap-6 sm:grid-cols-3">
              {OG_DEMO_PARAMS.map(({ template, params }) => (
                <div key={template} className="experience-card rounded-lg overflow-hidden bg-card border border-border">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={`${base}${OG_ROUTES[template as keyof typeof OG_ROUTES]}?${params}`}
                    alt={`${template} template preview`}
                    className="w-full aspect-[1200/630] object-cover"
                    loading="lazy"
                  />
                  <p className="px-3 py-2 text-xs font-mono text-muted-fg capitalize">{template}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Template grid */}
        <section className="py-12">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <p className="mb-8 text-center font-mono text-sm text-muted-fg uppercase tracking-widest">
              11 OG Templates
            </p>
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
              {OG_TEMPLATE_META.map(({ name, label, color, desc }) => (
                <Link
                  key={name}
                  href={`${ROUTES.builder}?template=${name}`}
                  className="mechanical-corners group rounded-lg border border-border bg-card p-5 transition-colors hover:border-primary/50"
                >
                  <div className="mb-3 flex items-center justify-between">
                    <span className="inline-block h-3 w-3 rounded-full" style={{ backgroundColor: color }} />
                    <span className="status-indicator status-success opacity-0 group-hover:opacity-100 transition-opacity" />
                  </div>
                  <p className="font-semibold">{label}</p>
                  <p className="mt-1 text-sm text-muted-fg">{desc}</p>
                  <p className="mt-3 font-mono text-xs text-primary">/api/og/{name}</p>
                </Link>
              ))}
            </div>
          </div>
        </section>
      </TabsContent>

      {/* ── Badges Tab ────────────────────────────────────────────────── */}
      <TabsContent value="badges">
        {/* Live badge previews */}
        <section className="py-8 bg-muted/30">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <p className="mb-8 text-center text-sm font-mono text-muted-fg uppercase tracking-widest">
              Live previews — actual API output
            </p>
            <div className="grid gap-6 grid-cols-2 sm:grid-cols-3 lg:grid-cols-4">
              {BADGE_DEMO_PARAMS.slice(0, 6).map(({ template, params }) => {
                const aspect = BADGE_ASPECT[template] ?? "200/40";
                return (
                  <div key={template} className="experience-card rounded-lg overflow-hidden bg-card border border-border p-4 flex flex-col items-center gap-3">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src={`${base}${BADGE_ROUTES[template as keyof typeof BADGE_ROUTES]}?${params}`}
                      alt={`${template} badge preview`}
                      style={{ aspectRatio: aspect.replace("/", " / ") }}
                      className="max-w-full object-contain"
                      loading="lazy"
                    />
                    <p className="text-xs font-mono text-muted-fg capitalize">{template}</p>
                  </div>
                );
              })}
            </div>
          </div>
        </section>

        {/* Badge template grid */}
        <section className="py-12">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <p className="mb-8 text-center font-mono text-sm text-muted-fg uppercase tracking-widest">
              8 Badge Templates
            </p>
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
              {BADGE_TEMPLATE_META.map(({ name, label, color, desc, icon }) => (
                <div
                  key={name}
                  className="mechanical-corners rounded-lg border border-border bg-card p-5"
                >
                  <div className="mb-3 flex items-center justify-between">
                    <span className="text-lg" aria-hidden="true">{icon}</span>
                    <span className="inline-block h-2 w-2 rounded-full" style={{ backgroundColor: color }} />
                  </div>
                  <p className="font-semibold">{label}</p>
                  <p className="mt-1 text-sm text-muted-fg">{desc}</p>
                  <p className="mt-3 font-mono text-xs text-primary">/api/badge/{name}</p>
                </div>
              ))}
            </div>
          </div>
        </section>
      </TabsContent>

      {/* ── SEO Assets Tab ────────────────────────────────────────────── */}
      <TabsContent value="seo">
        {/* Live SEO previews */}
        <section className="py-8 bg-muted/30">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <p className="mb-8 text-center text-sm font-mono text-muted-fg uppercase tracking-widest">
              Live previews — actual API output
            </p>
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
              {SEO_DEMO_PARAMS.map(({ template, params }) => {
                const aspect = SEO_ASPECT[template] ?? "1/1";
                const isWide = template === "twitter-card";
                return (
                  <div
                    key={template}
                    className={`experience-card rounded-lg overflow-hidden bg-card border border-border${isWide ? " sm:col-span-2" : ""}`}
                  >
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src={`${base}${SEO_ROUTES[template as keyof typeof SEO_ROUTES]}?${params}`}
                      alt={`${template} SEO asset preview`}
                      style={{ aspectRatio: aspect.replace("/", " / ") }}
                      className="w-full object-contain"
                      loading="lazy"
                    />
                    <p className="px-3 py-2 text-xs font-mono text-muted-fg">{template}</p>
                  </div>
                );
              })}
            </div>
          </div>
        </section>

        {/* SEO asset details */}
        <section className="py-12">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <p className="mb-8 text-center font-mono text-sm text-muted-fg uppercase tracking-widest">
              4 SEO Assets
            </p>
            <div className="grid gap-4 sm:grid-cols-2">
              {SEO_TEMPLATE_META.map(({ name, label, color, desc, icon }) => (
                <div
                  key={name}
                  className="mechanical-corners rounded-lg border border-border bg-card p-5"
                >
                  <div className="mb-3 flex items-center justify-between">
                    <span className="text-lg" aria-hidden="true">{icon}</span>
                    <span className="inline-block h-2 w-2 rounded-full" style={{ backgroundColor: color }} />
                  </div>
                  <p className="font-semibold">{label}</p>
                  <p className="mt-1 text-sm text-muted-fg">{desc}</p>
                  <p className="mt-3 font-mono text-xs text-primary">/api/seo/{name}</p>
                  <pre className="mt-3 overflow-x-auto rounded bg-muted p-2 text-xs font-mono text-muted-fg leading-relaxed whitespace-pre-wrap break-all">
                    <code>{SEO_USAGE[name]}</code>
                  </pre>
                </div>
              ))}
            </div>
          </div>
        </section>
      </TabsContent>
    </Tabs>
  );
}
