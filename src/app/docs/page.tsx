import Link from "next/link";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { EndpointCard } from "@/modules/og/client/components/endpoint-card";
import { getParamDescriptors } from "@/modules/og/shared/og-docs";
import { EXAMPLE_PARAMS } from "@/modules/og/shared/og-template-registry";
import { OG_ROUTES } from "@/modules/og/shared/og-routes";
import { env } from "@/lib/env";
import { ROUTES } from "@/lib/utils/routes";
import type { TemplateName } from "@/modules/og/shared/og.types";

export const metadata = {
  title: "Docs — OG Graph",
  description: "API documentation for all OG image templates.",
};

export default function DocsPage() {
  const base = env.deploymentURL;
  const templates = Object.keys(OG_ROUTES) as TemplateName[];

  return (
    <div className="flex min-h-full flex-col">
      <Navbar />

      <main className="flex-1 py-12">
        <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
          {/* Header */}
          <div className="mb-12">
            <h1 className="text-3xl font-bold mb-2">API Reference</h1>
            <p className="text-muted-fg">
              All endpoints return PNG images. Append query parameters to customise each template.
              Base URL:{" "}
              <code className="font-mono text-xs text-primary">{base}</code>
            </p>
          </div>

          {/* TOC */}
          <nav className="mb-12 rounded-lg border border-border bg-card p-4">
            <p className="mb-3 text-xs font-semibold uppercase tracking-widest text-muted-fg">Templates</p>
            <div className="flex flex-wrap gap-2">
              {templates.map((t) => (
                <a
                  key={t}
                  href={`#${t}`}
                  className="rounded border border-border px-3 py-1 text-sm hover:border-primary/50 hover:text-primary transition-colors capitalize"
                >
                  {t}
                </a>
              ))}
            </div>
          </nav>

          {/* Endpoint cards */}
          <div className="flex flex-col gap-12">
            {templates.map((template) => {
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

          {/* Footer note */}
          <div className="mt-16 rounded-lg border border-border bg-muted/30 p-6 text-sm text-muted-fg">
            <p className="font-semibold mb-1">Response</p>
            <ul className="space-y-1 list-disc list-inside">
              <li><code className="font-mono text-xs">200</code> — PNG image with <code className="font-mono text-xs">Cache-Control: public, max-age=86400</code></li>
              <li><code className="font-mono text-xs">400</code> — JSON with Zod validation errors</li>
              <li><code className="font-mono text-xs">500</code> — JSON with error message</li>
            </ul>
            <p className="mt-4">
              All routes run on{" "}
              <span className="text-primary font-mono text-xs">export const runtime = &apos;edge&apos;</span> for
              minimal cold-start latency.{" "}
              <Link href={ROUTES.builder} className="text-primary hover:underline">
                Try the Builder →
              </Link>
            </p>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
