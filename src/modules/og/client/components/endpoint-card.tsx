'use client';

import {CopyButton} from '@/components/shared/copy-button';
import {Badge} from '@/components/ui/badge';
import {Button} from '@/components/ui/button';
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import {ROUTES} from '@/lib/utils/routes';
import {
  FONT_FAMILY_GROUPS,
  FONT_FAMILY_OPTIONS,
} from '@/modules/og/shared/og-font-catalog';
import type {TemplateName} from '@/modules/og/shared/og.types';
import {ExternalLink} from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import {useState} from 'react';

interface ParamRow {
  name: string;
  type: string;
  defaultValue?: string;
  description: string;
  required: boolean;
}

interface EndpointCardProps {
  template: TemplateName;
  description?: string;
  params: ParamRow[];
  exampleUrl: string;
  compact?: boolean;
  onToggleCompact?: () => void;
  responseSpec?: {
    contentType: string;
    bodyShape: string;
  };
}

export function EndpointCard({
  template,
  description,
  params,
  exampleUrl,
  compact,
  onToggleCompact,
  responseSpec,
}: EndpointCardProps) {
  const endpointPath = ROUTES.api.og[template];
  const [selectedFont, setSelectedFont] = useState(() => {
    const randomIndex = Math.floor(Math.random() * FONT_FAMILY_OPTIONS.length);
    return FONT_FAMILY_OPTIONS[randomIndex]?.value ?? 'geist';
  });
  const resolvedExampleUrl = withFontFamily(exampleUrl, selectedFont);

  return (
    <section
      id={template}
      className="experience-card mechanical-corners overflow-hidden rounded-xl border border-border/60 bg-card/60 shadow-sm"
    >
      {/* Header */}
      <div className="flex items-center justify-between border-b border-border/50 bg-card/80 px-6 py-4">
        <div className="flex items-center gap-3">
          <Badge variant="default" className="font-mono text-xs">
            GET
          </Badge>
          <code className="font-mono text-sm text-primary">{endpointPath}</code>
        </div>
        <div className="flex items-center gap-3">
          {onToggleCompact && (
            <Button
              size="sm"
              variant="outline"
              onClick={onToggleCompact}
              className="h-7 px-2 text-[11px]"
            >
              {compact ? 'Expand' : 'Collapse'}
            </Button>
          )}
          <Link
            href={`${ROUTES.builder}?template=${template}`}
            className="flex items-center gap-1 text-xs text-muted-fg hover:text-primary transition-colors"
          >
            Open in Builder
          </Link>
          <a
            href={resolvedExampleUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-1 text-xs text-muted-fg hover:text-primary transition-colors"
          >
            Live example <ExternalLink className="h-3 w-3" />
          </a>
        </div>
      </div>

      {/* Preview */}
      <div className="border-b border-border px-6 py-3 text-sm text-muted-fg">
        {description ?? 'OG template preview endpoint.'}
      </div>
      {!compact && (
        <div className="preview-canvas flex items-center justify-center border-b border-border/40 bg-background/40 p-6">
          <div className="w-full max-w-lg space-y-3">
            <div className="flex items-center justify-end gap-2">
              <span className="text-xs text-muted-fg">Font</span>
              <Select value={selectedFont} onValueChange={setSelectedFont}>
                <SelectTrigger className="h-8 w-[220px]">
                  <SelectValue placeholder="Select font family" />
                </SelectTrigger>
                <SelectContent>
                  {FONT_FAMILY_GROUPS.map(group => (
                    <SelectGroup key={group.key}>
                      <SelectLabel>{group.label}</SelectLabel>
                      {group.options.map(font => (
                        <SelectItem key={font.value} value={font.value}>
                          {font.label}
                        </SelectItem>
                      ))}
                    </SelectGroup>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <Image
              src={resolvedExampleUrl}
              alt={`${template} template example`}
              className="mx-auto rounded w-full object-cover shimmer-track"
              width={1200}
              height={630}
              style={{aspectRatio: '1200 / 630'}}
              loading="lazy"
            />
          </div>
        </div>
      )}

      {/* Params table */}
      {!compact && (
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-border text-left text-xs font-semibold uppercase tracking-wider text-muted-fg bg-muted/30">
                <th className="px-6 py-3">Parameter</th>
                <th className="px-6 py-3">Type</th>
                <th className="px-6 py-3">Default</th>
                <th className="px-6 py-3">Description</th>
              </tr>
            </thead>
            <tbody>
              {params.map((p, i) => (
                <tr
                  key={p.name}
                  className={i % 2 === 0 ? 'bg-card' : 'bg-muted/20'}
                >
                  <td className="px-6 py-3">
                    <code className="terminal-prompt text-xs">{p.name}</code>
                    {p.required && (
                      <span className="ml-1.5 text-xs text-red-400">*</span>
                    )}
                  </td>
                  <td className="px-6 py-3">
                    <Badge variant="muted" className="text-xs font-mono">
                      {p.type}
                    </Badge>
                  </td>
                  <td className="px-6 py-3 text-xs text-muted-fg font-mono">
                    {p.defaultValue ?? '—'}
                  </td>
                  <td className="px-6 py-3 text-xs text-muted-fg">
                    {p.description}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* Example URL */}
      {!compact && (
        <div className="border-t border-border/50 bg-background/30 px-6 py-4">
          <p className="mb-2 text-xs font-semibold uppercase tracking-widest text-muted-fg">
            <span className="status-indicator status-success mr-2" />
            Example URL
          </p>
          <div className="flex items-center gap-2 rounded-md border border-border bg-muted/30 px-3 py-2">
            <code className="flex-1 terminal-prompt text-xs break-all">
              {resolvedExampleUrl}
            </code>
            <CopyButton text={resolvedExampleUrl} />
          </div>
        </div>
      )}

      {!compact && responseSpec && (
        <div className="border-t border-border/50 bg-background/30 px-6 py-4">
          <p className="mb-2 text-xs font-semibold uppercase tracking-widest text-muted-fg">
            Response Spec
          </p>
          <div className="rounded-md border border-border bg-muted/30 px-3 py-2">
            <p className="text-xs font-mono text-foreground/80">
              Content-Type: {responseSpec.contentType}
            </p>
            <pre className="mt-2 whitespace-pre-wrap font-mono text-xs text-muted-fg">
              {responseSpec.bodyShape}
            </pre>
          </div>
        </div>
      )}
    </section>
  );
}

function withFontFamily(urlString: string, fontFamily: string): string {
  try {
    const url = new URL(urlString);
    url.searchParams.set('fontFamily', fontFamily);
    return url.toString();
  } catch {
    return urlString;
  }
}
