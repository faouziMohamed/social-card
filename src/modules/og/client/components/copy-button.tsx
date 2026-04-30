"use client";

import { useState } from "react";
import { cn } from "@/lib/utils/cn";

interface CopyButtonProps {
  url: string;
}

export function CopyButton({ url }: CopyButtonProps) {
  const [state, setState] = useState<"idle" | "copied">("idle");

  const handleCopy = async () => {
    if (!url) return;
    await navigator.clipboard.writeText(url);
    setState("copied");
    setTimeout(() => setState("idle"), 2000);
  };

  const displayUrl = url.replace(/^https?:\/\/[^/]+/, "");

  return (
    <div className="overflow-hidden rounded-xl border border-border/60 bg-card/50">
      <div className="flex min-w-0 items-center gap-2 border-b border-border/40 px-4 py-3">
        <span className="shrink-0 rounded-full border border-border/40 bg-card/70 px-2 py-0.5 font-mono text-[10px] text-muted-fg/70">
          GET
        </span>
        <span className="min-w-0 flex-1 overflow-hidden text-ellipsis whitespace-nowrap font-mono text-xs text-muted-fg">
          {displayUrl || "/api/og/…"}
        </span>
      </div>

      <div className="grid grid-cols-2">
        <button
          type="button"
          onClick={handleCopy}
          disabled={!url}
          className={cn(
            "flex h-10 items-center justify-center gap-2 border-r border-border/40 text-xs font-medium transition-all duration-200 focus:outline-none",
            state === "copied" ? "text-terminal-green" : "text-muted-fg hover:bg-white/[0.04] hover:text-foreground",
            !url && "cursor-not-allowed opacity-30",
          )}
        >
          {state === "copied"
            ? <><span className="text-sm">✓</span><span>Copied!</span></>
            : <><span className="text-sm opacity-60">⎘</span><span>Copy URL</span></>
          }
        </button>

        <a
          href={url || "#"}
          target="_blank"
          rel="noopener noreferrer"
          className={cn(
            "flex h-10 items-center justify-center gap-1.5 text-xs font-medium text-muted-fg transition-all hover:bg-white/[0.04] hover:text-foreground",
            !url && "pointer-events-none opacity-30",
          )}
        >
          <span>Open Preview</span>
          <span className="text-[10px] opacity-60">↗</span>
        </a>
      </div>
    </div>
  );
}
