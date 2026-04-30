import { ExternalLink } from "lucide-react";
import { Badge } from "@/components/ui/badge";

interface ParamRow {
  name: string;
  type: string;
  defaultValue?: string;
  description: string;
  required: boolean;
}

interface ApiEndpointCardProps {
  id:           string;
  path:         string;
  description?: string;
  params:       ParamRow[];
  exampleUrl:   string;
  previewAspect?: string; // e.g. "220/36" for badges
}

export function ApiEndpointCard({ id, path, description, params, exampleUrl, previewAspect }: ApiEndpointCardProps) {
  return (
    <section id={id} className="rounded-lg border border-border bg-card overflow-hidden">
      <div className="flex items-center justify-between border-b border-border bg-muted/50 px-6 py-4">
        <div className="flex items-center gap-3">
          <Badge variant="default" className="font-mono text-xs">GET</Badge>
          <code className="font-mono text-sm text-primary">{path}</code>
        </div>
        <a href={exampleUrl} target="_blank" rel="noopener noreferrer" className="flex items-center gap-1 text-xs text-muted-fg hover:text-primary transition-colors">
          Live example <ExternalLink className="h-3 w-3" />
        </a>
      </div>

      {description && (
        <div className="border-b border-border px-6 py-3 text-sm text-muted-fg">{description}</div>
      )}

      <div className="p-4 border-b border-border bg-muted/20 flex items-center justify-center min-h-16">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={exampleUrl}
          alt={`${id} example`}
          className="max-w-full rounded"
          style={previewAspect ? { aspectRatio: previewAspect.replace('/', ' / ') } : undefined}
          loading="lazy"
        />
      </div>

      <div className="overflow-x-auto">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-border text-left text-xs font-semibold uppercase tracking-wider text-muted-fg">
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
                  <code className="font-mono text-xs text-primary">{p.name}</code>
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

      <div className="border-t border-border px-6 py-4">
        <p className="mb-1.5 text-xs font-semibold uppercase tracking-widest text-muted-fg">Example URL</p>
        <code className="block rounded bg-muted px-3 py-2 font-mono text-xs break-all text-terminal-green">{exampleUrl}</code>
      </div>
    </section>
  );
}
