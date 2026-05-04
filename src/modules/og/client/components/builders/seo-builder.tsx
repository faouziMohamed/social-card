'use client';

import {Button} from '@/components/ui/button';
import {cn} from '@/lib/utils/cn';
import {ROUTES} from '@/lib/utils/routes';
import {BuilderForm} from '@/modules/og/client/components/builder-form';
import {SEO_ASPECTS} from '@/modules/og/client/components/builder-island.constants';
import {PreviewPanel} from '@/modules/og/client/components/preview-panel';
import {TemplateSelector} from '@/modules/og/client/components/template-selector';
import {ImageWorkflowPreview} from '@/modules/seo/client/components/image-workflow-preview';
import {JsonLdEditor} from '@/modules/seo/client/components/json-ld-editor';
import {SeoSnippetPanel} from '@/modules/seo/client/components/seo-snippet-panel';
import {useSeoBuilderState} from '@/modules/seo/client/hooks/use-seo-builder-state';
import {
  buildImageWorkflowUrls,
  buildJsonLdObject,
  buildSeoSnippet,
  isImageSeoTemplate,
} from '@/modules/seo/shared/seo-snippets';
import {
  TEMPLATE_META as SEO_TEMPLATE_META,
  TEMPLATE_SECTIONS as SEO_TEMPLATE_SECTIONS,
} from '@/modules/seo/shared/seo-template-registry';
import {Code2, RotateCcw} from 'lucide-react';
import {useMemo} from 'react';

export function SeoBuilder() {
  const {
    template,
    params,
    previewUrl,
    seoUrl,
    setTemplate,
    setParam,
    removeParam,
    resetParams,
  } = useSeoBuilderState();

  const currentTemplate = SEO_TEMPLATE_META.find(t => t.name === template);
  const isImageTemplate = isImageSeoTemplate(template);
  const seoAspect = SEO_ASPECTS[template] ?? '1/1';
  const jsonParams = useMemo(() => {
    const next = {...params};
    delete next['jsonRaw'];
    return next;
  }, [params]);

  const schemaJson = useMemo(
    () => JSON.stringify(buildJsonLdObject(jsonParams), null, 2),
    [jsonParams],
  );
  const jsonLdText = params['jsonRaw']?.trim() ? params['jsonRaw'] : schemaJson;
  const snippet = buildSeoSnippet(template, seoUrl, params);
  const imageWorkflowUrls =
    template === 'image-workflow'
      ? buildImageWorkflowUrls(seoUrl, params)
      : null;

  const setSeoParam = (key: string, value: string) => {
    setParam(key, value);
    if (template === 'json-ld' && key !== 'jsonRaw') {
      setParam('jsonRaw', '');
    }
  };

  return (
    <div className="flex min-w-0 flex-col gap-6">
      <section className="rounded-2xl border border-border/30 bg-card/20 px-2 pb-2 pt-4">
        <div className="mb-1 flex items-center justify-between px-2">
          <div className="flex items-center gap-2">
            <span className="text-[10px] font-bold uppercase tracking-[0.16em] text-muted-fg/50">
              SEO Asset
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
            {SEO_TEMPLATE_META.findIndex(t => t.name === template) + 1} /{' '}
            {SEO_TEMPLATE_META.length}
          </span>
        </div>
        <TemplateSelector
          meta={SEO_TEMPLATE_META}
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
              sections={SEO_TEMPLATE_SECTIONS[template]}
              params={params}
              onParamChange={setSeoParam}
              onParamDelete={removeParam}
            />
          </div>
        </aside>

        <div className="flex min-w-0 flex-col gap-4">
          <div className="rounded-xl border border-border/30 bg-card/20 p-3">
            <a
              href={ROUTES.seoInspector}
              className="text-xs font-medium text-primary hover:underline"
            >
              Open SEO Inspector -&gt;
            </a>
          </div>

          {isImageTemplate && (
            <div
              className={cn(
                'flex items-center justify-start rounded-xl border border-border/30 bg-card/20 p-4',
                seoAspect === '1/1' && 'max-w-[200px]',
              )}
            >
              <PreviewPanel src={previewUrl} aspectRatio={seoAspect} />
            </div>
          )}

          {!isImageTemplate && template === 'json-ld' && (
            <JsonLdEditor
              key={jsonLdText}
              initialJson={jsonLdText}
              onJsonChange={next => setParam('jsonRaw', next)}
            />
          )}

          {template === 'image-workflow' && imageWorkflowUrls && (
            <ImageWorkflowPreview urls={imageWorkflowUrls} />
          )}

          <div className="rounded-xl border border-border/30 bg-card/20 p-4">
            <div className="mb-2 flex items-center gap-1.5">
              <Code2 className="h-3.5 w-3.5 text-muted-fg/50" />
              <span className="text-[10px] font-bold uppercase tracking-[0.16em] text-muted-fg/50">
                Developer usage
              </span>
            </div>
            <SeoSnippetPanel
              snippet={snippet}
              seoUrl={seoUrl}
              title={
                isImageTemplate ? 'How to use this asset' : 'Copy-ready output'
              }
            />
          </div>
        </div>
      </div>
    </div>
  );
}
