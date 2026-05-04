'use client';

import Link from 'next/link';
import {useEffect} from 'react';

const STYLES = `
  @keyframes draw-circle {
    to { stroke-dashoffset: 0; }
  }

  @keyframes draw-line {
    to { stroke-dashoffset: 0; }
  }

  @keyframes pulse-warn {
    0%, 100% {
      box-shadow: 0 0 0 0 oklch(0.65 0.25 25 / 0.35);
    }
    50% {
      box-shadow: 0 0 0 18px oklch(0.65 0.25 25 / 0);
    }
  }

  @keyframes ring-breathe {
    0%, 100% { opacity: 0.25; transform: scale(1); }
    50% { opacity: 0.12; transform: scale(1.08); }
  }

  @keyframes glitch-text {
    0%, 88%, 100% { text-shadow: none; transform: skewX(0deg); }
    90% {
      text-shadow: -3px 0 oklch(0.85 0.18 195 / 0.85), 3px 0 oklch(0.65 0.25 25 / 0.85);
      transform: skewX(-2.5deg);
    }
    92% {
      text-shadow: 3px 0 oklch(0.85 0.18 195 / 0.85), -3px 0 oklch(0.65 0.25 25 / 0.85);
      transform: skewX(2deg);
    }
    94% {
      text-shadow: -1.5px 0 oklch(0.85 0.18 195), 1.5px 0 oklch(0.65 0.25 25);
      transform: skewX(-1deg);
    }
  }

  @keyframes fade-up {
    from { opacity: 0; transform: translateY(10px); }
    to { opacity: 1; transform: translateY(0); }
  }

  @keyframes error-flicker {
    0%, 19%, 21%, 23%, 25%, 54%, 56%, 100% { opacity: 1; }
    20%, 24%, 55% { opacity: 0.4; }
  }

  .err-circle {
    stroke-dasharray: 252;
    stroke-dashoffset: 252;
    animation: draw-circle 0.9s ease 0.2s forwards;
  }

  .err-vline {
    stroke-dasharray: 22;
    stroke-dashoffset: 22;
    animation: draw-line 0.4s ease 0.9s forwards;
  }

  .err-dot {
    animation: fade-up 0.3s ease 1.3s both;
  }

  .err-ring {
    animation: ring-breathe 2.8s ease-in-out infinite;
  }

  .err-title { animation: glitch-text 6s ease-in-out infinite; }
  .err-flicker { animation: error-flicker 0.8s ease 0.5s 3; }

  .err-btn-warn {
    animation: pulse-warn 2.8s ease-in-out infinite;
  }

  .fade-1 { animation: fade-up 0.55s ease 0.3s both; }
  .fade-2 { animation: fade-up 0.55s ease 0.5s both; }
  .fade-3 { animation: fade-up 0.55s ease 0.7s both; }
  .fade-4 { animation: fade-up 0.55s ease 0.9s both; }

  @media (prefers-reduced-motion: reduce) {
    .err-circle, .err-vline, .err-dot, .err-ring, .err-title,
    .err-flicker, .err-btn-warn, .fade-1, .fade-2, .fade-3, .fade-4 {
      animation: none !important;
      stroke-dashoffset: 0 !important;
      opacity: 1 !important;
    }
  }
`;

interface ErrorProps {
  error: Error & {digest?: string};
  reset: () => void;
}

