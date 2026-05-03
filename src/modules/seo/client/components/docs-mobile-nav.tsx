'use client';

import {Button} from '@/components/ui/button';
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from '@/components/ui/sheet';
import {ROUTES} from '@/lib/utils/routes';
import {Menu} from 'lucide-react';
import Link from 'next/link';

interface NavItem {
  href: string;
  name: string;
}

export interface DocsMobileNavProps {
  ogItems: NavItem[];
  badgeItems: NavItem[];
  seoItems: NavItem[];
}

export function DocsMobileNav({
  ogItems,
  badgeItems,
  seoItems,
}: DocsMobileNavProps) {
  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button
          variant="outline"
          className="h-9 rounded-full border-border/50 bg-card/70 px-3 text-xs font-semibold"
        >
          <Menu className="mr-1.5 h-3.5 w-3.5" />
          Docs menu
        </Button>
      </SheetTrigger>

      <SheetContent
        side="left"
        className="flex h-full flex-col border-r border-border/60 bg-background"
      >
        <SheetHeader className="bg-card/40">
          <SheetTitle>API Navigation</SheetTitle>
          <SheetDescription>
            Jump to OG templates, badges, and SEO endpoints.
          </SheetDescription>
        </SheetHeader>

        <div className="flex-1 overflow-y-auto p-4">
          <NavSection label="OG Templates" items={ogItems} />
          <NavSection label="SVG Badges" items={badgeItems} />
          <NavSection label="SEO Assets" items={seoItems} />
        </div>

        <div className="border-t border-border/40 p-4">
          <SheetClose asChild>
            <Link
              href={ROUTES.builder}
              className="block rounded-md border border-primary/40 bg-primary/10 px-3 py-2 text-center text-xs font-semibold text-primary transition-colors hover:bg-primary/15"
            >
              Open Builder
            </Link>
          </SheetClose>
        </div>
      </SheetContent>
    </Sheet>
  );
}

function NavSection({label, items}: {label: string; items: NavItem[]}) {
  return (
    <section className="mb-5">
      <p className="mb-2 text-[10px] font-bold uppercase tracking-[0.16em] text-muted-fg/70">
        {label}
      </p>
      <div className="space-y-1">
        {items.map(item => (
          <SheetClose key={item.href} asChild>
            <Link
              href={item.href}
              className="block rounded-md border border-transparent px-2 py-1.5 font-mono text-xs text-foreground/80 transition-colors hover:border-border/50 hover:bg-card/50 hover:text-primary"
            >
              {item.name}
            </Link>
          </SheetClose>
        ))}
      </div>
    </section>
  );
}
