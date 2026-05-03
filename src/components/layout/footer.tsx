import {ROUTES} from '@/lib/utils/routes';
import Link from 'next/link';

export function Footer() {
  return (
    <footer className="border-t border-border py-8 mt-auto">
      <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-4 px-4 text-sm text-muted-fg sm:flex-row sm:px-6 lg:px-8">
        <span className="font-mono">
          <span className="text-terminal-green">▶</span> og-graph
        </span>

        <div className="flex items-center gap-6">
          <Link
            href={ROUTES.builder}
            className="hover:text-primary transition-colors"
          >
            Builder
          </Link>
          <Link
            href={ROUTES.docs}
            className="hover:text-primary transition-colors"
          >
            Docs
          </Link>
          <a
            href="https://github.com"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-primary transition-colors"
          >
            GitHub
          </a>
        </div>
      </div>
    </footer>
  );
}
