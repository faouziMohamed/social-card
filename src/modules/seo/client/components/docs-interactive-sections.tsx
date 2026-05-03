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
import {getSeoParamDescriptors} from '@/modules/seo/shared/seo-docs';
import {SEO_ROUTES} from '@/modules/seo/shared/seo-routes';
import type {SeoTemplateName} from '@/modules/seo/shared/seo-schemas';
import {
  buildSeoSnippet,
  isImageSeoTemplate,
} from '@/modules/seo/shared/seo-snippets';
import {startTransition, useState} from 'react';

const BADGE_EXAMPLES: Record<
  BadgeName,
  {qs: string; aspect?: string; description: string}
> = {
  label: {
    qs: 'label=version&message=2.1.0&color=%236366f1&style=flat',
    aspect: '137/26',
    description: 'Premium two-segment label/value badge.',
  },
  stat: {
    qs: 'label=Stars&value=4.2k&icon=star&color=%23f59e0b',
    aspect: '150/58',
    description: 'Premium single-metric display card with optional icon.',
  },
  status: {
    qs: 'label=API&status=online',
    aspect: '120/30',
    description: 'Glass-style service health indicator with semantic colors.',
  },
  progress: {
    qs: 'label=Coverage&value=87&color=%2322c55e',
    aspect: '220/46',
    description:
      'Premium progress bar for coverage, funding goals, completion.',
  },
  score: {
    qs: 'label=Performance&value=95&color=%236366f1',
    aspect: '104/104',
    description: 'Premium circular score ring — Lighthouse, ratings.',
  },
  socials: {
    qs: 'platform=github&handle=acme&followers=4.2k&color=%236366f1',
    aspect: '185/34',
    description: 'Social proof pill with platform icon and glass body.',
  },
  'tech-stack': {
    qs: 'stack=React%2CTypeScript%2CGo&color=%236366f1&style=tags',
    aspect: '340/36',
    description: 'Premium tech tag row for README or portfolio.',
  },
  availability: {
    qs: 'label=Jane+Doe&available=true&hireText=Open+to+work&color=%2322c55e',
    aspect: '220/52',
    description: 'Premium "Open to work" / availability status banner.',
  },
};

const SEO_EXAMPLES: Record<
  SeoTemplateName,
  {qs: string; aspect: string; description: string}
> = {
  favicon: {
    qs: 'initial=OG&color=%230f0f0f&accentColor=%236366f1&shape=rounded',
    aspect: '1/1',
    description: '32×32 PNG for <link rel="icon">.',
  },
  'apple-touch-icon': {
    qs: 'initial=OG&color=%230f0f0f&accentColor=%236366f1&shape=rounded',
    aspect: '1/1',
    description: '180×180 PNG for <link rel="apple-touch-icon">.',
  },
  'manifest-icon': {
    qs: 'initial=OG&color=%230f0f0f&accentColor=%236366f1&shape=rounded&size=512',
    aspect: '1/1',
    description: '192 or 512 px PNG for PWA manifest.json.',
  },
  'twitter-card': {
    qs: 'title=Open+Graph+Generator&siteName=og-graph&accentColor=%236366f1&bgStyle=gradient%2Bgrid',
    aspect: '800/418',
    description: '800×418 PNG Twitter summary card.',
  },
  'json-ld': {
    qs: 'schemaType=SoftwareApplication&name=OG+Graph&description=Generate+OG+images+and+SEO+assets&url=https%3A%2F%2Fexample.com',
    aspect: '1/1',
    description: 'Structured data script route (application/ld+json).',
  },
  'robots-txt': {
    qs: 'userAgent=*&allow=%2F&disallow=%2Fprivate&sitemap=https%3A%2F%2Fexample.com%2Fsitemap.xml&aiCrawlerPolicy=allow',
    aspect: '1/1',
    description: 'Robots.txt helper route with optional AI crawler policy.',
  },
  'meta-pack': {
    qs: 'title=OG+Graph&description=Generate+OG+images+and+SEO+assets&canonical=https%3A%2F%2Fexample.com&ogType=website',
    aspect: '1/1',
    description:
      'Copy-ready HTML meta snippet route for canonical + OG + Twitter.',
  },
  'image-workflow': {
    qs: 'sourceImage=https%3A%2F%2Fimages.unsplash.com%2Fphoto-1518770660439-4636190af475&siteName=OG+Graph&title=Open+Graph+Generator&description=Generate+SEO+image+variants+from+one+source',
    aspect: '1/1',
    description:
      'Workflow helper that generates OG + favicon + Apple + manifest + Twitter image URLs from one source image.',
  },
};

const OG_RESPONSE_SPEC = {
  contentType: 'image/png',
  bodyShape:
    'Binary PNG image bytes (1200x630 by default; target override supported).',
};

const BADGE_RESPONSE_SPEC = {
  contentType: 'image/svg+xml; charset=utf-8',
  bodyShape: 'UTF-8 SVG markup string.',
};

const SEO_RESPONSE_SPECS: Partial<
  Record<SeoTemplateName, {contentType: string; bodyShape: string}>
> = {
  favicon: {
    contentType: 'image/png',
    bodyShape: 'Binary PNG image bytes (32x32).',
  },
  'apple-touch-icon': {
    contentType: 'image/png',
    bodyShape: 'Binary PNG image bytes (180x180).',
  },
  'manifest-icon': {
    contentType: 'image/png',
    bodyShape: 'Binary PNG image bytes (192x192 or 512x512 via ?size=192|512).',
  },
  'twitter-card': {
    contentType: 'image/png',
    bodyShape: 'Binary PNG image bytes (800x418).',
  },
  'json-ld': {
    contentType: 'application/ld+json; charset=utf-8',
    bodyShape: 'JSON object payload (or script body in raw response).',
  },
  'robots-txt': {
    contentType: 'text/plain; charset=utf-8',
    bodyShape: 'Plain text robots.txt content.',
  },
  'meta-pack': {
    contentType: 'text/plain; charset=utf-8',
    bodyShape: 'Plain text HTML tags snippet (<title>, <meta>, <link>).',
  },
  'image-workflow': {
    contentType: 'text/plain; charset=utf-8',
    bodyShape: 'Plain text snippet containing generated OG/Twitter/icon URLs.',
  },
};

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

function Section({
  title,
  count,
  collapsed,
  onToggle,
}: {
  title: string;
  count: number;
  collapsed: boolean;
  onToggle: () => void;
}) {
  return (
    <div className="flex items-center justify-between">
      <div className="flex items-center gap-3">
        <h2 className="font-bold uppercase tracking-widest text-sm text-muted-fg">
          {title}
        </h2>
        <span className="rounded-full border border-primary/30 bg-primary/10 px-2 py-0.5 text-xs font-mono text-primary">
          {count}
        </span>
      </div>
      <Button size="sm" variant="outline" onClick={onToggle}>
        {collapsed ? 'Show examples' : 'Hide details'}
      </Button>
    </div>
  );
}
