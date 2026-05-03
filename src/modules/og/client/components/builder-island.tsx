'use client';

import {Button} from '@/components/ui/button';
import {cn} from '@/lib/utils/cn';
import {ROUTES} from '@/lib/utils/routes';
import {BadgeCopyOptions} from '@/modules/badge/client/components/badge-copy-options';
import {useBadgeBuilderState} from '@/modules/badge/client/hooks/use-badge-builder-state';
import {
  TEMPLATE_META as BADGE_TEMPLATE_META,
  TEMPLATE_SECTIONS as BADGE_TEMPLATE_SECTIONS,
} from '@/modules/badge/shared/badge-template-registry';
import {
  TEMPLATE_META as OG_TEMPLATE_META,
  TEMPLATE_SECTIONS as OG_TEMPLATE_SECTIONS,
} from '@/modules/og/shared/og-template-registry';
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
import {Check, Code2, Copy, ExternalLink, RotateCcw} from 'lucide-react';
import Link from 'next/link';
import {useMemo, useState} from 'react';
import {useBuilderState, type TargetKey} from '../hooks/use-builder-state';
import {BuilderForm} from './builder-form';
import {PreviewPanel} from './preview-panel';
import {TemplateSelector} from './template-selector';

// ─── Module tab type ─────────────────────────────────────────────────────────

export type ModuleTab = 'og' | 'badge' | 'seo';

const MODULE_TABS: {value: ModuleTab; label: string}[] = [
  {value: 'og', label: 'OG Images'},
  {value: 'badge', label: 'Badge'},
  {value: 'seo', label: 'SEO'},
];

// ─── OG target options ───────────────────────────────────────────────────────

const TARGET_OPTIONS: {
  value: TargetKey;
  label: string;
  size: string;
  aspect: string;
}[] = [
  {value: 'og', label: 'OG', size: '1200×630', aspect: '1200/630'},
  {
    value: 'twitter-large',
    label: 'Twitter',
    size: '1200×628',
    aspect: '1200/628',
  },
  {value: 'twitter-small', label: 'Square', size: '800×800', aspect: '800/800'},
  {value: 'linkedin', label: 'LinkedIn', size: '1200×627', aspect: '1200/627'},
];

// ─── Badge aspect ratios ─────────────────────────────────────────────────────

const BADGE_ASPECTS: Record<string, string> = {
  label: '130/20',
  stat: '120/48',
  status: '130/24',
  progress: '220/36',
  score: '90/90',
  socials: '200/28',
  'tech-stack': '200/32',
  availability: '200/40',
};

// ─── SEO aspects and snippets ────────────────────────────────────────────────

const SEO_ASPECTS: Record<string, string> = {
  favicon: '1/1',
  'apple-touch-icon': '1/1',
  'manifest-icon': '1/1',
  'twitter-card': '800/418',
};

// ─── Main component ───────────────────────────────────────────────────────────

export function BuilderIsland({activeModule}: {activeModule: ModuleTab}) {
  const routeByModule: Record<ModuleTab, string> = {
    og: ROUTES.builderTabs.og,
    badge: ROUTES.builderTabs.badge,
    seo: ROUTES.builderTabs.seo,
  };

  return (
    <div className="flex min-w-0 flex-col gap-6">
      {/* ── Module tab switcher ───────────────────────────────────────────── */}
      <div className="flex items-center gap-1 self-start rounded-xl border border-border/30 bg-card/20 p-1">
        {MODULE_TABS.map(({value, label}) => {
          const active = activeModule === value;
          return (
            <Link
              key={value}
              href={routeByModule[value]}
              className={cn(
                'inline-flex h-8 items-center rounded-lg px-4 text-xs font-semibold transition-all duration-150',
                active
                  ? 'bg-card text-foreground shadow-sm'
                  : 'text-muted-fg hover:text-foreground',
              )}
            >
              {label}
            </Link>
          );
        })}
      </div>

      {/* ── Module content ────────────────────────────────────────────────── */}
      {activeModule === 'og' && <OgBuilder />}
      {activeModule === 'badge' && <BadgeBuilder />}
      {activeModule === 'seo' && <SeoBuilder />}
    </div>
  );
}

// ─── OG builder ──────────────────────────────────────────────────────────────

function OgBuilder() {
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
      {/* Template picker */}
      <section className="rounded-2xl border border-border/30 bg-card/20 pb-2 pt-4 px-2">
        <div className="mb-1 px-2 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="text-[10px] font-bold uppercase tracking-[0.16em] text-muted-fg/50">
              Template
            </span>
            {currentTemplate && (
              <>
                <span className="text-muted-fg/30 text-[10px]">·</span>
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

      {/* Sidebar + preview */}
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
                {displayUrl || '/api/og/…'}
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
          {/* Platform target pills */}
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

// ─── Badge builder ────────────────────────────────────────────────────────────

function BadgeBuilder() {
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
      {/* Template picker */}
      <section className="rounded-2xl border border-border/30 bg-card/20 pb-2 pt-4 px-2">
        <div className="mb-1 px-2 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="text-[10px] font-bold uppercase tracking-[0.16em] text-muted-fg/50">
              Badge Type
            </span>
            {currentTemplate && (
              <>
                <span className="text-muted-fg/30 text-[10px]">·</span>
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

      {/* Sidebar + preview */}
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

        {/* Preview + copy options */}
        <div className="flex min-w-0 flex-col gap-4">
          {/* Badge preview — smaller card centered */}
          <div className="flex items-center justify-start rounded-xl border border-border/30 bg-card/20 p-4">
            <PreviewPanel
              src={previewUrl}
              aspectRatio={badgeAspect}
              className="max-w-[280px]"
            />
          </div>

          {/* Copy options */}
          <div className="rounded-xl border border-border/30 bg-card/20 p-4">
            <BadgeCopyOptions badgeUrl={badgeUrl} />
          </div>
        </div>
      </div>
    </div>
  );
}

// ─── SEO builder ─────────────────────────────────────────────────────────────

function SeoBuilder() {
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
      {/* Template picker */}
      <section className="rounded-2xl border border-border/30 bg-card/20 pb-2 pt-4 px-2">
        <div className="mb-1 px-2 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="text-[10px] font-bold uppercase tracking-[0.16em] text-muted-fg/50">
              SEO Asset
            </span>
            {currentTemplate && (
              <>
                <span className="text-muted-fg/30 text-[10px]">·</span>
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

      {/* Sidebar + preview */}
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

        {/* Preview + snippets */}
        <div className="flex min-w-0 flex-col gap-4">
          <div className="rounded-xl border border-border/30 bg-card/20 p-3">
            <a
              href={ROUTES.seoInspector}
              className="text-xs font-medium text-primary hover:underline"
            >
              Open SEO Inspector →
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
