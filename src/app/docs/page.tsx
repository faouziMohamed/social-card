import {Footer} from '@/components/layout/footer';
import {Navbar} from '@/components/layout/navbar';
import {CollapsibleJson} from '@/components/shared/collapsible-json';
import {JsonLd} from '@/components/shared/json-ld';
import {Badge} from '@/components/ui/badge';
import {env} from '@/lib/env';
import {ROUTES} from '@/lib/utils/routes';
import {BADGE_ROUTES} from '@/modules/badge/shared/badge-routes';
import {FONT_FAMILY_OPTIONS} from '@/modules/og/shared/og-font-catalog';
import {OG_ROUTES} from '@/modules/og/shared/og-routes';
import type {TemplateName} from '@/modules/og/shared/og.types';
import {DocsInteractiveSections} from '@/modules/seo/client/components/docs-interactive-sections';
import {DocsMobileNav} from '@/modules/seo/client/components/docs-mobile-nav';
import {DocsSidebarNav} from '@/modules/seo/client/components/docs-sidebar-nav';
import {SEO_ROUTES} from '@/modules/seo/shared/seo-routes';
import type {SeoTemplateName} from '@/modules/seo/shared/seo-schemas';
import type {Metadata} from 'next';
import Link from 'next/link';
import {SectionHeader} from './section-header';

// general template — "API Reference" title
const OG_QS =
  'siteName=OG+Graph&title=API+Reference&description=11+OG+templates+%C2%B7+8+badges+%C2%B7+7+SEO+assets&theme=dark&accentColor=%236366f1&fontFamily=geist&bgStyle=gradient%2Bgrid';

export const metadata: Metadata = {
  title: 'API Docs',
  description:
    'Full API reference for OG Graph: 11 Open Graph image templates, 8 SVG badges, and 7 SEO endpoints. Query parameters, examples, and live previews.',
  alternates: {canonical: '/docs'},
  openGraph: {
    title: 'API Docs — OG Graph',
    description:
      'Full API reference: 11 OG image templates, 8 SVG badges, and 7 SEO endpoints with live examples.',
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
      'Full API reference: 11 OG image templates, 8 SVG badges, and 7 SEO endpoints.',
    images: [`/api/og/general?${OG_QS}`],
  },
};

// ─── Page ─────────────────────────────────────────────────────────────

