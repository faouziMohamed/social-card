import {BrokenOgCard} from '@/app/broken-og-card';
import {STYLES} from '@/app/not-found.styles';
import {Footer} from '@/components/layout/footer';
import {Navbar} from '@/components/layout/navbar';
import Link from 'next/link';

export default function NotFound() {
  return (
    <>
      {/* eslint-disable-next-line react/no-danger */}
      <style dangerouslySetInnerHTML={{__html: STYLES}} />

      <div className="flex min-h-full flex-col">
        <Navbar />

        <main className="relative flex flex-1 items-center justify-center overflow-hidden py-20">
          {/* ── Background layers ─────────────────────────────────────── */}
          <div
            className="circuit-pattern absolute inset-0 opacity-[0.28]"
            aria-hidden
          />
          <div
            className="pointer-events-none absolute inset-0"
            aria-hidden
            style={{
              background:
                'radial-gradient(ellipse 60% 50% at 50% 40%, oklch(0.75 0.15 195 / 0.05) 0%, transparent 70%)',
            }}
          />

          {/* Pulse rings */}
          <div
            className="pointer-events-none absolute inset-0 flex items-center justify-center"
            aria-hidden
          >
            {[0, 1, 2].map(i => (
              <div
                key={i}
                className="absolute rounded-full border border-primary/15"
                style={{
                  width: 300,
                  height: 300,
                  animation: `pulse-ring 4s ease-out ${i * 1.3}s infinite`,
                }}
              />
            ))}
          </div>

          {/* Scanline sweep */}
          <div
            className="card-scanline pointer-events-none absolute left-0 right-0 h-48"
            aria-hidden
            style={{
              background:
                'linear-gradient(to bottom, transparent, oklch(0.75 0.15 195 / 0.04) 50%, transparent)',
            }}
          />

          {/* ── Content ────────────────────────────────────────────────── */}
          <div className="relative z-10 mx-auto max-w-2xl px-4 text-center sm:px-6">
            {/* 404 number */}
            <div className="fade-up-1 mb-4 select-none" aria-label="Error 404">
              <span
                className="glitch-num block font-bold leading-none text-foreground"
                style={{
                  fontSize: 'clamp(110px, 20vw, 240px)',
                  letterSpacing: '-0.04em',
                }}
              >
                404
              </span>
            </div>

            {/* Broken OG card */}
            <div
              className="float-card-el fade-up-2 mx-auto mb-10 w-fit"
              aria-hidden
            >
              <BrokenOgCard />
            </div>

            {/* Terminal block */}
            <div className="builder-panel fade-up-3 mx-auto mb-10 max-w-lg rounded-lg p-5 text-left">
              <div className="mb-3.5 flex items-center gap-2 border-b border-border pb-3">
                {(
                  [
                    'oklch(0.65 0.25 25)',
                    'oklch(0.78 0.18 80)',
                    'oklch(0.72 0.22 145)',
                  ] as const
                ).map((c, i) => (
                  <span
                    key={i}
                    className="h-2.5 w-2.5 rounded-full"
                    style={{background: c}}
                  />
                ))}
                <span className="ml-1.5 font-mono text-xs text-muted-fg">
                  error.log
                </span>
              </div>
              <div className="space-y-2 font-mono text-sm">
                <p>
                  <span className="text-muted-fg">›</span>{' '}
                  <span className="text-terminal-amber">STATUS</span>
                  <span className="text-muted-fg"> ······ </span>
                  <span style={{color: 'oklch(0.65 0.25 25)'}}>
                    404 NOT FOUND
                  </span>
                </p>
                <p>
                  <span className="text-muted-fg">›</span>{' '}
                  <span className="text-terminal-amber">SIGNAL</span>
                  <span className="text-muted-fg"> ······ </span>
                  <span className="text-foreground/65">
                    lost · no route matched
                  </span>
                </p>
                <p>
                  <span className="text-muted-fg">›</span>{' '}
                  <span className="text-terminal-amber">HINT</span>
                  <span className="text-muted-fg"> ······ </span>
                  <span className="text-foreground/65">
                    check the URL or navigate home
                  </span>
                </p>
                <p className="flex items-center gap-1 pt-1">
                  <span className="terminal-prompt text-xs">$</span>
                  <span
                    className="inline-block h-3.5 w-2 bg-primary align-middle"
                    style={{animation: 'blink-cursor 1.1s step-end infinite'}}
                  />
                </p>
              </div>
            </div>

            {/* CTAs */}
            <div className="fade-up-4 flex flex-col items-center justify-center gap-4 sm:flex-row">
              <Link
                href="/"
                className="inline-flex items-center gap-2 rounded-lg border border-primary/40 bg-primary/10 px-6 py-3 font-mono text-sm text-primary transition-all hover:border-primary/60 hover:bg-primary/20"
              >
                ← back to home
              </Link>
              <Link
                href="/builder"
                className="inline-flex items-center gap-2 rounded-lg border border-border bg-card px-6 py-3 font-mono text-sm text-muted-fg transition-all hover:border-primary/30 hover:text-primary"
              >
                open builder →
              </Link>
            </div>

            <p className="mt-14 font-mono text-xs text-muted-fg/30">
              placard.mfaouzi.com
            </p>
          </div>
        </main>

        <Footer />
      </div>
    </>
  );
}
