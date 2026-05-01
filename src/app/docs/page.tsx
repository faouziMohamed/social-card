import {Footer} from '@/components/layout/Footer';
import {Navbar} from '@/components/layout/Navbar';
import {ApiEndpointCard} from '@/components/shared/ApiEndpointCard';
import {JsonLd} from '@/components/shared/JsonLd';
import {env} from '@/lib/env';
import {ROUTES} from '@/lib/utils/routes';
import {getBadgeParamDescriptors} from '@/modules/badge/shared/badge-docs';
import {BADGE_ROUTES} from '@/modules/badge/shared/badge-routes';
import type {BadgeName} from '@/modules/badge/shared/badge-schemas';
import {EndpointCard} from '@/modules/og/client/components/endpoint-card';
import {getParamDescriptors} from '@/modules/og/shared/og-docs';
import {OG_ROUTES} from '@/modules/og/shared/og-routes';
import {EXAMPLE_PARAMS} from '@/modules/og/shared/og-template-registry';
import type {TemplateName} from '@/modules/og/shared/og.types';
import {getSeoParamDescriptors} from '@/modules/seo/shared/seo-docs';
import {SEO_ROUTES} from '@/modules/seo/shared/seo-routes';
import type {SeoTemplateName} from '@/modules/seo/shared/seo-schemas';
import type {Metadata} from 'next';
import Link from 'next/link';

// general template — "API Reference" title
const OG_QS =
  'siteName=OG+Graph&title=API+Reference&description=11+OG+templates+%C2%B7+8+badges+%C2%B7+4+SEO+assets&theme=dark&accentColor=%236366f1&fontFamily=geist&bgStyle=gradient%2Bgrid';

