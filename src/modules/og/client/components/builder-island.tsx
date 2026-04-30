"use client";

import { RotateCcw } from "lucide-react";
import { cn } from "@/lib/utils/cn";
import { Button } from "@/components/ui/button";
import { TemplateSelector } from "./template-selector";
import { BuilderForm } from "./builder-form";
import { PreviewPanel } from "./preview-panel";
import { CopyButton } from "./copy-button";
import { QueryBreakdown } from "./query-breakdown";
import { useBuilderState, type TargetKey } from "../hooks/use-builder-state";
import { TEMPLATE_META } from "@/modules/og/shared/og-template-registry";

const TARGET_OPTIONS: { value: TargetKey; label: string; size: string; aspect: string }[] = [
  { value: "og",            label: "OG",       size: "1200×630", aspect: "1200/630" },
  { value: "twitter-large", label: "Twitter",  size: "1200×628", aspect: "1200/628" },
  { value: "twitter-small", label: "Square",   size: "800×800",  aspect: "800/800"  },
  { value: "linkedin",      label: "LinkedIn", size: "1200×627", aspect: "1200/627" },
];

export function BuilderIsland() {
  const { template, params, target, previewSrc, ogUrl, setTemplate, setParam, setTarget, resetParams } = useBuilderState();

  const currentAspect   = TARGET_OPTIONS.find((t) => t.value === target)?.aspect ?? "1200/630";
  const currentTemplate = TEMPLATE_META.find((t) => t.name === template);

  return (
    <div className="flex min-w-0 flex-col gap-6">

      {/* ── Template picker — full width ────────────────────────────────── */}
      <section className="rounded-2xl border border-border/30 bg-card/20 pb-2 pt-4 px-2">
        <div className="mb-1 px-2 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="text-[10px] font-bold uppercase tracking-[0.16em] text-muted-fg/50">
              Template
            </span>
            {currentTemplate && (
              <>
                <span className="text-muted-fg/30 text-[10px]">·</span>
                <span
                  className="text-[11px] font-semibold"
                  style={{ color: currentTemplate.color }}
                >
                  {currentTemplate.label}
                </span>
              </>
            )}
          </div>
          <span className="text-[10px] text-muted-fg/35">
            {TEMPLATE_META.findIndex((t) => t.name === template) + 1} / {TEMPLATE_META.length}
          </span>
        </div>
        <TemplateSelector value={template} onChange={setTemplate} />
      </section>

      {/* ── Builder: form (left) + preview (right) ──────────────────────── */}
      <div className="flex min-w-0 flex-col gap-6 lg:grid lg:grid-cols-[380px_minmax(0,1fr)] lg:items-start lg:gap-8">

        {/* Form panel */}
        <aside className="flex min-w-0 flex-col gap-0 overflow-hidden rounded-2xl border border-border/40 bg-card/40">
          {/* Form header */}
          <div className="flex items-center justify-between border-b border-border/30 px-4 py-2.5">
            <div className="flex items-center gap-2">
              {currentTemplate && (
                <span className="text-base leading-none" style={{ color: currentTemplate.color }}>
                  {currentTemplate.icon}
                </span>
              )}
              <span className="text-xs font-semibold text-foreground/80">
                {currentTemplate?.label ?? "Fields"}
              </span>
              <span className="text-[10px] text-muted-fg/40">{currentTemplate?.desc}</span>
            </div>
            <Button
              variant="ghost"
              size="icon"
              onClick={resetParams}
              title="Reset fields"
              className="h-6 w-6 text-muted-fg/40 hover:text-muted-fg"
            >
              <RotateCcw className="h-3 w-3" />
            </Button>
          </div>

          {/* Scrollable fields */}
          <div className="overflow-y-auto max-h-[calc(100dvh-16rem)] scrollbar-thin scrollbar-track-transparent scrollbar-thumb-white/10">
            <BuilderForm
              key={template}
              template={template}
              params={params}
              onParamChange={setParam}
            />
          </div>
        </aside>

        {/* Preview panel */}
        <div className="flex min-w-0 flex-col gap-4">

          {/* Target size pills */}
          <div className="flex flex-wrap items-center gap-1.5 rounded-xl border border-border/30 bg-card/20 p-1.5">
            {TARGET_OPTIONS.map(({ value, label, size }) => {
              const active = target === value;
              return (
                <Button
                  key={value}
                  variant="outline"
                  onClick={() => setTarget(value)}
                  className={cn(
                    "h-auto gap-1.5 rounded-full border px-3 py-1 text-xs font-medium transition-all duration-150",
                    active
                      ? "border-primary/60 bg-primary/10 text-primary hover:bg-primary/15 hover:text-primary"
                      : "border-border/40 bg-card/30 text-muted-fg hover:border-border/70 hover:text-foreground",
                  )}
                >
                  {label}
                  <span className={cn("font-mono text-[10px] tabular-nums", active ? "text-primary/70" : "text-muted-fg/40")}>
                    {size}
                  </span>
                </Button>
              );
            })}
          </div>

          <PreviewPanel src={previewSrc} aspectRatio={currentAspect} />
          <CopyButton url={ogUrl} />
        </div>
      </div>

      <QueryBreakdown url={ogUrl} />
    </div>
  );
}
