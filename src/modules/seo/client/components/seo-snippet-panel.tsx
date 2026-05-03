'use client';

import {Button} from '@/components/ui/button';
import {cn} from '@/lib/utils/cn';
import {Check, Copy, ExternalLink} from 'lucide-react';
import {useState} from 'react';

export interface SeoSnippetPanelProps {
  snippet: string;
  seoUrl: string;
  title?: string;
}

export function SeoSnippetPanel({
  snippet,
  seoUrl,
  title = 'Implementation Snippet',
}: SeoSnippetPanelProps) {
  const [copied, setCopied] = useState(false);

  const copySnippet = async () => {
    await navigator.clipboard.writeText(snippet);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <section className="rounded-xl border border-border/30 bg-card/20 p-4">
      <div className="mb-2 flex items-center justify-between">
        <span className="text-[10px] font-bold uppercase tracking-[0.16em] text-muted-fg/50">
          {title}
        </span>
        <div className="flex items-center gap-2">
          <Button
            variant="ghost"
            size="sm"
            onClick={copySnippet}
            className={cn(
              'h-7 rounded-full px-3 text-[11px]',
              copied
                ? 'text-terminal-green hover:text-terminal-green'
                : 'text-muted-fg',
            )}
          >
            {copied ? (
              <>
                <Check className="mr-1 h-3 w-3" />
                Copied
              </>
            ) : (
              <>
                <Copy className="mr-1 h-3 w-3 opacity-60" />
                Copy
              </>
            )}
          </Button>
          <a
            href={seoUrl || '#'}
            target="_blank"
            rel="noreferrer noopener"
            className={cn(
              'inline-flex h-7 items-center rounded-full border border-border/40 px-3 text-[11px] text-muted-fg transition-colors hover:text-foreground',
              !seoUrl && 'pointer-events-none opacity-40',
            )}
          >
            Open route
            <ExternalLink className="ml-1 h-3 w-3 opacity-60" />
          </a>
        </div>
      </div>
      <pre className="max-h-[360px] overflow-auto rounded-lg border border-border/20 bg-card/60 p-3 font-mono text-[11px] text-muted-fg/90 whitespace-pre-wrap break-all">
        {snippet}
      </pre>
    </section>
  );
}
