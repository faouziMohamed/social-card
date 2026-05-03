import {CopyButton} from '@/components/shared/copy-button';
import {Badge} from '@/components/ui/badge';
import {ExternalLink} from 'lucide-react';
import Image from 'next/image';

interface ParamRow {
  name: string;
  type: string;
  defaultValue?: string;
  description: string;
  required: boolean;
}

interface ApiEndpointCardProps {
  id: string;
  path: string;
  description?: string;
  params: ParamRow[];
  exampleUrl: string;
  previewAspect?: string; // e.g. "220/36" for badges
  previewText?: string;
}

export function ApiEndpointCard({
  id,
  path,
  description,
  params,
  exampleUrl,
  previewAspect,
  previewText,
}: ApiEndpointCardProps) {
  return (
    <section
      id={id}
      className="experience-card mechanical-corners overflow-hidden rounded-xl border border-border/60 bg-card/60 shadow-sm"
    >
      {/* Header */}
      <div className="flex items-center justify-between border-b border-border/50 bg-card/80 px-6 py-4">
        <div className="flex items-center gap-3">
          <Badge variant="default" className="font-mono text-xs">
            GET
          </Badge>
          <code className="font-mono text-sm text-primary">{path}</code>
        </div>
        <a
          href={exampleUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-1 text-xs text-muted-fg hover:text-primary transition-colors"
        >
          Live example <ExternalLink className="h-3 w-3" />
        </a>
      </div>

      {/* Description */}
      {description && (
        <div className="border-b border-border px-6 py-3 text-sm text-muted-fg">
          {description}
        </div>
      )}

      {/* Preview */}
      <div className="preview-canvas flex min-h-24 items-center justify-center border-b border-border/40 bg-background/40 p-6">
        {previewText ? (
          <pre className="w-full overflow-auto rounded border border-border/30 bg-card/50 p-3 text-left font-mono text-[11px] text-muted-fg/90 whitespace-pre-wrap">
            {previewText}
          </pre>
        ) : (
          <Image
            src={exampleUrl}
            alt={`${id} example`}
            className="max-w-full rounded shimmer-track"
            width={1200}
            height={630}
            style={
              previewAspect
                ? {aspectRatio: previewAspect.replace('/', ' / ')}
                : undefined
            }
            loading="lazy"
          />
        )}
      </div>

      {/* Params table */}
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

      {/* Example URL */}
      <div className="border-t border-border/50 bg-background/30 px-6 py-4">
        <p className="mb-2 text-xs font-semibold uppercase tracking-widest text-muted-fg">
          <span className="status-indicator status-success mr-2" />
          Example URL
        </p>
        <div className="flex items-center gap-2 rounded-md border border-border bg-muted/30 px-3 py-2">
          <code className="flex-1 terminal-prompt text-xs break-all">
            {exampleUrl}
          </code>
          <CopyButton text={exampleUrl} />
        </div>
      </div>
    </section>
  );
}
