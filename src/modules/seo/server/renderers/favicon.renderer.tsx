import React from 'react';
import { getContrastColor, hexToRgba } from '@/modules/og/server/og-render.server';
import type { FaviconParams } from '@/modules/seo/shared/seo-schemas';
import type { OgRendererContext } from '@/modules/og/server/og-handler.server';

function shapeClip(shape: string, size: number): React.CSSProperties {
  if (shape === 'circle') return { borderRadius: '50%' };
  if (shape === 'rounded') return { borderRadius: Math.round(size * 0.22) };
  return { borderRadius: 0 };
}

export function faviconRenderer(p: FaviconParams, ctx: OgRendererContext): React.ReactElement {
  const { width, height } = ctx;
  const accent = p.accentColor;
  const bg     = p.color;
  const fg     = getContrastColor(bg);
  const clip   = shapeClip(p.shape, width);

  return (
    <div style={{ display: 'flex', width, height, ...clip, backgroundColor: bg, position: 'relative', overflow: 'hidden' }}>
      {/* Subtle gradient overlay */}
      <div style={{ position: 'absolute', inset: 0, display: 'flex',
        background: `radial-gradient(circle at 30% 30%, ${hexToRgba(accent, 0.3)}, transparent 70%)` }} />
      {p.logo
        ? <img src={p.logo} style={{ width: '70%', height: '70%', margin: 'auto', objectFit: 'contain' }} />
        : <span style={{ margin: 'auto', fontSize: Math.round(width * 0.45), fontWeight: 700, color: fg, fontFamily: 'system-ui', lineHeight: 1, letterSpacing: '-0.03em' }}>
            {p.initial.slice(0, 2).toUpperCase()}
          </span>
      }
    </div>
  );
}