export const metadata: Metadata = {
  title: 'API Docs',
  description:
    'Full API reference for OG Graph: 11 Open Graph image templates, 8 SVG badges, and 4 SEO asset endpoints. Query parameters, examples, and live previews.',
  alternates: {canonical: '/docs'},
  openGraph: {
    title: 'API Docs — OG Graph',
    description:
      'Full API reference: 11 OG image templates, 8 SVG badges, and 4 SEO asset endpoints with live examples.',
    url: '/docs',
    images: [
      {
        url: `/api/og/general?${OG_QS}`,
        width: 1200,
        height: 630,
        alt: 'OG Graph API Reference',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'API Docs — OG Graph',
    description:
      'Full API reference: 11 OG image templates, 8 SVG badges, and 4 SEO asset endpoints.',
    images: [`/api/og/general?${OG_QS}`],
  },
};

// ─── Badge examples ───────────────────────────────────────────────────────────

const BADGE_EXAMPLES: Record<
  BadgeName,
  {qs: string; aspect?: string; description: string}
> = {
  label: {
    qs: 'label=version&message=2.1.0&color=%236366f1&style=flat',
    aspect: '137/26',
    description: 'Premium two-segment label/value badge.',
  },
  stat: {
    qs: 'label=Stars&value=4.2k&icon=star&color=%23f59e0b',
    aspect: '150/58',
    description: 'Premium single-metric display card with optional icon.',
  },
  status: {
    qs: 'label=API&status=online',
    aspect: '120/30',
    description: 'Glass-style service health indicator with semantic colors.',
  },
  progress: {
    qs: 'label=Coverage&value=87&color=%2322c55e',
    aspect: '220/46',
    description:
      'Premium progress bar for coverage, funding goals, completion.',
  },
  score: {
    qs: 'label=Performance&value=95&color=%236366f1',
    aspect: '104/104',
    description: 'Premium circular score ring — Lighthouse, ratings.',
  },
  socials: {
    qs: 'platform=github&handle=acme&followers=4.2k&color=%236366f1',
    aspect: '185/34',
    description: 'Social proof pill with platform icon and glass body.',
  },
  'tech-stack': {
    qs: 'stack=React%2CTypeScript%2CGo&color=%236366f1&style=tags',
    aspect: '340/36',
    description: 'Premium tech tag row for README or portfolio.',
  },
  availability: {
    qs: 'label=Jane+Doe&available=true&hireText=Open+to+work&color=%2322c55e',
    aspect: '220/52',
    description: 'Premium "Open to work" / availability status banner.',
  },
};

// ─── SEO examples ─────────────────────────────────────────────────────────────

const SEO_EXAMPLES: Record<
  SeoTemplateName,
  {qs: string; aspect: string; description: string}
> = {
  favicon: {
    qs: 'initial=OG&color=%230f0f0f&accentColor=%236366f1&shape=rounded',
    aspect: '1/1',
    description: '32×32 PNG for <link rel="icon">.',
  },
  'apple-touch-icon': {
    qs: 'initial=OG&color=%230f0f0f&accentColor=%236366f1&shape=rounded',
    aspect: '1/1',
    description: '180×180 PNG for <link rel="apple-touch-icon">.',
  },
  'manifest-icon': {
    qs: 'initial=OG&color=%230f0f0f&accentColor=%236366f1&shape=rounded&size=512',
    aspect: '1/1',
    description: '192 or 512 px PNG for PWA manifest.json.',
  },
  'twitter-card': {
    qs: 'title=Open+Graph+Generator&siteName=og-graph&accentColor=%236366f1&bgStyle=gradient%2Bgrid',
    aspect: '800/418',
    description: '800×418 PNG Twitter summary card.',
  },
};

// ─── Section header ───────────────────────────────────────────────────────────

function SectionHeader({
  icon,
  title,
  subtitle,
  count,
  id,
}: {
  icon: string;
  title: string;
  subtitle: string;
  count: number;
  id: string;
}) {
  return (
    <div id={id} className="mb-8">
      <div className="flex items-center gap-3 mb-2">
        <span className="text-2xl">{icon}</span>
        <h2 className="font-bold uppercase tracking-widest text-sm text-muted-fg">
          {title}
        </h2>
        <span className="rounded-full border border-primary/30 bg-primary/10 px-2 py-0.5 text-xs font-mono text-primary">
          {count}
        </span>
      </div>
      <p className="text-sm text-muted-fg mb-3">{subtitle}</p>
      <div className="section-divider" />
    </div>
  );
}

// ─── Sidebar nav link group ───────────────────────────────────────────────────

function NavGroup({
  label,
  items,
}: {
  label: string;
  items: {href: string; name: string}[];
}) {
  return (
    <div className="mb-6">
      <p className="mb-2 text-xs font-semibold uppercase tracking-widest text-muted-fg">
        {label}
      </p>
      <ul className="space-y-1">
        {items.map(item => (
          <li key={item.href}>
            <a
              href={item.href}
              className="block rounded px-2 py-1 text-xs text-muted-fg hover:bg-muted/40 hover:text-primary transition-colors font-mono truncate"
            >
              {item.name}
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
}

// ─── Page ─────────────────────────────────────────────────────────────────────

export default function DocsPage() {
  const base = env.deploymentURL;
  const templates = Object.keys(OG_ROUTES) as TemplateName[];
  const badges = Object.keys(BADGE_ROUTES) as BadgeName[];
  const seoAssets = Object.keys(SEO_ROUTES) as SeoTemplateName[];

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'TechArticle',
    headline: 'OG Graph API Reference',
    description:
      'Full API reference for OG Graph: 11 Open Graph image templates, 8 SVG badges, and 4 SEO asset endpoints.',
    url: `${base}/docs`,
    mainEntityOfPage: {
      '@type': 'WebPage',
      '@id': `${base}/docs`,
    },
    author: {
      '@type': 'Person',
      name: 'Faouzi Mohamed',
      url: 'https://mfaouzi.com',
      sameAs: [
        'https://github.com/faouziMohamed',
        'https://linkedin.com/in/mohamed-faouzi',
        'https://twitter.com/fz_faouzi',
        'https://facebook.com/faouzi.mohamed.97',
        'https://instagram.com/faouzi_m_',
      ],
    },
    publisher: {
      '@type': 'Person',
      name: 'Faouzi Mohamed',
      url: 'https://mfaouzi.com',
    },
  };

  return (
    <div className="flex min-h-full flex-col">
      <JsonLd data={jsonLd} />
      <Navbar />

      {/* ── Hero header ──────────────────────────────────────────────────── */}
      <header className="circuit-pattern border-b border-border">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-10">
          <div className="flex items-center gap-3 mb-3">
            <span className="status-indicator status-success" />
            <span className="terminal-prompt text-xs">API REFERENCE</span>
          </div>
          <h1 className="text-3xl font-bold mb-2 glow-primary inline-block">
            OG Graph API
          </h1>
          <p className="text-muted-fg text-sm max-w-xl">
            Three services: OG images (PNG), SVG badges, and SEO assets. Base
            URL: <code className="terminal-prompt text-xs">{base}</code>
          </p>
        </div>
      </header>

      <div className="mx-auto max-w-7xl w-full px-4 sm:px-6 lg:px-8 flex flex-col lg:flex-row gap-8 py-10 flex-1">
        {/* ── Sidebar ──────────────────────────────────────────────────────── */}
        <aside className="lg:w-56 shrink-0">
          <nav className="lg:sticky lg:top-6 builder-panel rounded-lg border border-border p-4 scrollbar-hide lg:max-h-[calc(100vh-6rem)] lg:overflow-y-auto">
            <p className="mb-4 text-xs font-bold uppercase tracking-widest text-muted-fg flex items-center gap-2">
              <span className="status-indicator status-info" />
              Navigation
            </p>

            <NavGroup
              label="OG Templates"
              items={templates.map(t => ({href: `#${t}`, name: t}))}
            />

            <div className="section-divider mb-4" />

            <NavGroup
              label="SVG Badges"
              items={badges.map(b => ({href: `#badge-${b}`, name: b}))}
            />

            <div className="section-divider mb-4" />

            <NavGroup
              label="SEO Assets"
              items={seoAssets.map(s => ({href: `#seo-${s}`, name: s}))}
            />

            <div className="section-divider my-4" />

            <Link
              href={ROUTES.builder}
              className="block text-center rounded border border-primary/30 px-3 py-1.5 text-xs terminal-prompt hover:bg-primary/10 transition-colors"
            >
              → Open Builder
            </Link>
          </nav>
        </aside>

        {/* ── Main content ─────────────────────────────────────────────────── */}
        <main className="flex-1 min-w-0">
          {/* OG Templates */}
          <SectionHeader
            id="og"
            icon="🖼️"
            title="OG Image Templates"
            subtitle="Returns PNG images sized 1200×630. Cache: max-age=3600."
            count={templates.length}
          />
          <div className="flex flex-col gap-10 mb-16">
            {templates.map(template => {
              const params = getParamDescriptors(template);
              const exampleUrl = `${base}${OG_ROUTES[template]}?${EXAMPLE_PARAMS[template]}`;
              return (
                <EndpointCard
                  key={template}
                  template={template}
                  params={params}
                  exampleUrl={exampleUrl}
                />
              );
            })}
          </div>

          {/* SVG Badges */}
          <SectionHeader
            id="badges"
            icon="🏷️"
            title="SVG Badges"
            subtitle="Returns image/svg+xml. Embed with <img> or Markdown. Cache: max-age=3600."
            count={badges.length}
          />
          <div className="flex flex-col gap-10 mb-16">
            {badges.map(badge => {
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

          {/* SEO Assets */}
          <SectionHeader
            id="seo"
            icon="🔍"
            title="SEO Assets"
            subtitle="Returns PNG images sized to platform spec. Cache: max-age=86400."
            count={seoAssets.length}
          />
          <div className="flex flex-col gap-10 mb-16">
            {seoAssets.map(asset => {
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

          {/* Response codes */}
          <div className="mechanical-corners rounded-lg border border-border builder-panel p-6 text-sm text-muted-fg">
            <p className="font-semibold mb-3 uppercase tracking-widest text-xs flex items-center gap-2">
              <span className="status-indicator status-info" />
              Response Codes
            </p>
            <ul className="space-y-2">
              <li className="flex items-center gap-3">
                <code className="terminal-prompt text-xs w-8">200</code>
                <span>Image (PNG or SVG)</span>
              </li>
              <li className="flex items-center gap-3">
                <code className="font-mono text-xs w-8 text-terminal-amber">
                  400
                </code>
                <span>JSON with Zod validation errors</span>
              </li>
              <li className="flex items-center gap-3">
                <code className="terminal-error text-xs w-8">500</code>
                <span>JSON with error message</span>
              </li>
            </ul>
          </div>
        </main>
      </div>

      <Footer />
    </div>
  );
}
