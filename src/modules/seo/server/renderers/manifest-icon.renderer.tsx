import type {OgRendererContext} from '@/modules/og/server/og-handler.server';
import {
  getContrastColor,
  hexToRgba,
} from '@/modules/og/server/og-render.server';
import type {ManifestIconParams} from '@/modules/seo/shared/seo-schemas';
import React from 'react';

export function manifestIconRenderer(
  p: ManifestIconParams,
  ctx: OgRendererContext,
): React.ReactElement {
  const {width, height} = ctx;
  const accent = p.accentColor;
  const bg = p.color;
  const fg = getContrastColor(bg);

  const rx =
    p.shape === 'circle'
      ? width / 2
      : p.shape === 'rounded'
        ? Math.round(width * 0.15)
        : 0;

  const logoSize = Math.round(width * 0.55);
  const textSize = Math.round(width * 0.33);

  return (
    <div
      style={{
        display: 'flex',
        width,
        height,
        borderRadius: rx,
        backgroundColor: bg,
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      {/* Background mesh */}
      <div
        style={{
          position: 'absolute',
          inset: 0,
          display: 'flex',
          background: `
          radial-gradient(ellipse at 20% 20%, ${hexToRgba(accent, 0.25)}, transparent 50%),
          radial-gradient(ellipse at 80% 80%, ${hexToRgba(accent, 0.15)}, transparent 50%)
        `,
        }}
      />

      {p.logo ? (
        <img
          src={p.logo}
          style={{
            width: logoSize,
            height: logoSize,
            margin: 'auto',
            objectFit: 'contain',
            position: 'relative',
          }}
        />
      ) : (
        <span
          style={{
            margin: 'auto',
            fontSize: textSize,
            fontWeight: 700,
            color: fg,
            fontFamily: 'system-ui,-apple-system,sans-serif',
            lineHeight: 1,
            letterSpacing: '-0.02em',
            position: 'relative',
          }}
        >
          {p.initial.slice(0, 2).toUpperCase()}
        </span>
      )}

      {/* Bottom accent stripe */}
      <div
        style={{
          position: 'absolute',
          bottom: 0,
          left: 0,
          right: 0,
          display: 'flex',
          height: Math.round(width * 0.03),
          backgroundColor: accent,
          opacity: 0.6,
        }}
      />
    </div>
  );
}