export default function DocsPage() {
  const base = env.deploymentURL;
  const templates = Object.keys(OG_ROUTES) as TemplateName[];
  const badges = Object.keys(BADGE_ROUTES) as any[];
  const seoAssets = Object.keys(SEO_ROUTES) as SeoTemplateName[];
  const ogNavItems = templates.map(t => ({href: `#${t}`, name: t}));
  const badgeNavItems = badges.map(b => ({href: `#badge-${b}`, name: b}));
  const seoNavItems = seoAssets.map(s => ({href: `#seo-${s}`, name: s}));
  const inspectorNavItems = [{href: '#seo-inspector', name: 'inspect'}];

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'TechArticle',
    headline: 'OG Graph API Reference',
    description:
      'Full API reference for OG Graph: 11 Open Graph image templates, 8 SVG badges, and 7 SEO endpoints.',
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
  const inspectorResponseExample = {
    success: true,
    inspectedAt: '2026-05-03T15:00:00.000Z',
    summary: {
      score: 84,
      totalFindings: 3,
      errors: 0,
      warnings: 2,
      infos: 1,
    },
    findingsBySeverity: {
      error: [],
      warning: [
        {
          id: 'missing-og-image',
          title: 'Missing og:image',
          detail: 'Open Graph image is missing.',
          recommendation: 'Set og:image to a 1200x630 image URL.',
          severity: 'warning',
        },
      ],
      info: [],
    },
    data: {
      url: 'https://example.com',
      finalUrl: 'https://example.com/',
      statusCode: 200,
      title: 'Example Domain',
      metaDescription: '',
      canonical: '',
      robots: '',
      og: {title: '', description: '', image: '', url: '', type: ''},
      twitter: {card: '', title: '', description: '', image: '', site: ''},
      icons: {favicon: '', appleTouchIcon: '', manifest: ''},
      headings: {h1Count: 1, h1: ['Example Domain']},
      images: {total: 2, missingAlt: 1},
      jsonLd: {count: 0, invalidCount: 0, types: []},
      findings: [],
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
          <p className="text-muted-foreground text-sm max-w-xl">
            Three services: OG images (PNG), SVG badges, and SEO assets. Base
            URL: <code className="terminal-prompt text-xs">{base}</code>
          </p>

          <div className="mt-4 lg:hidden">
            <DocsMobileNav
              ogItems={ogNavItems}
              badgeItems={badgeNavItems}
              seoItems={seoNavItems}
            />
          </div>
        </div>
      </header>

      <div className="mx-auto max-w-7xl w-full px-4 sm:px-6 lg:px-8 flex flex-col lg:flex-row gap-8 py-10 flex-1">
        {/* ── Sidebar ──────────────────────────────────────────────────────── */}
        <aside className="hidden lg:block lg:w-56 shrink-0">
          <DocsSidebarNav
            ogItems={ogNavItems}
            badgeItems={badgeNavItems}
            seoItems={seoNavItems}
            inspectorItems={inspectorNavItems}
          />
        </aside>

        {/* ── Main content ─────────────────────────────────────────────────── */}
        <main className="flex-1 min-w-0">
          <SectionHeader
            id="fonts"
            icon="🔤"
            title="Available Font Families"
            subtitle="Use the dropdown on each OG example to preview any supported family."
            count={FONT_FAMILY_OPTIONS.length}
          />
          <div className="mb-16 flex flex-wrap gap-2">
            {FONT_FAMILY_OPTIONS.map(font => (
              <Badge
                key={font.value}
                variant="muted"
                className="px-2.5 py-1 font-mono text-[11px]"
              >
                {font.label}
              </Badge>
            ))}
          </div>

          <DocsInteractiveSections base={base} />

          <SectionHeader
            id="seo-inspector"
            icon="🧪"
            title="SEO Inspector API"
            subtitle="Server-side single-page SEO analyzer with diagnostics and recommendations."
            count={1}
          />
          <section className="experience-card mechanical-corners overflow-hidden rounded-xl border border-border/60 bg-card/60 shadow-sm mb-16">
            <div className="flex items-center justify-between border-b border-border/50 bg-card/80 px-6 py-4">
              <div className="flex items-center gap-3">
                <span className="rounded-md border border-primary/40 bg-primary/10 px-2 py-0.5 font-mono text-xs text-primary">
                  POST
                </span>
                <code className="font-mono text-sm text-primary">
                  /api/seo/inspect
                </code>
              </div>
              <Link
                href={ROUTES.seoInspector}
                className="text-xs text-muted-foreground hover:text-primary transition-colors"
              >
                Open Inspector UI
              </Link>
            </div>
            <div className="px-6 py-4 text-sm text-muted-foreground">
              Submit a URL and receive core SEO tags, Open Graph/Twitter data,
              heading/image checks, JSON-LD info, and actionable findings.
            </div>
            <div className="border-t border-border/50 bg-background/30 px-6 py-4 space-y-4">
              <div>
                <p className="mb-2 text-xs font-semibold uppercase tracking-widest text-muted-foreground">
                  Request
                </p>
                <pre className="rounded-md border border-border bg-muted/30 px-3 py-2 font-mono text-xs text-foreground/80 whitespace-pre-wrap">{`POST ${base}/api/seo/inspect
Content-Type: application/json

{
  "url": "https://example.com"
}`}</pre>
              </div>
              <div>
                <p className="mb-2 text-xs font-semibold uppercase tracking-widest text-muted-foreground">
                  cURL
                </p>
                <pre className="rounded-md border border-border bg-muted/30 px-3 py-2 font-mono text-xs text-foreground/80 whitespace-pre-wrap">{String.raw`curl -X POST "${base}/api/seo/inspect" \
  -H "content-type: application/json" \
  -d '{"url":"https://example.com"}'`}</pre>
              </div>
              <div>
                <p className="mb-2 text-xs font-semibold uppercase tracking-widest text-muted-foreground">
                  Response JSON (shape)
                </p>
                <CollapsibleJson data={inspectorResponseExample} />
              </div>
            </div>
          </section>

          {/* Response codes */}
          <div className="mechanical-corners rounded-lg border border-border builder-panel p-6 text-sm text-muted-foreground">
            <p className="font-semibold mb-3 uppercase tracking-widest text-xs flex items-center gap-2">
              <span className="status-indicator status-info" />
              Response Codes
            </p>
            <ul className="space-y-2">
              <li className="flex items-center gap-3">
                <code className="terminal-prompt text-xs w-8">200</code>
                <span>
                  Image (PNG/SVG) or text payload (robots/meta/json-ld)
                </span>
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
