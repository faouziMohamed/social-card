import {Footer} from '@/components/layout/footer';
import {Navbar} from '@/components/layout/navbar';
import {JsonLd} from '@/components/shared/json-ld';
import {Badge} from '@/components/ui/badge';
import {buttonVariants} from '@/components/ui/button';
import {env} from '@/lib/env';
import {ROUTES} from '@/lib/utils/routes';
import {HomepageTabs} from '@/modules/og/client/components/homepage-tabs';
import {
  ArrowRight,
  Code2,
  Globe,
  Image,
  Layers,
  Search,
  Tag,
  Zap,
} from 'lucide-react';
import Link from 'next/link';

const QUICK_START = [
  {
    lang: 'HTML',
    code: `<meta property="og:image"\n  content="https://og.yourdomain.com/api/og/general\n           ?title=Hello+World&theme=dark" />`,
  },
  {
    lang: 'Next.js',
    code: `export async function generateMetadata() {\n  const url = new URL('/api/og/general', process.env.NEXT_PUBLIC_DEPLOYMENT_URL);\n  url.searchParams.set('title', 'Hello World');\n  return { openGraph: { images: [url.toString()] } };\n}`,
  },
  {
    lang: 'cURL',
    code: `curl -G "https://og.yourdomain.com/api/og/general" \\\n  --data-urlencode "title=Hello World" -o image.png`,
  },
  {
    lang: 'Python',
    code: `import requests\nresp = requests.get(\n  "https://og.yourdomain.com/api/og/general",\n  params={"title": "Hello World", "theme": "dark"},\n)\nopen("image.png", "wb").write(resp.content)`,
  },
] as const;

