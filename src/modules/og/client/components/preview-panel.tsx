'use client';

import {cn} from '@/lib/utils/cn';
import {useEffect, useRef, useState} from 'react';

interface PreviewPanelProps {
  src: string;
  aspectRatio?: string;
  className?: string;
}

export function PreviewPanel({
  src,
  aspectRatio = '1200/630',
  className,
}: PreviewPanelProps) {
  const [displaySrc, setDisplaySrc] = useState(src);
  const [loaded, setLoaded] = useState(false);
  const [hasError, setHasError] = useState(false);
  const imgRef = useRef<HTMLImageElement>(null);

  // Debounce src updates so rapid param changes don't fire many img requests.
  // Guard against empty src — avoids browser downloading the whole page.
  useEffect(() => {
    if (!src) return;
    const t = setTimeout(() => {
      setDisplaySrc(src);
      setLoaded(false);
      setHasError(false);
    }, 50);
    return () => clearTimeout(t);
  }, [src]);

  const isLoading = Boolean(displaySrc) && !loaded && !hasError;

  return (
    <div
      className={cn(
        'preview-canvas relative w-full max-w-full overflow-hidden rounded-xl border border-border/40 bg-card/30 shadow-[0_12px_36px_rgba(0,0,0,0.24)]',
        `aspect-[${aspectRatio}]`,
        className,
      )}
      style={{aspectRatio: aspectRatio.replace('/', ' / ')}}
    >
      {isLoading && (
        <div className="absolute inset-0 shimmer-track rounded-xl" />
      )}

      {hasError && (
        <div className="absolute inset-0 flex flex-col items-center justify-center gap-3">
          <span className="text-3xl opacity-40">⚠</span>
          <p className="text-xs text-muted-fg/50 font-mono">
            Preview unavailable
          </p>
        </div>
      )}

      {displaySrc && (
        // eslint-disable-next-line @next/next/no-img-element
        <img
          ref={imgRef}
          src={displaySrc}
          alt="OG image preview"
          className={cn(
            'h-full w-full object-contain transition-opacity duration-500',
            loaded ? 'opacity-100' : 'opacity-0',
          )}
          onLoad={() => setLoaded(true)}
          onError={() => setHasError(true)}
        />
      )}

      {isLoading && (
        <div className="absolute right-3 top-3 flex items-center gap-1.5 rounded-full bg-black/60 px-2.5 py-1 backdrop-blur-sm">
          <span className="status-indicator status-info h-1.5 w-1.5" />
          <span className="text-[9px] font-bold tracking-widest uppercase text-muted-fg">
            Rendering
          </span>
        </div>
      )}
      {loaded && (
        <div className="absolute right-3 top-3 flex items-center gap-1.5 rounded-full bg-black/60 px-2.5 py-1 backdrop-blur-sm opacity-0 hover:opacity-100 transition-opacity">
          <span className="h-1.5 w-1.5 rounded-full bg-terminal-green" />
          <span className="text-[9px] font-bold tracking-widest uppercase text-terminal-green">
            Live
          </span>
        </div>
      )}
    </div>
  );
}
