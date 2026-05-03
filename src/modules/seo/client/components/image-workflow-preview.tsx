'use client';

import {Button} from '@/components/ui/button';
import {cn} from '@/lib/utils/cn';
import {Copy, ExternalLink} from 'lucide-react';
import Image from 'next/image';

interface ImageWorkflowPreviewProps {
  urls: {
    og: string;
    twitterCard: string;
    favicon: string;
    appleTouchIcon: string;
    manifest192: string;
    manifest512: string;
  };
}

const PREVIEWS: {
  key: keyof ImageWorkflowPreviewProps['urls'];
  label: string;
  aspect: string;
}[] = [
  {key: 'og', label: 'OG Image', aspect: '1200/630'},
  {key: 'twitterCard', label: 'Twitter Card', aspect: '800/418'},
  {key: 'favicon', label: 'Favicon', aspect: '1/1'},
  {key: 'appleTouchIcon', label: 'Apple Touch Icon', aspect: '1/1'},
  {key: 'manifest192', label: 'Manifest 192', aspect: '1/1'},
  {key: 'manifest512', label: 'Manifest 512', aspect: '1/1'},
];

export function ImageWorkflowPreview({urls}: ImageWorkflowPreviewProps) {
  return (
    <div className="rounded-xl border border-border/30 bg-card/20 p-4">
      <p className="mb-3 text-[10px] font-bold uppercase tracking-[0.16em] text-muted-fg/50">
        Generated Previews
      </p>
      <div className="grid gap-3 md:grid-cols-2">
        {PREVIEWS.map(item => {
          const url = urls[item.key];
          return (
            <div
              key={item.key}
              className="rounded-lg border border-border/30 bg-card/40 p-3"
            >
              <div className="mb-2 flex items-center justify-between">
                <p className="text-xs font-semibold">{item.label}</p>
                <div className="flex items-center gap-1">
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => navigator.clipboard.writeText(url)}
                    className="h-7 px-2"
                  >
                    <Copy className="h-3 w-3" />
                  </Button>
                  <a
                    href={url}
                    target="_blank"
                    rel="noreferrer noopener"
                    className="inline-flex h-7 items-center rounded-md px-2 text-muted-fg hover:text-foreground"
                  >
                    <ExternalLink className="h-3 w-3" />
                  </a>
                </div>
              </div>
              <div
                className={cn(
                  'relative overflow-hidden rounded border border-border/30 bg-background/30',
                  item.aspect === '1/1' ? 'max-w-[120px]' : '',
                )}
                style={{aspectRatio: item.aspect.replace('/', ' / ')}}
              >
                <Image
                  src={url}
                  alt={item.label}
                  fill
                  className="object-contain"
                  sizes="(max-width: 768px) 100vw, 50vw"
                />
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
