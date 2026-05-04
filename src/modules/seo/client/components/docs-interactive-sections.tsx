'use client';

import {ApiEndpointCard} from '@/components/shared/api-endpoint-card';
import {Button} from '@/components/ui/button';
import {getBadgeParamDescriptors} from '@/modules/badge/shared/badge-docs';
import {BADGE_ROUTES} from '@/modules/badge/shared/badge-routes';
import type {BadgeName} from '@/modules/badge/shared/badge-schemas';
import {EndpointCard} from '@/modules/og/client/components/endpoint-card';
import {getParamDescriptors} from '@/modules/og/shared/og-docs';
import {OG_ROUTES} from '@/modules/og/shared/og-routes';
import {
  EXAMPLE_PARAMS,
  TEMPLATE_META,
} from '@/modules/og/shared/og-template-registry';
import type {TemplateName} from '@/modules/og/shared/og.types';
import {
  BADGE_EXAMPLES,
  BADGE_RESPONSE_SPEC,
  OG_RESPONSE_SPEC,
  SEO_EXAMPLES,
  SEO_RESPONSE_SPECS,
} from '@/modules/seo/client/components/docs-interactive-sections-constants';
import {Section} from '@/modules/seo/client/components/docs-interactive-sections-section';
import {getSeoParamDescriptors} from '@/modules/seo/shared/seo-docs';
import {SEO_ROUTES} from '@/modules/seo/shared/seo-routes';
import type {SeoTemplateName} from '@/modules/seo/shared/seo-schemas';
import {
  buildSeoSnippet,
  isImageSeoTemplate,
} from '@/modules/seo/shared/seo-snippets';
import {startTransition, useState} from 'react';

export function DocsInteractiveSections({base}: {base: string}) {
  const [collapsed, setCollapsed] = useState({
    og: false,
    badges: false,
    seo: false,
  });
  const [itemOverrides, setItemOverrides] = useState<
    Record<string, 'collapsed' | 'expanded'>
  >({});
  const templates = Object.keys(OG_ROUTES) as TemplateName[];
  const badges = Object.keys(BADGE_ROUTES) as BadgeName[];
  const seoAssets = Object.keys(SEO_ROUTES) as SeoTemplateName[];
  const allCollapsed = collapsed.og && collapsed.badges && collapsed.seo;

  const collapseAll = () =>
    startTransition(() => setCollapsed({og: true, badges: true, seo: true}));
  const expandAll = () =>
    startTransition(() => setCollapsed({og: false, badges: false, seo: false}));

  const resolveCompact = (sectionCollapsed: boolean, itemKey: string) => {
    const override = itemOverrides[itemKey];

    if (override === 'collapsed') return true;
    if (override === 'expanded') return false;
    return sectionCollapsed;
  };

  const toggleItemCompact = (sectionCollapsed: boolean, itemKey: string) => {
    const isCompact = resolveCompact(sectionCollapsed, itemKey);
    setItemOverrides(prev => ({
      ...prev,
      [itemKey]: isCompact ? 'expanded' : 'collapsed',
    }));
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between rounded-xl border border-border/60 bg-card/40 p-3">
        <p className="text-xs text-muted-fg">
          Quick peek mode for faster browsing.
        </p>
        <div className="flex gap-2">
          <Button size="sm" variant="outline" onClick={collapseAll}>
            Collapse all
          </Button>
          <Button
            size="sm"
            variant={allCollapsed ? 'default' : 'outline'}
            onClick={expandAll}
          >
            Expand all
          </Button>
        </div>
      </div>

      <Section
        title="OG Image Templates"
        count={templates.length}
        collapsed={collapsed.og}
        onToggle={() => setCollapsed(prev => ({...prev, og: !prev.og}))}
      />
      <div className="flex flex-col gap-10 mb-16">
        {templates.map(template => {
          const params = getParamDescriptors(template);
          const exampleUrl = `${base}${OG_ROUTES[template]}?${EXAMPLE_PARAMS[template]}`;
          const description =
            TEMPLATE_META.find(item => item.name === template)?.desc ??
            'OG template endpoint.';
          const itemKey = `og:${template}`;
          const compact = resolveCompact(collapsed.og, itemKey);
          return (
            <EndpointCard
              key={template}
              template={template}
              description={description}
              params={params}
              exampleUrl={exampleUrl}
              compact={compact}
              onToggleCompact={() => toggleItemCompact(collapsed.og, itemKey)}
              responseSpec={OG_RESPONSE_SPEC}
            />
          );
        })}
      </div>

      <Section
        title="SVG Badges"
        count={badges.length}
        collapsed={collapsed.badges}
        onToggle={() => setCollapsed(prev => ({...prev, badges: !prev.badges}))}
      />
      <div className="flex flex-col gap-10 mb-16">
        {badges.map(badge => {
          const ex = BADGE_EXAMPLES[badge];
          const itemKey = `badge:${badge}`;
          const compact = resolveCompact(collapsed.badges, itemKey);
          return (
            <ApiEndpointCard
              key={badge}
              id={`badge-${badge}`}
              path={BADGE_ROUTES[badge]}
              description={ex.description}
              params={getBadgeParamDescriptors(badge)}
              exampleUrl={`${base}${BADGE_ROUTES[badge]}?${ex.qs}`}
              previewAspect={ex.aspect}
              previewMaxWidth={380}
              compact={compact}
              onToggleCompact={() =>
                toggleItemCompact(collapsed.badges, itemKey)
              }
              responseSpec={BADGE_RESPONSE_SPEC}
            />
          );
        })}
      </div>

      <Section
        title="SEO Assets"
        count={seoAssets.length}
        collapsed={collapsed.seo}
        onToggle={() => setCollapsed(prev => ({...prev, seo: !prev.seo}))}
      />
      <div className="flex flex-col gap-10 mb-16">
        {seoAssets.map(asset => {
          const ex = SEO_EXAMPLES[asset];
          const route = SEO_ROUTES[asset]!;
          const exampleUrl = `${base}${route}?${ex.qs}`;
          const previewText = isImageSeoTemplate(asset)
            ? undefined
            : buildSeoSnippet(
                asset,
                exampleUrl,
                Object.fromEntries(new URLSearchParams(ex.qs).entries()),
              );
          const itemKey = `seo:${asset}`;
          const compact = resolveCompact(collapsed.seo, itemKey);
          return (
            <ApiEndpointCard
              key={asset}
              id={`seo-${asset}`}
              path={route}
              description={ex.description}
              params={getSeoParamDescriptors(asset)}
              exampleUrl={exampleUrl}
              previewAspect={ex.aspect}
              previewText={previewText}
              compact={compact}
              onToggleCompact={() => toggleItemCompact(collapsed.seo, itemKey)}
              responseSpec={SEO_RESPONSE_SPECS[asset]}
            />
          );
        })}
      </div>
    </div>
  );
}