export default function ErrorPage({error, reset}: ErrorProps) {
  useEffect(() => {
    console.error('[Social Card] Runtime error:', error);
  }, [error]);

  return (
    <>
      {/* eslint-disable-next-line react/no-danger */}
      <style dangerouslySetInnerHTML={{__html: STYLES}} />

      <div
        className="relative flex min-h-screen items-center justify-center overflow-hidden bg-background p-6"
        role="alert"
        aria-live="assertive"
      >
        {/* Background layers */}
        <div
          className="circuit-pattern absolute inset-0 opacity-20"
          aria-hidden
        />
        <div
          className="pointer-events-none absolute inset-0"
          aria-hidden
          style={{
            background:
              'radial-gradient(ellipse 55% 45% at 50% 42%, oklch(0.65 0.25 25 / 0.06) 0%, transparent 70%)',
          }}
        />

        <div className="relative z-10 w-full max-w-md text-center">
          {/* ── Icon ──────────────────────────────────────────────────── */}
          <div className="fade-1 mx-auto mb-8 w-fit" aria-hidden>
            <div
              className="err-btn-warn relative rounded-full"
              style={{width: 88, height: 88}}
            >
              {/* Breathing ring */}
              <div
                className="err-ring absolute inset-0 rounded-full border-2"
                style={{borderColor: 'oklch(0.65 0.25 25 / 0.4)'}}
              />

              <svg
                width="88"
                height="88"
                viewBox="0 0 88 88"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <circle
                  cx="44"
                  cy="44"
                  r="40"
                  fill="oklch(0.65 0.25 25 / 0.07)"
                  stroke="oklch(0.65 0.25 25 / 0.35)"
                  strokeWidth="1.5"
                  className="err-circle"
                />
                {/* Vertical bar */}
                <path
                  d="M44 26 L44 50"
                  stroke="oklch(0.65 0.25 25)"
                  strokeWidth="3.5"
                  strokeLinecap="round"
                  className="err-vline"
                />
                {/* Dot */}
                <circle
                  cx="44"
                  cy="61"
                  r="3"
                  fill="oklch(0.65 0.25 25)"
                  className="err-dot"
                  style={{opacity: 0}}
                />
              </svg>
            </div>
          </div>

          {/* ── Title ─────────────────────────────────────────────────── */}
          <div className="fade-2 mb-3">
            <h1
              className="err-title text-3xl font-bold text-foreground"
              style={{letterSpacing: '-0.02em'}}
            >
              Render Failed
            </h1>
          </div>

          <p className="fade-3 mb-8 text-sm text-muted-fg">
            Something broke while processing your request.
            <br />
            You can try again or head back home.
          </p>

          {/* ── Error detail ──────────────────────────────────────────── */}
          {error.message && (
            <div
              className="builder-panel err-flicker fade-3 mb-8 rounded-lg p-4 text-left"
              style={{opacity: 0}}
            >
              <p className="mb-1.5 font-mono text-xs text-muted-fg">
                error.message
              </p>
              <p
                className="break-all font-mono text-xs leading-relaxed"
                style={{color: 'oklch(0.7 0.22 25)'}}
              >
                {error.message}
              </p>
              {error.digest && (
                <p className="mt-2.5 font-mono text-xs text-muted-fg/50">
                  digest · {error.digest}
                </p>
              )}
            </div>
          )}

          {/* ── CTAs ──────────────────────────────────────────────────── */}
          <div
            className="fade-4 flex flex-col items-center gap-3 sm:flex-row sm:justify-center"
            style={{opacity: 0}}
          >
            <button
              type="button"
              onClick={reset}
              className="inline-flex w-full items-center justify-center gap-2 rounded-lg px-6 py-3 font-mono text-sm font-medium transition-all sm:w-auto"
              style={{
                background: 'oklch(0.65 0.25 25 / 0.14)',
                border: '1px solid oklch(0.65 0.25 25 / 0.45)',
                color: 'oklch(0.72 0.22 25)',
              }}
            >
              ↺ try again
            </button>
            <Link
              href="/"
              className="inline-flex w-full items-center justify-center gap-2 rounded-lg border border-border bg-card px-6 py-3 font-mono text-sm text-muted-fg transition-all hover:border-primary/30 hover:text-primary sm:w-auto"
            >
              ← home
            </Link>
          </div>

          <p className="mt-12 font-mono text-xs text-muted-fg/30">
            social-card.mfaouzi.com
          </p>
        </div>
      </div>
    </>
  );
}
