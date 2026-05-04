'use client';

import {cn} from '@/lib/utils/cn';
import {ROUTES} from '@/lib/utils/routes';
import Link from 'next/link';
import {MODULE_TABS} from './builder-island.constants';
import {BadgeBuilder} from './builders/badge-builder';
import {OgBuilder} from './builders/og-builder';
import {SeoBuilder} from './builders/seo-builder';

export type ModuleTab = 'og' | 'badge' | 'seo';

export function BuilderIsland({activeModule}: {activeModule: ModuleTab}) {
  const routeByModule: Record<ModuleTab, string> = {
    og: ROUTES.builderTabs.og,
    badge: ROUTES.builderTabs.badge,
    seo: ROUTES.builderTabs.seo,
  };

  return (
    <div className="flex min-w-0 flex-col gap-6">
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

      {activeModule === 'og' && <OgBuilder />}
      {activeModule === 'badge' && <BadgeBuilder />}
      {activeModule === 'seo' && <SeoBuilder />}
    </div>
  );
}
