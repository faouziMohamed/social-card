import React from 'react';
import { isOgFontCategory } from '../../shared/og-font-catalog';
import type { MinimalParams } from '../../shared/og-schemas';
import type { OgRendererContext } from '../og-handler.server';
import { clampStyle } from '../og-render.server';
import { composeBackgroundStyleWithTone, resolveTypographyStyle } from '../og-visuals.server';

export function minimalRenderer(
  p:   MinimalParams,
  ctx: OgRendererContext,
): React.ReactElement {
  const { theme } = ctx;
  const accentColor = p.accentColor;
  const bgBase      = composeBackgroundStyleWithTone(
    p.bgStyle,
    accentColor,
    theme.bg,
    p.bgTone,
    p.bgCustomColor,
  );
  const bgColor     = p.bgColor  ?? bgBase.backgroundColor;
  const textColor   = p.textColor ?? theme.text;
  const typography  = resolveTypographyStyle(p.fontFamily);
  const titleSize   = isOgFontCategory(p.fontFamily, 'mono') ? 64 : 76;

  return (
    <div style={{ display: 'flex', flexDirection: 'column', width: '100%', height: '100%', backgroundColor: bgColor, backgroundImage: bgBase.backgroundImage }}>
      {/* Top accent bar */}
      <div style={{ display: 'flex', width: '100%', height: 6, backgroundColor: accentColor }} />

      {/* Center content */}
      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', flex: 1, paddingLeft: 120, paddingRight: 120 }}>
        {p.eyebrow && (
          <span style={{ ...typography, fontSize: 18, fontWeight: 500, color: accentColor, textTransform: 'uppercase', letterSpacing: '0.15em', marginBottom: 16 }}>
            {p.eyebrow}
          </span>
        )}
        <div style={{ display: 'flex', maxWidth: 960, marginBottom: p.description ? 24 : 0 }}>
          <span style={{ ...typography, fontSize: titleSize, fontWeight: 700, color: textColor, textAlign: 'center', lineHeight: 1.1, ...clampStyle(3) }}>
            {p.title}
          </span>
        </div>
        {p.description && (
          <div style={{ display: 'flex', maxWidth: 800 }}>
            <span style={{ ...typography, fontSize: 30, fontWeight: 400, color: theme.textMuted, textAlign: 'center', lineHeight: 1.5, ...clampStyle(2) }}>
              {p.description}
            </span>
          </div>
        )}
      </div>

      {/* Bottom accent bar */}
      <div style={{ display: 'flex', width: '100%', height: 6, backgroundColor: accentColor }} />
    </div>
  );
}
