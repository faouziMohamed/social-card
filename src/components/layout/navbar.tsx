'use client';

import {ThemeToggle} from '@/components/shared/theme-toggle';
import {Button, buttonVariants} from '@/components/ui/button';
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetTrigger,
} from '@/components/ui/sheet';
import {ROUTES} from '@/lib/utils/routes';
import {cn} from '@/lib/utils/cn';
import {
  BookOpen,
  Gauge,
  GitBranch,
  Menu,
  SearchCheck,
  Sparkles,
  Tags,
} from 'lucide-react';
import Link from 'next/link';
import {usePathname} from 'next/navigation';
import {useEffect, useState} from 'react';

export function Navbar() {
  const pathname = usePathname();
  const [hash, setHash] = useState('');

  useEffect(() => {
    const updateHash = () => setHash(window.location.hash);
    updateHash();
    window.addEventListener('hashchange', updateHash);
    return () => window.removeEventListener('hashchange', updateHash);
  }, []);

  const navItems = [
    {label: 'Badges', href: `${ROUTES.docs}#badges`, icon: Tags},
    {label: 'SEO', href: `${ROUTES.docs}#seo`, icon: SearchCheck},
    {label: 'Docs', href: ROUTES.docs, icon: BookOpen},
  ] as const;

  const isActive = (href: string) => {
    if (href === ROUTES.builder) return pathname.startsWith(ROUTES.builder);
    if (href === ROUTES.seoInspector) return pathname.startsWith(ROUTES.seoInspector);
    if (href === ROUTES.docs) return pathname.startsWith(ROUTES.docs) && hash === '';
    if (href === `${ROUTES.docs}#badges`) {
      return pathname.startsWith(ROUTES.docs) && hash === '#badges';
    }
    if (href === `${ROUTES.docs}#seo`) {
      return pathname.startsWith(ROUTES.docs) && hash === '#seo';
    }
    return false;
  };

  return (
    <header className="sticky top-0 z-50 border-b border-border/60 bg-background/82 backdrop-blur-xl">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between gap-3 px-4 sm:px-6 lg:px-8">
        <Link
          href={ROUTES.home}
          className="flex items-center gap-2 rounded-full border border-border/60 bg-card/55 px-3 py-1.5 font-mono font-bold text-primary transition-colors hover:border-primary/35"
        >
          <span className="inline-flex h-7 w-7 items-center justify-center rounded-full border border-primary/30 bg-primary/12">
            <Sparkles className="h-3.5 w-3.5" />
          </span>
          <span className="text-lg tracking-tight">OG Graph</span>
          <span className="status-indicator status-success" />
        </Link>

        <nav className="hidden items-center gap-2 md:flex">
          <div className="flex items-center gap-1 rounded-full border border-border/55 bg-card/45 p-1">
            {navItems.map(item => (
              <Link
                key={item.label}
                href={item.href}
                className={cn(
                  'inline-flex items-center gap-1.5 rounded-full px-3 py-1.5 text-xs font-mono font-semibold uppercase tracking-[0.08em] transition-colors',
                  isActive(item.href)
                    ? 'bg-primary/14 text-primary'
                    : 'text-muted-fg hover:bg-primary/10 hover:text-primary',
                )}
              >
                <item.icon className="h-3.5 w-3.5" />
                {item.label}
              </Link>
            ))}
          </div>
          <div className="flex items-center gap-1 rounded-full border border-border/55 bg-card/45 p-1">
            <Link
              href={ROUTES.builder}
              className={cn(
                'inline-flex items-center gap-1.5 rounded-full px-3 py-1.5 text-xs font-mono font-semibold uppercase tracking-[0.08em] transition-colors',
                isActive(ROUTES.builder)
                  ? 'bg-primary/14 text-primary'
                  : 'text-muted-fg hover:bg-primary/10 hover:text-primary',
              )}
            >
              <Sparkles className="h-3.5 w-3.5" />
              Builder
            </Link>
            <Link
              href={ROUTES.seoInspector}
              className={cn(
                'inline-flex items-center gap-1.5 rounded-full px-3 py-1.5 text-xs font-mono font-semibold uppercase tracking-[0.08em] transition-colors',
                isActive(ROUTES.seoInspector)
                  ? 'bg-primary/14 text-primary'
                  : 'text-muted-fg hover:bg-primary/10 hover:text-primary',
              )}
            >
              <Gauge className="h-3.5 w-3.5" />
              Inspector
            </Link>
          </div>
          <a
            href="https://github.com/faouziMohamed/placard"
            target="_blank"
            rel="noopener noreferrer"
            className={buttonVariants({variant: 'ghost', size: 'icon'}) + ' rounded-full'}
            aria-label="GitHub"
          >
            <GitBranch className="h-4 w-4" />
          </a>
          <ThemeToggle />
        </nav>

        <div className="flex items-center gap-2 md:hidden">
          <div className="hidden rounded-full border border-border/50 bg-card/55 px-2.5 py-1 backdrop-blur-sm min-[420px]:block">
            <span className="font-mono text-[10px] font-semibold uppercase tracking-[0.18em] text-muted-fg">
              Public
            </span>
          </div>
          <ThemeToggle />
          <Sheet>
            <SheetTrigger asChild>
              <Button
                variant="outline"
                size="icon"
                className="rounded-2xl border-border/70 bg-card/70 backdrop-blur-xl"
                aria-label="Open navigation menu"
              >
                <Menu className="h-4 w-4" />
              </Button>
            </SheetTrigger>
            <SheetContent
              side="right"
              className="w-[min(88vw,24rem)] border-border/60 bg-background/96 p-0 backdrop-blur-2xl"
            >
              <div className="border-b border-border/50 bg-linear-to-b from-background via-card/80 to-background px-5 py-4 text-left">
                <p className="font-display text-lg font-semibold">Navigate</p>
                <p className="text-muted-fg text-sm">
                  Access builder, docs, badges, and SEO tools quickly.
                </p>
              </div>
              <div className="space-y-2 px-4 py-4">
                <p className="px-1 font-mono text-[10px] font-bold uppercase tracking-[0.22em] text-muted-fg">
                  App
                </p>
                <SheetClose asChild>
                  <Link
                    href={ROUTES.builder}
                    className={cn(
                      'flex min-h-12 items-center gap-2 rounded-xl border px-4 text-sm font-semibold transition-colors',
                      isActive(ROUTES.builder)
                        ? 'border-primary/55 bg-primary/16 text-primary'
                        : 'border-primary/35 bg-primary/12 text-primary hover:bg-primary/18',
                    )}
                  >
                    <Sparkles className="h-4 w-4" />
                    Builder
                  </Link>
                </SheetClose>
                <SheetClose asChild>
                  <Link
                    href={ROUTES.seoInspector}
                    className={cn(
                      'flex min-h-12 items-center gap-2 rounded-xl border px-4 text-sm font-semibold transition-colors',
                      isActive(ROUTES.seoInspector)
                        ? 'border-primary/55 bg-primary/16 text-primary'
                        : 'border-primary/35 bg-primary/12 text-primary hover:bg-primary/18',
                    )}
                  >
                    <Gauge className="h-4 w-4" />
                    Inspector
                  </Link>
                </SheetClose>
                <p className="pt-3 px-1 font-mono text-[10px] font-bold uppercase tracking-[0.22em] text-muted-fg">
                  Docs
                </p>
                {navItems.map(item => (
                  <SheetClose asChild key={item.label}>
                    <Link
                      href={item.href}
                      className={cn(
                        'flex min-h-12 items-center gap-2 rounded-xl border px-4 text-sm font-medium transition-colors',
                        isActive(item.href)
                          ? 'border-primary/45 bg-primary/12 text-primary'
                          : 'border-border/55 bg-card/60 hover:border-primary/35 hover:bg-primary/8',
                      )}
                    >
                      <item.icon className="h-4 w-4" />
                      {item.label}
                    </Link>
                  </SheetClose>
                ))}
                <p className="pt-3 px-1 font-mono text-[10px] font-bold uppercase tracking-[0.22em] text-muted-fg">
                  Repo
                </p>
                <SheetClose asChild>
                  <a
                    href="https://github.com/faouziMohamed/placard"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex min-h-12 items-center gap-2 rounded-xl border border-border/55 bg-card/60 px-4 text-sm font-medium transition-colors hover:border-primary/35 hover:bg-primary/8"
                  >
                    <GitBranch className="h-4 w-4" />
                    GitHub
                  </a>
                </SheetClose>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  );
}
