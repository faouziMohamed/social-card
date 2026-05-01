'use client';

import {Button} from '@/components/ui/button';
import {cn} from '@/lib/utils/cn';
import {Check, Copy} from 'lucide-react';
import {useState} from 'react';

export interface BadgeCopyOptionsProps {
  badgeUrl: string;
}

type CopyKey = 'url' | 'img' | 'md';

export function BadgeCopyOptions({badgeUrl}: BadgeCopyOptionsProps) {
  const [copied, setCopied] = useState<CopyKey | null>(null);

  const copy = async (key: CopyKey, text: string) => {
    if (!badgeUrl) return;
    await navigator.clipboard.writeText(text);
    setCopied(key);
    setTimeout(() => setCopied(null), 2000);
  };

  const imgTag = `<img src="${badgeUrl}" alt="badge" />`;
  const mdBadge = `![badge](${badgeUrl})`;

  const options: {key: CopyKey; label: string; value: string}[] = [
    {key: 'url', label: 'URL', value: badgeUrl},
    {key: 'img', label: '<img> tag', value: imgTag},
    {key: 'md', label: 'Markdown', value: mdBadge},
  ];

  return (
    <div className="flex flex-col gap-2">
      <span className="text-[9px] font-bold uppercase tracking-[0.16em] text-muted-fg/40">
        Copy as
      </span>
      <div className="flex flex-wrap gap-2">
        {options.map(({key, label, value}) => {
          const isCopied = copied === key;
          return (
            <Button
              key={key}
              variant="outline"
              size="sm"
              disabled={!badgeUrl}
              onClick={() => copy(key, value)}
              className={cn(
                'h-7 gap-1.5 rounded-full border px-3 text-[11px] font-medium transition-all duration-150',
                isCopied
                  ? 'border-terminal-green/50 bg-terminal-green/10 text-terminal-green hover:bg-terminal-green/15 hover:text-terminal-green'
                  : 'border-border/40 bg-card/30 text-muted-fg hover:border-border/70 hover:text-foreground',
              )}
            >
              {isCopied ? (
                <>
                  <Check className="h-3 w-3" />
                  <span>Copied!</span>
                </>
              ) : (
                <>
                  <Copy className="h-3 w-3 opacity-50" />
                  <span>{label}</span>
                </>
              )}
            </Button>
          );
        })}
      </div>
    </div>
  );
}
