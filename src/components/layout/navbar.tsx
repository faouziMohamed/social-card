import {ThemeToggle} from '@/components/shared/theme-toggle';
import {buttonVariants} from '@/components/ui/button';
import {ROUTES} from '@/lib/utils/routes';
import {GitBranch} from 'lucide-react';
import Link from 'next/link';

export function Navbar() {
  return (
    <header className="sticky top-0 z-50 border-b border-border bg-background/80 backdrop-blur-md">
      <div className="mx-auto flex h-14 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        <Link
          href={ROUTES.home}
          className="flex items-center gap-2 font-mono font-bold text-primary"
        >
          <span className="text-lg tracking-tight">OG Graph</span>
          <span className="status-indicator status-success" />
        </Link>

        <nav className="hidden items-center gap-1 sm:flex">
          <Link
            href={ROUTES.builder}
            className={buttonVariants({variant: 'ghost', size: 'sm'})}
          >
            Builder
          </Link>
          <Link
            href={`${ROUTES.docs}#badges`}
            className={buttonVariants({variant: 'ghost', size: 'sm'})}
          >
            Badges
          </Link>
          <Link
            href={`${ROUTES.docs}#seo`}
            className={buttonVariants({variant: 'ghost', size: 'sm'})}
          >
            SEO
          </Link>
          <Link
            href={ROUTES.seoInspector}
            className={buttonVariants({variant: 'ghost', size: 'sm'})}
          >
            Inspector
          </Link>
          <Link
            href={ROUTES.docs}
            className={buttonVariants({variant: 'ghost', size: 'sm'})}
          >
            Docs
          </Link>
          <a
            href="https://github.com"
            target="_blank"
            rel="noopener noreferrer"
            className={buttonVariants({variant: 'ghost', size: 'icon'})}
            aria-label="GitHub"
          >
            <GitBranch className="h-4 w-4" />
          </a>
          <ThemeToggle />
        </nav>

        <div className="flex sm:hidden">
          <ThemeToggle />
        </div>
      </div>
    </header>
  );
}
