"use client";

import { useState } from "react";
import { Check, Copy, ExternalLink } from "lucide-react";
import { cn } from "@/lib/utils/cn";
import { Button } from "@/components/ui/button";

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
        <Button
          variant="ghost"
          onClick={handleCopy}
          disabled={!url}
          className={cn(
            "h-10 gap-2 rounded-none border-r border-border/40 text-xs font-medium",
            state === "copied" ? "text-terminal-green hover:text-terminal-green" : "text-muted-fg",
          )}
        >
          {state === "copied" ? (
            <><Check className="h-3.5 w-3.5" /><span>Copied!</span></>
          ) : (
            <><Copy className="h-3.5 w-3.5 opacity-60" /><span>Copy URL</span></>
          )}
        </Button>

        <a
          href={url || "#"}
          target="_blank"
          rel="noopener noreferrer"
          className={cn(
            "flex h-10 items-center justify-center gap-1.5 rounded-none text-xs font-medium text-muted-fg transition-colors hover:bg-accent hover:text-foreground",
            !url && "pointer-events-none opacity-30",
          )}
        >
          <span>Open Preview</span>
          <ExternalLink className="h-3 w-3 opacity-60" />
        </a>
      </div>
    </div>
  );
}
