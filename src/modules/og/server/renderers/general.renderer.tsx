import React from 'react';
import type { GeneralParams } from '../../shared/og-schemas';
import type { OgRendererContext } from '../og-handler.server';
import { clampStyle } from '../og-render.server';
import { composeBackgroundStyleWithTone, resolveTypographyStyle } from '../og-visuals.server';

export function generalRenderer(
  p:   GeneralParams,
  ctx: OgRendererContext,
): React.ReactElement {
  const { theme } = ctx;
  const accentColor  = p.accentColor;
  const heroText     = p.title ?? p.siteName;
  const showSiteName = !!p.title;
  const paddingTop   = p.logo ? 80 : 120;
  const typography = resolveTypographyStyle(p.fontFamily);
  const bgStyle = composeBackgroundStyleWithTone(
    p.bgStyle,
    accentColor,
    theme.bg,
    p.bgTone,
    p.bgCustomColor,
    p.bgGradientFrom,
    p.bgGradientTo,
  );

  return (
    <div
      style={{
        display: 'flex', flexDirection: 'column', alignItems: 'center',
        justifyContent: 'center', width: '100%', height: '100%',
        ...bgStyle,
        paddingTop, paddingBottom: 80, paddingLeft: 96, paddingRight: 96,
      }}
    >
      {p.logo && (
        <div style={{ display: 'flex', borderRadius: 9999, padding: 3, backgroundColor: accentColor, marginBottom: 32 }}>
          <div style={{ display: 'flex', borderRadius: 9999, overflow: 'hidden', width: 100, height: 100 }}>
            <img src={p.logo} width={100} height={100} alt="" style={{ objectFit: 'cover', width: 100, height: 100 }} />
          </div>
        </div>
      )}

      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', marginBottom: showSiteName ? 20 : 0 }}>
        <span style={{ ...typography, fontSize: 72, fontWeight: 700, color: theme.text, textAlign: 'center', lineHeight: 1.1 }}>
          {heroText}
        </span>
        <div style={{ display: 'flex', width: 48, height: 4, backgroundColor: accentColor, marginTop: 12 }} />
      </div>

      {showSiteName && (
        <span style={{ ...typography, fontSize: 28, fontWeight: 400, color: theme.textMuted, textAlign: 'center', marginBottom: p.description ? 24 : 0 }}>
          {p.siteName}
        </span>
      )}

      {p.description && (
        <div style={{ display: 'flex', maxWidth: 800 }}>
          <span style={{ ...typography, fontSize: 32, fontWeight: 400, color: theme.textMuted, textAlign: 'center', ...clampStyle(2) }}>
            {p.description}
          </span>
        </div>
      )}
    </div>
  );
}
