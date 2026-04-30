"use client";

import { cn } from "@/lib/utils/cn";
import { TemplateSelector } from "./template-selector";
import { BuilderForm } from "./builder-form";
import { PreviewPanel } from "./preview-panel";
import { CopyButton } from "./copy-button";
import { QueryBreakdown } from "./query-breakdown";
import { useBuilderState, type TargetKey } from "../hooks/use-builder-state";

const TARGET_OPTIONS: { value: TargetKey; label: string; size: string; aspect: string }[] = [
  { value: "og",            label: "OG",       size: "1200×630", aspect: "1200/630" },
  { value: "twitter-large", label: "Twitter",  size: "1200×628", aspect: "1200/628" },
  { value: "twitter-small", label: "Square",   size: "800×800",  aspect: "800/800"  },
  { value: "linkedin",      label: "LinkedIn", size: "1200×627", aspect: "1200/627" },
];

export function BuilderIsland() {
  const { template, params, target, previewSrc, ogUrl, setTemplate, setParam, setTarget } = useBuilderState();

  const currentAspect = TARGET_OPTIONS.find((t) => t.value === target)?.aspect ?? "1200/630";

  return (
    <div className="flex min-w-0 flex-col gap-6">
      <div className="flex min-w-0 flex-col gap-6 lg:grid lg:grid-cols-[340px_minmax(0,1fr)] lg:gap-8 lg:items-start">

        {/* ── Left panel: template selector + form ───────────────────────── */}
        <aside className="flex min-w-0 flex-col gap-0 overflow-hidden rounded-xl border border-border/40 bg-card/40">
          <div className="px-3 pb-2 pt-3 border-b border-border/30">
            <p className="mb-2 text-[10px] font-bold uppercase tracking-[0.14em] text-muted-fg/50">Template</p>
            <TemplateSelector value={template} onChange={setTemplate} />
          </div>

          <div className="overflow-y-auto max-h-[calc(100dvh-24rem)] scrollbar-thin scrollbar-track-transparent scrollbar-thumb-white/10">
            <BuilderForm
              key={template}
              template={template}
              params={params}
              onParamChange={setParam}
            />
          </div>
        </aside>

        {/* ── Right panel: target pills + preview + URL ───────────────────── */}
        <div className="flex min-w-0 flex-col gap-4">
          {/* Target size selector */}
          <div className="flex flex-wrap items-center gap-1.5 rounded-xl border border-border/30 bg-card/20 p-1.5">
            {TARGET_OPTIONS.map(({ value, label, size }) => {
              const active = target === value;
              return (
                <button
                  key={value}
                  type="button"
                  onClick={() => setTarget(value)}
                  className={cn(
                    "flex items-center gap-1.5 rounded-full border px-3 py-1 text-xs font-medium transition-all duration-150",
                    "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/50",
                    active
                      ? "border-primary/60 bg-primary/10 text-primary"
                      : "border-border/40 bg-card/30 text-muted-fg hover:border-border/70 hover:text-foreground",
                  )}
                >
                  {label}
                  <span className={cn("font-mono text-[10px] tabular-nums", active ? "text-primary/70" : "text-muted-fg/40")}>
                    {size}
                  </span>
                </button>
              );
            })}
          </div>

          {/* Preview */}
          <PreviewPanel src={previewSrc} aspectRatio={currentAspect} />

          {/* Copy URL */}
          <CopyButton url={ogUrl} />
        </div>
      </div>

      <QueryBreakdown url={ogUrl} />
    </div>
  );
}
