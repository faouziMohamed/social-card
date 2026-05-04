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
  CheckCircle2,
  CircleGauge,
  Code2,
  Gem,
  ImageIcon,
  ShieldCheck,
  Sparkles,
  Tag,
  WandSparkles,
} from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';

const TRUST_POINTS = [
  'Node runtime compatible',
  'Self-hostable',
  'Zod-validated query inputs',
  'Predictable content-types',
] as const;

const BUILDER_STEPS = [
  {
    title: 'Pick a surface',
    body: 'Choose OG image, SVG badge, or SEO endpoint depending on where the visual will be consumed.',
  },
  {
    title: 'Tune style in seconds',
    body: 'Adjust layout, fonts, palettes, and metadata in Builder with live output and copy-ready URLs.',
  },
  {
    title: 'Ship as URL',
    body: 'Drop endpoint URLs into metadata tags, markdown, CI docs, release notes, and product pages.',
  },
] as const;

export default function HomePage() {
  const base = env.deploymentURL;
  const heroImage = `${base}/api/og/product?productName=Social+Card&tagline=Production+ready+social+visuals&feature1=11+OG+templates&feature2=8+badge+endpoints&cta=API-first+and+self-hostable&theme=dark&fontFamily=space&accentColor=%2322d3ee&bgStyle=aurora%2Bgrid`;

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'WebApplication',
    name: 'Social Card',
    url: base,
    applicationCategory: 'DeveloperApplication',
    description:
      'API platform for Open Graph cards, dynamic SVG badges, and SEO assets with live builder and docs.',
    offers: {'@type': 'Offer', price: '0', priceCurrency: 'USD'},
    screenshot: heroImage,
  };

  return (
    <div className="flex min-h-full flex-col [--background:oklch(0.09_0.015_250)] [--foreground:oklch(0.96_0.005_250)] [--primary:oklch(0.75_0.15_195)] [--primary-fg:oklch(0.09_0.015_250)] [--secondary:oklch(0.7_0.18_35)] [--secondary-fg:oklch(0.09_0.015_250)] [--muted:oklch(0.15_0.015_250)] [--muted-fg:oklch(0.6_0.02_250)] [--border:oklch(0.22_0.015_250)] [--card:oklch(0.12_0.015_250)] [--card-fg:oklch(0.96_0.005_250)] [--popover:oklch(0.13_0.015_250)] [--popover-fg:oklch(0.96_0.005_250)] [--accent:oklch(0.18_0.015_250)] [--accent-fg:oklch(0.96_0.005_250)] bg-[radial-gradient(circle_at_10%_-10%,oklch(0.8_0.18_220/.2),transparent_35%),radial-gradient(circle_at_90%_0%,oklch(0.74_0.18_40/.16),transparent_32%),linear-gradient(to_bottom,oklch(0.09_0.018_250),oklch(0.11_0.02_250))] text-[oklch(0.96_0.005_250)]">
      <JsonLd data={jsonLd} />
      <Navbar />

      <main className="flex-1">
        <section className="relative mx-auto grid w-full max-w-7xl gap-10 px-4 pb-14 pt-16 text-foreground sm:px-6 lg:grid-cols-[1.08fr_0.92fr] lg:items-center lg:px-8 lg:pt-20">
          <div>
            <Badge
              variant="outline"
              className="mb-6 border-primary/55 bg-[oklch(0.12_0.015_250/.6)] text-primary backdrop-blur-sm"
            >
              <WandSparkles className="mr-1.5 h-3.5 w-3.5" />
              Premium Visual API
            </Badge>

            <h1 className="text-4xl font-bold leading-[1.02] tracking-tight sm:text-6xl lg:text-7xl">
              Build polished social assets
              <span className="block bg-linear-to-r from-primary via-secondary to-terminal-green bg-clip-text text-transparent">
                from pure URLs
              </span>
            </h1>

            <p className="mt-6 max-w-2xl text-base leading-relaxed text-muted-fg sm:text-lg">
              Social Card is a production-grade endpoint layer for Open Graph
              cards, SVG badges, and SEO visuals. It helps engineering teams
              ship consistent brand presentation without design bottlenecks.
            </p>

            <div className="mt-8 flex flex-wrap gap-3">
              <Link
                href={ROUTES.builder}
                className={buttonVariants({size: 'lg'})}
              >
                Open Builder <ArrowRight className="ml-1 h-4 w-4" />
              </Link>
              <Link
                href={ROUTES.docs}
                className={buttonVariants({variant: 'outline', size: 'lg'})}
              >
                Read Docs
              </Link>
            </div>

            <div className="mt-8 grid max-w-2xl grid-cols-2 gap-2 sm:grid-cols-4">
              {TRUST_POINTS.map(point => (
                <div
                  key={point}
                  className="rounded-xl border border-border/70 bg-card/55 px-3 py-2 text-center text-[11px] uppercase tracking-[0.14em] text-muted-fg backdrop-blur-sm"
                >
                  {point}
                </div>
              ))}
            </div>
          </div>

          <div className="rounded-3xl border border-border/80 bg-card/70 p-4 shadow-[0_30px_60px_oklch(0.1_0.02_250/.35)] backdrop-blur-sm">
            <div className="mb-3 flex items-center gap-2">
              <span className="h-2.5 w-2.5 rounded-full bg-terminal-green" />
              <span className="h-2.5 w-2.5 rounded-full bg-terminal-amber" />
              <span className="h-2.5 w-2.5 rounded-full bg-primary" />
              <span className="ml-2 font-mono text-xs text-muted-fg">
                live /api/og/product
              </span>
            </div>
            <Image
              src={heroImage}
              alt="Social Card generated product template preview"
              width={1200}
              height={630}
              className="w-full rounded-2xl border border-border/50"
              priority
            />
          </div>
        </section>

        <section className="mx-auto w-full max-w-7xl px-4 py-8 sm:px-6 lg:px-8 lg:py-10">
          <div className="grid gap-4 md:grid-cols-3">
            {[
              {
                icon: ImageIcon,
                title: 'Open Graph Cards',
                copy: 'Launch cards, product promos, portfolio shots, and editorial previews in multiple layout styles.',
              },
              {
                icon: Tag,
                title: 'Dynamic Badges',
                copy: 'Status, score, progress, socials, availability, and stack badges that stay current and embeddable.',
              },
              {
                icon: CircleGauge,
                title: 'SEO Assets + Inspector',
                copy: 'Generate icons and cards, then audit metadata quality with a single inspection request.',
              },
            ].map(item => (
              <article
                key={item.title}
                className="group rounded-2xl border border-border/60 bg-card/70 p-6 backdrop-blur-sm transition-all duration-300 hover:-translate-y-1.5 hover:border-primary/50 hover:shadow-[0_20px_42px_oklch(0.1_0.02_250/.3)]"
              >
                <item.icon className="mb-3 h-5 w-5 text-primary transition-transform duration-300 group-hover:scale-110" />
                <h2 className="text-lg font-semibold">{item.title}</h2>
                <p className="mt-2 text-sm leading-relaxed text-muted-fg">
                  {item.copy}
                </p>
              </article>
            ))}
          </div>
        </section>

        <section className="py-14 sm:py-18">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="mb-10 text-center">
              <p className="text-xs font-semibold uppercase tracking-[0.2em] text-primary/90">
                Interactive Playground
              </p>
              <h2 className="mt-3 text-3xl font-bold sm:text-4xl">
                Preview Real Endpoints Instantly
              </h2>
              <p className="mx-auto mt-3 max-w-2xl text-muted-fg">
                Move between OG templates, badge variants, and SEO routes with
                generated output and copy-ready links.
              </p>
            </div>
          </div>
          <HomepageTabs base={base} />
        </section>

        <section className="mx-auto w-full max-w-7xl px-4 py-14 sm:px-6 lg:px-8">
          <div className="rounded-3xl border border-border/70 bg-card/65 p-6 backdrop-blur-sm sm:p-8">
            <div className="mb-8 flex items-center gap-3">
              <Gem className="h-5 w-5 text-primary" />
              <h2 className="text-2xl font-bold sm:text-3xl">
                How Teams Use It
              </h2>
            </div>
            <div className="grid gap-4 lg:grid-cols-3">
              {BUILDER_STEPS.map((step, index) => (
                <article
                  key={step.title}
                  className="rounded-2xl border border-border/55 bg-background/45 p-5"
                >
                  <p className="mb-3 text-xs font-semibold uppercase tracking-[0.18em] text-primary">
                    Step {index + 1}
                  </p>
                  <h3 className="font-semibold">{step.title}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-muted-fg">
                    {step.body}
                  </p>
                </article>
              ))}
            </div>
            <div className="mt-8 flex flex-wrap gap-3">
              <Link
                href={ROUTES.builder}
                className={buttonVariants({size: 'lg'})}
              >
                Start Building <ArrowRight className="ml-1 h-4 w-4" />
              </Link>
              <Link
                href={ROUTES.docs}
                className={buttonVariants({variant: 'outline', size: 'lg'})}
              >
                Explore Endpoints
              </Link>
              <Link
                href={ROUTES.seoInspector}
                className={buttonVariants({variant: 'outline', size: 'lg'})}
              >
                Inspect SEO
              </Link>
            </div>
          </div>
        </section>

        <section className="mx-auto w-full max-w-5xl px-4 pb-24 sm:px-6 lg:px-8">
          <div className="relative overflow-hidden rounded-3xl border border-primary/35 bg-gradient-to-br from-card/92 via-card/86 to-primary/12 p-8 shadow-[0_22px_56px_oklch(0.1_0.02_250/.38)] sm:p-12">
            <div className="pointer-events-none absolute -left-16 bottom-0 h-40 w-40 rounded-full bg-primary/20 blur-3xl" />
            <div className="pointer-events-none absolute -right-14 top-0 h-44 w-44 rounded-full bg-secondary/20 blur-3xl" />

            <p className="mb-3 inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.2em] text-primary">
              <Sparkles className="h-3.5 w-3.5" />
              Ready for Production
            </p>
            <h2 className="text-3xl font-bold leading-tight sm:text-5xl">
              Give every shared link a premium finish
            </h2>
            <p className="mt-4 max-w-2xl text-base leading-relaxed text-muted-fg sm:text-lg">
              Social Card helps your content look intentional everywhere it
              appears
              so launches, docs, and posts feel cohesive and high quality.
            </p>
            <div className="mt-7 flex flex-wrap gap-3">
              <Link
                href={ROUTES.builder}
                className={buttonVariants({size: 'lg'})}
              >
                Build First Asset <ArrowRight className="ml-1 h-4 w-4" />
              </Link>
              <Link
                href={ROUTES.docs}
                className={buttonVariants({variant: 'outline', size: 'lg'})}
              >
                API Reference
              </Link>
            </div>
            <div className="mt-6 flex flex-wrap gap-4 text-sm text-muted-fg">
              <span className="inline-flex items-center gap-1.5">
                <CheckCircle2 className="h-4 w-4 text-terminal-green" />
                No signup required
              </span>
              <span className="inline-flex items-center gap-1.5">
                <ShieldCheck className="h-4 w-4 text-terminal-green" />
                Self-hostable
              </span>
              <span className="inline-flex items-center gap-1.5">
                <Code2 className="h-4 w-4 text-terminal-green" />
                URL-first integration
              </span>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
