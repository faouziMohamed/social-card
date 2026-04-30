import Link from "next/link";
import { ArrowRight, Zap, Layers, Code2, Globe } from "lucide-react";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { buttonVariants } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ROUTES } from "@/lib/utils/routes";
import { env } from "@/lib/env";
import { TEMPLATE_META, DEMO_PARAMS } from "@/modules/og/shared/og-template-registry";
import { OG_ROUTES } from "@/modules/og/shared/og-routes";

const QUICK_START = [
  {
    lang: "HTML",
    code: `<meta property="og:image"\n  content="https://og.yourdomain.com/api/og/general\n           ?title=Hello+World&theme=dark" />`,
  },
  {
    lang: "Next.js",
    code: `export async function generateMetadata() {\n  const url = new URL('/api/og/general', process.env.NEXT_PUBLIC_DEPLOYMENT_URL);\n  url.searchParams.set('title', 'Hello World');\n  return { openGraph: { images: [url.toString()] } };\n}`,
  },
  {
    lang: "cURL",
    code: `curl -G "https://og.yourdomain.com/api/og/general" \\\n  --data-urlencode "title=Hello World" -o image.png`,
  },
  {
    lang: "Python",
    code: `import requests\nresp = requests.get(\n  "https://og.yourdomain.com/api/og/general",\n  params={"title": "Hello World", "theme": "dark"},\n)\nopen("image.png", "wb").write(resp.content)`,
  },
] as const;


export default function HomePage() {
  const base = env.deploymentURL;

  return (
    <div className="flex min-h-full flex-col">
      <Navbar />

      <main className="flex-1">
        {/* Hero */}
        <section className="relative overflow-hidden py-24 sm:py-32">
          <div className="circuit-pattern absolute inset-0 opacity-40" />
          <div className="relative mx-auto max-w-4xl px-4 text-center sm:px-6 lg:px-8">
            <Badge variant="outline" className="mb-6 border-primary/40 text-primary">
              <span className="status-indicator status-success mr-1.5" />
              API-first · Edge Runtime · 7 Templates
            </Badge>

            <h1 className="text-4xl font-bold tracking-tight sm:text-6xl lg:text-7xl">
              Open Graph Images,{" "}
              <span className="text-primary">on demand</span>
            </h1>

            <p className="mx-auto mt-6 max-w-2xl text-lg text-muted-fg">
              Self-hostable social meta image generator. Drop a URL into your{" "}
              <code className="rounded bg-muted px-1.5 py-0.5 font-mono text-sm text-primary">
                &lt;meta og:image&gt;
              </code>{" "}
              tag and get a beautiful PNG at 1200×630, 800×800, or LinkedIn size.
            </p>

            <div className="mt-10 flex flex-col items-center gap-4 sm:flex-row sm:justify-center">
              <Link href={ROUTES.builder} className={buttonVariants({ size: "lg" })}>
                Open Builder <ArrowRight className="ml-1 h-4 w-4" />
              </Link>
              <Link href={ROUTES.docs} className={buttonVariants({ variant: "outline", size: "lg" })}>
                View Docs
              </Link>
            </div>
          </div>
        </section>

        {/* Demo strip */}
        <section className="py-16 bg-muted/30">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <p className="mb-8 text-center text-sm font-mono text-muted-fg uppercase tracking-widest">
              Live previews — actual API output
            </p>
            <div className="grid gap-6 sm:grid-cols-3">
              {DEMO_PARAMS.map(({ template, params }) => (
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

        {/* Feature grid */}
        <section className="py-20">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <h2 className="mb-12 text-center text-3xl font-bold">7 Ready-Made Templates</h2>
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
              {TEMPLATE_META.map(({ name, label, color, desc }) => (
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

              <div className="rounded-lg border border-border bg-card p-5">
                <div className="flex flex-col gap-3 h-full justify-center">
                  {[
                    { Icon: Zap,    text: "Edge Runtime"  },
                    { Icon: Layers, text: "4 size presets" },
                    { Icon: Code2,  text: "Zod validation" },
                    { Icon: Globe,  text: "CORS-enabled"   },
                  ].map(({ Icon, text }) => (
                    <div key={text} className="flex items-center gap-2 text-sm text-muted-fg">
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
        <section className="py-20 bg-muted/30">
          <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
            <h2 className="mb-4 text-center text-3xl font-bold">Quick Start</h2>
            <p className="mb-10 text-center text-muted-fg">
              Paste the URL directly — no SDK, no signup.
            </p>

            <div className="rounded-lg border border-border bg-card overflow-hidden">
              <div className="flex items-center gap-2 border-b border-border bg-muted px-4 py-3">
                {[0, 1, 2].map((i) => (
                  <span key={i} className="h-3 w-3 rounded-full bg-border" />
                ))}
                <span className="ml-2 font-mono text-xs terminal-prompt">quick-start</span>
              </div>

              {QUICK_START.map(({ lang, code }) => (
                <div key={lang} className="border-b border-border last:border-0">
                  <div className="px-4 pt-3 pb-1">
                    <Badge variant="muted" className="text-xs">{lang}</Badge>
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
