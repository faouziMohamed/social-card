'use client';

import {Button} from '@/components/ui/button';
import {BadgeCopyOptions} from '@/modules/badge/client/components/badge-copy-options';
import {useBadgeBuilderState} from '@/modules/badge/client/hooks/use-badge-builder-state';
import {
  TEMPLATE_META as BADGE_TEMPLATE_META,
  TEMPLATE_SECTIONS as BADGE_TEMPLATE_SECTIONS,
} from '@/modules/badge/shared/badge-template-registry';
import {BuilderForm} from '@/modules/og/client/components/builder-form';
import {BADGE_ASPECTS} from '@/modules/og/client/components/builder-island.constants';
import {PreviewPanel} from '@/modules/og/client/components/preview-panel';
import {TemplateSelector} from '@/modules/og/client/components/template-selector';
import {RotateCcw} from 'lucide-react';

export function BadgeBuilder() {
  const {
    template,
    params,
    previewUrl,
    badgeUrl,
    setTemplate,
    setParam,
    resetParams,
  } = useBadgeBuilderState();

  const currentTemplate = BADGE_TEMPLATE_META.find(t => t.name === template);
  const badgeAspect = BADGE_ASPECTS[template] ?? '130/20';

  return (
    <div className="flex min-w-0 flex-col gap-6">
      <section className="rounded-2xl border border-border/30 bg-card/20 px-2 pb-2 pt-4">
        <div className="mb-1 flex items-center justify-between px-2">
          <div className="flex items-center gap-2">
            <span className="text-[10px] font-bold uppercase tracking-[0.16em] text-muted-fg/50">
              Badge Type
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
            {BADGE_TEMPLATE_META.findIndex(t => t.name === template) + 1} /{' '}
            {BADGE_TEMPLATE_META.length}
          </span>
        </div>
        <TemplateSelector
          meta={BADGE_TEMPLATE_META}
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
              sections={BADGE_TEMPLATE_SECTIONS[template]}
              params={params}
              onParamChange={setParam}
            />
          </div>
        </aside>

        <div className="flex min-w-0 flex-col gap-4">
          <div className="flex items-center justify-start rounded-xl border border-border/30 bg-card/20 p-4">
            <PreviewPanel
              src={previewUrl}
              aspectRatio={badgeAspect}
              className="max-w-[280px]"
            />
          </div>

          <div className="rounded-xl border border-border/30 bg-card/20 p-4">
            <BadgeCopyOptions badgeUrl={badgeUrl} />
          </div>
        </div>
      </div>
    </div>
  );
}