export default function HomePage() {
  const base = env.deploymentURL;

  const jsonLd = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'WebApplication',
        '@id': `${base}/#app`,
        name: 'OG Graph',
        url: base,
        description:
          'Self-hostable, API-first Open Graph image generator. 11 templates, 8 SVG badges, 4 SEO assets. Drop a URL, get a social card.',
        applicationCategory: 'DeveloperApplication',
        operatingSystem: 'Any',
        offers: {
          '@type': 'Offer',
          price: '0',
          priceCurrency: 'USD',
        },
        featureList: [
          '11 Open Graph image templates',
          '8 SVG badge types',
          '4 SEO asset types (favicon, apple-touch-icon, manifest icon, twitter card)',
          'No signup required',
          'Self-hostable',
          'Zod-validated query parameters',
          '4 target size presets (OG, Twitter, LinkedIn)',
        ],
        screenshot: `${base}/api/og/general?siteName=OG+Graph&title=Open+Graph+Image+Generator&theme=dark&accentColor=%236366f1&fontFamily=geist&bgStyle=gradient%2Bgrid`,
        author: {'@id': `${base}/#author`},
        creator: {'@id': `${base}/#author`},
        sameAs: [`${base}`],
      },
      {
        '@type': 'Person',
        '@id': `${base}/#author`,
        name: 'Faouzi Mohamed',
        url: 'https://mfaouzi.com',
        sameAs: [
          'https://mfaouzi.com',
          'https://dev.mfaouzi.com',
          'https://github.com/faouziMohamed',
          'https://linkedin.com/in/mohamed-faouzi',
          'https://twitter.com/fz_faouzi',
          'https://facebook.com/faouzi.mohamed.97',
          'https://instagram.com/faouzi_m_',
        ],
      },
    ],
  };

  return (
    <div className="flex min-h-full flex-col">
      <JsonLd data={jsonLd} />
      <Navbar />

      <main className="flex-1">
        {/* Hero */}
        <section className="relative overflow-hidden py-24 sm:py-32">
          <div className="circuit-pattern absolute inset-0 opacity-40" />
          <div className="relative mx-auto max-w-4xl px-4 text-center sm:px-6 lg:px-8">
            <Badge
              variant="outline"
              className="mb-6 border-primary/40 text-primary"
            >
              <span className="status-indicator status-success mr-1.5" />
              API-first · 11 OG · 8 Badges · 4 SEO
            </Badge>

            <h1 className="text-4xl font-bold tracking-tight sm:text-6xl lg:text-7xl">
              Social assets, <span className="text-primary">on demand</span>
            </h1>

            <p className="mx-auto mt-6 max-w-2xl text-lg text-muted-fg">
              Self-hostable image generator for OG cards, SVG badges, and SEO
              icons. Drop a URL into your{' '}
              <code className="rounded bg-muted px-1.5 py-0.5 font-mono text-sm text-primary">
                &lt;meta&gt;
              </code>{' '}
              tags and get beautiful, on-demand assets — no signup, no SDK.
            </p>

            <div className="mt-10 flex flex-col items-center gap-4 sm:flex-row sm:justify-center">
              <Link
                href={ROUTES.builder}
                className={buttonVariants({size: 'lg'})}
              >
                Open Builder <ArrowRight className="ml-1 h-4 w-4" />
              </Link>
              <Link
                href={ROUTES.seoInspector}
                className={buttonVariants({variant: 'outline', size: 'lg'})}
              >
                Open Inspector
              </Link>
              <Link
                href={ROUTES.docs}
                className={buttonVariants({variant: 'outline', size: 'lg'})}
              >
                View Docs
              </Link>
            </div>
          </div>
        </section>

        {/* Three-tab feature showcase */}
        <section className="py-16">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <h2 className="mb-10 text-center text-3xl font-bold">
              23 Ready-Made Assets
            </h2>
          </div>
          <HomepageTabs base={base} />
        </section>

        {/* Feature grid */}
        <section className="py-20 bg-muted/30">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <h2 className="mb-12 text-center text-3xl font-bold">
              Everything you need
            </h2>
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
              <div className="mechanical-corners rounded-lg border border-border bg-card p-5">
                <Image className="mb-3 h-5 w-5 text-primary" />
                <p className="font-semibold">11 OG Templates</p>
                <p className="mt-1 text-sm text-muted-fg">
                  Blog, product, portfolio, event, launch and more at 1200×630.
                </p>
              </div>
              <div className="mechanical-corners rounded-lg border border-border bg-card p-5">
                <Tag className="mb-3 h-5 w-5 text-primary" />
                <p className="font-semibold">8 SVG Badges</p>
                <p className="mt-1 text-sm text-muted-fg">
                  Label, stat, status, progress, score, socials, tech-stack,
                  availability.
                </p>
              </div>
              <div className="mechanical-corners rounded-lg border border-border bg-card p-5">
                <Search className="mb-3 h-5 w-5 text-primary" />
                <p className="font-semibold">SEO Assets + Inspector</p>
                <p className="mt-1 text-sm text-muted-fg">
                  Generate icons/cards and audit any page with server-side SEO
                  diagnostics.
                </p>
              </div>
              <div className="rounded-lg border border-border bg-card p-5">
                <div className="flex flex-col gap-3 h-full justify-center">
                  {[
                    {Icon: Zap, text: 'Zero signup'},
                    {Icon: Layers, text: '4 size presets'},
                    {Icon: Code2, text: 'Zod validation'},
                    {Icon: Globe, text: 'CORS-enabled'},
                  ].map(({Icon, text}) => (
                    <div
                      key={text}
                      className="flex items-center gap-2 text-sm text-muted-fg"
                    >
                      <Icon className="h-4 w-4 text-primary" />
                      {text}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Quick-start */}
        <section className="py-20">
          <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
            <h2 className="mb-4 text-center text-3xl font-bold">Quick Start</h2>
            <p className="mb-10 text-center text-muted-fg">
              Paste the URL directly — no SDK, no signup.
            </p>

            <div className="rounded-lg border border-border bg-card overflow-hidden">
              <div className="flex items-center gap-2 border-b border-border bg-muted px-4 py-3">
                {[0, 1, 2].map(i => (
                  <span key={i} className="h-3 w-3 rounded-full bg-border" />
                ))}
                <span className="ml-2 font-mono text-xs terminal-prompt">
                  quick-start
                </span>
              </div>

              {QUICK_START.map(({lang, code}) => (
                <div
                  key={lang}
                  className="border-b border-border last:border-0"
                >
                  <div className="px-4 pt-3 pb-1">
                    <Badge variant="muted" className="text-xs">
                      {lang}
                    </Badge>
                  </div>
                  <pre className="overflow-x-auto p-4 text-sm font-mono text-terminal-green leading-relaxed">
                    <code>{code}</code>
                  </pre>
                </div>
              ))}
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
