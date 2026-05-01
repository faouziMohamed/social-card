import type {OgRendererContext} from '@/modules/og/server/og-handler.server';
import {clampStyle, hexToRgba} from '@/modules/og/server/og-render.server';
import {composeBackgroundStyle} from '@/modules/og/server/og-visuals.server';
import type {TwitterCardParams} from '@/modules/seo/shared/seo-schemas';
import React from 'react';

export function twitterCardRenderer(
  p: TwitterCardParams,
  ctx: OgRendererContext,
): React.ReactElement {
  const {theme, width, height} = ctx;
  const accent = p.accentColor;
  const bg = composeBackgroundStyle(p.bgStyle, accent, theme.bg);
  const sans = 'system-ui,-apple-system,sans-serif';

  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        width,
        height,
        backgroundColor: bg.backgroundColor,
        backgroundImage: bg.backgroundImage,
        backgroundSize: bg.backgroundSize,
        padding: 48,
        position: 'relative',
      }}
    >
      {/* Top accent bar */}
      <div
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          display: 'flex',
          height: 3,
          backgroundColor: accent,
        }}
      />

      {/* Logo + site name */}
      {(p.logo || p.siteName) && (
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: 10,
            marginBottom: 24,
          }}
        >
          {p.logo && (
            <img
              src={p.logo}
              style={{
                width: 28,
                height: 28,
                borderRadius: 6,
                objectFit: 'contain',
              }}
            />
          )}
          {p.siteName && (
            <span
              style={{
                fontFamily: sans,
                fontSize: 14,
                fontWeight: 600,
                color: hexToRgba(theme.text, 0.55),
                letterSpacing: '0.02em',
              }}
            >
              {p.siteName}
            </span>
          )}
        </div>
      )}

      {/* Title */}
      <div style={{display: 'flex', flex: 1, alignItems: 'center'}}>
        <div style={{display: 'flex', flexDirection: 'column', gap: 14}}>
          <span
            style={{
              fontFamily: sans,
              fontSize: 32,
              fontWeight: 700,
              color: theme.text,
              lineHeight: 1.2,
              ...clampStyle(2),
            }}
          >
            {p.title}
          </span>
          {p.description && (
            <span
              style={{
                fontFamily: sans,
                fontSize: 16,
                fontWeight: 400,
                color: theme.textMuted,
                lineHeight: 1.5,
                ...clampStyle(2),
              }}
            >
              {p.description}
            </span>
          )}
        </div>
      </div>

      {/* Bottom accent dot */}
      <div
        style={{display: 'flex', alignItems: 'center', gap: 8, marginTop: 20}}
      >
        <div
          style={{
            width: 6,
            height: 6,
            borderRadius: '50%',
            backgroundColor: accent,
          }}
        />
        <span
          style={{
            fontFamily: sans,
            fontSize: 12,
            color: hexToRgba(theme.text, 0.35),
            letterSpacing: '0.04em',
          }}
        >
          {p.siteName ?? 'twitter:card'}
        </span>
      </div>
    </div>
  );
}
