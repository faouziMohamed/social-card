import React from 'react';
import type { ProductParams } from '../../shared/og-schemas';
import type { OgRendererContext } from '../og-handler.server';
import { clampStyle, hexToRgba } from '../og-render.server';
import { composeBackgroundStyleWithTone, resolveTypographyStyle } from '../og-visuals.server';

export function productRenderer(
  p:   ProductParams,
  ctx: OgRendererContext,
): React.ReactElement {
  const { theme, width, height } = ctx;
  const accentColor  = p.accentColor;
  const typography = resolveTypographyStyle(p.fontFamily);
  const bgStyle = composeBackgroundStyleWithTone(
    p.bgStyle,
    accentColor,
    theme.bg,
    p.bgTone,
    p.bgCustomColor,
  );
  const hasScreenshot = !!p.screenshot;
  const leftWidth    = hasScreenshot ? Math.round(width * 0.52) : width;
  const rightWidth   = hasScreenshot ? width - leftWidth : 0;
  const features     = [p.feature1, p.feature2, p.feature3].filter(Boolean) as string[];

  return (
    <div style={{ display: 'flex', flexDirection: 'row', width: '100%', height: '100%', position: 'relative', ...bgStyle }}>
      {/* Left column */}
      <div style={{ display: 'flex', flexDirection: 'column', width: leftWidth, height: '100%', paddingTop: 60, paddingBottom: 60, paddingLeft: 72, paddingRight: 40, position: 'relative' }}>
        <div style={{ position: 'absolute', top: 0, left: 0, width: leftWidth, height: '100%', backgroundImage: `radial-gradient(ellipse at 30% 50%, ${hexToRgba(accentColor, 0.12)} 0%, transparent 60%)` }} />

        {p.badge && (
          <div style={{ display: 'flex', alignSelf: 'flex-start', borderRadius: 9999, backgroundColor: accentColor, paddingTop: 6, paddingBottom: 6, paddingLeft: 14, paddingRight: 14, marginBottom: 16 }}>
            <span style={{ ...typography, fontSize: 14, fontWeight: 500, color: '#ffffff' }}>{p.badge}</span>
          </div>
        )}

        <div style={{ display: 'flex', marginBottom: p.tagline ? 12 : 32 }}>
          <span style={{ ...typography, fontSize: 64, fontWeight: 700, color: theme.text, lineHeight: 1.1, ...clampStyle(2) }}>
            {p.productName}
          </span>
        </div>

        {p.tagline && (
          <div style={{ display: 'flex', marginBottom: 32 }}>
            <span style={{ ...typography, fontSize: 26, fontWeight: 400, color: theme.textMuted, lineHeight: 1.3, ...clampStyle(1) }}>
              {p.tagline}
            </span>
          </div>
        )}

        {features.length > 0 && (
          <div style={{ display: 'flex', flexDirection: 'column', rowGap: 12, marginBottom: 32 }}>
            {features.map((feat, i) => (
              <div key={i} style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', columnGap: 12 }}>
                <div style={{ display: 'flex', width: 10, height: 10, borderRadius: 9999, backgroundColor: accentColor, flexShrink: 0 }} />
                <span style={{ ...typography, fontSize: 22, fontWeight: 400, color: theme.text }}>{feat}</span>
              </div>
            ))}
          </div>
        )}

        <div style={{ display: 'flex', flex: 1 }} />

        {p.cta && (
          <div style={{ display: 'flex', alignSelf: hasScreenshot ? 'flex-start' : 'center', borderRadius: 9999, backgroundColor: accentColor, paddingTop: 8, paddingBottom: 8, paddingLeft: 24, paddingRight: 24 }}>
            <span style={{ ...typography, fontSize: 20, fontWeight: 500, color: '#ffffff' }}>{p.cta}</span>
          </div>
        )}
      </div>

      {/* Right screenshot column */}
      {hasScreenshot && (
        <div style={{ display: 'flex', width: rightWidth, height: '100%', overflow: 'hidden', position: 'relative' }}>
          <img src={p.screenshot} width={rightWidth} height={height} alt="" style={{ objectFit: 'cover', width: rightWidth, height: '100%' }} />
          <div style={{ position: 'absolute', top: 0, left: 0, width: 120, height: '100%', backgroundImage: `linear-gradient(to right, ${theme.bg}, transparent)` }} />
        </div>
      )}
    </div>
  );
}
