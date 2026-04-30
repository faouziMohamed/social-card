"use client";

import { useMemo, useState } from "react";
import { ChevronDown } from "lucide-react";
import { cn } from "@/lib/utils/cn";
import { Button } from "@/components/ui/button";

interface QueryBreakdownProps {
  url: string;
}

export function QueryBreakdown({ url }: QueryBreakdownProps) {
  const [open, setOpen] = useState(true);
  const entries = useMemo(() => getQueryEntries(url), [url]);

  return (
    <section className="overflow-hidden rounded-xl border border-border/50 bg-card/40">
      <Button
        variant="ghost"
        onClick={() => setOpen((prev) => !prev)}
        className="flex h-auto w-full items-center justify-between gap-3 rounded-none border-b border-border/30 px-4 py-3 text-left"
      >
        <div className="min-w-0">
          <p className="text-xs font-semibold uppercase tracking-[0.14em] text-muted-fg/70">Query Breakdown</p>
          <p className="mt-1 text-xs text-muted-fg/70">
            {entries.length} active {entries.length === 1 ? "query" : "queries"}
          </p>
        </div>
        <ChevronDown className={cn("h-4 w-4 text-muted-fg/60 transition-transform duration-200 shrink-0", open ? "rotate-0" : "-rotate-90")} />
      </Button>

      {open && (
        <div className="grid gap-2 p-3 sm:p-4">
          {entries.length === 0 && (
            <div className="rounded-lg border border-dashed border-border/50 bg-card/30 px-3 py-4 text-xs text-muted-fg/70">
              No active query params. Start filling fields to build your request URL.
            </div>
          )}

          {entries.map(({ key, value }) => (
            <div key={`${key}-${value}`} className="grid min-w-0 gap-2 rounded-lg border border-border/40 bg-card/60 p-3 sm:grid-cols-[180px_minmax(0,1fr)]">
              <div className="flex items-center gap-2">
                <span className="text-[10px] font-semibold uppercase tracking-[0.14em] text-muted-fg/60">Query</span>
                <code className="rounded bg-muted px-2 py-0.5 font-mono text-xs text-primary">{key}</code>
              </div>
              <div className="flex min-w-0 items-start gap-2">
                <span className="shrink-0 pt-0.5 text-[10px] font-semibold uppercase tracking-[0.14em] text-muted-fg/60">Value</span>
                <code className="min-w-0 break-all rounded bg-muted px-2 py-1 font-mono text-xs text-terminal-green">{value}</code>
              </div>
            </div>
          ))}
        </div>
      )}
    </section>
  );
}

function getQueryEntries(url: string): { key: string; value: string }[] {
  if (!url) return [];
  try {
    const parsed = new URL(url);
    return [...parsed.searchParams.entries()].map(([key, value]) => ({ key, value }));
  } catch {
    return [];
  }
}
