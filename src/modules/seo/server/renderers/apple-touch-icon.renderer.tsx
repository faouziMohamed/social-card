import React from 'react';
import { getContrastColor, hexToRgba } from '@/modules/og/server/og-render.server';
import type { AppleTouchIconParams } from '@/modules/seo/shared/seo-schemas';
import type { OgRendererContext } from '@/modules/og/server/og-handler.server';

export function appleTouchIconRenderer(p: AppleTouchIconParams, ctx: OgRendererContext): React.ReactElement {
  const { width, height } = ctx;
  const accent = p.accentColor;
  const bg     = p.color;
  const fg     = getContrastColor(bg);

  // Apple touch icons are always square with rounded corners
  const rx = Math.round(width * 0.2237); // Apple's standard ratio

  return (
    <div style={{ display: 'flex', width, height, borderRadius: rx, backgroundColor: bg, position: 'relative', overflow: 'hidden' }}>
      {/* Gradient shimmer top-left */}
      <div style={{ position: 'absolute', inset: 0, display: 'flex',
        background: `radial-gradient(ellipse at 25% 20%, ${hexToRgba('#ffffff', 0.18)}, transparent 55%)` }} />
      {/* Accent glow bottom-right */}
      <div style={{ position: 'absolute', inset: 0, display: 'flex',
        background: `radial-gradient(circle at 75% 80%, ${hexToRgba(accent, 0.4)}, transparent 60%)` }} />

      {p.logo
        ? <img src={p.logo} style={{ width: '60%', height: '60%', margin: 'auto', objectFit: 'contain', position: 'relative' }} />
        : <span style={{ margin: 'auto', fontSize: Math.round(width * 0.38), fontWeight: 700, color: fg,
            fontFamily: 'system-ui,-apple-system,sans-serif', lineHeight: 1, letterSpacing: '-0.03em', position: 'relative' }}>
            {p.initial.slice(0, 2).toUpperCase()}
          </span>
      }
    </div>
  );
}
