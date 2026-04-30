import Link from "next/link";
import { ExternalLink } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { CopyButton } from "@/components/shared/CopyButton";
import { ROUTES } from "@/lib/utils/routes";
import type { TemplateName } from "@/modules/og/shared/og.types";

interface ParamRow {
  name: string;
  type: string;
  defaultValue?: string;
  description: string;
  required: boolean;
}

interface EndpointCardProps {
  template:   TemplateName;
  params:     ParamRow[];
  exampleUrl: string;
}

export function EndpointCard({ template, params, exampleUrl }: EndpointCardProps) {
  const endpointPath = ROUTES.api.og[template];

  return (
    <section id={template} className="experience-card mechanical-corners rounded-lg border border-border bg-card overflow-hidden">
      {/* Header */}
      <div className="flex items-center justify-between border-b border-border builder-panel px-6 py-4">
        <div className="flex items-center gap-3">
          <Badge variant="default" className="font-mono text-xs">GET</Badge>
          <code className="font-mono text-sm text-primary">{endpointPath}</code>
        </div>
        <div className="flex items-center gap-3">
          <Link
            href={`${ROUTES.builder}?template=${template}`}
            className="flex items-center gap-1 text-xs text-muted-fg hover:text-primary transition-colors"
          >
            Open in Builder
          </Link>
          <a
            href={exampleUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-1 text-xs text-muted-fg hover:text-primary transition-colors"
          >
            Live example <ExternalLink className="h-3 w-3" />
          </a>
        </div>
      </div>

      {/* Preview */}
      <div className="preview-canvas flex items-center justify-center p-6 border-b border-border">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={exampleUrl}
          alt={`${template} template example`}
          className="mx-auto max-w-lg rounded w-full object-cover shimmer-track"
          style={{ aspectRatio: "1200 / 630" }}
          loading="lazy"
        />
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
              <tr key={p.name} className={i % 2 === 0 ? "bg-card" : "bg-muted/20"}>
                <td className="px-6 py-3">
                  <code className="terminal-prompt text-xs">{p.name}</code>
                  {p.required && <span className="ml-1.5 text-xs text-red-400">*</span>}
                </td>
                <td className="px-6 py-3"><Badge variant="muted" className="text-xs font-mono">{p.type}</Badge></td>
                <td className="px-6 py-3 text-xs text-muted-fg font-mono">{p.defaultValue ?? "—"}</td>
                <td className="px-6 py-3 text-xs text-muted-fg">{p.description}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Example URL */}
      <div className="border-t border-border px-6 py-4">
        <p className="mb-2 text-xs font-semibold uppercase tracking-widest text-muted-fg">
          <span className="status-indicator status-success mr-2" />
          Example URL
        </p>
        <div className="flex items-center gap-2 rounded-md border border-border bg-muted/30 px-3 py-2">
          <code className="flex-1 terminal-prompt text-xs break-all">{exampleUrl}</code>
          <CopyButton text={exampleUrl} />
        </div>
      </div>
    </section>
  );
}
