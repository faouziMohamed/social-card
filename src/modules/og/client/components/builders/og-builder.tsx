'use client';

import {Button} from '@/components/ui/button';
import {cn} from '@/lib/utils/cn';
import {BuilderForm} from '@/modules/og/client/components/builder-form';
import {TARGET_OPTIONS} from '@/modules/og/client/components/builder-island.constants';
import {PreviewPanel} from '@/modules/og/client/components/preview-panel';
import {TemplateSelector} from '@/modules/og/client/components/template-selector';
import {useBuilderState} from '@/modules/og/client/hooks/use-builder-state';
import {
  TEMPLATE_META as OG_TEMPLATE_META,
  TEMPLATE_SECTIONS as OG_TEMPLATE_SECTIONS,
} from '@/modules/og/shared/og-template-registry';
import {Check, Copy, ExternalLink, RotateCcw} from 'lucide-react';
import {useState} from 'react';

export function OgBuilder() {
  const {
    template,
    params,
    target,
    previewSrc,
    ogUrl,
    setTemplate,
    setParam,
    setTarget,
    resetParams,
  } = useBuilderState();
  const [copyState, setCopyState] = useState<'idle' | 'copied'>('idle');

  const currentAspect =
    TARGET_OPTIONS.find(t => t.value === target)?.aspect ?? '1200/630';
  const currentTemplate = OG_TEMPLATE_META.find(t => t.name === template);
  const displayUrl = ogUrl.replace(/^https?:\/\/[^/]+/, '');

  const handleCopy = async () => {
    if (!ogUrl) return;
    await navigator.clipboard.writeText(ogUrl);
    setCopyState('copied');
    setTimeout(() => setCopyState('idle'), 2000);
  };

  return (
    <div className="flex min-w-0 flex-col gap-6">
      <section className="rounded-2xl border border-border/30 bg-card/20 px-2 pb-2 pt-4">
        <div className="mb-1 flex items-center justify-between px-2">
          <div className="flex items-center gap-2">
            <span className="text-[10px] font-bold uppercase tracking-[0.16em] text-muted-fg/50">
              Template
            </span>
            {currentTemplate && (
              <>
                <span className="text-[10px] text-muted-fg/30">.</span>
                <span
                  className="text-[11px] font-semibold"
                  style={{color: currentTemplate.color}}
                >
                  {currentTemplate.label}
                </span>
              </>
            )}
          </div>
          <span className="text-[10px] text-muted-fg/35">
            {OG_TEMPLATE_META.findIndex(t => t.name === template) + 1} /{' '}
            {OG_TEMPLATE_META.length}
          </span>
        </div>
        <TemplateSelector
          meta={OG_TEMPLATE_META}
          value={template}
          onChange={t => setTemplate(t as typeof template)}
        />
      </section>

      <div className="flex min-w-0 flex-col gap-6 lg:grid lg:grid-cols-[380px_minmax(0,1fr)] lg:items-start lg:gap-8">
        <aside className="flex min-w-0 flex-col overflow-hidden rounded-2xl border border-border/40 bg-card/40">
          <div className="flex shrink-0 items-center justify-between border-b border-border/30 px-4 py-2.5">
            <div className="flex items-center gap-2">
              {currentTemplate && (
                <span
                  className="text-base leading-none"
                  style={{color: currentTemplate.color}}
                >
                  {currentTemplate.icon}
                </span>
              )}
              <span className="text-xs font-semibold text-foreground/80">
                {currentTemplate?.label ?? 'Fields'}
              </span>
              <span className="text-[10px] text-muted-fg/40">
                {currentTemplate?.desc}
              </span>
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

          <div className="max-h-[calc(100dvh-20rem)] overflow-y-auto scrollbar-hide">
            <BuilderForm
              key={template}
              sections={OG_TEMPLATE_SECTIONS[template]}
              params={params}
              onParamChange={setParam}
            />
          </div>

          <div className="shrink-0 border-t border-border/30 bg-background/20">
            <div className="flex items-center gap-2 border-b border-border/20 px-3 py-2">
              <span className="shrink-0 rounded border border-border/50 bg-card/60 px-1.5 py-px font-mono text-[9px] font-semibold text-muted-fg/60">
                GET
              </span>
              <span className="min-w-0 flex-1 truncate font-mono text-[10px] text-muted-fg/50">
                {displayUrl || '/api/og/...'}
              </span>
            </div>
            <div className="grid grid-cols-2 divide-x divide-border/30">
              <Button
                variant="ghost"
                onClick={handleCopy}
                disabled={!ogUrl}
                className={cn(
                  'h-9 gap-1.5 rounded-none text-[11px] font-medium transition-all',
                  copyState === 'copied'
                    ? 'text-terminal-green hover:text-terminal-green'
                    : 'text-muted-fg hover:text-foreground',
                )}
              >
                {copyState === 'copied' ? (
                  <>
                    <Check className="h-3.5 w-3.5" />
                    <span>Copied!</span>
                  </>
                ) : (
                  <>
                    <Copy className="h-3.5 w-3.5 opacity-50" />
                    <span>Copy URL</span>
                  </>
                )}
              </Button>
              <a
                href={ogUrl || '#'}
                target="_blank"
                rel="noopener noreferrer"
                className={cn(
                  'flex h-9 items-center justify-center gap-1.5 text-[11px] font-medium text-muted-fg transition-colors hover:bg-white/[0.03] hover:text-foreground',
                  !ogUrl && 'pointer-events-none opacity-30',
                )}
              >
                <span>Open</span>
                <ExternalLink className="h-3 w-3 opacity-50" />
              </a>
            </div>
          </div>
        </aside>

        <div className="flex min-w-0 flex-col gap-4">
          <div className="flex flex-wrap items-center gap-1.5 rounded-xl border border-border/30 bg-card/20 p-1.5">
            {TARGET_OPTIONS.map(({value, label, size}) => {
              const active = target === value;
              return (
                <Button
                  key={value}
                  variant="outline"
                  onClick={() => setTarget(value)}
                  className={cn(
                    'h-auto gap-1.5 rounded-full border px-3 py-1 text-xs font-medium transition-all duration-150',
                    active
                      ? 'border-primary/60 bg-primary/10 text-primary hover:bg-primary/15 hover:text-primary'
                      : 'border-border/40 bg-card/30 text-muted-fg hover:border-border/70 hover:text-foreground',
                  )}
                >
                  {label}
                  <span
                    className={cn(
                      'font-mono text-[10px] tabular-nums',
                      active ? 'text-primary/70' : 'text-muted-fg/40',
                    )}
                  >
                    {size}
                  </span>
                </Button>
              );
            })}
          </div>

          <PreviewPanel src={previewSrc} aspectRatio={currentAspect} />
        </div>
      </div>
    </div>
  );
}
