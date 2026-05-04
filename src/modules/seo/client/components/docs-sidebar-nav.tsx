'use client';

import {cn} from '@/lib/utils/cn';
import {ROUTES} from '@/lib/utils/routes';
import Link from 'next/link';
import {useEffect, useMemo, useState} from 'react';

interface NavItem {
  href: string;
  name: string;
}

export function DocsSidebarNav({
  ogItems,
  badgeItems,
  seoItems,
  sdkItems,
  inspectorItems,
}: {
  ogItems: NavItem[];
  badgeItems: NavItem[];
  seoItems: NavItem[];
  sdkItems: NavItem[];
  inspectorItems: NavItem[];
}) {
  const groups = useMemo(
    () => [
      {label: 'OG Templates', items: ogItems},
      {label: 'SVG Badges', items: badgeItems},
      {label: 'SEO Assets', items: seoItems},
      {label: 'SDK', items: sdkItems},
      {label: 'Inspector', items: inspectorItems},
    ],
    [badgeItems, inspectorItems, ogItems, sdkItems, seoItems],
  );
  const ids = useMemo(
    () =>
      groups
        .flatMap(group => group.items.map(item => item.href.replace('#', '')))
        .filter(Boolean),
    [groups],
  );
  const [activeId, setActiveId] = useState(ids[0] ?? '');

  useEffect(() => {
    if (ids.length === 0) return;

    const pickFromHash = () => {
      const hash = window.location.hash.replace('#', '');
      if (hash && ids.includes(hash)) setActiveId(hash);
    };

    pickFromHash();

    const observer = new IntersectionObserver(
      entries => {
        const visible = entries
          .filter(entry => entry.isIntersecting)
          .map(entry => entry.target.id);

        if (visible.length === 0) return;

        const topMost = ids.find(id => visible.includes(id));
        if (topMost) setActiveId(topMost);
      },
      {
        rootMargin: '-35% 0px -55% 0px',
        threshold: 0.01,
      },
    );

    for (const id of ids) {
      const node = document.querySelector(`#${CSS.escape(id)}`);
      if (node) observer.observe(node as Element);
    }

    window.addEventListener('hashchange', pickFromHash);
    return () => {
      observer.disconnect();
      window.removeEventListener('hashchange', pickFromHash);
    };
  }, [ids]);

  return (
    <nav className="lg:sticky lg:top-6 rounded-xl border border-border/60 bg-card/40 shadow-sm p-4 scrollbar-hide lg:max-h-[calc(100vh-6rem)] lg:overflow-y-auto">
      <p className="mb-4 text-xs font-bold uppercase tracking-widest text-muted-fg/90 flex items-center gap-2">
        <span className="status-indicator status-info" />
        Navigation
      </p>

      {groups.map((group, groupIndex) => (
        <div key={group.label}>
          <div className="mb-6">
            <p className="mb-2 text-xs font-semibold uppercase tracking-widest text-muted-fg/80">
              {group.label}
            </p>
            <ul className="space-y-1">
              {group.items.map(item => {
                const id = item.href.replace('#', '');
                const isActive = activeId === id;
                return (
                  <li key={item.href}>
                    <a
                      href={item.href}
                      className={cn(
                        'block rounded-md border px-2 py-1 text-xs transition-colors font-mono truncate',
                        isActive
                          ? 'border-primary/60 bg-primary/12 text-primary'
                          : 'border-transparent text-foreground/75 hover:border-border/50 hover:bg-card/60 hover:text-primary',
                      )}
                    >
                      {item.name}
                    </a>
                  </li>
                );
              })}
            </ul>
          </div>

          {groupIndex < groups.length - 1 && (
            <div className="section-divider mb-4" />
          )}
        </div>
      ))}

      <div className="section-divider my-4" />

      <Link
        href={ROUTES.builder}
        className="block text-center rounded border border-primary/30 px-3 py-1.5 text-xs terminal-prompt hover:bg-primary/10 transition-colors"
      >
        → Open Builder
      </Link>
    </nav>
  );
}
