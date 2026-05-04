'use client';

import Link from 'next/link';
import {useEffect} from 'react';
import {STYLES} from './global-error-styles';

// global-error replaces the root layout — must be fully standalone with <html><body>

interface GlobalErrorProps {
  error: Error & {digest?: string};
  reset: () => void;
}

export default function GlobalError({error, reset}: GlobalErrorProps) {
  useEffect(() => {
    console.error('[OG Graph] Global error:', error);
  }, [error]);

  return (
    <html lang="en" style={{colorScheme: 'dark'}}>
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <title>Critical Error — OG Graph</title>
        {/* eslint-disable-next-line react/no-danger */}
        <style dangerouslySetInnerHTML={{__html: STYLES}} />
      </head>
      <body
        style={{
          minHeight: '100dvh',
          backgroundColor: '#080808',
          color: '#f0f0f0',
          fontFamily:
            "'Geist Mono', 'Cascadia Code', 'Fira Code', ui-monospace, monospace",
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          padding: '24px',
          position: 'relative',
          overflow: 'hidden',
        }}
        role="alert"
        aria-live="assertive"
      >
        {/* Background dot grid */}
        <div
          aria-hidden
          style={{
            position: 'absolute',
            inset: 0,
            backgroundImage:
              'radial-gradient(circle, rgba(255,255,255,0.035) 1px, transparent 1px)',
            backgroundSize: '38px 38px',
            pointerEvents: 'none',
          }}
        />

        {/* Ambient red glow */}
        <div
          aria-hidden
          style={{
            position: 'absolute',
            inset: 0,
            background:
              'radial-gradient(ellipse 55% 50% at 50% 45%, rgba(200, 40, 40, 0.07) 0%, transparent 70%)',
            pointerEvents: 'none',
          }}
        />

        {/* Content */}
        <div
          style={{
            position: 'relative',
            zIndex: 10,
            width: '100%',
            maxWidth: '460px',
            textAlign: 'center',
          }}
        >
          {/* Icon */}
          <div
            style={{margin: '0 auto 32px', width: 'fit-content'}}
            aria-hidden
          >
            <div style={{position: 'relative', width: 96, height: 96}}>
              {/* Expanding rings */}
              <div
                className="ring-exp"
                style={{
                  position: 'absolute',
                  inset: 0,
                  borderRadius: '50%',
                  border: '1.5px solid rgba(200,50,50,0.35)',
                }}
              />
              <div
                className="ring-exp-d"
                style={{
                  position: 'absolute',
                  inset: 0,
                  borderRadius: '50%',
                  border: '1.5px solid rgba(200,50,50,0.2)',
                }}
              />

              <svg
                width="96"
                height="96"
                viewBox="0 0 96 96"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                {/* Triangle */}
                <path
                  d="M48 14 L82 74 L14 74 Z"
                  stroke="rgba(210,55,55,0.85)"
                  strokeWidth="2.5"
                  strokeLinejoin="round"
                  fill="rgba(210,55,55,0.08)"
                  className="tri-draw"
                />
                {/* Vertical bar */}
                <path
                  d="M48 36 L48 58"
                  stroke="rgba(210,55,55,1)"
                  strokeWidth="3.5"
                  strokeLinecap="round"
                  className="vline-draw"
                />
                {/* Dot */}
                <circle
                  cx="48"
                  cy="67"
                  r="3"
                  fill="rgba(210,55,55,1)"
                  className="dot-appear"
                />
              </svg>
            </div>
          </div>

          {/* Title */}
          <h1
            className="title-el"
            style={{
              fontSize: 'clamp(22px, 5vw, 30px)',
              fontWeight: 700,
              letterSpacing: '-0.025em',
              marginBottom: '10px',
              color: '#f0f0f0',
              opacity: 0,
            }}
          >
            Critical System Error
          </h1>

          <p
            className="sub-el"
            style={{
              fontSize: '13px',
              color: 'rgba(255,255,255,0.38)',
              lineHeight: 1.6,
              marginBottom: '28px',
              opacity: 0,
            }}
          >
            The application encountered an unrecoverable error.
            <br />
            The root layout could not be rendered.
          </p>

          {/* Error detail */}
          {error.message && (
            <div
              className="detail-el"
              style={{
                background: 'rgba(255,255,255,0.03)',
                border: '1px solid rgba(255,255,255,0.07)',
                borderRadius: '8px',
                padding: '14px 16px',
                textAlign: 'left',
                marginBottom: '28px',
                opacity: 0,
              }}
            >
              <p
                style={{
                  fontSize: '10px',
                  color: 'rgba(255,255,255,0.25)',
                  marginBottom: '6px',
                  letterSpacing: '0.06em',
                  textTransform: 'uppercase',
                }}
              >
                Error message
              </p>
              <p
                style={{
                  fontSize: '12px',
                  color: 'rgba(220, 85, 85, 0.9)',
                  wordBreak: 'break-all',
                  lineHeight: 1.6,
                }}
              >
                {error.message}
              </p>
              {error.digest && (
                <p
                  style={{
                    fontSize: '10px',
                    color: 'rgba(255,255,255,0.18)',
                    marginTop: '8px',
                  }}
                >
                  digest · {error.digest}
                </p>
              )}
            </div>
          )}

          {/* CTAs */}
          <div
            className="cta-el"
            style={{
              display: 'flex',
              flexDirection: 'column',
              gap: '10px',
              alignItems: 'center',
              opacity: 0,
            }}
          >
            <button
              type="button"
              className="reset-btn"
              onClick={reset}
              style={{
                width: '100%',
                maxWidth: '300px',
                padding: '12px 24px',
                borderRadius: '8px',
                border: '1px solid rgba(210,55,55,0.42)',
                background: 'rgba(210,55,55,0.12)',
                color: 'rgba(220,90,90,1)',
                fontSize: '13px',
                fontFamily: 'inherit',
              }}
            >
              ↺ try again
            </button>
            <Link
              className="home-link"
              href="/"
              style={{
                width: '100%',
                maxWidth: '300px',
                padding: '12px 24px',
                borderRadius: '8px',
                border: '1px solid rgba(255,255,255,0.09)',
                background: 'rgba(255,255,255,0.03)',
                color: 'rgba(255,255,255,0.38)',
                fontSize: '13px',
                fontFamily: 'inherit',
                textDecoration: 'none',
                display: 'block',
                transition: 'color 0.2s, border-color 0.2s',
              }}
            >
              ← back to home
            </Link>
          </div>

          <p
            className="brand-el"
            style={{
              marginTop: '40px',
              fontSize: '11px',
              color: 'rgba(255,255,255,0.12)',
              opacity: 0,
            }}
          >
            placard.mfaouzi.com
          </p>
        </div>
      </body>
    </html>
  );
}
