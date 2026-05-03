'use client';

import {Button} from '@/components/ui/button';
import {Input} from '@/components/ui/input';
import type {
  SeoInspectorApiResponse,
  SeoInspectorResult,
} from '@/modules/seo/server/seo-inspector.server';
import {useState} from 'react';

export function SeoInspectorClient() {
  const [url, setUrl] = useState('https://example.com');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [result, setResult] = useState<SeoInspectorResult | null>(null);

  const inspect = async () => {
    setLoading(true);
    setError('');
    setResult(null);
    try {
      const res = await fetch('/api/seo/inspect', {
        method: 'POST',
        headers: {'content-type': 'application/json'},
        body: JSON.stringify({url}),
      });
      const data = (await res.json()) as
        | SeoInspectorApiResponse
        | SeoInspectorResult
        | {error: string};
      if (!res.ok || 'error' in data) {
        setError('error' in data ? data.error : 'Inspection failed');
        return;
      }
      setResult('data' in data ? data.data : data);
    } catch (fetchError) {
      setError(
        fetchError instanceof Error ? fetchError.message : 'Request failed',
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col gap-6">
      <div className="rounded-xl border border-border/40 bg-card/30 p-4">
        <div className="flex gap-2">
          <Input
            value={url}
            onChange={event => setUrl(event.target.value)}
            placeholder="https://example.com"
            className="h-9"
          />
          <Button onClick={inspect} disabled={loading} className="h-9 px-4">
            {loading ? 'Inspecting…' : 'Inspect'}
          </Button>
        </div>
        {error && <p className="mt-2 text-xs text-red-400">{error}</p>}
      </div>

      {result && (
        <div className="grid gap-4 lg:grid-cols-2">
          <DataCard
            title="Core Tags"
            lines={[
              `Title: ${result.title || '—'}`,
              `Description: ${result.metaDescription || '—'}`,
              `Canonical: ${result.canonical || '—'}`,
              `Robots: ${result.robots || '—'}`,
            ]}
          />
          <DataCard
            title="Open Graph / Twitter"
            lines={[
              `OG Title: ${result.og.title || '—'}`,
              `OG Image: ${result.og.image || '—'}`,
              `Twitter Card: ${result.twitter.card || '—'}`,
              `Twitter Image: ${result.twitter.image || '—'}`,
            ]}
          />
          <DataCard
            title="Structure"
            lines={[
              `H1 count: ${result.headings.h1Count}`,
              `Images: ${result.images.total}`,
              `Missing alt: ${result.images.missingAlt}`,
              `JSON-LD scripts: ${result.jsonLd.count}`,
            ]}
          />
          <DataCard
            title="Icons"
            lines={[
              `Favicon: ${result.icons.favicon || '—'}`,
              `Apple: ${result.icons.appleTouchIcon || '—'}`,
              `Manifest: ${result.icons.manifest || '—'}`,
            ]}
          />
          <div className="rounded-xl border border-border/40 bg-card/20 p-4 lg:col-span-2">
            <p className="mb-3 text-xs font-semibold uppercase tracking-wider text-muted-fg">
              Image Previews
            </p>
            <div className="grid gap-3 md:grid-cols-2">
              <InspectorImagePreview
                label="OG Image"
                url={resolveAbsoluteUrl(result.finalUrl, result.og.image)}
                aspect="1200 / 630"
              />
              <InspectorImagePreview
                label="Twitter Image"
                url={resolveAbsoluteUrl(result.finalUrl, result.twitter.image)}
                aspect="1200 / 630"
              />
              <InspectorImagePreview
                label="Favicon"
                url={resolveAbsoluteUrl(result.finalUrl, result.icons.favicon)}
                aspect="1 / 1"
              />
              <InspectorImagePreview
                label="Apple Touch Icon"
                url={resolveAbsoluteUrl(
                  result.finalUrl,
                  result.icons.appleTouchIcon,
                )}
                aspect="1 / 1"
              />
            </div>
          </div>
          <div className="rounded-xl border border-border/40 bg-card/20 p-4 lg:col-span-2">
            <p className="mb-3 text-xs font-semibold uppercase tracking-wider text-muted-fg">
              Findings
            </p>
            <div className="flex flex-col gap-2">
              {result.findings.map(finding => (
                <div
                  key={finding.id}
                  className="rounded-lg border border-border/40 bg-card/40 p-3"
                >
                  <p className="text-sm font-semibold">
                    [{finding.severity.toUpperCase()}] {finding.title}
                  </p>
                  <p className="text-xs text-muted-fg">{finding.detail}</p>
                  <p className="text-xs text-primary mt-1">
                    Recommendation: {finding.recommendation}
                  </p>
                </div>
              ))}
              {result.findings.length === 0 && (
                <p className="text-xs text-terminal-green">No issues found.</p>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

function DataCard({title, lines}: {title: string; lines: string[]}) {
  return (
    <div className="rounded-xl border border-border/40 bg-card/20 p-4">
      <p className="mb-2 text-xs font-semibold uppercase tracking-wider text-muted-fg">
        {title}
      </p>
      <div className="space-y-1">
        {lines.map(line => (
          <p key={line} className="text-xs text-foreground/80 break-all">
            {line}
          </p>
        ))}
      </div>
    </div>
  );
}

function InspectorImagePreview({
  label,
  url,
  aspect,
}: {
  label: string;
  url: string;
  aspect: string;
}) {
  return (
    <div className="rounded-lg border border-border/30 bg-card/30 p-3">
      <p className="mb-2 text-xs font-medium text-foreground/80">{label}</p>
      {url ? (
        <div
          className="overflow-hidden rounded border border-border/30 bg-background/30"
          style={{aspectRatio: aspect}}
        >
          <img
            src={url}
            alt={label}
            className="h-full w-full object-contain"
            loading="lazy"
          />
        </div>
      ) : (
        <p className="text-xs text-muted-fg">No image URL found.</p>
      )}
    </div>
  );
}

function resolveAbsoluteUrl(baseUrl: string, rawUrl: string): string {
  if (!rawUrl) return '';
  try {
    return new URL(rawUrl, baseUrl).toString();
  } catch {
    return '';
  }
}
